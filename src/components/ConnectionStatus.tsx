
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useApp } from "@/contexts/AppContext";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";

const ConnectionStatus: React.FC = () => {
  const { isConnected, connectionAttempts, connectionStats } = useApp();
  
  // Determine connection quality based on latency
  const getConnectionQuality = () => {
    if (!isConnected) return null;
    
    const latency = connectionStats?.latency || 0;
    if (latency < 100) return "excelente";
    if (latency < 300) return "boa";
    if (latency < 500) return "regular";
    return "lenta";
  };
  
  const connectionQuality = getConnectionQuality();
  
  // Determinar status visual baseado na conexão e tentativas
  const getStatusStyle = () => {
    if (isConnected) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (connectionAttempts > 2) {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <Badge 
              variant="outline"
              className={`flex gap-1 items-center ${getStatusStyle()}`}
            >
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3" />
                  <span className="text-xs">Conectado</span>
                </>
              ) : connectionAttempts > 2 ? (
                <>
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs">Offline</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  <span className="text-xs">Reconectando</span>
                </>
              )}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isConnected ? (
            <>
              <p>Conectado em tempo real ao servidor</p>
              {connectionQuality && (
                <p className="text-xs">Conexão {connectionQuality} ({connectionStats?.latency || 0}ms)</p>
              )}
              {connectionStats?.lastConnected && (
                <p className="text-xs text-muted-foreground">
                  Conectado desde {new Date(connectionStats.lastConnected).toLocaleTimeString()}
                </p>
              )}
            </>
          ) : (
            <>
              <p>Não conectado ao servidor em tempo real</p>
              <p className="text-xs text-muted-foreground">
                O sistema continuará funcionando em modo offline.
              </p>
              {connectionAttempts > 0 && (
                <p className="text-xs text-muted-foreground">
                  Tentativa {connectionAttempts} de reconexão
                </p>
              )}
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConnectionStatus;
