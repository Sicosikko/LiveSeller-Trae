
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const VerificationSent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-center">Verifique seu email</CardTitle>
          <CardDescription className="text-center">
            Enviamos um link de verificação para o seu email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Por favor, verifique sua caixa de entrada e clique no link de verificação para ativar sua conta.
            Se você não recebeu o email, verifique sua pasta de spam.
          </p>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Link to="/auth/login" className="w-full">
            <Button variant="outline" className="w-full">
              Voltar para o login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationSent;
