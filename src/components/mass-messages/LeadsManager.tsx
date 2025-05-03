
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import LeadsSearchBar from "./leads/LeadsSearchBar";
import LeadsActionButtons from "./leads/LeadsActionButtons";
import LeadsBulkActions from "./leads/LeadsBulkActions";
import LeadsList from "./leads/LeadsList";
import LeadsPagination from "./leads/LeadsPagination";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });
  const { toast } = useToast();
  
  useEffect(() => {
    fetchLeads();
  }, [pagination.page, searchTerm]);
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leads?page=${pagination.page}&search=${searchTerm}`);
      if (!response.ok) throw new Error('Falha ao carregar leads');
      const data = await response.json();
      setLeads(data.leads);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        totalItems: data.totalItems
      });
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast({
        title: "Erro ao carregar leads",
        description: "Não foi possível obter a lista de leads. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id)
        ? prev.filter(leadId => leadId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };
  
  const handleBlockLeads = async () => {
    try {
      const response = await fetch('/api/leads/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadIds: selectedLeads }),
      });
      
      if (!response.ok) throw new Error('Falha ao bloquear leads');
      
      // Atualizar estado local
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          selectedLeads.includes(lead.id)
            ? { ...lead, blocked: true }
            : lead
        )
      );
      
      toast({
        title: "Leads bloqueados",
        description: `${selectedLeads.length} leads foram bloqueados com sucesso.`,
      });
      
      setBlockDialogOpen(false);
    } catch (error) {
      console.error('Erro ao bloquear leads:', error);
      toast({
        title: "Erro ao bloquear leads",
        description: "Não foi possível bloquear os leads selecionados. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const clearSelection = () => {
    setSelectedLeads([]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Gerenciamento de Leads</CardTitle>
          <CardDescription>
            Gerencie seus contatos para disparo, adicione tags e importe novos leads
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <LeadsSearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              isLoading={loading}
            />
            <LeadsActionButtons onRefresh={fetchLeads} isLoading={loading} />
          </div>
          
          <LeadsBulkActions 
            selectedLeads={selectedLeads}
            openTagDialog={openTagDialog}
            setOpenTagDialog={setOpenTagDialog}
            blockDialogOpen={blockDialogOpen}
            setBlockDialogOpen={setBlockDialogOpen}
            handleBlockLeads={handleBlockLeads}
            clearSelection={clearSelection}
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <LeadsList 
              leads={leads}
              selectedLeads={selectedLeads}
              handleSelectLead={handleSelectLead}
              handleSelectAll={handleSelectAll}
            />
          )}
          
          <LeadsPagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManager;
