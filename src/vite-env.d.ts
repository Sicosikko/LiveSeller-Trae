
/// <reference types="vite/client" />

// Adicionar tipos para o service worker
interface ServiceWorkerGlobalScope {
  skipWaiting(): Promise<void>;
  clients: Clients;
}

interface Clients {
  claim(): Promise<void>;
  matchAll(options?: ClientMatchOptions): Promise<Client[]>;
}

interface ClientMatchOptions {
  includeUncontrolled?: boolean;
  type?: 'window' | 'worker' | 'sharedworker' | 'all';
}

interface Client {
  url: string;
  focus?(): Promise<Client>;
  postMessage(message: any): void;
}

interface SyncEvent extends ExtendableEvent {
  tag: string;
}

interface PushEvent extends ExtendableEvent {
  data?: {
    json(): any;
    text(): string;
  };
}

interface NotificationEvent extends ExtendableEvent {
  notification: Notification & {
    data?: any;
    close(): void;
  };
}
