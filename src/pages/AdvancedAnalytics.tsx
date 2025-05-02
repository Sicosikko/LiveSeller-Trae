
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, Line, Bar, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileSpreadsheet, FileText, MessageSquare, Users, ArrowUpRight, Bot, Calendar as CalendarIcon2, RefreshCcw, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import OverviewDashboard from "@/components/analytics/OverviewDashboard";
import MessagesAnalytics from "@/components/analytics/MessagesAnalytics";
import ClientsAnalytics from "@/components/analytics/ClientsAnalytics";
import ConversionAnalytics from "@/components/analytics/ConversionAnalytics";
import AIInsights from "@/components/analytics/AIInsights";
import CustomDashboard from "@/components/analytics/CustomDashboard";
import DashboardControls from "@/components/analytics/DashboardControls";

const AdvancedAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulação de atualização dos dados
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <MainLayout title="Analytics Avançados">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics Avançados</h2>
            <p className="text-muted-foreground">
              Visualize e analise dados detalhados sobre o desempenho do seu negócio
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: pt })} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy", { locale: pt })}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy", { locale: pt })
                    )
                  ) : (
                    <span>Selecione o período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => range && setDateRange(range)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCcw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
            
            <Button variant="outline" className="gap-2" onClick={() => window.location.href = "/analytics/custom"}>
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Personalizar</span>
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="overview" 
          className="w-full" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-auto mb-4">
            <TabsTrigger value="overview">Geral</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="conversion">Conversão</TabsTrigger>
            <TabsTrigger value="ai">IA Insights</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewDashboard dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesAnalytics dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="clients">
            <ClientsAnalytics dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="conversion">
            <ConversionAnalytics dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="ai">
            <AIInsights dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="custom">
            <CustomDashboard dateRange={dateRange} />
          </TabsContent>
        </Tabs>
        
        <DashboardControls activeTab={activeTab} />
      </div>
    </MainLayout>
  );
};

export default AdvancedAnalytics;
