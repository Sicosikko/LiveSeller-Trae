
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home } from "lucide-react";

interface AccessDeniedProps {
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ 
  message = "Você não tem permissões suficientes para acessar esta página."
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-destructive/10 p-3 rounded-full">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl">Acesso Restrito</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-4">
          <p className="text-muted-foreground">{message}</p>
          <p className="mt-2 text-muted-foreground">
            Se você acredita que deveria ter acesso, entre em contato com o administrador do sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="default" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Voltar para o Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccessDenied;
