
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Link, MessageSquare } from "lucide-react";
import { PaymentLink } from "./types/PaymentLinkTypes";

interface LinkCardProps {
  link: PaymentLink;
  onCopy: (text: string, id: string) => void;
  copied: string | null;
  onSendToWhatsApp: (link: PaymentLink) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onCopy, copied, onSendToWhatsApp }) => {
  const getStatusBadge = (status: PaymentLink["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500">Ativo</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Expirado</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Concluído</Badge>;
    }
  };

  const calculateProgress = (uses: number, maxUses: number | null) => {
    if (!maxUses) return 100;
    const percentage = (uses / maxUses) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <Card key={link.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base">{link.name}</CardTitle>
            <CardDescription>R$ {link.value.toFixed(2)}</CardDescription>
          </div>
          <div>{getStatusBadge(link.status)}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="relative">
            <Input value={link.url} readOnly className="pr-20" />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full"
              onClick={() => onCopy(link.url, link.id)}
            >
              {copied === link.id ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Criado em: {new Date(link.created).toLocaleDateString()}</span>
            {link.expires && (
              <span>Expira em: {new Date(link.expires).toLocaleDateString()}</span>
            )}
          </div>

          {link.maxUses && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Usos</span>
                <span>
                  {link.uses} de {link.maxUses}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-whatsapp h-2 rounded-full"
                  style={{ width: `${calculateProgress(link.uses, link.maxUses)}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 flex-1"
              onClick={() => onCopy(link.url, `btn-${link.id}`)}
            >
              {copied === `btn-${link.id}` ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Link className="h-4 w-4" />
              )}
              <span>Copiar Link</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 flex-1 text-whatsapp hover:text-whatsapp hover:bg-whatsapp/10"
              onClick={() => onSendToWhatsApp(link)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Enviar via WhatsApp</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
