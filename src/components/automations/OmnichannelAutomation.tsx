
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import CampaignHeader from "./omnichannel/CampaignHeader";
import CampaignForm from "./omnichannel/CampaignForm";
import CampaignSummary from "./omnichannel/CampaignSummary";
import PerformanceEstimate from "./omnichannel/PerformanceEstimate";
import ActionButtons from "./omnichannel/ActionButtons";

const OmnichannelAutomation: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("message");
  const [enabledChannels, setEnabledChannels] = useState({
    whatsapp: true,
    email: true,
    sms: false
  });
  
  const toggleChannel = (channel: keyof typeof enabledChannels) => {
    setEnabledChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };
  
  const handleSave = () => {
    toast("Campanha Omnichannel Criada", {
      description: "A campanha foi configurada com sucesso e está pronta para ser disparada."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CampaignHeader />
            <CardContent>
              <CampaignForm 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                enabledChannels={enabledChannels}
                toggleChannel={toggleChannel}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <CampaignSummary enabledChannels={enabledChannels} />
          
          <PerformanceEstimate />
          
          <ActionButtons onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default OmnichannelAutomation;
