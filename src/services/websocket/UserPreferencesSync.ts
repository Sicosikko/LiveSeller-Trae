
import WebSocketService from './WebSocketService';

// Tipos para preferências de usuário
export interface UserPreferences {
  theme: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
  };
  dashboardLayout: {
    compactView: boolean;
    visibleWidgets: string[];
  };
  lastSyncedAt?: string;
}

class UserPreferencesSync {
  private websocket: WebSocketService | null = null;
  private userId: string | null = null;
  private preferences: UserPreferences | null = null;
  private subscribers: Array<(prefs: UserPreferences) => void> = [];
  private syncInProgress: boolean = false;
  private pendingChanges: Partial<UserPreferences> | null = null;
  
  constructor() {
    // Inicializar com valores padrão
    this.preferences = {
      theme: 'system',
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false
      },
      dashboardLayout: {
        compactView: false,
        visibleWidgets: ['stats', 'recentChats', 'teamActivity']
      }
    };
    
    // Carregar do localStorage
    this.loadFromLocalStorage();
  }
  
  public setUserId(userId: string): void {
    this.userId = userId;
  }
  
  public setWebSocket(websocket: WebSocketService): void {
    this.websocket = websocket;
    
    // Configurar listener para atualizações de preferências
    if (this.websocket) {
      this.websocket.onMessage((event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'user_preferences_update' && data.userId === this.userId) {
            this.handleRemoteUpdate(data.preferences);
          }
        } catch (e) {
          console.error('Erro ao processar mensagem de preferências:', e);
        }
      });
    }
    
    // Solicitar preferências do servidor
    this.requestPreferences();
  }
  
  public getPreferences(): UserPreferences {
    return this.preferences || {
      theme: 'system',
      language: 'pt-BR',
      notifications: { email: true, push: true, sms: false },
      accessibility: { highContrast: false, largeText: false, reducedMotion: false },
      dashboardLayout: { compactView: false, visibleWidgets: ['stats', 'recentChats'] }
    };
  }
  
  public updatePreferences(updatedPrefs: Partial<UserPreferences>): void {
    // Mesclar com preferências existentes
    this.preferences = {
      ...this.preferences!,
      ...updatedPrefs,
      lastSyncedAt: new Date().toISOString()
    };
    
    // Salvar localmente
    this.saveToLocalStorage();
    
    // Notificar assinantes
    this.notifySubscribers();
    
    // Sincronizar com o servidor
    this.syncToServer(updatedPrefs);
  }
  
  public subscribe(callback: (prefs: UserPreferences) => void): () => void {
    this.subscribers.push(callback);
    
    // Notificar imediatamente com o estado atual
    if (this.preferences) {
      callback(this.preferences);
    }
    
    // Retornar função de cancelamento
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  private loadFromLocalStorage(): void {
    try {
      const storedPrefs = localStorage.getItem('user-preferences');
      
      if (storedPrefs) {
        this.preferences = {
          ...this.preferences!,
          ...JSON.parse(storedPrefs)
        };
      }
    } catch (e) {
      console.error('Erro ao carregar preferências do localStorage:', e);
    }
  }
  
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('user-preferences', JSON.stringify(this.preferences));
    } catch (e) {
      console.error('Erro ao salvar preferências no localStorage:', e);
    }
  }
  
  private notifySubscribers(): void {
    if (!this.preferences) return;
    
    this.subscribers.forEach(callback => {
      callback(this.preferences!);
    });
  }
  
  private requestPreferences(): void {
    if (!this.websocket || !this.userId) return;
    
    this.websocket.send({
      type: 'request_user_preferences',
      userId: this.userId
    });
  }
  
  private syncToServer(changes: Partial<UserPreferences>): void {
    if (!this.websocket || !this.userId) {
      // Armazenar mudanças pendentes para sincronizar quando possível
      this.pendingChanges = {
        ...this.pendingChanges,
        ...changes
      };
      return;
    }
    
    // Se já houver sincronização em andamento, armazenar para enviar depois
    if (this.syncInProgress) {
      this.pendingChanges = {
        ...this.pendingChanges,
        ...changes
      };
      return;
    }
    
    this.syncInProgress = true;
    
    // Enviar atualizações para o servidor
    this.websocket.send({
      type: 'update_user_preferences',
      userId: this.userId,
      preferences: changes,
      timestamp: new Date().toISOString()
    });
    
    // Aguardar um pouco para evitar múltiplas sincronizações rápidas
    setTimeout(() => {
      this.syncInProgress = false;
      
      // Verificar se há mudanças pendentes
      if (this.pendingChanges) {
        const pendingChanges = { ...this.pendingChanges };
        this.pendingChanges = null;
        this.syncToServer(pendingChanges);
      }
    }, 1000);
  }
  
  private handleRemoteUpdate(remotePrefs: Partial<UserPreferences>): void {
    // Ignorar se estivermos em uma sincronização
    if (this.syncInProgress) return;
    
    // Atualizar preferências locais com dados do servidor
    this.preferences = {
      ...this.preferences!,
      ...remotePrefs,
      lastSyncedAt: new Date().toISOString()
    };
    
    // Salvar localmente
    this.saveToLocalStorage();
    
    // Notificar assinantes
    this.notifySubscribers();
  }
}

export const userPreferencesSync = new UserPreferencesSync();
export default userPreferencesSync;
