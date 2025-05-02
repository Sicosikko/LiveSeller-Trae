
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppIntegration from "@/components/whatsapp/WhatsAppIntegration";
import ProductCatalog from "@/components/catalog/ProductCatalog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ShoppingBag, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import ShoppingCart from "@/components/cart/ShoppingCart";

const WhatsAppCommerce: React.FC = () => {
  const [activeTab, setActiveTab] = useState("integration");
  
  return (
    <MainLayout title="WhatsApp Commerce">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">WhatsApp Commerce</h2>
          <p className="text-sm text-muted-foreground">
            Integração com WhatsApp Business API, catálogo de produtos e carrinho de compras
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status da Plataforma</CardTitle>
            <CardDescription>Visão geral do status da sua plataforma de comércio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">WhatsApp Business</h3>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  API conectada e funcionando
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Última atualização: {new Date().toLocaleString()}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Catálogo de Produtos</h3>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  28 produtos disponíveis
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  5 categorias configuradas
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">Carrinho de Compras</h3>
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  12 carrinhos ativos
                </p>
                <p className="text-xs text-purple-600 mt-2">
                  Taxa de conversão: 42%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Integração</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Catálogo</span>
              <span className="sm:hidden">Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="sm:hidden">Compras</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="integration" className="mt-6">
            <WhatsAppIntegration />
          </TabsContent>
          
          <TabsContent value="catalog" className="mt-6">
            <ProductCatalog />
          </TabsContent>
          
          <TabsContent value="cart" className="mt-6">
            <ShoppingCart />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default WhatsAppCommerce;
