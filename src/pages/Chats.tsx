
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Phone, VideoIcon, MoreVertical, Send, Paperclip, Smile } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "contact";
}

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Maria Silva",
    lastMessage: "Vou verificar e te retorno",
    time: "14:30",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "João Oliveira",
    lastMessage: "Obrigado pelo atendimento!",
    time: "13:15",
    unread: 0,
    isOnline: true,
  },
  {
    id: "3",
    name: "Ana Beatriz",
    lastMessage: "Então, conseguiu resolver aquele...",
    time: "11:47",
    unread: 0,
    lastSeen: "12:30",
  },
  {
    id: "4",
    name: "Carlos Eduardo",
    lastMessage: "Preciso agendar uma consulta",
    time: "09:22",
    unread: 0,
    lastSeen: "10:05",
  },
  {
    id: "5",
    name: "Luciana Mendes",
    lastMessage: "Poderia me passar mais informações?",
    time: "Ontem",
    unread: 0,
    lastSeen: "Ontem",
  },
  {
    id: "6",
    name: "Roberto Almeida",
    lastMessage: "Vou analisar sua proposta",
    time: "Ontem",
    unread: 0,
    isOnline: true,
  },
];

const messages: ChatMessage[] = [
  {
    id: "1",
    content: "Olá, gostaria de informações sobre os pacotes de envio em massa",
    timestamp: "14:22",
    sender: "contact",
  },
  {
    id: "2",
    content: "Olá Maria, tudo bem? Claro, posso te ajudar com isso! Temos diversos planos que podem atender sua necessidade.",
    timestamp: "14:24",
    sender: "user",
  },
  {
    id: "3",
    content: "Qual a quantidade de envios que você precisa fazer mensalmente?",
    timestamp: "14:24",
    sender: "user",
  },
  {
    id: "4",
    content: "Preciso enviar para aproximadamente 1500 contatos por mês",
    timestamp: "14:27",
    sender: "contact",
  },
  {
    id: "5",
    content: "Entendi! Para essa quantidade, recomendo nosso plano Business que inclui 2000 envios mensais, além de ferramentas de automação e relatórios detalhados.",
    timestamp: "14:29",
    sender: "user",
  },
  {
    id: "6",
    content: "Vou verificar e te retorno",
    timestamp: "14:30",
    sender: "contact",
  },
];

const Chats: React.FC = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(contacts[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Here you would typically handle sending the message
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  return (
    <MainLayout title="Mensagens">
      <div className="flex h-[calc(100vh-7rem)] overflow-hidden bg-card rounded-lg border">
        {/* Contacts List */}
        <div className="w-full sm:w-80 md:w-96 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversa"
                className="pl-9"
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Não lidas</TabsTrigger>
                <TabsTrigger value="assigned" className="flex-1">Atribuídas</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-y-auto data-[state=active]:flex-1">
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={cn(
                      "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                      activeContact?.id === contact.id && "bg-muted"
                    )}
                    onClick={() => setActiveContact(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {contact.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <p className="text-xs text-muted-foreground">{contact.time}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                        {contact.unread > 0 && (
                          <Badge variant="default" className="rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center bg-whatsapp text-white">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="unread" className="data-[state=active]:flex-1">
              <div className="p-4 text-center text-muted-foreground">
                Exibindo apenas conversas não lidas
              </div>
            </TabsContent>
            <TabsContent value="assigned" className="data-[state=active]:flex-1">
              <div className="p-4 text-center text-muted-foreground">
                Exibindo apenas conversas atribuídas a você
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        {activeContact ? (
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeContact.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {activeContact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeContact.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeContact.isOnline ? "Online" : `Último acesso ${activeContact.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <VideoIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-2 rounded-lg",
                      message.sender === "user"
                        ? "bg-whatsapp text-white rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    )}
                  >
                    <p>{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1 text-right",
                      message.sender === "user" ? "text-white/80" : "text-muted-foreground"
                    )}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Digite uma mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="flex-shrink-0 bg-whatsapp hover:bg-whatsapp-dark text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Chats;
