
import WebSocketCore, { WebSocketOptions } from './WebSocketCore';
import DeviceManager from './DeviceManager';
import SyncManager from './SyncManager';
import eventBus from './event-bus';

// Definir eventos do WebSocket para tipagem
export enum WebSocketEvents {
  CONNECTED = 'websocket:connected',
  DISCONNECTED = 'websocket:disconnected',
  MESSAGE_RECEIVED = 'websocket:message',
  RECONNECTING = 'websocket:reconnecting',
  ERROR = 'websocket:error',
  SYNC_RECEIVED = 'websocket:sync',
  NOTIFICATION = 'websocket:notification',
  CHAT_MESSAGE = 'websocket:chat_message',
  USER_STATUS = 'websocket:user_status',
  TYPING_STATUS = 'websocket:typing',
}

class WebSocketService extends WebSocketCore {
  private deviceManager: DeviceManager;
  private syncManager: SyncManager;
  private deviceId: string;
  private userId?: string;
  private messageCallbacks: Array<(event: MessageEvent) => void> = [];
  private heartbeatInterval: number | null = null;
  private heartbeatTimeout = 30000; // 30 segundos
  private lastPongTime = 0;
  private sessionInfo: { [key: string]: any } = {};

  constructor(url: string, options: WebSocketOptions = {}) {
    super(url, options);
    
    // Initialize managers
    this.deviceManager = new DeviceManager();
    this.syncManager = new SyncManager();
    
    // Get device ID
    this.deviceId = this.deviceManager.getDeviceId();
    
    // Configurar heartbeat para manter a conexão ativa
    this.setupHeartbeat();
    
    // Extend the onMessage handler to process special messages
    const originalOnMessageCallback = this.onMessageCallback;
    this.onMessageCallback = (event) => {
      // Process messages
      try {
        const data = JSON.parse(event.data);
        
        // Lidar com pong para heartbeat
        if (data.type === 'pong') {
          this.lastPongTime = Date.now();
          return;
        }
        
        // Se for uma mensagem de sincronização de outro dispositivo com o mesmo usuário
        if (data.type === 'cross_device_sync' && data.deviceId !== this.deviceId) {
          this.syncManager.processCrossDeviceSync(data);
          // Emitir evento de sincronização
          eventBus.emit(WebSocketEvents.SYNC_RECEIVED, data);
        }
        
        // Se for uma mensagem de notificação
        if (data.type === 'notification') {
          eventBus.emit(WebSocketEvents.NOTIFICATION, data);
        }
        
        // Se for uma mensagem de chat
        if (data.type === 'chat_message') {
          eventBus.emit(WebSocketEvents.CHAT_MESSAGE, data);
        }
        
        // Se for uma atualização de status de usuário
        if (data.type === 'user_status') {
          eventBus.emit(WebSocketEvents.USER_STATUS, data);
        }
        
        // Se for uma notificação de digitação
        if (data.type === 'typing_status') {
          eventBus.emit(WebSocketEvents.TYPING_STATUS, data);
        }
        
        // Emitir evento genérico para qualquer mensagem recebida
        eventBus.emit(WebSocketEvents.MESSAGE_RECEIVED, data);
      } catch (e) {
        console.error('Erro ao processar mensagem WebSocket:', e);
      }
      
      // Call the original callback if provided
      if (originalOnMessageCallback) {
        originalOnMessageCallback(event);
      }
      
      // Call all registered message callbacks
      this.messageCallbacks.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Erro em callback de mensagem:', error);
        }
      });
    };
  }

  // Add onMessage method for registering callbacks
  onMessage(callback: (event: MessageEvent) => void): () => void {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  // Override connect to add device identification
  connect(userId?: string): void {
    // Armazenar ID do usuário para autenticação
    if (userId) {
      this.userId = userId;
    }
    
    super.connect();
    
    // Wait until connected to send device identification
    if (this.isConnected()) {
      this.sendDeviceIdentification();
    } else {
      // If not connected yet, the message will be sent in onopen handler
      const originalOnOpenCallback = this.onOpenCallback;
      this.onOpenCallback = (event) => {
        // Send device identification on connect
        this.sendDeviceIdentification();
        
        // Iniciar heartbeat após conexão
        this.startHeartbeat();
        
        // Emitir evento de conexão
        eventBus.emit(WebSocketEvents.CONNECTED, {
          timestamp: Date.now(),
          deviceId: this.deviceId
        });
        
        // Call the original callback if provided
        if (originalOnOpenCallback) {
          originalOnOpenCallback(event);
        }
      };
      
      // Configurar callback para fechamento
      const originalOnCloseCallback = this.onCloseCallback;
      this.onCloseCallback = (event) => {
        // Parar heartbeat
        this.stopHeartbeat();
        
        // Emitir evento de desconexão
        eventBus.emit(WebSocketEvents.DISCONNECTED, {
          timestamp: Date.now(),
          deviceId: this.deviceId,
          code: event.code,
          reason: event.reason
        });
        
        // Call the original callback if provided
        if (originalOnCloseCallback) {
          originalOnCloseCallback(event);
        }
      };
    }
  }
  
  // Override disconnect to add device disconnection notification
  disconnect(): void {
    // Parar heartbeat
    this.stopHeartbeat();
    
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Send disconnection message before closing
      this.send({
        type: 'device_disconnect',
        deviceId: this.deviceId,
        userId: this.userId,
        timestamp: Date.now()
      });
    }
    
    // Call parent method to handle the rest
    super.disconnect();
  }
  
  // Configurar heartbeat para manter a conexão ativa
  private setupHeartbeat(): void {
    this.lastPongTime = Date.now();
  }
  
  // Iniciar heartbeat
  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatInterval = window.setInterval(() => {
      if (this.isConnected()) {
        // Enviar ping
        this.send({
          type: 'ping',
          timestamp: Date.now(),
          deviceId: this.deviceId
        });
        
        // Verificar se recebemos pong recentemente
        const now = Date.now();
        if (now - this.lastPongTime > this.heartbeatTimeout * 2) {
          console.warn('Não recebeu pong há muito tempo, reconectando...');
          this.reconnect();
        }
      } else {
        this.reconnect();
      }
    }, this.heartbeatTimeout);
  }
  
  // Parar heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  
  // Reconectar ao WebSocket
  private reconnect(): void {
    eventBus.emit(WebSocketEvents.RECONNECTING, {
      timestamp: Date.now(),
      deviceId: this.deviceId
    });
    
    this.disconnect();
    this.connect(this.userId);
  }
  
  // Send device identification
  private sendDeviceIdentification(): void {
    const authPayload = this.userId ? { userId: this.userId } : {};
    
    this.send({
      type: 'device_connect',
      deviceId: this.deviceId,
      platform: this.deviceManager.getPlatformInfo(),
      timestamp: Date.now(),
      ...authPayload
    });
    
    // Se tiver informações de sessão, enviar
    if (Object.keys(this.sessionInfo).length > 0) {
      this.sendSessionInfo();
    }
  }
  
  // Definir informações de sessão a serem sincronizadas entre dispositivos
  setSessionInfo(key: string, value: any): void {
    this.sessionInfo[key] = value;
    
    // Se conectado, enviar atualização
    if (this.isConnected()) {
      this.sendSessionInfo();
    }
  }
  
  // Enviar informações de sessão
  private sendSessionInfo(): void {
    this.send({
      type: 'session_info',
      deviceId: this.deviceId,
      userId: this.userId,
      sessionInfo: this.sessionInfo,
      timestamp: Date.now()
    });
  }
  
  // Enviar notificação de digitação
  sendTypingStatus(conversationId: string, isTyping: boolean): void {
    this.send({
      type: 'typing_status',
      deviceId: this.deviceId,
      userId: this.userId,
      conversationId,
      isTyping,
      timestamp: Date.now()
    });
    
    // Emitir evento local também
    eventBus.emit(WebSocketEvents.TYPING_STATUS, {
      deviceId: this.deviceId,
      userId: this.userId,
      conversationId,
      isTyping,
      timestamp: Date.now(),
      isLocal: true
    });
  }
  
  // Enviar mensagem de chat
  sendChatMessage(message: any): void {
    const enrichedMessage = {
      ...message,
      deviceId: this.deviceId,
      userId: this.userId,
      timestamp: Date.now()
    };
    
    this.send({
      type: 'chat_message',
      ...enrichedMessage
    });
    
    // Emitir evento local
    eventBus.emit(WebSocketEvents.CHAT_MESSAGE, {
      ...enrichedMessage,
      isLocal: true
    });
  }
  
  // Override getConnectionDetails to include device ID
  getConnectionDetails(): object {
    return {
      ...super.getConnectionDetails(),
      deviceId: this.deviceId,
      userId: this.userId,
      lastPongTime: this.lastPongTime
    };
  }
}

export default WebSocketService;
export type { WebSocketOptions };
