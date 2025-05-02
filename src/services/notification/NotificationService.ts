
import eventBus from '../websocket/event-bus';
import { WebSocketEvents } from '../websocket/WebSocketService';

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CHAT = 'chat',
  TASK = 'task',
  SYSTEM = 'system',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  link?: string;
  data?: any;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Array<(notifications: Notification[]) => void> = [];
  
  constructor() {
    // Registrar para receber notificações via WebSocket
    eventBus.on(WebSocketEvents.NOTIFICATION, (data) => {
      if (data && data.notification) {
        this.addNotification(data.notification);
      }
    });
    
    // Registrar para receber mensagens de chat como notificações
    eventBus.on(WebSocketEvents.CHAT_MESSAGE, (data) => {
      if (data && !data.isLocal) {
        this.addNotification({
          id: data.id || `chat-${Date.now()}`,
          type: NotificationType.CHAT,
          title: data.senderName || 'Nova mensagem',
          message: data.message || data.content || '',
          timestamp: data.timestamp || Date.now(),
          isRead: false,
          data: data
        });
      }
    });
    
    // Carregar notificações salvas do localStorage
    this.loadFromStorage();
  }
  
  // Adicionar uma nova notificação
  addNotification(notification: Partial<Notification>): void {
    const newNotification: Notification = {
      id: notification.id || `notification-${Date.now()}`,
      type: notification.type || NotificationType.INFO,
      title: notification.title || 'Notificação',
      message: notification.message || '',
      timestamp: notification.timestamp || Date.now(),
      isRead: notification.isRead || false,
      link: notification.link,
      data: notification.data
    };
    
    this.notifications = [newNotification, ...this.notifications];
    
    // Limitar a 100 notificações
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }
    
    // Salvar no localStorage
    this.saveToStorage();
    
    // Notificar ouvintes
    this.notifyListeners();
  }
  
  // Marcar notificação como lida
  markAsRead(id: string): void {
    this.notifications = this.notifications.map(notification => {
      if (notification.id === id) {
        return {
          ...notification,
          isRead: true
        };
      }
      return notification;
    });
    
    // Salvar no localStorage
    this.saveToStorage();
    
    // Notificar ouvintes
    this.notifyListeners();
  }
  
  // Marcar todas as notificações como lidas
  markAllAsRead(): void {
    this.notifications = this.notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
    
    // Salvar no localStorage
    this.saveToStorage();
    
    // Notificar ouvintes
    this.notifyListeners();
  }
  
  // Remover uma notificação
  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
    
    // Salvar no localStorage
    this.saveToStorage();
    
    // Notificar ouvintes
    this.notifyListeners();
  }
  
  // Limpar todas as notificações
  clearAll(): void {
    this.notifications = [];
    
    // Salvar no localStorage
    this.saveToStorage();
    
    // Notificar ouvintes
    this.notifyListeners();
  }
  
  // Obter todas as notificações
  getNotifications(): Notification[] {
    return [...this.notifications];
  }
  
  // Obter notificações não lidas
  getUnreadNotifications(): Notification[] {
    return this.notifications.filter(notification => !notification.isRead);
  }
  
  // Registrar um ouvinte para mudanças nas notificações
  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.push(callback);
    
    // Chamar imediatamente com o estado atual
    callback(this.getNotifications());
    
    // Retornar função para cancelar a inscrição
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
  
  // Notificar todos os ouvintes
  private notifyListeners(): void {
    const notificationCopy = this.getNotifications();
    this.listeners.forEach(listener => {
      try {
        listener(notificationCopy);
      } catch (error) {
        console.error('Erro ao notificar ouvinte:', error);
      }
    });
  }
  
  // Salvar notificações no localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
    }
  }
  
  // Carregar notificações do localStorage
  private loadFromStorage(): void {
    try {
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        this.notifications = JSON.parse(storedNotifications);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  }
}

// Exportar uma instância singleton
export const notificationService = new NotificationService();
export default notificationService;
