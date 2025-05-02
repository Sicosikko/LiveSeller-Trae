
type WebSocketOptions = {
  reconnectAttempts?: number;
  reconnectInterval?: number;
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  pingInterval?: number;
};

class WebSocketCore {
  protected socket: WebSocket | null = null;
  protected url: string;
  protected reconnectAttempts: number;
  protected reconnectInterval: number;
  protected currentAttempt: number = 0;
  protected onOpenCallback?: (event: Event) => void;
  protected onMessageCallback?: (event: MessageEvent) => void;
  protected onCloseCallback?: (event: CloseEvent) => void;
  protected onErrorCallback?: (event: Event) => void;
  protected pingInterval?: number;
  protected pingTimer: number | null = null;
  protected messageQueue: Array<string> = [];
  protected isReconnecting: boolean = false;

  constructor(url: string, options: WebSocketOptions = {}) {
    this.url = url;
    this.reconnectAttempts = options.reconnectAttempts || 5;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.onOpenCallback = options.onOpen;
    this.onMessageCallback = options.onMessage;
    this.onCloseCallback = options.onClose;
    this.onErrorCallback = options.onError;
    this.pingInterval = options.pingInterval;
  }

  connect(): void {
    if (!this.url) return;
    
    if (this.socket) {
      this.socket.close();
    }

    try {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = (event) => {
        console.log('WebSocket connected');
        this.currentAttempt = 0;
        this.isReconnecting = false;
        
        // Process message queue if any
        if (this.messageQueue.length > 0) {
          console.log(`Processing ${this.messageQueue.length} queued messages`);
          
          // Clone and clear queue before sending to avoid loops
          const queueToProcess = [...this.messageQueue];
          this.messageQueue = [];
          
          // Send all queued messages
          queueToProcess.forEach(msg => this.send(msg));
        }
        
        // Setup ping interval if specified
        if (this.pingInterval) {
          this.startPingTimer();
        }
        
        if (this.onOpenCallback) this.onOpenCallback(event);
      };

      this.socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        if (this.onMessageCallback) this.onMessageCallback(event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket closed', event.code, event.reason);
        
        // Clear ping timer if exists
        if (this.pingTimer) {
          window.clearInterval(this.pingTimer);
          this.pingTimer = null;
        }
        
        if (this.onCloseCallback) this.onCloseCallback(event);
        
        if (!event.wasClean && this.currentAttempt < this.reconnectAttempts && !this.isReconnecting) {
          console.log(`Attempting to reconnect (${this.currentAttempt + 1}/${this.reconnectAttempts})...`);
          this.currentAttempt++;
          this.isReconnecting = true;
          setTimeout(() => {
            this.isReconnecting = false;
            this.connect();
          }, this.reconnectInterval);
        }
      };

      this.socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        if (this.onErrorCallback) this.onErrorCallback(event);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  protected startPingTimer(): void {
    if (this.pingInterval && this.pingInterval > 0) {
      this.pingTimer = window.setInterval(() => {
        this.send({ type: 'ping', timestamp: Date.now() });
      }, this.pingInterval);
    }
  }

  disconnect(): void {
    if (this.socket) {
      // Clear ping timer if exists
      if (this.pingTimer) {
        window.clearInterval(this.pingTimer);
        this.pingTimer = null;
      }
      
      this.socket.close();
      this.socket = null;
      this.messageQueue = []; // Clear message queue on disconnect
    }
  }

  send(data: string | object): boolean {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected, queueing message');
      
      // Queue message for sending when connection is established
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.messageQueue.push(message);
      
      return false;
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.socket.send(message);
      return true;
    } catch (error) {
      console.error('Failed to send WebSocket message:', error);
      return false;
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  getReadyState(): number | null {
    return this.socket ? this.socket.readyState : null;
  }
  
  getConnectionDetails(): object {
    return {
      url: this.url,
      readyState: this.getReadyState(),
      reconnectAttempt: this.currentAttempt,
      maxReconnectAttempts: this.reconnectAttempts,
      isReconnecting: this.isReconnecting,
      queuedMessages: this.messageQueue.length,
    };
  }
}

export default WebSocketCore;
export type { WebSocketOptions };
