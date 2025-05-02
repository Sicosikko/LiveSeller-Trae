
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface CreateBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateBotDialog: React.FC<CreateBotDialogProps> = ({
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo Assistente</DialogTitle>
          <DialogDescription>
            Configure as informações básicas do seu novo assistente inteligente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Ex: Assistente de Vendas" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Descreva a função deste assistente" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select defaultValue="chatbot">
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chatbot">Chatbot</SelectItem>
                <SelectItem value="automation">Automação</SelectItem>
                <SelectItem value="hybrid">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Objetivo principal</Label>
            <Select defaultValue="support">
              <SelectTrigger id="purpose">
                <SelectValue placeholder="Selecione o objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">Suporte ao cliente</SelectItem>
                <SelectItem value="sales">Vendas</SelectItem>
                <SelectItem value="faq">FAQ e informações</SelectItem>
                <SelectItem value="qualification">Qualificação de leads</SelectItem>
                <SelectItem value="scheduling">Agendamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Idiomas</Label>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Português", "Inglês", "Espanhol", "Francês", "Alemão"].map((lang) => (
                <Badge 
                  key={lang} 
                  variant={lang === "Português" ? "default" : "outline"} 
                  className="cursor-pointer"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => onOpenChange(false)}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBotDialog;
