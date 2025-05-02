
import { PaymentLink } from "../../types/PaymentLinkTypes";
import { getMockLinks } from "./mockData";

export const getLinksFromIndexedDB = async (): Promise<PaymentLink[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    request.onerror = () => {
      reject("Não foi possível abrir o banco de dados");
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      // Criar store se não existir
      if (!db.objectStoreNames.contains('payment-links')) {
        db.createObjectStore('payment-links', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = () => {
      const db = request.result;
      
      try {
        const tx = db.transaction('payment-links', 'readonly');
        const store = tx.objectStore('payment-links');
        const getRequest = store.getAll();
        
        getRequest.onsuccess = () => {
          if (getRequest.result && getRequest.result.length > 0) {
            resolve(getRequest.result as PaymentLink[]);
          } else {
            resolve(getMockLinks());
          }
        };
        
        getRequest.onerror = () => {
          reject("Erro ao obter links do IndexedDB");
        };
        
      } catch (err) {
        reject(err);
      }
    };
  });
};

export const saveLinksToIndexedDB = async (links: PaymentLink[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    request.onerror = () => reject("Falha ao abrir banco de dados");
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains('payment-links')) {
        db.createObjectStore('payment-links', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('payment-links', 'readwrite');
      const store = tx.objectStore('payment-links');
      
      // Limpar store atual
      store.clear().onsuccess = () => {
        // Adicionar links novos
        let count = 0;
        links.forEach((link) => {
          const addRequest = store.add({
            ...link,
            syncStatus: 'synced',
            lastSynced: new Date().toISOString()
          });
          
          addRequest.onsuccess = () => {
            count++;
            if (count === links.length) {
              resolve();
            }
          };
          
          addRequest.onerror = () => {
            reject("Erro ao salvar link no IndexedDB");
          };
        });
        
        if (links.length === 0) {
          resolve();
        }
      };
    };
  });
};

export const saveLocalPendingLink = async (link: PaymentLink): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('payment-links', 'readwrite');
      const store = tx.objectStore('payment-links');
      
      const addRequest = store.add({
        ...link,
        syncStatus: 'pending',
        lastSynced: new Date().toISOString()
      });
      
      addRequest.onsuccess = () => resolve();
      addRequest.onerror = () => reject(addRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};

export const updateLinkSyncStatus = async (
  linkId: string, 
  status: "synced" | "pending" | "failed"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('payment-links', 'readwrite');
      const store = tx.objectStore('payment-links');
      
      const getRequest = store.get(linkId);
      
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const link = getRequest.result;
          store.put({
            ...link,
            syncStatus: status,
            lastSynced: status === 'synced' ? new Date().toISOString() : link.lastSynced
          });
          resolve();
        } else {
          reject(`Link ${linkId} não encontrado`);
        }
      };
      
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};
