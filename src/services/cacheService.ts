import { FilterOptions } from "@/components/dashboard/AdvancedFilters";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string;
}

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes default TTL

  // Gerar uma chave de cache baseada nos filtros
  generateCacheKey(endpoint: string, filters?: FilterOptions): string {
    if (!filters) return endpoint;
    
    return `${endpoint}:${JSON.stringify(filters)}`;
  }

  // Obter dados do cache
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar se o cache expirou
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  // Armazenar dados no cache
  set<T>(key: string, data: T, options?: CacheOptions): void {
    const ttl = options?.ttl || this.defaultTTL;
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;
    
    this.cache.set(key, {
      data,
      timestamp,
      expiresAt
    });
  }

  // Limpar um item específico do cache
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  // Limpar todos os itens do cache
  clear(): void {
    this.cache.clear();
  }

  // Limpar itens expirados do cache
  clearExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    // Primeiro coletamos as chaves que precisam ser excluídas
    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key);
      }
    });
    
    // Depois excluímos as chaves
    keysToDelete.forEach(key => {
      this.cache.delete(key);
    });
  }

  // Verificar se um item está no cache e não expirou
  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) return false;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

// Exportar uma instância única do serviço de cache
export const cacheService = new CacheService();