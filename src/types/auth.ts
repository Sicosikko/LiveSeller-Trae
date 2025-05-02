
import { Session, User } from '@supabase/supabase-js';

// Extended User type that includes role
export interface ExtendedUser extends User {
  role?: string;
}

export interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean; // Added this property
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: ExtendedUser; session?: Session }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  loginWithOAuth: (provider: 'google' | 'facebook' | 'github') => Promise<{ success: boolean; error?: string; data?: any }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  setupTwoFactor: () => Promise<{ success: boolean; error?: string; data?: any }>;
  verifyTwoFactorCode: (factorId: string, challengeId: string, code: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  changePassword: (newPassword: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  checkAuthStatus: () => Promise<{ user: ExtendedUser | null; session: Session | null; error?: any; success?: boolean }>;
}
