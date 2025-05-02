
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from "@/components/calendar/CalendarView";
import ScheduleForm from "@/components/calendar/ScheduleForm";
import GoogleCalendarSync from "@/components/calendar/GoogleCalendarSync";
import UpcomingAppointments from "@/components/calendar/UpcomingAppointments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarSettings from "@/components/calendar/CalendarSettings";

const Calendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("calendar");
  
  return (
    <MainLayout title="Calendário">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Sistema de Agendamento</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie seus agendamentos, reuniões e compromissos integrados com Google Calendar
            </p>
          </div>
          <GoogleCalendarSync />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="calendar" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Calendário
              </TabsTrigger>
              <TabsTrigger 
                value="appointments" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Compromissos
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <CalendarView />
              </div>
              <div className="lg:col-span-4">
                <ScheduleForm />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="pt-6">
            <UpcomingAppointments />
          </TabsContent>
          
          <TabsContent value="settings" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Calendário</CardTitle>
                <CardDescription>
                  Personalize seu calendário e configure integrações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <CalendarSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Calendar;
