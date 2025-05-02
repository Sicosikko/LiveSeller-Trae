
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChannelTemplateProps {
  channel: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
}

const ChannelTemplate: React.FC<ChannelTemplateProps> = ({ channel, icon, enabled, onToggle }) => {
  return (
    <Card className={`border ${enabled ? "border-primary" : "border-muted"}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base">{channel}</CardTitle>
          </div>
          <div className="flex items-center">
            <Checkbox 
              id={`enable-${channel.toLowerCase()}`} 
              checked={enabled} 
              onCheckedChange={onToggle}
            />
          </div>
        </div>
      </CardHeader>
      {enabled && (
        <CardContent>
          <div className="space-y-4">
            {channel === "WhatsApp" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="template">Modelo de Mensagem</Label>
                  <Select defaultValue="promo">
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Selecione um modelo">Promoção do Mês</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">Promoção do Mês</SelectItem>
                      <SelectItem value="follow">Acompanhamento</SelectItem>
                      <SelectItem value="welcome">Boas-vindas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {channel === "Email" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Digite o assunto do email" />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor={`message-${channel.toLowerCase()}`}>Mensagem</Label>
              <Textarea 
                id={`message-${channel.toLowerCase()}`} 
                placeholder={`Digite sua mensagem de ${channel}...`} 
                className="h-24"
                defaultValue={
                  channel === "WhatsApp" 
                    ? "Olá {{nome}}, temos uma oferta especial para você! Aproveite 15% de desconto em todos os produtos com o código PROMO15."
                    : channel === "Email" 
                    ? "Olá {{nome}},\n\nTemos novidades especiais para você!\n\nAproveite nossas promoções exclusivas para clientes como você.\n\nAtenciosamente,\nEquipe de Marketing"
                    : channel === "SMS" 
                    ? "Oferta especial! 15% OFF em todos os produtos com o código PROMO15. Válido até {{data_validade}}."
                    : ""
                }
              />
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => {}}>
                  {'{{nome}}'} <Copy className="ml-1 h-3 w-3" />
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => {}}>
                  {'{{telefone}}'} <Copy className="ml-1 h-3 w-3" />
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => {}}>
                  {'{{data_validade}}'} <Copy className="ml-1 h-3 w-3" />
                </Badge>
              </div>
            </div>
            
            {channel === "Email" && (
              <div className="space-y-2">
                <Label htmlFor="attachment">Anexos</Label>
                <div className="flex gap-2">
                  <Input id="attachment" type="file" />
                </div>
              </div>
            )}
            
            {channel === "WhatsApp" && (
              <div className="space-y-2">
                <Label htmlFor="buttons">Botões de Ação</Label>
                <div className="flex gap-2">
                  <Input id="cta-button" placeholder="Texto do botão" className="flex-1" defaultValue="Ver Ofertas" />
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ChannelTemplate;
