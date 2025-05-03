import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, ArrowUpRight, Bot, TrendingUp, Clock, ArrowDownRight, Loader2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ExportReportButton } from "./ExportReportButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Interface atualizada para incluir period opcional
interface OverviewDashboardProps {
  dateRange: {
    from: Date;
    to?: Date;
    period?: string;
  };
}

// Dados de exemplo para os gráficos
const messageData = [
  { name: "Seg", total: 150, whatsapp: 120, sms: 30 },
  { name: "Ter", total: 180, whatsapp: 140, sms: 40 },
  { name: "Qua", total: 250, whatsapp: 200, sms: 50 },
  { name: "Qui", total: 220, whatsapp: 170, sms: 50 },
  { name: "Sex", total: 280, whatsapp: 220, sms: 60 },
  { name: "Sáb", total: 160, whatsapp: 130, sms: 30 },
  { name: "Dom", total: 120, whatsapp: 100, sms: 20 },
];

const conversionData = [
  { name: "Seg", taxa: 23 },
  { name: "Ter", taxa: 28 },
  { name: "Qua", taxa: 35 },
  { name: "Qui", taxa: 32 },
  { name: "Sex", taxa: 38 },
  { name: "Sáb", taxa: 25 },
  { name: "Dom", taxa: 20 },
];

const clientDistribution = [
  { name: "Ativos", value: 65, color: "#10B981" },
  { name: "Inativos", value: 25, color: "#6B7280" },
  { name: "Novos", value: 10, color: "#1E3A8A" },
];

const COLORS = ["#10B981", "#6B7280", "#1E3A8A", "#F59E0B"];

// Hooks personalizados para substituir os hooks não definidos
const useDashboardMetrics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setData({
        messages: {
          today: 325,
          change: {
            positive: true,
            value: "12%"
          },
          progress: 75
        }
      });
      setIsLoading(false);
    }, 1000);

    return () => {};
  }, []);

  return { data, isLoading };
};

const useActivityData = (period: string = 'week') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setData(messageData);
      setIsLoading(false);
    }, 800);

    return () => {};
  }, [period]);

  return { data: messageData, isLoading };
};

const useClientDistribution = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setData(clientDistribution);
      setIsLoading(false);
    }, 600);

    return () => {};
  }, []);

  return { data: clientDistribution, isLoading };
};

const useConversionData = (period: string = 'week') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setData(conversionData);
      setIsLoading(false);
    }, 700);

    return () => {};
  }, [period]);

  return { data: conversionData, isLoading };
};

const useAIInsights = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setData({
        insights: [
          {
            title: "Oportunidade de Conversão",
            description: "O horário com maior taxa de conversão é entre 14h e 16h. Considere programar mais campanhas neste período."
          },
          {
            title: "Análise de Engajamento",
            description: "Clientes respondem mais às mensagens com imagens. Aumente o uso de elementos visuais em suas campanhas."
          },
          {
            title: "Previsão de Crescimento",
            description: "Com base nas tendências atuais, espera-se um aumento de 15% no volume de mensagens no próximo mês."
          }
        ]
      });
      setIsLoading(false);
    }, 900);

    return () => {};
  }, []);

  return { data, isLoading };
};

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ dateRange }) => {
  const { toast } = useToast();
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: messageData, isLoading: messageDataLoading } = useActivityData(dateRange?.period || 'week');
  const { data: clientDistribution, isLoading: clientDistLoading } = useClientDistribution();
  const { data: conversionData, isLoading: conversionLoading } = useConversionData(dateRange?.period || 'week');
  const { data: insights, isLoading: insightsLoading } = useAIInsights();
  
  const isLoading = metricsLoading || messageDataLoading || clientDistLoading || conversionLoading || insightsLoading;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando dados do dashboard...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Mensagens Hoje</CardDescription>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">{metrics?.messages?.today || 0}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <span className={cn(
                "font-medium inline-flex items-center",
                metrics?.messages?.change?.positive ? "text-emerald-500" : "text-red-500"
              )}>
                {metrics?.messages?.change?.positive ? 
                  <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                }
                {metrics?.messages?.change?.value || "0%"}
              </span>
              <span className="ml-1">vs. período anterior</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={metrics?.messages?.progress || 0} className="h-1" />
          </CardFooter>
        </Card>
        
        // ... existing code ...
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mensagens por Canal</CardTitle>
                <CardDescription>Últimos 7 dias</CardDescription>
              </div>
              <ExportReportButton data={messageData} reportName="mensagens-por-canal" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="whatsapp" 
                    stackId="a" 
                    name="WhatsApp" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="sms" 
                    stackId="a" 
                    name="SMS" 
                    fill="#1E3A8A" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        // ... existing code ...
      </div>
      
      // ... existing code ...
    </div>
  );
};

export default OverviewDashboard;