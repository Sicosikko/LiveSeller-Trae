import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, MessageSquare, Smartphone, Bot, Webhook } from "lucide-react";
import { WhatsAppBusinessConfig, whatsappBusinessService } from "@/services/whatsapp/whatsappBusinessService";

const WhatsAppIntegration = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("direct");
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [config, setConfig] = useState<WhatsAppBusinessConfig>({ isConfigured: false });
  const [n8nUrl, setN8nUrl] = useState("");
  const [testNumber, setTestNumber] = useState("");
  const [testMessage, setTestMessage] = useState("Olá! Esta é uma mensagem de teste do LiveSeller.");

  useEffect(() => {
    // Load existing configuration
    const loadConfig = async () => {
      setLoading(true);
      const config = await whatsappBusinessService.loadConfig();
      setConfig(config);
      if (config.webhookUrl) {
        setN8nUrl(config.webhookUrl);
      }
      setLoading(false);
    };

    loadConfig();
  }, []);

  const handleSaveDirectConfig = async () => {
    setLoading(true);
    const success = await whatsappBusinessService.saveConfig({
      apiKey: config.apiKey,
      phoneNumberId: config.phoneNumberId,
      businessAccountId: config.businessAccountId,
    });

    if (success) {
      toast({
        title: "Configuração salva",
        description: "As configurações da API do WhatsApp Business foram salvas com sucesso."
      });
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleSaveN8nConfig = async () => {
    setLoading(true);
    const success = await whatsappBusinessService.initializeN8nWorkflow(n8nUrl);

    if (success) {
      setConfig({ ...config, webhookUrl: n8nUrl });
      toast({
        title: "Configuração n8n salva",
        description: "A integração com n8n foi configurada com sucesso."
      });
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao configurar a integração com n8n.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleTestConnection = async () => {
    if (!testNumber) {
      toast({
        title: "Número não informado",
        description: "Por favor, informe um número de telefone para teste.",
        variant: "destructive"
      });
      return;
    }

    setTestingConnection(true);
    
    try {
      const result = await whatsappBusinessService.sendMessage(
        testNumber,
        "generic_template",
        [{ type: "text", text: testMessage }]
      );
      
      if (result.success) {
        toast({
          title: "Teste realizado com sucesso",
          description: "A mensagem de teste foi enviada com sucesso."
        });
      }
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Não foi possível enviar a mensagem de teste. Verifique suas configurações.",
        variant: "destructive"
      });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> 
          Integração WhatsApp Business
        </CardTitle>
        <CardDescription>
          Configure a integração com a API oficial do WhatsApp Business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="direct" disabled={loading}>
              <span className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" /> API Direta
              </span>
            </TabsTrigger>
            <TabsTrigger value="n8n" disabled={loading}>
              <span className="flex items-center gap-1">
                <Webhook className="h-4 w-4" /> Via n8n
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="direct" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">WhatsApp Business API Key</Label>
              <Input 
                id="apiKey" 
                value={config.apiKey || ""} 
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })} 
                placeholder="Insira sua API Key" 
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Chave de API fornecida pelo Facebook Business Manager
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumberId">Phone Number ID</Label>
              <Input 
                id="phoneNumberId" 
                value={config.phoneNumberId || ""} 
                onChange={(e) => setConfig({ ...config, phoneNumberId: e.target.value })} 
                placeholder="Insira o ID do telefone" 
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                ID do número de telefone verificado no WhatsApp Business
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAccountId">Business Account ID (opcional)</Label>
              <Input 
                id="businessAccountId" 
                value={config.businessAccountId || ""} 
                onChange={(e) => setConfig({ ...config, businessAccountId: e.target.value })} 
                placeholder="Insira o ID da conta business" 
                disabled={loading}
              />
            </div>
          </TabsContent>

          <TabsContent value="n8n" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="n8nUrl">URL do Webhook n8n</Label>
                <Input 
                  id="n8nUrl" 
                  value={n8nUrl} 
                  onChange={(e) => setN8nUrl(e.target.value)} 
                  placeholder="https://seu-n8n.exemplo.com/webhook/..." 
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL do webhook n8n que processará as requisições para o WhatsApp Business API
                </p>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Bot className="h-4 w-4" /> Instruções para configurar o n8n
                </h4>
                <ol className="text-sm mt-2 space-y-2 list-decimal list-inside">
                  <li>Configure uma instância do n8n (gratuita ou auto-hospedada)</li>
                  <li>Crie um novo workflow com trigger webhook</li>
                  <li>Adicione um nó HTTP Request para se conectar à API do WhatsApp</li>
                  <li>Configure os headers e autenticação necessários</li>
                  <li>Ative o workflow e copie a URL do webhook</li>
                  <li>Cole a URL do webhook no campo acima</li>
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2">Testar conexão</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="testNumber">Número para teste</Label>
              <Input 
                id="testNumber" 
                value={testNumber} 
                onChange={(e) => setTestNumber(e.target.value)} 
                placeholder="+5511999998888" 
                disabled={testingConnection}
              />
            </div>
            <div>
              <Label htmlFor="testMessage">Mensagem de teste</Label>
              <Textarea 
                id="testMessage" 
                value={testMessage} 
                onChange={(e) => setTestMessage(e.target.value)} 
                placeholder="Digite uma mensagem de teste" 
                disabled={testingConnection}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Switch 
              id="encryption" 
              checked={true}
              disabled 
            />
            <Label htmlFor="encryption">
              Criptografia end-to-end
              <Badge className="ml-2 bg-green-500">Ativo</Badge>
            </Label>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Todas as mensagens são criptografadas com a segurança padrão do WhatsApp
          </p>
        </div>

        {config.isConfigured && (
          <div className="rounded-md bg-green-50 p-3 mt-6 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-green-700 text-sm">
              API do WhatsApp Business configurada corretamente
            </span>
          </div>
        )}

        {!config.isConfigured && config.apiKey && (
          <div className="rounded-md bg-amber-50 p-3 mt-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="text-amber-700 text-sm">
              Configuração incompleta. Verifique se todos os campos obrigatórios foram preenchidos.
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between gap-4">
            {tab === "direct" ? (
              <Button 
                onClick={handleSaveDirectConfig} 
                disabled={loading || !config.apiKey || !config.phoneNumberId}
              >
                {loading ? "Salvando..." : "Salvar configuração"}
              </Button>
            ) : (
              <Button 
                onClick={handleSaveN8nConfig} 
                disabled={loading || !n8nUrl}
              >
                {loading ? "Salvando..." : "Conectar n8n"}
              </Button>
            )}

            <Button 
              variant="outline" 
              onClick={handleTestConnection} 
              disabled={testingConnection || !config.isConfigured && !config.webhookUrl}
            >
              {testingConnection ? "Testando..." : "Testar conexão"}
            </Button>
          </div>
          
          {loading && (
            <Progress value={40} className="mt-2" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppIntegration;
