import { useState, useEffect, useCallback, useRef } from 'react';
import { useWebSocketv2 } from './useWebSocketv2';
import { WebSocketEvents } from '@/services/websocket/WebSocketService';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Tipos para mensagens de chat
export interface ChatMessage {
  id: string;
  conversationId: string;
  content: string;
  timestamp: number;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'location';
  metadata?: any;
  isDeleted?: boolean;
}

// Tipos para conversas
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isActive: boolean;
  title?: string;
  avatar?: string;
  createdAt: number;
  updatedAt: number;
  type: 'direct' | 'group';
}

// Opções para o hook
export interface UseChatOptions {
  wsUrl: string;
  autoConnect?: boolean;
  autoMarkAsRead?: boolean;
  saveHistory?: boolean;
}

const DEFAULT_OPTIONS: Partial<UseChatOptions> = {
  autoConnect: true,
  autoMarkAsRead: true,
  saveHistory: true
};

export function useChat(options: UseChatOptions) {
  const {
    wsUrl,
    autoConnect = DEFAULT_OPTIONS.autoConnect,
    autoMarkAsRead = DEFAULT_OPTIONS.autoMarkAsRead,
    saveHistory = DEFAULT_OPTIONS.saveHistory
  } = { ...DEFAULT_OPTIONS, ...options };
  
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});
  
  // WebSocket para comunicação em tempo real
  const ws = useWebSocketv2({
    url: wsUrl,
    showNotifications: false,
    autoConnect
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  
  // Carregar histórico de conversas e mensagens ao iniciar
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Em um cenário real, buscaríamos do backend
        // Aqui carregamos do localStorage enquanto não temos backend conectado
        if (saveHistory) {
          const savedConversations = localStorage.getItem(`chat_conversations_${user.id}`);
          const savedMessages = localStorage.getItem(`chat_messages_${user.id}`);
          
          if (savedConversations) {
            setConversations(JSON.parse(savedConversations));
          }
          
          if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar histórico de chat:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, saveHistory]);
  
  // Salvar conversas e mensagens no localStorage
  useEffect(() => {
    if (!user || !saveHistory) return;
    
    try {
      localStorage.setItem(`chat_conversations_${user.id}`, JSON.stringify(conversations));
    } catch (error) {
      console.error('Erro ao salvar conversas:', error);
    }
  }, [conversations, user, saveHistory]);
  
  useEffect(() => {
    if (!user || !saveHistory) return;
    
    try {
      localStorage.setItem(`chat_messages_${user.id}`, JSON.stringify(messages));
    } catch (error) {
      console.error('Erro ao salvar mensagens:', error);
    }
  }, [messages, user, saveHistory]);
  
  // Registrar para receber mensagens de chat
  useEffect(() => {
    if (!ws.isConnected) return;
    
    const unsubscribe = ws.subscribeToEvent(WebSocketEvents.CHAT_MESSAGE, (data) => {
      // Ignorar mensagens enviadas por este dispositivo
      if (data.isLocal) return;
      
      const { conversationId, content, senderId, senderName, senderAvatar, timestamp, id } = data;
      
      // Verificar se a conversa existe
      const conversation = conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        // Criar nova conversa se não existir
        createConversation({
          id: conversationId,
          participants: [senderId, user?.id || ''],
          type: 'direct',
          title: senderName
        });
      }
      
      // Adicionar mensagem
      const newMessage: ChatMessage = {
        id: id || uuidv4(),
        conversationId,
        content,
        timestamp: timestamp || Date.now(),
        senderId,
        senderName,
        senderAvatar,
        status: 'delivered',
        type: 'text',
      };
      
      addMessage(newMessage);
      
      // Marcar como lida se esta conversa estiver ativa
      if (autoMarkAsRead && conversationId === activeConversationId) {
        markMessagesAsRead(conversationId);
      } else {
        // Incrementar contador de mensagens não lidas
        updateConversation(conversationId, (prev) => ({
          ...prev,
          unreadCount: (prev.unreadCount || 0) + 1,
          lastMessage: newMessage,
          updatedAt: Date.now()
        }));
      }
    });
    
    // Registrar para status de digitação
    const unsubscribeTyping = ws.subscribeToEvent(WebSocketEvents.TYPING_STATUS, (data) => {
      // Ignorar eventos do próprio dispositivo
      if (data.isLocal) return;
      
      const { conversationId, userId, isTyping } = data;
      
      // Atualizar estado de digitação
      setTypingUsers(prev => {
        const conversationTypers = prev[conversationId] || [];
        
        if (isTyping && !conversationTypers.includes(userId)) {
          // Adicionar usuário à lista de pessoas digitando
          const updatedTypers = [...conversationTypers, userId];
          return { ...prev, [conversationId]: updatedTypers };
        } else if (!isTyping && conversationTypers.includes(userId)) {
          // Remover usuário da lista de pessoas digitando
          const updatedTypers = conversationTypers.filter(id => id !== userId);
          return { ...prev, [conversationId]: updatedTypers };
        }
        
        return prev;
      });
      
      // Configurar timeout para remover status de digitação após 3 segundos
      if (typingTimeoutRef.current[userId]) {
        clearTimeout(typingTimeoutRef.current[userId]);
      }
      
      if (isTyping) {
        typingTimeoutRef.current[userId] = setTimeout(() => {
          setTypingUsers(prev => {
            const conversationTypers = prev[conversationId] || [];
            const updatedTypers = conversationTypers.filter(id => id !== userId);
            return { ...prev, [conversationId]: updatedTypers };
          });
        }, 3000);
      }
    });
    
    return () => {
      unsubscribe.unsubscribe();
      unsubscribeTyping.unsubscribe();
      
      // Limpar timeouts
      Object.values(typingTimeoutRef.current).forEach(timeout => clearTimeout(timeout));
    };
  }, [ws, ws.isConnected, conversations, activeConversationId, user, autoMarkAsRead]);
  
  // Função para criar uma nova conversa
  const createConversation = useCallback((conversationData: Partial<Conversation>) => {
    const newConversation: Conversation = {
      id: conversationData.id || uuidv4(),
      participants: conversationData.participants || [],
      unreadCount: 0,
      isActive: true,
      title: conversationData.title,
      avatar: conversationData.avatar,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: conversationData.type || 'direct'
    };
    
    setConversations(prev => {
      // Verificar se a conversa já existe
      if (prev.some(c => c.id === newConversation.id)) {
        return prev;
      }
      return [...prev, newConversation];
    });
    
    return newConversation;
  }, []);
  
  // Função para atualizar uma conversa existente
  const updateConversation = useCallback((conversationId: string, updateFn: (conversation: Conversation) => Partial<Conversation>) => {
    setConversations(prev => {
      const index = prev.findIndex(c => c.id === conversationId);
      if (index === -1) return prev;
      
      const updatedConversation = {
        ...prev[index],
        ...updateFn(prev[index]),
        updatedAt: Date.now()
      };
      
      const newConversations = [...prev];
      newConversations[index] = updatedConversation as Conversation;
      
      // Reordenar conversas com base na última atualização
      return newConversations.sort((a, b) => b.updatedAt - a.updatedAt);
    });
  }, []);
  
  // Modificar a função addMessage para garantir o tipo correto de status
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => {
      const conversationMessages = prev[message.conversationId] || [];
      
      // Verificar se a mensagem já existe
      if (conversationMessages.some(m => m.id === message.id)) {
        return prev;
      }
      
      // Garantir que o status seja um dos valores permitidos
      const validatedMessage: ChatMessage = {
        ...message,
        status: message.status as 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
      };
      
      // Adicionar nova mensagem
      const updatedMessages = [...conversationMessages, validatedMessage].sort(
        (a, b) => a.timestamp - b.timestamp
      );
      
      // Atualizar conversas
      updateConversation(message.conversationId, (conversation) => ({
        lastMessage: validatedMessage,
        updatedAt: message.timestamp
      }));
      
      return {
        ...prev,
        [message.conversationId]: updatedMessages
      };
    });
    
    // Rolar para a última mensagem se estiver na conversa ativa
    if (message.conversationId === activeConversationId) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [activeConversationId, updateConversation]);

  // Atualizar a função markMessagesAsRead para garantir os tipos corretos
  const markMessagesAsRead = useCallback((conversationId: string) => {
    // Atualizar contador de não lidas
    updateConversation(conversationId, () => ({
      unreadCount: 0
    }));
    
    // Atualizar status das mensagens recebidas
    setMessages(prev => {
      const conversationMessages = prev[conversationId] || [];
      
      // Só atualizar se houver mensagens não lidas
      if (!conversationMessages.some(m => m.senderId !== user?.id && m.status !== 'read')) {
        return prev;
      }
      
      const updatedMessages = conversationMessages.map(m => {
        if (m.senderId !== user?.id && m.status !== 'read') {
          return {
            ...m,
            status: 'read' as const
          };
        }
        return m;
      });
      
      return {
        ...prev,
        [conversationId]: updatedMessages
      };
    });
    
    // Enviar confirmação de leitura via WebSocket
    ws.sendMessage({
      type: 'read_receipt',
      conversationId,
      timestamp: Date.now()
    });
  }, [user, updateConversation, ws]);

  // Atualizar a função sendMessage para garantir os tipos corretos
  const sendMessage = useCallback((conversationId: string, content: string, type: ChatMessage['type'] = 'text', metadata?: any) => {
    if (!content.trim() || !user) return null;
    
    // Criar ID único para a mensagem
    const messageId = uuidv4();
    
    // Criar objeto de mensagem
    const message: ChatMessage = {
      id: messageId,
      conversationId,
      content,
      timestamp: Date.now(),
      senderId: user.id,
      senderName: user.email || user.id,
      status: 'sending',
      type,
      metadata
    };
    
    // Adicionar ao estado local primeiro
    addMessage(message);
    
    // Enviar via WebSocket
    try {
      const success = ws.sendChatMessage({
        id: messageId,
        type: 'chat_message',
        conversationId,
        message: content,
        messageType: type,
        metadata
      });
      
      // Atualizar status da mensagem
      setTimeout(() => {
        setMessages(prev => {
          const conversationMessages = prev[conversationId] || [];
          const updatedMessages = conversationMessages.map(m => {
            if (m.id === messageId) {
              return {
                ...m,
                status: success ? 'sent' as const : 'failed' as const
              };
            }
            return m;
          });
          
          return {
            ...prev,
            [conversationId]: updatedMessages
          };
        });
      }, 500);
      
      return message;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Atualizar status para falha
      setMessages(prev => {
        const conversationMessages = prev[conversationId] || [];
        const updatedMessages = conversationMessages.map(m => {
          if (m.id === messageId) {
            return {
              ...m,
              status: 'failed' as const
            };
          }
          return m;
        });
        
        return {
          ...prev,
          [conversationId]: updatedMessages
        };
      });
      
      return null;
    }
  }, [user, addMessage, ws]);
  
  // Função para enviar status de digitação
  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    if (ws.isConnected) {
      ws.sendTypingStatus(conversationId, isTyping);
    }
  }, [ws]);
  
  // Função para definir a conversa ativa
  const setActiveConversation = useCallback((conversationId: string | null) => {
    setActiveConversationId(conversationId);
    
    // Marcar mensagens como lidas quando a conversa for selecionada
    if (conversationId && autoMarkAsRead) {
      markMessagesAsRead(conversationId);
    }
  }, [autoMarkAsRead, markMessagesAsRead]);
  
  // Função para obter mensagens de uma conversa
  const getConversationMessages = useCallback((conversationId: string) => {
    return messages[conversationId] || [];
  }, [messages]);
  
  // Função para obter usuários digitando em uma conversa
  const getTypingUsers = useCallback((conversationId: string) => {
    return typingUsers[conversationId] || [];
  }, [typingUsers]);
  
  return {
    conversations,
    messages,
    activeConversationId,
    isLoading,
    typingUsers,
    messagesEndRef,
    wsConnected: ws.isConnected,
    
    // Actions
    createConversation,
    updateConversation,
    sendMessage,
    markMessagesAsRead,
    setActiveConversation,
    getConversationMessages,
    getTypingUsers,
    sendTypingStatus,
    
    // WebSocket methods
    connectWs: ws.connect,
    disconnectWs: ws.disconnect
  };
}

export default useChat;
