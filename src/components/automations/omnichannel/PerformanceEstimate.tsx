
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PerformanceEstimate: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho Estimado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Taxa de Entrega</span>
            <span className="font-medium">95%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa de Abertura</span>
            <span className="font-medium">42%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa de Clique</span>
            <span className="font-medium">18%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa de Conversão</span>
            <span className="font-medium">5%</span>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            * Estimativas baseadas em campanhas anteriores com público semelhante
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceEstimate;
