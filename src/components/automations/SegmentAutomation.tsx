import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tag, UserCheck, Clock, ShoppingCart, Calendar, 
  ThumbsUp, MessageSquare, Store, Plus, SaveIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SegmentAutomation: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast("Segmentação Salva", {
      description: "Seus critérios de segmentação foram salvos com sucesso."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segmentação de Contatos</CardTitle>
              <CardDescription>
                Configure segmentos baseados no comportamento e histórico dos contatos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="segment-name">Nome do Segmento</Label>
                  <Input 
                    id="segment-name" 
                    placeholder="Digite um nome para o segmento" 
                    defaultValue="Clientes Ativos com Potencial de Upsell"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="segment-description">Descrição</Label>
                  <Textarea 
                    id="segment-description" 
                    placeholder="Descreva o objetivo deste segmento..."
                    defaultValue="Clientes que fizeram compras nos últimos 3 meses e demonstraram interesse em produtos premium."
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-4">Critérios de Segmentação</h4>
                
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Condições de Comportamento</h5>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="border border-primary">
                      <CardContent className="pt-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <ShoppingCart className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <Label>Compras</Label>
                            </div>
                          </div>
                          
                          <Select defaultValue="completed">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">realizou compra</SelectItem>
                              <SelectItem value="not_completed">não realizou compra</SelectItem>
                              <SelectItem value="abandoned">abandonou carrinho</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="last_90_days">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="last_30_days">nos últimos 30 dias</SelectItem>
                              <SelectItem value="last_90_days">nos últimos 90 dias</SelectItem>
                              <SelectItem value="last_180_days">nos últimos 180 dias</SelectItem>
                              <SelectItem value="last_year">no último ano</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-muted p-2 rounded-full">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Label>Interação</Label>
                            </div>
                          </div>
                          
                          <Select defaultValue="engaged">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="engaged">interagiu com</SelectItem>
                              <SelectItem value="not_engaged">não interagiu com</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="whatsapp">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="any">qualquer canal</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4 border rounded-lg p-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Atributos do Perfil</h5>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-muted p-2 rounded-full">
                              <Store className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Label>Valor da Conta</Label>
                            </div>
                          </div>
                          
                          <Select defaultValue="greater_than">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater_than">maior que</SelectItem>
                              <SelectItem value="less_than">menor que</SelectItem>
                              <SelectItem value="equal">igual a</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="flex-1">
                            <Input placeholder="Valor" defaultValue="1000" />
                          </div>
                          
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-muted p-2 rounded-full">
                              <UserCheck className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Label>Status do Cliente</Label>
                            </div>
                          </div>
                          
                          <Select defaultValue="is">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="is">é</SelectItem>
                              <SelectItem value="is_not">não é</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="active">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lead">Lead</SelectItem>
                              <SelectItem value="prospect">Prospect</SelectItem>
                              <SelectItem value="active">Cliente Ativo</SelectItem>
                              <SelectItem value="inactive">Cliente Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ações Automáticas</CardTitle>
              <CardDescription>
                Configure ações a serem executadas quando um contato entrar neste segmento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border rounded-md p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enviar mensagem de WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Modelo: Oferta de Upgrade</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
              
              <div className="flex justify-between items-center border rounded-md p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-full">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Aplicar tag</p>
                    <p className="text-sm text-muted-foreground">Tag: Potencial Upsell</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
              
              <Button className="mt-2" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Adicionar Ação
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Segmento</CardTitle>
              <CardDescription>
                Detalhes e estatísticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium">Contatos Qualificados</h4>
                <p className="text-2xl font-bold mt-1">842</p>
                <p className="text-xs text-muted-foreground">de 2,450 contatos totais</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Tags Associadas</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Cliente Ativo</Badge>
                  <Badge variant="secondary">Alto Valor</Badge>
                  <Badge variant="secondary">Potencial Upsell</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Estatísticas do Segmento</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor médio</p>
                    <p className="font-medium">R$ 1.850</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engajamento</p>
                    <p className="font-medium">78%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversão</p>
                    <p className="font-medium">32%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compras/ano</p>
                    <p className="font-medium">3.4</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Sugeridas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Upsell Premium</p>
                </div>
                <Badge>92% match</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Retenção Trimestral</p>
                </div>
                <Badge variant="outline">78% match</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Renovação Anual</p>
                </div>
                <Badge variant="outline">65% match</Badge>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleSave}
            >
              <SaveIcon className="mr-2 h-4 w-4" /> Salvar
            </Button>
            <Button variant="outline" className="flex-1">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentAutomation;
