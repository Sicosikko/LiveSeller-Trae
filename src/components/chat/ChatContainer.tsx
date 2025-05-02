
import React, { useState, useEffect, useRef } from 'react';
import { Send, PaperclipIcon, Smile, Paperclip, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';

interface ChatContainerProps {
  conversationId: string;
  recipientName: string;
  recipientAvatar?: string;
  wsUrl: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  conversationId,
  recipientName,
  recipientAvatar,
  wsUrl
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    getConversationMessages,
    sendMessage,
    messagesEndRef,
    sendTypingStatus,
    getTypingUsers,
    wsConnected
  } = useChat({
    wsUrl,
    autoConnect: true,
    autoMarkAsRead: true
  });
  
  const messages = getConversationMessages(conversationId);
  const typingUsers = getTypingUsers(conversationId);
  
  // Rolar para a última mensagem quando a conversa é carregada
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationId]);
  
  // Enviar status de digitação
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      sendTypingStatus(conversationId, true);
    }
    
    // Limpar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Definir novo timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingStatus(conversationId, false);
    }, 1000);
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(conversationId, message);
      setMessage('');
      sendTypingStatus(conversationId, false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };
  
  // Formatar data relativa
  const formatMessageTime = (timestamp: number) => {
    return formatRelative(new Date(timestamp), new Date(), { locale: ptBR });
  };
  
  // Agrupar mensagens por remetente para UI mais limpa
  const groupedMessages = messages.reduce<{
    messages: any[];
    currentGroup: any | null;
  }>(
    (acc, message) => {
      const isSameSender = acc.currentGroup && acc.currentGroup.senderId === message.senderId;
      
      if (isSameSender && 
          (message.timestamp - acc.currentGroup.messages[acc.currentGroup.messages.length - 1].timestamp) < 300000) {
        // Adicionar mensagem ao grupo atual se for do mesmo remetente e dentro de 5 minutos
        acc.currentGroup.messages.push(message);
      } else {
        // Criar novo grupo
        if (acc.currentGroup) {
          acc.messages.push(acc.currentGroup);
        }
        
        acc.currentGroup = {
          id: message.id,
          senderId: message.senderId,
          senderName: message.senderName || 'Usuário',
          senderAvatar: message.senderAvatar,
          isOwn: message.senderId === user?.id,
          messages: [message],
        };
      }
      
      return acc;
    },
    { messages: [], currentGroup: null }
  );
  
  // Adicionar último grupo se houver
  if (groupedMessages.currentGroup) {
    groupedMessages.messages.push(groupedMessages.currentGroup);
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border">
      {/* Cabeçalho */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={recipientAvatar} alt={recipientName} />
            <AvatarFallback>
              {recipientName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{recipientName}</h3>
            <p className="text-xs text-muted-foreground">
              {wsConnected ? (
                typingUsers.length > 0 ? 'Digitando...' : 'Online'
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groupedMessages.messages.map((group) => (
          <div 
            key={group.id}
            className={cn(
              "flex",
              group.isOwn ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex gap-2 max-w-[80%]",
              group.isOwn ? "flex-row-reverse" : ""
            )}>
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage 
                  src={group.isOwn ? user?.user_metadata?.avatar_url : group.senderAvatar} 
                  alt={group.senderName} 
                />
                <AvatarFallback>
                  {(group.isOwn ? (user?.email || 'EU') : group.senderName).slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="mb-1 text-xs text-muted-foreground">
                  {group.isOwn ? 'Você' : group.senderName}
                </div>
                
                <div className="space-y-1">
                  {group.messages.map((message: any, index: number) => (
                    <div 
                      key={message.id}
                      className={cn(
                        "rounded-lg p-3 break-words",
                        group.isOwn 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                
                <div className={cn(
                  "text-xs text-muted-foreground mt-1",
                  group.isOwn ? "text-right" : ""
                )}>
                  {formatMessageTime(group.messages[group.messages.length - 1].timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicador de digitação */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" 
                style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" 
                style={{ animationDelay: '0.4s' }} />
            </div>
            <span>Digitando...</span>
          </div>
        )}
        
        {/* Referência para rolagem automática */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input de mensagem */}
      <div className="p-4 border-t">
        <div className="relative flex items-end gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="relative flex-1">
            <Textarea
              placeholder="Digite uma mensagem..."
              className="resize-none pr-10 min-h-[60px] max-h-[180px]"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-2 right-2 h-6 w-6 rounded-full"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            className="flex-shrink-0"
            disabled={!message.trim() || !wsConnected}
          >
            {!wsConnected ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Send className="h-5 w-5 mr-2" />
            )}
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
