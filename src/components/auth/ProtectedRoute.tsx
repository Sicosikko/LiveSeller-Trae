
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Certifique-se de que este import existe

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Temporariamente desativando a verificação de autenticação
  // const { user, isLoading } = useAuth();
  
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  
  // Permitindo acesso direto durante a manutenção
  return <>{children}</>;
};

export default ProtectedRoute;
