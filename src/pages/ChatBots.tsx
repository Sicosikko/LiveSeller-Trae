
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, BarChart2, MessageSquare, Settings, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChatBot {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  interactions: number;
  satisfaction: number;
  lastUpdated: string;
}

const chatbots: ChatBot[] = [
  {
    id: "1",
    name: "Atendente Virtual",
    description: "Chatbot para primeiro atendimento e coleta de informações básicas",
    status: "active",
    interactions: 2568,
    satisfaction: 92,
    lastUpdated: "2 dias atrás",
  },
  {
    id: "2",
    name: "Vendas B2B",
    description: "Chatbot especializado em qualificação de leads para vendas corporativas",
    status: "active",
    interactions: 1240,
    satisfaction: 89,
    lastUpdated: "5 dias atrás",
  },
  {
    id: "3",
    name: "FAQ Helper",
    description: "Assistente para responder perguntas frequentes e direcionar para artigos da base de conhecimento",
    status: "active",
    interactions: 3450,
    satisfaction: 94,
    lastUpdated: "1 dia atrás",
  },
  {
    id: "4",
    name: "Promoções",
    description: "Chatbot para divulgação de ofertas e promoções",
    status: "draft",
    interactions: 0,
    satisfaction: 0,
    lastUpdated: "2 semanas atrás",
  },
];

const ChatBots: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const getStatusBadge = (status: ChatBot["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500">Ativo</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Inativo</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-slate-500 border-slate-500">Rascunho</Badge>;
    }
  };

  return (
    <MainLayout title="Chatbots">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Chatbots de IA</h2>
            <p className="text-sm text-muted-foreground">
              Crie e gerencie chatbots inteligentes para automatizar seu atendimento
            </p>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                <Plus className="h-4 w-4 mr-2" /> Novo Chatbot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar novo Chatbot</DialogTitle>
                <DialogDescription>
                  Configure as informações básicas do seu novo chatbot inteligente.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Ex: Assistente de Vendas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" placeholder="Descreva a função deste chatbot" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Objetivo principal</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="support">Suporte ao cliente</option>
                    <option value="sales">Vendas</option>
                    <option value="faq">FAQ e informações</option>
                    <option value="qualification">Qualificação de leads</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
                <Button className="bg-whatsapp hover:bg-whatsapp-dark" onClick={() => setOpenDialog(false)}>Continuar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger value="all" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Todos
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Ativos
              </TabsTrigger>
              <TabsTrigger value="drafts" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Rascunhos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chatbots.map((bot) => (
                <Card key={bot.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center">
                          {bot.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{bot.description}</CardDescription>
                      </div>
                      <div>
                        {getStatusBadge(bot.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {bot.status === "active" ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Satisfação</span>
                            <span className="font-medium">{bot.satisfaction}%</span>
                          </div>
                          <Progress value={bot.satisfaction} className="h-1" />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interações</span>
                          <span className="font-medium">{bot.interactions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Última atualização</span>
                          <span>{bot.lastUpdated}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-muted-foreground">
                        <Bot className="mx-auto h-8 w-8 mb-2 opacity-40" />
                        <p>Este chatbot ainda não foi publicado</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t bg-muted/30">
                    <div className="flex gap-2">
                      {bot.status === "active" && (
                        <>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <BarChart2 className="h-3.5 w-3.5 mr-1" /> Analytics
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" /> Conversas
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {/* Create New Card */}
              <Card className="flex flex-col items-center justify-center border-dashed p-8 h-full">
                <Bot className="h-16 w-16 mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-1">Criar novo Chatbot</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Configure um novo assistente virtual para seu negócio
                </p>
                <Button onClick={() => setOpenDialog(true)} className="bg-whatsapp hover:bg-whatsapp-dark">
                  <Plus className="h-4 w-4 mr-2" /> Novo Chatbot
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="active" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chatbots.filter(bot => bot.status === "active").map((bot) => (
                <Card key={bot.id}>
                  {/* Same card content as above */}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chatbots.filter(bot => bot.status === "draft").map((bot) => (
                <Card key={bot.id}>
                  {/* Same card content as above */}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChatBots;
