
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, HelpCircle, RefreshCcw, Server, Globe, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebSocketMonitor from "./WebSocketMonitor";
import { useWebSocketCluster } from "@/hooks/use-websocket-cluster";

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance" | "unknown";

interface ServiceInfo {
  name: string;
  status: ServiceStatus;
  lastUpdated: Date;
  description: string;
  icon: React.ReactNode;
}

const PlatformStatusDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  
  const wsEndpoints = [
    "wss://api1.liveseller.com.br/ws",
    "wss://api2.liveseller.com.br/ws"
  ];

  const { 
    isConnected, 
    connectionAttempts, 
    connectionStats, 
    connect: refreshConnection,
    sendMessage
  } = useWebSocketCluster({
    urls: wsEndpoints,
    showNotifications: true,
    pingInterval: 10000
  });

  // Simular carregamento de status de serviços
  useEffect(() => {
    const fetchServiceStatus = () => {
      setLoading(true);
      // Em um cenário real, isso seria uma chamada de API
      setTimeout(() => {
        setServices([
          {
            name: "API Principal",
            status: "operational",
            lastUpdated: new Date(),
            description: "Serviços de autenticação e principais endpoints",
            icon: <Server className="h-5 w-5" />
          },
          {
            name: "Banco de Dados",
            status: "operational",
            lastUpdated: new Date(),
            description: "Armazenamento principal de dados do sistema",
            icon: <Database className="h-5 w-5" />
          },
          {
            name: "Integração WhatsApp",
            status: "operational",
            lastUpdated: new Date(),
            description: "Conexão com a API de negócios do WhatsApp",
            icon: <Globe className="h-5 w-5" />
          },
          {
            name: "Sistema de Criptografia",
            status: "operational",
            lastUpdated: new Date(),
            description: "Responsável pela segurança e criptografia",
            icon: <Shield className="h-5 w-5" />
          }
        ]);
        setLastChecked(new Date());
        setLoading(false);
      }, 1000);
    };

    fetchServiceStatus();
    
    // Configurar atualização periódica do status
    const intervalId = setInterval(fetchServiceStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleRefresh = () => {
    // Atualizar status dos serviços
    setServices([]);
    refreshConnection();
    
    // Solicitar informações atualizadas através do WebSocket
    sendMessage({
      type: "request_platform_status",
      timestamp: Date.now()
    });
    
    // Atualizar timestamp de última verificação
    setLastChecked(new Date());
  };
  
  const getStatusBadge = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-emerald-500">
            <Check className="h-3 w-3 mr-1" />
            Operacional
          </Badge>
        );
      case "degraded":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Degradado
          </Badge>
        );
      case "outage":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Indisponível
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            <RefreshCcw className="h-3 w-3 mr-1" />
            Em manutenção
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <HelpCircle className="h-3 w-3 mr-1" />
            Desconhecido
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Status da Plataforma</h1>
          <p className="text-muted-foreground">
            Monitore o status operacional dos serviços LiveSeller
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar Status
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Status dos Serviços</CardTitle>
              <CardDescription>
                Última verificação: {lastChecked.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-6 flex items-center justify-center">
                  <RefreshCcw className="h-5 w-5 animate-spin mr-2" />
                  <span>Carregando status dos serviços...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          {service.icon}
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* WebSocket Status */}
          <WebSocketMonitor 
            isConnected={isConnected}
            connectionAttempts={connectionAttempts}
            stats={connectionStats}
            onRefresh={refreshConnection}
          />
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status de Conectividade</CardTitle>
              <CardDescription>
                Detalhes das conexões com serviços externos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center text-muted-foreground">
                <p>Dados detalhados de conexão serão implementados em breve.</p>
                <p className="text-sm">Esta seção mostrará informações de latência, uptime e disponibilidade de cada conexão.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Incidentes</CardTitle>
              <CardDescription>
                Registros de eventos e problemas anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center text-muted-foreground">
                <p>O histórico de incidentes será implementado em breve.</p>
                <p className="text-sm">Esta seção mostrará um registro de incidentes anteriores com detalhes e resoluções.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformStatusDisplay;
