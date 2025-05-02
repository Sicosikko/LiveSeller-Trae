
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  ArrowDown, 
  Clock, 
  Plus, 
  Trash2, 
  Settings, 
  Layers, 
  Wand, 
  Users,
  Tag,
  Calendar,
  Globe,
} from "lucide-react";
import { AutomationFlow, FlowStep } from "../types/automationTypes";

interface AutomationFlowBuilderProps {
  flow: AutomationFlow | null;
  availableTags: string[];
  availableRoles: string[];
  setFlow: React.Dispatch<React.SetStateAction<AutomationFlow | null>>;
  onCancel: () => void;
  onSaveFlow: () => void;
}

const AutomationFlowBuilder: React.FC<AutomationFlowBuilderProps> = ({
  flow,
  availableTags,
  availableRoles,
  setFlow,
  onCancel,
  onSaveFlow
}) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "condition": return <ArrowDown className="h-4 w-4 text-amber-600" />;
      case "delay": return <Clock className="h-4 w-4 text-purple-600" />;
      case "action": return <Settings className="h-4 w-4 text-slate-600" />;
      default: return <Plus className="h-4 w-4" />;
    }
  };

  if (!flow) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">
              {flow.name || "Novo Fluxo"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Construa seu fluxo de automação personalizado
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCancel}
          >
            Voltar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flow-name">Nome do fluxo</Label>
              <Input 
                id="flow-name" 
                value={flow.name} 
                onChange={(e) => setFlow(prev => prev ? {...prev, name: e.target.value} : prev)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flow-description">Descrição</Label>
              <Textarea 
                id="flow-description" 
                value={flow.description} 
                onChange={(e) => setFlow(prev => prev ? {...prev, description: e.target.value} : prev)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Canais</Label>
              <div className="grid grid-cols-2 gap-2">
                {["whatsapp", "instagram", "facebook", "email"].map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Switch 
                      id={`channel-${channel}`} 
                      checked={flow.channels.includes(channel)} 
                      onCheckedChange={(checked) => {
                        setFlow({
                          ...flow,
                          channels: checked 
                            ? [...flow.channels, channel] 
                            : flow.channels.filter(c => c !== channel)
                        });
                      }}
                    />
                    <Label htmlFor={`channel-${channel}`} className="capitalize">{channel}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={flow.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      setFlow({
                        ...flow,
                        tags: flow.tags.includes(tag)
                          ? flow.tags.filter(t => t !== tag)
                          : [...flow.tags, tag]
                      });
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Acesso</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Switch 
                      id={`role-${role}`} 
                      checked={flow.roleAccess.includes(role)} 
                      onCheckedChange={(checked) => {
                        setFlow({
                          ...flow,
                          roleAccess: checked 
                            ? [...flow.roleAccess, role] 
                            : flow.roleAccess.filter(r => r !== role)
                        });
                      }}
                    />
                    <Label htmlFor={`role-${role}`} className="capitalize">{role}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Construtor de Fluxo</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2 pb-4">
                    {flow.steps && flow.steps.length > 0 ? (
                      flow.steps.map((step, index) => (
                        <FlowStepItem key={step.id} step={step} />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-md">
                        <Layers className="h-10 w-10 text-muted-foreground mb-2 opacity-50" />
                        <p className="text-muted-foreground">
                          Seu fluxo está vazio. Adicione passos usando os botões abaixo.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                    Mensagem
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowDown className="h-3.5 w-3.5 mr-1" />
                    Condição
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    Espera
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wand className="h-3.5 w-3.5 mr-1" />
                    Ação
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Atribuir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    Tagear
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Agendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-1" />
            Testar Fluxo
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={onSaveFlow}>
            Salvar Fluxo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface FlowStepItemProps {
  step: FlowStep;
}

const FlowStepItem: React.FC<FlowStepItemProps> = ({ step }) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "condition": return <ArrowDown className="h-4 w-4 text-amber-600" />;
      case "delay": return <Clock className="h-4 w-4 text-purple-600" />;
      case "action": return <Settings className="h-4 w-4 text-slate-600" />;
      default: return <Plus className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border border-border hover:border-primary/50 transition-colors">
      <CardHeader className="p-3 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getStepIcon(step.type)}
            <span className="text-sm font-medium">{step.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ArrowDown className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
              <span>×</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {step.type === "message" && (
          <Textarea 
            className="min-h-[80px] text-sm"
            value={step.config?.message || ""}
            placeholder="Digite a mensagem..."
          />
        )}
        
        {step.type === "condition" && (
          <Select defaultValue={step.config?.condition || "no-reply"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo de condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-reply">Sem resposta</SelectItem>
              <SelectItem value="contains-keyword">Contém palavra-chave</SelectItem>
              <SelectItem value="outside-hours">Fora do horário</SelectItem>
              <SelectItem value="custom">Condição personalizada</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {step.type === "delay" && (
          <div className="flex items-center gap-2">
            <Input 
              type="number" 
              className="w-20"
              value={step.config?.delay || "30"}
            />
            <Select defaultValue="seconds">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seconds">Segundos</SelectItem>
                <SelectItem value="minutes">Minutos</SelectItem>
                <SelectItem value="hours">Horas</SelectItem>
                <SelectItem value="days">Dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutomationFlowBuilder;
