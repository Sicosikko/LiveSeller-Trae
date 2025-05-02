
import { useQuery } from '@tanstack/react-query';

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

// Função para buscar métricas principais do dashboard
export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const response = await fetch('/api/dashboard/metrics');
    if (!response.ok) {
      throw new Error('Falha ao buscar métricas do dashboard');
    }
    return await response.json();
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
export const fetchActivityData = async (period: string = 'week'): Promise<ActivityData[]> => {
  try {
    const response = await fetch(`/api/dashboard/activity?period=${period}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar dados de atividade');
    }
    return await response.json();
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
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: fetchDashboardMetrics,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useActivityData = (period: string = 'week') => {
  return useQuery({
    queryKey: ['activityData', period],
    queryFn: () => fetchActivityData(period),
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

export const useTeamPerformance = (limit: number = 3) => {
  return useQuery({
    queryKey: ['teamPerformance', limit],
    queryFn: () => fetchTeamPerformance(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSchedules = (limit: number = 3) => {
  return useQuery({
    queryKey: ['schedules', limit],
    queryFn: () => fetchSchedules(limit),
    staleTime: 2 * 60 * 1000,
  });
};
