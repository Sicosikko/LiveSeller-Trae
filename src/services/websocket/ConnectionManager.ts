
import WebSocketService from './WebSocketService';
import { WebSocketOptions } from './WebSocketCore';

/**
 * Gerencia múltiplas conexões WebSocket com balanceamento de carga e failover
 */
class ConnectionManager {
  private connections: WebSocketService[] = [];
  private activeConnection: WebSocketService | null = null;
  private connectionConfig: {
    urls: string[];
    options: WebSocketOptions;
    encryptionKey?: string;
  };

  constructor(config: {
    urls: string[];
    options?: WebSocketOptions;
    encryptionKey?: string;
  }) {
    this.connectionConfig = {
      urls: config.urls,
      options: config.options || {},
      encryptionKey: config.encryptionKey,
    };
    
    // Inicializar conexões ao instanciar
    this.initializeConnections();
  }

  /**
   * Inicializa todas as conexões WebSocket disponíveis
   */
  private initializeConnections(): void {
    // Limpar conexões existentes
    this.connections = [];
    
    // Criar conexões para cada URL configurada
    this.connectionConfig.urls.forEach(url => {
      const connection = new WebSocketService(url, this.connectionConfig.options);
      
      // Use the correct method to set callbacks
      // Set up onopen callback using the correct method
      const originalOpenCallback = connection['onOpenCallback'];
      connection['onOpenCallback'] = (event) => {
        console.log(`Conexão estabelecida com ${url}`);
        
        // Se não houver conexão ativa, definir esta como ativa
        if (!this.activeConnection) {
          this.activeConnection = connection;
        }
        
        // Call original callback if it exists
        if (originalOpenCallback) {
          originalOpenCallback(event);
        }
      };
      
      // Set up onclose callback using the correct method
      const originalCloseCallback = connection['onCloseCallback'];
      connection['onCloseCallback'] = (event) => {
        console.log(`Conexão fechada com ${url}`);
        
        // Se esta era a conexão ativa, buscar outra
        if (this.activeConnection === connection) {
          this.activeConnection = null;
          this.findActiveConnection();
        }
        
        // Call original callback if it exists
        if (originalCloseCallback) {
          originalCloseCallback(event);
        }
      };
      
      // Adicionar à lista de conexões
      this.connections.push(connection);
    });
  }
  
  /**
   * Procura por uma conexão ativa entre as disponíveis
   */
  private findActiveConnection(): void {
    const activeConn = this.connections.find(conn => conn.isConnected());
    
    if (activeConn) {
      this.activeConnection = activeConn;
    } else {
      // Se não houver conexão ativa, tentar reconectar após um breve delay
      setTimeout(() => {
        this.reconnectAll();
      }, 2000);
    }
  }
  
  /**
   * Conecta a todas as URLs configuradas
   */
  connect(): void {
    this.connections.forEach(connection => {
      connection.connect();
    });
  }
  
  /**
   * Reconecta a todas as URLs após queda de conexão
   */
  reconnectAll(): void {
    this.connections.forEach(connection => {
      if (!connection.isConnected()) {
        connection.connect();
      }
    });
  }
  
  /**
   * Desconecta de todos os servidores
   */
  disconnect(): void {
    this.connections.forEach(connection => {
      connection.disconnect();
    });
    this.activeConnection = null;
  }
  
  /**
   * Envia uma mensagem através da conexão ativa
   * Se não houver conexão ativa, tenta todas as conexões
   */
  send(data: any): boolean {
    // Se houver uma conexão ativa, enviar por ela
    if (this.activeConnection && this.activeConnection.isConnected()) {
      return this.activeConnection.send(data);
    }
    
    // Tentar enviar por qualquer conexão disponível
    for (const connection of this.connections) {
      if (connection.isConnected()) {
        this.activeConnection = connection; // Atualizar conexão ativa
        return connection.send(data);
      }
    }
    
    // Se não houver conexões disponíveis, colocar em fila e tentar reconectar
    console.warn('Nenhuma conexão WebSocket disponível. Tentando reconectar...');
    this.reconnectAll();
    
    return false;
  }
  
  /**
   * Verifica se há pelo menos uma conexão ativa
   */
  isConnected(): boolean {
    return this.connections.some(connection => connection.isConnected());
  }
  
  /**
   * Obtém informações detalhadas sobre o estado das conexões
   */
  getConnectionStatus(): {
    totalConnections: number;
    activeConnections: number;
    urls: string[];
    details: any[];
  } {
    const activeCount = this.connections.filter(conn => conn.isConnected()).length;
    
    return {
      totalConnections: this.connections.length,
      activeConnections: activeCount,
      urls: this.connectionConfig.urls,
      details: this.connections.map(conn => conn.getConnectionDetails())
    };
  }
  
  /**
   * Configura callbacks para eventos WebSocket em todas as conexões
   * Adapted to access internal properties directly since public methods may not exist
   */
  onMessage(callback: (event: MessageEvent) => void): void {
    this.connections.forEach(connection => {
      connection['onMessageCallback'] = callback;
    });
  }
  
  onOpen(callback: () => void): void {
    this.connections.forEach(connection => {
      connection['onOpenCallback'] = callback;
    });
  }
  
  onClose(callback: () => void): void {
    this.connections.forEach(connection => {
      connection['onCloseCallback'] = callback;
    });
  }
  
  onError(callback: () => void): void {
    this.connections.forEach(connection => {
      connection['onErrorCallback'] = callback;
    });
  }
}

export default ConnectionManager;
