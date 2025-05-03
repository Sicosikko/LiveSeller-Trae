import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { DateRange } from "react-day-picker";
import AdvancedFilters, { FilterOptions } from "./AdvancedFilters";
import { toast } from "@/components/ui/use-toast";

// Tipos para os dados mockados
interface TeamMember {
  id: string;
  name: string;
}

interface Channel {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

// Mock data para substituir as importações com erro
const mockTeamMembers: TeamMember[] = [
  { id: "1", name: "Ana Silva" },
  { id: "2", name: "Carlos Oliveira" },
  { id: "3", name: "Mariana Costa" },
  { id: "4", name: "Pedro Santos" },
];

const mockChannels: Channel[] = [
  { id: "1", name: "WhatsApp" },
  { id: "2", name: "Instagram" },
  { id: "3", name: "Facebook" },
  { id: "4", name: "Email" },
];

const mockTags: Tag[] = [
  { id: "1", name: "Suporte" },
  { id: "2", name: "Vendas" },
  { id: "3", name: "Dúvidas" },
  { id: "4", name: "Reclamações" },
];

// Hook personalizado para substituir os hooks com erro
const useTeamData = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  
  useEffect(() => {
    // Simula uma chamada de API
    setTimeout(() => {
      setData(mockTeamMembers);
    }, 500);
  }, []);
  
  return { data };
};

const useChannelsData = () => {
  const [data, setData] = useState<Channel[]>([]);
  
  useEffect(() => {
    // Simula uma chamada de API
    setTimeout(() => {
      setData(mockChannels);
    }, 500);
  }, []);
  
  return { data };
};

const useTagsData = () => {
  const [data, setData] = useState<Tag[]>([]);
  
  useEffect(() => {
    // Simula uma chamada de API
    setTimeout(() => {
      setData(mockTags);
    }, 500);
  }, []);
  
  return { data };
};

interface DashboardControlsProps {
  onPeriodChange: (period: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onRefresh: () => void;
  onExport: () => void;
  onAdvancedFilterChange: (filters: FilterOptions) => void;
}

const ensureSelectValue = (value: string | undefined, placeholder: string) => {
  if (!value) return placeholder;
  
  switch (value) {
    case "7dias": return "Últimos 7 dias";
    case "30dias": return "Últimos 30 dias";
    case "90dias": return "Últimos 90 dias";
    case "personalizado": return "Período personalizado";
    default: return value;
  }
};

const DashboardControls: React.FC<DashboardControlsProps> = ({
  onPeriodChange,
  onDateRangeChange,
  onRefresh,
  onExport,
  onAdvancedFilterChange
}) => {
  const [period, setPeriod] = useState<string>("30dias");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  
  // Substituindo os hooks com erro por hooks personalizados
  const { data: teamMembers = [] } = useTeamData();
  const { data: channels = [] } = useChannelsData();
  const { data: tags = [] } = useTagsData();

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange(value);

    // Ajustar o intervalo de datas com base no período selecionado
    const today = new Date();
    let from: Date;

    switch (value) {
      case "7dias":
        from = new Date(today);
        from.setDate(today.getDate() - 7);
        break;
      case "30dias":
        from = new Date(today);
        from.setDate(today.getDate() - 30);
        break;
      case "90dias":
        from = new Date(today);
        from.setDate(today.getDate() - 90);
        break;
      default:
        return;
    }

    const newRange = { from, to: today };
    setDate(newRange);
    onDateRangeChange(newRange);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDate(range);
    onDateRangeChange(range);
    
    if (range?.from && range?.to) {
      setPeriod("personalizado");
      onPeriodChange("personalizado");
    }
  };

  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Dados atualizados",
      description: "Os dados do dashboard foram atualizados com sucesso."
    });
  };

  const handleExport = () => {
    onExport();
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados. O download começará em instantes."
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select defaultValue={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={ensureSelectValue(period, "Selecione o período")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7dias">Últimos 7 dias</SelectItem>
            <SelectItem value="30dias">Últimos 30 dias</SelectItem>
            <SelectItem value="90dias">Últimos 90 dias</SelectItem>
            <SelectItem value="personalizado">Período personalizado</SelectItem>
          </SelectContent>
        </Select>

        {period === "personalizado" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                      {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um intervalo</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        )}
        
        <AdvancedFilters 
          onFilterChange={onAdvancedFilterChange}
          availableTeamMembers={teamMembers.map(m => ({ id: m.id, name: m.name }))}
          availableChannels={channels.map(c => ({ id: c.id, name: c.name }))}
          availableTags={tags.map(t => ({ id: t.id, name: t.name }))}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Atualizar
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default DashboardControls;