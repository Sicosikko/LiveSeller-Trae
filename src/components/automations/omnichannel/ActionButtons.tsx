
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ActionButtonsProps {
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave }) => {
  return (
    <div className="flex gap-4">
      <Button
        variant="default"
        className="flex-1"
        onClick={onSave}
      >
        <Send className="mr-2 h-4 w-4" />
        Salvar
      </Button>
      <Button variant="outline" className="flex-1">Cancelar</Button>
    </div>
  );
};

export default ActionButtons;
