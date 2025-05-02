
import React, { useState, useEffect } from "react";
import { StatusAlert } from "@/components/ui/status-alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { getOfflineStatus } from "@/utils/serviceWorkerRegistration";

const OfflineAlert: React.FC = () => {
  const { t } = useLanguage();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const offline = await getOfflineStatus();
      setIsOffline(offline);
    };

    // Check initially
    checkConnection();

    // Set up event listeners for online/offline status
    const handleStatusChange = async () => {
      const offline = await getOfflineStatus();
      setIsOffline(offline);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(interval);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <StatusAlert
      title={t('common.offlineMode')}
      description={t('common.offlineModeDescription')}
      variant="warning"
      actions={
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => window.location.reload()}
        >
          {t('common.retry')}
        </Button>
      }
      className="fixed bottom-4 right-4 z-50 max-w-md"
    />
  );
};

export default OfflineAlert;
