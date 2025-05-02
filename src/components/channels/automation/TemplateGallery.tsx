
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Tag, Settings, Calendar, Users } from "lucide-react";

const templates = [
  {
    id: "welcome",
    name: "Boas-vindas",
    description: "Cumprimente seus clientes automaticamente",
    icon: <MessageSquare className="h-5 w-5 text-primary" />
  },
  {
    id: "off-hours",
    name: "Fora do Expediente",
    description: "Informe quando você não está disponível",
    icon: <Clock className="h-5 w-5 text-primary" />
  },
  {
    id: "sales",
    name: "Vendas",
    description: "Qualifique leads e ofereça produtos",
    icon: <Tag className="h-5 w-5 text-primary" />
  },
  {
    id: "support",
    name: "Suporte",
    description: "Resolva problemas comuns automaticamente",
    icon: <Settings className="h-5 w-5 text-primary" />
  },
  {
    id: "scheduling",
    name: "Agendamento",
    description: "Permita agendamentos via chat",
    icon: <Calendar className="h-5 w-5 text-primary" />
  },
  {
    id: "lead-capture",
    name: "Captura de Lead",
    description: "Colete dados do contato para follow-up",
    icon: <Users className="h-5 w-5 text-primary" />
  }
];

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Template: {template.name}</CardTitle>
            <CardDescription className="text-xs">
              Modelo pré-configurado para {template.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                {template.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onSelectTemplate(template.id)}
            >
              Usar Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplateGallery;
