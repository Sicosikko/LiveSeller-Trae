
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Plus } from "lucide-react";

interface AIAssistantHeaderProps {
  onCreateBot: () => void;
  onOpenAIAssistant: () => void;
}

const AIAssistantHeader: React.FC<AIAssistantHeaderProps> = ({ 
  onCreateBot, 
  onOpenAIAssistant 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-lg font-medium">Assistente de IA</h2>
        <p className="text-sm text-muted-foreground">
          Crie chatbots inteligentes e automações para otimizar sua comunicação
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="bg-purple-100 hover:bg-purple-200 text-purple-700"
          onClick={onOpenAIAssistant}
        >
          <Brain className="h-4 w-4 mr-2" /> Assistente de IA
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={onCreateBot}
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Assistente
        </Button>
      </div>
    </div>
  );
};

export default AIAssistantHeader;
