
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/auth/authService";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const { hash, searchParams } = new URL(window.location.href);
      
      // Processar o callback de autenticação
      try {
        if (hash || searchParams.has('code')) {
          // Atualizar o estado de autenticação
          await checkAuthStatus();
          
          // Redirecionar para o dashboard após um curto atraso
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // Se não houver parâmetros de autenticação, redirecionar para login
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate, checkAuthStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Processando autenticação</CardTitle>
          <CardDescription className="text-center">
            Por favor, aguarde enquanto finalizamos o processo...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
