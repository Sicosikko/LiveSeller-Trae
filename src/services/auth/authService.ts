
import { createClient } from '@supabase/supabase-js';

// Inicializar o cliente do Supabase com valores das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://molulxnizauiqaeguusv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbHVseG5pemF1aXFhZWd1dXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMzM5NTUsImV4cCI6MjA2MTgwOTk1NX0.eNmDdswfTdXQxThbt8mY44SfYbewP1VfAlCBfunE0WU';

// Adicionar console.log para verificar as variáveis de ambiente
console.log("Variáveis de ambiente do Supabase:");
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL ? "Configurada" : "Não configurada");
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Configurada" : "Não configurada");
console.log("URL utilizada:", supabaseUrl);
console.log("Chave utilizada:", supabaseKey.substring(0, 10) + "...");

// Verificar se as credenciais estão disponíveis
if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase URL ou chave não configurados corretamente. Verifique as variáveis de ambiente.");
}

// Criar o cliente Supabase com opções otimizadas
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Função para login com email e senha
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { data: null, error };
  }
};

// Função para cadastro com email e senha
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Enviar email de verificação
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    return { data: null, error };
  }
};

// Função para login com OAuth (Google, Facebook, etc)
export const signInWithOAuth = async (provider: 'google' | 'facebook' | 'github') => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao fazer login com OAuth:', error);
    return { data: null, error };
  }
};

// Função para logout
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return { error: null };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { error };
  }
};

// Função para recuperação de senha
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    return { data: null, error };
  }
};

// Função para atualizar senha
export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return { data: null, error };
  }
};

// Função para verificar o estado da autenticação
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return { session: null, error };
  }
};

// Interface para o tipo de retorno da função setupMFA
interface MFAEnrollResponse {
  id: string; 
  qr_code: string;
}

// Função para configurar autenticação de dois fatores (MFA)
export const setupMFA = async () => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp'
    });
    
    if (error) throw error;
    
    return { 
      data: {
        id: data.id,
        totp: {
          qr_code: data.totp.qr_code,
          secret: data.totp.secret,
          uri: data.totp.uri
        }
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Erro ao configurar 2FA:', error);
    return { data: null, error };
  }
};

// Função para verificar MFA
export const verifyMFA = async (factorId: string, challengeId: string, code: string) => {
  try {
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId
    });
    
    if (challengeError) throw challengeError;
    
    // Use o ID do desafio retornado
    const actualChallengeId = challengeData.id;

    // Agora que temos um desafio, vamos verificar o código
    const { data, error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: actualChallengeId,
      code
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Erro ao verificar 2FA:', error);
    return { data: null, error };
  }
};

// Função para atualizar perfil de usuário
export const updateUserProfile = async (userData: { 
  name?: string, 
  avatar_url?: string, 
  company?: string 
}) => {
  try {
    // Salvar dados customizados no metadata
    const { data, error } = await supabase.auth.updateUser({
      data: userData
    });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { data: null, error };
  }
};
