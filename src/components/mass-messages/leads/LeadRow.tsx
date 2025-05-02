
import React from "react";
import { Lead, getTagColor } from "@/types/lead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

interface LeadRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: () => void;
}

const LeadRow: React.FC<LeadRowProps> = ({ lead, isSelected, onSelect }) => {
  return (
    <tr className="border-t hover:bg-muted/30">
      <td className="p-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
        />
      </td>
      <td className="p-2">
        <div>
          <p className="font-medium">{lead.name}</p>
          <p className="text-sm text-muted-foreground">{lead.company}</p>
        </div>
      </td>
      <td className="p-2">{lead.phone}</td>
      <td className="p-2">{lead.email}</td>
      <td className="p-2">
        <div className="flex flex-wrap gap-1">
          {lead.tags.map((tag, i) => (
            <Badge key={i} className={getTagColor(tag)}>{tag}</Badge>
          ))}
        </div>
      </td>
      <td className="p-2">
        {lead.blocked ? (
          <Badge variant="outline" className="text-red-500 border-red-500">Bloqueado</Badge>
        ) : (
          <Badge variant="outline" className="text-emerald-500 border-emerald-500">Ativo</Badge>
        )}
      </td>
      <td className="p-2">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default LeadRow;
