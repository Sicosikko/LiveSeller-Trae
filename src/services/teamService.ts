// Interfaces para os dados da equipe
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'vacation';
}

// Função para buscar membros da equipe
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  // Em uma implementação real, isso buscaria dados do backend
  // Por enquanto, retornamos dados simulados
  return [
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana.silva@example.com',
      role: 'Gerente',
      department: 'Vendas',
      avatar: '',
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@example.com',
      role: 'Atendente',
      department: 'Suporte',
      avatar: '',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mariana Costa',
      email: 'mariana.costa@example.com',
      role: 'Desenvolvedor',
      department: 'TI',
      avatar: '',
      status: 'vacation'
    }
  ];
};

// Função para adicionar um novo membro à equipe
export const addTeamMember = async (member: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
  // Simulação de adição de membro
  const newMember = {
    ...member,
    id: Date.now().toString()
  };
  
  console.log('Novo membro adicionado:', newMember);
  return newMember;
};

// Função para atualizar um membro da equipe
export const updateTeamMember = async (id: string, data: Partial<TeamMember>): Promise<TeamMember> => {
  // Simulação de atualização
  console.log(`Atualizando membro ${id}:`, data);
  
  // Em uma implementação real, isso atualizaria no backend
  return {
    id,
    name: data.name || 'Nome Atualizado',
    email: data.email || 'email@example.com',
    role: data.role || 'Função',
    department: data.department || 'Departamento',
    avatar: data.avatar || '',
    status: data.status || 'active'
  };
};