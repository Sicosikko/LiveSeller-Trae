
import { useState, useEffect, useCallback, useRef } from 'react';
import ConnectionManager from '../services/websocket/ConnectionManager';
import { toast } from 'sonner';

export interface WebSocketClusterOptions {
  urls: string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  automaticReconnect?: boolean;
  showNotifications?: boolean;
  pingInterval?: number;
  onConnectionChange?: (isConnected: boolean) => void;
  encryptionKey?: string;
}

export interface WebSocketMessage {
  type: string;
  id?: string;
  timestamp?: number;
  priority?: 'low' | 'medium' | 'high';
  [key: string]: any;
}

export const useWebSocketCluster = (options: WebSocketClusterOptions) => {
  const { urls, pingInterval = 30000 } = options;
  
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
  
  const connectionManagerRef = useRef<ConnectionManager | null>(null);
  const pingTimerRef = useRef<number | null>(null);
  const pingStartTimeRef = useRef<number>(0);
  const lastNotificationRef = useRef<number>(0);
  
  const notificationThrottleMs = 30000;
  const showNotifications = options.showNotifications ?? false;

  const showThrottledNotification = useCallback((type: 'success' | 'warning' | 'error', message: string) => {
    const now = Date.now();
    if (showNotifications && (now - lastNotificationRef.current > notificationThrottleMs)) {
      lastNotificationRef.current = now;
      toast[type](message);
    }
  }, [showNotifications]);

  const connect = useCallback(() => {
    if (!urls || urls.length === 0) return;
    
    connectionManagerRef.current = new ConnectionManager({
      urls,
      options: {
        reconnectAttempts: options.reconnectAttempts || 5,
        reconnectInterval: options.reconnectInterval || 3000,
        pingInterval: pingInterval,
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
          // Verificar se todas as conexões foram fechadas
          if (connectionManagerRef.current && !connectionManagerRef.current.isConnected()) {
            setIsConnected(false);
            setConnectionAttempts(prev => prev + 1);
            
            if (options.onConnectionChange) {
              options.onConnectionChange(false);
            }
            
            showThrottledNotification('warning', 'Conexão em tempo real perdida');
          }
        },
        onError: () => {
          showThrottledNotification('error', 'Erro na conexão em tempo real');
        }
      },
      encryptionKey: options.encryptionKey
    });

    connectionManagerRef.current.connect();
    updateConnectionStats();
  }, [urls, options, showThrottledNotification, pingInterval]);

  const disconnect = useCallback(() => {
    if (connectionManagerRef.current) {
      connectionManagerRef.current.disconnect();
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
    if (isConnected && connectionManagerRef.current) {
      pingStartTimeRef.current = Date.now();
      connectionManagerRef.current.send({ type: 'ping' });
    }
  }, [isConnected]);

  const sendMessage = useCallback(
    (data: object | string) => {
      if (connectionManagerRef.current) {
        return connectionManagerRef.current.send(data);
      }
      return false;
    },
    []
  );
  
  const clearMessages = useCallback(() => {
    setMessages([]);
    setLatestMessage(null);
  }, []);
  
  const updateConnectionStats = useCallback(() => {
    if (connectionManagerRef.current) {
      const status = connectionManagerRef.current.getConnectionStatus();
      setConnectionStats(prev => ({
        ...prev,
        activeConnections: status.activeConnections,
        totalConnections: status.totalConnections
      }));
    }
  }, []);

  useEffect(() => {
    // Verificar se há URLs válidas
    if (urls && urls.length > 0 && urls.some(url => url !== 'wss://dev-api.whatzapp.com/ws')) {
      connect();
    }
    
    // Setup ping interval
    if (pingInterval > 0) {
      pingTimerRef.current = window.setInterval(() => {
        sendPing();
        updateConnectionStats();
      }, pingInterval);
    }
    
    return () => {
      disconnect();
      if (pingTimerRef.current) {
        window.clearInterval(pingTimerRef.current);
      }
    };
  }, [connect, disconnect, pingInterval, sendPing, urls, updateConnectionStats]);

  return {
    isConnected,
    messages,
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    clearMessages,
    connectionAttempts,
    connectionStats
  };
};
