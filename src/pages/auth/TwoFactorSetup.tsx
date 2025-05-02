
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setupMFA, verifyMFA } from "@/services/auth/authService";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

interface TOTPData {
  id: string;
  qr_code: string;
  secret?: string;
  uri?: string;
}

const TwoFactorSetup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const setupTwoFactor = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await setupMFA();
        
        if (error) throw error;
        
        if (data) {
          setFactorId(data.id);
          setQrCode(data.totp.qr_code);
        }
      } catch (error: any) {
        toast({
          title: "Erro ao configurar 2FA",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    setupTwoFactor();
  }, [toast]);

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      
      if (!factorId || !verificationCode) {
        throw new Error("Informações de verificação incompletas");
      }
      
      // Primeiro cria um desafio para obter o challengeId
      const { data, error } = await verifyMFA(factorId, "", verificationCode);
      
      if (error) throw error;
      
      toast({
        title: "Autenticação de dois fatores ativada",
        description: "Sua conta agora está mais segura com 2FA",
        variant: "default"
      });
      
      navigate("/settings");
    } catch (error: any) {
      toast({
        title: "Erro na verificação",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Configurar autenticação de dois fatores</CardTitle>
          <CardDescription className="text-center">
            Escaneie o QR code com o seu aplicativo autenticador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {qrCode && (
                <div className="flex justify-center py-4">
                  <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Código de verificação</label>
                <Input
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/settings")} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleVerify} disabled={isLoading || !verificationCode}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              "Verificar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TwoFactorSetup;
