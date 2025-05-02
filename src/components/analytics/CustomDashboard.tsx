
import React, { useState } from "react";
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

interface CustomDashboardProps {
  dateRange: {
    from: Date;
    to?: Date;
  };
}

// Componentes de gráfico disponíveis para adicionar
const availableCharts = [
  { id: "chart-messages", name: "Mensagens por Canal", type: "bar", size: "medium" },
  { id: "chart-clients", name: "Distribuição de Clientes", type: "pie", size: "small" },
  { id: "chart-conversion", name: "Taxa de Conversão", type: "line", size: "medium" },
  { id: "chart-team", name: "Desempenho da Equipe", type: "bar", size: "medium" },
  { id: "chart-revenue", name: "Receita por Produto", type: "bar", size: "large" },
  { id: "chart-regions", name: "Clientes por Região", type: "map", size: "large" },
  { id: "chart-sentiment", name: "Análise de Sentimento", type: "pie", size: "small" },
  { id: "chart-funnel", name: "Funil de Vendas", type: "funnel", size: "medium" },
  { id: "chart-hours", name: "Atendimentos por Hora", type: "line", size: "medium" },
];

// Layouts de dashboard pré-configurados
const dashboardLayouts = [
  { id: "overview", name: "Visão Geral", icon: "layout" },
  { id: "sales", name: "Vendas", icon: "dollar" },
  { id: "customer", name: "Clientes", icon: "users" },
  { id: "messages", name: "Mensagens", icon: "message-square" },
  { id: "blank", name: "Em Branco", icon: "plus" },
];

const CustomDashboard: React.FC<CustomDashboardProps> = ({ dateRange }) => {
  const [selectedLayout, setSelectedLayout] = useState("overview");
  const [dashboardName, setDashboardName] = useState("Meu Dashboard Personalizado");
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(dashboardName);
  
  // Simula componentes presentes neste dashboard
  const [dashboardItems, setDashboardItems] = useState([
    { id: "chart-1", component: "chart-messages", name: "Mensagens por Canal", size: "medium" },
    { id: "chart-2", component: "chart-clients", name: "Distribuição de Clientes", size: "small" },
    { id: "chart-3", component: "chart-conversion", name: "Taxa de Conversão", size: "medium" },
    { id: "chart-4", component: "chart-team", name: "Desempenho da Equipe", size: "large" },
  ]);
  
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
    }
  };
  
  const handleTitleSave = () => {
    setDashboardName(tempTitle);
    setEditingTitle(false);
  };
  
  const handleTitleCancel = () => {
    setTempTitle(dashboardName);
    setEditingTitle(false);
  };
  
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
          
          <Button variant="default">
            <Save className="h-4 w-4 mr-2" />
            Salvar Dashboard
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

// Componente Badge para usar nos items do dialog
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={cn("px-2 py-1 rounded-md text-xs font-medium", className)}>
      {children}
    </span>
  );
};

export default CustomDashboard;
