
import { useState, useEffect, useCallback } from 'react';
import { PaymentLink, SyncStrategy } from '../types/PaymentLinkTypes';
import { getLinksFromIndexedDB, saveLinksToIndexedDB } from './utils/indexedDBUtils';
import { getMockLinks } from './utils/mockData';
import { useOnlineStatus } from './useOnlineStatus';
import { useLinkSync } from './useLinkSync';
import { useCreatePaymentLink } from './useCreatePaymentLink';

export function usePaymentLinks() {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState(0);
  
  const { isOnline } = useOnlineStatus();
  const { syncPendingLinks } = useLinkSync();

  // Carregar links do IndexedDB ou API
  const loadLinks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isOnline) {
        // Tentar carregar da API primeiro
        try {
          const response = await fetch('/api/payment-links');
          if (response.ok) {
            const data = await response.json();
            
            // Salvar no IndexedDB para uso offline
            await saveLinksToIndexedDB(data);
            
            setPaymentLinks(data);
            setPendingChanges(0);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error("Erro ao carregar da API, tentando IndexedDB:", e);
        }
      }
      
      // Se offline ou API falhou, carregar do IndexedDB
      const links = await getLinksFromIndexedDB();
      setPaymentLinks(links);
      
      // Verificar alterações pendentes
      const pending = links.filter(link => link.syncStatus === 'pending').length;
      setPendingChanges(pending);
      
    } catch (err) {
      setError("Falha ao carregar links de pagamento: " + (err instanceof Error ? err.message : String(err)));
      console.error("Erro ao carregar links:", err);
      
      // Fallback para dados de exemplo
      setPaymentLinks(getMockLinks());
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);
  
  // Carregar na inicialização e quando mudar status online
  useEffect(() => {
    loadLinks();
  }, [loadLinks]);
  
  // Ouvir eventos de sincronização do Service Worker
  useEffect(() => {
    const handleSyncComplete = (event: Event) => {
      const syncEvent = event as CustomEvent;
      if (syncEvent.detail && syncEvent.detail.store === 'payment-links') {
        loadLinks();
      }
    };
    
    window.addEventListener('sync-completed', handleSyncComplete);
    
    return () => {
      window.removeEventListener('sync-completed', handleSyncComplete);
    };
  }, [loadLinks]);

  const { createPaymentLink } = useCreatePaymentLink(loadLinks, setPaymentLinks, setPendingChanges, setError);

  // Wrapper for syncPendingLinks that uses the current links
  const handleSyncPendingLinks = useCallback(async () => {
    const syncedCount = await syncPendingLinks(paymentLinks);
    if (syncedCount > 0) {
      await loadLinks();
    }
    return syncedCount;
  }, [syncPendingLinks, paymentLinks, loadLinks]);

  return {
    paymentLinks,
    isLoading,
    error,
    isOnline,
    pendingChanges,
    createPaymentLink,
    syncPendingLinks: handleSyncPendingLinks,
    loadLinks
  };
}
