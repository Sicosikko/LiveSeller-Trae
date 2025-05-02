
import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Link, DollarSign, BadgePercent } from "lucide-react";

interface AffiliateStatsProps {
  stats: {
    visitors: number;
    conversions: number;
    conversionRate: number;
    earnings: number;
    pendingPayments: number;
    totalPaid: number;
  };
}

const AffiliateStats: React.FC<AffiliateStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Visitantes",
      value: stats.visitors,
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      title: "Conversões",
      value: stats.conversions,
      icon: <Link className="h-5 w-5" />,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
      title: "Taxa de Conversão",
      value: `${stats.conversionRate}%`,
      icon: <BadgePercent className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      title: "Ganhos Totais",
      value: `R$ ${stats.earnings.toFixed(2)}`,
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`rounded-full p-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AffiliateStats;
