
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarEvent } from "@/types/calendar";

const mockEvents: CalendarEvent[] = [
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
];

const CalendarView: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Função para renderizar os eventos do dia
  const renderEventMarkers = (day: Date) => {
    const eventsOnDay = events.filter(
      (event) => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
    
    if (eventsOnDay.length === 0) return null;
    
    return (
      <div className="flex gap-1 flex-wrap mt-1">
        {eventsOnDay.length > 2 ? (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
            {eventsOnDay.length} eventos
          </Badge>
        ) : (
          eventsOnDay.map((event) => (
            <Badge
              key={event.id}
              variant="outline"
              className={cn(
                "text-xs",
                event.type === "meeting" 
                  ? "bg-blue-500/10 text-blue-500 border-blue-500/30" 
                  : event.type === "demo"
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                  : "bg-green-500/10 text-green-500 border-green-500/30"
              )}
            >
              {format(event.date, "HH:mm")}
            </Badge>
          ))
        )}
      </div>
    );
  };
  
  // Função para exibir detalhes do evento
  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;
    
    const eventsOnDay = events.filter(
      (event) => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
    
    if (eventsOnDay.length > 0) {
      setSelectedEvent(eventsOnDay[0]);
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              handleDayClick(newDate);
            }}
            locale={ptBR}
            showOutsideDays
            className="rounded-md border p-3 pointer-events-auto"
            components={{
              DayContent: (props) => {
                // Get the actual date from the props
                const currentDate = props.date;
                return (
                  <div className="flex flex-col items-center">
                    <div>{format(currentDate, "d")}</div>
                    {renderEventMarkers(currentDate)}
                  </div>
                );
              },
            }}
          />
          
          {selectedEvent && (
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-medium">Eventos em {format(selectedEvent.date, "dd 'de' MMMM", { locale: ptBR })}</h3>
              <div className="space-y-2">
                {events
                  .filter((event) => format(event.date, "yyyy-MM-dd") === format(selectedEvent.date, "yyyy-MM-dd"))
                  .map((event) => (
                    <div 
                      key={event.id} 
                      className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{event.title}</div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            event.type === "meeting" 
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/30" 
                              : event.type === "demo"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                              : "bg-green-500/10 text-green-500 border-green-500/30"
                          )}
                        >
                          {event.type === "meeting" ? "Reunião" : event.type === "demo" ? "Demonstração" : "Evento"}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {format(event.date, "HH:mm")} - {format(event.endDate, "HH:mm")}
                      </div>
                      <div className="text-sm mt-2">{event.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
