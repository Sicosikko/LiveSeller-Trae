
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  title: string;
  value: number;
  total?: number;
  percentage?: number;
  percentageLabel?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  total, 
  percentage = 0, 
  percentageLabel 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className={percentage !== undefined ? "space-y-2" : ""}>
        <p className="text-2xl font-bold">{value}</p>
        {total !== undefined && <p className="text-sm text-muted-foreground">mensagens</p>}
        {percentage !== undefined && (
          <>
            <Progress value={percentage} className="h-2" />
            <p className="text-sm text-muted-foreground">{percentage}% {percentageLabel}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
