
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, UserPlus, Filter, Users, Calendar } from "lucide-react";

const Atendimento: React.FC = () => {
  return (
    <MainLayout title="Atendimento">
      <div className="flex flex-col h-[calc(100vh-160px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg">Central de Atendimento</CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-1" /> Filtrar
                  </Button>
                  <Button size="sm" variant="default">
                    <UserPlus className="h-4 w-4 mr-1" /> Novo Atendimento
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos" className="w-full">
                <div className="border-b mb-4">
                  <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger value="todos" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                      Todos
                    </TabsTrigger>
                    <TabsTrigger value="whatsapp" className="data-[state=active]:border-green-500 data-[state=active]:text-green-500 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                      WhatsApp
                    </TabsTrigger>
                    <TabsTrigger value="instagram" className="data-[state=active]:border-purple-500 data-[state=active]:text-purple-500 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                      Instagram
                    </TabsTrigger>
                    <TabsTrigger value="facebook" className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                      Facebook
                    </TabsTrigger>
                    <TabsTrigger value="email" className="data-[state=active]:border-red-500 data-[state=active]:text-red-500 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                      Email
                    </TabsTrigger>
                  </TabsList>
                </div>
              
                <TabsContent value="todos" className="space-y-4 h-[calc(100vh-320px)] overflow-y-auto">
                  <div className="flex mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar conversas..." className="pl-9" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {/* Exemplos de conversas */}
                    {Array.from({length: 10}).map((_, i) => (
                      <Card key={i} className="p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 3 === 0 ? 'bg-green-100' : i % 3 === 1 ? 'bg-purple-100' : 'bg-blue-100'}`}>
                              <span className={`font-medium ${i % 3 === 0 ? 'text-green-700' : i % 3 === 1 ? 'text-purple-700' : 'text-blue-700'}`}>
                                {String.fromCharCode(65 + i)}
                              </span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${i % 3 === 0 ? 'bg-green-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}>
                              {i % 3 === 0 ? (
                                <MessageSquare className="h-2 w-2 text-white" />
                              ) : i % 3 === 1 ? (
                                <Users className="h-2 w-2 text-white" />
                              ) : (
                                <Calendar className="h-2 w-2 text-white" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{`Cliente ${i + 1}`}</h3>
                              <span className="text-xs text-muted-foreground">há 10 min</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {i % 2 === 0 
                                ? "Olá, gostaria de mais informações sobre o produto..." 
                                : "Estou com um problema no meu pedido, pode me ajudar?"}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${i % 4 === 0 ? 'bg-yellow-100 text-yellow-700' : i % 4 === 1 ? 'bg-green-100 text-green-700' : i % 4 === 2 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                {i % 4 === 0 ? 'Em espera' : i % 4 === 1 ? 'Em atendimento' : i % 4 === 2 ? 'Concluído' : 'Prioridade'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {i % 3 === 0 ? 'WhatsApp' : i % 3 === 1 ? 'Instagram' : 'Facebook'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="whatsapp" className="space-y-4">
                  <div className="h-56 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Selecione o canal WhatsApp para ver conversas</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="instagram" className="space-y-4">
                  <div className="h-56 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Selecione o canal Instagram para ver conversas</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="facebook" className="space-y-4">
                  <div className="h-56 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Selecione o canal Facebook para ver conversas</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <div className="h-56 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Selecione o canal Email para ver conversas</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Atendentes Online</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-${i % 2 === 0 ? 'green' : 'amber'}-100 flex items-center justify-center`}>
                        <span className={`text-${i % 2 === 0 ? 'green' : 'amber'}-700 font-medium`}>{String.fromCharCode(65 + i)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Atendente {i + 1}</p>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full bg-${i % 2 === 0 ? 'green' : 'amber'}-500`}></span>
                          <span className="text-xs text-muted-foreground">
                            {i % 2 === 0 ? 'Online' : 'Ausente'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{Math.floor(Math.random() * 10) + 1}</p>
                      <p className="text-xs text-muted-foreground">atendimentos</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Resumo do Dia</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="p-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-xs text-muted-foreground">Atendimentos</p>
                    </div>
                  </Card>
                  <Card className="p-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">5min</p>
                      <p className="text-xs text-muted-foreground">Tempo médio</p>
                    </div>
                  </Card>
                  <Card className="p-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-muted-foreground">Satisfação</p>
                    </div>
                  </Card>
                  <Card className="p-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">Pendentes</p>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Atendimento;
