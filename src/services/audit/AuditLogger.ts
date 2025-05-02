
type ActionType = 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout' | 'export';
type ResourceType = 'user' | 'campaign' | 'message' | 'chatbot' | 'setting' | 'payment' | 'user-profile';
type Status = 'success' | 'failure' | 'pending';

export class AuditLogger {
  static async logAction(
    action: ActionType,
    resourceType: ResourceType,
    details: Record<string, any>,
    status: Status = 'success'
  ): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const userId = localStorage.getItem('userId') || 'anonymous';
      
      const logEntry = {
        timestamp,
        userId,
        action,
        resourceType,
        details,
        status,
        userAgent: navigator.userAgent
      };
      
      // Em um ambiente de produção, enviaríamos para um servidor
      // Por enquanto, apenas salvamos no localStorage e console
      console.info('Audit Log:', logEntry);
      
      // Salvar os logs no localStorage (limitados a 100 entradas)
      const currentLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
      currentLogs.unshift(logEntry);
      if (currentLogs.length > 100) {
        currentLogs.pop();
      }
      localStorage.setItem('auditLogs', JSON.stringify(currentLogs));
      
      // Em um ambiente real, enviaríamos para um serviço de backend
      // await fetch('/api/audit-logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry),
      // });
    } catch (error) {
      console.error('Error logging audit trail:', error);
    }
  }
  
  static async getAuditLogs(
    filters: Partial<{
      resourceType: ResourceType,
      action: ActionType,
      status: Status,
      startDate: Date,
      endDate: Date
    }> = {}
  ): Promise<any[]> {
    try {
      // Buscar logs do localStorage para demonstração
      const allLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
      
      // Aplicar filtros
      const filteredLogs = allLogs.filter((log: any) => {
        let matchesFilter = true;
        
        if (filters.resourceType && log.resourceType !== filters.resourceType) {
          matchesFilter = false;
        }
        
        if (filters.action && log.action !== filters.action) {
          matchesFilter = false;
        }
        
        if (filters.status && log.status !== filters.status) {
          matchesFilter = false;
        }
        
        if (filters.startDate && new Date(log.timestamp) < filters.startDate) {
          matchesFilter = false;
        }
        
        if (filters.endDate && new Date(log.timestamp) > filters.endDate) {
          matchesFilter = false;
        }
        
        return matchesFilter;
      });
      
      return filteredLogs;
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  }
}
