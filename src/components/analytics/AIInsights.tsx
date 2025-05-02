import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, MessageSquare, CheckCircle2, AlertTriangle, Lightbulb, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExportReportButton } from "./ExportReportButton";

interface AIInsightsProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

const atendimentosAIData = [
  { dia: "Seg", humano: 82, ia: 180 },
  { dia: "Ter", humano: 90, ia: 220 },
  { dia: "Qua", humano: 105, ia: 260 },
  { dia: "Qui", humano: 95, ia: 240 },
  { dia: "Sex", humano: 110, ia: 280 },
  { dia: "Sáb", humano: 75, ia: 160 },
  { dia: "Dom", humano: 60, ia: 140 },
];

const resolucaoIAData = [
  { tipo: "Resolvido pela IA", valor: 68, cor: "#10B981" },
  { tipo: "Transferido para humano", valor: 32, cor: "#F59E0B" },
];

const topIntentData = [
  { intencao: "Dúvida sobre produto", quantidade: 320, cor: "#1E3A8A" },
  { intencao: "Status de pedido", quantidade: 285, cor: "#10B981" },
  { intencao: "Problema técnico", quantidade: 210, cor: "#F59E0B" },
  { intencao: "Solicitação de reembolso", quantidade: 180, cor: "#EF4444" },
  { intencao: "Informação de envio", quantidade: 145, cor: "#6366F1" },
];

const satisfacaoClienteData = [
  { sentimento: "Muito Satisfeito", porcentagem: 45, cor: "#10B981" },
  { sentimento: "Satisfeito", porcentagem: 32, cor: "#22D3EE" },
  { sentimento: "Neutro", porcentagem: 15, cor: "#6B7280" },
  { sentimento: "Insatisfeito", porcentagem: 5, cor: "#F59E0B" },
  { sentimento: "Muito Insatisfeito", porcentagem: 3, cor: "#EF4444" },
];

const recomendacoes = [
  {
    id: 1,
    titulo: "Otimização de horários de atendimento",
    descricao: "Aumente a disponibilidade de atendentes humanos entre 18h e 20h, período com maior transferência de IA para humanos.",
    impacto: "Alto",
    dificuldade: "Média",
    categoria: "Operacional"
  },
  {
    id: 2,
    titulo: "Melhoria nas respostas da IA para dúvidas técnicas",
    descricao: "Treine seu assistente de IA com mais informações técnicas sobre os produtos mais vendidos.",
    impacto: "Médio",
    dificuldade: "Média",
    categoria: "IA"
  },
  {
    id: 3,
    titulo: "Campanhas segmentadas por comportamento",
    descricao: "Crie mensagens personalizadas com base no histórico de compras e interações anteriores.",
    impacto: "Alto",
    dificuldade: "Alta",
    categoria: "Marketing"
  },
  {
    id: 4,
    titulo: "Automação de respostas para status de pedidos",
    descricao: "Integre o sistema de pedidos com o chatbot para respostas instantâneas sobre status de entrega.",
    impacto: "Médio",
    dificuldade: "Média",
    categoria: "Integração"
  },
];

// Cores para categorias de impacto e dificuldade
const impactoColors: Record<string, string> = {
  "Alto": "bg-green-500",
  "Médio": "bg-amber-500",
  "Baixo": "bg-blue-500"
};

const dificuldadeColors: Record<string, string> = {
  "Alta": "bg-red-500",
  "Média": "bg-amber-500",
  "Baixa": "bg-green-500"
};

const categoriaColors: Record<string, string> = {
  "Operacional": "bg-blue-500",
  "IA": "bg-purple-500",
  "Marketing": "bg-green-500",
  "Integração": "bg-indigo-500"
};

const AIInsights: React.FC<AIInsightsProps> = ({ dateRange }) => {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Insights e Análises de IA</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
            <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="insights" className="space-y-6 mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Atendimentos por IA</CardDescription>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold">1,280</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+12.5%</span>
                <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Taxa de Resolução IA</CardDescription>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold">68%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+5.2%</span>
                <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Tempo Médio de Resolução</CardDescription>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold">1m 48s</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">-15.3%</span>
                <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Satisfação com Atendimento IA</CardDescription>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold">4.3/5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+0.2</span>
                <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Atendimentos IA vs. Humano</CardTitle>
                  <CardDescription>Distribuição por dia da semana</CardDescription>
                </div>
                <ExportReportButton data={atendimentosAIData} reportName="atendimentos-ia-humano" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={atendimentosAIData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="dia" />
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
                      dataKey="ia" 
                      name="Atendimento por IA" 
                      fill="#1E3A8A" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="humano" 
                      name="Atendimento Humano" 
                      fill="#10B981" 
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
                  <CardTitle>Resolução por IA</CardTitle>
                  <CardDescription>Efetividade do atendimento</CardDescription>
                </div>
                <ExportReportButton data={resolucaoIAData} reportName="resolucao-ia" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolucaoIAData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="valor"
                      nameKey="tipo"
                      labelLine={false}
                      label={({ tipo, percent }) => `${tipo}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {resolucaoIAData.map((entry, index) => (
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
                  <CardTitle>Intenções Mais Detectadas</CardTitle>
                  <CardDescription>Top intenções identificadas pela IA</CardDescription>
                </div>
                <ExportReportButton data={topIntentData} reportName="intencoes-detectadas" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topIntentData.map((intent, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{intent.intencao}</span>
                      <span className="font-mono">{intent.quantidade}</span>
                    </div>
                    <Progress 
                      value={(intent.quantidade / Math.max(...topIntentData.map(i => i.quantidade))) * 100} 
                      className="h-2"
                      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Análise de Sentimento</CardTitle>
                  <CardDescription>Satisfação do cliente com atendimento IA</CardDescription>
                </div>
                <ExportReportButton data={satisfacaoClienteData} reportName="analise-sentimento" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfacaoClienteData.map((sentiment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: sentiment.cor }}></div>
                        <span className="font-medium">{sentiment.sentimento}</span>
                      </div>
                      <span className="font-medium">{sentiment.porcentagem}%</span>
                    </div>
                    <Progress value={sentiment.porcentagem} className="h-2" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                      <div 
                        className="h-full transition-all" 
                        style={{ width: `${sentiment.porcentagem}%`, backgroundColor: sentiment.cor }}
                      />
                    </Progress>
                  </div>
                ))}
                
                <div className="pt-2 mt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Índice de Satisfação Geral</span>
                    <span className="font-medium">77%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="desempenho" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho do Sistema de IA</CardTitle>
            <CardDescription>Métricas técnicas e operacionais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Tempo de Resposta</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground">Tempo Médio</div>
                      <div className="text-2xl font-bold mt-1">1.2s</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground">Tempo Mínimo</div>
                      <div className="text-2xl font-bold mt-1">0.3s</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground">Tempo Máximo</div>
                      <div className="text-2xl font-bold mt-1">3.8s</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Precisão</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Detecção de Intenção</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  
                  <div className="flex justify-between mt-4">
                    <span>Reconhecimento de Entidade</span>
                    <span className="font-medium">92.5%</span>
                  </div>
                  <Progress value={92.5} className="h-2" />
                  
                  <div className="flex justify-between mt-4">
                    <span>Análise de Sentimento</span>
                    <span className="font-medium">88.7%</span>
                  </div>
                  <Progress value={88.7} className="h-2" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Saúde do Sistema</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground">Uptime</div>
                    <div className="text-2xl font-bold mt-1">99.97%</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground">Erros</div>
                    <div className="text-2xl font-bold mt-1">0.08%</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground">Uso de CPU</div>
                    <div className="text-2xl font-bold mt-1">42%</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground">Uso de RAM</div>
                    <div className="text-2xl font-bold mt-1">38%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Operação</CardTitle>
            <CardDescription>Desempenho operacional por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Distribuição de Carga por Hora do Dia</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} />
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
                      <Line 
                        name="Carga" 
                        data={[
                          { time: '00:00', value: 20 },
                          { time: '03:00', value: 10 },
                          { time: '06:00', value: 15 },
                          { time: '09:00', value: 45 },
                          { time: '12:00', value: 60 },
                          { time: '15:00', value: 75 },
                          { time: '18:00', value: 90 },
                          { time: '21:00', value: 50 }
                        ]} 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1E3A8A" 
                        strokeWidth={2} 
                      />
                      <Line 
                        name="Capacidade" 
                        data={[
                          { time: '00:00', value: 100 },
                          { time: '03:00', value: 100 },
                          { time: '06:00', value: 100 },
                          { time: '09:00', value: 100 },
                          { time: '12:00', value: 100 },
                          { time: '15:00', value: 100 },
                          { time: '18:00', value: 100 },
                          { time: '21:00', value: 100 }
                        ]} 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10B981" 
                        strokeDasharray="5 5" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Status Atual</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-green-50 border border-green-100 rounded-md p-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700">API de IA</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-md p-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Engine NLP</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-md p-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Banco de Dados</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-md p-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Processamento</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="recomendacoes" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Recomendações Baseadas em IA
                </CardTitle>
                <CardDescription>Sugestões personalizadas para otimizar operações e conversões</CardDescription>
              </div>
              <ExportReportButton data={recomendacoes} reportName="recomendacoes-ia" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recomendacoes.map((recomendacao, index) => (
                <div key={recomendacao.id} className="p-4 border rounded-lg bg-card">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{recomendacao.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{recomendacao.descricao}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className={`${impactoColors[recomendacao.impacto]} bg-opacity-15 text-black border-none`}>
                          Impacto: {recomendacao.impacto}
                        </Badge>
                        <Badge variant="secondary" className={`${dificuldadeColors[recomendacao.dificuldade]} bg-opacity-15 text-black border-none`}>
                          Dificuldade: {recomendacao.dificuldade}
                        </Badge>
                        <Badge variant="secondary" className={`${categoriaColors[recomendacao.categoria]} bg-opacity-15 text-black border-none`}>
                          {recomendacao.categoria}
                        </Badge>
                      </div>
                    </div>
                    <Button className="mt-2 md:mt-0 md:self-start whitespace-nowrap">Implementar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-700">Insights Semanais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Padrões identificados</h4>
                <p className="text-sm text-muted-foreground">
                  Os clientes que interagem com seu assistente de IA entre 18h e 21h tem 28% mais chances de converter se receberem uma oferta personalizada durante a conversa.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Oportunidade de crescimento</h4>
                <p className="text-sm text-muted-foreground">
                  Clientes que perguntam sobre integrações técnicas frequentemente não encontram informações suficientes. Considere expandir a base de conhecimento da IA neste tópico para reduzir transferências para humanos.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Ganho potencial</h4>
                <p className="text-sm text-muted-foreground">
                  Implementar as recomendações acima pode resultar em um aumento estimado de 15% na taxa de conversão e redução de 23% no tempo médio de resolução de problemas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default AIInsights;
