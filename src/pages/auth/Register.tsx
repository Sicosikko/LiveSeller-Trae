
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-bold text-[#1E3A8A]">WhatzApp Flow CRM AI</h1>
            </Link>
          </div>
          
          <RegisterForm />
        </div>
      </div>
      
      {/* Right side - Brand/Marketing */}
      <div className="hidden lg:flex lg:flex-1 bg-[#1E3A8A] text-white">
        <div className="w-full flex flex-col items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6">Transforme seu WhatsApp em uma máquina de vendas</h2>
            <p className="text-lg mb-8 opacity-90">
              Entre para milhares de empresas que já estão utilizando nossa plataforma para melhorar seus resultados.
            </p>
            
            <div className="space-y-4">
              {[
                "Envio de mensagens em massa",
                "CRM integrado ao WhatsApp",
                "Chatbot com inteligência artificial",
                "Automações personalizadas"
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#10B981]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Link to="/">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                  Saiba mais sobre nossos planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
