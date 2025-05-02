
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import AffiliateProgram from "@/components/affiliates/AffiliateProgram";

const AffiliatePage: React.FC = () => {
  return (
    <MainLayout title="Programa de Afiliados">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Programa de Afiliados</h2>
          <p className="text-sm text-muted-foreground">
            Ganhe comissões indicando o LiveSeller para seus contatos e seguidores
          </p>
        </div>
        
        <AffiliateProgram />
      </div>
    </MainLayout>
  );
};

export default AffiliatePage;
