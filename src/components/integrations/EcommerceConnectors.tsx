import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Store, ShoppingCart, Truck, RefreshCcw, CheckCheck, AlertTriangle } from "lucide-react";

interface EcommercePlatform {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
  status: "connected" | "disconnected";
  features: string[];
}

const EcommerceConnectors: React.FC = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<EcommercePlatform[]>([
    {
      id: "woocommerce",
      name: "WooCommerce",
      logo: <Store className="h-6 w-6 text-purple-600" />,
      description: "Plugin de e-commerce para WordPress",
      status: "disconnected",
      features: ["Produtos", "Pedidos", "Clientes", "Pagamentos"]
    },
    {
      id: "shopify",
      name: "Shopify",
      logo: <ShoppingBag className="h-6 w-6 text-green-600" />,
      description: "Plataforma completa de e-commerce",
      status: "disconnected",
      features: ["Produtos", "Pedidos", "Clientes", "Inventário"]
    },
    {
      id: "vtex",
      name: "VTEX",
      logo: <ShoppingCart className="h-6 w-6 text-blue-600" />,
      description: "Plataforma enterprise de e-commerce",
      status: "disconnected",
      features: ["Produtos", "Pedidos", "Marketplace", "B2B"]
    },
    {
      id: "magento",
      name: "Magento",
      logo: <ShoppingBag className="h-6 w-6 text-orange-600" />,
      description: "Solução de e-commerce da Adobe",
      status: "disconnected",
      features: ["Produtos", "Pedidos", "Clientes", "Promoções"]
    },
    {
      id: "nuvemshop",
      name: "Nuvemshop",
      logo: <Store className="h-6 w-6 text-teal-600" />,
      description: "Plataforma para pequenas e médias empresas",
      status: "disconnected",
      features: ["Produtos", "Pedidos", "Checkout", "Marketing"]
    },
    {
      id: "mercadolivre",
      name: "Mercado Livre",
      logo: <ShoppingCart className="h-6 w-6 text-yellow-600" />,
      description: "Principal marketplace da América Latina",
      status: "disconnected",
      features: ["Anúncios", "Vendas", "Mensagens", "Entregas"]
    }
  ]);
  
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<EcommercePlatform | null>(null);
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiSecret: "",
    storeUrl: ""
  });
  
  const handleOpenConnectDialog = (platform: EcommercePlatform) => {
    setSelectedPlatform(platform);
    setShowConnectDialog(true);
  };
  
  const handleConnect = () => {
    if (!selectedPlatform) return;
    
    if (!credentials.apiKey || !credentials.storeUrl) {
      toast("Campos obrigatórios", {
        description: "Preencha todos os campos necessários para continuar"
      });
      return;
    }
    
    // Simulating connection
    toast("Conectando", {
      description: `Conectando ao ${selectedPlatform.name}. Estabelecendo conexão segura...`
    });
    
    // Simulate API connection delay
    setTimeout(() => {
      // Update platform status
      setPlatforms(platforms.map(platform => 
        platform.id === selectedPlatform.id 
          ? { ...platform, status: "connected" } 
          : platform
      ));
      
      toast("Conexão estabelecida", {
        description: `${selectedPlatform.name} foi conectado com sucesso!`
      });
      
      setShowConnectDialog(false);
      setCredentials({ apiKey: "", apiSecret: "", storeUrl: "" });
    }, 2000);
  };
  
  const handleDisconnect = (platformId: string) => {
    toast("Desconectando", {
      description: "Finalizando a integração com a plataforma."
    });
    
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, status: "disconnected" } 
          : platform
      ));
      
      toast("Desconectado", {
        description: "A plataforma foi desconectada com sucesso."
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Plataformas de E-commerce</h2>
        <p className="text-muted-foreground">
          Sincronize produtos, pedidos e clientes com suas lojas online
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <Card key={platform.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    {platform.logo}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={platform.status === "connected" ? "default" : "outline"} 
                  className={platform.status === "connected" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                  {platform.status === "connected" ? (
                    <span className="flex items-center gap-1">
                      <CheckCheck className="h-3.5 w-3.5" />
                      Conectado
                    </span>
                  ) : "Não conectado"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-4 text-sm">
                {platform.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {platform.status === "connected" ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Sincronizar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDisconnect(platform.id)}
                    >
                      Desconectar
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => handleOpenConnectDialog(platform)}>
                    Conectar {platform.name}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Separator className="my-8" />
      
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-md">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Configurações de Sincronização</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Defina como os dados serão sincronizados entre o LiveSeller e suas plataformas de e-commerce
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Produtos</Label>
                    <p className="text-xs text-muted-foreground">
                      Sincronizar produtos e inventário
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Pedidos</Label>
                    <p className="text-xs text-muted-foreground">
                      Sincronizar pedidos e status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Clientes</Label>
                    <p className="text-xs text-muted-foreground">
                      Sincronizar dados de clientes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Promoções</Label>
                    <p className="text-xs text-muted-foreground">
                      Sincronizar cupons e descontos
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connect Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Conectar ao {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>
              Insira as credenciais de API para estabelecer a conexão
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="store-url" className="text-right">
                URL da Loja
              </Label>
              <Input
                id="store-url"
                placeholder="https://sualoja.com.br"
                value={credentials.storeUrl}
                onChange={(e) => setCredentials({...credentials, storeUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input
                id="api-key"
                value={credentials.apiKey}
                onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-secret" className="text-right">
                API Secret
              </Label>
              <Input
                id="api-secret"
                type="password"
                value={credentials.apiSecret}
                onChange={(e) => setCredentials({...credentials, apiSecret: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="col-span-full text-xs text-muted-foreground">
              <p>
                <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                Para encontrar suas credenciais, acesse o painel administrativo da sua loja e busque por "API" ou "Integrações".
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConnect}>Conectar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcommerceConnectors;
