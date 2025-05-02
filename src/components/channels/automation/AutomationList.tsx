
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Mail, 
  ArrowRight,
  Settings, 
  Layers
} from "lucide-react";
import { AutomationFlow } from "../types/automationTypes";

interface AutomationListProps {
  flows: AutomationFlow[];
  onToggleFlow: (flowId: string) => void;
  onEditFlow: (flow: AutomationFlow) => void;
}

const AutomationList: React.FC<AutomationListProps> = ({ 
  flows, 
  onToggleFlow,
  onEditFlow
}) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "condition": return <ArrowRight className="h-4 w-4 text-amber-600" />;
      case "delay": return <Settings className="h-4 w-4 text-purple-600" />;
      case "action": return <Settings className="h-4 w-4 text-slate-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {flows.map(flow => (
        <Card key={flow.id} className={`border ${flow.isActive ? 'border-primary/30 shadow-sm' : 'border-border'}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base">{flow.name}</CardTitle>
                <CardDescription className="text-xs">{flow.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-1">
                  {flow.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs bg-muted/40">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`flow-${flow.id}`} className="text-xs text-muted-foreground">
                    {flow.isActive ? "Ativo" : "Inativo"}
                  </Label>
                  <Switch 
                    id={`flow-${flow.id}`} 
                    checked={flow.isActive} 
                    onCheckedChange={() => onToggleFlow(flow.id)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-xs text-muted-foreground">Canais:</Label>
              <div className="flex gap-1">
                {flow.channels.includes('whatsapp') && (
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-3 w-3 text-green-600" />
                  </div>
                )}
                {flow.channels.includes('instagram') && (
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Instagram className="h-3 w-3 text-purple-600" />
                  </div>
                )}
                {flow.channels.includes('facebook') && (
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Facebook className="h-3 w-3 text-blue-600" />
                  </div>
                )}
                {flow.channels.includes('email') && (
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-rose-600" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-xs text-muted-foreground">Acesso:</Label>
              <div className="flex gap-1">
                {flow.roleAccess.map(role => (
                  <Badge key={role} variant="outline" className="text-xs bg-blue-50">{role}</Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <Label className="text-xs text-muted-foreground">Passos:</Label>
              <div className="space-y-2">
                {flow.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/30">
                    {getStepIcon(step.type)}
                    <span className="text-xs font-medium">{step.title}</span>
                    {index < flow.steps.length - 1 && (
                      <ArrowRight className="h-3 w-3 mx-2 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEditFlow(flow)}>
              <Settings className="h-3.5 w-3.5 mr-1" />
              Editar
            </Button>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              <Layers className="h-3.5 w-3.5 mr-1" />
              Visualizar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AutomationList;
