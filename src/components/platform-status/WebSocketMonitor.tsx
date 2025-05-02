
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Wifi, WifiOff, AlertTriangle, Check, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface WebSocketMonitorProps {
  isConnected: boolean;
  connectionAttempts: number;
  stats: {
    lastConnected: Date | null;
    messageCount: number;
    latency: number;
    activeConnections?: number;
    totalConnections?: number;
  };
  onRefresh?: () => void;
}

const WebSocketMonitor: React.FC<WebSocketMonitorProps> = ({ 
  isConnected, 
  connectionAttempts, 
  stats, 
  onRefresh 
}) => {
  // Determinar qualidade de conexão com base na latência
  const getConnectionQuality = () => {
    if (!isConnected) return null;
    
    const latency = stats?.latency || 0;
    if (latency < 100) return { label: "Excelente", color: "bg-emerald-500" };
    if (latency < 300) return { label: "Boa", color: "bg-green-500" };
    if (latency < 500) return { label: "Regular", color: "bg-yellow-500" };
    return { label: "Lenta", color: "bg-orange-500" };
  };
  
  const connectionQuality = getConnectionQuality();
  
  // Calcular porcentagem de latência em relação ao máximo aceitável (1000ms)
  const getLatencyPercentage = () => {
    const latency = stats?.latency || 0;
    const percentage = Math.min(latency / 10, 100);
    return percentage;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Status da Conexão em Tempo Real
            </CardTitle>
            <CardDescription>
              Monitoramento das conexões WebSocket
            </CardDescription>
          </div>
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status principal */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Badge className="bg-emerald-500">
                  <Check className="h-3 w-3 mr-1" />
                  Conectado
                </Badge>
              ) : connectionAttempts > 2 ? (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              ) : (
                <Badge variant="outline" className="border-amber-500 text-amber-600">
                  <RefreshCcw className="h-3 w-3 mr-1 animate-spin" />
                  Reconectando
                </Badge>
              )}
              
              {isConnected && connectionQuality && (
                <span className="text-sm text-muted-foreground">
                  Qualidade {connectionQuality.label}
                </span>
              )}
            </div>
            
            <div className="text-sm">
              {isConnected && stats.lastConnected && (
                <span className="text-muted-foreground">
                  Conectado desde {stats.lastConnected.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          {/* Detalhes da conexão */}
          {isConnected && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Latência</span>
                  <span className="text-sm font-medium">{stats.latency}ms</span>
                </div>
                <Progress 
                  value={getLatencyPercentage()} 
                  className={`h-2 ${connectionQuality?.color || "bg-emerald-500"}`}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-sm text-muted-foreground">Mensagens Recebidas</div>
                  <div className="text-2xl font-semibold">{stats.messageCount}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Conexões Ativas</div>
                  <div className="text-2xl font-semibold">
                    {stats.activeConnections || 0}/{stats.totalConnections || 0}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Mensagem offline */}
          {!isConnected && (
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <div className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-700">Sem conexão em tempo real</span>
              </div>
              <p className="text-sm text-red-600 mt-1">
                Tentativa {connectionAttempts} de reconexão. O sistema continuará funcionando em modo offline.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebSocketMonitor;
