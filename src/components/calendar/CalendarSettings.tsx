
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const CalendarSettings: React.FC = () => {
  const handleSaveSettings = () => {
    toast("Configurações salvas: As configurações do calendário foram atualizadas com sucesso.");
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-base font-medium">Lembretes e Notificações</h3>
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="remind-team" className="flex flex-col space-y-1">
              <span>Lembretes para equipe</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enviar lembretes para membros da equipe antes dos compromissos
              </span>
            </Label>
            <Switch id="remind-team" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="remind-customers" className="flex flex-col space-y-1">
              <span>Lembretes para clientes</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enviar lembretes para clientes antes dos compromissos
              </span>
            </Label>
            <Switch id="remind-customers" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Notificações por email</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enviar emails com detalhes dos eventos
              </span>
            </Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
              <span>Notificações por SMS</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enviar SMS com lembretes de eventos
              </span>
            </Label>
            <Switch id="sms-notifications" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-base font-medium">Configurações de tempo</h3>
        
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-time">Antecedência de lembretes</Label>
              <Select defaultValue="60">
                <SelectTrigger id="reminder-time">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos antes</SelectItem>
                  <SelectItem value="30">30 minutos antes</SelectItem>
                  <SelectItem value="60">1 hora antes</SelectItem>
                  <SelectItem value="120">2 horas antes</SelectItem>
                  <SelectItem value="1440">1 dia antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="default-duration">Duração padrão de eventos</Label>
              <Select defaultValue="60">
                <SelectTrigger id="default-duration">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="90">1 hora e 30 minutos</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="working-hours-start">Horário de início do expediente</Label>
              <Input type="time" id="working-hours-start" defaultValue="09:00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="working-hours-end">Horário de término do expediente</Label>
              <Input type="time" id="working-hours-end" defaultValue="18:00" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-base font-medium">Integração com Google Calendar</h3>
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="sync-two-way" className="flex flex-col space-y-1">
              <span>Sincronização bidirecional</span>
              <span className="font-normal text-sm text-muted-foreground">
                Manter eventos sincronizados entre este sistema e o Google Calendar
              </span>
            </Label>
            <Switch id="sync-two-way" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-sync" className="flex flex-col space-y-1">
              <span>Sincronização automática</span>
              <span className="font-normal text-sm text-muted-foreground">
                Sincronizar eventos automaticamente a cada mudança
              </span>
            </Label>
            <Switch id="auto-sync" defaultChecked />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSaveSettings}>Salvar configurações</Button>
    </div>
  );
};

export default CalendarSettings;
