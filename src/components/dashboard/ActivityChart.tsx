import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import { useActivityData } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ensureSelectValue } from "@/utils/selectUtils";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Função para exportar dados para CSV
const exportToCSV = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, `${filename}.xlsx`);
};

const ActivityChart = () => {
  const [period, setPeriod] = useState("week");
  const { data, isLoading, error, refetch } = useActivityData(period);
  
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast("Sem dados para exportar", {
        description: "Não há dados disponíveis para exportar neste momento."
      });
      return;
    }
    
    exportToCSV(data, `atividade-${period}-${new Date().toISOString().split('T')[0]}`);
    
    toast("Relatório exportado", {
      description: "Os dados foram exportados com sucesso."
    });
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };
  
  const handleRefresh = () => {
    refetch();
    toast("Dados atualizados", {
      description: "Os dados de atividade foram atualizados com sucesso."
    });
  };
  
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Atividade</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !data) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Atividade</CardTitle>
          <CardDescription>Erro ao carregar dados</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-2" />
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados de atividade.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }
  
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
        ) : error ? (
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