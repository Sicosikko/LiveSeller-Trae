import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Registrar o erro
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    
    // Chamar callback de erro se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Renderizar fallback personalizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Fallback padrão
      return (
        <div className="p-6 rounded-lg border border-red-200 bg-red-50 flex flex-col items-center justify-center space-y-4 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-red-700">Algo deu errado</h2>
          <p className="text-red-600 max-w-md">
            Ocorreu um erro inesperado neste componente. Tente recarregar a página ou entre em contato com o suporte se o problema persistir.
          </p>
          <div className="flex space-x-4 mt-4">
            <Button 
              variant="outline" 
              onClick={this.resetErrorBoundary}
            >
              Tentar novamente
            </Button>
            <Button 
              variant="default"
              onClick={() => window.location.reload()}
            >
              Recarregar página
            </Button>
          </div>
          {this.state.error && (
            <details className="mt-4 text-left w-full">
              <summary className="cursor-pointer text-sm text-red-600">Detalhes técnicos</summary>
              <pre className="mt-2 p-4 bg-red-100 rounded text-xs overflow-auto">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;