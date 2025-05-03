
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, MessageSquare, ArrowUpRight, Bot, Clock, Loader2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchCompanyOverview, fetchOperationalStatus } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";

const companyOverviewData = [
  {
    name: "Jan",
    atendimentos: 400,
    conversao: 240,
    novosClientes: 180,
  },
  {
    name: "Fev",
    atendimentos: 450,
    conversao: 260,
    novosClientes: 190,
  },
  {
    name: "Mar",
    atendimentos: 520,
    conversao: 310,
    novosClientes: 220,
  },
  {
    name: "Abr",
    atendimentos: 480,
    conversao: 290,
    novosClientes: 200,
  },
  {
    name: "Mai",
    atendimentos: 590,
    conversao: 350,
    novosClientes: 260,
  },
  {
    name: "Jun",
    atendimentos: 620,
    conversao: 380,
    novosClientes: 290,
  },
];

const AdminOverview = () => {
  const [companyOverviewData, setCompanyOverviewData] = useState([]);
  const [clientsTotal, setClientsTotal] = useState(0);
  const [clientsGrowth, setClientsGrowth] = useState(0);
  const [revenue, setRevenue] = useState("");
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionGrowth, setConversionGrowth] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState("");
  const [responseTimeChange, setResponseTimeChange] = useState(0);
  const [teamStatus, setTeamStatus] = useState(null);
  const [chatStatus, setChatStatus] = useState(null);
  const [botStatus, setBotStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadOverviewData = async () => {
      setIsLoading(true);
      try {
        // Carregar dados gerais da empresa
        const overviewData = await fetchCompanyOverview();
        setCompanyOverviewData(overviewData.chartData);
        setClientsTotal(overviewData.metrics.clientsTotal);
        setClientsGrowth(overviewData.metrics.clientsGrowth);
        setRevenue(overviewData.metrics.revenue);
        setRevenueGrowth(overviewData.metrics.revenueGrowth);
        setConversionRate(overviewData.metrics.conversionRate);
        setConversionGrowth(overviewData.metrics.conversionGrowth);
        setAvgResponseTime(overviewData.metrics.avgResponseTime);
        setResponseTimeChange(overviewData.metrics.responseTimeChange);
        
        // Carregar status operacional
        const statusData = await fetchOperationalStatus();
        setTeamStatus(statusData.team);
        setChatStatus(statusData.chats);
        setBotStatus(statusData.bots);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do painel administrativo.",
          variant: "destructive"
        });
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOverviewData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando dados administrativos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Clientes</CardDescription>
            <CardTitle className="text-4xl font-bold">{clientsTotal.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+{clientsGrowth}%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Faturamento Mensal</CardDescription>
            <CardTitle className="text-4xl font-bold">{revenue}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+{revenueGrowth}%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taxa de Conversão</CardDescription>
            <CardTitle className="text-4xl font-bold">{conversionRate}%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+{conversionGrowth}%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tempo Médio de Atendimento</CardDescription>
            <CardTitle className="text-4xl font-bold">{avgResponseTime}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4 text-amber-500" />
              <span className="text-amber-500 font-medium">{responseTimeChange}%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visão Geral da Empresa</CardTitle>
            <CardDescription>Métricas principais dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyOverviewData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="atendimentos" name="Atendimentos" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversao" name="Conversões" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="novosClientes" name="Novos Clientes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Status Operacional</CardTitle>
            <CardDescription>Informações em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Equipe</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Online</span>
                      <span className="font-semibold">{teamStatus?.online} / {teamStatus?.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Em atendimento</span>
                      <span className="font-semibold">{teamStatus?.inService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Em pausa</span>
                      <span className="font-semibold">{teamStatus?.onPause}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Atendimentos</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Em andamento</span>
                      <span className="font-semibold">{chatStatus?.inProgress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Na fila</span>
                      <span className="font-semibold">{chatStatus?.inQueue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Concluídos hoje</span>
                      <span className="font-semibold">{chatStatus?.completedToday}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Chatbots</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ativos</span>
                      <span className="font-semibold">{botStatus?.active} / {botStatus?.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversas</span>
                      <span className="font-semibold">{botStatus?.conversations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de resolução</span>
                      <span className="font-semibold">{botStatus?.resolutionRate}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Sistema</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uso de CPU</span>
                      <span className="font-semibold">24%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uso de Memória</span>
                      <span className="font-semibold">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tempo online</span>
                      <span className="font-semibold">29d 14h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
