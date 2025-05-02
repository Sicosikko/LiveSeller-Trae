import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TwoFactorSettings from "./security/TwoFactorSettings";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Senha atual é obrigatória" }),
  newPassword: z.string().min(6, { message: "A nova senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SecuritySettings: React.FC = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionExpiry: "30",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, changePassword } = useAuth();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Verificar se o usuário tem 2FA ativo
    if (user?.factors && user.factors.length > 0) {
      setSecuritySettings(prev => ({
        ...prev,
        twoFactorAuth: true
      }));
    }
  }, [user]);

  const handleToggle2FA = () => {
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorAuth: !prev.twoFactorAuth
    }));
  };

  const handleSessionExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings(prev => ({
      ...prev,
      sessionExpiry: e.target.value
    }));
  };

  const saveSecuritySettings = () => {
    toast("Configurações de segurança atualizadas", {
      description: "Suas preferências de segurança foram salvas com sucesso."
    });
  };

  const updatePasswordHandler = async (values: PasswordFormValues) => {
    try {
      setIsLoading(true);
      // Fix: Only pass the new password to changePassword function
      const result = await changePassword(values.newPassword);
      
      if (!result.success) throw new Error(result.error);
      
      toast("Senha atualizada", {
        description: "Sua senha foi alterada com sucesso."
      });
      
      form.reset();
    } catch (error: any) {
      toast("Erro", {
        description: error.message || "Não foi possível alterar a senha"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Segurança da Conta</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações de segurança da sua conta
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <TwoFactorSettings 
            enabled={securitySettings.twoFactorAuth} 
            onToggle={handleToggle2FA} 
          />

          <div className="flex items-start gap-4">
            <KeyRound className="mt-1 h-6 w-6 text-muted-foreground" />
            <div className="space-y-1 flex-1">
              <Label htmlFor="session-expiry" className="text-base">Expiração da sessão</Label>
              <p className="text-sm text-muted-foreground">
                Defina por quanto tempo sua sessão permanecerá ativa sem atividade
              </p>
              <div className="w-full sm:w-1/3 mt-2">
                <Input
                  id="session-expiry"
                  type="number"
                  value={securitySettings.sessionExpiry}
                  onChange={handleSessionExpiryChange}
                  min="5"
                  max="120"
                />
                <p className="text-xs text-muted-foreground mt-1">Minutos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-md font-medium mb-4">Alterar senha</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updatePasswordHandler)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha atual</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nova senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Atualizando senha...
                  </>
                ) : (
                  "Atualizar senha"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <Button onClick={saveSecuritySettings} className="mt-6">
          Salvar configurações de segurança
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
