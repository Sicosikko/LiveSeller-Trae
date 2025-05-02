
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  remember: z.boolean().default(false),
});

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const from = (location.state as any)?.from || "/dashboard";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: localStorage.getItem("rememberedEmail") || "",
      password: "",
      remember: !!localStorage.getItem("rememberedEmail"),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const result = await login(values.email, values.password);
      
      if (result.success) {
        // If remember me is checked, store the email
        if (values.remember) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        navigate(from);
      } else {
        toast({
          title: "Falha no login",
          description: result.error || "Verifique suas credenciais e tente novamente",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-bold text-[#1E3A8A]">LiveSeller</h1>
            </Link>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1E3A8A]">Entrar na sua conta</h1>
              <p className="text-sm text-gray-500 mt-1">
                Bem-vindo(a) de volta! Faça login para acessar sua conta.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Senha</FormLabel>
                        <Link to="/auth/forgot-password" className="text-sm text-[#1E3A8A] hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Lembrar de mim</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1E3A8A]"
                  disabled={isSubmitting || isLoading}
                >
                  {(isSubmitting || isLoading) ? (
                    <div className="flex items-center justify-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>Entrando...</span>
                    </div>
                  ) : "Entrar"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Ainda não tem uma conta?{" "}
                    <Link to="/auth/register" className="text-[#1E3A8A] hover:underline font-medium">
                      Criar conta
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Right side - Brand/Marketing */}
      <div className="hidden lg:flex lg:flex-1 bg-[#1E3A8A] text-white">
        <div className="w-full flex flex-col items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6">Entre para transformar seu processo de vendas</h2>
            <p className="text-lg mb-8 opacity-90">
              Acesse sua conta e comece a utilizar todas as funcionalidades do LiveSeller.
            </p>
            
            <div className="space-y-4">
              {[
                "Dashboard completo para análise de resultados",
                "Automações que funcionam 24h por dia",
                "Equipe colaborativa com permissões personalizadas",
                "Integrações com suas ferramentas favoritas"
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
                  Conheça nossos planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
