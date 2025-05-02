
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ExportReportButton } from "./ExportReportButton";

interface MessagesAnalyticsProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

const messageVolumeData = [
  { hora: "00:00", mensagens: 15 },
  { hora: "03:00", mensagens: 10 },
  { hora: "06:00", mensagens: 12 },
  { hora: "09:00", mensagens: 87 },
  { hora: "12:00", mensagens: 63 },
  { hora: "15:00", mensagens: 105 },
  { hora: "18:00", mensagens: 120 },
  { hora: "21:00", mensagens: 45 },
];

const messageTypeData = [
  { tipo: "Texto", quantidade: 820, cor: "#1E3A8A" },
  { tipo: "Imagem", quantidade: 320, cor: "#10B981" },
  { tipo: "Áudio", quantidade: 150, cor: "#F59E0B" },
  { tipo: "Vídeo", quantidade: 80, cor: "#EF4444" },
  { tipo: "Documento", quantidade: 50, cor: "#6366F1" },
];

const responseTimeData = [
  { periodo: "Manhã", tempo: 3.2 },
  { periodo: "Tarde", tempo: 2.8 },
  { periodo: "Noite", tempo: 4.5 },
  { periodo: "Madrugada", tempo: 6.1 },
];

const deliveryStatusData = [
  { status: "Entregue", quantidade: 1250, cor: "#10B981" },
  { status: "Lido", quantidade: 980, cor: "#1E3A8A" },
  { status: "Pendente", quantidade: 145, cor: "#F59E0B" },
  { status: "Falha", quantidade: 25, cor: "#EF4444" },
];

const MessagesAnalytics: React.FC<MessagesAnalyticsProps> = ({ dateRange }) => {
  const [timeframe, setTimeframe] = useState("hoje");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Análise de Mensagens</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="hoje" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mês</SelectItem>
              <SelectItem value="trimestre">Último trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total de Mensagens</CardDescription>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">1,420</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +12.5% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Tempo Médio de Resposta</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">3m 12s</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              -8.3% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taxa de Entrega</CardDescription>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">98.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              +0.5% vs. período anterior
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taxa de Falha</CardDescription>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">1.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              -0.5% vs. período anterior
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Volume por Horário</CardTitle>
                <CardDescription>Distribuição de mensagens ao longo do dia</CardDescription>
              </div>
              <ExportReportButton data={messageVolumeData} reportName="volume-mensagens-horario" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageVolumeData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} mensagens`, "Volume"]}
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Bar 
                    dataKey="mensagens" 
                    name="Mensagens" 
                    fill="#1E3A8A" 
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
                <CardTitle>Tipo de Mensagem</CardTitle>
                <CardDescription>Distribuição por formato de conteúdo</CardDescription>
              </div>
              <ExportReportButton data={messageTypeData} reportName="tipos-mensagens" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={messageTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="quantidade"
                    nameKey="tipo"
                    labelLine={false}
                    label={({ tipo, percent }) => `${tipo}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {messageTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} mensagens`, "Quantidade"]}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tempo de Resposta</CardTitle>
                <CardDescription>Tempo médio por período do dia (minutos)</CardDescription>
              </div>
              <ExportReportButton data={responseTimeData} reportName="tempo-resposta" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="periodo" />
                  <YAxis unit="min" />
                  <Tooltip 
                    formatter={(value) => [`${value} min`, "Tempo"]}
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.95)", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Bar 
                    dataKey="tempo" 
                    name="Tempo Médio" 
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
                <CardTitle>Status de Entrega</CardTitle>
                <CardDescription>Status das mensagens enviadas</CardDescription>
              </div>
              <ExportReportButton data={deliveryStatusData} reportName="status-entrega" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={deliveryStatusData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="status" />
                  <Tooltip 
                    formatter={(value) => [`${value} mensagens`, "Quantidade"]}
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
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesAnalytics;
