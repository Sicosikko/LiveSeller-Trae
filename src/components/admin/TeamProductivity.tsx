
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowUpRight, Users, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dados simulados de produtividade
const generateProductivityData = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  return days.map(day => ({
    day,
    atendimentos: Math.floor(Math.random() * 50) + 30,
    resolvidos: Math.floor(Math.random() * 40) + 20,
    tempo: Math.floor(Math.random() * 15) + 5,
  }));
};

// Dados simulados de desempenho da equipe
const teamPerformanceData = [
  { id: '1', name: 'Ana Silva', role: 'Atendente', avatar: '', atendimentos: 78, resolvidos: 65, satisfacao: 4.8, tempo: 8.2 },
  { id: '2', name: 'João Pedro', role: 'Atendente', avatar: '', atendimentos: 56, resolvidos: 49, satisfacao: 4.5, tempo: 10.5 },
  { id: '3', name: 'Mariana Costa', role: 'Supervisora', avatar: '', atendimentos: 42, resolvidos: 38, satisfacao: 4.9, tempo: 7.8 },
  { id: '4', name: 'Carlos Santos', role: 'Atendente', avatar: '', atendimentos: 63, resolvidos: 55, satisfacao: 4.3, tempo: 9.7 },
  { id: '5', name: 'Julia Mendes', role: 'Atendente', avatar: '', atendimentos: 72, resolvidos: 67, satisfacao: 4.7, tempo: 8.5 },
];

interface ProductivityMetric {
  day: string;
  atendimentos: number;
  resolvidos: number;
  tempo: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  atendimentos: number;
  resolvidos: number;
  satisfacao: number;
  tempo: number;
}

const TeamProductivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeframe, setTimeframe] = useState("week");
  const [productivityData, setProductivityData] = useState<ProductivityMetric[]>([]);
  
  useEffect(() => {
    // Simular carregamento de dados
    setProductivityData(generateProductivityData());
  }, [timeframe]);
  
  // Função para obter as iniciais
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Calcular métricas gerais da equipe
  const totalAtendimentos = teamPerformanceData.reduce((sum, member) => sum + member.atendimentos, 0);
  const totalResolvidos = teamPerformanceData.reduce((sum, member) => sum + member.resolvidos, 0);
  const avgSatisfacao = teamPerformanceData.reduce((sum, member) => sum + member.satisfacao, 0) / teamPerformanceData.length;
  const avgTempo = teamPerformanceData.reduce((sum, member) => sum + member.tempo, 0) / teamPerformanceData.length;
  
  // Calcular taxa de resolução
  const resolucaoRate = Math.round((totalResolvidos / totalAtendimentos) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produtividade da Equipe</h1>
          <p className="text-muted-foreground">
            Análise de desempenho e produtividade dos membros da equipe
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Cartões de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Atendimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalAtendimentos}</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +{Math.floor(Math.random() * 20) + 5}% em relação à última semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Resolução
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{resolucaoRate}%</div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +{Math.floor(Math.random() * 10) + 1}% em relação à última semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Satisfação Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{avgSatisfacao.toFixed(1)}/5</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    className={`${star <= Math.round(avgSatisfacao) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <path
                      d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Baseado em {Math.floor(Math.random() * 100) + 50} avaliações
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tempo Médio de Resposta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{avgTempo.toFixed(1)} min</div>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              -{Math.floor(Math.random() * 15) + 5}% em relação à última semana
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="individual">Desempenho Individual</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtividade Diária</CardTitle>
              <CardDescription>
                Número de atendimentos e resoluções por dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atendimentos" name="Atendimentos" fill="#1E3A8A" />
                    <Bar dataKey="resolvidos" name="Resolvidos" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tempo Médio de Resposta</CardTitle>
              <CardDescription>
                Tempo médio (minutos) para primeira resposta por dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tempo" name="Tempo (min)" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Individual</CardTitle>
              <CardDescription>
                Métricas de desempenho por membro da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Membro
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Atendimentos
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Resolvidos
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Satisfação
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Tempo Médio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Desempenho
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamPerformanceData.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Avatar>
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.atendimentos}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.resolvidos}</div>
                          <div className="text-xs text-gray-500">
                            ({Math.round((member.resolvidos / member.atendimentos) * 100)}%)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            {member.satisfacao.toFixed(1)}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              className="ml-1 text-yellow-400"
                            >
                              <path
                                d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.tempo.toFixed(1)} min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.satisfacao >= 4.5 && (member.resolvidos / member.atendimentos) >= 0.8 ? (
                            <Badge className="bg-green-500">Excelente</Badge>
                          ) : member.satisfacao >= 4.0 && (member.resolvidos / member.atendimentos) >= 0.7 ? (
                            <Badge className="bg-blue-500">Bom</Badge>
                          ) : member.satisfacao >= 3.5 && (member.resolvidos / member.atendimentos) >= 0.6 ? (
                            <Badge>Regular</Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-500 border-amber-500">Precisa melhorar</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Produtividade</CardTitle>
              <CardDescription>
                Métricas comparativas entre membros da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="atendimentos" name="Atendimentos" fill="#1E3A8A" />
                    <Bar yAxisId="left" dataKey="resolvidos" name="Resolvidos" fill="#2563EB" />
                    <Bar yAxisId="right" dataKey="tempo" name="Tempo Médio (min)" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Satisfação dos Clientes</CardTitle>
              <CardDescription>
                Avaliação de satisfação dos clientes por atendente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value}/5`, "Satisfação"]} />
                    <Legend />
                    <Bar dataKey="satisfacao" name="Satisfação" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Avaliações</CardTitle>
              <CardDescription>
                Percentual de cada nota de avaliação recebida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 mb-8">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const percent = rating === 5 ? 68 : 
                                 rating === 4 ? 22 : 
                                 rating === 3 ? 7 : 
                                 rating === 2 ? 2 : 1;
                  return (
                    <div key={rating} className="flex flex-col items-center">
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-bold mr-1">{rating}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 15 15"
                          fill="none"
                          className="text-yellow-400"
                        >
                          <path
                            d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            rating >= 4 ? "bg-green-500" : 
                            rating === 3 ? "bg-yellow-500" : "bg-red-500"
                          }`} 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{percent}%</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/20">
                <h4 className="font-medium mb-2">Comentários Recentes</h4>
                <ul className="space-y-3">
                  <li className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="12"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              className="text-yellow-400"
                            >
                              <path
                                d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                                fill="currentColor"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm">Cliente avaliou Ana Silva</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Hoje</span>
                    </div>
                    <p className="text-sm">"Atendimento rápido e eficiente. Resolveu meu problema em poucos minutos!"</p>
                  </li>
                  <li className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <svg
                              key={star}
                              width="12"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              className="text-yellow-400"
                            >
                              <path
                                d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                                fill="currentColor"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm">Cliente avaliou Carlos Santos</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Ontem</span>
                    </div>
                    <p className="text-sm">"Bom atendimento, mas demorou um pouco para resolver minha dúvida."</p>
                  </li>
                  <li className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="12"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              className="text-yellow-400"
                            >
                              <path
                                d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                                fill="currentColor"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm">Cliente avaliou Julia Mendes</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2 dias atrás</span>
                    </div>
                    <p className="text-sm">"Excelente atendimento! A Julia foi muito atenciosa e resolveu meu problema rapidamente."</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamProductivity;
