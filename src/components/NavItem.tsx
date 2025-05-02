
import React, { memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { isDeveloperAccount } from "@/utils/developerAccess";
import { toast } from "sonner";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  requiredRole?: string;
  badge?: string | number;
  badgeColor?: string;
}

export const NavItem = memo(({ 
  href, 
  icon, 
  text, 
  active: forcedActive, 
  requiredRole,
  badge,
  badgeColor = "bg-primary"
}: NavItemProps) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Determina se o item está ativo com base na rota atual
  const isActive = forcedActive !== undefined
    ? forcedActive
    : location.pathname === href || location.pathname.startsWith(`${href}/`);
  
  // Verifica se o usuário tem a permissão necessária
  const isAuthorized = requiredRole 
    ? (user?.role === requiredRole || (user?.email && isDeveloperAccount(user.email)))
    : true;
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (requiredRole && !isAuthorized) {
      e.preventDefault();
      toast.error(`Acesso restrito. Você precisa ter permissão de ${requiredRole} para acessar esta área.`);
      return;
    }
  }, [isAuthorized, requiredRole]);

  const className = `flex items-center space-x-3 rounded-lg px-3 py-2 transition-all text-sm md:text-base whitespace-nowrap ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
  } ${!isAuthorized ? "opacity-70" : ""}`;

  return (
    <Link
      to={href}
      className={className}
      onClick={handleClick}
      aria-disabled={!isAuthorized}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium">{text}</span>
      {badge && (
        <span className={`ml-auto text-xs font-medium ${badgeColor} text-white rounded-full px-2 py-0.5`}>
          {badge}
        </span>
      )}
    </Link>
  );
});

NavItem.displayName = "NavItem";
