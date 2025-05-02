
// Interface for tipar o banco de dados IndexedDB
export interface WhatzAppDB extends IDBDatabase {
  transaction(
    storeNames: string | string[], 
    mode?: IDBTransactionMode
  ): IDBTransaction;
  objectStoreNames: DOMStringList;
}

// Lista de stores que devem ser criadas/sincronizadas
export const SYNC_STORES = [
  'pending-messages',
  'contacts',
  'chats',
  'payment-links',
  'audit-logs'
];

// Função para abrir o banco de dados IndexedDB
export function openDB(): Promise<WhatzAppDB | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as WhatzAppDB);
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Criar as stores necessárias se não existirem
      function setupStores() {
        // Criar stores base para sincronização
        for (const storeName of SYNC_STORES) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        }
        
        // Adicionar mais stores específicas
        if (!db.objectStoreNames.contains('payment-links')) {
          db.createObjectStore('payment-links', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('app-settings')) {
          db.createObjectStore('app-settings', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('audit-logs')) {
          db.createObjectStore('audit-logs', { keyPath: 'id' });
        }
      }
      
      setupStores();
    };
  });
}

// Função para obter uma store específica do IndexedDB
export async function getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore | null> {
  try {
    const db = await openDB();
    if (!db) return null;
    
    if (!db.objectStoreNames.contains(storeName)) {
      console.error(`Store ${storeName} não existe`);
      return null;
    }
    
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  } catch (error) {
    console.error(`Erro ao obter store ${storeName}:`, error);
    return null;
  }
}

// Função para obter todos os itens de uma store
export async function getAllItems<T>(storeName: string): Promise<T[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName);
      if (!store) {
        resolve([]);
        return;
      }
      
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

// Função para adicionar ou atualizar um item em uma store
export async function putItem<T>(storeName: string, item: T): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName, 'readwrite');
      if (!store) {
        reject(new Error(`Store ${storeName} não encontrada`));
        return;
      }
      
      const request = store.put(item);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

// Função para remover um item de uma store
export async function deleteItem(storeName: string, id: string | number): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName, 'readwrite');
      if (!store) {
        reject(new Error(`Store ${storeName} não encontrada`));
        return;
      }
      
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

// Função para limpar uma store
export async function clearStore(storeName: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName, 'readwrite');
      if (!store) {
        reject(new Error(`Store ${storeName} não encontrada`));
        return;
      }
      
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}
