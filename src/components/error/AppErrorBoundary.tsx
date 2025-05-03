import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error) => {
    // Aqui você pode implementar lógica para reportar erros a um serviço externo
    console.error("Erro global capturado:", error);
  };

  const AppErrorFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ops! Algo deu errado
        </h2>
        <p className="text-gray-600 mb-6">
          Encontramos um problema inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button
            variant="default"
            onClick={() => window.location.href = '/'}
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      onError={handleError}
      fallback={<AppErrorFallback />}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;