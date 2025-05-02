
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LinkForm: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Link de Pagamento</CardTitle>
        <CardDescription>Gere links de pagamento para compartilhar via WhatsApp ou outros canais</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList>
            <TabsTrigger value="simple">Link Simples</TabsTrigger>
            <TabsTrigger value="advanced">Opções Avançadas</TabsTrigger>
          </TabsList>
          <TabsContent value="simple" className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link-name">Nome do Link</Label>
                <Input id="link-name" placeholder="Ex: Pagamento de Produto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-value">Valor (R$)</Label>
                <Input id="link-value" type="number" step="0.01" placeholder="0,00" />
              </div>
            </div>
            <Button className="w-full">Gerar Link de Pagamento</Button>
          </TabsContent>
          <TabsContent value="advanced" className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adv-link-name">Nome do Link</Label>
                <Input id="adv-link-name" placeholder="Ex: Pagamento de Produto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adv-link-value">Valor (R$)</Label>
                <Input id="adv-link-value" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adv-link-expires">Expira em</Label>
                <Input id="adv-link-expires" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adv-link-uses">Máximo de Usos</Label>
                <Input id="adv-link-uses" type="number" placeholder="Ilimitado se em branco" />
              </div>
            </div>
            <Button className="w-full">Gerar Link Avançado</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LinkForm;
