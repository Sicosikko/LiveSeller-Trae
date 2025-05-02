
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusFilterProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="w-full sm:w-48">
      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por status">
            {statusFilter === "all" ? "Todos os status" : 
             statusFilter === "scheduled" ? "Agendados" :
             statusFilter === "in-progress" ? "Em andamento" :
             statusFilter === "paused" ? "Pausados" :
             statusFilter === "completed" ? "Concluídos" :
             statusFilter === "cancelled" ? "Cancelados" : 
             "Filtrar por status"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="scheduled">Agendados</SelectItem>
          <SelectItem value="in-progress">Em andamento</SelectItem>
          <SelectItem value="paused">Pausados</SelectItem>
          <SelectItem value="completed">Concluídos</SelectItem>
          <SelectItem value="cancelled">Cancelados</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;
