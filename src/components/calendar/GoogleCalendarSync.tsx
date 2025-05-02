
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GoogleCalendarSync: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConnect = async () => {
    setIsLoading(true);
    
    try {
      // Aqui implementaríamos a integração real com a API do Google Calendar
      // Isto é apenas um mock para demonstração
      
      setTimeout(() => {
        setIsConnected(true);
        toast("Conectado ao Google Calendar: Sua conta foi conectada com sucesso ao Google Calendar.");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Erro na integração com Google Calendar:", error);
      toast("Erro na conexão: Não foi possível conectar ao Google Calendar. Tente novamente.");
      setIsLoading(false);
    }
  };
  
  const handleDisconnect = () => {
    setIsLoading(true);
    
    // Simular desconexão
    setTimeout(() => {
      setIsConnected(false);
      toast("Desconectado do Google Calendar: Sua conta foi desconectada do Google Calendar.");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      onClick={isConnected ? handleDisconnect : handleConnect}
      disabled={isLoading}
      className="gap-2"
    >
      <Calendar className="h-4 w-4" />
      {isLoading
        ? "Processando..."
        : isConnected
        ? "Desconectar Google Calendar"
        : "Conectar Google Calendar"}
    </Button>
  );
};

export default GoogleCalendarSync;
