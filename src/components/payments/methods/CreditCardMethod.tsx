
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface PaymentMethodProps {
  enabled: boolean;
  configured: boolean;
  onToggle: () => void;
}

const CreditCardMethod: React.FC<PaymentMethodProps> = ({ enabled, configured, onToggle }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Cartões de Crédito
            </CardTitle>
            <CardDescription>Pagamentos com cartão direto</CardDescription>
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
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <span className="text-xs">Visa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <span className="text-xs">Mastercard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <span className="text-xs">Amex</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <span className="text-xs">Elo</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!enabled} size="sm" className="w-full">
          Configurar Integração
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditCardMethod;
