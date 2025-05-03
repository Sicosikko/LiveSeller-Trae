import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Search, BellRing, Mail, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { CalendarEvent } from "@/types/calendar";
import { toast } from "@/hooks/use-toast";
import { fetchAppointments, sendAppointmentReminder, sendAppointmentDetails } from "@/services/calendarService";
import { fetchTeamMembers } from "@/services/teamService";

const UpcomingAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<CalendarEvent[]>([]);
  const [teamMembers, setTeamMembers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const [appointmentsData, teamData] = await Promise.all([
          fetchAppointments(),
          fetchTeamMembers()
        ]);
        
        setAppointments(appointmentsData);
        
        // Converter array de membros da equipe para objeto indexado por ID
        const teamMembersObj = teamData.reduce((acc, member) => {
          acc[member.id] = member;
          return acc;
        }, {});
        setTeamMembers(teamMembersObj);
        
      } catch (error) {
        toast({
          title: "Erro ao carregar compromissos",
          description: "Não foi possível carregar seus compromissos agendados.",
          variant: "destructive"
        });
        console.error("Erro ao carregar compromissos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);
  
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
  const sendReminder = async (appointmentId: string) => {
    try {
      await sendAppointmentReminder(appointmentId);
      
      const appointment = appointments.find((a) => a.id === appointmentId);
      toast({
        title: "Lembrete enviado",
        description: `Um lembrete foi enviado para os participantes do evento "${appointment?.title}"`
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar lembrete",
        description: "Não foi possível enviar o lembrete. Tente novamente.",
        variant: "destructive"
      });
      console.error("Erro ao enviar lembrete:", error);
    }
  };
  
  // Enviar detalhes do compromisso por email
  const sendDetails = async (appointmentId: string) => {
    try {
      await sendAppointmentDetails(appointmentId);
      
      const appointment = appointments.find((a) => a.id === appointmentId);
      toast({
        title: "Email enviado",
        description: `Os detalhes do evento "${appointment?.title}" foram enviados por email.`
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar os detalhes por email. Tente novamente.",
        variant: "destructive"
      });
      console.error("Erro ao enviar detalhes:", error);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando compromissos...</span>
      </div>
    );
  }

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
                      <p className="text-sm text-muted-foreground">{appointment.description}</p>
                    </div>
                    {getEventBadge(appointment.type)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(appointment.date), "dd/MM/yyyy")}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>
                      {format(new Date(appointment.date), "HH:mm")} - {format(new Date(appointment.endDate), "HH:mm")}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {appointment.teamMemberIds.map((memberId) => {
                        const member = teamMembers[memberId];
                        return (
                          <Avatar key={memberId} className="border-2 border-background h-8 w-8">
                            <AvatarImage src={member?.avatar} />
                            <AvatarFallback className="text-xs">
                              {member?.name?.split(" ").map((n) => n[0]).join("") || "?"}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => sendReminder(appointment.id)}
                      >
                        <BellRing className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Lembrete</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => sendDetails(appointment.id)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Detalhes</span>
                      </Button>
                    </div>
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
