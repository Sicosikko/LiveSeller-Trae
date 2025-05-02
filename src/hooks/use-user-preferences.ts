
import { useState, useEffect } from 'react';
import userPreferencesSync, { UserPreferences } from '@/services/websocket/UserPreferencesSync';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(userPreferencesSync.getPreferences());
  const { isConnected } = useApp();
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Configurar assinatura para atualizações de preferências
    const unsubscribe = userPreferencesSync.subscribe((updatedPrefs) => {
      setPreferences(updatedPrefs);
    });
    
    return unsubscribe;
  }, []);
  
  // Efeito para detectar conexão WebSocket e sincronizar preferências
  useEffect(() => {
    if (isConnected && !syncing) {
      setSyncing(true);
      
      // Simular sincronização com o servidor
      setTimeout(() => {
        setSyncing(false);
        
        // Mostrar notificação apenas se tiver preferências salvas anteriormente
        const hasExistingPrefs = localStorage.getItem('user-preferences') !== null;
        
        if (hasExistingPrefs) {
          toast({
            title: "Preferências sincronizadas",
            description: "Suas configurações foram sincronizadas com sucesso"
          });
        }
      }, 1500);
    }
  }, [isConnected, toast]);
  
  // Função para atualizar preferências
  const updatePreferences = (updatedPrefs: Partial<UserPreferences>) => {
    userPreferencesSync.updatePreferences(updatedPrefs);
  };
  
  // Funções de conveniência para atualizações comuns
  const setTheme = (theme: string) => {
    updatePreferences({ theme });
  };
  
  const setLanguage = (language: string) => {
    updatePreferences({ language });
  };
  
  const toggleNotification = (type: 'email' | 'push' | 'sms', value: boolean) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [type]: value
      }
    });
  };
  
  const toggleAccessibility = (feature: 'highContrast' | 'largeText' | 'reducedMotion', value: boolean) => {
    updatePreferences({
      accessibility: {
        ...preferences.accessibility,
        [feature]: value
      }
    });
  };
  
  return {
    preferences,
    updatePreferences,
    setTheme,
    setLanguage,
    toggleNotification,
    toggleAccessibility,
    syncing
  };
}
