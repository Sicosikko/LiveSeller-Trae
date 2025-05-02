
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AudienceTabProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  selectedLeadsCount: number;
  setSelectedLeadsCount: (count: number) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudienceTab: React.FC<AudienceTabProps> = ({
  selectedFile,
  selectedLeadsCount,
  handleFileChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecionar Destinatários</CardTitle>
        <CardDescription>Escolha para quem esta mensagem será enviada.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Importar Contatos</Label>
            <div className="flex items-center gap-2">
              <div className="border rounded-md px-4 py-2 flex-1 flex items-center justify-between bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"}
                </span>
                <Label htmlFor="file-upload" className="bg-whatsapp hover:bg-whatsapp-dark text-white rounded-md px-3 py-1 text-sm cursor-pointer">
                  Escolher Arquivo
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Formatos suportados: CSV, Excel (.xlsx, .xls)
            </p>
          </div>
          
          {selectedLeadsCount > 0 && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contatos Importados</p>
                  <p className="text-sm text-muted-foreground">{selectedLeadsCount} contatos identificados</p>
                </div>
                <Button variant="outline" size="sm">
                  Visualizar
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Filtrar por Tags</Label>
            <div className="flex flex-wrap gap-2 border rounded-md p-2">
              <Badge className="bg-blue-500">Cliente Ativo</Badge>
              <Badge className="bg-purple-500">Lead Quente</Badge>
              <Badge className="bg-amber-500">Interesse em Produto A</Badge>
              <Badge className="bg-emerald-500">Cliente Premium</Badge>
              <Badge variant="outline" className="cursor-pointer">+ Adicionar Tag</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {selectedLeadsCount > 0 
            ? `${selectedLeadsCount} contatos selecionados para este disparo`
            : "Nenhum contato selecionado"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AudienceTab;
