
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AutomationSettingsProps {
  onSaveSettings: () => void;
}

const AutomationSettings: React.FC<AutomationSettingsProps> = ({ onSaveSettings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Configurações Gerais de Automação</CardTitle>
        <CardDescription className="text-xs">
          Defina configurações globais para todos os fluxos de automação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-automation">Habilitar automações</Label>
            <Switch id="enable-automation" defaultChecked />
          </div>
          <p className="text-xs text-muted-foreground">
            Ative ou desative todas as automações de uma só vez
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">
              Horário de Funcionamento
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="start-time" className="text-xs">Horário de início</Label>
                    <Input id="start-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="end-time" className="text-xs">Horário de término</Label>
                    <Input id="end-time" type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Dias de funcionamento</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day, index) => (
                      <Badge 
                        key={day} 
                        variant={index > 0 && index < 6 ? "default" : "outline"} 
                        className="cursor-pointer"
                      >
                        {day.substring(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">
              Permissões de Acesso
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-xs">Quem pode criar automações?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["admin", "editor", "atendente", "vendedor"].map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Switch id={`create-${role}`} defaultChecked={role === "admin" || role === "editor"} />
                        <Label htmlFor={`create-${role}`} className="capitalize">{role}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Quem pode editar automações?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["admin", "editor", "atendente", "vendedor"].map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Switch id={`edit-${role}`} defaultChecked={role === "admin" || role === "editor"} />
                        <Label htmlFor={`edit-${role}`} className="capitalize">{role}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">
              Idiomas Suportados
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-translate">Tradução automática</Label>
                  <Switch id="auto-translate" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Idiomas ativos</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Português", "Inglês", "Espanhol", "Francês", "Alemão"].map((lang) => (
                      <Badge 
                        key={lang} 
                        variant={lang === "Português" ? "default" : "outline"} 
                        className="cursor-pointer"
                      >
                        {lang}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="cursor-pointer">
                      <Plus className="h-3 w-3 mr-1" />
                      Adicionar
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-lang" className="text-xs">Idioma padrão</Label>
                  <Select defaultValue="pt">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o idioma padrão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                      <SelectItem value="es">Espanhol</SelectItem>
                      <SelectItem value="fr">Francês</SelectItem>
                      <SelectItem value="de">Alemão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button 
          onClick={onSaveSettings} 
          className="ml-auto bg-primary hover:bg-primary/90"
        >
          Salvar Configurações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutomationSettings;
