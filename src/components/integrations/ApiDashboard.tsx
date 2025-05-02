import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, RefreshCw, Zap, Key, FileCode, PlayCircle, CheckCircle2, AlertTriangle, ArrowRight, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ZapierWebhook {
  id: string;
  name: string;
  url: string;
  event: string;
  status: "active" | "inactive";
  lastTriggered: string | null;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: Date;
  lastUsed: Date | null;
  permissions: string[];
}

interface Endpoint {
  path: string;
  method: string;
  description: string;
  authentication: boolean;
}

const ApiDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("zapier");
  const [showCreateWebhookDialog, setShowCreateWebhookDialog] = useState(false);
  const [showCreateApiKeyDialog, setShowCreateApiKeyDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  
  // Zapier state
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    event: "lead.created"
  });
  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>([
    {
      id: "1",
      name: "Novos Leads",
      url: "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
      event: "lead.created",
      status: "active",
      lastTriggered: "2025-04-29T14:30:00Z"
    }
  ]);
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Produção",
      key: "ls_prod_Km8JdP2L9fXzT5qYsRvNgH7w",
      created: new Date("2025-04-25"),
      lastUsed: new Date("2025-04-29"),
      permissions: ["read", "write"]
    }
  ]);
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    permissions: ["read"]
  });
  
  // Endpoints for documentation
  const endpoints: Endpoint[] = [
    { 
      path: "/api/v1/leads", 
      method: "GET", 
      description: "Listar todos os leads",
      authentication: true
    },
    { 
      path: "/api/v1/leads", 
      method: "POST", 
      description: "Criar novo lead",
      authentication: true 
    },
    { 
      path: "/api/v1/messages", 
      method: "GET", 
      description: "Listar mensagens",
      authentication: true 
    },
    { 
      path: "/api/v1/messages/send", 
      method: "POST", 
      description: "Enviar mensagem",
      authentication: true 
    },
    { 
      path: "/api/v1/whatsapp/status", 
      method: "GET", 
      description: "Status da conexão WhatsApp",
      authentication: true 
    }
  ];
  
  // Test webhook dialog
  const [testWebhook, setTestWebhook] = useState<ZapierWebhook | null>(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  
  const handleCreateWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast("Campos obrigatórios", {
        description: "Preencha todos os campos necessários para continuar"
      });
      return;
    }
    
    if (!newWebhook.url.includes("zapier.com") && !newWebhook.url.includes("hooks")) {
      toast("URL inválida", {
        description: "A URL deve ser um webhook válido do Zapier"
      });
      return;
    }
    
    const webhook: ZapierWebhook = {
      id: (webhooks.length + 1).toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      event: newWebhook.event,
      status: "active",
      lastTriggered: null
    };
    
    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ name: "", url: "", event: "lead.created" });
    setShowCreateWebhookDialog(false);
    
    toast("Webhook criado", {
      description: "O webhook do Zapier foi configurado com sucesso"
    });
  };
  
  const handleCreateApiKey = () => {
    if (!newApiKey.name) {
      toast("Nome obrigatório", {
        description: "Por favor, forneça um nome para a chave de API"
      });
      return;
    }
    
    // Generate a random API key
    const randomKey = "ls_" + Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    
    const apiKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newApiKey.name,
      key: randomKey,
      created: new Date(),
      lastUsed: null,
      permissions: newApiKey.permissions
    };
    
    setApiKeys([...apiKeys, apiKey]);
    setNewApiKey({ name: "", permissions: ["read"] });
    setShowCreateApiKeyDialog(false);
    
    toast("Chave de API criada", {
      description: "Sua nova chave de API foi gerada com sucesso"
    });
  };
  
  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast("Copiado!", {
      description: "Chave de API copiada para a área de transferência"
    });
  };
  
  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast("Chave removida", {
      description: "A chave de API foi removida com sucesso"
    });
  };
  
  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast("Webhook removido", {
      description: "O webhook foi removido com sucesso"
    });
  };
  
  const handleTestWebhook = (webhook: ZapierWebhook) => {
    setTestWebhook(webhook);
    setShowTestDialog(true);
  };
  
  const executeWebhookTest = () => {
    if (!testWebhook) return;
    
    setIsTestingWebhook(true);
    
    // Simulate webhook testing
    setTimeout(() => {
      // Update webhook with last triggered date
      setWebhooks(webhooks.map(wh => 
        wh.id === testWebhook.id 
          ? { ...wh, lastTriggered: new Date().toISOString() } 
          : wh
      ));
      
      setIsTestingWebhook(false);
      setShowTestDialog(false);
      
      toast("Webhook testado", {
        description: "O teste foi enviado com sucesso para o Zapier"
      });
    }, 2000);
  };
  
  const toggleWebhookStatus = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id 
        ? { ...webhook, status: webhook.status === "active" ? "inactive" : "active" } 
        : webhook
    ));
  };
  
  // Helper for method badge color
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "POST": return "bg-green-100 text-green-700 hover:bg-green-100";
      case "PUT": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "DELETE": return "bg-red-100 text-red-700 hover:bg-red-100";
      default: return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">API & Integrações</h2>
        <p className="text-muted-foreground">
          Gerencie webhooks do Zapier, chaves de API e acesse a documentação
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="zapier" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Zapier
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Chaves API
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Documentação
          </TabsTrigger>
        </TabsList>
        
        {/* Zapier Tab */}
        <TabsContent value="zapier" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Webhooks Zapier</CardTitle>
                  <CardDescription>
                    Configure webhooks para automatizar fluxos entre o LiveSeller e outros serviços
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateWebhookDialog(true)}>Adicionar Webhook</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {webhooks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nome</TableHead>
                      <TableHead>Evento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[150px]">Última execução</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-medium">{webhook.name}</TableCell>
                        <TableCell>
                          {webhook.event === "lead.created" && "Novo Lead Criado"}
                          {webhook.event === "message.received" && "Mensagem Recebida"}
                          {webhook.event === "payment.completed" && "Pagamento Concluído"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={webhook.status === "active"} 
                              onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                            />
                            <span className={webhook.status === "active" ? "text-green-600" : "text-muted-foreground"}>
                              {webhook.status === "active" ? "Ativo" : "Inativo"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {webhook.lastTriggered 
                            ? new Date(webhook.lastTriggered).toLocaleString('pt-BR', { 
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : "Nunca"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleTestWebhook(webhook)}
                              disabled={webhook.status !== "active"}
                            >
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteWebhook(webhook.id)}
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Zap className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Nenhum webhook configurado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Adicione webhooks para conectar o LiveSeller com o Zapier
                  </p>
                  <Button onClick={() => setShowCreateWebhookDialog(true)}>
                    Adicionar Webhook
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Como funciona o Zapier</CardTitle>
              <CardDescription>
                Aprenda a criar automações entre o LiveSeller e outras ferramentas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">1. Crie um Zap no Zapier</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Acesse sua conta no Zapier e crie um novo Zap usando o gatilho "Webhook by Zapier"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">2. Copie a URL do webhook</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      O Zapier fornecerá uma URL única para seu webhook
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">3. Adicione o webhook no LiveSeller</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cole a URL no formulário de criação de webhook e selecione o evento que deseja monitorar
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">4. Configure as ações no Zapier</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Volte ao Zapier e configure as ações que deseja executar quando o evento ocorrer
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Chaves de API</CardTitle>
                  <CardDescription>
                    Gerencie o acesso à API pública do LiveSeller para integrações personalizadas
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateApiKeyDialog(true)}>Nova Chave</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {apiKeys.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nome</TableHead>
                      <TableHead className="w-[300px]">Chave</TableHead>
                      <TableHead>Permissões</TableHead>
                      <TableHead>Criada em</TableHead>
                      <TableHead>Último uso</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <code className="bg-muted px-1 py-0.5 rounded text-xs mr-2">
                              {apiKey.key.substring(0, 10) + "..."}
                            </code>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleCopyApiKey(apiKey.key)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {apiKey.permissions.includes("read") && 
                              <Badge variant="secondary" className="text-xs">Leitura</Badge>}
                            {apiKey.permissions.includes("write") && 
                              <Badge variant="secondary" className="text-xs">Escrita</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>{apiKey.created.toLocaleDateString()}</TableCell>
                        <TableCell>{apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : "Nunca"}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteApiKey(apiKey.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Key className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Nenhuma chave de API</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crie chaves de API para integrar com seus sistemas
                  </p>
                  <Button onClick={() => setShowCreateApiKeyDialog(true)}>
                    Nova Chave de API
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Uso da API</CardTitle>
              <CardDescription>
                Como utilizar as chaves de API nas suas requisições
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Autenticação via Header</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs">
                      Authorization: Bearer &lt;sua-chave-api&gt;
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Exemplo de Requisição</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      {`fetch("https://api.liveseller.com/v1/leads", {
  method: "GET",
  headers: {
    "Authorization": "Bearer ls_prod_Km8JdP2L9fXzT5qYsRvNgH7w",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentação da API</CardTitle>
              <CardDescription>
                Referências para utilizar a API pública do LiveSeller
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Método</TableHead>
                    <TableHead className="w-[250px]">Endpoint</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Autenticação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={getMethodColor(endpoint.method)}
                        >
                          {endpoint.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{endpoint.path}</TableCell>
                      <TableCell>{endpoint.description}</TableCell>
                      <TableCell>{endpoint.authentication ? "Obrigatória" : "Opcional"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <FileCode className="h-4 w-4 mr-2" />
                  Acessar Documentação Completa
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bibliotecas & SDKs</CardTitle>
              <CardDescription>
                Ferramentas de desenvolvimento para facilitar integração com o LiveSeller
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-1">JavaScript/TypeScript</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    SDK oficial para Node.js e navegadores
                  </p>
                  <Button variant="outline" size="sm">
                    npm install liveseller-sdk
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-1">PHP</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Cliente para PHP 7.4+
                  </p>
                  <Button variant="outline" size="sm">
                    composer require liveseller/api-sdk
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-1">Python</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Biblioteca Python 3.6+
                  </p>
                  <Button variant="outline" size="sm">
                    pip install liveseller-sdk
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create Webhook Dialog */}
      <Dialog open={showCreateWebhookDialog} onOpenChange={setShowCreateWebhookDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Webhook Zapier</DialogTitle>
            <DialogDescription>
              Configure um novo webhook para integrar com o Zapier
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-name" className="text-right">
                Nome
              </Label>
              <Input
                id="webhook-name"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                placeholder="Ex: Novos Leads"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-url" className="text-right">
                URL Zapier
              </Label>
              <Input
                id="webhook-url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                placeholder="https://hooks.zapier.com/..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-event" className="text-right">
                Evento
              </Label>
              <select
                id="webhook-event"
                value={newWebhook.event}
                onChange={(e) => setNewWebhook({...newWebhook, event: e.target.value})}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="lead.created">Novo Lead Criado</option>
                <option value="message.received">Mensagem Recebida</option>
                <option value="payment.completed">Pagamento Concluído</option>
                <option value="chat.closed">Atendimento Finalizado</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateWebhookDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateWebhook}>
              Adicionar Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create API Key Dialog */}
      <Dialog open={showCreateApiKeyDialog} onOpenChange={setShowCreateApiKeyDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Chave de API</DialogTitle>
            <DialogDescription>
              Gere uma nova chave para integrar sistemas externos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="key-name" className="text-right">
                Nome
              </Label>
              <Input
                id="key-name"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                placeholder="Ex: Integração ERP"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Permissões
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="permission-read"
                    checked={newApiKey.permissions.includes("read")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewApiKey({...newApiKey, permissions: [...newApiKey.permissions, "read"]});
                      } else {
                        setNewApiKey({
                          ...newApiKey, 
                          permissions: newApiKey.permissions.filter(p => p !== "read")
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="permission-read" className="text-sm font-normal">
                    Leitura (GET, LIST)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="permission-write"
                    checked={newApiKey.permissions.includes("write")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewApiKey({...newApiKey, permissions: [...newApiKey.permissions, "write"]});
                      } else {
                        setNewApiKey({
                          ...newApiKey, 
                          permissions: newApiKey.permissions.filter(p => p !== "write")
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="permission-write" className="text-sm font-normal">
                    Escrita (POST, PUT, DELETE)
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div></div>
              <div className="col-span-3">
                <p className="text-xs text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Mantenha suas chaves de API em segurança. Em caso de comprometimento, revogue-a imediatamente.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateApiKeyDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateApiKey}>
              Gerar Chave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Test Webhook Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Testar Webhook</DialogTitle>
            <DialogDescription>
              Envie um evento de teste para o webhook do Zapier
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {testWebhook && (
              <div className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm font-medium mb-1">Detalhes do Webhook</p>
                  <div className="grid grid-cols-3 gap-y-1 text-sm">
                    <span className="text-muted-foreground">Nome:</span>
                    <span className="col-span-2 font-medium">{testWebhook.name}</span>
                    
                    <span className="text-muted-foreground">Evento:</span>
                    <span className="col-span-2">
                      {testWebhook.event === "lead.created" && "Novo Lead Criado"}
                      {testWebhook.event === "message.received" && "Mensagem Recebida"}
                      {testWebhook.event === "payment.completed" && "Pagamento Concluído"}
                    </span>
                    
                    <span className="text-muted-foreground">URL:</span>
                    <span className="col-span-2 font-mono text-xs truncate">
                      {testWebhook.url}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-2">Este teste enviará um payload de exemplo para o URL configurado no Zapier.</p>
                  <p className="text-xs text-muted-foreground">
                    Os dados enviados serão estruturados de acordo com o tipo de evento selecionado.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={executeWebhookTest} disabled={isTestingWebhook}>
              {isTestingWebhook && (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isTestingWebhook ? "Enviando..." : "Enviar Teste"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiDashboard;
