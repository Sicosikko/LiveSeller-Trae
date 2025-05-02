
import React from "react";
import { Play, Pause, X, BarChart2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Broadcast, BroadcastStatus } from "@/types/broadcast";

interface BroadcastActionButtonsProps {
  broadcast: Broadcast;
  disabled: boolean;
}

const BroadcastActionButtons: React.FC<BroadcastActionButtonsProps> = ({ broadcast, disabled }) => {
  switch (broadcast.status) {
    case "scheduled":
      return (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500" disabled={disabled} title="Iniciar">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" disabled={disabled} title="Cancelar">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={disabled} title="Editar">
            <Edit className="h-4 w-4" />
          </Button>
        </>
      );
    case "in-progress":
      return (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500" disabled={disabled} title="Pausar">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" disabled={disabled} title="Cancelar">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Estatísticas">
            <BarChart2 className="h-4 w-4" />
          </Button>
        </>
      );
    case "paused":
      return (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500" disabled={disabled} title="Retomar">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" disabled={disabled} title="Cancelar">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Estatísticas">
            <BarChart2 className="h-4 w-4" />
          </Button>
        </>
      );
    case "completed":
    case "cancelled":
      return (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Estatísticas">
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" title="Excluir">
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      );
    default:
      return null;
  }
};

export default BroadcastActionButtons;
