
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAffiliate } from "@/hooks/use-affiliate";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const AffiliateReferrals: React.FC = () => {
  const { referrals, isLoadingReferrals } = useAffiliate();
  
  if (isLoadingReferrals) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (referrals.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium">Nenhuma indicação ainda</h3>
          <p className="text-muted-foreground mt-2">
            Quando alguém se inscrever usando seu link, eles aparecerão aqui.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suas Indicações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="pb-3">Usuário</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Plano</th>
                <th className="pb-3 text-right">Comissão</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {referrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-muted/50">
                  <td className="py-3">{referral.email}</td>
                  <td className="py-3">{new Date(referral.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    {referral.status === 'active' && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">Ativo</Badge>
                    )}
                    {referral.status === 'trial' && (
                      <Badge variant="outline" className="border-amber-500 text-amber-500">Em teste</Badge>
                    )}
                    {referral.status === 'pending' && (
                      <Badge variant="outline">Pendente</Badge>
                    )}
                    {referral.status === 'cancelled' && (
                      <Badge variant="outline" className="border-slate-500 text-slate-500">Cancelado</Badge>
                    )}
                  </td>
                  <td className="py-3">{referral.plan}</td>
                  <td className="py-3 text-right">R$ {referral.commission.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateReferrals;
