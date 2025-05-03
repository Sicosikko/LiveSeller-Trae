// Interfaces para os dados do calendário
export interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  createdBy: string;
  createdAt: Date;
}

// Funções para gerenciar compromissos
export const fetchAppointments = async (): Promise<Appointment[]> => {
  // Em uma implementação real, isso buscaria dados do backend
  // Por enquanto, retornamos dados simulados
  return [
    {
      id: '1',
      title: 'Reunião com Cliente',
      description: 'Discussão sobre novos requisitos do projeto',
      startTime: new Date(Date.now() + 3600000), // 1 hora no futuro
      endTime: new Date(Date.now() + 7200000), // 2 horas no futuro
      attendees: ['user1@example.com', 'client@example.com'],
      location: 'Sala de Conferência Virtual',
      status: 'scheduled',
      createdBy: 'user1@example.com',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Treinamento da Equipe',
      description: 'Treinamento sobre novas funcionalidades',
      startTime: new Date(Date.now() + 86400000), // 1 dia no futuro
      endTime: new Date(Date.now() + 93600000), // 1 dia e 2 horas no futuro
      attendees: ['team@example.com'],
      location: 'Sala de Treinamento',
      status: 'scheduled',
      createdBy: 'manager@example.com',
      createdAt: new Date()
    }
  ];
};

// Função para enviar lembretes de compromissos
export const sendAppointmentReminder = async (appointmentId: string): Promise<boolean> => {
  // Simulação de envio de lembrete
  console.log(`Enviando lembrete para o compromisso ${appointmentId}`);
  return true;
};

// Função para enviar detalhes de compromissos
export const sendAppointmentDetails = async (appointmentId: string, email: string): Promise<boolean> => {
  // Simulação de envio de detalhes
  console.log(`Enviando detalhes do compromisso ${appointmentId} para ${email}`);
  return true;
};