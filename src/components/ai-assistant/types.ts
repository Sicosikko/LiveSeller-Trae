
export interface ChatBot {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  interactions: number;
  satisfaction: number;
  lastUpdated: string;
  type: "chatbot" | "automation" | "hybrid";
  languages?: string[];
  aiModel?: string;
}

export const MOCK_BOTS: ChatBot[] = [
  {
    id: "1",
    name: "Atendente Virtual",
    description: "Chatbot para primeiro atendimento e coleta de informações básicas",
    status: "active",
    interactions: 2568,
    satisfaction: 92,
    lastUpdated: "2 dias atrás",
    type: "chatbot",
    languages: ["Português", "Inglês", "Espanhol"]
  },
  {
    id: "2",
    name: "Vendas B2B",
    description: "Chatbot especializado em qualificação de leads para vendas corporativas",
    status: "active",
    interactions: 1240,
    satisfaction: 89,
    lastUpdated: "5 dias atrás",
    type: "hybrid",
    languages: ["Português", "Inglês"]
  },
  {
    id: "3",
    name: "FAQ Helper",
    description: "Assistente para responder perguntas frequentes e direcionar para artigos da base de conhecimento",
    status: "active",
    interactions: 3450,
    satisfaction: 94,
    lastUpdated: "1 dia atrás",
    type: "chatbot",
    languages: ["Português"]
  },
  {
    id: "4",
    name: "Automação de Boas-vindas",
    description: "Mensagem inicial enviada quando um novo cliente inicia a conversa",
    status: "active",
    interactions: 4250,
    satisfaction: 97,
    lastUpdated: "3 dias atrás",
    type: "automation",
    languages: ["Português", "Inglês", "Espanhol"]
  },
  {
    id: "5",
    name: "Resposta de Ausência",
    description: "Mensagem enviada fora do horário de atendimento",
    status: "active",
    interactions: 1872,
    satisfaction: 91,
    lastUpdated: "1 semana atrás",
    type: "automation",
    languages: ["Português", "Inglês"]
  },
  {
    id: "6",
    name: "Promoções",
    description: "Chatbot para divulgação de ofertas e promoções",
    status: "draft",
    interactions: 0,
    satisfaction: 0,
    lastUpdated: "2 semanas atrás",
    type: "hybrid",
  },
];
