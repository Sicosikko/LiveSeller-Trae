import { useState, useCallback } from 'react';
import { supabase, resetPassword } from '@/services/auth/authService';
import { User, Session } from '@supabase/supabase-js';
import { ensureDeveloperPrivileges } from '@/utils/developerAccess';
import { toast } from 'sonner';
import { ExtendedUser } from '@/types/auth';

export const useAuthActions = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session) {
        const { user } = data.session;
        // Apply developer privileges if applicable
        const enhancedUser = ensureDeveloperPrivileges(user);
        setUser(enhancedUser);
        setSession(data.session);
        
        // Return in format expected by the AuthContextType
        return { 
          user: enhancedUser as ExtendedUser, 
          session: data.session,
          success: true
        };
      } else {
        setUser(null);
        setSession(null);
        
        // Return in format expected by the AuthContextType
        return { 
          user: null, 
          session: null,
          success: true
        };
      }
    } catch (error: any) {
      console.error('Error checking auth status:', error);
      return { 
        user: null, 
        session: null, 
        error: error.message,
        success: false
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Apply developer privileges if applicable
      const enhancedUser = ensureDeveloperPrivileges(data.user);
      setUser(enhancedUser);
      setSession(data.session);
      
      toast.success("Login realizado com sucesso!");
      return { success: true, data };
    } catch (error: any) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      
      // Limpar dados da sessão do localStorage
      localStorage.removeItem('supabase-session');
      
      toast.success("Logout realizado com sucesso!");
      return { success: true };
    } catch (error: any) {
      console.error('Error logging out:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmação.");
      return { success: true, data };
    } catch (error: any) {
      console.error('Error registering:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithOAuth = useCallback(async (provider: 'google' | 'facebook' | 'github') => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error: any) {
      console.error(`Error logging in with ${provider}:`, error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      console.log('Solicitando redefinição de senha para:', email);
      
      // Usar o serviço de autenticação para resetar a senha
      const { data, error } = await resetPassword(email);
      
      if (error) {
        console.error('Erro detalhado:', error);
        toast.error(`Erro ao enviar email: ${error.message || 'Erro desconhecido'}`);
        return { success: false, error: error.message };
      }
      
      toast.success("E-mail de redefinição de senha enviado!");
      return { success: true, data };
    } catch (error: any) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      toast.error(`Erro inesperado: ${error.message || 'Erro desconhecido'}`);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast.success("Senha alterada com sucesso!");
      return { success: true, data };
    } catch (error: any) {
      console.error('Error changing password:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setupTwoFactor = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      
      if (error) throw error;
      
      return { 
        success: true, 
        data: {
          id: data.id,
          totp: {
            qr_code: data.totp.qr_code,
            secret: data.totp.secret,
            uri: data.totp.uri
          }
        }
      };
    } catch (error: any) {
      console.error('Error setting up 2FA:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyTwoFactorCode = useCallback(async (factorId: string, challengeId: string, code: string) => {
    try {
      setIsLoading(true);
      
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });
      
      if (challengeError) throw challengeError;
      
      const actualChallengeId = challengeData.id;
      
      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: actualChallengeId,
        code
      });
      
      if (error) throw error;
      
      toast.success("Verificação em dois fatores concluída!");
      return { success: true, data };
    } catch (error: any) {
      console.error('Error verifying 2FA code:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
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
  };
};
