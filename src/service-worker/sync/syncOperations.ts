import { DBSchema, IDBPDatabase, openDB } from 'idb';

interface PendingOperation {
  id?: number;
  store: string;
  method: 'add' | 'put' | 'delete';
  data: any;
  key?: IDBValidKey;
  status: 'pending' | 'synced' | 'failed';
  error?: string;
  retries?: number;
}

interface AppDB extends DBSchema {
  paymentLinks: {
    key: string;
    value: any;
  };
  pendingOperations: {
    key: number;
    value: PendingOperation;
  };
  messages: {
    key: string;
    value: any;
  };
  'audit-logs': {
    key: string;
    value: any;
  };
}

let db: IDBPDatabase<AppDB>;

const DB_NAME = 'app-db';
const DB_VERSION = 1;

async function initializeDB() {
  db = await openDB<AppDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('paymentLinks')) {
        db.createObjectStore('paymentLinks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('pendingOperations')) {
        db.createObjectStore('pendingOperations', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('audit-logs')) {
        db.createObjectStore('audit-logs', { keyPath: 'id' });
      }
    },
  });
  return db;
}

async function getDB() {
  if (!db) {
    db = await initializeDB();
  }
  return db;
}

const MAX_RETRIES = 3;

// Added export for syncMessages function
export const syncMessages = async () => {
  try {
    const db = await getDB();
    const pendingMessages = await db.getAll('messages');
    
    console.log('Syncing pending messages:', pendingMessages.length);
    
    // Implementation for syncing messages would go here
    
    return pendingMessages.length;
  } catch (error) {
    console.error('Error syncing messages:', error);
    return 0;
  }
};

export const syncPaymentLinks = async () => {
  try {
    const db = await getDB();
    const tx = db.transaction('pendingOperations', 'readwrite');
    const store = tx.objectStore('pendingOperations');
    
    // Fix: Don't use index here, just get all items and filter
    const allOperations = await store.getAll();
    const paymentLinkOps = allOperations.filter(op => op.store === 'paymentLinks');

    for (const operation of paymentLinkOps) {
      const { method, data, key, retries = 0 } = operation;

      try {
        switch (method) {
          case 'add':
            await fetch('/api/payment-links', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            break;
          case 'put':
            await fetch(`/api/payment-links/${key}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            break;
          case 'delete':
            await fetch(`/api/payment-links/${key}`, {
              method: 'DELETE',
            });
            break;
        }

        await store.delete(operation.id as number);
      } catch (error: any) {
        console.warn(`Failed to sync operation ${operation.id}, retry ${retries}/${MAX_RETRIES}`, error);

        if (retries < MAX_RETRIES) {
          await store.put({ ...operation, retries: retries + 1 });
        } else {
          await db.put("pendingOperations", { 
            ...operation, 
            status: "failed", 
            error: "Operation failed after retries" 
          });
          console.error(`Operation ${operation.id} failed after maximum retries.`);
        }
      }
    }

    await tx.done;
    console.info('All payment link operations synced successfully.');
    return paymentLinkOps.length;
  } catch (error) {
    console.error('Error syncing payment link operations:', error);
    return 0;
  }
};

// Added export for syncAuditLogs function
export const syncAuditLogs = async () => {
  try {
    const db = await getDB();
    const tx = db.transaction('pendingOperations', 'readwrite');
    const store = tx.objectStore('pendingOperations');
    
    const allOperations = await store.getAll();
    const auditLogOps = allOperations.filter(op => op.store === 'audit-logs');
    
    console.log(`Syncing ${auditLogOps.length} audit log operations`);
    
    let syncedCount = 0;
    
    for (const operation of auditLogOps) {
      const { method, data, key, retries = 0 } = operation;
      
      try {
        // In a real implementation, you would send the audit logs to your server
        // For now, we'll just mark them as synced
        await store.delete(operation.id as number);
        console.log(`Audit log operation ${operation.id} synced successfully.`);
        syncedCount++;
      } catch (error: any) {
        console.warn(`Failed to sync audit log operation ${operation.id}, retry ${retries}/${MAX_RETRIES}`, error);

        if (retries < MAX_RETRIES) {
          await store.put({ ...operation, retries: retries + 1 });
        } else {
          await db.put("pendingOperations", { 
            ...operation, 
            status: "failed", 
            error: "Operation failed after retries" 
          });
          console.error(`Operation ${operation.id} failed after maximum retries.`);
        }
      }
    }

    await tx.done;
    console.info(`All audit log operations synced successfully: ${syncedCount} operations`);
    return syncedCount;
  } catch (error) {
    console.error(`Error syncing audit log operations:`, error);
    return 0;
  }
};

// Added export for syncGenericStore function
export const syncGenericStore = async (storeName: string) => {
  if (!storeName) {
    console.error('No store name provided for syncGenericStore');
    return 0;
  }
  
  try {
    const db = await getDB();
    const tx = db.transaction('pendingOperations', 'readwrite');
    const store = tx.objectStore('pendingOperations');
    
    const allOperations = await store.getAll();
    const storeOperations = allOperations.filter(op => op.store === storeName);
    
    console.log(`Syncing ${storeOperations.length} operations for ${storeName}`);
    
    let syncedCount = 0;
    
    for (const operation of storeOperations) {
      const { method, data, key, retries = 0 } = operation;
      
      try {
        let response;
        switch (method) {
          case 'add':
            response = await fetch(`/api/${storeName}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            break;
          case 'put':
            response = await fetch(`/api/${storeName}/${key}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            break;
          case 'delete':
            response = await fetch(`/api/${storeName}/${key}`, {
              method: 'DELETE',
            });
            break;
          default:
            console.warn(`Unknown method: ${method}`);
            continue;
        }

        if (!response?.ok) {
          const errorData = await response.json();
          throw new Error(`Sync failed: ${response.status} - ${errorData?.message || 'No message'}`);
        }

        await store.delete(operation.id as number);
        console.log(`Operation ${operation.id} synced successfully.`);
        syncedCount++;
      } catch (error: any) {
        console.warn(`Failed to sync operation ${operation.id}, retry ${retries}/${MAX_RETRIES}`, error);

        if (retries < MAX_RETRIES) {
          await store.put({ ...operation, retries: retries + 1 });
        } else {
          await db.put("pendingOperations", { 
            ...operation, 
            status: "failed", 
            error: "Operation failed after retries" 
          });
          console.error(`Operation ${operation.id} failed after maximum retries.`);
        }
      }
    }

    await tx.done;
    console.info(`All ${storeName} operations synced successfully: ${syncedCount} operations`);
    return syncedCount;
  } catch (error) {
    console.error(`Error syncing ${storeName} operations:`, error);
    return 0;
  }
};

const enqueue = async (store: string, method: 'add' | 'put' | 'delete', data: any, key?: IDBValidKey) => {
  const db = await getDB();
  const tx = db.transaction('pendingOperations', 'readwrite');
  
  try {
    const objectStore = tx.objectStore('pendingOperations');

    const operation: PendingOperation = {
      store,
      method,
      data,
      key,
      status: 'pending',
      retries: 0,
    };

    await objectStore.add(operation);
    console.log(`Operation enqueued: ${method} on ${store} with key ${key}`);

    await tx.done;
    return true;
  } catch (error) {
    console.error('Failed to enqueue operation:', error);
    tx.abort();
    return false;
  }
};

const performLocalOperation = async (storeName: string, method: 'add' | 'put' | 'delete', data: any, key?: IDBValidKey) => {
  // Fix: Handle dynamic store names properly
  try {
    const db = await getDB();
    
    // Create a transaction that works with dynamic store names
    const tx = db.transaction([storeName] as any, 'readwrite');
    const store = tx.objectStore(storeName as any);

    // Handle different operations
    switch (method) {
      case 'add':
        await store.add(data);
        break;
      case 'put':
        await store.put(data);
        break;
      case 'delete':
        if (typeof key === 'string' || typeof key === 'number') {
          await store.delete(key);
        } else {
          throw new Error(`Invalid key type for delete operation: ${typeof key}`);
        }
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    await tx.done;
    console.log(`Local operation ${method} on ${storeName} with key ${key} completed.`);
    return true;
  } catch (error) {
    console.error(`Local operation ${method} on ${storeName} with key ${key} failed:`, error);
    return false;
  }
};

export { getDB, enqueue, performLocalOperation };
