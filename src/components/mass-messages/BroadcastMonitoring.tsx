
import React, { useState } from "react";
import HeaderSection from "./broadcast-monitoring/HeaderSection";
import StatsCard from "./broadcast-monitoring/StatsCard";
import DetailedStatus from "./broadcast-monitoring/DetailedStatus";

interface MonitoringData {
  id: string;
  name: string;
  total: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  pending: number;
  startTime: string;
  estimatedCompletionTime: string;
  errors: {
    type: string;
    count: number;
    examples: string[];
  }[];
}

const mockData: MonitoringData = {
  id: "1",
  name: "Campanha Promocional de Julho",
  total: 1500,
  sent: 875,
  delivered: 825,
  read: 412,
  failed: 48,
  pending: 577,
  startTime: "2025-06-28T10:15:30",
  estimatedCompletionTime: "2025-06-28T11:30:00",
  errors: [
    {
      type: "Número inválido",
      count: 23,
      examples: ["+551199999999", "+551188888888"]
    },
    {
      type: "Não cadastrado no WhatsApp",
      count: 15,
      examples: ["+551177777777", "+551166666666"]
    },
    {
      type: "Bloqueado",
      count: 10,
      examples: ["+551155555555", "+551144444444"]
    }
  ]
};

const BroadcastMonitoring: React.FC = () => {
  const [data, setData] = useState<MonitoringData>(mockData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const sentPercentage = Math.round((data.sent / data.total) * 100);
  const deliveredPercentage = Math.round((data.delivered / data.sent) * 100) || 0;
  const readPercentage = Math.round((data.read / data.delivered) * 100) || 0;
  
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // For a demo, we could update some numbers to show progress
      setData(prev => ({
        ...prev,
        sent: Math.min(prev.sent + Math.floor(Math.random() * 50), prev.total),
        delivered: Math.min(prev.delivered + Math.floor(Math.random() * 30), prev.sent + Math.floor(Math.random() * 30)),
        read: Math.min(prev.read + Math.floor(Math.random() * 20), prev.delivered + Math.floor(Math.random() * 20)),
      }));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <HeaderSection 
        name={data.name}
        startTime={data.startTime}
        isRefreshing={isRefreshing}
        onRefresh={refreshData}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Total" 
          value={data.total} 
          total={data.total}
        />
        
        <StatsCard 
          title="Enviadas" 
          value={data.sent}
          percentage={sentPercentage}
          percentageLabel="do total"
        />
        
        <StatsCard 
          title="Entregues" 
          value={data.delivered}
          percentage={deliveredPercentage}
          percentageLabel="das enviadas"
        />
        
        <StatsCard 
          title="Lidas" 
          value={data.read}
          percentage={readPercentage}
          percentageLabel="das entregues"
        />
      </div>
      
      <DetailedStatus 
        sent={data.sent}
        failed={data.failed}
        pending={data.pending}
        total={data.total}
        sentPercentage={sentPercentage}
        estimatedCompletionTime={data.estimatedCompletionTime}
        errors={data.errors}
      />
    </div>
  );
};

export default BroadcastMonitoring;
