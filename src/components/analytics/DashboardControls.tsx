import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Download, Share, Save, FileText, FileSpreadsheet, ChevronDown, ArrowUpDown, Filter, Calendar, RotateCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface DashboardControlsProps {
  activeTab: string;
}

/**
 * Função utilitária para garantir que o SelectValue sempre tenha um valor válido
 */
const ensureSelectValue = (value: string | undefined, placeholder: string): string => {
  if (!value) return placeholder;
  
  switch (value) {
    case "7dias": return "Últimos 7 dias";
    case "30dias": return "Últimos 30 dias";
    case "90dias": return "Últimos 90 dias";
    case "personalizado": return "Período personalizado";
    default: return value;
  }
};

const DashboardControls: React.FC<DashboardControlsProps> = ({ activeTab }) => {
  const [isPDFExportOpen, setIsPDFExportOpen] = useState(false);
  const [exportName, setExportName] = useState(`relatorio-${activeTab}-${new Date().toISOString().split('T')[0]}`);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [period, setPeriod] = useState<string>("30dias");
  
  /**
   * Manipula a mudança de período no filtro
   */
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    // Aqui poderia ser adicionada lógica adicional, como notificações ou chamadas de API
  };
  
  return (
    <div className="fixed bottom-5 right-5 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-12 w-12 rounded-full shadow-lg">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Opções de Dashboard</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <Dialog open={isPDFExportOpen} onOpenChange={setIsPDFExportOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Exportar PDF</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exportar como PDF</DialogTitle>
                <DialogDescription>
                  Configure as opções para exportação do relatório em PDF
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="report-name"
                    value={exportName}
                    onChange={(e) => setExportName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quality" className="text-right">
                    Qualidade
                  </Label>
                  <div className="col-span-3 flex flex-col gap-2">
                    <Slider
                      defaultValue={[80]}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="include-logo" className="text-right">
                    Incluir Logo
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="include-logo" defaultChecked={true} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    Formato
                  </Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Resumido</SelectItem>
                      <SelectItem value="detailed">Detalhado</SelectItem>
                      <SelectItem value="full">Completo com análises</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPDFExportOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" onClick={() => setIsPDFExportOpen(false)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <DropdownMenuItem>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Exportar Excel</span>
          </DropdownMenuItem>
          
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filtros</span>
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros de Dashboard</SheetTitle>
                <SheetDescription>
                  Personalize os filtros para visualizar os dados específicos que você precisa.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date-range">Período</Label>
                  <Select defaultValue="30dias" onValueChange={handlePeriodChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={ensureSelectValue(period, "Selecione o período")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                      <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                      <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canais">Canais</Label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os canais" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os canais</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook Messenger</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="atendentes">Atendentes</Label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os atendentes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os atendentes</SelectItem>
                      <SelectItem value="humanos">Apenas humanos</SelectItem>
                      <SelectItem value="ia">Apenas IA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientes">Segmento de clientes</Label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os clientes</SelectItem>
                      <SelectItem value="novos">Novos (&lt; 30 dias)</SelectItem>
                      <SelectItem value="recorrentes">Recorrentes</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-update">Atualizar automaticamente</Label>
                    <Switch 
                      id="auto-update" 
                      checked={autoUpdate}
                      onCheckedChange={setAutoUpdate}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Atualiza os dados automaticamente a cada 5 minutos
                  </p>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="mr-2" variant="outline">
                    Cancelar
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <Save className="mr-2 h-4 w-4" />
            <span>Salvar configuração</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Share className="mr-2 h-4 w-4" />
            <span>Compartilhar</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <span>Ordenar dados</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Agendar envio</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <RotateCw className="mr-2 h-4 w-4" />
            <span>Atualizar dados</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardControls;