
import { PaymentLink } from "../../types/PaymentLinkTypes";

export const getMockLinks = (): PaymentLink[] => {
  return [
    {
      id: "pl_1",
      name: "Assinatura Mensal",
      description: "Plano mensal de acesso à plataforma",
      value: 9990, // Em centavos (R$ 99,90)
      currency: "BRL",
      status: "active",
      created: new Date(new Date().getTime() - 1000000000).toISOString(),
      expires: null,
      url: "https://pay.example.com/l/assinatura-mensal",
      uses: 127,
      maxUses: null,
      syncStatus: "synced"
    },
    {
      id: "pl_2",
      name: "Assinatura Anual",
      description: "Plano anual com 20% de desconto",
      value: 95900, // Em centavos (R$ 959,00)
      currency: "BRL",
      status: "active",
      created: new Date(new Date().getTime() - 800000000).toISOString(),
      expires: null,
      url: "https://pay.example.com/l/assinatura-anual",
      uses: 85,
      maxUses: null,
      syncStatus: "synced"
    },
    {
      id: "pl_3",
      name: "Pacote de 5.000 mensagens",
      description: "Crédito adicional para envio de mensagens",
      value: 19900, // Em centavos (R$ 199,00)
      currency: "BRL",
      status: "active",
      created: new Date(new Date().getTime() - 500000000).toISOString(),
      expires: null,
      url: "https://pay.example.com/l/pacote-mensagens",
      uses: 214,
      maxUses: null,
      syncStatus: "synced"
    },
    {
      id: "pl_4",
      name: "Consultoria Personalizada",
      description: "2 horas de consultoria com especialista",
      value: 49900, // Em centavos (R$ 499,00)
      currency: "BRL",
      status: "expired",
      created: new Date(new Date().getTime() - 300000000).toISOString(),
      expires: new Date(new Date().getTime() + 2592000000).toISOString(), // 30 dias no futuro
      url: "https://pay.example.com/l/consultoria",
      uses: 32,
      maxUses: 50,
      syncStatus: "synced"
    }
  ];
};
