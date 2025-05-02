
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

type TutorialStep = {
  title: string;
  description: React.ReactNode;
  image?: string;
};

interface OnboardingTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Bem-vindo ao WhatzApp Flow CRM AI",
      description: (
        <div className="space-y-2">
          <p>
            Este tutorial irá guiá-lo pelos principais recursos da nossa plataforma,
            projetada para otimizar sua comunicação e gestão de clientes.
          </p>
          <p>
            Vamos melhorar seu atendimento com inteligência artificial, automação
            e ferramentas de pagamento integradas.
          </p>
        </div>
      ),
      image: "/onboarding/welcome.svg"
    },
    {
      title: "Mensagens e Integrações",
      description: (
        <div className="space-y-2">
          <p>
            Conecte múltiplos canais de WhatsApp e gerencie todas as conversas
            em um único lugar. Nossa plataforma suporta grandes volumes de 
            mensagens simultâneas.
          </p>
          <p>
            Todas as mensagens são protegidas com criptografia de ponta a ponta,
            garantindo total segurança e conformidade com LGPD e GDPR.
          </p>
        </div>
      ),
      image: "/onboarding/messages.svg"
    },
    {
      title: "Assistente de IA",
      description: (
        <div className="space-y-2">
          <p>
            Nosso assistente de IA pode responder perguntas frequentes, 
            qualificar leads e dar suporte 24/7 aos seus clientes.
          </p>
          <p>
            Configure respostas personalizadas e deixe a IA cuidar do
            atendimento inicial, liberando sua equipe para tarefas mais complexas.
          </p>
        </div>
      ),
      image: "/onboarding/ai-assistant.svg"
    },
    {
      title: "Pagamentos Integrados",
      description: (
        <div className="space-y-2">
          <p>
            Receba pagamentos diretamente pelo WhatsApp com nossa solução integrada
            que suporta PIX, PayPal, PagSeguro, Mercado Pago, cartões de crédito e 
            carteiras digitais.
          </p>
          <p>
            Gere links de pagamento automaticamente durante atendimentos e
            acompanhe o status em tempo real.
          </p>
        </div>
      ),
      image: "/onboarding/payments.svg"
    },
    {
      title: "Acesse de Qualquer Dispositivo",
      description: (
        <div className="space-y-2">
          <p>
            O WhatzApp Flow CRM AI está disponível em qualquer dispositivo:
          </p>
          <ul className="list-disc pl-5">
            <li>Aplicativo web</li>
            <li>Aplicativos móveis para iOS e Android</li>
            <li>Aplicativos desktop para Windows e macOS</li>
          </ul>
          <p>
            Baixe nossos aplicativos na página de Downloads para uma experiência
            completa.
          </p>
        </div>
      ),
      image: "/onboarding/multi-platform.svg"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    } else {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((completedSteps.length) / tutorialSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl mx-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{tutorialSteps[currentStep].title}</span>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Pular tutorial
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {tutorialSteps[currentStep].image && (
              <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center">
                <div className="bg-muted rounded-lg p-4 w-full aspect-square flex items-center justify-center">
                  <img 
                    src={tutorialSteps[currentStep].image} 
                    alt={tutorialSteps[currentStep].title} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            )}
            <div className={tutorialSteps[currentStep].image ? "w-full md:w-2/3" : "w-full"}>
              <div className="prose max-w-none">
                {tutorialSteps[currentStep].description}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Passo {currentStep + 1} de {tutorialSteps.length}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}% concluído
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-between pt-2">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                </Button>
              </div>
              <Button
                onClick={handleNext}
                size="sm"
                className="gap-1"
              >
                {currentStep === tutorialSteps.length - 1 ? (
                  <>
                    Concluir <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Próximo <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex space-x-1">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : completedSteps.includes(index)
                    ? "bg-primary/40"
                    : "bg-muted"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
