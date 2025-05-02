
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LanguageSettings from "@/components/settings/LanguageSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";
import RegionalSettings from "@/components/settings/RegionalSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { SkipLink } from "@/components/ui/skip-link";
import { ABTestProvider } from "@/components/ab-testing/ABTestProvider";

const Settings: React.FC = () => {
  const { t } = useLanguage();
  
  // Animações
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 }
    }
  };
  
  const itemTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <MainLayout title="Configurações">
      <ABTestProvider>
        <SkipLink href="#settings-content">Pular para o conteúdo</SkipLink>
        
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={pageTransition}
          id="settings-content"
        >
          <motion.div variants={itemTransition}>
            <h2 className="text-lg font-medium">Configurações</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie suas preferências e configurações de conta
            </p>
          </motion.div>

          <motion.div variants={itemTransition}>
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none bg-transparent p-0" aria-label="Opções de configuração">
                  <TabsTrigger 
                    value="profile" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger 
                    value="language" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Idioma
                  </TabsTrigger>
                  <TabsTrigger 
                    value="regional" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Regional
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Notificações
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accessibility" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Acessibilidade
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Privacidade
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:shadow-none"
                  >
                    Segurança
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <ProfileSettings />
                </Card>
              </TabsContent>

              <TabsContent value="language" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <LanguageSettings />
                </Card>
              </TabsContent>

              <TabsContent value="regional" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <RegionalSettings />
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <NotificationSettings />
                </Card>
              </TabsContent>
              
              <TabsContent value="accessibility" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <AccessibilitySettings />
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <PrivacySettings />
                </Card>
              </TabsContent>

              <TabsContent value="security" className="pt-6 animate-fade-in">
                <Card className="p-6">
                  <SecuritySettings />
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </ABTestProvider>
    </MainLayout>
  );
};

export default Settings;
