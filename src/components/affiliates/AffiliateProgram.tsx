
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AffiliateStats from "./AffiliateStats";
import AffiliateLinks from "./AffiliateLinks";
import AffiliatePayouts from "./AffiliatePayouts";
import AffiliateReferrals from "./AffiliateReferrals";
import { useAffiliate } from "@/hooks/use-affiliate";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const AffiliateProgram: React.FC = () => {
  const { isLoading, isAffiliate, affiliateStats, becomeAffiliate } = useAffiliate();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!isAffiliate) {
    return (
      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle>Torne-se um Afiliado</CardTitle>
          <CardDescription>
            Ganhe comissões indicando o LiveSeller para seus contatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Benefícios do Programa</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Comissão de 30% em cada venda realizada</li>
              <li>Links de afiliado personalizados</li>
              <li>Dashboard completo para acompanhar conversões</li>
              <li>Pagamentos mensais automáticos</li>
              <li>Materiais de marketing prontos para usar</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <button
            onClick={becomeAffiliate}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Quero me tornar um afiliado
          </button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Programa de Afiliados</CardTitle>
          <CardDescription>
            Gerencie seu programa de afiliados e acompanhe suas comissões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AffiliateStats stats={affiliateStats} />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="links">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="referrals">Indicações</TabsTrigger>
          <TabsTrigger value="payouts">Pagamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="links" className="mt-6">
          <AffiliateLinks />
        </TabsContent>
        
        <TabsContent value="referrals" className="mt-6">
          <AffiliateReferrals />
        </TabsContent>
        
        <TabsContent value="payouts" className="mt-6">
          <AffiliatePayouts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffiliateProgram;
