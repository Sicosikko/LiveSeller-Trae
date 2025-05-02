
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, Shield, Cloud } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import DesktopDownloads from "./DesktopDownloads";
import MobileDownloads from "./MobileDownloads";

const DownloadLayout: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Aplicativos LiveSeller</h1>
        <p className="text-muted-foreground">
          Baixe nossos aplicativos para desktop e dispositivos móveis para usar o LiveSeller em qualquer lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-card text-card-foreground">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-primary/10">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">Instalação fácil</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Aplicativos otimizados para cada plataforma com atualizações automáticas.
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-card text-card-foreground">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">Segurança avançada</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Autenticação segura e sincronização criptografada com o servidor.
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-card text-card-foreground">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Cloud className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">Sincronização em tempo real</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Mesmos dados e configurações em todos os seus dispositivos.
          </p>
        </div>
      </div>

      <Tabs defaultValue="desktop" className="w-full">
        <TabsList>
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>
        <TabsContent value="desktop" className="pt-6">
          <DesktopDownloads />
        </TabsContent>
        <TabsContent value="mobile" className="pt-6">
          <MobileDownloads />
        </TabsContent>
      </Tabs>

      <div className="p-4 rounded-lg border bg-muted text-muted-foreground">
        <h3 className="font-medium mb-2">Informações sobre dispositivos</h3>
        <p className="text-sm">
          Todos os aplicativos usam as mesmas credenciais do sistema web. Login automático após a primeira autenticação.
          Atualizações são fornecidas automaticamente e dados são sincronizados em tempo real.
        </p>
      </div>
    </div>
  );
};

export default DownloadLayout;
