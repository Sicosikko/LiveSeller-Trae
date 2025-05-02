
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PricingPlans from "@/components/pricing/PricingPlans";

const PricingPage: React.FC = () => {
  return (
    <MainLayout title="Planos e Preços">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Planos e Preços</h2>
          <p className="text-sm text-muted-foreground">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>
        
        <PricingPlans />
      </div>
    </MainLayout>
  );
};

export default PricingPage;
