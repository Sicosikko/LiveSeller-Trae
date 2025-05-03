import { useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  expiry: number;
}

// Cache global para ser compartilhado entre diferentes instâncias do hook
const globalCache: Record<string, CacheItem<any>> = {};

export const useCache = () => {
  // Função para obter dados do cache
  const getCache = useCallback(<T>(key: string): T | null => {
    const item = globalCache[key];
    
    // Se o item não existir no cache, retornar null
    if (!item) {
      return null;
    }
    
    // Se o item expirou, remover do cache e retornar null
    if (Date.now() > item.expiry) {
      delete globalCache[key];
      return null;
    }
    
    // Retornar os dados do cache
    return item.data;
  }, []);
  
  // Função para definir dados no cache
  const setCache = useCallback(<T>(key: string, data: T, ttlMs: number = 60000) => {
    globalCache[key] = {
      data,
      expiry: Date.now() + ttlMs
    };
  }, []);
  
  // Função para limpar um item específico do cache
  const clearCache = useCallback((key: string) => {
    delete globalCache[key];
  }, []);
  
  // Função para limpar todo o cache
  const clearAllCache = useCallback(() => {
    Object.keys(globalCache).forEach(key => {
      delete globalCache[key];
    });
  }, []);
  
  return { getCache, setCache, clearCache, clearAllCache };
};