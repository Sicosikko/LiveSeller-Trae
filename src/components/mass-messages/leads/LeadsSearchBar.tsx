
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LeadsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const LeadsSearchBar: React.FC<LeadsSearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar leads por nome, telefone ou email"
        className="pl-9"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default LeadsSearchBar;
