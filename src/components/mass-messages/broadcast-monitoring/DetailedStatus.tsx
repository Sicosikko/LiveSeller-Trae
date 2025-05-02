
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import StatusIndicator from "./StatusIndicator";
import ErrorsList from "./ErrorsList";

interface Error {
  type: string;
  count: number;
  examples: string[];
}

interface DetailedStatusProps {
  sent: number;
  failed: number;
  pending: number;
  total: number;
  sentPercentage: number;
  estimatedCompletionTime: string;
  errors: Error[];
}

const DetailedStatus: React.FC<DetailedStatusProps> = ({
  sent,
  failed,
  pending,
  total,
  sentPercentage,
  estimatedCompletionTime,
  errors
}) => {
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
              value={sent} 
              total={total}
              label={`${sent} enviadas`}
              sublabel={`${sentPercentage}% concluído`}
            />
            
            <StatusIndicator 
              type="failed" 
              value={failed} 
              total={total}
              label={`${failed} falhas`}
              sublabel={`${Math.round((failed / total) * 100)}% com erro`}
            />
            
            <StatusIndicator 
              type="pending" 
              value={pending} 
              total={total}
              label={`${pending} pendentes`}
              sublabel={`${Math.round((pending / total) * 100)}% a processar`}
            />
            
            <StatusIndicator 
              type="estimated" 
              value={0} 
              total={0}
              label="Tempo estimado"
              sublabel={new Date(estimatedCompletionTime).toLocaleTimeString()}
            />
          </div>
          
          <ErrorsList errors={errors} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedStatus;
