
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RoleSelector, { UserRole, roleDetails } from "./RoleSelector";
import { MessageSquare, Bot, Users, Settings, Shield, DollarSign, BarChart, AlertTriangle } from "lucide-react";
import { RolePermissionSettings } from "@/types/team"; 
import { toast } from "sonner";

interface RolePermissionsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: RolePermissionSettings) => void;
  initialRole: UserRole;
}

const defaultPermissions = {
  admin: {
    dashboard: { view: true, edit: true, export: true },
    messages: { view: true, reply: true, transfer: true, close: true },
    chatbots: { view: true, create: true, edit: true, delete: true },
    team: { view: true, add: true, edit: true, remove: true },
    payments: { view: true, process: true, refund: true, settings: true },
    settings: { view: true, edit: true, security: true, integrations: true }
  },
  editor: {
    dashboard: { view: true, edit: false, export: true },
    messages: { view: true, reply: true, transfer: true, close: true },
    chatbots: { view: true, create: true, edit: true, delete: false },
    team: { view: true, add: false, edit: false, remove: false },
    payments: { view: true, process: false, refund: false, settings: false },
    settings: { view: true, edit: true, security: false, integrations: false }
  },
  atendente: {
    dashboard: { view: true, edit: false, export: false },
    messages: { view: true, reply: true, transfer: true, close: true },
    chatbots: { view: true, create: false, edit: false, delete: false },
    team: { view: true, add: false, edit: false, remove: false },
    payments: { view: false, process: false, refund: false, settings: false },
    settings: { view: false, edit: false, security: false, integrations: false }
  },
  vendedor: {
    dashboard: { view: true, edit: false, export: false },
    messages: { view: true, reply: true, transfer: false, close: true },
    chatbots: { view: true, create: false, edit: false, delete: false },
    team: { view: true, add: false, edit: false, remove: false },
    payments: { view: false, process: true, refund: false, settings: false },
    settings: { view: false, edit: false, security: false, integrations: false }
  }
};

const moduleLabels = {
  dashboard: { label: "Dashboard", icon: <BarChart className="h-5 w-5" /> },
  messages: { label: "Mensagens", icon: <MessageSquare className="h-5 w-5" /> },
  chatbots: { label: "Chatbots", icon: <Bot className="h-5 w-5" /> },
  team: { label: "Equipe", icon: <Users className="h-5 w-5" /> },
  payments: { label: "Pagamentos", icon: <DollarSign className="h-5 w-5" /> },
  settings: { label: "Configurações", icon: <Settings className="h-5 w-5" /> }
};

const actionLabels = {
  view: "Visualizar",
  edit: "Editar",
  export: "Exportar",
  reply: "Responder",
  transfer: "Transferir",
  close: "Encerrar",
  create: "Criar",
  delete: "Excluir",
  add: "Adicionar",
  remove: "Remover",
  process: "Processar",
  refund: "Reembolsar",
  settings: "Configurar",
  security: "Segurança",
  integrations: "Integrações"
};

// Cache de permissões modificadas para manter entre trocas de role
const permissionsCache: Record<UserRole, any> = {
  admin: {...defaultPermissions.admin},
  editor: {...defaultPermissions.editor},
  atendente: {...defaultPermissions.atendente},
  vendedor: {...defaultPermissions.vendedor}
};

const RolePermissionsDialog: React.FC<RolePermissionsDialogProps> = ({
  open,
  onClose,
  onSave,
  initialRole
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [permissions, setPermissions] = useState<RolePermissionSettings["permissions"]>(
    permissionsCache[initialRole] || defaultPermissions[initialRole]
  );
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [hasChanges, setHasChanges] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Atualizar permissões quando o papel selecionado for alterado
  useEffect(() => {
    setPermissions(permissionsCache[selectedRole] || defaultPermissions[selectedRole]);
    setHasChanges(false);
  }, [selectedRole]);

  const handleRoleChange = (role: UserRole) => {
    if (hasChanges) {
      // Perguntar se deseja salvar as alterações antes de mudar
      const confirmed = window.confirm("Existem alterações não salvas. Deseja salvar antes de mudar de papel?");
      if (confirmed) {
        // Salvar alterações atuais para o cache
        permissionsCache[selectedRole] = {...permissions};
        toast.success(`Alterações em ${roleDetails[selectedRole].label} salvas temporariamente`);
      }
    }
    
    setSelectedRole(role);
  };

  const handlePermissionChange = (module: string, action: string, value: boolean) => {
    setPermissions(prev => {
      // Cria uma cópia profunda para evitar mutação de estado
      const updated = JSON.parse(JSON.stringify(prev));
      updated[module][action] = value;
      
      // Para verificar dependências:
      // Se desativar "view", desativa todas as outras ações do módulo
      if (action === 'view' && !value) {
        Object.keys(updated[module]).forEach(key => {
          if (key !== 'view') updated[module][key] = false;
        });
      }
      
      // Se ativar qualquer ação além de "view", ativa também "view"
      if (action !== 'view' && value) {
        updated[module]['view'] = true;
      }
      
      return updated;
    });
    
    setHasChanges(true);
  };

  const handleSave = () => {
    // Salva as permissões modificadas no cache
    permissionsCache[selectedRole] = {...permissions};
    
    // Create an array of enabled permissions for backward compatibility
    const enabledPermissions: string[] = [];
    
    // Iterate through permissions and collect all enabled ones
    Object.entries(permissions).forEach(([module, actions]) => {
      Object.entries(actions).forEach(([action, isEnabled]) => {
        if (isEnabled) {
          enabledPermissions.push(`${module}.${action}`);
        }
      });
    });
    
    onSave({
      role: selectedRole,
      permissions,
      enabledPermissions
    });
    
    toast.success(`Permissões do papel ${roleDetails[selectedRole].label} foram atualizadas com sucesso.`);
    setHasChanges(false);
  };
  
  const handleResetToDefault = () => {
    setShowResetConfirm(true);
  };
  
  const confirmReset = () => {
    setPermissions(defaultPermissions[selectedRole]);
    permissionsCache[selectedRole] = {...defaultPermissions[selectedRole]};
    setShowResetConfirm(false);
    setHasChanges(true);
    toast.info(`Permissões de ${roleDetails[selectedRole].label} redefinidas para os valores padrão`);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configurar Permissões de Acesso
          </DialogTitle>
          <DialogDescription>
            Defina quais recursos cada papel pode acessar no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RoleSelector
                value={selectedRole}
                onChange={handleRoleChange}
              />
              <div className="mt-4 p-3 rounded-md bg-muted">
                <div className="flex items-center gap-2">
                  {roleDetails[selectedRole].icon}
                  <span className="font-medium">{roleDetails[selectedRole].label}:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {roleDetails[selectedRole].description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nível de acesso</Label>
              <div className="space-y-1">
                {selectedRole === "admin" && (
                  <div className="p-3 border rounded-md bg-red-50 border-red-200">
                    <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Acesso irrestrito
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      Administradores têm acesso total ao sistema. Estas permissões não podem ser limitadas.
                    </p>
                  </div>
                )}
                {selectedRole !== "admin" && (
                  <div className="p-3 border rounded-md">
                    <p className="text-sm font-medium">Permissões personalizáveis</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configure permissões específicas para este papel.
                    </p>
                  </div>
                )}
                
                {hasChanges && (
                  <div className="p-2 mt-2">
                    <Alert variant="default" className="bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      <AlertDescription className="text-xs text-amber-700">
                        Há alterações não salvas neste papel.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                {selectedRole !== "admin" && (
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetToDefault}
                      className="text-xs"
                    >
                      Resetar para padrão
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showResetConfirm && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertDescription className="flex flex-col space-y-2">
                <p>Tem certeza que deseja redefinir todas as permissões de <strong>{roleDetails[selectedRole].label}</strong> para os valores padrão?</p>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={confirmReset}>
                    Sim, redefinir
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              {Object.entries(moduleLabels).map(([module, { label }]) => (
                <TabsTrigger key={module} value={module}>{label}</TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(moduleLabels).map(([module, { label, icon }]) => (
              <TabsContent key={module} value={module} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  {icon}
                  <h3 className="font-medium">Permissões para {label}</h3>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(permissions[module as keyof typeof permissions] || {}).map(([action, isAllowed]) => (
                    <div key={`${module}-${action}`} className="flex items-start space-x-2">
                      <Checkbox
                        id={`${module}-${action}`}
                        checked={isAllowed}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(module, action, checked === true)
                        }
                        disabled={selectedRole === "admin"}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={`${module}-${action}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {actionLabels[action as keyof typeof actionLabels]}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {getPermissionDescription(module, action)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!hasChanges && selectedRole !== "admin"}>
            Salvar configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper para gerar descrições das permissões
function getPermissionDescription(module: string, action: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    dashboard: {
      view: "Visualizar estatísticas e relatórios",
      edit: "Personalizar widgets e filtros",
      export: "Exportar relatórios em CSV/PDF"
    },
    messages: {
      view: "Ver todas as conversas",
      reply: "Responder mensagens de clientes",
      transfer: "Transferir conversas para outros atendentes",
      close: "Encerrar conversas"
    },
    chatbots: {
      view: "Visualizar chatbots existentes",
      create: "Criar novos chatbots",
      edit: "Modificar fluxos e respostas",
      delete: "Remover chatbots"
    },
    team: {
      view: "Ver membros da equipe",
      add: "Adicionar novos membros",
      edit: "Editar informações de membros",
      remove: "Remover membros da equipe"
    },
    payments: {
      view: "Visualizar transações",
      process: "Processar pagamentos",
      refund: "Reembolsar clientes",
      settings: "Configurar métodos de pagamento"
    },
    settings: {
      view: "Ver configurações do sistema",
      edit: "Alterar configurações gerais",
      security: "Modificar configurações de segurança",
      integrations: "Gerenciar integrações externas"
    }
  };

  return descriptions[module]?.[action] || `Permissão para ${action} em ${module}`;
}

export default RolePermissionsDialog;
