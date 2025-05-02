
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, Download, BarChart3, Users, MessageSquare, 
  Activity, Calendar, Clock 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for team performance metrics
const mockTeamData = [
  {
    id: "1",
    name: "Amanda Costa",
    avatar: "",
    role: "Atendente",
    metrics: {
      responseTime: "1m 45s",
      satisfaction: 98,
      chatsHandled: 145,
      conversionRate: 32,
    },
  },
  {
    id: "2",
    name: "Rafael Santos",
    avatar: "",
    role: "Vendedor",
    metrics: {
      responseTime: "2m 10s",
      satisfaction: 95,
      chatsHandled: 112,
      conversionRate: 38,
    },
  },
  {
    id: "3",
    name: "Juliana Almeida",
    avatar: "",
    role: "Atendente",
    metrics: {
      responseTime: "1m 30s",
      satisfaction: 97,
      chatsHandled: 128,
      conversionRate: 29,
    },
  },
];

// Mock data for engagement metrics
const engagementData = {
  messagesPerChannel: {
    whatsapp: 523,
    instagram: 128,
    messenger: 94,
    email: 67,
  },
  averageResponseTime: {
    overall: "2m 05s",
    whatsapp: "1m 45s",
    instagram: "2m 30s",
    messenger: "2m 15s",
    email: "4h 20m",
  },
  engagementRate: {
    overall: 68,
    whatsapp: 78,
    instagram: 65,
    messenger: 72,
    email: 45,
  },
};

// Mock data for productivity metrics
const productivityData = {
  conversationsPerHour: 5.8,
  averageResolutionTime: "8m 45s",
  issuesResolvedFirstContact: 78,
  followUpsRequired: 22,
};

const PerformanceTab: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("team");
  
  const handleExport = (format: "pdf" | "excel") => {
    toast({
      title: `Exportando como ${format.toUpperCase()}`,
      description: "O download começará em instantes.",
    });
    
    // In a real implementation, this would generate and download the file
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: `Relatório de ${getActiveTabName()} exportado com sucesso.`,
      });
    }, 1500);
  };
  
  const getActiveTabName = () => {
    switch(activeTab) {
      case "team": return "Desempenho da Equipe";
      case "engagement": return "Métricas de Engajamento";
      case "productivity": return "Produtividade";
      default: return "Performance";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Desempenho da Equipe</CardTitle>
            <CardDescription>
              Métricas de desempenho e produtividade dos membros da equipe
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handleExport("excel")}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Excel</span>
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleExport("pdf")}
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">PDF</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Equipe</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Engajamento</span>
            </TabsTrigger>
            <TabsTrigger value="productivity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Produtividade</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="team" className="space-y-4">
            {mockTeamData.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        Tempo de Resposta
                      </span>
                      <span>{member.metrics.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfação do Cliente</span>
                      <span>{member.metrics.satisfaction}%</span>
                    </div>
                    <Progress value={member.metrics.satisfaction} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Atendimentos</span>
                      <span>{member.metrics.chatsHandled}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxa de Conversão</span>
                      <span>{member.metrics.conversionRate}%</span>
                    </div>
                    <Progress value={member.metrics.conversionRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Mensagens por Canal</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>WhatsApp</span>
                    <span>{engagementData.messagesPerChannel.whatsapp} mensagens</span>
                  </div>
                  <Progress 
                    value={(engagementData.messagesPerChannel.whatsapp / 
                      (engagementData.messagesPerChannel.whatsapp + 
                       engagementData.messagesPerChannel.instagram + 
                       engagementData.messagesPerChannel.messenger +
                       engagementData.messagesPerChannel.email)) * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Instagram</span>
                    <span>{engagementData.messagesPerChannel.instagram} mensagens</span>
                  </div>
                  <Progress 
                    value={(engagementData.messagesPerChannel.instagram / 
                      (engagementData.messagesPerChannel.whatsapp + 
                       engagementData.messagesPerChannel.instagram + 
                       engagementData.messagesPerChannel.messenger +
                       engagementData.messagesPerChannel.email)) * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Messenger</span>
                    <span>{engagementData.messagesPerChannel.messenger} mensagens</span>
                  </div>
                  <Progress 
                    value={(engagementData.messagesPerChannel.messenger / 
                      (engagementData.messagesPerChannel.whatsapp + 
                       engagementData.messagesPerChannel.instagram + 
                       engagementData.messagesPerChannel.messenger +
                       engagementData.messagesPerChannel.email)) * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Email</span>
                    <span>{engagementData.messagesPerChannel.email} mensagens</span>
                  </div>
                  <Progress 
                    value={(engagementData.messagesPerChannel.email / 
                      (engagementData.messagesPerChannel.whatsapp + 
                       engagementData.messagesPerChannel.instagram + 
                       engagementData.messagesPerChannel.messenger +
                       engagementData.messagesPerChannel.email)) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Taxa de Engajamento</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <Card className="pt-4">
                  <p className="text-2xl font-bold">{engagementData.engagementRate.whatsapp}%</p>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                </Card>
                <Card className="pt-4">
                  <p className="text-2xl font-bold">{engagementData.engagementRate.instagram}%</p>
                  <p className="text-xs text-muted-foreground">Instagram</p>
                </Card>
                <Card className="pt-4">
                  <p className="text-2xl font-bold">{engagementData.engagementRate.messenger}%</p>
                  <p className="text-xs text-muted-foreground">Messenger</p>
                </Card>
                <Card className="pt-4">
                  <p className="text-2xl font-bold">{engagementData.engagementRate.email}%</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="productivity" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="py-4 px-6">
                <div className="flex flex-col items-center">
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{productivityData.conversationsPerHour}</p>
                  <p className="text-xs text-muted-foreground text-center">Conversas por hora</p>
                </div>
              </Card>
              <Card className="py-4 px-6">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{productivityData.averageResolutionTime}</p>
                  <p className="text-xs text-muted-foreground text-center">Tempo médio de resolução</p>
                </div>
              </Card>
              <Card className="py-4 px-6">
                <div className="flex flex-col items-center">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{productivityData.issuesResolvedFirstContact}%</p>
                  <p className="text-xs text-muted-foreground text-center">Resolvidos no 1º contato</p>
                </div>
              </Card>
              <Card className="py-4 px-6">
                <div className="flex flex-col items-center">
                  <MessageSquare className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{productivityData.followUpsRequired}%</p>
                  <p className="text-xs text-muted-foreground text-center">Necessitaram follow-up</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end text-xs text-muted-foreground">
        Última atualização: hoje às {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </CardFooter>
    </Card>
  );
};

export default PerformanceTab;
