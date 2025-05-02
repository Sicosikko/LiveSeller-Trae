
import React from "react";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "Nenhum resultado encontrado" 
}) => {
  return (
    <Card className="p-8">
      <div className="text-center">
        <p className="text-muted-foreground">{message}</p>
      </div>
    </Card>
  );
};

export default EmptyState;
