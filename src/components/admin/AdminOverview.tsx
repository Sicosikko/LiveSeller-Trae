
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, MessageSquare, ArrowUpRight, Bot, Clock } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Clientes</CardDescription>
            <CardTitle className="text-4xl font-bold">2,843</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+15.8%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Faturamento Mensal</CardDescription>
            <CardTitle className="text-4xl font-bold">R$78.5K</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+12.3%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taxa de Conversão</CardDescription>
            <CardTitle className="text-4xl font-bold">32.7%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+3.2%</span>
              <span className="ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tempo Médio de Atendimento</CardDescription>
            <CardTitle className="text-4xl font-bold">3m 24s</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4 text-amber-500" />
              <span className="text-amber-500 font-medium">-5.1%</span>
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
                      <span className="font-semibold">8 / 12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Em atendimento</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Em pausa</span>
                      <span className="font-semibold">2</span>
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
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Na fila</span>
                      <span className="font-semibold">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Concluídos hoje</span>
                      <span className="font-semibold">143</span>
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
                      <span className="font-semibold">5 / 6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversas</span>
                      <span className="font-semibold">187</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de resolução</span>
                      <span className="font-semibold">78%</span>
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
