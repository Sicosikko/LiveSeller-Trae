
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import {
  ArrowRight,
  MessageSquare,
  Users,
  LayoutDashboard,
  Zap,
  Bot,
  X
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Bem-vindo ao WhatzApp Flow CRM AI",
    description: "Vamos conhecer as principais funcionalidades da plataforma para você aproveitar ao máximo.",
    image: "/onboarding/welcome.png",
  },
  {
    id: 2,
    title: "Disparos em Massa",
    description: "Envie mensagens personalizadas para milhares de contatos de uma só vez, com segurança e sem bloqueios.",
    image: "/onboarding/mass-messages.png",
    route: "/mass-messages",
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "CRM Integrado",
    description: "Gerencie seus leads, oportunidades e clientes de forma integrada com o WhatsApp.",
    image: "/onboarding/crm.png",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 4,
    title: "Gerenciamento de Equipe",
    description: "Adicione membros da sua equipe e defina permissões de acesso ao sistema.",
    image: "/onboarding/team.png",
    route: "/team",
    icon: Users,
  },
  {
    id: 5,
    title: "Automações",
    description: "Crie fluxos de atendimento automatizados para qualificar leads e converter vendas.",
    image: "/onboarding/automations.png",
    route: "/automations",
    icon: Zap,
  },
  {
    id: 6,
    title: "Assistente com IA",
    description: "Use nosso assistente com inteligência artificial para responder perguntas frequentes.",
    image: "/onboarding/ai-assistant.png",
    route: "/ai-assistant",
    icon: Bot,
  }
];

const AdminOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('registerUserData');
    return savedData ? JSON.parse(savedData) : { name: '', company: '', plan: 'free' };
  });
  const navigate = useNavigate();
  const { setHasCompletedOnboarding } = useApp();
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const handleSkip = () => {
    completeOnboarding();
  };
  
  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setHasCompletedOnboarding(true);
    
    // Clean up registration data
    localStorage.removeItem('registerUserData');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10" 
          onClick={handleSkip}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-col md:flex-row">
          {/* Image side */}
          <div className="md:w-1/2 bg-[#1E3A8A]">
            <div className="h-full flex items-center justify-center p-8">
              {step.icon ? (
                <div className="text-white">
                  <step.icon className="w-32 h-32 opacity-90" />
                </div>
              ) : (
                <div className="text-center text-white">
                  <h1 className="text-3xl font-bold mb-4">Olá, {userData.name}!</h1>
                  <p className="text-lg opacity-80">
                    Vamos configurar o WhatzApp Flow CRM AI para {userData.company}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Content side */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">{step.title}</h2>
              <p className="text-gray-600 mt-2">{step.description}</p>
              
              {step.route && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="text-[#1E3A8A] border-[#1E3A8A]"
                    onClick={() => {
                      completeOnboarding();
                      navigate(step.route);
                    }}
                  >
                    Explorar agora
                  </Button>
                </div>
              )}
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-[#10B981] h-2 rounded-full" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={handleSkip}
              >
                Pular tutorial
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 flex items-center"
              >
                {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOnboarding;
