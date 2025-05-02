
import React, { ReactNode, useState, memo } from "react";
import MainSidebar from "@/components/MainSidebar";
import Header from "@/components/Header";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ConnectionStatus from "@/components/ConnectionStatus";
import SystemHealth from "@/components/SystemHealth";
import OfflineAlert from "@/components/feedback/OfflineAlert";
import { useApp } from "@/contexts/AppContext";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  hideTitle?: boolean;
}

// Componentes memoizados para evitar re-renderização desnecessária
const TitleSection = memo(({ title, hideTitle }: { title?: string, hideTitle?: boolean }) => {
  if (hideTitle || !title) return null;
  
  return (
    <h1 className="text-xl font-semibold">{title}</h1>
  );
});

const StatusInfo = memo(() => {
  const { appVersion, isMobileApp, isDesktopApp, systemHealth } = useApp();
  
  return (
    <div className="flex items-center gap-2">
      {(isMobileApp || isDesktopApp) && (
        <span className="text-xs text-muted-foreground">
          v{appVersion}
        </span>
      )}
      {systemHealth && <SystemHealth status={systemHealth} />}
      <ThemeSwitcher />
    </div>
  );
});

TitleSection.displayName = "TitleSection";
StatusInfo.displayName = "StatusInfo";

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, hideTitle = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Handler memoizado para toggle do sidebar
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-brand-gray/30">
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="absolute top-0 right-0 p-2 -mr-10">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex h-20 items-center border-b px-4">
          <span className="font-bold text-lg">WhatzApp Flow CRM AI</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-2 px-4">
            <MainSidebar />
          </nav>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <MainSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header title={title}>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </Header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {!hideTitle && (
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <TitleSection title={title} hideTitle={hideTitle} />
                <ConnectionStatus />
              </div>
              <StatusInfo />
            </div>
          )}
          
          <div className="overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Offline alert notification */}
      <OfflineAlert />
    </div>
  );
};

export default memo(MainLayout);
