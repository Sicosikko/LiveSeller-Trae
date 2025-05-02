
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useTeamPerformance } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TeamPerformance: React.FC = () => {
  const { data, isLoading, isError } = useTeamPerformance();
  const navigate = useNavigate();

  const navigateToTeam = () => {
    navigate('/team');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Desempenho da Equipe</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="px-6">
                <div className="flex items-center gap-4 mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-1.5 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Desempenho da Equipe</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">Dados de desempenho indisponíveis</p>
          <Button onClick={navigateToTeam}>Ver página da equipe</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho da Equipe</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-6">
          {data.map((member) => (
            <div key={member.id} className="px-6">
              <div className="flex items-center gap-4 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{member.chats} atendimentos</p>
                      <p className="text-sm text-muted-foreground">hoje</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Satisfação</span>
                  <span className="font-medium">{member.satisfaction}%</span>
                </div>
                <Progress value={member.satisfaction} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 pt-4">
          <Button variant="outline" className="w-full" onClick={navigateToTeam}>
            Ver equipe completa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformance;
