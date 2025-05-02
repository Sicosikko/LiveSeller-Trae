
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CampaignHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle>Campanha Omnichannel</CardTitle>
      <CardDescription>
        Configure uma campanha integrada em múltiplos canais de comunicação
      </CardDescription>
    </CardHeader>
  );
};

export default CampaignHeader;
