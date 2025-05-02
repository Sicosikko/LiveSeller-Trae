
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Filter } from "lucide-react";

const LeadsActionButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="flex items-center gap-1">
        <Upload className="h-4 w-4" /> Importar
      </Button>
      <Button variant="outline" className="flex items-center gap-1">
        <Download className="h-4 w-4" /> Exportar
      </Button>
      <Button variant="outline" className="flex items-center gap-1">
        <Filter className="h-4 w-4" /> Filtros
      </Button>
    </div>
  );
};

export default LeadsActionButtons;
