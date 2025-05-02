import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { usePayment } from "@/hooks/use-payment";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

export type PlanId = 'free' | 'basic' | 'pro' | 'enterprise';

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  description: string;
  price: number | null;
  billingPeriod: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  limitDescription?: string;
  priceDescription?: string;
}

const PricingPlans: React.FC = () => {
  const { startPayment } = usePayment();
  const { toast } = useToast();
  const { isAuthenticated } = useApp();
  
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Ideal para começar seu negócio online',
      price: 0,
      billingPeriod: 'para sempre',
      buttonText: 'Começar Grátis',
      limitDescription: 'Até 5 atendimentos por dia',
      features: [
        { name: 'Atendimentos via WhatsApp', included: true, limit: '5/dia' },
        { name: 'Mensagens automáticas', included: true, limit: '3' },
        { name: 'Catálogo básico', included: true, limit: '10 produtos' },
        { name: 'Relatórios simples', included: true },
        { name: 'Suporte via email', included: true },
        { name: 'Integrações', included: false },
        { name: 'Automação de vendas', included: false },
        { name: 'Múltiplos atendentes', included: false },
      ]
    },
    {
      id: 'basic',
      name: 'Básico',
      description: 'Perfeito para pequenos negócios',
      price: 49.90,
      billingPeriod: 'por mês',
      buttonText: 'Assinar Agora',
      popular: true,
      features: [
        { name: 'Atendimentos via WhatsApp', included: true, limit: '100/dia' },
        { name: 'Mensagens automáticas', included: true, limit: '10' },
        { name: 'Catálogo completo', included: true, limit: '100 produtos' },
        { name: 'Relatórios avançados', included: true },
        { name: 'Suporte por chat', included: true },
        { name: 'Integrações básicas', included: true, limit: '3' },
        { name: 'Automação de vendas', included: true },
        { name: 'Múltiplos atendentes', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Ideal para negócios em crescimento',
      price: 99.90,
      billingPeriod: 'por mês',
      buttonText: 'Assinar Pro',
      features: [
        { name: 'Atendimentos via WhatsApp', included: true, limit: 'Ilimitado' },
        { name: 'Mensagens automáticas', included: true, limit: '30' },
        { name: 'Catálogo completo', included: true, limit: 'Ilimitado' },
        { name: 'Relatórios avançados', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'Integrações avançadas', included: true, limit: '10' },
        { name: 'Automação de vendas', included: true },
        { name: 'Até 5 atendentes', included: true },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Para grandes operações',
      price: null,
      priceDescription: 'Personalizado',
      billingPeriod: 'sob consulta',
      buttonText: 'Contatar Vendas',
      features: [
        { name: 'Atendimentos via WhatsApp', included: true, limit: 'Ilimitado' },
        { name: 'Mensagens automáticas', included: true, limit: 'Ilimitado' },
        { name: 'Catálogo completo', included: true, limit: 'Ilimitado' },
        { name: 'Relatórios personalizados', included: true },
        { name: 'Suporte dedicado', included: true },
        { name: 'Integrações avançadas', included: true, limit: 'Ilimitado' },
        { name: 'Automação de vendas', included: true },
        { name: 'Atendentes ilimitados', included: true },
      ]
    }
  ];

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'free') {
      toast("Plano Gratuito Ativado", {
        description: "Você pode começar a usar o LiveSeller agora mesmo!"
      });
      return;
    }
    
    if (plan.id === 'enterprise') {
      toast("Entre em Contato", {
        description: "Nossa equipe comercial entrará em contato para personalizar sua solução."
      });
      return;
    }
    
    if (!isAuthenticated) {
      toast("Login Necessário", {
        description: "Faça login para assinar este plano."
      });
      return;
    }
    
    startPayment(plan.id);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Planos e Preços</h2>
        <p className="text-lg text-muted-foreground mt-4">
          Escolha o plano ideal para o seu negócio
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              {plan.popular && (
                <Badge className="w-fit mb-2">Mais Popular</Badge>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                {plan.price !== null ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{plan.billingPeriod}
                    </span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold">{plan.priceDescription}</div>
                )}
                {plan.limitDescription && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.limitDescription}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-3 mt-1">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="block h-4 w-4 rounded-full border-2"></span>
                      )}
                    </div>
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.name}
                      {feature.limit && feature.included && (
                        <span className="text-sm text-muted-foreground ml-1">
                          ({feature.limit})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectPlan(plan)} 
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-medium mb-4">Experimente gratuitamente e decida depois</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Todos os planos pagos incluem um período de teste gratuito de 7 dias. 
          Cancele a qualquer momento sem compromisso.
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
