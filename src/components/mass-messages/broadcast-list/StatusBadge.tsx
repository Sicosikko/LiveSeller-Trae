
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BroadcastStatus } from "@/types/broadcast";

interface StatusBadgeProps {
  status: BroadcastStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "scheduled":
      return <Badge variant="outline" className="text-blue-500 border-blue-500">Agendado</Badge>;
    case "in-progress":
      return <Badge className="bg-whatsapp">Em Andamento</Badge>;
    case "paused":
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Pausado</Badge>;
    case "completed":
      return <Badge className="bg-emerald-500">Concluído</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelado</Badge>;
    default:
      return null;
  }
};

export default StatusBadge;
