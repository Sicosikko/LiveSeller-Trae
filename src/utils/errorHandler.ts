import { toast } from "@/hooks/use-toast";

export class ApiError extends Error {
  public status: number;
  public errorCode?: string;
  
  constructor(message: string, status: number, errorCode?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorCode = errorCode;
  }
}

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    
    // Tentar extrair mensagem de erro da resposta
    let errorMessage = `Erro HTTP: ${response.status}`;
    let errorCode: string | undefined;
    
    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorCode = errorData.code;
      } catch (e) {
        console.error('Erro ao processar resposta de erro:', e);
      }
    }
    
    throw new ApiError(errorMessage, response.status, errorCode);
  }
  
  // Verificar o tipo de conteúdo da resposta
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  throw new ApiError('Resposta inesperada do servidor', response.status);
};

export const fetchWithErrorHandling = async <T>(
  url: string, 
  options?: RequestInit, 
  defaultErrorMessage: string = "Ocorreu um erro ao processar sua solicitação"
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    return await handleApiResponse<T>(response);
  } catch (error) {
    console.error(`Erro ao acessar ${url}:`, error);
    
    if (error instanceof ApiError) {
      toast({
        title: `Erro ${error.status}`,
        description: error.message,
        variant: "destructive"
      });
    } else if (error instanceof Error) {
      toast({
        title: "Erro",
        description: error.message || defaultErrorMessage,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Erro",
        description: defaultErrorMessage,
        variant: "destructive"
      });
    }
    
    throw error;
  }
};