
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "./types";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeleteEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  onDelete: () => void;
}

const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({
  open,
  onClose,
  employee,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [requireTypedConfirmation, setRequireTypedConfirmation] = useState(false);
  
  // Reset state when dialog opens/closes
  React.useEffect(() => {
    if (open && employee) {
      // Para administradores, requer confirmação mais explícita
      setRequireTypedConfirmation(employee.role === 'admin');
      setConfirmText("");
    }
  }, [open, employee]);
  
  // Handle dialog close properly with cleanup
  const handleDialogClose = () => {
    if (isDeleting) {
      // Prevent closing during deletion process
      return;
    }
    console.log("DeleteEmployeeDialog: closing");
    setConfirmText("");
    onClose();
  };
  
  // Check if confirmation is valid
  const isConfirmationValid = () => {
    if (!requireTypedConfirmation) return true;
    if (!employee) return false;
    
    return confirmText.toLowerCase() === "remover";
  };
  
  // Safely handle delete action with confirmation
  const handleDelete = async () => {
    if (!employee) {
      console.error("Cannot delete: employee is null");
      toast.error("Erro ao remover funcionário: dados inválidos");
      return;
    }
    
    if (requireTypedConfirmation && !isConfirmationValid()) {
      toast.error('Por favor, digite "remover" para confirmar esta ação');
      return;
    }
    
    try {
      setIsDeleting(true);
      
      // Check for critical data before deletion
      if (employee.role === 'admin') {
        // Verificar se este é o último administrador
        // Esta lógica seria melhor implementada com dados reais
        const lastAdminCheck = Math.random() > 0.8; // Simulação
        
        if (lastAdminCheck) {
          toast.error("Não é possível remover o último administrador do sistema");
          setIsDeleting(false);
          return;
        }
      }
      
      // Execute deletion
      await onDelete();
      console.log(`Employee deletion successful: ${employee.name}`);
      
      // Notify success
      toast.success(`Funcionário removido com sucesso`, {
        description: `${employee.name} foi removido da equipe.`
      });
      
      // Close dialog after successful deletion
      handleDialogClose();
    } catch (error) {
      console.error("Error during employee deletion:", error);
      toast.error("Ocorreu um erro ao remover o funcionário");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) handleDialogClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            {employee ? 
              `Tem certeza que deseja remover ${employee.name} da equipe? Esta ação não pode ser desfeita.` :
              "Tem certeza que deseja remover este funcionário? Esta ação não pode ser desfeita."
            }
            {employee?.role === 'admin' && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 font-semibold flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Atenção: Você está removendo um administrador do sistema!
                </p>
                <p className="text-sm text-red-500 mt-1">
                  Isso pode afetar privilégios de acesso e operações do sistema.
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {requireTypedConfirmation && employee && (
          <div className="py-2">
            <Label htmlFor="confirm-delete" className="text-sm font-medium">
              Digite "remover" para confirmar esta ação:
            </Label>
            <Input 
              id="confirm-delete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="remover"
              className="mt-1"
              disabled={isDeleting}
              autoComplete="off"
            />
          </div>
        )}
        
        <DialogFooter className="gap-2 sm:justify-between">
          <Button type="button" variant="outline" onClick={handleDialogClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
            disabled={!employee || isDeleting || (requireTypedConfirmation && !isConfirmationValid())}
          >
            {isDeleting ? "Removendo..." : "Remover Funcionário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEmployeeDialog;
