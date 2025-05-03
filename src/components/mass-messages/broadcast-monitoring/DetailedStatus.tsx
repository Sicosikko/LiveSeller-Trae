
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import StatusIndicator from "./StatusIndicator";
import ErrorsList from "./ErrorsList";

interface ErrorDetail {
  type: string;
  count: number;
  examples: string[];
}

interface DetailedStatusProps {
  campaignId: string;
}

interface CampaignMetrics {
  sent: number;
  failed: number;
  pending: number;
  total: number;
  sentPercentage: number;
  estimatedCompletionTime: string;
  errors: ErrorDetail[];
}

const DetailedStatus: React.FC<DetailedStatusProps> = ({ campaignId }) => {
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    sent: 0,
    failed: 0,
    pending: 0,
    total: 0,
    sentPercentage: 0,
    estimatedCompletionTime: new Date().toISOString(),
    errors: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaignId}/metrics`);
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [campaignId]);

  if (loading) {
    return <div>Loading campaign metrics...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Detalhado</CardTitle>
        <CardDescription>Análise em tempo real do progresso deste disparo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatusIndicator 
              type="sent" 
              value={metrics.sent} 
              total={metrics.total}
              label={`${metrics.sent} enviadas`}
              sublabel={`${metrics.sentPercentage}% concluído`}
            />
            <StatusIndicator 
              type="failed" 
              value={metrics.failed} 
              total={metrics.total}
              label={`${metrics.failed} falhas`}
              sublabel={`${Math.round((metrics.failed / metrics.total) * 100)}% com erro`}
            />
            <StatusIndicator 
              type="pending" 
              value={metrics.pending} 
              total={metrics.total}
              label={`${metrics.pending} pendentes`}
              sublabel={`${Math.round((metrics.pending / metrics.total) * 100)}% a processar`}
            />
            <StatusIndicator 
              type="estimated" 
              value={0} 
              total={0}
              label="Tempo estimado"
              sublabel={new Date(metrics.estimatedCompletionTime).toLocaleTimeString()}
            />
          </div>
          <ErrorsList errors={metrics.errors} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedStatus;
