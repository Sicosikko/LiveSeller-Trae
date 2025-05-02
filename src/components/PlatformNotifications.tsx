
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  X, 
  MessageSquare, 
  AlertTriangle, 
  Info, 
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useNotifications from '@/hooks/useNotifications';
import { NotificationType } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case NotificationType.INFO:
      return <Info className="h-4 w-4 text-blue-500" />;
    case NotificationType.SUCCESS:
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case NotificationType.WARNING:
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case NotificationType.ERROR:
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case NotificationType.CHAT:
      return <MessageSquare className="h-4 w-4 text-indigo-500" />;
    case NotificationType.TASK:
      return <Check className="h-4 w-4 text-violet-500" />;
    case NotificationType.SYSTEM:
    default:
      return <Info className="h-4 w-4 text-gray-500" />;
  }
};

const PlatformNotifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Fechar o popover quando todas as notificações forem removidas
  useEffect(() => {
    if (notifications.length === 0 && open) {
      setOpen(false);
    }
  }, [notifications.length, open]);

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'system') return notification.type === NotificationType.SYSTEM;
    if (filter === 'chat') return notification.type === NotificationType.CHAT;
    return true;
  });
  
  // Renderizar notificação vazia
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
      <Bell className="h-8 w-8 opacity-40 mb-2" />
      <p>Você não tem notificações {filter !== 'all' ? 'deste tipo' : ''}</p>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notificações</h3>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <div className="border-b px-4 pb-2">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Todas
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Não lidas {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1">
                Chat
              </TabsTrigger>
              <TabsTrigger value="system" className="flex-1">
                Sistema
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="h-[350px] p-4">
            {filteredNotifications.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div key={notification.id} className={cn(
                    "relative border rounded-lg p-3",
                    !notification.isRead && "bg-muted/50 border-muted-foreground/20"
                  )}>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <NotificationIcon type={notification.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <div className="flex items-center">
                            {!notification.isRead && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), { 
                            addSuffix: true,
                            locale: ptBR 
                          })}
                        </div>
                      </div>
                    </div>
                    {notification.link && (
                      <div className="mt-2 pt-2 border-t">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs"
                          asChild
                        >
                          <a href={notification.link}>Ver detalhes</a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <Separator />
          
          <div className="p-2 text-center">
            <Button variant="link" size="sm" className="text-xs text-muted-foreground">
              Configurações de notificações
            </Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default PlatformNotifications;
