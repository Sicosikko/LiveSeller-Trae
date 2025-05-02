
import React, { memo } from "react";
import {
  Home,
  LayoutDashboard,
  Settings,
  CreditCard,
  Download,
  Smartphone,
  Calendar,
  MessageSquare,
  Zap,
  Users,
  Shield,
  BarChart3,
  ShoppingBag,
  Share2,
  Headphones
} from "lucide-react";
import { NavItem } from "./NavItem";
import { useLocation } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

// Estrutura para os itens de navegação
interface NavItemConfig {
  path: string;
  icon: React.ReactNode;
  label: string;
  requiredRole?: string;
}

// Define uma constante para os itens de navegação fora do componente
const NAV_ITEMS: NavItemConfig[] = [
  { path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
  { path: "/admin", icon: <Shield className="h-5 w-5" />, label: "Admin", requiredRole: "admin" },
  { path: "/atendimento", icon: <Headphones className="h-5 w-5" />, label: "Atendimento" },
  { path: "/mass-messages", icon: <MessageSquare className="h-5 w-5" />, label: "Mensagens em Massa" },
  { path: "/channels", icon: <Share2 className="h-5 w-5" />, label: "Canais" },
  { path: "/platform-integrations", icon: <Share2 className="h-5 w-5" />, label: "Integrações" },
  { path: "/payments", icon: <CreditCard className="h-5 w-5" />, label: "Pagamentos" },
  { path: "/calendar", icon: <Calendar className="h-5 w-5" />, label: "Calendário" },
  { path: "/automations", icon: <Zap className="h-5 w-5" />, label: "Automações" },
  { path: "/team", icon: <Users className="h-5 w-5" />, label: "Equipe" },
  { path: "/analytics", icon: <BarChart3 className="h-5 w-5" />, label: "Analytics" },
  { path: "/whatsapp-commerce", icon: <ShoppingBag className="h-5 w-5" />, label: "WhatsApp Commerce" },
  { path: "/downloads", icon: <Download className="h-5 w-5" />, label: "Downloads" },
  { path: "/platform-status", icon: <Smartphone className="h-5 w-5" />, label: "Status da Plataforma" },
  { path: "/settings", icon: <Settings className="h-5 w-5" />, label: "Configurações" }
];

// Componente memoizado para evitar re-renderizações desnecessárias
const MainSidebar = memo(() => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed inset-y-0 left-0 z-50 hidden h-full w-64 flex-col border-r bg-secondary md:flex">
      <div className="flex h-20 items-center border-b px-4">
        <span className="font-bold text-lg">WhatzApp Flow CRM AI</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-2 px-4">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.path}
              href={item.path}
              icon={item.icon}
              text={t(item.label) || item.label}
              active={pathname === item.path}
              requiredRole={item.requiredRole}
            />
          ))}
        </nav>
      </div>
    </div>
  );
});

MainSidebar.displayName = "MainSidebar";

export default MainSidebar;
