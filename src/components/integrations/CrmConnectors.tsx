
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Database, Server, Share2, ArrowUpDown, BadgeCheck, AlertTriangle, RefreshCw } from "lucide-react";

interface CrmConnectorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
}

const CrmConnectorCard: React.FC<CrmConnectorCardProps> = ({
  title,
  description,
  icon,
  status,
  lastSync
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              {icon}
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          <div>
            <Switch 
              checked={status === "connected"}
              onCheckedChange={() => {}}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex justify-between items-center">
          <div>
            {status === "connected" && (
              <span className="flex items-center text-green-600 gap-1">
                <BadgeCheck className="h-4 w-4" /> Conectado
              </span>
            )}
            {status === "disconnected" && (
              <span className="flex items-center text-gray-400 gap-1">
                <AlertTriangle className="h-4 w-4" /> Desconectado
              </span>
            )}
            {status === "pending" && (
              <span className="flex items-center text-amber-500 gap-1">
                <RefreshCw className="h-4 w-4" /> Aguardando autorização
              </span>
            )}
            {lastSync && <p className="text-xs text-muted-foreground mt-1">Última sincronização: {lastSync}</p>}
          </div>
          <Button variant="outline" size="sm" disabled={status === "disconnected"}>
            <Share2 className="h-4 w-4 mr-1" /> Configurar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CrmConnectors: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("connected");
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Integrações com CRMs</h2>
        <p className="text-muted-foreground">
          Conecte o LiveSeller com seu CRM para sincronizar contatos e leads
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="connected">Conectados</TabsTrigger>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connected" className="space-y-4 mt-4">
          <CrmConnectorCard 
            title="Salesforce"
            description="Integração com Salesforce CRM"
            icon={<Database className="h-5 w-5 text-primary" />}
            status="connected"
            lastSync="28/04/2025 15:30"
          />
          
          <CrmConnectorCard 
            title="HubSpot"
            description="Integração com HubSpot CRM"
            icon={<Server className="h-5 w-5 text-primary" />}
            status="connected"
            lastSync="29/04/2025 09:45"
          />
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4 mt-4">
          <CrmConnectorCard 
            title="Pipedrive"
            description="Integração com Pipedrive CRM"
            icon={<ArrowUpDown className="h-5 w-5 text-primary" />}
            status="disconnected"
          />
          
          <CrmConnectorCard 
            title="RD Station"
            description="Integração com RD Station Marketing"
            icon={<RefreshCw className="h-5 w-5 text-primary" />}
            status="pending"
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Sincronização</CardTitle>
              <CardDescription>
                Ajuste como os dados são sincronizados entre o LiveSeller e os CRMs conectados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync">Sincronização Automática</Label>
                  <Switch id="auto-sync" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Sincronizar automaticamente novos leads e contatos
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-frequency">Frequência de Sincronização</Label>
                  <select 
                    id="sync-frequency"
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    defaultValue="60"
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="360">6 horas</option>
                    <option value="720">12 horas</option>
                  </select>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="bidirectional">Sincronização Bidirecional</Label>
                  <Switch id="bidirectional" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Atualizar dados nos dois sistemas quando houver modificações
                </p>
              </div>
              
              <Button className="w-full mt-4">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrmConnectors;
