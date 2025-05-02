
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentChats from "@/components/dashboard/RecentChats";
import TeamPerformance from "@/components/dashboard/TeamPerformance";
import NextSchedules from "@/components/dashboard/NextSchedules";
import { MessageSquare, UserCheck, ArrowUpRight, Bot, RefreshCw } from "lucide-react";
import { useDashboardMetrics } from "@/services/dashboardService";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ensureSelectValue } from "@/utils/selectUtils";

const Dashboard = () => {
  const [period, setPeriod] = useState("today");
  const { data: metrics, isLoading, refetch } = useDashboardMetrics();

  const handleRefresh = () => {
    toast("Atualizando dashboard", {
      description: "Buscando dados mais recentes..."
    });
    refetch();
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    toast("Período alterado", {
      description: `Visualizando dados do período: ${value}`
    });
  };

  return (
    <MainLayout title="Dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Visão Geral</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ensureSelectValue(period, "Selecione um período")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Mensagens Hoje"
            value={metrics?.messages?.today || 0}
            icon={<MessageSquare className="h-5 w-5" />}
            change={metrics?.messages?.change}
            isLoading={isLoading}
          />
          <StatsCard
            title="Clientes Atendidos"
            value={metrics?.clients?.served || 0}
            icon={<UserCheck className="h-5 w-5" />}
            change={metrics?.clients?.change}
            isLoading={isLoading}
          />
          <StatsCard
            title="Taxa de Conversão"
            value={metrics?.conversion?.rate || "0%"}
            icon={<ArrowUpRight className="h-5 w-5" />}
            change={metrics?.conversion?.change}
            isLoading={isLoading}
          />
          <StatsCard
            title="Atendimentos por IA"
            value={metrics?.aiChats?.count || 0}
            icon={<Bot className="h-5 w-5" />}
            change={metrics?.aiChats?.change}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityChart />
          <RecentChats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamPerformance />
          <NextSchedules />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
