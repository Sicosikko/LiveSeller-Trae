
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AIAssistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateFlows: (prompt: string) => void;
  isProcessing: boolean;
}

const AIAssistDialog: React.FC<AIAssistDialogProps> = ({
  open,
  onOpenChange,
  onGenerateFlows,
  isProcessing
}) => {
  const [aiPrompt, setAiPrompt] = useState("");

  const handleGenerateFlows = () => {
    onGenerateFlows(aiPrompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assistente de IA</DialogTitle>
          <DialogDescription>
            Descreva seu negócio e objetivos para que nosso assistente possa criar fluxos automatizados personalizados.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Descreva seu projeto</Label>
            <Textarea 
              id="ai-prompt" 
              placeholder="Ex: Sou uma loja de roupas online e preciso qualificar leads, agendar atendimentos e enviar promoções para clientes recorrentes." 
              className="h-40"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Sugestões:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Descreva seu nicho de mercado ou segmento</li>
              <li>Mencione seu público-alvo</li>
              <li>Inclua objetivos específicos de comunicação</li>
              <li>Especifique canais de atendimento utilizados</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button 
            onClick={handleGenerateFlows} 
            disabled={!aiPrompt.trim() || isProcessing}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? "Processando..." : "Gerar Fluxos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistDialog;
