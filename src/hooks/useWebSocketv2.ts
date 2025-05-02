
import { useState, useEffect, useCallback, useRef } from 'react';
import WebSocketService, { WebSocketEvents } from '../services/websocket/WebSocketService';
import eventBus from '../services/websocket/event-bus';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface WebSocketHookOptions {
  url: string;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  automaticReconnect?: boolean;
  showNotifications?: boolean;
  enableHeartbeat?: boolean;
  onConnectionChange?: (isConnected: boolean) => void;
  autoConnect?: boolean;
}

export interface WebSocketMessage {
  type: string;
  id?: string;
  timestamp?: number;
  priority?: 'low' | 'medium' | 'high';
  [key: string]: any;
}

const DEFAULT_OPTIONS: Partial<WebSocketHookOptions> = {
  reconnectAttempts: 5,
  reconnectInterval: 3000,
  automaticReconnect: true,
  showNotifications: true,
  enableHeartbeat: true,
  autoConnect: true
};

export const useWebSocketv2 = (options: WebSocketHookOptions) => {
  const { 
    url,
    reconnectAttempts = DEFAULT_OPTIONS.reconnectAttempts,
    reconnectInterval = DEFAULT_OPTIONS.reconnectInterval,
    showNotifications = DEFAULT_OPTIONS.showNotifications,
    enableHeartbeat = DEFAULT_OPTIONS.enableHeartbeat,
    onConnectionChange = undefined,
    autoConnect = DEFAULT_OPTIONS.autoConnect
  } = { ...DEFAULT_OPTIONS, ...options };
  
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [latestMessage, setLatestMessage] = useState<WebSocketMessage | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [connectionStats, setConnectionStats] = useState({
    lastConnected: null as Date | null,
    messageCount: 0,
    latency: 0,
    activeConnections: 0,
    totalConnections: 0
  });
  
  // Acesso ao contexto de autenticação
  const { user } = useAuth();
  
  const wsRef = useRef<WebSocketService | null>(null);
  const eventSubscriptionsRef = useRef<Array<{ unsubscribe: () => void }>>([]);
  const lastNotificationTimeRef = useRef<number>(0);
  const notificationThrottleMs = 30000; // 30 segundos
  
  // Função para mostrar notificações com limitação de frequência
  const showThrottledNotification = useCallback((type: 'success' | 'warning' | 'error', message: string) => {
    if (!showNotifications) return;
    
    const now = Date.now();
    if (now - lastNotificationTimeRef.current > notificationThrottleMs) {
      lastNotificationTimeRef.current = now;
      toast[type](message);
    }
  }, [showNotifications]);
  
  // Inicializar WebSocket e registrar eventos
  const initWebSocket = useCallback(() => {
    // Limpar inscrições anteriores
    eventSubscriptionsRef.current.forEach(sub => sub.unsubscribe());
    eventSubscriptionsRef.current = [];
    
    // Criar nova instância do WebSocketService
    wsRef.current = new WebSocketService(url, {
      reconnectAttempts,
      reconnectInterval,
      pingInterval: enableHeartbeat ? 30000 : 0
    });
    
    // Registrar eventos usando o barramento de eventos
    // Evento de conexão estabelecida
    const connectedSub = eventBus.on(WebSocketEvents.CONNECTED, () => {
      setIsConnected(true);
      setConnectionAttempts(0);
      setConnectionStats(prev => ({
        ...prev,
        lastConnected: new Date()
      }));
      
      if (onConnectionChange) {
        onConnectionChange(true);
      }
      
      showThrottledNotification('success', 'Conexão estabelecida em tempo real');
    });
    eventSubscriptionsRef.current.push(connectedSub);
    
    // Evento de desconexão
    const disconnectedSub = eventBus.on(WebSocketEvents.DISCONNECTED, () => {
      setIsConnected(false);
      
      if (onConnectionChange) {
        onConnectionChange(false);
      }
      
      showThrottledNotification('warning', 'Conexão em tempo real perdida');
    });
    eventSubscriptionsRef.current.push(disconnectedSub);
    
    // Evento de reconexão
    const reconnectingSub = eventBus.on(WebSocketEvents.RECONNECTING, () => {
      setConnectionAttempts(prev => prev + 1);
    });
    eventSubscriptionsRef.current.push(reconnectingSub);
    
    // Evento de erro
    const errorSub = eventBus.on(WebSocketEvents.ERROR, (error) => {
      console.error('WebSocket error:', error);
      showThrottledNotification('error', 'Erro na conexão em tempo real');
    });
    eventSubscriptionsRef.current.push(errorSub);
    
    // Evento de mensagens recebidas
    const messageSub = eventBus.on(WebSocketEvents.MESSAGE_RECEIVED, (data) => {
      // Atualizar latência se for resposta de ping
      if (data.type === 'pong' && data.originalTimestamp) {
        const latency = Date.now() - data.originalTimestamp;
        setConnectionStats(prev => ({
          ...prev,
          latency
        }));
        return;
      }
      
      setLatestMessage(data);
      setMessages(prev => [...prev, data]);
      setConnectionStats(prev => ({
        ...prev,
        messageCount: prev.messageCount + 1
      }));
    });
    eventSubscriptionsRef.current.push(messageSub);
    
    return wsRef.current;
  }, [url, reconnectAttempts, reconnectInterval, enableHeartbeat, onConnectionChange, showThrottledNotification]);
  
  // Função para conectar ao WebSocket
  const connect = useCallback(() => {
    if (!url) return;
    
    if (!wsRef.current) {
      wsRef.current = initWebSocket();
    }
    
    wsRef.current.connect(user?.id);
    
    // Atualizar estatísticas de conexão
    updateConnectionStats();
  }, [url, user, initWebSocket]);
  
  // Função para desconectar do WebSocket
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.disconnect();
      setIsConnected(false);
      
      if (onConnectionChange) {
        onConnectionChange(false);
      }
    }
  }, [onConnectionChange]);
  
  // Função para enviar mensagens
  const sendMessage = useCallback((data: object | string) => {
    if (wsRef.current) {
      return wsRef.current.send(data);
    }
    return false;
  }, []);
  
  // Função específica para enviar status de digitação
  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    if (wsRef.current) {
      wsRef.current.sendTypingStatus(conversationId, isTyping);
      return true;
    }
    return false;
  }, []);
  
  // Função específica para enviar mensagem de chat
  const sendChatMessage = useCallback((message: any) => {
    if (wsRef.current) {
      wsRef.current.sendChatMessage(message);
      return true;
    }
    return false;
  }, []);
  
  // Limpar mensagens
  const clearMessages = useCallback(() => {
    setMessages([]);
    setLatestMessage(null);
  }, []);
  
  // Atualizar estatísticas de conexão
  const updateConnectionStats = useCallback(() => {
    if (wsRef.current) {
      const details = wsRef.current.getConnectionDetails() as any;
      setConnectionStats(prev => ({
        ...prev,
        activeConnections: details.currentAttempt || 0,
        totalConnections: details.reconnectAttempts || 0
      }));
    }
  }, []);
  
  // Efeito para conectar/desconectar quando o URL muda
  useEffect(() => {
    if (url && autoConnect) {
      connect();
    }
    
    return () => {
      disconnect();
      
      // Limpar inscrições de eventos
      eventSubscriptionsRef.current.forEach(sub => sub.unsubscribe());
      eventSubscriptionsRef.current = [];
    };
  }, [url, autoConnect, connect, disconnect]);
  
  // Efeito para reconectar quando o usuário muda
  useEffect(() => {
    if (wsRef.current && isConnected && user) {
      // Reconectar para atualizar com o ID do usuário
      disconnect();
      connect();
    }
  }, [user?.id, disconnect, connect, isConnected]);
  
  // Inscrever-se em eventos específicos
  const subscribeToEvent = useCallback((event: WebSocketEvents, callback: (...args: any[]) => void) => {
    const subscription = eventBus.on(event, callback);
    eventSubscriptionsRef.current.push(subscription);
    return subscription;
  }, []);
  
  return {
    isConnected,
    messages,
    latestMessage,
    sendMessage,
    sendTypingStatus,
    sendChatMessage,
    connect,
    disconnect,
    clearMessages,
    connectionAttempts,
    connectionStats,
    subscribeToEvent,
    WebSocketEvents
  };
};
