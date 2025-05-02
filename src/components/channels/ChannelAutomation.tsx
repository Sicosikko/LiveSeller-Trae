import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand } from "lucide-react";
import { AutomationFlow } from "./types/automationTypes";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import AutomationList from "./automation/AutomationList";
import AutomationFlowBuilder from "./automation/AutomationFlowBuilder";
import TemplateGallery from "./automation/TemplateGallery";
import AutomationSettings from "./automation/AutomationSettings";

// Sample flows data
const SAMPLE_FLOWS: AutomationFlow[] = [
  {
    id: "welcome-flow",
    name: "Fluxo de Boas-vindas",
    description: "Mensagem inicial enviada quando um novo cliente inicia a conversa",
    isActive: true,
    channels: ["whatsapp", "instagram", "facebook"],
    tags: ["Automático", "Boas-vindas"],
    roleAccess: ["admin", "editor"],
    steps: [
      {
        id: "step-1",
        type: "message",
        title: "Mensagem de Boas-vindas",
        config: {
          message: "Olá! Obrigado por entrar em contato. Como podemos ajudar você hoje?",
        }
      },
      {
        id: "step-2",
        type: "delay",
        title: "Aguardar 30 segundos",
        config: {
          delay: 30
        }
      },
      {
        id: "step-3",
        type: "condition",
        title: "Verificar resposta",
        config: {
          condition: "no-reply"
        }
      }
    ]
  },
  {
    id: "absence-flow",
    name: "Resposta de Ausência",
    description: "Mensagem enviada fora do horário de atendimento",
    isActive: true,
    channels: ["whatsapp", "instagram", "facebook", "email"],
    tags: ["Automático", "Fora do Expediente"],
    roleAccess: ["admin", "editor"],
    steps: [
      {
        id: "step-1",
        type: "condition",
        title: "Verificar horário",
        config: {
          condition: "outside-hours"
        }
      },
      {
        id: "step-2",
        type: "message",
        title: "Mensagem de Ausência",
        config: {
          message: "Agradecemos seu contato! No momento estamos fora do horário de atendimento, que é de segunda a sexta, das 9h às 18h. Retornaremos assim que possível.",
        }
      }
    ]
  }
];

const ChannelAutomation: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("flows");
  const [flows, setFlows] = useState<AutomationFlow[]>(SAMPLE_FLOWS);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(null);
  const [showFlowBuilder, setShowFlowBuilder] = useState(false);
  const [availableRoles] = useState(["admin", "editor", "atendente", "vendedor"]);
  const [availableTags] = useState(["Automático", "Boas-vindas", "Fora do Expediente", "Vendas", "Suporte", "Agendamento", "Alta Prioridade"]);

  const handleFlowToggle = (flowId: string) => {
    setFlows(flows.map(flow => 
      flow.id === flowId ? { ...flow, isActive: !flow.isActive } : flow
    ));
  };

  const editFlow = (flow: AutomationFlow) => {
    setSelectedFlow(flow);
    setShowFlowBuilder(true);
  };

  const createNewFlow = () => {
    const newFlow = {
      id: `flow-${Date.now()}`,
      name: "Novo Fluxo",
      description: "Descrição do novo fluxo",
      isActive: false,
      channels: [],
      tags: [],
      roleAccess: ["admin"],
      steps: []
    };
    setSelectedFlow(newFlow);
    setShowFlowBuilder(true);
  };

  const handleSaveFlow = () => {
    if (!selectedFlow) return;

    // Check if this is a new flow or editing existing one
    if (flows.find(f => f.id === selectedFlow.id)) {
      setFlows(flows.map(f => f.id === selectedFlow.id ? selectedFlow : f));
    } else {
      setFlows([...flows, selectedFlow]);
    }

    toast({
      title: "Fluxo salvo",
      description: `O fluxo "${selectedFlow.name}" foi salvo com sucesso.`
    });

    setShowFlowBuilder(false);
  };

  const handleSelectTemplate = (templateId: string) => {
    // In a real app, we would load the template and create a new flow from it
    toast({
      title: "Template selecionado",
      description: `O template "${templateId}" foi selecionado. Implemente a lógica para criar um novo fluxo baseado neste template.`
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de automação foram salvas com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Automação Multicanal</CardTitle>
              <CardDescription>
                Configure fluxos automáticos que funcionem em todos os seus canais de comunicação
              </CardDescription>
            </div>
            {!showFlowBuilder && (
              <Button onClick={createNewFlow} className="bg-primary hover:bg-primary/90">
                <Wand className="h-4 w-4 mr-2" /> Criar Novo Fluxo
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showFlowBuilder ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="flows">Fluxos</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flows" className="space-y-4">
                <AutomationList 
                  flows={flows} 
                  onToggleFlow={handleFlowToggle} 
                  onEditFlow={editFlow} 
                />
              </TabsContent>
              
              <TabsContent value="templates">
                <TemplateGallery onSelectTemplate={handleSelectTemplate} />
              </TabsContent>
              
              <TabsContent value="settings">
                <AutomationSettings onSaveSettings={handleSaveSettings} />
              </TabsContent>
            </Tabs>
          ) : (
            <AutomationFlowBuilder 
              flow={selectedFlow}
              availableTags={availableTags}
              availableRoles={availableRoles}
              setFlow={setSelectedFlow}
              onCancel={() => setShowFlowBuilder(false)}
              onSaveFlow={handleSaveFlow}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelAutomation;
