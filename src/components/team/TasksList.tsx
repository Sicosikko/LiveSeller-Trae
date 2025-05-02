
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Task, TeamMember } from "@/types/team";

interface TasksListProps {
  tasks: Task[];
  members: TeamMember[];
  onCreateTask: () => void;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, members, onCreateTask }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas da Equipe</CardTitle>
        <CardDescription>
          Visualize e gerencie todas as tarefas atribuídas aos membros da equipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma tarefa atribuída ainda</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={onCreateTask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar nova tarefa
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {tasks.map((task) => {
                const assignedTo = members.find(member => member.id === task.assignedTo);
                
                return (
                  <div key={task.id} className="py-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`px-2 py-0.5 text-xs rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {task.priority === 'high' 
                            ? 'Alta Prioridade' 
                            : task.priority === 'medium'
                            ? 'Média Prioridade'
                            : 'Baixa Prioridade'}
                        </div>
                        <div className={`px-2 py-0.5 text-xs rounded-full ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : task.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status === 'completed' 
                            ? 'Concluída' 
                            : task.status === 'in-progress'
                            ? 'Em Progresso'
                            : 'Pendente'}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <div>Vencimento: {task.dueDate.toLocaleDateString()}</div>
                      <div className="font-medium">{assignedTo?.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
