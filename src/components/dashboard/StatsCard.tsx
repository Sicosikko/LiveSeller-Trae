
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
  isLoading = false,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-20 mt-1" />
                {change && <Skeleton className="h-4 w-24 mt-1" />}
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
                {change && (
                  <p
                    className={cn(
                      "text-xs font-medium mt-1",
                      change.positive
                        ? "text-emerald-500"
                        : "text-destructive"
                    )}
                  >
                    {change.positive ? "+" : "-"}{change.value} desde ontem
                  </p>
                )}
              </>
            )}
          </div>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
