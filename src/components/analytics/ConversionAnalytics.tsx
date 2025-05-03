import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowUpRight, DollarSign, Circle } from "lucide-react";
import { ExportReportButton } from "./ExportReportButton";

interface ConversionAnalyticsProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

const conversionRateData = [
  { dia: "01/06", taxa: 28 },
  { dia: "02/06", taxa: 25 },
  { dia: "03/06", taxa: 32 },
  { dia: "04/06", taxa: 35 },
  { dia: "05/06", taxa: 38 },
  { dia: "06/06", taxa: 29 },
  { dia: "07/06", taxa: 26 },
  { dia: "08/06", taxa: 30 },
  { dia: "09/06", taxa: 34 },
  { dia: "10/06", taxa: 37 },
  { dia: "11/06", taxa: 33 },
  { dia: "12/06", taxa: 35 },
  { dia: "13/06", taxa: 32 },
  { dia: "14/06", taxa: 30 },
];

const conversionByChannelData = [
  { canal: "WhatsApp", taxa: 38, cor: "#25D366" },
  { canal: "Instagram", taxa: 32, cor: "#E1306C" },
  { canal: "Facebook", taxa: 28, cor: "#4267B2" },
  { canal: "Email", taxa: 22, cor: "#D44638" },
  { canal: "SMS", taxa: 18, cor: "#6B7280" },
];

const conversionByMessageTypeData = [
  { tipo: "Promoção", taxa: 42, cor: "#F59E0B" },
  { tipo: "Informativo", taxa: 28, cor: "#1E3A8A" },
  { tipo: "Lembrete", taxa: 35, cor: "#10B981" },
  { tipo: "Pesquisa", taxa: 20, cor: "#6366F1" },
];

const conversionFunnelData = [
  { etapa: "Visualizaram", quantidade: 1000, cor: "#1E3A8A" },
  { etapa: "Interagiram", quantidade: 680, cor: "#4F46E5" },
  { etapa: "Demonstraram interesse", quantidade: 420, cor: "#10B981" },
  { etapa: "Compraram", quantidade: 320, cor: "#F59E0B" },
];

const bestProductsData = [
  { produto: "Automação empresarial", taxa: 42 },
  { produto: "CRM completo", taxa: 38 },
  { produto: "Analytics Pro", taxa: 35 },
  { produto: "IA Assistant", taxa: 32 },
  { produto: "Integração de canais", taxa: 28 },
];

const ConversionAnalytics: React.FC<ConversionAnalyticsProps> = ({ dateRange }) => {
  const [timeframe, setTimeframe] = useState("14dias");
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    conversionRate: 0,
    conversionRateChange: 0,
    averageValue: 0,
    averageValueChange: 0,
    totalConversions: 0,
    totalConversionsChange: 0,
    revenue: 0,
    revenueChange: 0,
    conversionRateData: [],
    conversionByChannelData: [],
    conversionByMessageTypeData: [],
    conversionFunnelData: []
  });
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/analytics/conversion?timeframe=${timeframe}`);
        if (!response.ok) throw new Error('Falha ao carregar dados de análise');
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Erro ao carregar dados de análise:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível obter os dados de análise. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeframe]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Análise de Conversão</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="14dias" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="14dias">Últimos 14 dias</SelectItem>
              <SelectItem value="30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="90dias">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => window.print()} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <Button variant="outline" onClick={() => fetchAnalyticsData()} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Taxa de Conversão</CardDescription>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold">{analyticsData.conversionRate.toFixed(1)}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analyticsData.conversionRateChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                      <span className="text-emerald-500 font-medium">+{analyticsData.conversionRateChange.toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500 font-medium">{analyticsData.conversionRateChange.toFixed(1)}%</span>
                    </>
                  )}
                  <span className="ml-1">vs. período anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Valor Médio de Conversão</CardDescription>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold">R${analyticsData.averageValue}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analyticsData.averageValueChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                      <span className="text-emerald-500 font-medium">+{analyticsData.averageValueChange.toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500 font-medium">{analyticsData.averageValueChange.toFixed(1)}%</span>
                    </>
                  )}
                  <span className="ml-1">vs. período anterior</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Restante dos cards com dados dinâmicos */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Taxa de Conversão Diária</CardTitle>
                    <CardDescription>Evolução nos últimos 14 dias (%)</CardDescription>
                  </div>
                  <ExportReportButton data={conversionRateData} reportName="taxa-conversao-diaria" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionRateData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="dia" />
                      <YAxis domain={[0, 50]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Taxa de Conversão"]}
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.95)", 
                          borderRadius: "8px", 
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                          border: "none"
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="taxa"
                        stroke="#1E3A8A"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Conversão por Canal</CardTitle>
                    <CardDescription>Taxa de conversão por canal de comunicação (%)</CardDescription>
                  </div>
                  <ExportReportButton data={conversionByChannelData} reportName="conversao-por-canal" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={conversionByChannelData} 
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="canal" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Taxa de Conversão"]}
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.95)", 
                          borderRadius: "8px", 
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                          border: "none"
                        }}
                      />
                      <Bar 
                        dataKey="taxa" 
                        name="Taxa de Conversão" 
                        radius={[0, 4, 4, 0]}
                      >
                        {conversionByChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Bar>
                    </BarChart>
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

export default ConversionAnalytics;
