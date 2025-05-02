
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Clock, CalendarIcon, BarChart3, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExportReportButton } from "./ExportReportButton";

interface ClientsAnalyticsProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

const clientGrowthData = [
  { mes: "Jan", novos: 120, recorrentes: 340 },
  { mes: "Fev", novos: 145, recorrentes: 380 },
  { mes: "Mar", novos: 170, recorrentes: 415 },
  { mes: "Abr", novos: 190, recorrentes: 440 },
  { mes: "Mai", novos: 210, recorrentes: 470 },
  { mes: "Jun", novos: 230, recorrentes: 510 },
];

const clientSegmentData = [
  { segmento: "Novo", valor: 25, cor: "#1E3A8A" },
  { segmento: "Casual", valor: 35, cor: "#F59E0B" },
  { segmento: "Regular", valor: 25, cor: "#10B981" },
  { segmento: "Premium", valor: 15, cor: "#6366F1" },
];

const clientRetentionData = [
  { mes: "Jan", taxa: 72 },
  { mes: "Fev", taxa: 68 },
  { mes: "Mar", taxa: 73 },
  { mes: "Abr", taxa: 76 },
  { mes: "Mai", taxa: 82 },
  { mes: "Jun", taxa: 85 },
];

const regionDistributionData = [
  { regiao: "Sudeste", quantidade: 450, cor: "#1E3A8A" },
  { regiao: "Nordeste", quantidade: 230, cor: "#10B981" },
  { regiao: "Sul", quantidade: 180, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", quantidade: 120, cor: "#6366F1" },
  { regiao: "Norte", quantidade: 90, cor: "#EF4444" },
];

const topClients = [
  { id: 1, name: "Maria Silva", avatar: "", interactions: 42, revenue: 2850, status: "Premium" },
  { id: 2, name: "João Santos", avatar: "", interactions: 38, revenue: 2350, status: "Premium" },
  { id: 3, name: "Ana Oliveira", avatar: "", interactions: 35, revenue: 2100, status: "Regular" },
  { id: 4, name: "Carlos Souza", avatar: "", interactions: 32, revenue: 1950, status: "Premium" },
  { id: 5, name: "Juliana Costa", avatar: "", interactions: 28, revenue: 1720, status: "Regular" },
];

const ClientsAnalytics: React.FC<ClientsAnalyticsProps> = ({ dateRange }) => {
  const [timeframe, setTimeframe] = useState("6meses");

  const statusColors: Record<string, string> = {
    "Premium": "bg-indigo-500",
    "Regular": "bg-green-500",
    "Casual": "bg-amber-500",
    "Novo": "bg-blue-500"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Análise de Clientes</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="6meses" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1mes">Último mês</SelectItem>
              <SelectItem value="3meses">Últimos 3 meses</SelectItem>
              <SelectItem value="6meses">Últimos 6 meses</SelectItem>
              <SelectItem value="1ano">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total de Clientes</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">1,070</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +5.2% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Novos Clientes</CardDescription>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">230</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +8.7% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taxa de Retenção</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">85%</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +3.5% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Valor Médio</CardDescription>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">R$420</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +2.1% vs. período anterior
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Crescimento de Clientes</CardTitle>
                <CardDescription>Evolução de clientes novos vs. recorrentes</CardDescription>
              </div>
              <ExportReportButton data={clientGrowthData} reportName="crescimento-clientes" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientGrowthData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" />
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
                    dataKey="novos" 
                    name="Novos Clientes" 
                    stackId="a"
                    fill="#1E3A8A" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="recorrentes" 
                    name="Clientes Recorrentes" 
                    stackId="a"
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Segmentação de Clientes</CardTitle>
                <CardDescription>Distribuição por tipo de cliente</CardDescription>
              </div>
              <ExportReportButton data={clientSegmentData} reportName="segmentacao-clientes" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientSegmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="segmento"
                    labelLine={false}
                    label={({ segmento, percent }) => `${segmento}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
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
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
                <CardTitle>Taxa de Retenção</CardTitle>
                <CardDescription>Evolução mensal (%)</CardDescription>
              </div>
              <ExportReportButton data={clientRetentionData} reportName="retencao-clientes" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientRetentionData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Taxa de Retenção"]}
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Distribuição Regional</CardTitle>
                <CardDescription>Clientes por região</CardDescription>
              </div>
              <ExportReportButton data={regionDistributionData} reportName="distribuicao-regional" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={regionDistributionData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="regiao" />
                  <Tooltip 
                    formatter={(value) => [`${value} clientes`, "Quantidade"]}
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Bar 
                    dataKey="quantidade" 
                    name="Quantidade" 
                    radius={[0, 4, 4, 0]}
                  >
                    {regionDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Clientes</CardTitle>
              <CardDescription>Clientes mais valiosos por interações e receita</CardDescription>
            </div>
            <ExportReportButton data={topClients} reportName="top-clientes" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Interações</TableHead>
                <TableHead className="text-right">Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${statusColors[client.status]} mr-2`}></div>
                      {client.status}
                    </div>
                  </TableCell>
                  <TableCell>{client.interactions}</TableCell>
                  <TableCell className="text-right">R$ {client.revenue.toLocaleString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsAnalytics;
