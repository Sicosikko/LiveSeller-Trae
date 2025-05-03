
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { UserPlus, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMemberForm from "@/components/team/TeamMemberForm";
import TaskAssignmentDialog from "@/components/team/TaskAssignmentDialog";
import RolePermissionsDialog from "@/components/team/RolePermissionsDialog";
import { UserRole } from "@/components/team/RoleSelector";
import { toast } from "sonner";
import { mockTeamMembers, mockTasks } from "@/data/mockTeamData";
import { TeamMember, Task, RolePermissionSettings } from "@/types/team";
import TeamMembers from "@/components/team/TeamMembers";
import TasksList from "@/components/team/TasksList";
import PerformanceTab from "@/components/team/PerformanceTab";

const Team: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  
  // Estados para gerenciar os dialogs
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState<UserRole>("admin");
  
  const handleRoleChange = (role: UserRole | "all") => {
    setSelectedRole(role);
  };

  
  const handleAddMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember = {
      ...memberData,
      id: `member-${Date.now()}`
    };
    setMembers([...members, newMember]);
    setMemberFormOpen(false);
    toast(`Membro adicionado: ${newMember.name} foi adicionado à equipe como ${memberData.role}.`);
  };
  
  const handleEditMember = (memberData: Omit<TeamMember, 'id'>) => {
    if (!editingMember) return;
    
    setMembers(members.map(member => 
      member.id === editingMember.id ? { ...memberData, id: member.id } : member
    ));
    setEditingMember(null);
    toast(`Membro atualizado: As informações de ${memberData.name} foram atualizadas.`);
  };
  
  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast("Membro removido: O membro foi removido da equipe.");
  };
  
  // Manipulador para atribuição de tarefas
  const handleAssignTask = (taskData: Omit<Task, 'id' | 'status'>) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'pending' as const
    };
    setTasks([...tasks, newTask]);
    
    const member = members.find(m => m.id === taskData.assignedTo);
    if (member) {
      toast(`Tarefa atribuída: "${taskData.title}" foi atribuída para ${member.name}.`);
    }
  };

  // Manipulador para configuração de permissões
  const handleSavePermissions = (settings: RolePermissionSettings) => {
    // Em uma aplicação real, aqui atualizaríamos as permissões no backend
    console.log("Permissões atualizadas:", settings);
  };
  
  // Manipuladores para ações em membros
  const handleEditMemberButton = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setEditingMember(member);
      setMemberFormOpen(true);
    }
  };
  
  const handleAssignTaskButton = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setSelectedMember(member);
      setTaskDialogOpen(true);
    }
  };
  
  const handleViewChats = (id: string) => {
    // Corrigindo a rota para visualizar conversas do membro
    navigate(`/atendimento/agente/${id}`);
    toast("Redirecionando para conversas do membro");
  };
  
  const handleCreateTask = () => {
    if (members.length > 0) {
      setSelectedMember(members[0]);
      setTaskDialogOpen(true);
    } else {
      toast("Nenhum membro disponível: Adicione membros à equipe antes de atribuir tarefas.");
    }
  };

  // Missing state variables declaration
  

  return (
    <MainLayout title="Gestão de Equipe">
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Gestão de Equipe</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie membros, atribua papéis e acompanhe o desempenho da sua equipe
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => {
                setSelectedRoleForPermissions("admin");
                setPermissionsDialogOpen(true);
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Configurar Permissões
            </Button>
            <Button onClick={() => {
              setEditingMember(null);
              setMemberFormOpen(true);
            }}>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Membros
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Tarefas
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Desempenho
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="members" className="pt-6">
            <TeamMembers 
              members={members}
              searchQuery={searchQuery}
              selectedRole={selectedRole}
              setSearchQuery={setSearchQuery}
              setSelectedRole={handleRoleChange}
              onEditMember={handleEditMemberButton}
              onDeleteMember={handleDeleteMember}
              onAssignTask={handleAssignTaskButton}
              onViewChats={handleViewChats}
            />
          </TabsContent>

          <TabsContent value="tasks" className="pt-6">
            <TasksList 
              tasks={tasks} 
              members={members} 
              onCreateTask={handleCreateTask} 
            />
          </TabsContent>

          <TabsContent value="performance" className="pt-6">
            <PerformanceTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Formulário para adicionar/editar membros */}
      <TeamMemberForm
        open={memberFormOpen}
        onClose={() => {
          setMemberFormOpen(false);
          setEditingMember(null);
        }}
        onSubmit={editingMember ? handleEditMember : handleAddMember}
        initialData={editingMember || {}}
        isEditing={!!editingMember}
      />

      {/* Dialog para atribuição de tarefas */}
      {selectedMember && (
        <TaskAssignmentDialog
          open={taskDialogOpen}
          onClose={() => {
            setTaskDialogOpen(false);
            setSelectedMember(null);
          }}
          onSubmit={handleAssignTask}
          memberName={selectedMember.name}
          memberId={selectedMember.id}
        />
      )}

      {/* Dialog para configuração de permissões */}
      <RolePermissionsDialog
        open={permissionsDialogOpen}
        onClose={() => setPermissionsDialogOpen(false)}
        onSave={handleSavePermissions}
        initialRole={selectedRoleForPermissions}
      />
    </MainLayout>
  );
};

export default Team;
