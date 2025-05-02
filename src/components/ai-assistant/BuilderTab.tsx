
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Brain, Calendar, Code, Languages, MessageSquare, Plus, Tag, ArrowRight } from "lucide-react";

const DragDropIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-grip"
  >
    <circle cx="12" cy="5" r="1" />
    <circle cx="19" cy="5" r="1" />
    <circle cx="5" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
    <circle cx="19" cy="19" r="1" />
    <circle cx="5" cy="19" r="1" />
  </svg>
);

const BuilderTab: React.FC = () => {
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Construtor de Chatbots</CardTitle>
          <CardDescription>
            Crie chatbots e fluxos de conversação com nossa interface intuitiva de arrastar e soltar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <DragDropIcon /> 
                <span className="ml-2">Componentes</span>
              </h3>
              <div className="space-y-2">
                <div className="border rounded p-2 bg-gray-50 cursor-move hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-blue-500" /> 
                    Mensagem de Texto
                  </h4>
                </div>
                <div className="border rounded p-2 bg-gray-50 cursor-move hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-purple-500" /> 
                    Resposta IA
                  </h4>
                </div>
                <div className="border rounded p-2 bg-gray-50 cursor-move hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium flex items-center">
                    <Tag className="h-4 w-4 mr-1 text-green-500" /> 
                    Opções
                  </h4>
                </div>
                <div className="border rounded p-2 bg-gray-50 cursor-move hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-amber-500" /> 
                    Agendamento
                  </h4>
                </div>
                <div className="border rounded p-2 bg-gray-50 cursor-move hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium flex items-center">
                    <ArrowRight className="h-4 w-4 mr-1 text-red-500" /> 
                    Condição
                  </h4>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-medium mb-2 flex items-center">
                  <Languages className="h-4 w-4 mr-2" /> 
                  Idiomas
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="cursor-pointer">PT</Badge>
                  <Badge variant="outline" className="cursor-pointer">EN</Badge>
                  <Badge variant="outline" className="cursor-pointer">ES</Badge>
                  <Badge variant="outline" className="cursor-pointer">FR</Badge>
                  <Badge variant="outline" className="cursor-pointer">DE</Badge>
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Idioma
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2" /> 
                  Configurações de IA
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-enabled" className="text-sm">IA Generativa</Label>
                    <Switch id="ai-enabled" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-model" className="text-sm">Modelo de IA</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger id="ai-model">
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="llama">Llama 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-gray-50 min-h-[400px] relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <DragDropIcon />
                <h3 className="text-lg font-medium text-gray-500 mt-3">Área do Construtor</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">
                  Arraste e solte componentes aqui para criar seu fluxo conversacional
                </p>
                <Button variant="outline">Ver Tutorial</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Code className="h-4 w-4 mr-1" />
              Pré-visualizar
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Salvar Projeto</Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Aprendizado</CardTitle>
          <CardDescription>
            Métricas de machine learning e otimização contínua do seu assistente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Taxa de Precisão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.4%</div>
                <Progress value={87.4} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +2.6% nos últimos 30 dias
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Taxa de Resolução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64.2%</div>
                <Progress value={64.2} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +5.8% nos últimos 30 dias
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Score de Satisfação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6/5</div>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-2 bg-primary rounded"></div>
                  ))}
                  <div className="w-full h-2 bg-primary/60 rounded"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Baseado em 1.248 avaliações
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BuilderTab;
