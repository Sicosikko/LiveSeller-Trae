import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sistema em Manutenção
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O sistema de login está temporariamente desativado para manutenção.
          </p>
          <p className="text-center text-sm text-gray-500 mt-4">
            Estamos trabalhando para resolver problemas com o serviço de email.
            O acesso será restaurado em breve.
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}