import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeDollarSign, Users, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AffiliatePromotion: React.FC = () => {
  const { toast } = useToast();
  
  const handleLearnMore = () => {
    // This would typically navigate to the affiliate page
    toast("Programa de Afiliados", {
      description: 'Redirecionando para a página de afiliados...'
    });
  };
  
  return (
    <section className="py-16 px-4 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ganhe dinheiro como <br />
              <span className="text-primary">afiliado LiveSeller</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-md">
              Você é um influenciador, criador de conteúdo ou tem um público relevante? 
              Torne-se um afiliado e ganhe comissões pelas assinaturas através dos seus links.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BadgeDollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Comissão de 30%</h4>
                  <p className="text-sm text-muted-foreground">Recorrente em cada renovação de assinatura</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Dashboard de Afiliado</h4>
                  <p className="text-sm text-muted-foreground">Acompanhe conversões, pagamentos e desempenho</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Link className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Links Personalizados</h4>
                  <p className="text-sm text-muted-foreground">Crie links com sua marca para suas campanhas</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleLearnMore} className="group">
                Saiba mais sobre o programa
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="bg-muted rounded-xl p-8 border shadow-sm">
            <div className="space-y-6">
              <div className="bg-primary/10 p-3 rounded-full w-fit">
                <BadgeDollarSign className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold">Programa para YouTubers e Influenciadores</h3>
              
              <p className="text-muted-foreground">
                É criador de conteúdo sobre marketing digital, vendas ou WhatsApp? 
                Temos um programa especial para você experimentar o LiveSeller e 
                gerar receita recorrente como afiliado.
              </p>
              
              <div className="bg-background rounded-lg p-4 border">
                <h4 className="font-medium mb-2">Benefícios exclusivos:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Conta Pro gratuita por 3 meses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Comissão diferenciada de 40%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Suporte prioritário via WhatsApp</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full">Quero ser um influenciador parceiro</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatePromotion;
