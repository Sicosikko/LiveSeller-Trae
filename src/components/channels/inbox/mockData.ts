
import { Contact } from "../types/inboxTypes";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Maria Santos",
    message: "Olá, preciso de ajuda com meu pedido #12345",
    time: "09:45",
    channel: "whatsapp",
    unread: 2,
  },
  {
    id: "2",
    name: "João Silva",
    message: "Como faço para trocar meu produto?",
    time: "08:30",
    channel: "instagram",
    unread: 1,
  },
  {
    id: "3",
    name: "Ana Costa",
    message: "Ainda não recebi o código de rastreamento",
    time: "Ontem",
    channel: "whatsapp",
    unread: 0,
  },
  {
    id: "4",
    name: "Roberto Almeida",
    message: "Quais são as formas de pagamento disponíveis?",
    time: "Ontem",
    channel: "instagram",
    unread: 0,
  },
  {
    id: "5",
    name: "Carla Ferreira",
    message: "Vocês têm esse modelo em estoque?",
    time: "Segunda",
    channel: "whatsapp",
    unread: 0,
  }
];
