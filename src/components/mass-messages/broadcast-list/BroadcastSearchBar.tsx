
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BroadcastSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const BroadcastSearchBar: React.FC<BroadcastSearchBarProps> = ({ 
  search, 
  setSearch, 
  className = "relative flex-grow",
  placeholder = "Buscar campanha..."
}) => {
  return (
    <div className={className}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default BroadcastSearchBar;
