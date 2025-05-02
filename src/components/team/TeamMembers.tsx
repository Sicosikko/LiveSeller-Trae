
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TeamMemberCard from "./TeamMemberCard";
import { TeamMember } from "@/types/team";
import { UserRole } from "@/components/team/RoleSelector";

interface TeamMembersProps {
  members: TeamMember[];
  searchQuery: string;
  selectedRole: string;
  setSearchQuery: (query: string) => void;
  setSelectedRole: (role: UserRole | "all") => void;  // Updated type here
  onEditMember: (id: string) => void;
  onDeleteMember: (id: string) => void;
  onAssignTask: (id: string) => void;
  onViewChats: (id: string) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({
  members,
  searchQuery,
  selectedRole,
  setSearchQuery,
  setSelectedRole,
  onEditMember,
  onDeleteMember,
  onAssignTask,
  onViewChats,
}) => {
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <Input
          placeholder="Buscar membros..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button 
            variant={selectedRole === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("all")}
          >
            Todos
          </Button>
          <Button 
            variant={selectedRole === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("admin" as UserRole)}
          >
            Administradores
          </Button>
          <Button 
            variant={selectedRole === "atendente" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("atendente" as UserRole)}
          >
            Atendentes
          </Button>
          <Button 
            variant={selectedRole === "vendedor" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("vendedor" as UserRole)}
          >
            Vendedores
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onEdit={onEditMember}
            onDelete={onDeleteMember}
            onAssignTask={onAssignTask}
            onViewChats={onViewChats}
          />
        ))}
      </div>
    </>
  );
};

export default TeamMembers;
