
import { useState, useEffect, useCallback, useRef } from 'react';
import WebSocketService from '../services/websocketService';
import { toast } from '@/components/ui/sonner';

export interface WebSocketHookOptions {
  reconnectAttempts?: number;
  reconnectInterval?: number;
  automaticReconnect?: boolean;
  showNotifications?: boolean;
  pingInterval?: number;
  onConnectionChange?: (isConnected: boolean) => void;
}

export interface WebSocketMessage {
  type: string;
  id?: string;
  timestamp?: number;
  priority?: 'low' | 'medium' | 'high';
  [key: string]: any;
}

export const useWebSocket = (url: string, options: WebSocketHookOptions = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [latestMessage, setLatestMessage] = useState<WebSocketMessage | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [connectionStats, setConnectionStats] = useState({
    lastConnected: null as Date | null,
    messageCount: 0,
    latency: 0,
  });
  
  const websocketRef = useRef<WebSocketService | null>(null);
  const pingTimerRef = useRef<number | null>(null);
  const pingStartTimeRef = useRef<number>(0);
  const lastNotificationRef = useRef<number>(0);
  
  // Limitar notificações para no máximo uma a cada 30 segundos
  const notificationThrottleMs = 30000;

  const showNotifications = options.showNotifications ?? false;
  const pingInterval = options.pingInterval ?? 30000; // Default: 30 segundos
  const maxReconnectAttempts = options.reconnectAttempts ?? 3; // Limitar a 3 tentativas por padrão

  const showThrottledNotification = useCallback((type: 'success' | 'warning' | 'error', message: string) => {
    const now = Date.now();
    if (showNotifications && (now - lastNotificationRef.current > notificationThrottleMs)) {
      lastNotificationRef.current = now;
      toast[type](message);
    }
  }, [showNotifications]);

  const connect = useCallback(() => {
    if (!url) return;
    
    // Não reconectar se já atingiu o limite de tentativas
    if (connectionAttempts >= maxReconnectAttempts) {
      console.log(`Máximo de ${maxReconnectAttempts} tentativas de reconexão atingido.`);
      return;
    }

    websocketRef.current = new WebSocketService(url, {
      reconnectAttempts: maxReconnectAttempts,
      reconnectInterval: options.reconnectInterval,
      onOpen: () => {
        setIsConnected(true);
        setConnectionAttempts(0);
        setConnectionStats(prev => ({
          ...prev,
          lastConnected: new Date(),
        }));
        
        if (options.onConnectionChange) {
          options.onConnectionChange(true);
        }
        
        showThrottledNotification('success', 'Conexão estabelecida em tempo real');
      },
      onMessage: (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle ping-pong for latency measurement
          if (data.type === 'pong' && pingStartTimeRef.current) {
            const latency = Date.now() - pingStartTimeRef.current;
            setConnectionStats(prev => ({
              ...prev,
              latency
            }));
            return;
          }
          
          setLatestMessage(data);
          setMessages((prev) => [...prev, data]);
          setConnectionStats(prev => ({
            ...prev,
            messageCount: prev.messageCount + 1
          }));
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      },
      onClose: () => {
        setIsConnected(false);
        
        // Incrementar tentativas apenas se não ultrapassou o limite
        if (connectionAttempts < maxReconnectAttempts) {
          setConnectionAttempts(prev => prev + 1);
        }
        
        if (options.onConnectionChange) {
          options.onConnectionChange(false);
        }
        
        showThrottledNotification('warning', 'Conexão em tempo real perdida');
      },
      onError: () => {
        showThrottledNotification('error', 'Erro na conexão em tempo real');
      }
    });

    websocketRef.current.connect();
  }, [url, options, showThrottledNotification, connectionAttempts, maxReconnectAttempts]);

  const disconnect = useCallback(() => {
    if (websocketRef.current) {
      websocketRef.current.disconnect();
      setIsConnected(false);
      
      if (options.onConnectionChange) {
        options.onConnectionChange(false);
      }
      
      // Clear ping interval
      if (pingTimerRef.current) {
        window.clearInterval(pingTimerRef.current);
        pingTimerRef.current = null;
      }
    }
  }, [options]);
  
  const sendPing = useCallback(() => {
    if (isConnected && websocketRef.current) {
      pingStartTimeRef.current = Date.now();
      websocketRef.current.send({ type: 'ping' });
    }
  }, [isConnected]);

  const sendMessage = useCallback(
    (data: object | string) => {
      if (websocketRef.current) {
        return websocketRef.current.send(data);
      }
      return false;
    },
    []
  );
  
  // Clear messages queue
  const clearMessages = useCallback(() => {
    setMessages([]);
    setLatestMessage(null);
  }, []);

  useEffect(() => {
    // Apenas conectar se a URL for válida e não estiver em modo de desenvolvimento simulado
    if (url && url !== 'wss://dev-api.whatzapp.com/ws') {
      connect();
    }
    
    // Setup ping interval
    if (pingInterval > 0) {
      pingTimerRef.current = window.setInterval(sendPing, pingInterval);
    }
    
    return () => {
      disconnect();
      if (pingTimerRef.current) {
        window.clearInterval(pingTimerRef.current);
      }
    };
  }, [connect, disconnect, pingInterval, sendPing, url]);

  return {
    isConnected,
    messages,
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    clearMessages,
    connectionAttempts,
    connectionStats,
    maxReconnectAttempts
  };
};
