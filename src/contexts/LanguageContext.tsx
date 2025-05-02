
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import translations from '@/locales';

// Define tipos para os idiomas suportados
export type SupportedLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR';

// Interface do contexto
interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  getSupportedLanguages: () => { id: SupportedLanguage; name: string }[];
}

// Valores padrão do contexto
const defaultContext: LanguageContextType = {
  currentLanguage: 'pt-BR',
  setLanguage: () => {},
  t: (key: string) => key,
  getSupportedLanguages: () => [],
};

// Criar o contexto
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Hook personalizado para usar o contexto
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// Componente Provider
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Estado para armazenar o idioma atual
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('pt-BR');

  // Carregar idioma salvo ao inicializar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage as SupportedLanguage);
    }
  }, []);

  // Função para alterar o idioma
  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
    toast.success(`Idioma alterado para ${getSupportedLanguages().find(l => l.id === lang)?.name}`);
  };

  // Função para obter traduções
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (!translation || !translation[k]) {
        return key; // Retorna a chave se a tradução não for encontrada
      }
      translation = translation[k];
    }
    
    return translation;
  };

  // Função para obter idiomas suportados
  const getSupportedLanguages = (): { id: SupportedLanguage; name: string }[] => [
    { id: 'pt-BR', name: 'Português (Brasil)' },
    { id: 'en-US', name: 'English (US)' },
    { id: 'es-ES', name: 'Español' },
    { id: 'fr-FR', name: 'Français' },
  ];

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, getSupportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
