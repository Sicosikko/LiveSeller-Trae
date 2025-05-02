import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, RefreshCw, ExternalLink, X } from "lucide-react";

interface WebViewProps {
  initialUrl?: string;
  height?: string | number;
  allowNavigation?: boolean;
  onClose?: () => void;
}

const WebView: React.FC<WebViewProps> = ({
  initialUrl = "https://www.google.com",
  height = 600,
  allowNavigation = true,
  onClose
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const handleNavigate = () => {
    // Adicionar protocolo se não existir
    let navigateUrl = url;
    if (!navigateUrl.startsWith('http://') && !navigateUrl.startsWith('https://')) {
      navigateUrl = 'https://' + navigateUrl;
      setUrl(navigateUrl);
    }
    
    setCurrentUrl(navigateUrl);
    
    // Atualizar histórico
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(navigateUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };
  
  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
      setUrl(history[historyIndex - 1]);
    }
  };
  
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(history[historyIndex + 1]);
      setUrl(history[historyIndex + 1]);
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };
  
  const handleOpenExternal = () => {
    window.open(currentUrl, '_blank');
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Resetar estado de carregamento quando a URL mudar
    setIsLoading(true);
  }, [currentUrl]);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">WebView</CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          Visualizador de conteúdo web integrado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleBack} 
            disabled={historyIndex <= 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleForward} 
            disabled={historyIndex >= history.length - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            onKeyDown={handleKeyPress}
            placeholder="Digite uma URL"
            className="flex-1"
          />
          <Button 
            variant="default" 
            onClick={handleNavigate}
          >
            Ir
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleOpenExternal}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        
        <div 
          className="relative rounded border overflow-hidden"
          style={{ height: typeof height === 'number' ? `${height}px` : height }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <iframe 
            ref={iframeRef}
            src={currentUrl} 
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title="WebView"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-amber-500' : 'bg-green-500'}`}></div>
          {isLoading ? 'Carregando...' : 'Carregado'}
        </div>
        <div className="ml-auto">
          URL: {currentUrl}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WebView;