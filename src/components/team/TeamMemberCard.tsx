
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, MessageSquare, CalendarClock } from "lucide-react";
import { roleDetails } from "./RoleSelector";
import { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignTask: (id: string) => void;
  onViewChats: (id: string) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onEdit,
  onDelete,
  onAssignTask,
  onViewChats,
}) => {
  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-gray-400",
    busy: "bg-amber-500",
  };

  const roleInfo = roleDetails[member.role];

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 relative">
        <div className={`absolute right-2 top-2 h-3 w-3 rounded-full ${statusColors[member.status]}`} />
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={member.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium text-base">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.email}</p>
            <Badge variant="outline" className="flex items-center gap-1">
              {roleInfo.icon}
              <span>{roleInfo.label}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Satisfação do cliente</span>
            <span className="font-medium">{member.performance.satisfaction}%</span>
          </div>
          <Progress value={member.performance.satisfaction} className="h-1.5" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Atendimentos</div>
            <div className="font-medium">{member.performance.chats}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Tempo médio</div>
            <div className="font-medium">{member.performance.responseTime}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Tarefas concluídas</div>
            <div className="font-medium">{member.performance.tasksCompleted}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Tarefas pendentes</div>
            <div className="font-medium">{member.performance.pendingTasks}</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t bg-muted/30">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onViewChats(member.id)}>
            <MessageSquare className="h-3.5 w-3.5 mr-1" /> Conversas
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onAssignTask(member.id)}>
            <CalendarClock className="h-3.5 w-3.5 mr-1" /> Atribuir
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(member.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(member.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
