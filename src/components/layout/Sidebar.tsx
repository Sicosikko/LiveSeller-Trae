import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  MessageSquare, 
  Send, 
  Radio, 
  Link2, 
  CreditCard, 
  Calendar as CalendarIcon, 
  Zap, 
  Users, 
  BarChart2, 
  ShoppingBag, 
  Download, 
  Activity, 
  Settings 
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted ${
          isActive ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 border-r bg-background p-4 flex flex-col">
      <div className="mb-6 flex items-center gap-2 px-2">
        <h1 className="text-xl font-bold">LiveSeller</h1>
      </div>
      
      <nav className="space-y-1 flex-1 overflow-auto">
        <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
        <NavItem to="/admin" icon={<Shield className="h-5 w-5" />} label="Admin" />
        <NavItem to="/atendimento" icon={<MessageSquare className="h-5 w-5" />} label="Atendimento" />
        <NavItem to="/mensagens-em-massa" icon={<Send className="h-5 w-5" />} label="Mensagens em Massa" />
        <NavItem to="/canais" icon={<Radio className="h-5 w-5" />} label="Canais" />
        <NavItem to="/integracoes" icon={<Link2 className="h-5 w-5" />} label="Integrações" />
        <NavItem to="/pagamentos" icon={<CreditCard className="h-5 w-5" />} label="Pagamentos" />
        <NavItem to="/calendario" icon={<CalendarIcon className="h-5 w-5" />} label="Calendário" />
        <NavItem to="/automacoes" icon={<Zap className="h-5 w-5" />} label="Automações" />
        <NavItem to="/equipe" icon={<Users className="h-5 w-5" />} label="Equipe" />
        <NavItem to="/analytics" icon={<BarChart2 className="h-5 w-5" />} label="Analytics" />
        <NavItem to="/whatsapp-commerce" icon={<ShoppingBag className="h-5 w-5" />} label="WhatsApp Commerce" />
        <NavItem to="/downloads" icon={<Download className="h-5 w-5" />} label="Downloads" />
        <NavItem to="/status-plataforma" icon={<Activity className="h-5 w-5" />} label="Status da Plataforma" />
        <NavItem to="/configuracoes" icon={<Settings className="h-5 w-5" />} label="Configurações" />
      </nav>
      
      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium">LS</span>
          </div>
          <div>
            <p className="text-sm font-medium">LiveSeller</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;