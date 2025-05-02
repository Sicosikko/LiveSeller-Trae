
import { UserRole } from "@/components/team/RoleSelector";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
  avatarUrl?: string;
  phone?: string;
  hireDate?: string;
  position?: string;
  managerId?: string;
}

export const departments = ["Todos", "Gestão", "Vendas", "Suporte", "Marketing", "TI", "Financeiro", "RH"];

export const initialEmployeesData: Employee[] = [
  { 
    id: "1",
    name: "Ana Silva", 
    email: "ana.silva@example.com",
    role: "admin", 
    department: "Gestão",
    status: "active",
    lastLogin: "Hoje, 10:42",
    permissions: ["all"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Ana",
    position: "Diretora Executiva",
    hireDate: "2022-01-15"
  },
  { 
    id: "2",
    name: "Carlos Oliveira", 
    email: "carlos.oliveira@example.com",
    role: "vendedor", 
    department: "Vendas",
    status: "active",
    lastLogin: "Hoje, 09:15",
    permissions: ["chat_access", "leads", "dispatch"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Carlos",
    position: "Executivo de Vendas",
    hireDate: "2022-03-21",
    managerId: "7"
  },
  { 
    id: "3",
    name: "Mariana Costa", 
    email: "mariana.costa@example.com",
    role: "atendente", 
    department: "Suporte",
    status: "active",
    lastLogin: "Hoje, 08:30",
    permissions: ["chat_access", "transfers"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mariana",
    phone: "(11) 98765-4321",
    position: "Atendente Sênior",
    hireDate: "2022-04-10",
    managerId: "1"
  },
  { 
    id: "4",
    name: "Pedro Santos", 
    email: "pedro.santos@example.com",
    role: "vendedor", 
    department: "Vendas",
    status: "active",
    lastLogin: "Ontem, 17:22",
    permissions: ["chat_access", "leads", "dispatch"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Pedro",
    position: "Consultor de Vendas",
    hireDate: "2022-07-05",
    managerId: "7"
  },
  { 
    id: "5",
    name: "Juliana Martins", 
    email: "juliana.martins@example.com",
    role: "atendente", 
    department: "Suporte",
    status: "active",
    lastLogin: "Hoje, 11:05",
    permissions: ["chat_access", "transfers"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Juliana",
    position: "Especialista em Suporte",
    hireDate: "2022-09-12",
    managerId: "1"
  },
  { 
    id: "6",
    name: "Rodrigo Lima", 
    email: "rodrigo.lima@example.com",
    role: "editor", 
    department: "Marketing",
    status: "inactive",
    lastLogin: "3 dias atrás",
    permissions: ["chatbot_edit", "content"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Rodrigo",
    position: "Designer de Conteúdo",
    hireDate: "2023-01-20"
  },
  { 
    id: "7",
    name: "Fernanda Silva", 
    email: "fernanda.silva@example.com",
    role: "admin", 
    department: "Gestão",
    status: "active",
    lastLogin: "Hoje, 08:10",
    permissions: ["all"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Fernanda",
    position: "Gerente de Operações",
    hireDate: "2022-02-15"
  },
  {
    id: "8",
    name: "Lucas Mendes",
    email: "lucas.mendes@example.com",
    role: "editor",
    department: "Marketing",
    status: "active",
    lastLogin: "Hoje, 09:45",
    permissions: ["chatbot_edit", "content", "social_media"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lucas",
    position: "Gerente de Marketing Digital",
    hireDate: "2022-11-03"
  },
  {
    id: "9",
    name: "Camila Ferreira",
    email: "camila.ferreira@example.com",
    role: "atendente",
    department: "Suporte",
    status: "active",
    lastLogin: "Ontem, 16:20",
    permissions: ["chat_access", "transfers", "knowledge_base"],
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Camila",
    position: "Analista de Suporte Técnico",
    hireDate: "2023-02-15",
    managerId: "3"
  }
];

// Utility functions for employee data validation
export const validateEmployeeData = (employee: Partial<Employee>): {isValid: boolean; errors: string[]} => {
  const errors: string[] = [];
  
  if (!employee.name || employee.name.trim() === '') {
    errors.push("Nome é obrigatório");
  }
  
  if (!employee.email || employee.email.trim() === '') {
    errors.push("Email é obrigatório");
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employee.email)) {
      errors.push("Formato de email inválido");
    }
  }
  
  if (!employee.role) {
    errors.push("Função é obrigatória");
  }
  
  if (!employee.department) {
    errors.push("Departamento é obrigatório");
  }
  
  // Validação de telefone (opcional)
  if (employee.phone) {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(employee.phone)) {
      errors.push("Formato de telefone inválido. Use: (99) 99999-9999");
    }
  }
  
  // Validação de data de contratação (opcional)
  if (employee.hireDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(employee.hireDate)) {
      errors.push("Formato de data inválido. Use: AAAA-MM-DD");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to create a safe copy of an employee
export const cloneEmployee = (employee: Employee): Employee => {
  return JSON.parse(JSON.stringify(employee));
};

// Generate avatar URL for employee
export const generateAvatarUrl = (name: string): string => {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(name)}`;
};

// Function to format date from ISO format to local format
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDate;
  }
};

// Function to get employee manager name
export const getManagerName = (managerId: string | undefined, employees: Employee[]): string => {
  if (!managerId) return 'Não atribuído';
  
  const manager = employees.find(emp => emp.id === managerId);
  return manager ? manager.name : 'Não encontrado';
};

// Function to get available managers (typically admins and senior roles)
export const getAvailableManagers = (employees: Employee[], currentEmployeeId?: string): Employee[] => {
  return employees.filter(emp => 
    // Exclude the current employee (can't manage themselves)
    emp.id !== currentEmployeeId && 
    // Include admins and managers
    (emp.role === 'admin' || emp.position?.toLowerCase().includes('gerente') || emp.position?.toLowerCase().includes('diretor'))
  );
};
