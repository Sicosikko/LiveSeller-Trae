import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newMessages: true,
    newLeads: true,
    paymentNotifications: true,
    systemUpdates: true,
  });
  const { toast } = useToast();

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveNotificationSettings = () => {
    // Aqui implementaríamos a lógica para salvar as configurações de notificação
    toast("Notificações atualizadas", {
      description: "Suas preferências de notificação foram salvas com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações de Notificação</h3>
        <p className="text-sm text-muted-foreground">
          Escolha como e quando deseja receber notificações do sistema
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium">Canais de Notificação</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">E-mail</Label>
              <p className="text-sm text-muted-foreground">Receber notificações por e-mail</p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={() => handleToggle("email")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push</Label>
              <p className="text-sm text-muted-foreground">Receber notificações push no navegador</p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={() => handleToggle("push")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS</Label>
              <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.sms}
              onCheckedChange={() => handleToggle("sms")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium">Eventos de Notificação</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-messages">Novas mensagens</Label>
              <p className="text-sm text-muted-foreground">Notificar quando receber novas mensagens</p>
            </div>
            <Switch
              id="new-messages"
              checked={notifications.newMessages}
              onCheckedChange={() => handleToggle("newMessages")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-leads">Novos leads</Label>
              <p className="text-sm text-muted-foreground">Notificar quando novos leads forem capturados</p>
            </div>
            <Switch
              id="new-leads"
              checked={notifications.newLeads}
              onCheckedChange={() => handleToggle("newLeads")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="payment-notifications">Pagamentos</Label>
              <p className="text-sm text-muted-foreground">Notificar sobre transações e pagamentos</p>
            </div>
            <Switch
              id="payment-notifications"
              checked={notifications.paymentNotifications}
              onCheckedChange={() => handleToggle("paymentNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-updates">Atualizações do sistema</Label>
              <p className="text-sm text-muted-foreground">Notificar sobre atualizações e novidades</p>
            </div>
            <Switch
              id="system-updates"
              checked={notifications.systemUpdates}
              onCheckedChange={() => handleToggle("systemUpdates")}
            />
          </div>
        </div>
      </div>

      <Button onClick={saveNotificationSettings} className="mt-4">
        Salvar alterações
      </Button>
    </div>
  );
};

export default NotificationSettings;
