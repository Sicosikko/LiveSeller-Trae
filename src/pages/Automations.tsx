
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OmnichannelAutomation from "@/components/automations/OmnichannelAutomation";
import SegmentAutomation from "@/components/automations/SegmentAutomation";
import { Wand, MessageSquare, Calendar, Tag, ArrowRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Automations: React.FC = () => {
  const [activeTab, setActiveTab] = useState("omnichannel");

  return (
    <MainLayout title="Automações">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Central de Automação</h2>
            <p className="text-sm text-muted-foreground">
              Configure fluxos automatizados para seus canais e equipes
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/ai-assistant">
              <Button variant="outline" className="bg-purple-100 hover:bg-purple-200 text-purple-700">
                <Brain className="h-4 w-4 mr-2" /> Assistente de IA
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="omnichannel" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto">
            <TabsTrigger value="omnichannel" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 flex items-center gap-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span>Omnichannel</span>
            </TabsTrigger>
            <TabsTrigger value="segmentation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 flex items-center gap-2 py-3">
              <Tag className="h-4 w-4" />
              <span>Segmentação</span>
            </TabsTrigger>
            <TabsTrigger value="agendamento" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 flex items-center gap-2 py-3">
              <Calendar className="h-4 w-4" />
              <span>Agendamento</span>
            </TabsTrigger>
            <TabsTrigger value="personalizado" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 flex items-center gap-2 py-3">
              <Wand className="h-4 w-4" />
              <span>Personalizado</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="omnichannel" className="border p-0 rounded-lg">
            <OmnichannelAutomation />
          </TabsContent>

          <TabsContent value="segmentation" className="border p-0 rounded-lg">
            <SegmentAutomation />
          </TabsContent>

          <TabsContent value="agendamento">
            <Card>
              <CardHeader>
                <CardTitle>Automação de Agendamento</CardTitle>
                <CardDescription>
                  Configure seu sistema de agendamento automático via chat
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Sistema de Agendamento em Breve</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Estamos trabalhando na integração com Google Calendar e outros sistemas de agendamento.
                </p>
                <Button variant="outline">
                  Solicitar Notificação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalizado">
            <Card>
              <CardHeader>
                <CardTitle>Automações Personalizadas</CardTitle>
                <CardDescription>
                  Crie fluxos de automação totalmente personalizáveis para qualquer necessidade
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Wand className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Construtor de Automações</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Crie automações avançadas com lógica condicional, ações personalizadas e integração com outros sistemas.
                </p>
                <Button>
                  Novo Fluxo Personalizado
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Automations;
