import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Search, Plus, Send, Paperclip, Image, Smile } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Interface para as mensagens
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Interface para os usuários
interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'busy' | 'away' | 'offline';
}

const PrivateMessages: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<User | null>(null);
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Helper function to get user display name safely
  const getUserDisplayName = () => {
    // Try to get a display name from the user object
    if (user?.email) {
      // If no name is available, use the email address before the @ symbol
      return user.email.split('@')[0];
    }
    return "Você"; // Default fallback
  };

  // Carregar conversas simuladas
  useEffect(() => {
    // Simular carregamento de conversas do servidor
    const mockConversations: User[] = [
      { 
        id: "1", 
        name: "Ana Silva", 
        avatar: "", 
        role: "Atendente",
        status: "online"
      },
      { 
        id: "2", 
        name: "Pedro Santos", 
        avatar: "", 
        role: "Gerente",
        status: "busy"
      },
      { 
        id: "3", 
        name: "Julia Mendes", 
        avatar: "", 
        role: "Atendente",
        status: "away"
      },
      { 
        id: "4", 
        name: "Carlos Oliveira", 
        avatar: "", 
        role: "Admin",
        status: "offline"
      },
      { 
        id: "5", 
        name: "Marcia Albuquerque", 
        avatar: "", 
        role: "Supervisora",
        status: "online"
      }
    ];
    setConversations(mockConversations);
  }, []);

  // Carregar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (selectedConversation) {
      // Simular carregamento de mensagens do servidor
      const mockMessages: Message[] = [
        {
          id: "1",
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          senderAvatar: selectedConversation.avatar,
          recipientId: "current-user",
          content: "Olá! Tudo bem com você?",
          timestamp: new Date(Date.now() - 60000 * 30),
          read: true
        },
        {
          id: "2",
          senderId: "current-user",
          senderName: getUserDisplayName(),
          senderAvatar: "",
          recipientId: selectedConversation.id,
          content: "Oi! Tudo ótimo, e com você?",
          timestamp: new Date(Date.now() - 60000 * 25),
          read: true
        },
        {
          id: "3",
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          senderAvatar: selectedConversation.avatar,
          recipientId: "current-user",
          content: "Estou bem! Precisamos revisar os relatórios de ontem.",
          timestamp: new Date(Date.now() - 60000 * 20),
          read: true
        },
        {
          id: "4",
          senderId: "current-user",
          senderName: getUserDisplayName(),
          senderAvatar: "",
          recipientId: selectedConversation.id,
          content: "Claro! Já dei uma olhada e acho que temos alguns pontos para discutir. Vamos agendar uma reunião?",
          timestamp: new Date(Date.now() - 60000 * 10),
          read: true
        },
        {
          id: "5",
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          senderAvatar: selectedConversation.avatar,
          recipientId: "current-user",
          content: "Perfeito! Que tal amanhã às 10h?",
          timestamp: new Date(Date.now() - 60000 * 5),
          read: true
        }
      ];
      setMessages(mockMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  // Filtrar conversas com base na pesquisa
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enviar mensagem
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: getUserDisplayName(),
      senderAvatar: "",
      recipientId: selectedConversation.id,
      content: messageText,
      timestamp: new Date(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
    toast("Mensagem enviada", {
      description: `Mensagem enviada para ${selectedConversation.name}`,
    });
  };

  // Formatar timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    return date.toLocaleDateString();
  };
  
  // Função para obter as iniciais
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Status da conversa
  const getStatusColorClass = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-160px)]">
        {/* Coluna de contatos */}
        <Card className="md:col-span-1 flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle>Mensagens Privadas</CardTitle>
            <CardDescription>Conversas com a equipe</CardDescription>
          </CardHeader>
          
          <div className="px-4 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar conversa..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="inbox" className="flex-1">Caixa de entrada</TabsTrigger>
                <TabsTrigger value="team" className="flex-1">Equipe</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-auto px-2">
              <TabsContent value="inbox" className="m-0 pt-2 h-full">
                {filteredConversations.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Nenhuma conversa encontrada</p>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {filteredConversations.map(conv => (
                      <li key={conv.id}>
                        <button
                          onClick={() => setSelectedConversation(conv)}
                          className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent ${selectedConversation?.id === conv.id ? 'bg-accent' : ''}`}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conv.avatar} alt={conv.name} />
                              <AvatarFallback>{getInitials(conv.name)}</AvatarFallback>
                            </Avatar>
                            <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColorClass(conv.status)}`}></span>
                          </div>
                          <div className="flex-1 text-left overflow-hidden">
                            <p className="font-medium truncate">{conv.name}</p>
                            <p className="text-xs text-muted-foreground">{conv.role}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
              
              <TabsContent value="team" className="m-0 pt-2 h-full">
                <div className="flex justify-between items-center mb-2 px-2">
                  <h4 className="text-sm font-medium">Equipe</h4>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <ul className="space-y-1">
                  {filteredConversations.map(conv => (
                    <li key={conv.id}>
                      <button
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent ${selectedConversation?.id === conv.id ? 'bg-accent' : ''}`}
                      >
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{getInitials(conv.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left overflow-hidden">
                          <p className="font-medium truncate">{conv.name}</p>
                          <p className="text-xs text-muted-foreground">{conv.role}</p>
                        </div>
                        <Badge variant={conv.status === 'online' ? 'default' : 'secondary'} className="text-[10px]">
                          {conv.status === 'online' ? 'Online' : conv.status === 'busy' ? 'Ocupado' : conv.status === 'away' ? 'Ausente' : 'Offline'}
                        </Badge>
                      </button>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
        
        {/* Coluna de mensagens */}
        <Card className="md:col-span-3 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                      <AvatarFallback>{getInitials(selectedConversation.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedConversation.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span className={`inline-block h-2 w-2 rounded-full ${getStatusColorClass(selectedConversation.status)}`}></span>
                        {selectedConversation.status === 'online' ? 'Online' : selectedConversation.status === 'busy' ? 'Ocupado' : selectedConversation.status === 'away' ? 'Ausente' : 'Offline'}
                        <span className="mx-1">•</span>
                        {selectedConversation.role}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div>
                    <Select defaultValue="normal">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Visibilidade">Normal</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                        <SelectItem value="priority">Prioritário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.senderId === 'current-user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                        <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className={`rounded-lg p-3 ${
                          message.senderId === 'current-user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          {message.content}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <div className="p-4 border-t">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[40px]"
                    />
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" type="button" className="h-10 w-10">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" type="button" className="h-10 w-10">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" type="button" className="h-10 w-10">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="icon" className="h-10 w-10" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhuma conversa selecionada</h3>
              <p className="text-muted-foreground mb-4">
                Selecione uma conversa da lista ou inicie uma nova.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova conversa
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PrivateMessages;
