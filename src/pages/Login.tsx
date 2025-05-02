
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Login from "./auth/Login"; // Importar o novo componente de Login

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Se o usuário já estiver autenticado, redireciona para o dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Se o usuário não estiver autenticado, mostra o formulário de login
  return <Login />;
};

export default LoginPage;
