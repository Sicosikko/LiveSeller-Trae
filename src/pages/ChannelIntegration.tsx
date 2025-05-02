
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Send } from "lucide-react";
import ChannelConfiguration from "@/components/channels/ChannelConfiguration";
import ChannelInbox from "@/components/channels/ChannelInbox";
import ChannelAutomation from "@/components/channels/ChannelAutomation";

const ChannelIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("config");

  return (
    <MainLayout title="Integração de Canais">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Gerenciamento de Canais</h2>
          <p className="text-sm text-muted-foreground">
            Configure e gerencie todos os seus canais de comunicação em um só lugar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Visão Geral dos Canais</CardTitle>
              <CardDescription>
                Gerencie todos os seus canais de comunicação com clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium text-sm">WhatsApp</h3>
                      </div>
                      <Badge className="bg-green-500">Conectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Número conectado: +55 11 98765-4321</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">189 conversas hoje</p>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Gerenciar</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium text-sm">Instagram</h3>
                      </div>
                      <Badge className="bg-purple-500">Conectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Perfil: @suamarca</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">47 mensagens hoje</p>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Gerenciar</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium text-sm">Messenger</h3>
                      </div>
                      <Badge className="bg-blue-500">Conectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Página: Sua Empresa</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">23 mensagens hoje</p>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Gerenciar</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5 text-sky-600" />
                        <h3 className="font-medium text-sm">Telegram</h3>
                      </div>
                      <Badge className="bg-slate-500">Desconectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Não configurado</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">0 mensagens</p>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Configurar</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-amber-600" />
                        <h3 className="font-medium text-sm">SMS</h3>
                      </div>
                      <Badge className="bg-slate-500">Desconectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Não configurado</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">0 mensagens</p>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Configurar</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-rose-600" />
                        <h3 className="font-medium text-sm">Email</h3>
                      </div>
                      <Badge className="bg-slate-500">Desconectado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-xs text-muted-foreground">Não configurado</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">0 mensagens</p>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Configurar</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Canais</CardTitle>
              <CardDescription>
                Desempenho dos seus canais de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">WhatsApp</span>
                    <span className="text-sm text-muted-foreground">189 conversas</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Instagram</span>
                    <span className="text-sm text-muted-foreground">47 conversas</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Messenger</span>
                    <span className="text-sm text-muted-foreground">23 conversas</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2 text-sm">Tempo Médio de Resposta</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xl font-semibold">5min</p>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold">12min</p>
                    <p className="text-xs text-muted-foreground">Instagram</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold">8min</p>
                    <p className="text-xs text-muted-foreground">Messenger</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="config" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger value="config" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Configurações de Canais
              </TabsTrigger>
              <TabsTrigger value="inbox" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Caixa de Entrada Unificada
              </TabsTrigger>
              <TabsTrigger value="automation" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Automação Multicanal
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="config" className="pt-6">
            <ChannelConfiguration />
          </TabsContent>

          <TabsContent value="inbox" className="pt-6">
            <ChannelInbox />
          </TabsContent>

          <TabsContent value="automation" className="pt-6">
            <ChannelAutomation />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChannelIntegration;
