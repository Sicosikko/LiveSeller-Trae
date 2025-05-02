
# Guia de Manipulação de Dados - LiveSeller

## Objetivo
Este guia estabelece as melhores práticas para manipular dados na aplicação LiveSeller, especialmente focado em evitar o uso de dados fictícios ou placeholders no front-end.

## Princípios Gerais

1. **Dados Reais por Padrão**: Sempre prefira dados reais provenientes de APIs.
2. **Dados Mockados Realistas**: Quando for necessário usar dados mockados, crie dados que sejam realistas e representativos.
3. **Zero Placeholders em Produção**: Nunca deve haver placeholders ou texto Lorem Ipsum em ambientes de produção.
4. **Verificação Automatizada**: Utilize os scripts de verificação para detectar placeholders.

## Usando SelectValue Corretamente

O componente `SelectValue` deve sempre ter um conteúdo significativo:

```tsx
// Importando helpers
import { ensureSelectValue, getSelectValueDisplay } from '@/utils/selectUtils';

// Usando o helper para garantir um valor ou fallback
<SelectValue>{ensureSelectValue(selectedValue, "Selecione uma opção")}</SelectValue>

// Usando com opções dinâmicas
const options = [
  { value: 'pending', label: 'Pendente' },
  { value: 'completed', label: 'Concluído' }
];

<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Selecione um status">
      {getSelectValueDisplay(status, options, "Selecione um status").display}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {options.map(option => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

## Integrando com APIs

### 1. Estrutura de Serviços

Organize os serviços de API por domínio:

```
src/
  services/
    chat/
      chatService.ts
    payments/
      paymentService.ts
    team/
      teamService.ts
```

### 2. Exemplo de Implementação de Serviço

```typescript
// src/services/team/teamService.ts
import { TeamMember, Task } from '@/types/team';

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch('/api/team/members');
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Fallback para emergências (nunca em produção)
      return [];
    }
  },
  
  async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch('/api/team/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Fallback para emergências (nunca em produção)
      return [];
    }
  }
};
```

### 3. Usando o Serviço em Componentes

```typescript
import { useEffect, useState } from 'react';
import { teamService } from '@/services/team/teamService';
import { TeamMember } from '@/types/team';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadTeamMembers() {
      try {
        setLoading(true);
        const data = await teamService.getTeamMembers();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadTeamMembers();
  }, []);

  return { members, loading, error };
}
```

## Checklist de Qualidade de Dados

Antes de cada commit ou PR, verifique:

- [ ] Todos os dados mockados foram substituídos por dados realistas
- [ ] Não há texto Lorem Ipsum no código
- [ ] Todos os SelectValue têm conteúdo adequado
- [ ] Todos os estados iniciais de componentes têm valores razoáveis
- [ ] O script check-placeholders.js não detecta problemas

## Processo de Revisão

Durante a revisão de código:

1. Execute `npm run check:placeholders`
2. Verifique visualmente a aplicação em busca de conteúdo vazio
3. Teste os componentes Select para garantir que exibem valores adequados
4. Verifique se os dados exibidos são consistentes e realistas
