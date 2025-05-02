
// Utilitários para melhorar a acessibilidade conforme padrões WCAG
import * as React from 'react';

/**
 * Verifica se o contraste entre duas cores é adequado para acessibilidade
 * @param foreground Cor do texto (formato hex)
 * @param background Cor do fundo (formato hex)
 * @returns Objeto com informações de contraste e conformidade WCAG
 */
export function checkColorContrast(foreground: string, background: string) {
  const getLuminance = (hex: string): number => {
    // Remover # se existir
    const color = hex.startsWith('#') ? hex.slice(1) : hex;
    
    // Converter para RGB
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    
    // Converter RGB para luminância relativa
    const rgb = [r, g, b].map(value => {
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  
  const foregroundLuminance = getLuminance(foreground);
  const backgroundLuminance = getLuminance(background);
  
  // Calcular razão de contraste
  const contrast = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / 
                  (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
  
  return {
    contrast,
    isAA: contrast >= 4.5,
    isAAA: contrast >= 7,
    isLargeTextAA: contrast >= 3,
    isLargeTextAAA: contrast >= 4.5
  };
}

/**
 * Converte tamanho em pixels para rem
 * @param px Tamanho em pixels
 * @returns Tamanho em rem
 */
export function pxToRem(px: number): string {
  const baseFontSize = 16; // Padrão do navegador
  return `${px / baseFontSize}rem`;
}

/**
 * Gera atributos ARIA para componentes de interface
 * @param role Role ARIA do elemento
 * @param label Label descritiva para leitores de tela
 * @param expanded Estado de expansão (para menus, dialogs, etc)
 * @param controls ID do elemento controlado
 */
export function ariaAttributes(
  role?: string,
  label?: string,
  expanded?: boolean,
  controls?: string
) {
  const attributes: Record<string, string | boolean> = {};
  
  if (role) attributes['role'] = role;
  if (label) attributes['aria-label'] = label;
  if (expanded !== undefined) attributes['aria-expanded'] = expanded;
  if (controls) attributes['aria-controls'] = controls;
  
  return attributes;
}

/**
 * Gera um ID único para elementos acessíveis
 * @param prefix Prefixo para o ID
 * @returns ID único com o prefixo especificado
 */
export function generateAccessibleId(prefix = 'accessible'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Verifica se o usuário está navegando com teclado
 * @returns Hook de navegação por teclado
 */
export function useKeyboardNavigation() {
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = React.useState(false);
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsNavigatingWithKeyboard(true);
        document.body.classList.add('keyboard-navigation');
      }
    };
    
    const handleMouseDown = () => {
      setIsNavigatingWithKeyboard(false);
      document.body.classList.remove('keyboard-navigation');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  return isNavigatingWithKeyboard;
}
