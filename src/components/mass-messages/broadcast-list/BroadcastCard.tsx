
import React from "react";
import { Clock, Users } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Broadcast } from "@/types/broadcast";
import StatusBadge from "./StatusBadge";
import BroadcastActionButtons from "./BroadcastActionButtons";

interface BroadcastCardProps {
  broadcast: Broadcast;
  isConnected: boolean;
}

const BroadcastCard: React.FC<BroadcastCardProps> = ({ broadcast, isConnected }) => {
  return (
    <Card key={broadcast.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center">
              {broadcast.name}
            </CardTitle>
          </div>
          <div>
            <StatusBadge status={broadcast.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Agendado para</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              {new Date(broadcast.scheduledFor).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Destinatários</span>
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              {broadcast.totalRecipients}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Status</span>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-emerald-500">{broadcast.sent} enviadas</span>
              <span className="text-red-500">{broadcast.failed} falhas</span>
              <span className="text-gray-500">{broadcast.pending} pendentes</span>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <BroadcastActionButtons broadcast={broadcast} disabled={!isConnected} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BroadcastCard;
