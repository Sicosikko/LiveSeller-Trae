
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InboxHeader from "./inbox/InboxHeader";
import ContactList from "./inbox/ContactList";
import ChatArea from "./inbox/ChatArea";
import QueueManager from "./inbox/QueueManager";
import { mockContacts } from "./inbox/mockData";
import { getChannelIcon, getChannelClass } from "./inbox/utils";
import { Contact } from "./types/inboxTypes";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, User } from "lucide-react";

const ChannelInbox: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"chats" | "queue">("chats");

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQueueItemAssign = (item: any) => {
    // Aqui adicionaria o item à lista de contatos ativos
    console.log("Atendimento atribuído:", item);
    // Em um sistema real, atualizaríamos via WebSocket
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle>Caixa de Entrada Unificada</CardTitle>
              <CardDescription>
                Gerencie todas as suas conversas de diferentes canais em um só lugar
              </CardDescription>
            </div>
            <Tabs 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "chats" | "queue")} 
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger value="chats">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversas
                </TabsTrigger>
                <TabsTrigger value="queue">
                  <User className="h-4 w-4 mr-2" />
                  Fila de Espera
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="chats" className="mt-0">
            <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
              {/* Inbox Header */}
              <InboxHeader 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
              
              {/* Inbox Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Conversation List */}
                <ContactList 
                  filteredContacts={filteredContacts}
                  selectedContact={selectedContact}
                  setSelectedContact={setSelectedContact}
                  getChannelIcon={getChannelIcon}
                  getChannelClass={getChannelClass}
                />
                
                {/* Chat Area */}
                <ChatArea 
                  selectedContact={selectedContact} 
                  getChannelIcon={getChannelIcon} 
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Alert>
                <AlertDescription className="text-sm text-muted-foreground">
                  As conversas são criptografadas ponto a ponto. Para responder ou ver detalhes completos, clique em "Abrir Conversa".
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="queue" className="mt-0">
            <QueueManager onAssign={handleQueueItemAssign} />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelInbox;
