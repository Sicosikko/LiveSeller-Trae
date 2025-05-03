import { toast } from "@/hooks/use-toast";

// Tipos para os dados retornados pelas APIs
export interface CompanyOverview {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  totalConversations: number;
  totalBots: number;
  averageResponseTime: number;
  userGrowth: number;
  messageGrowth: number;
  dailyActiveUsers: { date: string; users: number }[];
  messagesByChannel: { channel: string; count: number }[];
}

export interface OperationalStatus {
  apiStatus: "operational" | "degraded" | "down";
  databaseStatus: "operational" | "degraded" | "down";
  websocketStatus: "operational" | "degraded" | "down";
  storageStatus: "operational" | "degraded" | "down";
  lastUpdated: string;
  incidents: {
    id: string;
    title: string;
    description: string;
    status: "investigating" | "identified" | "monitoring" | "resolved";
    createdAt: string;
    updatedAt: string;
  }[];
}

/**
 * Busca os dados gerais da empresa para o painel administrativo
 * @returns Dados de visão geral da empresa
 */
export const fetchCompanyOverview = async (): Promise<CompanyOverview> => {
  try {
    const response = await fetch('/api/admin/overview');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar dados da empresa');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error);
    toast({
      title: "Erro ao carregar dados",
      description: "Não foi possível obter os dados da empresa. Tente novamente.",
      variant: "destructive"
    });
    
    // Retornar dados vazios em caso de erro
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalMessages: 0,
      totalConversations: 0,
      totalBots: 0,
      averageResponseTime: 0,
      userGrowth: 0,
      messageGrowth: 0,
      dailyActiveUsers: [],
      messagesByChannel: []
    };
  }
};

/**
 * Busca o status operacional da plataforma
 * @returns Status dos serviços da plataforma
 */
export const fetchOperationalStatus = async (): Promise<OperationalStatus> => {
  try {
    const response = await fetch('/api/admin/status');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar status operacional');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar status operacional:', error);
    toast({
      title: "Erro ao carregar status",
      description: "Não foi possível obter o status operacional. Tente novamente.",
      variant: "destructive"
    });
    
    // Retornar dados vazios em caso de erro
    return {
      apiStatus: "operational",
      databaseStatus: "operational",
      websocketStatus: "operational",
      storageStatus: "operational",
      lastUpdated: new Date().toISOString(),
      incidents: []
    };
  }
};