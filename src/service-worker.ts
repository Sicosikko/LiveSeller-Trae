
/// <reference lib="webworker" />
import { 
  handleInstall, 
  handleActivate, 
  handleFetch, 
  handleSync, 
  handlePush, 
  handleNotificationClick 
} from './service-worker/handlers/eventHandlers';

declare const self: ServiceWorkerGlobalScope;

// Registrar event handlers
self.addEventListener('install', handleInstall);
self.addEventListener('activate', handleActivate);
self.addEventListener('fetch', handleFetch);
self.addEventListener('sync', handleSync);
self.addEventListener('push', handlePush);
self.addEventListener('notificationclick', handleNotificationClick);
