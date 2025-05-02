
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

// Define os tipos de variantes para os testes
export type TestVariant = 'A' | 'B';

export interface ABTest {
  id: string;
  name: string;
  description: string;
  variant: TestVariant;
  active: boolean;
}

interface ABTestContextType {
  tests: ABTest[];
  getVariant: (testId: string) => TestVariant | null;
  trackConversion: (testId: string) => void;
  isInTest: (testId: string) => boolean;
}

const ABTestContext = createContext<ABTestContextType>({
  tests: [],
  getVariant: () => null,
  trackConversion: () => {},
  isInTest: () => false
});

export const useABTest = () => useContext(ABTestContext);

interface ABTestProviderProps {
  children: React.ReactNode;
}

export const ABTestProvider: React.FC<ABTestProviderProps> = ({ children }) => {
  const { isConnected } = useApp();
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: 'onboarding-flow',
      name: 'Fluxo de Onboarding',
      description: 'Testa diferentes fluxos de onboarding para novos usuários',
      variant: Math.random() > 0.5 ? 'A' : 'B',
      active: true
    },
    {
      id: 'pricing-display',
      name: 'Exibição de Preços',
      description: 'Testa diferentes layouts de exibição de preços',
      variant: Math.random() > 0.5 ? 'A' : 'B',
      active: true
    },
    {
      id: 'cta-color',
      name: 'Cor dos Botões CTA',
      description: 'Testa diferentes cores para botões de chamada à ação',
      variant: Math.random() > 0.5 ? 'A' : 'B',
      active: true
    }
  ]);

  // Salvar testes e conversões quando houver conexão
  useEffect(() => {
    if (isConnected) {
      // Aqui iríamos enviar dados para o backend via WebSocket
      console.log('Testes A/B disponíveis para sincronização', tests);
    }
  }, [isConnected, tests]);

  // Pegar variante de teste para um ID específico
  const getVariant = (testId: string): TestVariant | null => {
    const test = tests.find(t => t.id === testId && t.active);
    return test ? test.variant : null;
  };

  // Verificar se usuário está em um determinado teste
  const isInTest = (testId: string): boolean => {
    return tests.some(t => t.id === testId && t.active);
  };

  // Registrar uma conversão para um teste específico
  const trackConversion = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    
    if (test && isConnected) {
      console.log(`Conversão registrada para teste: ${testId}, variante: ${test.variant}`);
      
      // Aqui enviaríamos dados da conversão para o backend
      const conversionData = {
        testId,
        variant: test.variant,
        timestamp: new Date().toISOString()
      };
      
      // Simular envio para o backend
      console.log('Dados de conversão:', conversionData);
    }
  };

  return (
    <ABTestContext.Provider
      value={{
        tests,
        getVariant,
        trackConversion,
        isInTest
      }}
    >
      {children}
    </ABTestContext.Provider>
  );
};
