
type EventCallback = (...args: any[]) => void;

interface EventSubscription {
  unsubscribe: () => void;
}

/**
 * Sistema de barramento de eventos para comunicação entre componentes
 */
class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map();
  
  /**
   * Registra um ouvinte para um evento específico
   * @param event Nome do evento
   * @param callback Função a ser chamada quando o evento ocorrer
   * @returns Objeto com método para cancelar a inscrição
   */
  on(event: string, callback: EventCallback): EventSubscription {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    const callbacks = this.events.get(event)!;
    callbacks.add(callback);
    
    // Retornar objeto para cancelar a inscrição
    return {
      unsubscribe: () => {
        this.off(event, callback);
      }
    };
  }
  
  /**
   * Remove um ouvinte de um evento
   * @param event Nome do evento
   * @param callback Função a ser removida
   */
  off(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event)!;
    callbacks.delete(callback);
    
    // Se não houver mais callbacks, remover o evento
    if (callbacks.size === 0) {
      this.events.delete(event);
    }
  }
  
  /**
   * Dispara um evento com os argumentos fornecidos
   * @param event Nome do evento
   * @param args Argumentos a serem passados para os callbacks
   */
  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event)!;
    for (const callback of callbacks) {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Erro ao executar callback para evento "${event}":`, error);
      }
    }
  }
  
  /**
   * Registra um ouvinte que será chamado apenas uma vez
   * @param event Nome do evento
   * @param callback Função a ser chamada quando o evento ocorrer
   */
  once(event: string, callback: EventCallback): EventSubscription {
    const wrappedCallback = (...args: any[]) => {
      this.off(event, wrappedCallback);
      callback(...args);
    };
    
    return this.on(event, wrappedCallback);
  }
  
  /**
   * Remove todos os ouvintes para um evento específico ou para todos os eventos
   * @param event Nome do evento (opcional)
   */
  clear(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
  
  /**
   * Lista todos os eventos registrados
   * @returns Array com os nomes dos eventos
   */
  listEvents(): string[] {
    return Array.from(this.events.keys());
  }
  
  /**
   * Verifica se um evento tem ouvintes
   * @param event Nome do evento
   * @returns True se o evento tem ouvintes, false caso contrário
   */
  hasListeners(event: string): boolean {
    return this.events.has(event) && this.events.get(event)!.size > 0;
  }
}

// Exportar uma instância singleton
export const eventBus = new EventBus();
export default eventBus;
