import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TeamPerformance from "../../../components/dashboard/TeamPerformance";
import { fetchTeamPerformance } from "../../../services/dashboardService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/ui/use-toast";
import { RefreshCw } from "lucide-react";

// Mock dos hooks e funções
jest.mock("../../../services/dashboardService", () => ({
  fetchTeamPerformance: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

jest.mock("../../../components/ui/use-toast", () => ({
  useToast: jest.fn()
}));

// Adicionando mock para o componente RefreshCw
jest.mock("lucide-react", () => ({
  RefreshCw: () => <div data-testid="refresh-icon" />
}));

describe("TeamPerformance", () => {
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  test("deve renderizar o estado de carregamento corretamente", () => {
    // Arrange
    (fetchTeamPerformance as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve([]), 1000))
    );

    // Act
    render(<TeamPerformance />);
    
    // Assert
    expect(screen.getByText("Desempenho da Equipe")).toBeInTheDocument();
    // Verificar se os skeletons estão presentes
    const skeletons = document.querySelectorAll('[data-testid="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("deve renderizar mensagem de erro quando não há dados", async () => {
    // Arrange
    (fetchTeamPerformance as jest.Mock).mockResolvedValue([]);

    // Act
    render(<TeamPerformance />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText("Dados de desempenho indisponíveis")).toBeInTheDocument();
      expect(screen.getByText("Ver página da equipe")).toBeInTheDocument();
    });
  });

  test("deve renderizar mensagem de erro quando ocorre um erro explícito", async () => {
    // Arrange
    (fetchTeamPerformance as jest.Mock).mockRejectedValue(new Error("Erro ao carregar dados"));

    // Act
    render(<TeamPerformance />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText("Dados de desempenho indisponíveis")).toBeInTheDocument();
      expect(screen.getByText("Ver página da equipe")).toBeInTheDocument();
    });
  });

  test("deve renderizar os dados da equipe corretamente", async () => {
    // Arrange
    const mockData = [
      {
        id: "1",
        name: "Ana Silva",
        role: "Atendente",
        avatar: "",
        chats: 24,
        satisfaction: 95
      },
      {
        id: "2",
        name: "João Santos",
        role: "Vendedor",
        avatar: "",
        chats: 18,
        satisfaction: 88
      }
    ];

    (fetchTeamPerformance as jest.Mock).mockResolvedValue(mockData);

    // Act
    render(<TeamPerformance />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText("Ana Silva")).toBeInTheDocument();
      expect(screen.getByText("João Santos")).toBeInTheDocument();
      expect(screen.getByText("24 atendimentos")).toBeInTheDocument();
      expect(screen.getByText("95%")).toBeInTheDocument();
    });
  });

  test("deve navegar para a página da equipe ao clicar no botão", async () => {
    // Arrange
    (fetchTeamPerformance as jest.Mock).mockResolvedValue([]);

    // Act
    render(<TeamPerformance />);
    
    await waitFor(() => {
      const button = screen.getByText("Ver página da equipe");
      fireEvent.click(button);
    });
    
    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/team");
    expect(mockToast).toHaveBeenCalled();
  });

  test("deve chamar refetch ao clicar no botão de atualizar", async () => {
    // Arrange
    const mockData = [
      {
        id: "1",
        name: "Ana Silva",
        role: "Atendente",
        avatar: "",
        chats: 24,
        satisfaction: 95
      }
    ];

    (fetchTeamPerformance as jest.Mock).mockResolvedValue(mockData);

    // Act
    render(<TeamPerformance />);
    
    await waitFor(() => {
      const refreshButton = screen.getByLabelText("Atualizar");
      fireEvent.click(refreshButton);
    });
    
    // Assert
    expect(fetchTeamPerformance).toHaveBeenCalledTimes(2); // Uma vez na montagem, outra no clique
    expect(mockToast).toHaveBeenCalled();
  });
});