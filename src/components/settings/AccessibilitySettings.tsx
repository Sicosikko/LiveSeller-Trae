
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { toast } from "sonner";
import { Loader, EyeIcon, ZapIcon, MousePointer } from "lucide-react";

const AccessibilitySettings: React.FC = () => {
  const { preferences, toggleAccessibility, syncing, updatePreferences } = useUserPreferences();
  const [fontSize, setFontSize] = React.useState(100);
  const [animationSpeed, setAnimationSpeed] = React.useState(100);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(preferences.accessibility?.highContrast || false);
  const [reducedMotion, setReducedMotion] = React.useState(preferences.accessibility?.reducedMotion || false);
  const [keyboardNavigation, setKeyboardNavigation] = React.useState(true);
  
  // Aplicar configurações de acessibilidade na montagem
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale', `${preferences.accessibility?.largeText ? 1.2 : 1}`
    );
    
    // Aplicar modo de alto contraste se necessário
    if (preferences.accessibility?.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Aplicar configurações de movimento reduzido
    if (preferences.accessibility?.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Inicializar estados locais com valores das preferências
    setHighContrast(preferences.accessibility?.highContrast || false);
    setReducedMotion(preferences.accessibility?.reducedMotion || false);
    
    // Definir tamanho da fonte inicial com base nas preferências
    setFontSize(preferences.accessibility?.largeText ? 120 : 100);
  }, [preferences.accessibility]);
  
  // Efeito para ajustar tamanho de fonte
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);
  
  // Efeito para ajustar velocidade de animações
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--animation-speed', `${animationSpeed / 100}`
    );
  }, [animationSpeed]);

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Calcular se o texto é grande com base no slider
    const isLargeText = fontSize > 110;
    
    // Atualizar preferências
    updatePreferences({
      accessibility: {
        largeText: isLargeText,
        highContrast,
        reducedMotion,
      }
    });
    
    // Simular um pequeno atraso para mostrar o indicador de carregamento
    setTimeout(() => {
      setIsLoading(false);
      
      // Aplicar configurações
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      if (reducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
      
      toast.success("Configurações de acessibilidade atualizadas", {
        description: "Suas preferências foram salvas e aplicadas."
      });
    }, 800);
  };

  // Função para lidar com alterações nos switches
  const handleToggleSwitch = (setting: 'highContrast' | 'reducedMotion' | 'keyboardNavigation', value: boolean) => {
    switch (setting) {
      case 'highContrast':
        setHighContrast(value);
        break;
      case 'reducedMotion':
        setReducedMotion(value);
        break;
      case 'keyboardNavigation':
        setKeyboardNavigation(value);
        
        // Aplicar diretamente a navegação por teclado aprimorada
        if (value) {
          document.documentElement.classList.add('keyboard-focus');
        } else {
          document.documentElement.classList.remove('keyboard-focus');
        }
        break;
    }
  };

  return (
    <div className="space-y-6" role="region" aria-label="Configurações de acessibilidade">
      <div>
        <h3 className="text-lg font-medium">Configurações de Acessibilidade</h3>
        <p className="text-sm text-muted-foreground">
          Personalize a aplicação para melhorar sua acessibilidade
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-md font-medium">Aparência</h4>
          
          <div className="space-y-2">
            <Label htmlFor="font-size">Tamanho da fonte: {fontSize}%</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">A</span>
              <Slider
                id="font-size"
                min={80}
                max={150}
                step={5}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="w-full"
              />
              <span className="text-lg">A</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ajuste o tamanho da fonte para facilitar a leitura
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast">Modo de alto contraste</Label>
              <p className="text-sm text-muted-foreground">
                Aumenta o contraste para melhor visualização
              </p>
            </div>
            <div className="flex items-center gap-2">
              <EyeIcon className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={(checked) => handleToggleSwitch('highContrast', checked)}
                aria-label="Ativar modo de alto contraste"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-md font-medium">Movimentos e Interações</h4>
          
          <div className="space-y-2">
            <Label htmlFor="animation-speed">Velocidade das animações: {animationSpeed}%</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Lento</span>
              <Slider
                id="animation-speed"
                min={50}
                max={150}
                step={10}
                value={[animationSpeed]}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                className="w-full"
              />
              <span className="text-sm">Rápido</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Controle a velocidade das animações na interface
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduced-motion">Movimentos reduzidos</Label>
              <p className="text-sm text-muted-foreground">
                Minimiza animações e efeitos de movimento
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MousePointer className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={(checked) => handleToggleSwitch('reducedMotion', checked)}
                aria-label="Ativar movimentos reduzidos"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-md font-medium">Navegação</h4>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="keyboard-navigation">Navegação por teclado aprimorada</Label>
              <p className="text-sm text-muted-foreground">
                Destaca elementos focados para melhor navegação por teclado
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ZapIcon className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="keyboard-navigation"
                checked={keyboardNavigation}
                onCheckedChange={(checked) => handleToggleSwitch('keyboardNavigation', checked)}
                aria-label="Ativar navegação por teclado aprimorada"
              />
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSaveSettings} 
        className="mt-4"
        disabled={isLoading || syncing}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          'Salvar alterações'
        )}
      </Button>
      
      <div className="border-t pt-4 mt-6">
        <h4 className="text-sm font-medium mb-2">Atalhos de teclado</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span>Navegar para o início</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + H</kbd>
          </div>
          <div className="flex justify-between">
            <span>Pesquisar</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + K</kbd>
          </div>
          <div className="flex justify-between">
            <span>Próxima seção</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd>
          </div>
          <div className="flex justify-between">
            <span>Seção anterior</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Shift + Tab</kbd>
          </div>
          <div className="flex justify-between">
            <span>Ajuda</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">F1</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
