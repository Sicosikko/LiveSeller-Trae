import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, ArrowUpRight, Bot, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ExportReportButton } from "./ExportReportButton";
import { Button } from "@/components/ui/button";

interface OverviewDashboardProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

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

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ dateRange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Mensagens Hoje</CardDescription>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">523</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />12%
              </span>
              <span className="ml-1">vs. ontem</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={76} className="h-1" />
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Clientes Atendidos</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">182</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />8%
              </span>
              <span className="ml-1">vs. ontem</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={62} className="h-1" />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taxa de Conversão</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">32%</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />3%
              </span>
              <span className="ml-1">vs. ontem</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={32} className="h-1" />
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Atendimentos por IA</CardDescription>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">287</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />15%
              </span>
              <span className="ml-1">vs. ontem</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={85} className="h-1" />
          </CardFooter>
        </Card>
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
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Distribuição</CardTitle>
                <CardDescription>Clientes ativos</CardDescription>
              </div>
              <ExportReportButton data={clientDistribution} reportName="distribuicao-clientes" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentual"]}
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Evolução semanal</CardDescription>
              </div>
              <ExportReportButton data={conversionData} reportName="taxa-conversao" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Taxa de Conversão"]}
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="taxa"
                    name="Taxa de Conversão"
                    stroke="#1E3A8A"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Análise de dados e recomendações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-medium text-sm">Oportunidade de Conversão</h4>
                <p className="text-sm text-muted-foreground">O horário com maior taxa de conversão é entre 14h e 16h. Considere programar mais campanhas neste período.</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium text-sm">Análise de Engajamento</h4>
                <p className="text-sm text-muted-foreground">Clientes respondem mais às mensagens com imagens. Aumente o uso de elementos visuais em suas campanhas.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-medium text-sm">Previsão de Crescimento</h4>
                <p className="text-sm text-muted-foreground">Com base nas tendências atuais, espera-se um aumento de 15% no volume de mensagens no próximo mês.</p>
              </div>
              
              <Button variant="outline" className="w-full mt-2">Ver análise completa</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewDashboard;
