import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TimePickerDemo } from "./TimePicker";
import TeamMemberSelect from "@/components/calendar/TeamMemberSelect";
import NotificationSettings from "@/components/calendar/NotificationSettings";

// Schema de validação
const scheduleSchema = z.object({
  title: z.string().min(3, { message: "O título é obrigatório" }),
  description: z.string().optional(),
  date: z.date({ required_error: "Selecione uma data" }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato inválido (HH:MM)" }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato inválido (HH:MM)" }),
  eventType: z.string(),
  attendees: z.string(),
  teamMembers: z.array(z.string()),
  sendNotifications: z.boolean().default(true),
  addToGoogleCalendar: z.boolean().default(true),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

const ScheduleForm: React.FC = () => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "10:00",
      eventType: "meeting",
      attendees: "",
      teamMembers: [],
      sendNotifications: true,
      addToGoogleCalendar: true,
    },
  });
  
  const onSubmit = async (values: ScheduleFormValues) => {
    try {
      console.log("Form values:", values);
      
      // Aqui implementaríamos a chamada para a API
      
      toast("Evento agendado com sucesso: " + `"${values.title}" agendado para ${format(values.date, "dd/MM/yyyy")} às ${values.startTime}`);
      
      form.reset({
        title: "",
        description: "",
        date: undefined,
        startTime: "09:00",
        endTime: "10:00",
        eventType: "meeting",
        attendees: "",
        teamMembers: [],
        sendNotifications: true,
        addToGoogleCalendar: true,
      });
    } catch (error) {
      console.error("Erro ao agendar evento:", error);
      toast("Erro ao agendar evento: Ocorreu um erro ao agendar o evento. Tente novamente.");
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Agendar Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Reunião com cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detalhes sobre o evento..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecionar data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="meeting">Reunião</SelectItem>
                        <SelectItem value="demo">Demonstração</SelectItem>
                        <SelectItem value="call">Ligação</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário de início</FormLabel>
                    <TimePickerDemo value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário de término</FormLabel>
                    <TimePickerDemo value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="attendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participantes externos (emails)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="cliente@exemplo.com, parceiro@exemplo.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="teamMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membros da equipe</FormLabel>
                  <FormControl>
                    <TeamMemberSelect 
                      value={field.value} 
                      onChange={field.onChange} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <NotificationSettings 
              sendNotificationsField={form.register("sendNotifications")} 
              addToGoogleCalendarField={form.register("addToGoogleCalendar")} 
            />
            
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Agendar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;
