
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentLinks from "../components/payments/links/PaymentLinks";
import PaymentMethods from "../components/payments/PaymentMethods";
import PaymentReports from "../components/payments/PaymentReports";
import PaymentSettings from "../components/payments/PaymentSettings";

const PaymentsPage: React.FC = () => {
  return (
    <MainLayout title="Pagamentos">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Gestão de Pagamentos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie cobranças, links de pagamento e integrações via WhatsApp
          </p>
        </div>

        <Tabs defaultValue="links" className="w-full">
          <TabsList>
            <TabsTrigger value="links">Links de Pagamento</TabsTrigger>
            <TabsTrigger value="methods">Métodos de Pagamento</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Links de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentLinks />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="methods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethods />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentReports />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PaymentsPage;
