
import React, { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const RouteManager = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Registra navegação e atualiza título da página
  useEffect(() => {
    console.log("Navegação para:", location.pathname);
    
    // Para analytics (comentado por enquanto)
    // window.gtag?.('config', 'UA-XXXXX-Y', { page_path: location.pathname });
    
    // Atualiza o título da página baseado na rota atual
    const pageName = location.pathname.split("/").pop() || "home";
    const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    document.title = `WhatzApp Flow CRM AI | ${formattedPageName}`;
    
    // Verificar acesso a rotas protegidas
    if (!loading && !user) {
      const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/'];
      if (!publicRoutes.includes(location.pathname)) {
        console.log('Usuário não autenticado tentando acessar rota protegida');
        // O redirecionamento acontecerá no ProtectedRoute
      }
    }
  }, [location.pathname, user, loading]);
  
  return null; // Componente não renderiza nada na UI
});

RouteManager.displayName = "RouteManager";

export default RouteManager;
