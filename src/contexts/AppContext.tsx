
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useWebSocket } from '@/hooks/use-websocket';
import { useToast } from '@/hooks/use-toast';

type Theme = 'light' | 'dark' | 'system' | 'device' | 'auto';
type SystemStatus = 'optimal' | 'degraded' | 'maintenance' | 'issue';

interface ConnectionStats {
  lastConnected: Date | null;
  messageCount: number;
  latency: number;
}

interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

interface AppContextProps {
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isConnected: boolean;
  connectionAttempts: number;
  connectionStats: ConnectionStats | null;
  latestNotification: any;
  sendMessage: (data: object | string) => boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isMobileApp: boolean;
  isDesktopApp: boolean;
  appVersion: string;
  systemHealth: SystemStatus;
  reconnectManually: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'system';
  });
  const [systemHealth, setSystemHealth] = useState<SystemStatus>('optimal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [shouldConnect, setShouldConnect] = useState(false);

  // Simulate authenticated state for development
  useEffect(() => {
    // Check if user is logged in from local storage (for demo)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Detecção de plataforma
  const [isMobileApp] = useState(() => {
    return window.navigator.userAgent.includes('WhatzAppMobile');
  });
  
  const [isDesktopApp] = useState(() => {
    return window.navigator.userAgent.includes('WhatzAppElectron');
  });
  
  const appVersion = '1.2.0';

  // In a real app, this would use the actual WebSocket server URL
  // For now we use a placeholder
  const wsUrl = shouldConnect ? (
    process.env.NODE_ENV === 'production' 
      ? 'wss://api.whatzapp.com/ws'
      : 'wss://dev-api.whatzapp.com/ws'
  ) : '';
  
  // Só conecta ao WebSocket se não estiver em modo de desenvolvimento
  const {
    isConnected,
    connectionAttempts,
    connectionStats,
    latestMessage: latestNotification,
    sendMessage,
    connect: reconnectManually,
    maxReconnectAttempts
  } = useWebSocket(wsUrl, { 
    reconnectAttempts: 3, // Reduzido para 3 tentativas
    reconnectInterval: 5000, // Aumentado para 5 segundos
    showNotifications: false, // Desativamos as notificações automáticas
    pingInterval: 30000, // Verificar latência a cada 30 segundos
    onConnectionChange: (connected) => {
      if (connected && connectionAttempts > 0) {
        // Notificação de conexão restabelecida apenas se houve tentativas anteriores
        toast({
          title: "Conexão restabelecida",
          description: "A conexão com o servidor foi restabelecida com sucesso.",
          variant: "default"
        });
      }
    }
  });

  // Atrasa a ativação da conexão WebSocket para depois do carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldConnect(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulação de mudança de status do sistema a cada 30 segundos (apenas para demonstração)
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      const statusOptions: SystemStatus[] = ['optimal', 'degraded', 'maintenance', 'issue'];
      // Predominância para 'optimal' (peso maior)
      const weightedOptions: SystemStatus[] = [...statusOptions, 'optimal', 'optimal', 'optimal', 'optimal'];
      
      const interval = setInterval(() => {
        // 80% de chance de manter como optimal
        if (Math.random() > 0.2) {
          setSystemHealth('optimal');
        } else {
          const randomIndex = Math.floor(Math.random() * weightedOptions.length);
          const newStatus: SystemStatus = weightedOptions[randomIndex];
          setSystemHealth(newStatus);
        }
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Aplica o tema escolhido
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Verifica se o usuário completou o onboarding
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted) {
      setHasCompletedOnboarding(true);
    } else {
      // Mostra onboarding na primeira visita
      setShowOnboarding(true);
    }
  }, []);

  // Trata notificações em tempo real, com limite de frequência
  const lastNotificationTimeRef = React.useRef(0);
  
  useEffect(() => {
    if (latestNotification && latestNotification.type === 'notification') {
      // Limita notificações a uma a cada 10 segundos
      const now = Date.now();
      if (now - lastNotificationTimeRef.current > 10000) {
        lastNotificationTimeRef.current = now;
        
        toast({
          title: latestNotification.title || 'Nova notificação',
          description: latestNotification.message,
          variant: latestNotification.variant === 'success' ? 'default' : latestNotification.variant || 'default'
        });
      }
    }
    
    // Atualiza status do sistema baseado em notificações de status
    if (latestNotification?.type === 'system_status') {
      const newStatus = latestNotification.status as SystemStatus || 'optimal';
      setSystemHealth(newStatus);
    }
  }, [latestNotification, toast]);

  const value = {
    showOnboarding,
    setShowOnboarding,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    isConnected,
    connectionAttempts,
    connectionStats,
    latestNotification,
    sendMessage,
    theme,
    setTheme,
    isMobileApp,
    isDesktopApp,
    appVersion,
    systemHealth,
    reconnectManually,
    isAuthenticated,
    user
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
