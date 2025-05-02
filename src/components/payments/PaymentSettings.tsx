
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

const PaymentSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Segurança</CardTitle>
          <CardDescription>Configure as opções de segurança para pagamentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="font-medium">Criptografia de Ponta a Ponta</p>
                <p className="text-sm text-muted-foreground">Dados de pagamento criptografados em todas as etapas</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Verificação em Duas Etapas</p>
              <p className="text-sm text-muted-foreground">Exigir confirmação adicional para pagamentos acima de R$ 1.000</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Anti-Fraude Avançado</p>
              <p className="text-sm text-muted-foreground">Sistema anti-fraude com análise comportamental</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Armazenamento Seguro PCI DSS</p>
              <p className="text-sm text-muted-foreground">Cumpre os padrões de segurança PCI DSS para cartões</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Conformidade e Regulamentação</CardTitle>
          <CardDescription>Configurações para atender às exigências legais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">LGPD (Lei Geral de Proteção de Dados)</p>
                <Badge className="bg-emerald-500">Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Cumpre exigências da Lei Brasileira de Proteção de Dados</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">GDPR (Regulamento Geral de Proteção de Dados)</p>
                <Badge className="bg-emerald-500">Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Cumpre regulamentos europeus de proteção de dados</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">WhatsApp Business API</p>
                <Badge className="bg-emerald-500">Verificado</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Conformidade com os termos de uso do WhatsApp Business API</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Aviso de Privacidade para Pagamentos</h3>
            <div className="space-y-2">
              <Label htmlFor="privacy-notice">Texto do Aviso de Privacidade</Label>
              <textarea
                id="privacy-notice"
                className="w-full h-32 p-2 border rounded-md"
                defaultValue="Seus dados de pagamento são processados e armazenados de acordo com as políticas de privacidade e regulamentações aplicáveis. Utilizamos criptografia de ponta a ponta para proteger suas informações financeiras. Seus dados nunca são compartilhados com terceiros sem seu consentimento explícito."
              ></textarea>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Suporte a Grande Volume</CardTitle>
          <CardDescription>Configurações para alto processamento de mensagens e pagamentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Balanceamento de Carga</p>
              <p className="text-sm text-muted-foreground">Distribui o processamento em múltiplos servidores</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cache de Transações</p>
              <p className="text-sm text-muted-foreground">Armazena temporariamente transações frequentes</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Retry Automático</p>
              <p className="text-sm text-muted-foreground">Novas tentativas automáticas para transações com erro</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-limit">Limite de Transações por Minuto</Label>
            <Input id="transaction-limit" type="number" defaultValue="1000" />
            <p className="text-sm text-muted-foreground">Recomendado: 1000 para plano atual</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSettings;
