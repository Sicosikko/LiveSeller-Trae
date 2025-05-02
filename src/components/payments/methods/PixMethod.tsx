
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentMethodProps {
  enabled: boolean;
  configured: boolean;
  onToggle: () => void;
}

const PixMethod: React.FC<PaymentMethodProps> = ({ enabled, configured, onToggle }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">PIX</CardTitle>
            <CardDescription>Pagamentos instantâneos</CardDescription>
          </div>
          <Switch 
            checked={enabled} 
            onCheckedChange={onToggle}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status</span>
            {configured ? (
              <Badge className="bg-emerald-500">Configurado</Badge>
            ) : (
              <Badge variant="outline" className="text-amber-500 border-amber-500">Não configurado</Badge>
            )}
          </div>
          <div>
            <Label htmlFor="pix-key">Chave PIX</Label>
            <Input 
              id="pix-key" 
              placeholder="CPF/CNPJ/Email/Telefone" 
              defaultValue="exemplo@email.com"
              disabled={!enabled} 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!enabled} size="sm" className="w-full">
          Salvar configurações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PixMethod;
