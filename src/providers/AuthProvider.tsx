import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/services/auth/authService';
import { AuthContextType } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { ensureDeveloperPrivileges } from '@/utils/developerAccess';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    checkAuthStatus,
    login,
    logout,
    register,
    loginWithOAuth,
    requestPasswordReset,
    setupTwoFactor,
    verifyTwoFactorCode,
    changePassword
  } = useAuthActions();

  // Verificar sessão quando o componente é montado
  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus();
    };
    
    initializeAuth();
    
    // Configurar ouvinte para mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        // Apply developer privileges if applicable
        const enhancedUser = ensureDeveloperPrivileges(currentSession?.user ?? null);
        setUser(enhancedUser);
        setSession(currentSession);
        
        // Armazenar sessão no localStorage para persistência
        if (currentSession) {
          localStorage.setItem('supabase-session', JSON.stringify(currentSession));
        } else {
          localStorage.removeItem('supabase-session');
        }
      }
    );

    // Tentar restaurar sessão do localStorage se disponível
    const loadStoredSession = async () => {
      const storedSession = localStorage.getItem('supabase-session');
      if (storedSession) {
        try {
          const parsedSession = JSON.parse(storedSession) as Session;
          const { data, error } = await supabase.auth.getUser(parsedSession.access_token);
          
          if (!error && data.user) {
            const enhancedUser = ensureDeveloperPrivileges(data.user);
            setUser(enhancedUser);
            setSession(parsedSession);
          } else {
            // Sessão inválida, remover
            localStorage.removeItem('supabase-session');
          }
        } catch (e) {
          console.error('Erro ao restaurar sessão:', e);
          localStorage.removeItem('supabase-session');
        }
      }
    };
    
    loadStoredSession();

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    loading: isLoading, // Mapear isLoading para loading para atender ao tipo AuthContextType
    isAuthenticated: !!user,
    login,
    logout,
    register,
    loginWithOAuth,
    requestPasswordReset,
    setupTwoFactor,
    verifyTwoFactorCode,
    changePassword,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
