
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Smartphone, Settings } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const PlatformNotifications: React.FC = () => {
  const { isMobileApp, isDesktopApp } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | null>(null);
  
  useEffect(() => {
    // Verificar suporte para notificações
    const checkNotificationSupport = async () => {
      const supported = 'Notification' in window;
      setPushSupported(supported);
      
      if (supported) {
        const permission = Notification.permission;
        setPushPermission(permission);
        setNotificationsEnabled(permission === 'granted');
      }
    };
    
    checkNotificationSupport();
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        registerForPushNotifications();
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
    }
  };

  const registerForPushNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }
    
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          // Use uma chave VAPID pública real em produção
          'BNbKwE3RdH_iMpnfzJZfbYCQD1qU7yJ2XE3Oa8SlEYkfj37XRDCHikR1lBIQNGmTFOI5zXUJQYVOtJ4-jKE0Z2M'
        )
      });
      
      // Enviar a assinatura para o servidor
      // Em um app real, você enviaria isso para seu backend
      console.log('Push subscription:', JSON.stringify(subscription));
    } catch (error) {
      console.error('Erro ao registrar para notificações push:', error);
      setNotificationsEnabled(false);
    }
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    if (enabled && (!pushPermission || pushPermission !== 'granted')) {
      await requestNotificationPermission();
    } else {
      setNotificationsEnabled(enabled);
    }
  };

  // Helper para converter base64 para Uint8Array (necessário para a chave VAPID)
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <span>Notificações Multiplataforma</span>
        </CardTitle>
        <CardDescription>
          Receba notificações em todos os seus dispositivos conectados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Notificações Push</p>
            <p className="text-sm text-muted-foreground">
              {pushSupported 
                ? "Receba alertas mesmo quando o app estiver fechado" 
                : "Seu navegador não suporta notificações push"}
            </p>
          </div>
          <Switch 
            checked={notificationsEnabled}
            onCheckedChange={handleToggleNotifications}
            disabled={!pushSupported}
          />
        </div>
        
        <div className="grid gap-4 mt-4">
          <div className="flex items-center p-2 rounded-lg border bg-muted/40">
            <Smartphone className="h-10 w-10 p-2 text-primary" />
            <div className="ml-4">
              <h4 className="font-medium">{isMobileApp ? 'App Móvel Instalado' : 'App Móvel'}</h4>
              <p className="text-sm text-muted-foreground">
                {isMobileApp 
                  ? 'Você está usando o aplicativo móvel' 
                  : 'Instale o app para iOS ou Android para notificações nativas'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.open('/downloads', '_self')}>
          Ver Downloads
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlatformNotifications;
