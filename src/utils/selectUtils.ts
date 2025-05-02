
/**
 * Utilitário para padronização de componentes Select
 * 
 * Estes helpers garantem que todos os SelectValue tenham um valor ou placeholder adequado
 */

/**
 * Verifica se um valor de select é válido
 * @param value O valor a ser verificado
 * @param defaultPlaceholder O placeholder padrão caso o valor seja inválido
 * @returns O valor se válido ou um placeholder apropriado
 */
export const ensureSelectValue = (
  value: string | undefined | null,
  defaultPlaceholder: string = "Selecione uma opção"
): string => {
  if (value === undefined || value === null || value === "") {
    return defaultPlaceholder;
  }
  return value;
};

/**
 * Garante que um componente SelectValue sempre tenha conteúdo
 * Função auxiliar para formatação de valores em componentes Select
 * @param value O valor atual do select
 * @param options Opções disponíveis para o select
 * @param placeholder O placeholder a ser exibido quando não houver valor selecionado
 * @returns Um objeto com o valor formatado e texto a ser exibido
 */
export const getSelectValueDisplay = (
  value: string | undefined,
  options: { value: string; label: string }[],
  placeholder: string = "Selecione uma opção"
): { value: string; display: string } => {
  if (!value) {
    return { value: "", display: placeholder };
  }
  
  const option = options.find(opt => opt.value === value);
  return {
    value,
    display: option ? option.label : placeholder
  };
};
