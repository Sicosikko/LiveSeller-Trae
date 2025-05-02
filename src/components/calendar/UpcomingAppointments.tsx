import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Search, BellRing, Mail } from "lucide-react";
import { format } from "date-fns";
import { CalendarEvent } from "@/types/calendar";
import { toast } from "@/hooks/use-toast";

// Dados de exemplo
const mockAppointments: CalendarEvent[] = [
  {
    id: "1",
    title: "Reunião com Cliente",
    description: "Apresentação de proposta comercial",
    date: new Date(2025, 4, 5, 10, 0),
    endDate: new Date(2025, 4, 5, 11, 0),
    type: "meeting",
    attendees: ["cliente@exemplo.com"],
    teamMemberIds: ["1"],
  },
  {
    id: "2",
    title: "Demonstração do Produto",
    description: "Demo do novo módulo de automação",
    date: new Date(2025, 4, 7, 14, 30),
    endDate: new Date(2025, 4, 7, 15, 30),
    type: "demo",
    attendees: ["prospect@exemplo.com"],
    teamMemberIds: ["2"],
  },
  {
    id: "3",
    title: "Ligação de Follow-up",
    description: "Verificar interesse após envio de proposta",
    date: new Date(2025, 4, 10, 9, 0),
    endDate: new Date(2025, 4, 10, 9, 30),
    type: "call",
    attendees: ["lead@exemplo.com"],
    teamMemberIds: ["3"],
  },
];

// Dados dos membros da equipe para exibição
const teamMembers = {
  "1": { name: "Amanda Costa", avatar: "" },
  "2": { name: "Rafael Santos", avatar: "" },
  "3": { name: "Juliana Almeida", avatar: "" },
};

const UpcomingAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<CalendarEvent[]>(mockAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtrar os compromissos com base na pesquisa
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.attendees.some((attendee) =>
        attendee.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  
  // Enviar notificação de lembrete
  const sendReminder = (appointmentId: string) => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    if (!appointment) return;
    
    toast(`Lembrete enviado: Um lembrete foi enviado para os participantes do evento "${appointment.title}"`);
  };
  
  // Obter o tipo de badge com base no tipo de evento
  const getEventBadge = (type: string) => {
    switch (type) {
      case "meeting":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">Reunião</Badge>;
      case "demo":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">Demonstração</Badge>;
      case "call":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Ligação</Badge>;
      default:
        return <Badge variant="outline">Evento</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar compromissos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">Nenhum compromisso encontrado</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              {searchQuery
                ? "Não há compromissos correspondentes à sua pesquisa."
                : "Você não tem compromissos agendados no momento."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{appointment.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{appointment.description}</p>
                    </div>
                    {getEventBadge(appointment.type)}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(appointment.date, "dd/MM/yyyy")}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(appointment.date, "HH:mm")} - {format(appointment.endDate, "HH:mm")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Participantes:</div>
                    <div className="flex flex-wrap gap-2">
                      {appointment.attendees.map((attendee, index) => (
                        <Badge key={index} variant="secondary">
                          {attendee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Membros da equipe:</div>
                    <div className="flex gap-2">
                      {appointment.teamMemberIds.map((memberId) => {
                        const member = teamMembers[memberId as keyof typeof teamMembers];
                        return (
                          <Avatar key={memberId} className="h-7 w-7">
                            <AvatarImage src={member?.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {member?.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReminder(appointment.id)}
                      className="gap-1"
                    >
                      <BellRing className="h-4 w-4" />
                      <span>Enviar lembrete</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast(`Email enviado: Os detalhes do evento "${appointment.title}" foram enviados por email.`);
                      }}
                      className="gap-1"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Enviar detalhes</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
