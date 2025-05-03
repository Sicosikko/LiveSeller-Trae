import { toast } from "@/components/ui/use-toast";

export interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  lastUpdated: Date;
  description: string;
}

export const checkApiStatus = async (): Promise<ServiceStatus> => {
  try {
    const startTime = Date.now();
    const response = await fetch('/api/health', { 
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (!response.ok) {
      return {
        name: "API Principal",
        status: "outage",
        lastUpdated: new Date(),
        description: `Serviço indisponível (${response.status})`
      };
    }
    
    // Considerar degradado se o tempo de resposta for maior que 1 segundo
    const status = responseTime > 1000 ? "degraded" : "operational";
    
    return {
      name: "API Principal",
      status: status,
      lastUpdated: new Date(),
      description: `Serviços de autenticação e principais endpoints (${responseTime}ms)`
    };
  } catch (error) {
    console.error("Erro ao verificar status da API:", error);
    return {
      name: "API Principal",
      status: "outage",
      lastUpdated: new Date(),
      description: "Não foi possível conectar ao serviço"
    };
  }
};