
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface VariableBadgesProps {
  onVariableClick?: (variable: string) => void;
}

const VariableBadges: React.FC<VariableBadgesProps> = ({ 
  onVariableClick = (variable) => toast.info(`Variável ${variable} adicionada`)
}) => {
  const variables = [
    { name: "nome", value: "{{nome}}" },
    { name: "telefone", value: "{{telefone}}" },
    { name: "email", value: "{{email}}" },
    { name: "empresa", value: "{{empresa}}" },
    { name: "cidade", value: "{{cidade}}" }
  ];

  return (
    <div className="space-y-2">
      <Label>Variáveis Disponíveis</Label>
      <div className="flex flex-wrap gap-2">
        {variables.map((variable) => (
          <Badge 
            key={variable.name}
            variant="outline" 
            className="cursor-pointer hover:bg-secondary"
            onClick={() => onVariableClick(variable.value)}
          >
            {variable.value}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Clique nas variáveis para adicioná-las à sua mensagem
      </p>
    </div>
  );
};

export default VariableBadges;
