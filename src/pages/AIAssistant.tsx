import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Calendar } from "lucide-react";
import { useAIAssistant } from "@/hooks/use-ai-assistant";
import { Link } from 'react-router-dom';

// Componentes refatorados
import AIAssistantHeader from "@/components/ai-assistant/AIAssistantHeader";
import CreateBotDialog from "@/components/ai-assistant/CreateBotDialog";
import AIAssistDialog from "@/components/ai-assistant/AIAssistDialog";
import ChatBotGrid from "@/components/ai-assistant/ChatBotGrid";
import BuilderTab from "@/components/ai-assistant/BuilderTab";
import ChannelAutomation from "@/components/channels/ChannelAutomation";
import { MOCK_BOTS } from "@/components/ai-assistant/types";

// Interfaces
interface Bot {
  id: string;
  name: string;
  type: string;
  status: string;
  // Outros campos necessários
}

interface Template {
  id: string;
  name: string;
  content: string;
}

const AIAssistant: React.FC = () => {
  // Estados
  const [openDialog, setOpenDialog] = useState(false);
  const [openAIAssistantDialog, setOpenAIAssistantDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { isProcessing, generateFlowSuggestions } = useAIAssistant();
  const [bots, setBots] = useState<Bot[]>([]);
  const [templates] = useState<Template[]>([
    { id: 'support', name: 'Atendimento', content: '' },
    { id: 'sales', name: 'Vendas', content: '' },
    { id: 'help', name: 'Suporte', content: '' },
    { id: 'scheduling', name: 'Agendamento', content: '' },
    { id: 'faq', name: 'FAQ', content: '' },
    { id: 'lead', name: 'Qualificação de Lead', content: '' }
  ]);
  
  // Efeitos
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('/api/bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error('Error fetching bots:', error);
      }
    };
    fetchBots();
  }, []);
  
  // Handlers
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

  // Renderização de templates
  const renderTemplateCard = (template: Template, index: number) => (
    <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Template: {template.name}</CardTitle>
        <CardDescription className="text-xs">
          Modelo pré-configurado para {template.name.toLowerCase()}
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
        <Link to={`/templates/${template.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            Usar Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

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
              {['all', 'chatbots', 'automations', 'templates', 'builder'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                >
                  {tab === 'all' ? 'Todos' : 
                   tab === 'chatbots' ? 'Chatbots' : 
                   tab === 'automations' ? 'Automações' : 
                   tab === 'templates' ? 'Templates' : 'Construtor'}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Conteúdo das abas */}
          <TabsContent value="all" className="pt-6">
            <ChatBotGrid bots={MOCK_BOTS} onCreateBot={() => setOpenDialog(true)} />
          </TabsContent>

          <TabsContent value="chatbots" className="pt-6">
            <ChatBotGrid bots={MOCK_BOTS} onCreateBot={() => setOpenDialog(true)} filter="chatbot" />
          </TabsContent>

          <TabsContent value="automations" className="pt-6">
            <ChannelAutomation />
          </TabsContent>

          <TabsContent value="templates" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template, index) => renderTemplateCard(template, index))}
            </div>
          </TabsContent>

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