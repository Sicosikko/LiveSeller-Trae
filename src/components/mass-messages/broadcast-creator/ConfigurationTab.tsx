
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Send } from "lucide-react";

interface ConfigurationTabProps {
  broadcastName: string;
  setBroadcastName: (value: string) => void;
  scheduledDate: string;
  setScheduledDate: (value: string) => void;
  scheduledTime: string;
  setScheduledTime: (value: string) => void;
}

const ConfigurationTab: React.FC<ConfigurationTabProps> = ({
  broadcastName,
  setBroadcastName,
  scheduledDate,
  setScheduledDate,
  scheduledTime,
  setScheduledTime
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Disparo</CardTitle>
        <CardDescription>Configure as informações básicas do seu disparo em massa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Disparo</Label>
          <Input
            id="name"
            placeholder="Ex: Campanha Promocional de Julho"
            value={broadcastName}
            onChange={(e) => setBroadcastName(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Um nome exclusivo para identificar esta campanha
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data de Início</Label>
            <div className="flex">
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Horário de Início</Label>
            <Input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <Label>Opções de Execução</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" /> Agendar
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Send className="h-4 w-4" /> Iniciar Imediatamente
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Você poderá iniciar, pausar ou cancelar o disparo a qualquer momento
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationTab;
