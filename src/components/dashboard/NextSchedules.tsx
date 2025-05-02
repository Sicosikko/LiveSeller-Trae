
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSchedules } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NextSchedules: React.FC = () => {
  const { data, isLoading, isError } = useSchedules();
  const navigate = useNavigate();

  const navigateToCalendar = (scheduleId?: string) => {
    navigate(scheduleId ? `/calendar?event=${scheduleId}` : '/calendar');
  };

  const getTypeLabel = (type: "message" | "call" | "meeting") => {
    switch (type) {
      case "message":
        return <Badge variant="outline" className="bg-whatsapp/10 text-whatsapp border-whatsapp/30">Mensagem</Badge>;
      case "call":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">Chamada</Badge>;
      case "meeting":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">Reunião</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Próximos Agendamentos</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center p-4 gap-3">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
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
          <CardTitle>Próximos Agendamentos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">Nenhum agendamento próximo</p>
          <Button onClick={() => navigateToCalendar()}>Ver calendário</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-0">
          {data.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center p-4 gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigateToCalendar(schedule.id)}
            >
              <div className="flex-shrink-0 rounded-md w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium">{schedule.title}</p>
                  {getTypeLabel(schedule.type)}
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">{schedule.customer}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{schedule.date}, {schedule.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pt-2 pb-4">
          <Button variant="outline" className="w-full" onClick={() => navigateToCalendar()}>
            Ver todos os agendamentos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSchedules;
