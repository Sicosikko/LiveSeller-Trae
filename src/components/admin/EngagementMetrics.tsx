
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ensureSelectValue } from "@/utils/selectUtils";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

const EngagementMetrics = () => {
  const [timeframe, setTimeframe] = useState("week");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [metricsData, setMetricsData] = useState({
    dispatchData: [],
    responseRateData: [],
    channelEngagementData: [],
    bestTimeData: [],
    summary: {
      sentToday: 0,
      deliveryRate: 0,
      responseRate: 0
    }
  });
  
  useEffect(() => {
    fetchEngagementData();
  }, [timeframe]);
  
  const fetchEngagementData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/engagement?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Falha ao carregar dados de engajamento');
      
      const data = await response.json();
      setMetricsData(data);
    } catch (error) {
      console.error('Erro ao carregar dados de engajamento:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível obter os dados de engajamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Métricas de Engajamento</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar período">
              {ensureSelectValue(timeframe, "Selecionar período")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hoje</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mês</SelectItem>
            <SelectItem value="quarter">Este trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Enviadas Hoje</CardDescription>
                <CardTitle className="text-3xl font-bold">{metricsData.summary.sentToday.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Disparos realizados nas últimas 24h
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taxa de Entrega</CardDescription>
                <CardTitle className="text-3xl font-bold">{metricsData.summary.deliveryRate}%</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Porcentagem de mensagens entregues
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taxa de Resposta</CardDescription>
                <CardTitle className="text-3xl font-bold">{metricsData.summary.responseRate}%</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Clientes que responderam às mensagens
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Disparos por Canais</CardTitle>
                <CardDescription>Mensagens enviadas por canal nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metricsData.dispatchData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="email" name="Email" fill="#4285F4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sms" name="SMS" fill="#F4B400" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Restante dos gráficos usando dados da API */}
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Resposta</CardTitle>
                <CardDescription>Percentual de respostas por dia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metricsData.responseRateData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Line type="monotone" dataKey="rate" name="Taxa de Resposta" stroke="#4f46e5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default EngagementMetrics;
