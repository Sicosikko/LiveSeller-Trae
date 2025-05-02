
import React from "react";
import LinkForm from "./LinkForm";
import LinksList from "./LinksList";
import { usePaymentLinks } from "./hooks/usePaymentLinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentLinks: React.FC = () => {
  const { paymentLinks, isLoading, error, isOnline, pendingChanges, syncPendingLinks } = usePaymentLinks();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Links de Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LinkForm />
        {error ? (
          <div className="p-4 text-center text-red-500">
            Erro ao carregar links: {error}
          </div>
        ) : isLoading ? (
          <div className="p-4 text-center text-muted-foreground">
            Carregando links de pagamento...
          </div>
        ) : (
          <LinksList 
            links={paymentLinks} 
            isOnline={isOnline} 
            onSyncRequest={syncPendingLinks}
            pendingChanges={pendingChanges}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentLinks;
