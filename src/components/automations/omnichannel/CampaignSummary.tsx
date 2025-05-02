
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Calendar } from "lucide-react";

interface CampaignSummaryProps {
  enabledChannels: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({ enabledChannels }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Campanha</CardTitle>
        <CardDescription>
          Detalhes da configuração atual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Canais Selecionados</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {enabledChannels.whatsapp && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                <MessageSquare className="h-3 w-3 mr-1" />
                WhatsApp
              </Badge>
            )}
            {enabledChannels.email && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Badge>
            )}
            {enabledChannels.sms && (
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                <Phone className="h-3 w-3 mr-1" />
                SMS
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium">Público Estimado</h4>
          <p className="text-2xl font-bold mt-1">2,450</p>
          <p className="text-xs text-muted-foreground">contatos</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium">Agendamento</h4>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">Não agendado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignSummary;
