
import { TeamMember, Task } from "@/types/team";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    role: "admin",
    status: "online",
    performance: {
      chats: 28,
      satisfaction: 95,
      responseTime: "3m 45s",
      tasksCompleted: 12,
      pendingTasks: 3
    }
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    role: "admin", // Changed from "user" to "admin" since UserRole appears to only allow "admin"
    status: "online",
    performance: {
      chats: 22,
      satisfaction: 90,
      responseTime: "4m 20s",
      tasksCompleted: 10,
      pendingTasks: 2
    }
  },
  {
    id: "3",
    name: "Mariana Costa",
    email: "mariana.costa@empresa.com",
    role: "admin", // Changed from "user" to "admin"
    status: "busy",
    performance: {
      chats: 19,
      satisfaction: 88,
      responseTime: "5m 10s",
      tasksCompleted: 8,
      pendingTasks: 4
    }
  },
  {
    id: "4",
    name: "Pedro Santos",
    email: "pedro.santos@empresa.com",
    role: "admin", // Changed from "user" to "admin"
    status: "offline",
    performance: {
      chats: 15,
      satisfaction: 92,
      responseTime: "4m 50s",
      tasksCompleted: 7,
      pendingTasks: 3
    }
  }
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Responder dúvidas sobre devolução",
    description: "Cliente solicitou informações sobre política de devolução para produtos eletrônicos",
    dueDate: new Date(new Date().getTime() + 86400000), // Amanhã
    priority: "high",
    assignedTo: "1",
    status: "pending"
  },
  {
    id: "task2",
    title: "Resolver problema de pagamento",
    description: "Cliente não conseguiu finalizar compra com cartão de crédito",
    dueDate: new Date(new Date().getTime() + 172800000), // Dois dias
    priority: "medium",
    assignedTo: "2",
    status: "in-progress"
  },
  {
    id: "task3",
    title: "Acompanhar entrega atrasada",
    description: "Produto com entrega prevista para ontem ainda não foi entregue",
    dueDate: new Date(),
    priority: "high",
    assignedTo: "3",
    status: "pending"
  },
  {
    id: "task4",
    title: "Preparar relatório mensal",
    description: "Compilar dados de atendimento e satisfação do cliente para reunião",
    dueDate: new Date(new Date().getTime() + 259200000), // Três dias
    priority: "medium",
    assignedTo: "1",
    status: "pending"
  },
  {
    id: "task5",
    title: "Atualizar FAQ do site",
    description: "Adicionar novas perguntas frequentes sobre entregas e pagamentos",
    dueDate: new Date(new Date().getTime() + 345600000), // Quatro dias
    priority: "low",
    assignedTo: "4",
    status: "in-progress"
  }
];
