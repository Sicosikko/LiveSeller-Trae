import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export function useErrorHandler<T>(defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('Erro capturado:', error);
    
    let errorMessage = customMessage || 'Ocorreu um erro inesperado';
    
    if (error instanceof Error) {
      setError(error);
      errorMessage = error.message || errorMessage;
    } else {
      setError(new Error(errorMessage));
    }
    
    toast({
      title: 'Erro',
      description: errorMessage,
      variant: 'destructive',
    });
    
    return null;
  }, []);

  const execute = useCallback(async <R>(
    promise: Promise<R>,
    customErrorMessage?: string
  ): Promise<R | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await promise;
      return result;
    } catch (error) {
      return handleError(error, customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  return {
    data,
    setData,
    error,
    isLoading,
    execute,
    handleError
  };
}