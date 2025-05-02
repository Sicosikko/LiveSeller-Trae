
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface HeaderSectionProps {
  name: string;
  startTime: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  name, 
  startTime, 
  isRefreshing, 
  onRefresh 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">
          Iniciado em {new Date(startTime).toLocaleString()}
        </p>
      </div>
      <Button 
        variant="outline" 
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-1"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> 
        Atualizar
      </Button>
    </div>
  );
};

export default HeaderSection;
