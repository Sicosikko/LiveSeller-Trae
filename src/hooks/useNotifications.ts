
import { useState, useEffect, useCallback } from 'react';
import notificationService, { Notification, NotificationType } from '../services/notification/NotificationService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export { NotificationType }; // Export NotificationType from here

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  
  // Atualizar notificações e contagem de não lidas
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Registrar para receber notificações
    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.isRead).length);
    });
    
    // Limpar inscrição quando componente for desmontado
    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);
  
  // Adicionar notificação
  const addNotification = useCallback((notification: Partial<Notification>) => {
    notificationService.addNotification(notification);
    
    // Mostrar toast para notificação
    if (notification.type) {
      const toastType = mapNotificationTypeToToast(notification.type);
      toast[toastType](notification.title || 'Notificação', {
        description: notification.message,
        duration: 5000,
      });
    }
  }, []);
  
  // Marcar notificação como lida
  const markAsRead = useCallback((id: string) => {
    notificationService.markAsRead(id);
  }, []);
  
  // Marcar todas como lidas
  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
  }, []);
  
  // Remover notificação
  const removeNotification = useCallback((id: string) => {
    notificationService.removeNotification(id);
  }, []);
  
  // Limpar todas
  const clearAll = useCallback(() => {
    notificationService.clearAll();
  }, []);
  
  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    NotificationType
  };
}

// Função auxiliar para mapear tipo de notificação para tipo de toast
function mapNotificationTypeToToast(type: NotificationType): 'default' | 'success' | 'warning' | 'error' | 'info' {
  switch (type) {
    case NotificationType.SUCCESS:
      return 'success';
    case NotificationType.WARNING:
      return 'warning';
    case NotificationType.ERROR:
      return 'error';
    case NotificationType.INFO:
    case NotificationType.SYSTEM:
      return 'info';
    case NotificationType.CHAT:
    case NotificationType.TASK:
    default:
      return 'default';
  }
}

export default useNotifications;
