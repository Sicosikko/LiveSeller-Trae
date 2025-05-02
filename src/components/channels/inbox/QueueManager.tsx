
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, Bell } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Contact } from "../types/inboxTypes";

interface QueueItem extends Contact {
  waitTime: string;
  priority: "normal" | "high" | "urgent";
}

const mockQueue: QueueItem[] = [
  {
    id: "q1",
    name: "Roberto Silva",
    message: "Estou com problemas para finalizar meu pedido",
    time: "10:45",
    channel: "whatsapp",
    unread: 1,
    waitTime: "5m 23s",
    priority: "high",
  },
  {
    id: "q2",
    name: "Amanda Oliveira",
    message: "Preciso trocar um produto",
    time: "10:42",
    channel: "messenger",
    unread: 0,
    waitTime: "8m 12s",
    priority: "normal",
  },
  {
    id: "q3",
    name: "Carlos Eduardo",
    message: "Meu pagamento não foi processado",
    time: "10:40",
    channel: "whatsapp",
    unread: 2,
    waitTime: "10m 45s",
    priority: "urgent",
  },
  {
    id: "q4",
    name: "Patricia Mendes",
    message: "Dúvida sobre entrega",
    time: "10:35",
    channel: "instagram",
    unread: 0,
    waitTime: "15m 08s",
    priority: "normal",
  },
];

interface QueueManagerProps {
  onAssign: (item: QueueItem) => void;
}

const QueueManager: React.FC<QueueManagerProps> = ({ onAssign }) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(mockQueue);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-100";
      case "high": return "text-amber-600 bg-amber-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };
  
  const handleAssign = (item: QueueItem) => {
    onAssign(item);
    // Remover da fila após atribuição
    setQueueItems(queueItems.filter(queueItem => queueItem.id !== item.id));
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-500" />
            <span>Fila de Atendimento</span>
          </div>
          <Badge variant="outline" className="ml-2">
            {queueItems.length} em espera
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="urgent">Urgentes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-2 max-h-[300px] overflow-y-auto">
            {queueItems.length > 0 ? (
              queueItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>
                        {item.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(item.priority)}
                        >
                          {item.priority === "urgent" ? "Urgente" : 
                           item.priority === "high" ? "Alta" : "Normal"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {item.message}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.waitTime}
                        </span>
                        <span className="capitalize">
                          {item.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button size="sm" onClick={() => handleAssign(item)}>
                      <User className="h-4 w-4 mr-1" />
                      Atender
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                Não há clientes na fila de espera.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="whatsapp" className="space-y-2 max-h-[300px] overflow-y-auto">
            {queueItems.filter(item => item.channel === "whatsapp").length > 0 ? (
              queueItems
                .filter(item => item.channel === "whatsapp")
                .map((item) => (
                  // Mesmo layout do item, mas filtrado por WhatsApp
                  <div 
                    key={item.id}
                    className="p-3 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {item.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(item.priority)}
                          >
                            {item.priority === "urgent" ? "Urgente" : 
                             item.priority === "high" ? "Alta" : "Normal"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {item.message}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1 gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.waitTime}
                          </span>
                          <span>WhatsApp</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button size="sm" onClick={() => handleAssign(item)}>
                        <User className="h-4 w-4 mr-1" />
                        Atender
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                Não há clientes de WhatsApp na fila.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="urgent" className="space-y-2 max-h-[300px] overflow-y-auto">
            {queueItems.filter(item => item.priority === "urgent" || item.priority === "high").length > 0 ? (
              queueItems
                .filter(item => item.priority === "urgent" || item.priority === "high")
                .map((item) => (
                  // Mesmo layout do item, mas filtrado por urgência
                  <div 
                    key={item.id}
                    className="p-3 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {item.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(item.priority)}
                          >
                            {item.priority === "urgent" ? "Urgente" : "Alta"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {item.message}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1 gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.waitTime}
                          </span>
                          <span className="capitalize">
                            {item.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button size="sm" onClick={() => handleAssign(item)}>
                        <User className="h-4 w-4 mr-1" />
                        Atender
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                Não há clientes urgentes na fila.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QueueManager;
