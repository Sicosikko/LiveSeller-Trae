
import React, { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { isDeveloperAccount } from "@/utils/developerAccess";
import LoadingPage from "@/components/feedback/LoadingPage";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, checkAuthStatus } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const verifyAuth = async () => {
      if (!user && !loading) {
        await checkAuthStatus();
      }
    };
    
    verifyAuth();
  }, [user, loading, checkAuthStatus]);
  
  useEffect(() => {
    // Log para debug quando o componente é montado
    console.log("ProtectedRoute montado com:", { 
      user, 
      loading, 
      requiredRole,
      path: location.pathname,
      isAdmin: user?.role === "admin",
      isDeveloper: user?.email ? isDeveloperAccount(user.email) : false
    });
  }, [user, loading, requiredRole, location]);

  // Verificação de desenvolvedor
  const isAuthorized = requiredRole 
    ? (user?.role === requiredRole || (user?.email && isDeveloperAccount(user.email)))
    : !!user;

  if (loading) {
    return <LoadingPage title="Verificando acesso..." message="Por favor, aguarde enquanto verificamos suas credenciais." />;
  }

  if (!user) {
    toast.error("Você precisa estar logado para acessar esta página");
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRole && !isAuthorized) {
    toast.error(`Você não tem permissão para acessar esta área. Acesso restrito para ${requiredRole}`);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
