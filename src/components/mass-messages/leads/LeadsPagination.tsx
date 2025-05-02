
import React from "react";
import { Button } from "@/components/ui/button";

interface LeadsPaginationProps {
  filteredCount: number;
  totalCount: number;
}

const LeadsPagination: React.FC<LeadsPaginationProps> = ({ 
  filteredCount, 
  totalCount 
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-sm text-muted-foreground">Mostrando {filteredCount} de {totalCount} leads</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled>Anterior</Button>
        <Button variant="outline" size="sm" disabled>Próximo</Button>
      </div>
    </div>
  );
};

export default LeadsPagination;
