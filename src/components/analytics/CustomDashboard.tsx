
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Maximize2, Trash2, MoveVertical, Edit, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { fetchDashboardCharts, fetchDashboardLayouts, saveDashboard } from "@/services/dashboardService";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface CustomDashboardProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

const CustomDashboard: React.FC<CustomDashboardProps> = ({ dateRange }) => {
  const [selectedLayout, setSelectedLayout] = useState("overview");
  const [dashboardName, setDashboardName] = useState("Meu Dashboard");
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(dashboardName);
  const [availableCharts, setAvailableCharts] = useState([]);
  const [dashboardLayouts, setDashboardLayouts] = useState([]);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [chartsData, layoutsData] = await Promise.all([
          fetchDashboardCharts(),
          fetchDashboardLayouts()
        ]);
        
        setAvailableCharts(chartsData);
        setDashboardLayouts(layoutsData);
        
        // Carregar itens do layout selecionado
        const selectedItems = layoutsData.find(layout => layout.id === selectedLayout)?.items || [];
        setDashboardItems(selectedItems);
        
      } catch (error) {
        toast({
          title: "Erro ao carregar dashboard",
          description: "Não foi possível carregar os dados do dashboard. Tente novamente.",
          variant: "destructive"
        });
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, [selectedLayout, toast]);
  
  // Manipula reordenação dos itens via drag-and-drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(dashboardItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setDashboardItems(items);
  };
  
  const handleRemoveItem = (id: string) => {
    setDashboardItems(dashboardItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removido",
      description: "O componente foi removido do dashboard."
    });
  };
  
  const handleAddNewChart = (chartId: string) => {
    const chartToAdd = availableCharts.find(chart => chart.id === chartId);
    if (chartToAdd) {
      setDashboardItems([
        ...dashboardItems, 
        { 
          id: `chart-${dashboardItems.length + 1}-${Date.now()}`, 
          component: chartId, 
          name: chartToAdd.name,
          size: chartToAdd.size
        }
      ]);
      
      toast({
        title: "Componente adicionado",
        description: `${chartToAdd.name} foi adicionado ao dashboard.`
      });
    }
  };
  
  const handleTitleSave = () => {
    setDashboardName(tempTitle);
    setEditingTitle(false);
    
    toast({
      title: "Nome atualizado",
      description: "O nome do dashboard foi atualizado com sucesso."
    });
  };
  
  const handleTitleCancel = () => {
    setTempTitle(dashboardName);
    setEditingTitle(false);
  };
  
  const handleSaveDashboard = async () => {
    setIsLoading(true);
    try {
      await saveDashboard({
        id: selectedLayout,
        name: dashboardName,
        items: dashboardItems
      });
      
      toast({
        title: "Dashboard salvo",
        description: "Suas alterações foram salvas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o dashboard. Tente novamente.",
        variant: "destructive"
      });
      console.error("Erro ao salvar dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && dashboardItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando dashboard...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          {editingTitle ? (
            <div className="flex gap-2 items-center">
              <Input 
                value={tempTitle}
                onChange={e => setTempTitle(e.target.value)}
                className="h-9 py-1"
                placeholder="Nome do dashboard"
              />
              <Button variant="ghost" size="icon" onClick={handleTitleSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleTitleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{dashboardName}</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditingTitle(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar layout" />
            </SelectTrigger>
            <SelectContent>
              {dashboardLayouts.map(layout => (
                <SelectItem key={layout.id} value={layout.id}>
                  {layout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Adicionar Gráfico</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Componente</DialogTitle>
                <DialogDescription>
                  Selecione um componente para adicionar ao seu dashboard personalizado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                  {availableCharts.map(chart => (
                    <Button
                      key={chart.id}
                      variant="outline"
                      className="h-auto p-4 justify-start"
                      onClick={() => handleAddNewChart(chart.id)}
                    >
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">{chart.name}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-primary/20 text-primary">
                            {chart.type}
                          </Badge>
                          <Badge className="bg-muted text-muted-foreground">
                            {chart.size}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="default" 
            onClick={handleSaveDashboard}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Dashboard
              </>
            )}
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]"
            >
              {dashboardItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "col-span-1",
                        item.size === "small" && "col-span-1",
                        item.size === "medium" && "md:col-span-2",
                        item.size === "large" && "md:col-span-4",
                      )}
                    >
                      <Card className="border-2 border-dashed h-full">
                        <CardHeader className="pb-2 cursor-move" {...provided.dragHandleProps}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MoveVertical className="h-4 w-4 text-muted-foreground" />
                              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleRemoveItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Maximize2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-6 h-[200px] text-muted-foreground text-sm border-t border-dashed">
                          Componente de visualização {item.name}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {dashboardItems.length === 0 && (
                <div className="col-span-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Este dashboard está vazio. Adicione componentes usando o botão acima.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Componente
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Componente</DialogTitle>
                          <DialogDescription>
                            Selecione um componente para adicionar ao seu dashboard personalizado.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                            {availableCharts.map(chart => (
                              <Button
                                key={chart.id}
                                variant="outline"
                                className="h-auto p-4 justify-start"
                                onClick={() => handleAddNewChart(chart.id)}
                              >
                                <div className="flex flex-col items-start text-left">
                                  <span className="font-medium">{chart.name}</span>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge className="bg-primary/20 text-primary">
                                      {chart.type}
                                    </Badge>
                                    <Badge className="bg-muted text-muted-foreground">
                                      {chart.size}
                                    </Badge>
                                  </div>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

// At the bottom of the file, rename the custom Badge component to CustomBadge
const CustomBadge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={cn("px-2 py-1 rounded-md text-xs font-medium", className)}>
      {children}
    </span>
  );
};

export default CustomDashboard;
