
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Ban, Plus } from "lucide-react";

interface LeadsBulkActionsProps {
  selectedLeads: string[];
  openTagDialog: boolean;
  setOpenTagDialog: (value: boolean) => void;
  blockDialogOpen: boolean;
  setBlockDialogOpen: (value: boolean) => void;
  handleBlockLeads: () => void;
  clearSelection: () => void;
}

const LeadsBulkActions: React.FC<LeadsBulkActionsProps> = ({
  selectedLeads,
  openTagDialog,
  setOpenTagDialog,
  blockDialogOpen,
  setBlockDialogOpen,
  handleBlockLeads,
  clearSelection
}) => {
  if (selectedLeads.length === 0) return null;

  return (
    <div className="bg-muted/30 p-2 rounded-md flex justify-between items-center">
      <p className="text-sm">{selectedLeads.length} leads selecionados</p>
      <div className="flex gap-2">
        <Dialog open={openTagDialog} onOpenChange={setOpenTagDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> Adicionar Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Tags</DialogTitle>
              <DialogDescription>
                Selecione as tags que deseja adicionar aos {selectedLeads.length} leads selecionados.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500 cursor-pointer">Cliente</Badge>
                <Badge className="bg-purple-500 cursor-pointer">Premium</Badge>
                <Badge className="bg-amber-500 cursor-pointer">Lead</Badge>
                <Badge className="bg-red-500 cursor-pointer">Quente</Badge>
                <Badge className="bg-sky-500 cursor-pointer">Frio</Badge>
                <Badge className="bg-emerald-500 cursor-pointer">Prospect</Badge>
                <Badge className="bg-green-500 cursor-pointer">Regular</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Nova tag..." />
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-1" /> Criar Tag
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenTagDialog(false)}>Cancelar</Button>
              <Button onClick={() => setOpenTagDialog(false)}>Aplicar Tags</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive border-destructive/30">
              <Ban className="h-4 w-4" /> Bloquear
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bloquear Leads</DialogTitle>
              <DialogDescription>
                Você está prestes a bloquear {selectedLeads.length} leads. Leads bloqueados não receberão mensagens em campanhas futuras.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-destructive/10 p-4 rounded-md text-sm text-destructive">
                Esta ação não afeta disparos que já foram agendados ou estão em andamento.
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleBlockLeads}>Bloquear Leads</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          Limpar seleção
        </Button>
      </div>
    </div>
  );
};

export default LeadsBulkActions;
