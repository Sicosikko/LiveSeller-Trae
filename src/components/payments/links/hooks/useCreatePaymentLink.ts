
import { useCallback } from 'react';
import { PaymentLink, SyncStrategy } from '../types/PaymentLinkTypes';
import { saveLocalPendingLink } from './utils/indexedDBUtils';
import { useLinkSync } from './useLinkSync';

export function useCreatePaymentLink(
  loadLinks: () => Promise<void>,
  setPaymentLinks: React.Dispatch<React.SetStateAction<PaymentLink[]>>,
  setPendingChanges: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const { isOnline, registerServiceWorkerSync } = useLinkSync();

  const createPaymentLink = useCallback(async (
    newLink: Omit<PaymentLink, 'id' | 'created' | 'syncStatus' | 'lastSynced'>,
    syncStrategy: SyncStrategy = 'optimistic'
  ) => {
    try {
      const now = new Date().toISOString();
      const link: PaymentLink = {
        ...newLink,
        id: `link_${Date.now()}`,
        created: now,
        syncStatus: isOnline ? 'synced' : 'pending',
        lastSynced: isOnline ? now : undefined
      };
      
      if (syncStrategy === 'optimistic') {
        // Atualizar UI imediatamente
        setPaymentLinks(prev => [...prev, link]);
        
        if (!isOnline) {
          setPendingChanges(prev => prev + 1);
        }
      }
      
      if (isOnline) {
        // Enviar para API
        const response = await fetch('/api/payment-links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(link)
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao criar link: ${response.status}`);
        }
        
        // Obter resposta do servidor que pode incluir ID ou outros campos gerados
        const serverLink = await response.json();
        
        if (syncStrategy === 'pessimistic') {
          setPaymentLinks(prev => [...prev, serverLink]);
        } else {
          // Atualizar o link na UI com dados do servidor
          setPaymentLinks(prevLinks => 
            prevLinks.map(pl => pl.id === link.id ? serverLink : pl)
          );
        }
      } else {
        // Salvar localmente
        await saveLocalPendingLink(link);
        
        // Registrar para sincronização quando online
        await registerServiceWorkerSync();
        
        if (syncStrategy === 'pessimistic') {
          setPaymentLinks(prev => [...prev, link]);
          setPendingChanges(prev => prev + 1);
        }
      }
      
      return true;
    } catch (err) {
      setError(`Erro ao criar link de pagamento: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Erro ao criar link:', err);
      
      // Se for estratégia otimista e falhar, remover da UI
      if (syncStrategy === 'optimistic' && isOnline) {
        loadLinks(); // Recarregar links para reverter
      }
      
      return false;
    }
  }, [isOnline, loadLinks, registerServiceWorkerSync, setPaymentLinks, setPendingChanges, setError]);

  return { createPaymentLink };
}
