
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PlatformConnections from "@/components/integrations/PlatformConnections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrmConnectors from "@/components/integrations/CrmConnectors";
import EcommerceConnectors from "@/components/integrations/EcommerceConnectors";
import ApiDashboard from "@/components/integrations/ApiDashboard";
import WebSocketMonitor from "@/components/platform-status/WebSocketMonitor";
import { useApp } from "@/contexts/AppContext";
import { ABTestProvider, useABTest } from "@/components/ab-testing/ABTestProvider";
import { motion } from "framer-motion";

const PlatformIntegrationsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("messaging");
  const { isConnected, connectionAttempts, connectionStats } = useApp();
  const { isInTest, getVariant } = useABTest();
  
  // Verificar se o usuário está no teste A/B de layout
  const isInLayoutTest = isInTest('integration-layout');
  const layoutVariant = getVariant('integration-layout');
  
  // Animações
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.div 
        className="flex flex-col md:flex-row gap-4 justify-between mb-6"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-2xl font-bold">Central de Integrações</h1>
          <p className="text-muted-foreground">
            Conecte seus sistemas externos e aprimore sua experiência com o LiveSeller
          </p>
        </div>
        
        <WebSocketMonitor 
          isConnected={isConnected}
          connectionAttempts={connectionAttempts}
          stats={connectionStats || {
            lastConnected: null,
            messageCount: 0,
            latency: 0
          }}
        />
      </motion.div>
      
      {/* Versão B do teste A/B mostra cards antes de tabs */}
      {isInLayoutTest && layoutVariant === 'B' && (
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div 
            className="card-interactive bg-card p-4 rounded-lg border cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => setActiveTab("messaging")}
          >
            <h3 className="font-medium">Plataformas de Mensageria</h3>
            <p className="text-sm text-muted-foreground">WhatsApp, Telegram e outros</p>
          </motion.div>
          
          <motion.div 
            className="card-interactive bg-card p-4 rounded-lg border cursor-pointer" 
            whileHover={{ y: -5 }}
            onClick={() => setActiveTab("crm")}
          >
            <h3 className="font-medium">CRMs e ERPs</h3>
            <p className="text-sm text-muted-foreground">Salesforce, HubSpot e outros</p>
          </motion.div>
          
          <motion.div 
            className="card-interactive bg-card p-4 rounded-lg border cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => setActiveTab("ecommerce")}
          >
            <h3 className="font-medium">E-commerce</h3>
            <p className="text-sm text-muted-foreground">Shopify, WooCommerce e outros</p>
          </motion.div>
          
          <motion.div 
            className="card-interactive bg-card p-4 rounded-lg border cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => setActiveTab("api")}
          >
            <h3 className="font-medium">API & Zapier</h3>
            <p className="text-sm text-muted-foreground">Integrações via API</p>
          </motion.div>
        </motion.div>
      )}
      
      <motion.div variants={fadeIn}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger 
              value="messaging" 
              className="transition-all data-[state=active]:animate-fade-in-down"
              aria-label="Mensageria - WhatsApp, Telegram e outros"
            >
              Mensageria
            </TabsTrigger>
            <TabsTrigger 
              value="crm" 
              className="transition-all data-[state=active]:animate-fade-in-down"
              aria-label="CRMs e ERPs - Salesforce, HubSpot e outros"
            >
              CRMs & ERPs
            </TabsTrigger>
            <TabsTrigger 
              value="ecommerce" 
              className="transition-all data-[state=active]:animate-fade-in-down"
              aria-label="E-commerce - Shopify, WooCommerce e outros"
            >
              E-commerce
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="transition-all data-[state=active]:animate-fade-in-down"
              aria-label="API e Zapier - Integrações via API"
            >
              API & Zapier
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messaging" className="pt-6 animate-fade-in">
            <PlatformConnections />
          </TabsContent>
          
          <TabsContent value="crm" className="pt-6 animate-fade-in">
            <CrmConnectors />
          </TabsContent>
          
          <TabsContent value="ecommerce" className="pt-6 animate-fade-in">
            <EcommerceConnectors />
          </TabsContent>
          
          <TabsContent value="api" className="pt-6 animate-fade-in">
            <ApiDashboard />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

const PlatformIntegrations: React.FC = () => {
  return (
    <MainLayout title="Hub de Integrações">
      <ABTestProvider>
        <PlatformIntegrationsContent />
      </ABTestProvider>
    </MainLayout>
  );
};

export default PlatformIntegrations;
