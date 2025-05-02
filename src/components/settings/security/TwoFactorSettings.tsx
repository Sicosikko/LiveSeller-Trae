
import React, { useState } from "react";
import { Shield, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface TwoFactorSettingsProps {
  enabled: boolean;
  onToggle: () => void;
}

const TwoFactorSettings: React.FC<TwoFactorSettingsProps> = ({ 
  enabled, 
  onToggle 
}) => {
  const { setupTwoFactor, verifyTwoFactorCode } = useAuth();
  const { toast } = useToast();
  const [setupOpen, setSetupOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableTwoFactor = async () => {
    setIsLoading(true);
    try {
      const result = await setupTwoFactor();
      if (result.success && result.data) {
        setQrCode(result.data.totp.qr_code);
        setFactorId(result.data.id);
        setSetupOpen(true);
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível iniciar a configuração 2FA",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erro ao configurar 2FA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verifyCode || verifyCode.length !== 6) {
      toast({
        title: "Código inválido",
        description: "Por favor, insira um código de 6 dígitos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyTwoFactorCode(factorId, "challenge-id", verifyCode);
      if (result.success) {
        toast({
          title: "2FA ativado",
          description: "Autenticação de dois fatores configurada com sucesso",
        });
        setSetupOpen(false);
        onToggle();
      } else {
        toast({
          title: "Código inválido",
          description: "O código inserido não é válido",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-start gap-4">
        <Shield className="mt-1 h-6 w-6 text-muted-foreground" />
        <div className="space-y-1 flex-1">
          <Label htmlFor="two-factor" className="text-base">Autenticação de dois fatores</Label>
          <p className="text-sm text-muted-foreground">
            Proteja sua conta com uma camada adicional de segurança.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Switch 
              id="two-factor" 
              checked={enabled} 
              onCheckedChange={enabled ? onToggle : handleEnableTwoFactor} 
            />
            <Label htmlFor="two-factor">
              {enabled ? "Ativado" : "Desativado"}
            </Label>
          </div>
        </div>
      </div>

      <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar autenticação de dois fatores</DialogTitle>
            <DialogDescription>
              Escaneie o código QR abaixo com o aplicativo autenticador no seu celular.
            </DialogDescription>
          </DialogHeader>
          
          {qrCode && (
            <div className="flex justify-center p-4">
              <Card className="p-4 border-2 inline-block">
                <CardContent className="p-0">
                  <img src={qrCode} alt="QR Code para 2FA" className="w-64 h-64" />
                </CardContent>
              </Card>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de verificação</Label>
            <Input 
              id="verification-code"
              placeholder="Digite o código de 6 dígitos"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              maxLength={6}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSetupOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleVerifyCode} 
              disabled={isLoading || verifyCode.length !== 6}
            >
              {isLoading ? "Verificando..." : "Verificar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TwoFactorSettings;
