
import { useCallback } from 'react';
import { PaymentLink } from '../types/PaymentLinkTypes';
import { updateLinkSyncStatus } from './utils/indexedDBUtils';
import { useOnlineStatus } from './useOnlineStatus';

export function useLinkSync() {
  const { isOnline } = useOnlineStatus();

  const syncPendingLinks = useCallback(async (links: PaymentLink[]): Promise<number> => {
    if (!isOnline) {
      return 0;
    }
    
    try {
      const pendingLinks = links.filter(link => link.syncStatus === 'pending');
      
      if (pendingLinks.length === 0) {
        return 0;
      }
      
      let syncedCount = 0;
      
      for (const link of pendingLinks) {
        try {
          // Enviar para API
          const response = await fetch('/api/payment-links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
          });
          
          if (!response.ok) {
            throw new Error(`Erro ao sincronizar link: ${response.status}`);
          }
          
          // Atualizar no IndexedDB
          await updateLinkSyncStatus(link.id, 'synced');
          syncedCount++;
        } catch (err) {
          console.error(`Falha ao sincronizar link ${link.id}:`, err);
          await updateLinkSyncStatus(link.id, 'failed');
        }
      }
      
      return syncedCount;
    } catch (err) {
      console.error("Erro ao sincronizar links pendentes:", err);
      return 0;
    }
  }, [isOnline]);

  const registerServiceWorkerSync = useCallback(async (): Promise<void> => {
    if ('serviceWorker' in navigator && navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.ready;
      if ('periodicSync' in registration) {
        try {
          // Use periodicSync API which is more modern
          await (registration as any).periodicSync.register('sync-payment-links', {
            minInterval: 60 * 60 * 1000, // 1 hour in milliseconds
          });
        } catch (error) {
          console.error('Periodic background sync could not be registered:', error);
        }
      }
    }
  }, []);

  return {
    isOnline,
    syncPendingLinks,
    registerServiceWorkerSync
  };
}
