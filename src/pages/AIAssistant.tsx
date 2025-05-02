
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChannelAutomation from "@/components/channels/ChannelAutomation";
import { Bot, MessageSquare, Calendar } from "lucide-react";
import { useAIAssistant } from "@/hooks/use-ai-assistant";

// Importando os componentes refatorados
import AIAssistantHeader from "@/components/ai-assistant/AIAssistantHeader";
import CreateBotDialog from "@/components/ai-assistant/CreateBotDialog";
import AIAssistDialog from "@/components/ai-assistant/AIAssistDialog";
import ChatBotGrid from "@/components/ai-assistant/ChatBotGrid";
import BuilderTab from "@/components/ai-assistant/BuilderTab";
import { MOCK_BOTS } from "@/components/ai-assistant/types";

const AIAssistant: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAIAssistantDialog, setOpenAIAssistantDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { isProcessing, generateFlowSuggestions } = useAIAssistant();
  
  const handleAIAssist = async (prompt: string) => {
    try {
      const result = await generateFlowSuggestions(prompt);
      if (result) {
        setOpenAIAssistantDialog(false);
      }
    } catch (error) {
      console.error("Erro ao processar sugestões de fluxo:", error);
    }
  };

  return (
    <MainLayout title="Assistente de IA">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <AIAssistantHeader 
          onCreateBot={() => setOpenDialog(true)} 
          onOpenAIAssistant={() => setOpenAIAssistantDialog(true)} 
        />

        {/* Abas de navegação */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger 
                value="chatbots" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Chatbots
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Automações
              </TabsTrigger>
              <TabsTrigger 
                value="templates" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Templates
              </TabsTrigger>
              <TabsTrigger 
                value="builder" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Construtor
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab de todos os assistentes */}
          <TabsContent value="all" className="pt-6">
            <ChatBotGrid bots={MOCK_BOTS} onCreateBot={() => setOpenDialog(true)} />
          </TabsContent>

          {/* Tab de chatbots */}
          <TabsContent value="chatbots" className="pt-6">
            <ChatBotGrid bots={MOCK_BOTS} onCreateBot={() => setOpenDialog(true)} filter="chatbot" />
          </TabsContent>

          {/* Tab de automações */}
          <TabsContent value="automations" className="pt-6">
            <ChannelAutomation />
          </TabsContent>

          {/* Tab de templates */}
          <TabsContent value="templates" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Atendimento", "Vendas", "Suporte", "Agendamento", "FAQ", "Qualificação de Lead"].map((template, index) => (
                <Card key={template} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Template: {template}</CardTitle>
                    <CardDescription className="text-xs">
                      Modelo pré-configurado para {template.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        {index % 3 === 0 && <MessageSquare className="h-5 w-5 text-primary" />}
                        {index % 3 === 1 && <Bot className="h-5 w-5 text-primary" />}
                        {index % 3 === 2 && <Calendar className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Template completo com fluxos conversacionais e automações
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      Usar Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab do construtor */}
          <TabsContent value="builder" className="pt-6">
            <BuilderTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogos */}
      <CreateBotDialog open={openDialog} onOpenChange={setOpenDialog} />
      
      <AIAssistDialog 
        open={openAIAssistantDialog} 
        onOpenChange={setOpenAIAssistantDialog}
        onGenerateFlows={handleAIAssist}
        isProcessing={isProcessing}
      />
    </MainLayout>
  );
};

export default AIAssistant;
