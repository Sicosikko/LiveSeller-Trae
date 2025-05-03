import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MobileDownloads from '../components/downloads/MobileDownloads';
import DesktopDownloads from '../components/downloads/DesktopDownloads';

const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mobile");
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground">
          Baixe os aplicativos LiveSeller para diferentes plataformas
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="mobile">Aplicativos Móveis</TabsTrigger>
          <TabsTrigger value="desktop">Aplicativos Desktop</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mobile" className="pt-6">
          <MobileDownloads />
        </TabsContent>
        
        <TabsContent value="desktop" className="pt-6">
          <DesktopDownloads />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Downloads;