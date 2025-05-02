
import CryptoJS from 'crypto-js';

class EncryptedWebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private encryptionPassword: string | null = null;
  private onMessageCallback: ((event: MessageEvent) => void) | null = null;
  private onOpenCallback: (() => void) | null = null;
  private onCloseCallback: (() => void) | null = null;
  private onErrorCallback: (() => void) | null = null;
  
  constructor(url: string) {
    this.url = url;
  }
  
  setEncryptionPassword(password: string): void {
    this.encryptionPassword = password;
  }
  
  connect(): void {
    if (this.ws) {
      this.disconnect();
    }
    
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        if (this.onOpenCallback) {
          this.onOpenCallback();
        }
      };
      
      this.ws.onclose = () => {
        if (this.onCloseCallback) {
          this.onCloseCallback();
        }
      };
      
      this.ws.onerror = () => {
        if (this.onErrorCallback) {
          this.onErrorCallback();
        }
      };
      
      this.ws.onmessage = (event: MessageEvent) => {
        if (this.onMessageCallback) {
          this.onMessageCallback(event);
        }
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }
  
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  
  onMessage(callback: (event: MessageEvent) => void): () => void {
    this.onMessageCallback = callback;
    return () => {
      this.onMessageCallback = null;
    };
  }
  
  onOpen(callback: () => void): void {
    this.onOpenCallback = callback;
  }
  
  onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }
  
  onError(callback: () => void): void {
    this.onErrorCallback = callback;
  }
  
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
  
  send(data: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }
    
    try {
      if (typeof data !== 'string') {
        data = JSON.stringify(data);
      }
      this.ws.send(data);
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  }
  
  sendEncrypted(data: any): void {
    if (!this.encryptionPassword) {
      console.error('Encryption password not set');
      return;
    }
    
    try {
      const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(jsonData, this.encryptionPassword).toString();
      this.send({ encrypted });
    } catch (error) {
      console.error('Error encrypting and sending WebSocket message:', error);
    }
  }
}

export default EncryptedWebSocketService;
