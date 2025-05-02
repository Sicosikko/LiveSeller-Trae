
// Este arquivo é responsável pelo registro do service worker
// e pela detecção do status offline

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      // Registra o service worker
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registrado com sucesso:', registration);
      
      // Configura eventos para monitorar atualizações
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Já existe um service worker mais antigo, podemos notificar o usuário
              console.log('Nova versão disponível! Recarregue para atualizar.');
              // Aqui poderíamos mostrar uma notificação para o usuário
            } else {
              // Primeira instalação
              console.log('Aplicação instalada e pronta para uso offline.');
            }
          }
        };
      };
    } catch (error) {
      console.error('Falha ao registrar o service worker:', error);
    }
  }
}

export async function getOfflineStatus(): Promise<boolean> {
  // Verificação básica de conexão
  const isOffline = !navigator.onLine;
  
  // Se estiver online, ainda podemos fazer uma verificação mais profunda
  // para garantir que temos acesso ao servidor
  if (!isOffline) {
    try {
      // Tenta buscar um recurso pequeno com um timestamp para evitar cache
      // Removendo a opção timeout que não é suportada pelo tipo RequestInit
      const response = await fetch(`/api/ping?t=${Date.now()}`, { 
        method: 'HEAD',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        },
        mode: 'no-cors',  // Isso permite que funcione mesmo com CORS restrito
        // Removido: timeout: 2000  
        signal: AbortSignal.timeout(2000) // Alternativa moderna para timeout
      });
      
      // Se conseguimos buscar o recurso, estamos online
      return false;
    } catch (e) {
      // Se não conseguimos buscar o recurso, provavelmente estamos offline
      console.log('Falha na verificação de conexão:', e);
      return true;
    }
  }
  
  return isOffline;
}

// Função para lidar com sincronização em background
export function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(registration => {
        // TypeScript não reconhece a API sync diretamente
        // Usamos uma abordagem segura para acessar 'sync'
        return (registration as any).sync?.register('syncData');
      })
      .catch(err => {
        console.error('Background sync falhou:', err);
      });
  }
}
