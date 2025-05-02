
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Send, Download, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

const ChannelConfiguration: React.FC = () => {
  const whatsAppForm = useForm({
    defaultValues: {
      phoneNumber: "+55 11 98765-4321",
      profileName: "Sua Empresa",
      greeting: "Olá! Como podemos ajudar hoje?",
    },
  });

  const instagramForm = useForm({
    defaultValues: {
      profile: "@suamarca",
      accountType: "Conta Comercial",
    },
  });

  const messengerForm = useForm({
    defaultValues: {
      page: "Sua Empresa",
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurar Canais de Comunicação</CardTitle>
          <CardDescription>
            Conecte seus canais de comunicação para gerenciar todas as conversas em um único lugar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
              <TabsTrigger value="messenger" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Messenger</span>
              </TabsTrigger>
              <TabsTrigger value="telegram" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Telegram</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">SMS</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="whatsapp" className="mt-6 space-y-4">
              <div className="bg-green-50 border border-green-100 p-4 rounded-md">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  Status: Conectado
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Seu WhatsApp Business API está conectado e funcionando corretamente.
                </p>
              </div>
              
              <Form {...whatsAppForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={whatsAppForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            Número utilizado para conexão com o WhatsApp Business API
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={whatsAppForm.control}
                      name="profileName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Perfil</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Nome exibido para seus clientes
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={whatsAppForm.control}
                    name="greeting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem de Saudação</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Mensagem automática enviada ao iniciar uma nova conversa
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button">Desconectar</Button>
                    <Button type="submit">Salvar Alterações</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="instagram" className="mt-6 space-y-4">
              <div className="bg-purple-50 border border-purple-100 p-4 rounded-md">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-purple-600" />
                  Status: Conectado
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Sua conta comercial do Instagram está conectada.
                </p>
              </div>
              
              <Form {...instagramForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={instagramForm.control}
                      name="profile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Perfil do Instagram</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            Perfil conectado ao sistema
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={instagramForm.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Conta</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button">Desconectar</Button>
                    <Button type="submit">Atualizar Conexão</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="messenger" className="mt-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Status: Conectado
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Sua página do Facebook está conectada para receber mensagens via Messenger.
                </p>
              </div>
              
              <Form {...messengerForm}>
                <form className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={messengerForm.control}
                      name="page"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Página do Facebook</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            Página conectada ao sistema
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button">Desconectar</Button>
                    <Button type="submit">Atualizar Conexão</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="telegram" className="mt-6">
              <div className="bg-muted p-4 rounded-md text-center space-y-4">
                <Send className="h-12 w-12 mx-auto text-sky-500 opacity-50" />
                <h3 className="font-medium">Conecte seu bot do Telegram</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Integre o Telegram à sua plataforma para gerenciar mensagens e interagir com clientes através deste canal.
                </p>
                <Button>Conectar Telegram</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sms" className="mt-6">
              <div className="bg-muted p-4 rounded-md text-center space-y-4">
                <Phone className="h-12 w-12 mx-auto text-amber-500 opacity-50" />
                <h3 className="font-medium">Configurar Envio de SMS</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Configure um provedor de SMS para enviar e receber mensagens de texto com seus clientes.
                </p>
                <Button>Configurar SMS</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="mt-6">
              <div className="bg-muted p-4 rounded-md text-center space-y-4">
                <Mail className="h-12 w-12 mx-auto text-rose-500 opacity-50" />
                <h3 className="font-medium">Integrar Email</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Conecte sua conta de e-mail para gerenciar e responder emails diretamente da plataforma.
                </p>
                <Button>Conectar Email</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Importar e Exportar Configurações</CardTitle>
          <CardDescription>
            Faça backup das configurações dos seus canais ou restaure de um backup anterior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Exportar Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Faça backup de todas as suas configurações de canais em um arquivo JSON
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Importar Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Restaure suas configurações de canais a partir de um backup
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Importar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelConfiguration;
