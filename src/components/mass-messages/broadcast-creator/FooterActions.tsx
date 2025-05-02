
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FooterActionsProps {
  onSaveDraft?: () => void;
  onSchedule?: () => void;
}

const FooterActions: React.FC<FooterActionsProps> = ({ 
  onSaveDraft = () => toast.success("Rascunho salvo com sucesso"),
  onSchedule = () => toast.success("Disparo agendado com sucesso")
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={onSaveDraft}>Salvar como Rascunho</Button>
      <Button className="bg-whatsapp hover:bg-whatsapp-dark" onClick={onSchedule}>Agendar Disparo</Button>
    </div>
  );
};

export default FooterActions;
