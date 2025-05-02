
import React from "react";
import { Lead } from "@/types/lead";
import LeadRow from "./LeadRow";
import { Badge } from "@/components/ui/badge";
import EmptyState from "../broadcast-list/EmptyState";

interface LeadsListProps {
  leads: Lead[];
  selectedLeads: string[];
  handleSelectLead: (id: string) => void;
  handleSelectAll: () => void;
}

const LeadsList: React.FC<LeadsListProps> = ({
  leads,
  selectedLeads,
  handleSelectLead,
  handleSelectAll,
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-2 text-left">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedLeads.length === leads.length && leads.length > 0}
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            <th className="p-2 text-left font-medium text-sm">Nome</th>
            <th className="p-2 text-left font-medium text-sm">Telefone</th>
            <th className="p-2 text-left font-medium text-sm">Email</th>
            <th className="p-2 text-left font-medium text-sm">Tags</th>
            <th className="p-2 text-left font-medium text-sm">Status</th>
            <th className="p-2 text-left font-medium text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              isSelected={selectedLeads.includes(lead.id)}
              onSelect={() => handleSelectLead(lead.id)}
            />
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={7}>
                <EmptyState message="Nenhum lead encontrado. Tente ajustar sua busca ou importar novos contatos." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
