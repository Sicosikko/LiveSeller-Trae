import { useQuery } from "@tanstack/react-query";
import { FilterOptions } from "@/components/dashboard/AdvancedFilters";
import { cacheService } from "./cacheService";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from 'react';
import { useCache } from '@/hooks/useCache';

// Tipos para as métricas do dashboard
export interface DashboardMetrics {
  messages: {
    today: number;
    change: {
      value: string;
      positive: boolean;
    };
  };
  clients: {
    served: number;
    change: {
      value: string;
      positive: boolean;
    };
  };
  conversion: {
    rate: string;
    change: {
      value: string;
      positive: boolean;
    };
  };
  aiChats: {
    count: number;
    change: {
      value: string;
      positive: boolean;
    };
  };
}

export interface ActivityData {
  name: string;
  mensagens: number;
  atendimentos: number;
}

export interface RecentChat {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar?: string;
  status: "pending" | "completed" | "scheduled";
}

export interface TeamMemberPerformance {
  id: string;
  name: string;
  role: string;
  chats: number;
  satisfaction: number;
  responseTime: string;
  avatar?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  customer: string;
  time: string;
  date: string;
  type: "message" | "call" | "meeting";
}

// Tipos para os dados da equipe
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  chats: number;
  satisfaction: number;
}

// Função para buscar métricas principais do dashboard
export const fetchDashboardMetrics = async (filters?: FilterOptions): Promise<DashboardMetrics> => {
  const cacheKey = cacheService.generateCacheKey("dashboardMetrics", filters);
  
  // Verificar se os dados estão em cache
  const cachedData = cacheService.get<DashboardMetrics>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch('/api/dashboard/metrics');
    if (!response.ok) {
      throw new Error('Falha ao buscar métricas do dashboard');
    }
    
    const data = await response.json();
    
    // Processar os dados conforme os filtros
    let processedData = data as DashboardMetrics;
    
    if (filters) {
      // Aplicar filtros aos dados
      // Implementação dos filtros mantendo o tipo DashboardMetrics
      // Não modificamos o tipo, apenas os valores
    }
    
    // Armazenar em cache
    cacheService.set(cacheKey, processedData, { ttl: 2 * 60 * 1000 }); // 2 minutos TTL
    
    return processedData;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    // Retornamos valores vazios em caso de erro para evitar quebra da UI
    return {
      messages: { today: 0, change: { value: '0%', positive: false } },
      clients: { served: 0, change: { value: '0%', positive: false } },
      conversion: { rate: '0%', change: { value: '0%', positive: false } },
      aiChats: { count: 0, change: { value: '0%', positive: false } }
    };
  }
};

// Função para buscar dados de atividade para o gráfico
export const fetchActivityData = async (period: string = 'week', filters?: FilterOptions): Promise<ActivityData[]> => {
  const cacheKey = cacheService.generateCacheKey(`activityData:${period}`, filters);
  
  // Verificar cache
  const cachedData = cacheService.get<ActivityData[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // Determinar o intervalo de datas com base no período
    const today = new Date();
    let startDate = new Date(today);
    
    switch (period) {
      case "week":
      case "7dias":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
      case "30dias":
        startDate.setDate(today.getDate() - 30);
        break;
      case "quarter":
      case "90dias":
        startDate.setDate(today.getDate() - 90);
        break;
      default:
        startDate.setDate(today.getDate() - 30); // Padrão: 30 dias
    }
    
    // Formatar datas para a consulta
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = today.toISOString().split('T')[0];
    
    const response = await fetch(`/api/dashboard/activity?period=${period}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar dados de atividade');
    }
    
    const data = await response.json();
    
    // Processar dados conforme filtros
    let processedData = data as ActivityData[];
    
    if (filters) {
      // Aplicar filtros mantendo o tipo ActivityData[]
      if (filters.channels && filters.channels.length > 0) {
        processedData = processedData.filter(item => 
          'channel_id' in item && filters.channels?.includes(item.channel_id as string)
        );
      }
      
      if (filters.teamMembers && filters.teamMembers.length > 0) {
        processedData = processedData.filter(item => 
          'agent_id' in item && filters.teamMembers?.includes(item.agent_id as string)
        );
      }
    }
    
    // Armazenar em cache
    cacheService.set(cacheKey, processedData, { ttl: 5 * 60 * 1000 }); // 5 minutos TTL
    
    return processedData;
  } catch (error) {
    console.error('Erro ao buscar dados de atividade:', error);
    // Retornamos um array vazio em caso de erro
    return [];
  }
};

// Função para buscar conversas recentes
export const fetchRecentChats = async (limit: number = 4): Promise<RecentChat[]> => {
  try {
    const response = await fetch(`/api/dashboard/chats?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar conversas recentes');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar conversas recentes:', error);
    return [];
  }
};

// Função para buscar desempenho da equipe
export const fetchTeamPerformance = async (limit: number = 3): Promise<TeamMemberPerformance[]> => {
  try {
    const response = await fetch(`/api/dashboard/team?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar desempenho da equipe');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar desempenho da equipe:', error);
    return [];
  }
};

// Função para buscar próximos agendamentos
export const fetchSchedules = async (limit: number = 3): Promise<ScheduleItem[]> => {
  try {
    const response = await fetch(`/api/dashboard/schedules?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar agendamentos');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
};

// Hooks para usar com React Query
export const useDashboardMetrics = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['dashboardMetrics', filters],
    queryFn: () => fetchDashboardMetrics(filters),
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false
  });
};

export const useActivityData = (period: string = 'week', filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['activityData', period, filters],
    queryFn: () => fetchActivityData(period, filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentChats = (limit: number = 4) => {
  return useQuery({
    queryKey: ['recentChats', limit],
    queryFn: () => fetchRecentChats(limit),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useSchedules = (limit: number = 3) => {
  return useQuery({
    queryKey: ['schedules', limit],
    queryFn: () => fetchSchedules(limit),
    staleTime: 2 * 60 * 1000,
  });
};

// Hook para obter dados de desempenho da equipe com cache
export const useTeamPerformanceWithCache = () => {
  const [data, setData] = useState<TeamMemberPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getCache, setCache } = useCache();

  useEffect(() => {
    const fetchTeamPerformanceData = async () => {
      setIsLoading(true);
      
      try {
        // Verificar se os dados estão em cache
        const cachedData = getCache('teamPerformance');
        
        if (cachedData) {
          setData(cachedData as TeamMemberPerformance[]);
          setIsLoading(false);
          
          // Atualizar em segundo plano após usar o cache
          fetchFreshData();
          return;
        }
        
        // Se não estiver em cache, buscar dados frescos
        await fetchFreshData();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados de desempenho da equipe'));
        setIsLoading(false);
      }
    };
    
    const fetchFreshData = async () => {
      try {
        // Simulação de chamada à API
        const response = await fetch('/api/team/performance');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados de desempenho da equipe');
        }
        
        const result = await response.json();
        
        // Armazenar no cache com expiração de 5 minutos (300000 ms)
        setCache('teamPerformance', result, 300000);
        
        setData(result as TeamMemberPerformance[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados de desempenho da equipe'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamPerformanceData();
  }, [getCache, setCache]);
  
  // Função para atualizar os dados manualmente
  const refetch = async () => {
    setIsLoading(true);
    try {
      // Simulação de chamada à API
      const response = await fetch('/api/team/performance');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados de desempenho da equipe');
      }
      
      const result = await response.json();
      
      // Atualizar o cache
      setCache('teamPerformance', result, 300000);
      
      setData(result as TeamMemberPerformance[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados de desempenho da equipe'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return { data, isLoading, error, refetch };
};

// Hook para obter conversas recentes com cache
export const useRecentChatsWithCache = () => {
  const [data, setData] = useState<RecentChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getCache, setCache } = useCache();

  useEffect(() => {
    const fetchRecentChatsData = async () => {
      setIsLoading(true);
      
      try {
        // Verificar se os dados estão em cache
        const cachedData = getCache('recentChats');
        
        if (cachedData) {
          setData(cachedData as RecentChat[]);
          setIsLoading(false);
          
          // Atualizar em segundo plano após usar o cache
          fetchFreshData();
          return;
        }
        
        // Se não estiver em cache, buscar dados frescos
        await fetchFreshData();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar conversas recentes'));
        setIsLoading(false);
      }
    };
    
    const fetchFreshData = async () => {
      try {
        // Simulação de chamada à API
        const response = await fetch('/api/chats/recent');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar conversas recentes');
        }
        
        const result = await response.json();
        
        // Armazenar no cache com expiração de 2 minutos (120000 ms)
        setCache('recentChats', result, 120000);
        
        setData(result as RecentChat[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar conversas recentes'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentChatsData();
  }, [getCache, setCache]);
  
  // Função para atualizar os dados manualmente
  const refetch = async () => {
    setIsLoading(true);
    try {
      // Simulação de chamada à API
      const response = await fetch('/api/chats/recent');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar conversas recentes');
      }
      
      const result = await response.json();
      
      // Atualizar o cache
      setCache('recentChats', result, 120000);
      
      setData(result as RecentChat[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar conversas recentes'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return { data, isLoading, error, refetch };
};

// Hook para obter agendamentos com cache
export interface Schedule {
  id: string;
  title: string;
  customer: string;
  date: string;
  time: string;
  type: "message" | "call" | "meeting";
}

export const useSchedulesWithCache = () => {
  const [data, setData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getCache, setCache } = useCache();

  useEffect(() => {
    const fetchSchedulesData = async () => {
      setIsLoading(true);
      
      try {
        // Verificar se os dados estão em cache
        const cachedData = getCache('schedules');
        
        if (cachedData) {
          setData(cachedData as Schedule[]);
          setIsLoading(false);
          
          // Atualizar em segundo plano após usar o cache
          fetchFreshData();
          return;
        }
        
        // Se não estiver em cache, buscar dados frescos
        await fetchFreshData();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar agendamentos'));
        setIsLoading(false);
      }
    };
    
    const fetchFreshData = async () => {
      try {
        // Simulação de chamada à API
        const response = await fetch('/api/schedules/next');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar agendamentos');
        }
        
        const result = await response.json();
        
        // Armazenar no cache com expiração de 5 minutos (300000 ms)
        setCache('schedules', result, 300000);
        
        setData(result as Schedule[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar agendamentos'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSchedulesData();
  }, [getCache, setCache]);
  
  // Função para atualizar os dados manualmente
  const refetch = async () => {
    setIsLoading(true);
    try {
      // Simulação de chamada à API
      const response = await fetch('/api/schedules/next');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar agendamentos');
      }
      
      const result = await response.json();
      
      // Atualizar o cache
      setCache('schedules', result, 300000);
      
      setData(result as Schedule[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar agendamentos'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return { data, isLoading, error, refetch };
};