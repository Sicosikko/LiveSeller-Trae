import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, File, FileJson, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ExportFormat = "excel" | "pdf" | "csv" | "json";

interface ExportOptionsProps {
  data: any[];
  filename: string;
  onExport?: (format: ExportFormat, data: any[]) => Promise<void>;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  data, 
  filename,
  onExport 
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true);
      
      if (onExport) {
        await onExport(format, data);
      } else {
        // Implementação padrão de exportação se onExport não for fornecido
        console.log(`Exportando ${filename} como ${format}`);
        // Simular um atraso para demonstração
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados como ${format.toUpperCase()} com sucesso.`
      });
    } catch (error) {
      console.error("Erro na exportação:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exportando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleExport("excel")}
          disabled={isExporting}
        >
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Excel
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport("pdf")}
          disabled={isExporting}
        >
          <File className="h-4 w-4 mr-2" />
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport("csv")}
          disabled={isExporting}
        >
          <FileText className="h-4 w-4 mr-2" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport("json")}
          disabled={isExporting}
        >
          <FileJson className="h-4 w-4 mr-2" />
          JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;