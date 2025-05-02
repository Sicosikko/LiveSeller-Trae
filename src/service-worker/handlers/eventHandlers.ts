
import { 
  populateCache, 
  cleanOldCaches, 
  shouldHandleWithCache, 
  networkFirstStrategy 
} from '../cache/cacheStrategies';
import { 
  syncMessages, 
  syncPaymentLinks,
  syncAuditLogs,
  syncGenericStore
} from '../sync/syncOperations';
import { SYNC_STORES } from '../db/indexedDB';

// Need to access ServiceWorkerGlobalScope
declare const self: ServiceWorkerGlobalScope;

// Handler para evento install
export async function handleInstall(event: ExtendableEvent): Promise<void> {
  // Armazenar recursos estáticos em cache e ativar o service worker
  event.waitUntil(
    populateCache()
      .then(() => self.skipWaiting())
  );
}

// Handler para evento activate
export async function handleActivate(event: ExtendableEvent): Promise<void> {
  // Limpar caches antigos e tomar controle dos clientes
  event.waitUntil(
    cleanOldCaches()
      .then(() => self.clients.claim())
  );
}

// Handler para evento fetch
export function handleFetch(event: FetchEvent): void {
  // Se a requisição não deve ser tratada pelo cache, ignorar
  if (!shouldHandleWithCache(event.request)) return;
  
  // Aplicar estratégia de cache
  event.respondWith(networkFirstStrategy(event.request));
}

// Handler para evento sync
export function handleSync(event: SyncEvent): void {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  } else if (event.tag === 'sync-payment-links') {
    event.waitUntil(syncPaymentLinks());
  } else if (event.tag === 'sync-audit-logs') {
    event.waitUntil(syncAuditLogs());
  } else if (event.tag.startsWith('sync-')) {
    // Sincronização genérica para outras stores
    const storeToSync = event.tag.replace('sync-', '');
    if (SYNC_STORES.includes(storeToSync)) {
      event.waitUntil(syncGenericStore(storeToSync));
    }
  }
}

// Handler para evento push
export function handlePush(event: PushEvent): void {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const title = data.title || "WhatzApp Flow CRM AI";
    const options = {
      body: data.body || "Nova notificação recebida",
      icon: data.icon || "/public/favicon.ico",
      badge: data.badge || "/public/favicon.ico",
      tag: data.tag || "default",
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (err) {
    console.error('Erro ao processar notificação push:', err);
  }
}

// Handler para evento notificationclick
export function handleNotificationClick(event: NotificationEvent): void {
  event.notification.close();
  
  const notificationData = event.notification.data;
  const urlToOpen = notificationData.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Verificar se já tem uma janela aberta
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            // Return client.focus(), but then do nothing with the result
            return client.focus().then(() => {
              // Return void to satisfy the type constraint
              return;
            });
          }
        }
        
        // Se não tiver, abrir uma nova
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen).then(() => {
            // Return void to satisfy the type constraint
            return;
          });
        }
        
        return Promise.resolve();
      })
  );
}
