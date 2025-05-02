import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Activity, Lock, Unlock, Circle, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import EncryptedWebSocketService from "@/services/websocket/EncryptedWebSocketService";
import { useToast } from "@/hooks/use-toast";

interface WebSocketMessage {
  id: string;
  timestamp: number;
  type: string;
  content: any;
  encrypted: boolean;
}

interface WebSocketStats {
  messagesReceived: number;
  messagesSent: number;
  bytesReceived: number;
  bytesSent: number;
  connectionState: string;
  latency: number;
}

const WebSocketMonitor: React.FC = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [stats, setStats] = useState<WebSocketStats>({
    messagesReceived: 0,
    messagesSent: 0,
    bytesReceived: 0,
    bytesSent: 0,
    connectionState: "Disconnected",
    latency: 0
  });
  
  // Reference to keep track of the WebSocket service
  const wsServiceRef = useRef<EncryptedWebSocketService | null>(null);
  const pingIntervalRef = useRef<number | null>(null);
  
  // Handler for when a message is received
  const handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      
      // Handle ping response for latency calculation
      if (data.type === 'pong' && data.pingTime) {
        const latency = Date.now() - data.pingTime;
        setStats(prev => ({ ...prev, latency }));
        return;
      }
      
      // Add the message to the list
      const newMessage: WebSocketMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        type: data.type || 'unknown',
        content: data,
        encrypted: isEncrypted
      };
      
      setMessages(prev => [newMessage, ...prev.slice(0, 19)]); // Keep only latest 20 messages
      
      // Update stats
      setStats(prev => ({
        ...prev,
        messagesReceived: prev.messagesReceived + 1,
        bytesReceived: prev.bytesReceived + event.data.length
      }));
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  };
  
  // Connect to WebSocket
  const connect = () => {
    try {
      // Create WebSocket service
      const wsUrl = 'wss://echo.websocket.org'; // Example echo server for testing
      const wsService = new EncryptedWebSocketService(wsUrl);
      
      // Set up encryption if needed
      if (isEncrypted) {
        wsService.setEncryptionPassword('secure-password-example-123');
      }
      
      // Set handlers
      wsService.onOpen(() => {
        setIsConnected(true);
        setStats(prev => ({ ...prev, connectionState: 'Connected' }));
        toast("WebSocket Conectado", {
          description: "Monitoramento em tempo real ativado."
        });
      });
      
      wsService.onClose(() => {
        setIsConnected(false);
        setStats(prev => ({ ...prev, connectionState: 'Disconnected' }));
        // Clear ping interval
        if (pingIntervalRef.current) {
          window.clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = null;
        }
        toast("WebSocket Desconectado", {
          description: "A conexão de monitoramento foi encerrada."
        });
      });
      
      wsService.onError(() => {
        setStats(prev => ({ ...prev, connectionState: 'Error' }));
        toast("Erro no WebSocket", {
          description: "Ocorreu um erro na conexão de monitoramento."
        });
      });
      
      wsService.onMessage(handleMessage);
      
      // Connect
      wsService.connect();
      wsServiceRef.current = wsService;
      
      // Set up ping interval for latency measurement
      pingIntervalRef.current = window.setInterval(() => {
        if (wsServiceRef.current && wsServiceRef.current.isConnected()) {
          const pingMessage = {
            type: 'ping',
            pingTime: Date.now()
          };
          
          if (isEncrypted) {
            wsServiceRef.current.sendEncrypted(pingMessage);
          } else {
            wsServiceRef.current.send(pingMessage);
          }
          
          // Update stats for sent message
          setStats(prev => ({
            ...prev,
            messagesSent: prev.messagesSent + 1,
            bytesSent: prev.bytesSent + JSON.stringify(pingMessage).length
          }));
        }
      }, 5000);
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      toast("Erro na Conexão", {
        description: "Não foi possível estabelecer conexão WebSocket."
      });
    }
  };
  
  // Disconnect WebSocket
  const disconnect = () => {
    if (wsServiceRef.current) {
      wsServiceRef.current.disconnect();
      wsServiceRef.current = null;
    }
    
    // Clear ping interval
    if (pingIntervalRef.current) {
      window.clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  };
  
  // Toggle encryption
  const toggleEncryption = () => {
    if (isConnected) {
      disconnect();
    }
    setIsEncrypted(!isEncrypted);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  
  // Reconnect when encryption setting changes
  useEffect(() => {
    if (isConnected) {
      disconnect();
      connect();
    }
  }, [isEncrypted]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" /> 
          Monitor WebSocket
        </CardTitle>
        <CardDescription>
          Monitoramento em tempo real das conexões WebSocket com {isEncrypted ? 'criptografia end-to-end' : 'comunicação não criptografada'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Circle className={`h-3 w-3 ${isConnected ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'}`} />
            <span>Status: </span>
            <Badge 
              variant={isConnected ? "default" : "destructive"}
            >
              {stats.connectionState}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {isEncrypted ? (
              <>
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-sm">Criptografado</span>
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Não criptografado</span>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEncryption}
            >
              {isEncrypted ? "Desativar" : "Ativar"} Criptografia
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Mensagens Recebidas</div>
            <div className="text-2xl font-bold">{stats.messagesReceived}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Mensagens Enviadas</div>
            <div className="text-2xl font-bold">{stats.messagesSent}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Bytes Recebidos</div>
            <div className="text-2xl font-bold">{stats.bytesReceived}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Latência</div>
            <div className="text-2xl font-bold">{stats.latency} ms</div>
          </div>
        </div>

        <div className="flex justify-between my-4">
          <Button 
            onClick={connect}
            disabled={isConnected}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Conectar
          </Button>
          <Button 
            variant="outline"
            onClick={disconnect}
            disabled={!isConnected}
            className="gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Desconectar
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setMessages([])}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Limpar Logs
          </Button>
        </div>
        
        <div className="border rounded-md">
          <div className="p-2 bg-muted font-medium text-sm">
            Log de Mensagens (últimas {messages.length})
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma mensagem registrada
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map(message => (
                  <div key={message.id} className="border-b pb-2 text-sm">
                    <div className="flex justify-between font-mono">
                      <span>{new Date(message.timestamp).toISOString()}</span>
                      <div className="flex items-center gap-1">
                        <span>{message.type}</span>
                        {message.encrypted && <Lock className="h-3 w-3" />}
                      </div>
                    </div>
                    <pre className="text-xs bg-slate-50 p-2 mt-1 rounded overflow-x-auto">
                      {JSON.stringify(message.content, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {!isConnected && (
          <div className="flex justify-center py-2">
            <span className="text-sm text-muted-foreground">
              Clique em "Conectar" para iniciar o monitoramento em tempo real
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebSocketMonitor;
