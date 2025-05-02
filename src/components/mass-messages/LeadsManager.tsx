
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import LeadsSearchBar from "./leads/LeadsSearchBar";
import LeadsActionButtons from "./leads/LeadsActionButtons";
import LeadsBulkActions from "./leads/LeadsBulkActions";
import LeadsList from "./leads/LeadsList";
import LeadsPagination from "./leads/LeadsPagination";

// Mock data
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "+5511999887766",
    email: "joao.silva@example.com",
    company: "Tech Solutions",
    city: "São Paulo",
    tags: ["Cliente", "Premium"],
    blocked: false,
    lastContact: "2025-06-20T14:30:00"
  },
  {
    id: "2",
    name: "Maria Oliveira",
    phone: "+5511988776655",
    email: "maria.oliveira@example.com",
    company: "Digital Marketing",
    city: "Rio de Janeiro",
    tags: ["Lead", "Interesse em Produto B"],
    blocked: false,
    lastContact: "2025-06-19T10:15:00"
  },
  {
    id: "3",
    name: "Carlos Santos",
    phone: "+5511977665544",
    email: "carlos.santos@example.com",
    company: "Retail Store",
    city: "Curitiba",
    tags: ["Prospect", "Frio"],
    blocked: true,
    lastContact: "2025-06-15T09:45:00"
  },
  {
    id: "4",
    name: "Ana Ferreira",
    phone: "+5511966554433",
    email: "ana.ferreira@example.com",
    company: "Health Services",
    city: "Belo Horizonte",
    tags: ["Cliente", "Regular"],
    blocked: false,
    lastContact: "2025-06-22T16:20:00"
  },
  {
    id: "5",
    name: "Paulo Costa",
    phone: "+5511955443322",
    email: "paulo.costa@example.com",
    company: "Education Center",
    city: "Brasília",
    tags: ["Lead", "Quente"],
    blocked: false,
    lastContact: "2025-06-21T11:05:00"
  }
];

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id)
        ? prev.filter(leadId => leadId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };
  
  const handleBlockLeads = () => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        selectedLeads.includes(lead.id)
          ? { ...lead, blocked: true }
          : lead
      )
    );
    setBlockDialogOpen(false);
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
            />
            <LeadsActionButtons />
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
          
          <LeadsList 
            leads={filteredLeads}
            selectedLeads={selectedLeads}
            handleSelectLead={handleSelectLead}
            handleSelectAll={handleSelectAll}
          />
        </CardContent>
        <CardFooter className="pt-4">
          <LeadsPagination 
            filteredCount={filteredLeads.length} 
            totalCount={leads.length} 
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LeadsManager;
