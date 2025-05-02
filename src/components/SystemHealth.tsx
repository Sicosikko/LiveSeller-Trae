
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldAlert, ShieldCheck, Activity } from "lucide-react";

export type SystemStatus = "optimal" | "degraded" | "maintenance" | "issue";

interface SystemHealthProps {
  status: SystemStatus;
}

const SystemHealth: React.FC<SystemHealthProps> = ({ status }) => {
  const getStatusDetails = () => {
    switch (status) {
      case "optimal":
        return {
          label: "Sistema operando normalmente",
          icon: <ShieldCheck className="h-3 w-3" />,
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200"
        };
      case "degraded":
        return {
          label: "Performance reduzida",
          icon: <Activity className="h-3 w-3" />,
          classes: "bg-amber-50 text-amber-700 border-amber-200"
        };
      case "maintenance":
        return {
          label: "Manutenção programada",
          icon: <Activity className="h-3 w-3" />,
          classes: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "issue":
        return {
          label: "Incidente detectado",
          icon: <ShieldAlert className="h-3 w-3" />,
          classes: "bg-red-50 text-red-700 border-red-200"
        };
      default:
        return {
          label: "Status desconhecido",
          icon: <Activity className="h-3 w-3" />,
          classes: "bg-gray-50 text-gray-700 border-gray-200"
        };
    }
  };

  const { label, icon, classes } = getStatusDetails();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <Badge 
              variant="outline"
              className={`flex gap-1 items-center ${classes}`}
            >
              {icon}
              <span className="text-xs hidden md:inline">{label}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
          <p className="text-xs text-muted-foreground">Último status verificado: {new Date().toLocaleTimeString()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SystemHealth;
