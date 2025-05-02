import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Zap, ArrowDownUp, BadgeCheck, AlertTriangle, Link, PlusCircle } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  details?: string;
}

const IntegrationsPanel = () => {
  const [activeTab, setActiveTab] = useState("zapier");
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [showZapierDialog, setShowZapierDialog] = useState(false);
  const [googleAccount, setGoogleAccount] = useState("");
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState("");
  const { toast } = useToast();
  
  // Dados mockados de integrações
  const [zapierWebhooks, setZapierWebhooks] = useState<Integration[]>([
    {
      id: "1",
      name: "Novos Leads",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      status: "connected",
      lastSync: "Hoje, 10:45",
      details: "Envia novos leads para o CRM externo"
    },
    {
      id: "2",
      name: "Notificações de Pagamento",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      status: "connected",
      lastSync: "Ontem, 16:22",
      details: "Envia notificações quando um novo pagamento é recebido"
    }
  ]);
  
  const [googleCalendars, setGoogleCalendars] = useState<Integration[]>([
    {
      id: "1",
      name: "Calendário Corporativo",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      status: "connected",
      lastSync: "Hoje, 11:30",
      details: "Sincronização bidirecional"
    }
  ]);
  
  // Manipular conexão do Google Calendar
  const handleGoogleConnect = () => {
    if (!googleAccount.trim()) {
      toast("Erro na conexão", {
        description: "Por favor, insira uma conta do Google válida."
      });
      return;
    }
    
    // Em um sistema real, aqui faríamos a autenticação OAuth
    console.log("Conectando conta Google:", googleAccount);
    
    toast("Conta Google conectada", {
      description: `A conta ${googleAccount} foi conectada com sucesso.`
    });
    
    setGoogleCalendars([...googleCalendars, {
      id: (googleCalendars.length + 1).toString(),
      name: "Novo Calendário",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      status: "connected",
      lastSync: "Agora",
      details: "Sincronização bidirecional"
    }]);
    
    setShowGoogleDialog(false);
    setGoogleAccount("");
  };
  
  // Manipular adição de webhook do Zapier
  const handleAddZapierWebhook = () => {
    if (!zapierWebhookUrl.trim() || !zapierWebhookUrl.includes("zapier")) {
      toast("URL inválida", {
        description: "Por favor, insira uma URL de webhook Zapier válida."
      });
      return;
    }
    
    console.log("Adicionando webhook:", zapierWebhookUrl);
    
    toast("Webhook adicionado", {
      description: "O webhook do Zapier foi configurado com sucesso."
    });
    
    setZapierWebhooks([...zapierWebhooks, {
      id: (zapierWebhooks.length + 1).toString(),
      name: "Novo Webhook",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      status: "connected",
      lastSync: "Agora",
      details: "Webhook configurado"
    }]);
    
    setShowZapierDialog(false);
    setZapierWebhookUrl("");
  };
  
  // Remover uma integração
  const removeIntegration = (id: string, type: "zapier" | "google") => {
    if (type === "zapier") {
      setZapierWebhooks(zapierWebhooks.filter(webhook => webhook.id !== id));
    } else {
      setGoogleCalendars(googleCalendars.filter(calendar => calendar.id !== id));
    }
    
    toast("Integração removida", {
      description: "A integração foi removida com sucesso."
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrações Externas</h2>
        <p className="text-muted-foreground">Conecte sua plataforma com ferramentas externas.</p>
      </div>
      
      <Tabs defaultValue="zapier" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
          <TabsTrigger value="zapier" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Zapier</span>
          </TabsTrigger>
          <TabsTrigger value="google" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Google Calendar</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Conteúdo Zapier */}
        <TabsContent value="zapier" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Webhooks do Zapier</h3>
              <p className="text-sm text-muted-foreground">
                Conecte sua plataforma com automações do Zapier.
              </p>
            </div>
            <Button onClick={() => setShowZapierDialog(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Webhook
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zapierWebhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {webhook.icon}
                      <CardTitle className="text-base">{webhook.name}</CardTitle>
                    </div>
                    <Badge 
                      variant={webhook.status === "connected" ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {webhook.status === "connected" ? (
                        <>
                          <BadgeCheck className="h-3 w-3" />
                          <span>Conectado</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          <span>Erro</span>
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardDescription>{webhook.details}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm">
                    <ArrowDownUp className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Última sincronização: {webhook.lastSync}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Testar</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeIntegration(webhook.id, "zapier")}
                  >
                    Remover
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {zapierWebhooks.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Zap className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground mb-4">
                    Nenhuma integração com o Zapier configurada.
                  </p>
                  <Button onClick={() => setShowZapierDialog(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Adicionar Webhook
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Conteúdo Google Calendar */}
        <TabsContent value="google" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Google Calendar</h3>
              <p className="text-sm text-muted-foreground">
                Sincronize eventos e agendamentos com o Google Calendar.
              </p>
            </div>
            <Button onClick={() => setShowGoogleDialog(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Conectar Calendário
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {googleCalendars.map((calendar) => (
              <Card key={calendar.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {calendar.icon}
                      <CardTitle className="text-base">{calendar.name}</CardTitle>
                    </div>
                    <Badge 
                      variant={calendar.status === "connected" ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {calendar.status === "connected" ? (
                        <>
                          <BadgeCheck className="h-3 w-3" />
                          <span>Conectado</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          <span>Erro</span>
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardDescription>{calendar.details}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm">
                    <ArrowDownUp className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Última sincronização: {calendar.lastSync}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Sincronizar</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeIntegration(calendar.id, "google")}
                  >
                    Remover
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {googleCalendars.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground mb-4">
                    Nenhuma integração com o Google Calendar configurada.
                  </p>
                  <Button onClick={() => setShowGoogleDialog(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Conectar Calendário
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Configurações adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Sincronização</CardTitle>
          <CardDescription>Defina como as integrações devem se comportar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Sincronização Automática</Label>
              <p className="text-sm text-muted-foreground">
                Sincronizar dados automaticamente a cada 30 minutos
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notificações de Falha</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações quando uma sincronização falhar
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dados Históricos</Label>
              <p className="text-sm text-muted-foreground">
                Incluir dados históricos (anteriores a 30 dias) nas sincronizações
              </p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Logs de Integração</Label>
              <p className="text-sm text-muted-foreground">
                Manter logs detalhados de todas as sincronizações
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      {/* Dialog para adicionar conta Google */}
      <Dialog open={showGoogleDialog} onOpenChange={setShowGoogleDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Conectar Google Calendar</DialogTitle>
            <DialogDescription>
              Insira sua conta do Google para sincronizar seus calendários.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="google-account" className="text-right">
                Conta Google
              </Label>
              <Input
                id="google-account"
                type="email"
                placeholder="seuemail@gmail.com"
                value={googleAccount}
                onChange={(e) => setGoogleAccount(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoogleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGoogleConnect}>
              Conectar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para adicionar webhook Zapier */}
      <Dialog open={showZapierDialog} onOpenChange={setShowZapierDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Webhook do Zapier</DialogTitle>
            <DialogDescription>
              Insira a URL do webhook fornecida pelo Zapier.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-name" className="text-right">
                Nome
              </Label>
              <Input
                id="webhook-name"
                placeholder="Nome do webhook"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-url" className="text-right">
                URL
              </Label>
              <Input
                id="webhook-url"
                placeholder="https://hooks.zapier.com/..."
                value={zapierWebhookUrl}
                onChange={(e) => setZapierWebhookUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-type" className="text-right">
                Evento
              </Label>
              <select
                id="webhook-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
              >
                <option value="lead_created">Novo Lead Criado</option>
                <option value="payment_received">Pagamento Recebido</option>
                <option value="chat_closed">Atendimento Finalizado</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowZapierDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddZapierWebhook}>
              Adicionar Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsPanel;
