
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOverview from "@/components/admin/AdminOverview";
import EngagementMetrics from "@/components/admin/EngagementMetrics";
import TeamProductivity from "@/components/admin/TeamProductivity";
import CrmSupervision from "@/components/admin/CrmSupervision";
import PrivateMessages from "@/components/admin/PrivateMessages";
import EmployeeManagement from "@/components/admin/EmployeeManagement";
import RolesPermissions from "@/components/admin/RolesPermissions";
import PaymentSettings from "@/components/payments/PaymentSettings";
import IntegrationsPanel from "@/components/admin/IntegrationsPanel";
import { useAuth } from "@/contexts/AuthContext";
import AccessDenied from "@/components/admin/AccessDenied";
import { RolePermissionSettings } from "@/types/team";
import { toast } from "sonner";
import DeveloperBadge from "@/components/admin/DeveloperBadge";
import { isDeveloperAccount } from "@/utils/developerAccess";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    console.log("Current user:", user);
    console.log("Is admin:", user?.role === "admin");
    console.log("Is developer:", user?.email ? isDeveloperAccount(user.email) : false);
  }, [user]);
  
  // Verificação de permissão (inclui verificação para desenvolvedores)
  const isAdmin = user?.role === "admin" || (user?.email && isDeveloperAccount(user.email));

  const handlePermissionsSave = (settings: RolePermissionSettings) => {
    // Implementação futura para salvar permissões no backend
    console.log("Permissões atualizadas:", settings);
    
    toast(`Permissões atualizadas: As permissões para o papel ${settings.role} foram atualizadas com sucesso.`);
  };

  if (!isAdmin) {
    return <AccessDenied message="Você não tem permissão para acessar o painel administrativo." />;
  }

  return (
    <MainLayout title="Painel Administrativo">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <DeveloperBadge />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="productivity">Produtividade</TabsTrigger>
          <TabsTrigger value="crm">Supervisão CRM</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="employees">Funcionários</TabsTrigger>
          <TabsTrigger value="roles">Papéis</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AdminOverview />
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <EngagementMetrics />
        </TabsContent>
        
        <TabsContent value="productivity" className="space-y-4">
          <TeamProductivity />
        </TabsContent>
        
        <TabsContent value="crm" className="space-y-4">
          <CrmSupervision />
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <PrivateMessages />
        </TabsContent>
        
        <TabsContent value="employees" className="space-y-4">
          <EmployeeManagement />
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <RolesPermissions onSave={handlePermissionsSave} />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <PaymentSettings />
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <IntegrationsPanel />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminDashboard;
