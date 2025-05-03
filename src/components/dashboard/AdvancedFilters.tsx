import React, { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  ChevronDown, 
  Filter, 
  X, 
  Save, 
  Download, 
  Share2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export interface FilterOptions {
  period?: string;
  channels?: string[];
  teamMembers?: string[];
  tags?: string[];
  conversionRate?: [number, number];
  messageCount?: [number, number];
  customDateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableTeamMembers?: { id: string; name: string }[];
  availableChannels?: { id: string; name: string }[];
  availableTags?: { id: string; name: string }[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onFilterChange,
  availableTeamMembers = [],
  availableChannels = [],
  availableTags = []
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    period: "30dias",
    channels: [],
    teamMembers: [],
    tags: [],
    conversionRate: [0, 100],
    messageCount: [0, 1000],
    customDateRange: {
      start: null,
      end: null
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Calcular quantos filtros estão ativos
    let count = 0;
    if (updatedFilters.channels && updatedFilters.channels.length > 0) count++;
    if (updatedFilters.teamMembers && updatedFilters.teamMembers.length > 0) count++;
    if (updatedFilters.tags && updatedFilters.tags.length > 0) count++;
    if (updatedFilters.period && updatedFilters.period !== "30dias") count++;
    if (updatedFilters.conversionRate && 
        (updatedFilters.conversionRate[0] > 0 || updatedFilters.conversionRate[1] < 100)) count++;
    if (updatedFilters.messageCount && 
        (updatedFilters.messageCount[0] > 0 || updatedFilters.messageCount[1] < 1000)) count++;
    if (updatedFilters.customDateRange?.start || updatedFilters.customDateRange?.end) count++;
    
    setActiveFiltersCount(count);
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
    
    toast({
      title: "Filtros aplicados",
      description: `${activeFiltersCount} filtros ativos aplicados aos dados.`
    });
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      period: "30dias",
      channels: [],
      teamMembers: [],
      tags: [],
      conversionRate: [0, 100],
      messageCount: [0, 1000],
      customDateRange: {
        start: null,
        end: null
      }
    };
    
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setActiveFiltersCount(0);
    
    toast({
      title: "Filtros redefinidos",
      description: "Todos os filtros foram redefinidos para os valores padrão."
    });
  };

  const saveFilterPreset = () => {
    // Implementação para salvar o preset de filtro atual
    toast({
      title: "Preset de filtro salvo",
      description: "Suas configurações de filtro foram salvas para uso futuro."
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros avançados</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0" align="start">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filtros avançados</h4>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            </div>
          </div>
          
          <div className="p-4 max-h-[500px] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="period">
                <AccordionTrigger>Período</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Select 
                      value={filters.period} 
                      onValueChange={(value) => updateFilters({ period: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                        <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                        <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {filters.period === "personalizado" && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Label htmlFor="start-date">Data inicial</Label>
                          <Input 
                            id="start-date" 
                            type="date" 
                            onChange={(e) => updateFilters({
                              customDateRange: {
                                ...filters.customDateRange,
                                start: e.target.value ? new Date(e.target.value) : null
                              }
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-date">Data final</Label>
                          <Input 
                            id="end-date" 
                            type="date" 
                            onChange={(e) => updateFilters({
                              customDateRange: {
                                ...filters.customDateRange,
                                end: e.target.value ? new Date(e.target.value) : null
                              }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="channels">
                <AccordionTrigger>Canais</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {availableChannels.map((channel) => (
                      <div key={channel.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`channel-${channel.id}`} 
                          checked={filters.channels?.includes(channel.id)}
                          onCheckedChange={(checked) => {
                            const newChannels = checked 
                              ? [...(filters.channels || []), channel.id]
                              : (filters.channels || []).filter(id => id !== channel.id);
                            updateFilters({ channels: newChannels });
                          }}
                        />
                        <Label htmlFor={`channel-${channel.id}`}>{channel.name}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="team">
                <AccordionTrigger>Membros da equipe</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {availableTeamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`member-${member.id}`} 
                          checked={filters.teamMembers?.includes(member.id)}
                          onCheckedChange={(checked) => {
                            const newMembers = checked 
                              ? [...(filters.teamMembers || []), member.id]
                              : (filters.teamMembers || []).filter(id => id !== member.id);
                            updateFilters({ teamMembers: newMembers });
                          }}
                        />
                        <Label htmlFor={`member-${member.id}`}>{member.name}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tags">
                <AccordionTrigger>Tags</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {availableTags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag.id}`} 
                          checked={filters.tags?.includes(tag.id)}
                          onCheckedChange={(checked) => {
                            const newTags = checked 
                              ? [...(filters.tags || []), tag.id]
                              : (filters.tags || []).filter(id => id !== tag.id);
                            updateFilters({ tags: newTags });
                          }}
                        />
                        <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="conversion">
                <AccordionTrigger>Taxa de conversão</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>{filters.conversionRate?.[0]}%</span>
                        <span>{filters.conversionRate?.[1]}%</span>
                      </div>
                      <Slider 
                        value={filters.conversionRate} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => updateFilters({ conversionRate: value as [number, number] })}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="messages">
                <AccordionTrigger>Quantidade de mensagens</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>{filters.messageCount?.[0]}</span>
                        <span>{filters.messageCount?.[1]}+</span>
                      </div>
                      <Slider 
                        value={filters.messageCount} 
                        min={0} 
                        max={1000} 
                        step={10}
                        onValueChange={(value) => updateFilters({ messageCount: value as [number, number] })}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={saveFilterPreset}>
                <Save className="h-4 w-4 mr-1" />
                Salvar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Compartilhar
              </Button>
            </div>
            <Button onClick={applyFilters}>Aplicar filtros</Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Limpar filtros
        </Button>
      )}
    </div>
  );
};

export default AdvancedFilters;