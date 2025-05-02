
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportReportButtonProps {
  data: any[];
  reportName: string;
}

export const ExportReportButton: React.FC<ExportReportButtonProps> = ({ data, reportName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(dataBlob, `${reportName}-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Título do relatório
    doc.setFontSize(18);
    doc.text(`Relatório: ${reportName.replace(/-/g, ' ').toUpperCase()}`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Data de geração: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);
    
    // Logo (apenas um placeholder para demonstração)
    doc.setFillColor(30, 58, 138); // Azul Escuro #1E3A8A
    doc.rect(160, 15, 35, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('LiveSeller', 167, 23);
    doc.setTextColor(0, 0, 0);

    // Converter dados para formato de tabela
    const tableColumn = Object.keys(data[0]);
    const tableRows = data.map(item => Object.values(item));
    
    // Gerar tabela
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [200, 200, 200]
      },
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      }
    });
    
    // Adicionar rodapé
    const totalPagesCount = (doc as any).internal.pages.length - 1;
    for(let i = 1; i <= totalPagesCount; i++) {
      doc.setPage(i);
      doc.text(`Página ${i} de ${totalPagesCount} | LiveSeller Analytics`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, {
        align: 'center'
      });
    }
    
    doc.save(`${reportName}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Exportar Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Exportar PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
