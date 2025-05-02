
class IndexedDBManager {
  updateIndexedDB(storeName: string, data: any): void {
    const dbPromise = indexedDB.open('whatzapp-flow-crm-ai', 1);
    
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      
      // Verificar se a store existe
      if (!db.objectStoreNames.contains(storeName)) {
        console.error(`Store ${storeName} não existe no IndexedDB`);
        return;
      }
      
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      
      // Se data for um array, adicionar cada item individualmente
      if (Array.isArray(data)) {
        data.forEach(item => {
          store.put({
            ...item,
            lastSynced: new Date().toISOString(),
            syncStatus: 'synced'
          });
        });
      } else if (data && typeof data === 'object') {
        // Se for um objeto único
        store.put({
          ...data,
          lastSynced: new Date().toISOString(),
          syncStatus: 'synced'
        });
      }
      
      tx.oncomplete = () => {
        console.log(`Dados sincronizados com sucesso para ${storeName}`);
        
        // Disparar evento para notificar outras partes do app
        const updateEvent = new CustomEvent('indexeddb-updated', {
          detail: {
            store: storeName,
            timestamp: new Date()
          }
        });
        
        window.dispatchEvent(updateEvent);
      };
      
      tx.onerror = () => {
        console.error(`Erro ao sincronizar ${storeName}:`, tx.error);
      };
    };
    
    dbPromise.onerror = () => {
      console.error('Erro ao abrir IndexedDB:', dbPromise.error);
    };
  }
}

export default IndexedDBManager;
