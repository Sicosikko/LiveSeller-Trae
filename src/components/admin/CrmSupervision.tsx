
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { CheckCircle, Clock, AlertCircle, MessageCircle, User, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const statusDistributionData = [
  { name: "Em Atendimento", value: 35, color: "#4f46e5" },
  { name: "Aguardando Cliente", value: 25, color: "#f59e0b" },
  { name: "Resolvido Hoje", value: 30, color: "#22c55e" },
  { name: "Abandonado", value: 10, color: "#ef4444" },
];

// Define activeChats data before using it
const initialActiveChats = [
  {
    id: "1",
    client: {
      name: "Maria Oliveira",
      avatar: "",
      type: "premium"
    },
    agent: {
      name: "Ana Silva",
      avatar: ""
    },
    status: "em_atendimento",
    duration: "14m 23s",
    lastMessage: "Estamos verificando seu pedido no sistema...",
    tags: ["suporte", "dúvida"]
  },
  {
    id: "2",
    client: {
      name: "José Santos",
      avatar: "",
      type: "novo"
    },
    agent: {
      name: "Carlos Oliveira",
      avatar: ""
    },
    status: "aguardando_cliente",
    duration: "8m 45s",
    lastMessage: "Por favor, confirme se recebeu o email com as instruções.",
    tags: ["vendas"]
  },
  {
    id: "3",
    client: {
      name: "Roberto Almeida",
      avatar: "",
      type: "regular"
    },
    agent: {
      name: "Mariana Costa",
      avatar: ""
    },
    status: "em_atendimento",
    duration: "23m 12s",
    lastMessage: "Acabei de enviar o orçamento atualizado para seu email.",
    tags: ["orçamento", "vendas"]
  },
  {
    id: "4",
    client: {
      name: "Fernanda Lima",
      avatar: "",
      type: "premium"
    },
    agent: {
      name: "Pedro Santos",
      avatar: ""
    },
    status: "aguardando_cliente",
    duration: "5m 37s",
    lastMessage: "Poderia nos informar qual o modelo do seu dispositivo?",
    tags: ["suporte técnico"]
  }
];

const CrmSupervision = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeChats, setActiveChats] = useState(initialActiveChats);
  
  // Cores dos status
  const statusColors = {
    em_atendimento: "bg-indigo-500",
    aguardando_cliente: "bg-amber-500",
    resolvido: "bg-emerald-500",
    abandonado: "bg-red-500"
  };
  
  // Status em português
  const statusLabels = {
    em_atendimento: "Em Atendimento",
    aguardando_cliente: "Aguardando Cliente",
    resolvido: "Resolvido",
    abandonado: "Abandonado"
  };
  
  // Filtrar chats com base na pesquisa e filtro de status
  const filteredChats = activeChats.filter(chat => {
    const matchesSearch = chat.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || chat.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Função para transferir uma conversa
  const handleTransferChat = (chatId: string) => {
    toast.success("Iniciando processo de transferência de conversa...");
    
    // Em uma implementação real, abriria um modal para escolher o agente
    setTimeout(() => {
      toast.info("Selecione o agente para transferência na janela que abriu");
    }, 800);
  };
  
  // Função para monitorar uma conversa
  const handleMonitorChat = (chatId: string) => {
    const chat = activeChats.find(c => c.id === chatId);
    if (chat) {
      toast.success(`Monitorando conversa entre ${chat.agent.name} e ${chat.client.name}`);
      
      // Em uma implementação real, abriria uma tela de monitoramento
      setTimeout(() => {
        toast.info("A sala de monitoramento foi aberta em uma nova janela");
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-indigo-500" />
              <CardDescription>Em Atendimento</CardDescription>
            </div>
            <CardTitle className="text-3xl font-bold">35</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <CardDescription>Aguardando Cliente</CardDescription>
            </div>
            <CardTitle className="text-3xl font-bold">25</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <CardDescription>Resolvidos Hoje</CardDescription>
            </div>
            <CardTitle className="text-3xl font-bold">142</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <CardDescription>Abandonados</CardDescription>
            </div>
            <CardTitle className="text-3xl font-bold">8</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
            <CardDescription>Visão geral das conversas atuais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Atendentes Online</CardTitle>
                <CardDescription>Agentes disponíveis no sistema</CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                8 online
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Ana Silva", "Carlos Oliveira", "Mariana Costa", "Pedro Santos", 
                "Juliana Martins", "Roberto Pereira", "Luciana Gomes", "Thiago Mendes"].map((agent, index) => (
                <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback>
                      {agent.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-center">{agent}</span>
                  <div className="flex items-center mt-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></span>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Conversas Ativas</CardTitle>
              <CardDescription>Monitoramento em tempo real das interações</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por cliente ou agente..." 
                  className="pl-8 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs 
                value={statusFilter} 
                onValueChange={setStatusFilter}
                className="w-full md:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="em_atendimento">Em Atendimento</TabsTrigger>
                  <TabsTrigger value="aguardando_cliente">Aguardando</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Atendente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead className="hidden md:table-cell">Última Mensagem</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChats.map((chat) => (
                <TableRow key={chat.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chat.client.avatar} />
                        <AvatarFallback>
                          {chat.client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{chat.client.name}</div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {chat.client.type === "premium" ? "Premium" : 
                             chat.client.type === "novo" ? "Novo" : "Regular"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chat.agent.avatar} />
                        <AvatarFallback>
                          {chat.agent.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{chat.agent.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${statusColors[chat.status as keyof typeof statusColors]}`}></div>
                      <span>{statusLabels[chat.status as keyof typeof statusLabels]}</span>
                    </div>
                  </TableCell>
                  <TableCell>{chat.duration}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {chat.lastMessage}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTransferChat(chat.id)}
                      >
                        Transferir
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleMonitorChat(chat.id)}
                      >
                        Monitorar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredChats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Nenhuma conversa encontrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrmSupervision;
