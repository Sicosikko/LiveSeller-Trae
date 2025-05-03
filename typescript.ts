// Exemplo de implementação de serviço com melhor tratamento de erros
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Verificar o tipo de conteúdo da resposta
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Resposta inesperada do servidor: ${contentType}`);
    }
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    // Retornar um objeto vazio ou mock data para desenvolvimento
    return {};
  }
}