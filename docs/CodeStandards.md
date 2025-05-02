
# Padrões de Código - LiveSeller

## Padrões para Componentes de UI

### SelectValue
Todos os componentes `SelectValue` devem seguir estas diretrizes:

1. **Nunca use string vazia** - Todo `SelectValue` deve ter um texto descritivo ou um placeholder apropriado.
   ```tsx
   // ❌ Errado
   <SelectValue />
   <SelectValue>{selectedValue}</SelectValue> // selectedValue pode ser vazio

   // ✅ Correto
   <SelectValue placeholder="Selecione uma opção" />
   <SelectValue>{ensureSelectValue(selectedValue)}</SelectValue>
   ```

2. **Use placeholders informativos** - O placeholder deve descrever claramente o que o usuário deve selecionar.
   ```tsx
   // ❌ Errado
   <SelectValue placeholder="Selecione" />

   // ✅ Correto
   <SelectValue placeholder="Selecione um status" />
   <SelectValue placeholder="Escolha um departamento" />
   ```

3. **Utilize os utilitários** - Use as funções auxiliares do arquivo `src/utils/selectUtils.ts` para garantir valores válidos.
   ```tsx
   import { ensureSelectValue } from '@/utils/selectUtils';
   
   // ✅ Correto
   <SelectValue>{ensureSelectValue(status, "Selecione um status")}</SelectValue>
   ```

4. **Tratamento de valores dinâmicos** - Ao usar valores dinâmicos, sempre forneça um fallback.
   ```tsx
   // ✅ Exemplo completo
   <Select value={status} onValueChange={setStatus}>
     <SelectTrigger>
       <SelectValue placeholder="Selecione um status">
         {getSelectValueDisplay(status, statusOptions, "Selecione um status").display}
       </SelectValue>
     </SelectTrigger>
     <SelectContent>
       {statusOptions.map(option => (
         <SelectItem key={option.value} value={option.value}>
           {option.label}
         </SelectItem>
       ))}
     </SelectContent>
   </Select>
   ```

## Evitando Dados Fictícios

1. **Remova todos os placeholders** antes do deploy.
2. **Use dados realistas** em desenvolvimento.
3. **Implemente testes automatizados** para detectar textos fictícios.
4. **Utilize serviços de API** sempre que possível, em vez de dados mockados.

## Processos de Revisão de Código

### Checklist de Pull Request

- [ ] Todos os `SelectValue` têm conteúdo ou placeholder adequado
- [ ] Nenhum texto Lorem Ipsum ou dados fictícios óbvios
- [ ] Os testes de validação de UI passam sem falhas
- [ ] Integração com APIs implementada onde necessário
- [ ] Documentação atualizada conforme necessário

## Integração com APIs Reais

1. Crie serviços de API dedicados para cada domínio.
2. Use estruturas de fallback para lidar com falhas de API.
3. Implemente cache quando apropriado.
4. Documente os endpoints e parâmetros esperados.
