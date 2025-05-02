
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";

interface EmptyBotCardProps {
  onClick: () => void;
}

const EmptyBotCard: React.FC<EmptyBotCardProps> = ({ onClick }) => {
  return (
    <Card className="flex flex-col items-center justify-center border-dashed p-8 h-full">
      <Bot className="h-16 w-16 mb-4 text-muted-foreground opacity-50" />
      <h3 className="font-medium mb-1">Criar novo Assistente</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Configure um assistente virtual para seu negócio
      </p>
      <Button onClick={onClick} className="bg-primary hover:bg-primary/90">
        <Plus className="h-4 w-4 mr-2" /> Novo Assistente
      </Button>
    </Card>
  );
};

export default EmptyBotCard;
