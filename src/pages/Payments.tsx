
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentMethods from "@/components/payments/PaymentMethods";
import PaymentLinks from "@/components/payments/PaymentLinks";
import PaymentReports from "@/components/payments/PaymentReports";
import PaymentSettings from "@/components/payments/PaymentSettings";

const Payments: React.FC = () => {
  return (
    <MainLayout title="Pagamentos">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Gestão de Pagamentos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie cobranças, links de pagamento e integrações via WhatsApp
          </p>
        </div>

        <Tabs defaultValue="methods" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger value="methods" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Métodos de Pagamento
              </TabsTrigger>
              <TabsTrigger value="links" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Links de Pagamento
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Relatórios
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="methods" className="pt-6">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="links" className="pt-6">
            <PaymentLinks />
          </TabsContent>

          <TabsContent value="reports" className="pt-6">
            <PaymentReports />
          </TabsContent>

          <TabsContent value="settings" className="pt-6">
            <PaymentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Payments;
