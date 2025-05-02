
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PrivacySettings: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    analytics: true,
    profileVisibility: "all",
  });
  const { toast } = useToast();

  const handleToggle = (key: "shareData" | "analytics") => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileVisibilityChange = (value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      profileVisibility: value
    }));
  };

  const savePrivacySettings = () => {
    // Aqui implementaríamos a lógica para salvar as configurações de privacidade
    toast("Configurações de privacidade atualizadas", {
      description: "Suas preferências de privacidade foram salvas com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações de Privacidade</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie suas configurações de privacidade e compartilhamento de dados
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="share-data">Compartilhamento de dados</Label>
            <p className="text-sm text-muted-foreground">
              Compartilhar dados anônimos para melhorar o serviço
            </p>
          </div>
          <Switch
            id="share-data"
            checked={privacySettings.shareData}
            onCheckedChange={() => handleToggle("shareData")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="analytics">Analytics</Label>
            <p className="text-sm text-muted-foreground">
              Permitir coleta de dados de uso para análise
            </p>
          </div>
          <Switch
            id="analytics"
            checked={privacySettings.analytics}
            onCheckedChange={() => handleToggle("analytics")}
          />
        </div>

      <div className="space-y-2">
        <Label htmlFor="profile-visibility">Visibilidade do perfil</Label>
        <Select
          value={privacySettings.profileVisibility}
          onValueChange={handleProfileVisibilityChange}
        >
          <SelectTrigger id="profile-visibility" className="w-full">
            <SelectValue placeholder="Selecione quem pode ver seu perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="team">Somente equipe</SelectItem>
            <SelectItem value="none">Privado</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Controle quem pode ver suas informações de perfil
        </p>
      </div>

      </div>

      <Button onClick={savePrivacySettings} className="mt-6">
        Salvar alterações
      </Button>

      <div className="pt-4 border-t">
        <h4 className="text-md font-medium text-destructive">Zona de Perigo</h4>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Ações que afetam permanentemente sua conta e dados
        </p>
        <div className="space-y-4">
          <Button variant="outline" className="border-destructive text-destructive w-full sm:w-auto">
            Exportar meus dados
          </Button>
          <Button variant="outline" className="border-destructive text-destructive w-full sm:w-auto">
            Excluir minha conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
