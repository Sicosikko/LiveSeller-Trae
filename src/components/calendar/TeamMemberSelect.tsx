
import React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dados de exemplo - em uma implementação real viriam de uma API
const teamMembers = [
  {
    id: "1",
    name: "Amanda Costa",
    avatar: "",
    role: "Atendente",
  },
  {
    id: "2",
    name: "Rafael Santos",
    avatar: "",
    role: "Vendedor",
  },
  {
    id: "3",
    name: "Juliana Almeida",
    avatar: "",
    role: "Atendente",
  },
  {
    id: "4",
    name: "Carlos Mendes",
    avatar: "",
    role: "Editor",
  },
];

interface TeamMemberSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const TeamMemberSelect: React.FC<TeamMemberSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  
  // Obter os membros selecionados
  const selectedMembers = teamMembers.filter(member => value.includes(member.id));
  
  // Alternar seleção de um membro
  const toggleMember = (memberId: string) => {
    const newValue = value.includes(memberId)
      ? value.filter(id => id !== memberId)
      : [...value, memberId];
      
    onChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10"
        >
          <div className="flex flex-wrap gap-1">
            {selectedMembers.length > 0 ? (
              selectedMembers.map(member => (
                <Badge
                  key={member.id}
                  variant="secondary"
                  className="mr-1 mb-1"
                >
                  {member.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Selecione os membros...</span>
            )}
          </div>
          <span className="ml-2">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar membro..." />
          <CommandEmpty>Nenhum membro encontrado.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {teamMembers.map(member => (
              <CommandItem
                key={member.id}
                value={member.name}
                onSelect={() => toggleMember(member.id)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <CheckIcon
                  className={cn(
                    "h-4 w-4",
                    value.includes(member.id) ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TeamMemberSelect;
