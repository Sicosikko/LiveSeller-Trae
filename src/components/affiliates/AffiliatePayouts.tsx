
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { WalletIcon, CreditCard, BadgeDollarSign } from "lucide-react";
import { useAffiliate } from "@/hooks/use-affiliate";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const AffiliatePayouts: React.FC = () => {
  const { paymentMethods, payouts, pendingBalance, isLoadingPayments, addPaymentMethod } = useAffiliate();
  
  if (isLoadingPayments) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }
  
  const formatCurrency = (amount: number) => {
    return `R$ ${amount.toFixed(2)}`;
  };
  
  const formatPaymentDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500">Completo</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pendente</Badge>;
      case 'processing':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Processando</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Saldo Disponível</CardTitle>
          <CardDescription>
            Seu saldo atual e próximo pagamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Saldo Pendente</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(pendingBalance)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Disponível para saque em 30 dias após confirmação das vendas
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Próximo Pagamento</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(pendingBalance)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Pagamento automático todo dia 15 (mínimo R$ 50,00)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="payment-methods">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment-methods">Métodos de Pagamento</TabsTrigger>
          <TabsTrigger value="payment-history">Histórico de Pagamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-methods" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métodos de Pagamento</CardTitle>
              <CardDescription>
                Escolha como deseja receber seus pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-3">
                        {method.type === 'pix' && (
                          <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 p-2 rounded-full">
                            <BadgeDollarSign className="h-5 w-5" />
                          </div>
                        )}
                        {method.type === 'bank' && (
                          <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-full">
                            <CreditCard className="h-5 w-5" />
                          </div>
                        )}
                        {method.type === 'wallet' && (
                          <div className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 p-2 rounded-full">
                            <WalletIcon className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-500">Padrão</Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <h3 className="text-lg font-medium">Nenhum método de pagamento</h3>
                      <p className="text-muted-foreground mt-2">
                        Adicione um método de pagamento para receber seus ganhos.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addPaymentMethod} className="w-full">
                Adicionar Método de Pagamento
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              {payouts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left border-b">
                      <tr>
                        <th className="pb-3">Data</th>
                        <th className="pb-3">Método</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {payouts.map((payout, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="py-3">{formatPaymentDate(payout.date)}</td>
                          <td className="py-3">{payout.method}</td>
                          <td className="py-3">{getStatusBadge(payout.status)}</td>
                          <td className="py-3 text-right">{formatCurrency(payout.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Card className="border-2 border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-medium">Nenhum pagamento ainda</h3>
                    <p className="text-muted-foreground mt-2">
                      Seus pagamentos aparecerão aqui quando forem processados.
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffiliatePayouts;
