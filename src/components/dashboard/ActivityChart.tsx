
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useActivityData } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ensureSelectValue } from "@/utils/selectUtils";

const ActivityChart: React.FC = () => {
  const [period, setPeriod] = useState('week');
  const { data, isLoading, isError, refetch } = useActivityData(period);
  
  const handleRefresh = () => {
    toast("Atualizando dados", {
      description: "Buscando informações mais recentes..."
    });
    refetch();
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    toast("Período alterado", {
      description: `Mostrando dados do período: ${value}`
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Atividade</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={ensureSelectValue(period, "Selecione um período")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : isError ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">Erro ao carregar dados. Tente novamente.</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                  }}
                />
                <Bar 
                  dataKey="mensagens" 
                  name="Mensagens" 
                  fill="#128C7E" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="atendimentos" 
                  name="Atendimentos" 
                  fill="#25D366" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
