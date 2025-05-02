
// Nome do cache para recursos estáticos
export const CACHE_NAME = 'whatzapp-flow-crm-ai-v1';

// Lista de recursos para serem armazenados em cache
export const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/public/favicon.ico',
];

// Inicializar o cache com recursos estáticos
export async function populateCache(): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(STATIC_RESOURCES);
}

// Limpar caches antigos
export async function cleanOldCaches(): Promise<void> {
  const keyList = await caches.keys();
  
  await Promise.all(
    keyList.map(key => {
      if (key !== CACHE_NAME) {
        return caches.delete(key);
      }
      return Promise.resolve();
    })
  );
}

// Estratégia de cache: rede primeiro, fallback para cache
export async function networkFirstStrategy(request: Request): Promise<Response> {
  try {
    // Tentar rede primeiro
    const networkResponse = await fetch(request);
    
    // Armazenar em cache se foi bem-sucedido
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Se falhar, tentar cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/index.html') as Promise<Response>;
    }
    
    // Último recurso: retornar erro
    return new Response('Offline', { 
      status: 503, 
      statusText: 'Serviço indisponível' 
    });
  }
}

// Verificar se a requisição deve ser processada pelo cache
export function shouldHandleWithCache(request: Request): boolean {
  // Ignorar requisições que não sejam GET
  if (request.method !== 'GET') return false;
  
  // Ignorar requisições de API
  if (request.url.includes('/api/')) return false;
  
  return true;
}
