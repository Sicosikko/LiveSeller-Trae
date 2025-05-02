
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

interface PaymentMethodProps {
  enabled: boolean;
  configured: boolean;
  onToggle: () => void;
}

const WalletsMethod: React.FC<PaymentMethodProps> = ({ enabled, configured, onToggle }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Carteiras Digitais
            </CardTitle>
            <CardDescription>Apple Pay, Google Pay e Samsung Pay</CardDescription>
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
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center justify-center py-2 bg-muted rounded-md">
              <span className="text-xs font-medium">Apple Pay</span>
            </div>
            <div className="flex items-center justify-center py-2 bg-muted rounded-md">
              <span className="text-xs font-medium">Google Pay</span>
            </div>
            <div className="flex items-center justify-center py-2 bg-muted rounded-md">
              <span className="text-xs font-medium">Samsung Pay</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!enabled} size="sm" className="w-full">
          Configurar Carteiras
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WalletsMethod;
