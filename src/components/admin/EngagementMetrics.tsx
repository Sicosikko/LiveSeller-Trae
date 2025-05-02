
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const dispatchData = [
  { name: "Seg", whatsapp: 350, email: 180, sms: 120 },
  { name: "Ter", whatsapp: 420, email: 230, sms: 140 },
  { name: "Qua", whatsapp: 490, email: 250, sms: 160 },
  { name: "Qui", whatsapp: 380, email: 210, sms: 130 },
  { name: "Sex", whatsapp: 450, email: 240, sms: 150 },
  { name: "Sáb", whatsapp: 320, email: 170, sms: 90 },
  { name: "Dom", whatsapp: 280, email: 150, sms: 80 },
];

const responseRateData = [
  { name: "Seg", rate: 68 },
  { name: "Ter", rate: 72 },
  { name: "Qua", rate: 75 },
  { name: "Qui", rate: 70 },
  { name: "Sex", rate: 74 },
  { name: "Sáb", rate: 67 },
  { name: "Dom", rate: 65 },
];

const channelEngagementData = [
  { name: "WhatsApp", value: 65 },
  { name: "Email", value: 20 },
  { name: "SMS", value: 15 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

const EngagementMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enviadas Hoje</CardDescription>
            <CardTitle className="text-3xl font-bold">1,248</CardTitle>
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
            <CardTitle className="text-3xl font-bold">98.2%</CardTitle>
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
            <CardTitle className="text-3xl font-bold">42.7%</CardTitle>
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
                <BarChart data={dispatchData}>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Resposta</CardTitle>
            <CardDescription>Percentual de respostas por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseRateData}>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Engajamento por Canal</CardTitle>
            <CardDescription>Distribuição de interações por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Pie
                    data={channelEngagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Melhores Horários para Engajamento</CardTitle>
            <CardDescription>Horários com maior taxa de resposta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>10:00 - 12:00</span>
                  </div>
                  <span className="font-medium">73.4%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-green-500" style={{ width: "73.4%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span>17:00 - 19:00</span>
                  </div>
                  <span className="font-medium">68.9%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: "68.9%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>14:00 - 16:00</span>
                  </div>
                  <span className="font-medium">62.3%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: "62.3%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>20:00 - 22:00</span>
                  </div>
                  <span className="font-medium">57.6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-red-500" style={{ width: "57.6%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementMetrics;
