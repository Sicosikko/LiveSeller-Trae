
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowUpRight, Users, MessageSquare, RefreshCcw, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ensureSelectValue } from "@/utils/selectUtils";

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
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalAtendimentos: 0,
    totalResolvidos: 0,
    avgSatisfacao: 0,
    avgTempo: 0,
    resolucaoRate: 0
  });
  const { toast } = useToast();
  
  const fetchProductivityData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/productivity?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Falha ao carregar dados de produtividade');
      const data = await response.json();
      
      setProductivityData(data.productivityData);
      setTeamData(data.teamMembers);
      
      // Calcular métricas gerais da equipe
      const totalAtendimentos = data.teamMembers.reduce((sum: number, member: TeamMember) => sum + member.atendimentos, 0);
      const totalResolvidos = data.teamMembers.reduce((sum: number, member: TeamMember) => sum + member.resolvidos, 0);
      const avgSatisfacao = data.teamMembers.reduce((sum: number, member: TeamMember) => sum + member.satisfacao, 0) / data.teamMembers.length;
      const avgTempo = data.teamMembers.reduce((sum: number, member: TeamMember) => sum + member.tempo, 0) / data.teamMembers.length;
      
      // Calcular taxa de resolução
      const resolucaoRate = Math.round((totalResolvidos / totalAtendimentos) * 100);
      
      setStats({
        totalAtendimentos,
        totalResolvidos,
        avgSatisfacao,
        avgTempo,
        resolucaoRate
      });
    } catch (error) {
      console.error('Erro ao carregar dados de produtividade:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível obter os dados de produtividade. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductivityData();
  }, [timeframe]);
  
  // Função para obter as iniciais
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

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
              <SelectValue placeholder="Selecione um período">
                {ensureSelectValue(timeframe, "Selecione um período")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => window.print()} disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button variant="outline" onClick={() => fetchProductivityData()} disabled={loading}>
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
                  <div className="text-3xl font-bold">{stats.totalAtendimentos}</div>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            {/* Restante dos cards com dados dinâmicos */}
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
          </div>
        </>
      )}
    </div>
  );
};

export default TeamProductivity;
