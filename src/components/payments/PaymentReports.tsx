
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

const PaymentReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Pagamentos</CardTitle>
          <CardDescription>Gere relatórios sobre suas transações e pagamentos recebidos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Relatório</Label>
              <Select defaultValue="transactions">
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transações</SelectItem>
                  <SelectItem value="links">Links de Pagamento</SelectItem>
                  <SelectItem value="methods">Métodos de Pagamento</SelectItem>
                  <SelectItem value="clients">Pagamentos por Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Data Inicial</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Data Final</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar para Excel
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar para PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de Pagamentos</CardTitle>
          <CardDescription>Visão geral das transações recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Recebido (30 dias)</p>
              <p className="text-2xl font-bold">R$ 2.578,90</p>
              <p className="text-xs text-emerald-500">+12% em relação ao mês anterior</p>
            </div>
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Transações (30 dias)</p>
              <p className="text-2xl font-bold">43</p>
              <p className="text-xs text-emerald-500">+8% em relação ao mês anterior</p>
            </div>
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Valor Médio</p>
              <p className="text-2xl font-bold">R$ 59,97</p>
              <p className="text-xs text-amber-500">-2% em relação ao mês anterior</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Distribuição por Método de Pagamento</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">PIX</span>
                  <span className="text-sm text-muted-foreground">R$ 1.245,50</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">48% do total</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Cartão de Crédito</span>
                  <span className="text-sm text-muted-foreground">R$ 945,40</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '36%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">36% do total</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mercado Pago</span>
                  <span className="text-sm text-muted-foreground">R$ 388,00</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '16%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">16% do total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentReports;
