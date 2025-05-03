import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamPerformance from '../TeamPerformance';
import { useTeamPerformance } from '@/services/dashboardService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Mock dos hooks
jest.mock('@/services/dashboardService', () => ({
  useTeamPerformance: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

// Mock do toast
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn()
}));

// Mock do componente RefreshCw
jest.mock('lucide-react', () => ({
  RefreshCw: () => <div data-testid="refresh-icon" />
}));

describe('TeamPerformance', () => {
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();
  const mockRefetch = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useToast as any).mockReturnValue({ toast: mockToast });
  });
  
  test('deve renderizar o estado de carregamento corretamente', () => {
    (useTeamPerformance as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: mockRefetch
    });
    
    render(<TeamPerformance />);
    
    expect(screen.getByText('Desempenho da Equipe')).toBeInTheDocument();
    // Verificar se os skeletons estão presentes
    const skeletons = document.querySelectorAll('[data-testid="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('deve renderizar mensagem de erro quando não há dados', () => {
    (useTeamPerformance as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: mockRefetch
    });

    render(<TeamPerformance />);
    
    expect(screen.getByText('Dados de desempenho indisponíveis')).toBeInTheDocument();
    expect(screen.getByText('Ver página da equipe')).toBeInTheDocument();
  });

  test('deve renderizar mensagem de erro quando ocorre um erro explícito', () => {
    (useTeamPerformance as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Erro ao carregar dados'),
      refetch: mockRefetch
    });

    render(<TeamPerformance />);
    
    expect(screen.getByText('Dados de desempenho indisponíveis')).toBeInTheDocument();
    expect(screen.getByText('Ver página da equipe')).toBeInTheDocument();
  });

  test('deve renderizar os dados da equipe corretamente', () => {
    const mockData = [
      {
        id: '1',
        name: 'Ana Silva',
        role: 'Atendente',
        avatar: '',
        chats: 24,
        satisfaction: 95
      },
      {
        id: '2',
        name: 'João Santos',
        role: 'Vendedor',
        avatar: '',
        chats: 18,
        satisfaction: 88
      }
    ];

    (useTeamPerformance as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: mockRefetch
    });

    render(<TeamPerformance />);
    
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('João Santos')).toBeInTheDocument();
    expect(screen.getByText('24 atendimentos')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  test('deve navegar para a página da equipe ao clicar no botão', async () => {
    (useTeamPerformance as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: mockRefetch
    });

    render(<TeamPerformance />);
    const button = screen.getByText('Ver página da equipe');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/team');
      expect(mockToast).toHaveBeenCalled();
    });
  });

  test('deve chamar refetch ao clicar no botão de atualizar', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Ana Silva',
        role: 'Atendente',
        avatar: '',
        chats: 24,
        satisfaction: 95
      }
    ];

    (useTeamPerformance as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: mockRefetch
    });

    render(<TeamPerformance />);
    const refreshButton = screen.getByLabelText('Atualizar');
    fireEvent.click(refreshButton);
    
    expect(mockRefetch).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalled();
  });
});