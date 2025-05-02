
import React, { useState } from "react";
import LinkCard from "./LinkCard";
import { PaymentLink } from "./types/PaymentLinkTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Cloud, CloudOff, RefreshCw } from "lucide-react";

interface LinksListProps {
  links: PaymentLink[];
  isOnline?: boolean;
  onSyncRequest?: () => void;
  pendingChanges?: number;
}

const LinksList: React.FC<LinksListProps> = ({ 
  links, 
  isOnline = true, 
  onSyncRequest,
  pendingChanges = 0
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendLinkToWhatsApp = (link: PaymentLink) => {
    const message = `Olá, segue o link de pagamento "${link.name}" no valor de R$${link.value.toFixed(2)}: ${link.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Seus Links de Pagamento</h3>
        
        {/* Indicador de status de sincronização */}
        {pendingChanges > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={onSyncRequest}
            disabled={!isOnline}
          >
            {isOnline ? <RefreshCw className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
            <span>{pendingChanges} {pendingChanges === 1 ? 'alteração' : 'alterações'} pendente{pendingChanges === 1 ? '' : 's'}</span>
          </Button>
        )}
        
        {pendingChanges === 0 && (
          <Badge variant={isOnline ? "default" : "outline"} className="flex items-center gap-1">
            {isOnline ? <Cloud className="h-3 w-3" /> : <CloudOff className="h-3 w-3" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </Badge>
        )}
      </div>
      
      {links.map((link) => (
        <LinkCard 
          key={link.id}
          link={link}
          onCopy={handleCopy}
          copied={copied}
          onSendToWhatsApp={sendLinkToWhatsApp}
        />
      ))}
    </div>
  );
};

export default LinksList;
