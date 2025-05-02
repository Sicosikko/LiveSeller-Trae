import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { QrCode, Instagram, Smartphone, Mail, MessagesSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected";
  onConnect: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  description, 
  icon, 
  status, 
  onConnect 
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              {icon}
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{description}</CardDescription>
            </div>
          </div>
          <div>
            {status === "connected" ? (
              <Button variant="outline" size="sm" className="h-7 border-green-500 text-green-500">
                Conectado
              </Button>
            ) : (
              <Button size="sm" className="h-7" onClick={onConnect}>
                Conectar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-muted/30 p-3 text-xs">
        {status === "connected" ? (
          <div className="flex items-center justify-between">
            <span>Conectado desde 12/04/2025</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              Configurações
            </Button>
          </div>
        ) : (
          <span>Clique em conectar para configurar esta integração</span>
        )}
      </CardContent>
    </Card>
  );
};

const WhatsAppConnection: React.FC = () => {
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  
  const handleConnect = () => {
    setShowQRCode(true);
  };
  
  const handleScan = () => {
    toast("QR Code escaneado", {
      description: "A conexão com WhatsApp está sendo processada."
    });
    setShowQRCode(false);
    // Simulação de conexão bem-sucedida após 2 segundos
    setTimeout(() => {
      toast("WhatsApp conectado", {
        description: "Sua conta do WhatsApp foi conectada com sucesso."
      });
    }, 2000);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Conexão com WhatsApp
        </CardTitle>
        <CardDescription>
          Conecte sua conta do WhatsApp Business para começar a usar o sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showQRCode ? (
          <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
            <div className="bg-slate-100 p-8 rounded-lg">
              <div className="w-48 h-48 bg-slate-200 flex items-center justify-center relative">
                <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-2">
                  <div className="bg-black rounded-sm col-span-1 row-span-1"></div>
                  <div className="bg-transparent col-span-1 row-span-1"></div>
                  <div className="bg-black rounded-sm col-span-1 row-span-1"></div>
                  <div className="bg-transparent col-span-1 row-span-1"></div>
                  <div className="bg-black rounded-sm col-span-1 row-span-1"></div>
                  <div className="bg-transparent col-span-1 row-span-1"></div>
                  <div className="bg-black rounded-sm col-span-1 row-span-1"></div>
                  <div className="bg-transparent col-span-1 row-span-1"></div>
                  <div className="bg-black rounded-sm col-span-1 row-span-1"></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Abra o WhatsApp no seu telefone, acesse as configurações, selecione WhatsApp Web/Desktop e escaneie o código QR
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowQRCode(false)}>
                Cancelar
              </Button>
              <Button onClick={handleScan}>
                Simular Scan
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={handleConnect} className="mb-4">
              <QrCode className="h-4 w-4 mr-2" />
              Conectar via QR Code
            </Button>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="whatsapp-number">Número do WhatsApp Business</Label>
                <Input id="whatsapp-number" placeholder="+55 (11) 99999-9999" className="mt-1" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Mensagens automáticas</h4>
                  <p className="text-sm text-muted-foreground">
                    Ative para enviar mensagens de boas-vindas
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Respostas rápidas</h4>
                  <p className="text-sm text-muted-foreground">
                    Ative para usar atalhos de resposta
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PlatformConnections: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");
  
  const handleConnectPlatform = (platform: string) => {
    toast("Conectando", {
      description: `Iniciando o processo de conexão com ${platform}.`
    });
    
    // Simulando conexão bem-sucedida após 1.5 segundos
    setTimeout(() => {
      toast("Conectado", {
        description: `Sua conta do ${platform} foi conectada com sucesso.`
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold">Integrações de Plataformas</h2>
        <p className="text-muted-foreground">
          Conecte suas redes sociais e plataformas de mensageria para atendimento omnichannel
        </p>
      </div>
      
      <WhatsAppConnection />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-3 mb-6">
          <TabsTrigger value="chat" className="text-xs md:text-sm">Chat e Mensageria</TabsTrigger>
          <TabsTrigger value="social" className="text-xs md:text-sm">Redes Sociais</TabsTrigger>
          <TabsTrigger value="ecommerce" className="text-xs md:text-sm">E-commerce</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <IntegrationCard
            title="Instagram Direct"
            description="Gerencie mensagens do Instagram"
            icon={<Instagram className="h-5 w-5 text-pink-600" />}
            status="connected"
            onConnect={() => handleConnectPlatform("Instagram")}
          />
          
          <IntegrationCard
            title="Facebook Messenger"
            description="Gerencie mensagens do Facebook"
            icon={<MessagesSquare className="h-5 w-5 text-blue-500" />}
            status="disconnected"
            onConnect={() => handleConnectPlatform("Messenger")}
          />
          
          <IntegrationCard
            title="SMS"
            description="Envie e receba mensagens SMS"
            icon={<Smartphone className="h-5 w-5 text-gray-600" />}
            status="disconnected"
            onConnect={() => handleConnectPlatform("SMS")}
          />
          
          <IntegrationCard
            title="Email"
            description="Gerencie emails de clientes"
            icon={<Mail className="h-5 w-5 text-blue-600" />}
            status="disconnected"
            onConnect={() => handleConnectPlatform("Email")}
          />
          
          <IntegrationCard
            title="Telefone"
            description="Integração com sistema telefônico"
            icon={<Phone className="h-5 w-5 text-green-600" />}
            status="disconnected"
            onConnect={() => handleConnectPlatform("Telefone")}
          />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <IntegrationCard
              title="Instagram"
              description="Publique e monitore comentários"
              icon={<Instagram className="h-5 w-5 text-pink-600" />}
              status="disconnected"
              onConnect={() => handleConnectPlatform("Instagram")}
            />
            
            <IntegrationCard
              title="Facebook"
              description="Gerencie sua página do Facebook"
              icon={<MessagesSquare className="h-5 w-5 text-blue-500" />}
              status="disconnected"
              onConnect={() => handleConnectPlatform("Facebook")}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="ecommerce" className="space-y-4">
          <p className="text-muted-foreground mb-4">
            Conecte suas plataformas de e-commerce para sincronizar produtos e pedidos
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Woocommerce</CardTitle>
                <CardDescription className="text-xs">Integre com sua loja WordPress</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button size="sm" className="w-full">Conectar</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Shopify</CardTitle>
                <CardDescription className="text-xs">Integre com sua loja Shopify</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button size="sm" className="w-full">Conectar</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformConnections;
