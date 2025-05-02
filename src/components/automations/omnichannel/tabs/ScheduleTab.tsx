
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, Trash2 } from "lucide-react";

interface ScheduleTabProps {
  enabledChannels: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ enabledChannels }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Agendamento de Envio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Data de Início</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">Hora de Início</Label>
                <Input id="start-time" type="time" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox id="repeat" />
                <Label htmlFor="repeat">Repetir campanha</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="repeat-interval">Intervalo</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="repeat-interval">
                      <SelectValue placeholder="Selecione um intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Não repetir</SelectItem>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Data de Término</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="stagger" />
                <Label htmlFor="stagger">Envio gradual</Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Distribuir o envio ao longo do tempo para evitar sobrecarga
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Sequenciamento de Canais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Defina a ordem em que os diferentes canais serão utilizados na campanha
            </p>
            
            {enabledChannels.whatsapp && (
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <span>WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="0">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Dia 0</SelectItem>
                      <SelectItem value="1">Dia 1</SelectItem>
                      <SelectItem value="2">Dia 2</SelectItem>
                      <SelectItem value="3">Dia 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {enabledChannels.email && (
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="1">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Dia 0</SelectItem>
                      <SelectItem value="1">Dia 1</SelectItem>
                      <SelectItem value="2">Dia 2</SelectItem>
                      <SelectItem value="3">Dia 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {enabledChannels.sms && (
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="2">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Dia 0</SelectItem>
                      <SelectItem value="1">Dia 1</SelectItem>
                      <SelectItem value="2">Dia 2</SelectItem>
                      <SelectItem value="3">Dia 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ScheduleTab;
