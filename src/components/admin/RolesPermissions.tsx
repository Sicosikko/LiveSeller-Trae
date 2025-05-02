import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserRole, roleDetails } from "@/components/team/RoleSelector";
import RolePermissionsDialog from "@/components/team/RolePermissionsDialog";
import { RolePermissionSettings } from "@/types/team";
import { Shield, Lock, MessageSquare, BarChart, Users, Bot, Settings, DollarSign } from "lucide-react";

interface RolesPermissionsProps {
  onSave: (settings: RolePermissionSettings) => void;
}

interface PermissionGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  permissions: {
    id: string;
    name: string;
    description: string;
    roles: UserRole[];
  }[];
}

const permissionGroups: PermissionGroup[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <BarChart className="h-5 w-5" />,
    permissions: [
      { 
        id: "dashboard.view", 
        name: "Visualizar", 
        description: "Ver estatísticas e relatórios", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
      { 
        id: "dashboard.export", 
        name: "Exportar", 
        description: "Exportar relatórios e dados", 
        roles: ["admin", "editor"]
      },
    ]
  },
  {
    id: "messages",
    name: "Mensagens",
    icon: <MessageSquare className="h-5 w-5" />,
    permissions: [
      { 
        id: "messages.view", 
        name: "Visualizar", 
        description: "Ver todas as conversas", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
      { 
        id: "messages.reply", 
        name: "Responder", 
        description: "Responder mensagens", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
      { 
        id: "messages.transfer", 
        name: "Transferir", 
        description: "Transferir conversas", 
        roles: ["admin", "editor", "atendente"]
      },
      { 
        id: "messages.close", 
        name: "Encerrar", 
        description: "Encerrar conversas", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
    ]
  },
  {
    id: "chatbots",
    name: "Chatbots",
    icon: <Bot className="h-5 w-5" />,
    permissions: [
      { 
        id: "chatbots.view", 
        name: "Visualizar", 
        description: "Ver chatbots existentes", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
      { 
        id: "chatbots.create", 
        name: "Criar", 
        description: "Criar novos chatbots", 
        roles: ["admin", "editor"]
      },
      { 
        id: "chatbots.edit", 
        name: "Editar", 
        description: "Modificar chatbots existentes", 
        roles: ["admin", "editor"]
      },
      { 
        id: "chatbots.delete", 
        name: "Excluir", 
        description: "Remover chatbots", 
        roles: ["admin"]
      },
    ]
  },
  {
    id: "team",
    name: "Equipe",
    icon: <Users className="h-5 w-5" />,
    permissions: [
      { 
        id: "team.view", 
        name: "Visualizar", 
        description: "Ver membros da equipe", 
        roles: ["admin", "editor", "atendente", "vendedor"]
      },
      { 
        id: "team.add", 
        name: "Adicionar", 
        description: "Adicionar membros", 
        roles: ["admin"]
      },
      { 
        id: "team.edit", 
        name: "Editar", 
        description: "Editar informações de membros", 
        roles: ["admin"]
      },
      { 
        id: "team.remove", 
        name: "Remover", 
        description: "Remover membros da equipe", 
        roles: ["admin"]
      },
      { 
        id: "team.assign", 
        name: "Atribuir", 
        description: "Atribuir tarefas", 
        roles: ["admin", "editor"]
      },
    ]
  },
  {
    id: "payments",
    name: "Pagamentos",
    icon: <DollarSign className="h-5 w-5" />,
    permissions: [
      { 
        id: "payments.view", 
        name: "Visualizar", 
        description: "Ver transações e histórico", 
        roles: ["admin", "editor"]
      },
      { 
        id: "payments.process", 
        name: "Processar", 
        description: "Processar pagamentos", 
        roles: ["admin", "vendedor"]
      },
      { 
        id: "payments.refund", 
        name: "Reembolsar", 
        description: "Reembolsar transações", 
        roles: ["admin"]
      },
      { 
        id: "payments.settings", 
        name: "Configurar", 
        description: "Configurar métodos de pagamento", 
        roles: ["admin"]
      },
    ]
  },
  {
    id: "settings",
    name: "Configurações",
    icon: <Settings className="h-5 w-5" />,
    permissions: [
      { 
        id: "settings.view", 
        name: "Visualizar", 
        description: "Ver configurações do sistema", 
        roles: ["admin", "editor"]
      },
      { 
        id: "settings.edit", 
        name: "Editar", 
        description: "Alterar configurações", 
        roles: ["admin"]
      },
      { 
        id: "settings.security", 
        name: "Segurança", 
        description: "Configurar segurança e acessos", 
        roles: ["admin"]
      },
      { 
        id: "settings.integrations", 
        name: "Integrações", 
        description: "Configurar integrações externas", 
        roles: ["admin"] 
      },
    ]
  },
];

const RolesPermissions: React.FC<RolesPermissionsProps> = ({ onSave }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  
  const handlePermissionsSave = (settings: RolePermissionSettings) => {
    setSelectedRole(settings.role);
    onSave(settings);
    setPermissionDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Papéis e Permissões</h2>
          <p className="text-muted-foreground">Configure as permissões para cada papel de usuário no sistema.</p>
        </div>
        <Button onClick={() => setPermissionDialogOpen(true)}>
          <Shield className="h-4 w-4 mr-2" />
          Configurar Permissões
        </Button>
      </div>
      
      <Tabs defaultValue="admin" value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          {(Object.keys(roleDetails) as UserRole[]).map((role) => (
            <TabsTrigger key={role} value={role} className="flex items-center gap-2">
              {roleDetails[role].icon}
              <span>{roleDetails[role].label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {(Object.keys(roleDetails) as UserRole[]).map((role) => (
          <TabsContent key={role} value={role}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {roleDetails[role].icon}
                  <CardTitle>Papel: {roleDetails[role].label}</CardTitle>
                </div>
                <CardDescription>
                  {roleDetails[role].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {permissionGroups.map((group) => (
                  <div key={group.id} className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                      {group.icon}
                      <h3 className="text-lg font-medium">{group.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {group.permissions.map((permission) => {
                        const isGranted = permission.roles.includes(role);
                        return (
                          <div key={permission.id} className="flex gap-3 items-start">
                            <div className="mt-1">
                              <Checkbox id={`${role}-${permission.id}`} checked={isGranted} disabled />
                            </div>
                            <div>
                              <Label
                                htmlFor={`${role}-${permission.id}`}
                                className="text-base font-medium"
                              >
                                {permission.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {permission.description}
                              </p>
                              {isGranted ? (
                                <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                                  Permitido
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="mt-1 bg-gray-50 text-gray-700 border-gray-200">
                                  <Lock className="h-3 w-3 mr-1" /> Não permitido
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <RolePermissionsDialog
        open={permissionDialogOpen}
        onClose={() => setPermissionDialogOpen(false)}
        onSave={handlePermissionsSave}
        initialRole={selectedRole}
      />
    </div>
  );
};

export default RolesPermissions;
