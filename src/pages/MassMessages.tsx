
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BroadcastList from "@/components/mass-messages/BroadcastList";
import BroadcastCreator from "@/components/mass-messages/BroadcastCreator";
import BroadcastMonitoring from "@/components/mass-messages/BroadcastMonitoring";
import LeadsManager from "@/components/mass-messages/LeadsManager";
import ConnectionStatus from "@/components/mass-messages/ConnectionStatus";
import { useApp } from "@/contexts/AppContext";

const MassMessages: React.FC = () => {
  const { isConnected } = useApp();
  
  return (
    <MainLayout title="Disparos em Massa">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Gerenciamento de Disparos</h2>
          <p className="text-sm text-muted-foreground">
            Configure e monitore disparos em massa para seus contatos via WhatsApp
          </p>
        </div>
        
        {/* Component to show connection status */}
        <ConnectionStatus />

        <Tabs defaultValue="broadcasts" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger value="broadcasts" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Disparos
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Novo Disparo
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Monitoramento
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:border-whatsapp data-[state=active]:text-whatsapp rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none">
                Leads
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="broadcasts" className="pt-6">
            <BroadcastList />
          </TabsContent>

          <TabsContent value="new" className="pt-6">
            <BroadcastCreator />
          </TabsContent>

          <TabsContent value="monitoring" className="pt-6">
            <BroadcastMonitoring />
          </TabsContent>

          <TabsContent value="leads" className="pt-6">
            <LeadsManager />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MassMessages;
