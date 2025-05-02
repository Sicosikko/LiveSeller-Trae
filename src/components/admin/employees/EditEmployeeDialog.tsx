
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee, departments, validateEmployeeData } from "./types";
import { UserRole } from "@/components/team/RoleSelector";
import { toast } from "sonner";

interface EditEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  setEmployee: (employee: Employee) => void;
  onSave: () => void;
}

const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  open,
  onClose,
  employee,
  setEmployee,
  onSave
}) => {
  const [localEmployee, setLocalEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
    department?: string;
  }>({});
  
  // Initialize localEmployee when the employee prop changes
  useEffect(() => {
    console.log("EditEmployeeDialog: employee changed", employee);
    if (employee) {
      setLocalEmployee({...employee});
      setValidationErrors({});
    } else {
      setLocalEmployee(null);
    }
  }, [employee]);

  const handleChange = <K extends keyof Employee>(key: K, value: Employee[K]) => {
    if (localEmployee) {
      // Clear validation error for this field if it exists
      if (validationErrors[key as keyof typeof validationErrors]) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: undefined
        }));
      }
      
      const updatedEmployee = {...localEmployee, [key]: value};
      setLocalEmployee(updatedEmployee);
    }
  };

  const validateEmployeeDataForm = (data: Employee | null): boolean => {
    if (!data) return false;
    
    // Usar a função de validação centralizada
    const validation = validateEmployeeData(data);
    
    if (!validation.isValid) {
      // Mapear erros para os campos específicos
      const errors: typeof validationErrors = {};
      
      validation.errors.forEach(error => {
        if (error.includes("Nome")) errors.name = error;
        else if (error.includes("Email")) errors.email = error;
        else if (error.includes("Função")) errors.role = error;
        else if (error.includes("Departamento")) errors.department = error;
      });
      
      setValidationErrors(errors);
      
      // Mostrar o primeiro erro como toast
      if (validation.errors.length > 0) {
        toast.error("Por favor, corrija os erros no formulário", {
          description: validation.errors[0]
        });
      }
      
      return false;
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!localEmployee) {
      console.error("Cannot save: employee is null");
      toast.error("Erro ao salvar funcionário: dados inválidos");
      return;
    }
    
    if (!validateEmployeeDataForm(localEmployee)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Atualizar o employee global antes de chamar onSave
      setEmployee(localEmployee);
      await onSave();
      console.log("Employee saved successfully:", localEmployee);
      handleDialogClose();
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Ocorreu um erro ao salvar os dados do funcionário");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dialog close properly with cleanup
  const handleDialogClose = () => {
    if (isLoading) {
      // Evitar fechamento durante o salvamento
      return;
    }
    console.log("EditEmployeeDialog: closing");
    setLocalEmployee(null);
    setIsLoading(false);
    setValidationErrors({});
    onClose();
  };

  // Render a safe version of the dialog even if employee is null
  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) handleDialogClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>
            Atualize as informações do funcionário.
          </DialogDescription>
        </DialogHeader>
        {localEmployee ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nome
              </Label>
              <div className="col-span-3">
                <Input
                  id="edit-name"
                  value={localEmployee.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={validationErrors.name ? "border-red-500" : ""}
                  required
                  disabled={isLoading}
                />
                {validationErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="edit-email"
                  type="email"
                  value={localEmployee.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={validationErrors.email ? "border-red-500" : ""}
                  required
                  disabled={isLoading}
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Função
              </Label>
              <div className="col-span-3">
                <Select 
                  value={localEmployee.role} 
                  onValueChange={(value) => handleChange("role", value as UserRole)}
                  disabled={isLoading}
                >
                  <SelectTrigger className={validationErrors.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="atendente">Atendente</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.role && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.role}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-department" className="text-right">
                Departamento
              </Label>
              <div className="col-span-3">
                <Select 
                  value={localEmployee.department} 
                  onValueChange={(value) => handleChange("department", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className={validationErrors.department ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.filter(d => d !== "Todos").map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.department && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.department}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select 
                value={localEmployee.status} 
                onValueChange={(value) => handleChange("status", value as 'active' | 'inactive')}
                disabled={isLoading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            Carregando informações do funcionário...
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleDialogClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            disabled={!localEmployee || isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
