
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

type Theme = 'light' | 'dark' | 'system' | 'device' | 'auto';

export function useThemeSwitcher() {
  const { theme, setTheme, isMobileApp, isDesktopApp } = useApp();
  
  // Função para determinar se deve usar tema escuro baseado na hora do dia
  const shouldUseDarkTheme = (): boolean => {
    const hours = new Date().getHours();
    // Entre 19h e 7h, sugerir tema escuro
    return hours >= 19 || hours < 7;
  };

  // Detectar e aplicar preferência de tema do sistema
  useEffect(() => {
    if (theme !== 'system' && theme !== 'device') return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const autoTheme = prefersDark ? 'dark' : 'light';

    // Aplicar tema baseado na hora do dia se for noite
    if (shouldUseDarkTheme() && !localStorage.getItem('user-theme-preference')) {
      document.documentElement.classList.toggle('dark', true);
    } else {
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Configurar listener para mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  // Função para verificar e alternar tema com base no horário
  useEffect(() => {
    if (theme !== 'auto') return;
    
    const checkTime = () => {
      const isDark = shouldUseDarkTheme();
      document.documentElement.classList.toggle('dark', isDark);
    };
    
    // Verificar imediatamente
    checkTime();
    
    // Configurar verificação periódica (a cada hora)
    const interval = setInterval(checkTime, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [theme]);

  return {
    theme,
    setTheme,
    isAutoTheme: theme === 'auto',
    isDark: document.documentElement.classList.contains('dark'),
    isSystemTheme: theme === 'system',
    isDeviceTheme: theme === 'device',
    availableThemes: [
      { id: 'light', name: 'Claro' },
      { id: 'dark', name: 'Escuro' },
      { id: 'system', name: 'Sistema' },
      { id: 'auto', name: 'Automático (hora do dia)' },
      ...(isMobileApp || isDesktopApp ? [{ id: 'device', name: 'Dispositivo' }] : [])
    ]
  };
}
