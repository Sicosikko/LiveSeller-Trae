
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, MessageSquare, X } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Bem-vindo ao WhatzApp Flow CRM AI",
    description: "Este é um guia rápido para ajudar você a começar a usar a plataforma.",
    image: "/onboarding/welcome.png",
  },
  {
    id: 2,
    title: "Seu Painel",
    description: "No painel principal, você terá acesso às suas tarefas, mensagens e atendimentos pendentes.",
    image: "/onboarding/dashboard.png",
  },
  {
    id: 3,
    title: "Atendimento ao Cliente",
    description: "Você pode atender clientes diretamente pelo WhatsApp através desta plataforma.",
    image: "/onboarding/customer-service.png",
  }
];

const EmployeeOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    navigate('/dashboard');
  };
  
  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10" 
          onClick={handleSkip}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-[#1E3A8A] p-4 rounded-full">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
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
              Pular
            </Button>
            
            <Button 
              onClick={handleNext}
              className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 flex items-center"
            >
              {currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOnboarding;
