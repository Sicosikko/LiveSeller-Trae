
import React from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ConnectionStatus: React.FC = () => {
  const { isConnected, connectionAttempts, reconnectManually } = useApp();

  // Se estiver conectado ou com tentativas < 2, não mostra o alerta
  // Isso evita que o alerta fique aparecendo e desaparecendo constantemente
  if (isConnected || connectionAttempts < 2) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex justify-between items-center">
        <span>Sem conexão</span>
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
          onClick={reconnectManually}
        >
          <RefreshCw className={`h-3 w-3 ${connectionAttempts > 0 ? 'animate-spin' : ''}`} />
          Reconectar
        </Button>
      </AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span>
          Os disparos em massa não podem ser executados sem uma conexão estável.
          Você pode continuar usando outras funções do sistema.
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionStatus;
