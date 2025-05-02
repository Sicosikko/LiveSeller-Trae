
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import tab components
import MessageTab from "./tabs/MessageTab";
import ScheduleTab from "./tabs/ScheduleTab";
import TargetTab from "./tabs/TargetTab";

interface CampaignFormProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  enabledChannels: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  toggleChannel: (channel: keyof CampaignFormProps["enabledChannels"]) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  activeTab,
  setActiveTab,
  enabledChannels,
  toggleChannel
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="campaign-name">Nome da Campanha</Label>
        <Input id="campaign-name" placeholder="Digite um nome para a campanha" defaultValue="Promoção do Mês - Julho 2025" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="message">Mensagem</TabsTrigger>
          <TabsTrigger value="schedule">Agendamento</TabsTrigger>
          <TabsTrigger value="target">Segmentação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="message" className="space-y-4 pt-2">
          <MessageTab 
            enabledChannels={enabledChannels} 
            toggleChannel={toggleChannel} 
          />
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4 pt-2">
          <ScheduleTab 
            enabledChannels={enabledChannels} 
          />
        </TabsContent>
        
        <TabsContent value="target" className="space-y-4 pt-2">
          <TargetTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignForm;
