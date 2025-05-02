
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import RolePermissionsDialog from "@/components/team/RolePermissionsDialog";
import { UserRole } from "@/components/team/RoleSelector";
import { Employee, initialEmployeesData } from "./employees/types";

// Import refactored components
import EmployeeFilters from "./employees/EmployeeFilters";
import EmployeeTable from "./employees/EmployeeTable";
import AddEmployeeDialog from "./employees/AddEmployeeDialog";
import EditEmployeeDialog from "./employees/EditEmployeeDialog";
import DeleteEmployeeDialog from "./employees/DeleteEmployeeDialog";
import MessageDialog from "./employees/MessageDialog";

// Chave para armazenamento no localStorage
const EMPLOYEES_STORAGE_KEY = 'employeesData';

// Função para salvar dados com tratamento de erro
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Dados salvos em ${key}:`, data.length);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar dados em ${key}:`, error);
    return false;
  }
};

// Função para carregar dados com tratamento de erro
const loadFromStorage = <T extends any>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      console.log(`Nenhum dado encontrado em ${key}, usando dados padrão`);
      return defaultValue;
    }
    const parsedData = JSON.parse(storedData) as T;
    console.log(`Dados carregados de ${key}:`, Array.isArray(parsedData) ? parsedData.length : "objeto");
    return parsedData;
  } catch (error) {
    console.error(`Erro ao carregar dados de ${key}:`, error);
    return defaultValue;
  }
};

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Todos");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [employeeForPermissions, setEmployeeForPermissions] = useState<Employee | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<Employee | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "atendente" as UserRole,
    department: "Suporte",
    password: ""
  });
  
  // Filter employees based on criteria
  const filteredEmployees = employeesData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "Todos" || emp.department === departmentFilter;
    const matchesRole = roleFilter === "all" || emp.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });
  
  // Handle adding employee with enhanced validation
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.error("Por favor, preencha nome e email do funcionário.");
      return;
    }
    
    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmployee.email)) {
      toast.error("Por favor, insira um endereço de email válido.");
      return;
    }
    
    // Check if email already exists
    if (employeesData.some(emp => emp.email === newEmployee.email)) {
      toast.error("Já existe um funcionário com este email.");
      return;
    }
    
    const newEmployeeData: Employee = {
      id: uuidv4(),
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      department: newEmployee.department,
      status: 'active',
      lastLogin: "Agora",
      permissions: newEmployee.role === 'admin' ? ['all'] : ['chat_access']
    };
    
    const updatedEmployees = [...employeesData, newEmployeeData];
    setEmployeesData(updatedEmployees);
    
    // Salvar no localStorage com função aprimorada
    if (saveToStorage(EMPLOYEES_STORAGE_KEY, updatedEmployees)) {
      toast.success(`Funcionário adicionado`, {
        description: `${newEmployee.name} foi adicionado com sucesso à equipe.`
      });
    } else {
      toast.warning("Funcionário adicionado, mas houve um problema ao salvar os dados permanentemente.");
    }
    
    setShowAddDialog(false);
    setNewEmployee({
      name: "",
      email: "",
      role: "atendente",
      department: "Suporte",
      password: ""
    });
  };
  
  // Handle editing employee with enhanced validation and error handling
  const handleEditEmployee = () => {
    console.log("handleEditEmployee called, employee:", employeeToEdit);
    if (!employeeToEdit || !employeeToEdit.name || !employeeToEdit.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeToEdit.email)) {
      toast.error("Por favor, insira um endereço de email válido.");
      return;
    }
    
    // Check if email already exists (except for the employee being edited)
    if (employeesData.some(emp => emp.email === employeeToEdit.email && emp.id !== employeeToEdit.id)) {
      toast.error("Já existe um funcionário com este email.");
      return;
    }
    
    const updatedEmployees = employeesData.map(emp => 
      emp.id === employeeToEdit.id ? employeeToEdit : emp
    );
    
    setEmployeesData(updatedEmployees);
    
    // Salvar no localStorage com função aprimorada
    if (saveToStorage(EMPLOYEES_STORAGE_KEY, updatedEmployees)) {
      toast.success(`Funcionário atualizado`, {
        description: `${employeeToEdit.name} foi atualizado com sucesso.`
      });
    } else {
      toast.warning("Funcionário atualizado, mas houve um problema ao salvar os dados permanentemente.");
    }
    
    setShowEditDialog(false);
    setEmployeeToEdit(null);
  };
  
  // Handle removing employee with confirmação e tratamento de erros
  const handleRemoveEmployee = () => {
    if (!employeeToDelete) {
      toast.error("Erro ao remover funcionário: Nenhum funcionário selecionado.");
      setShowDeleteDialog(false);
      return;
    }
    
    try {
      const updatedEmployees = employeesData.filter(emp => emp.id !== employeeToDelete.id);
      setEmployeesData(updatedEmployees);
      
      // Salvar no localStorage com função aprimorada
      if (saveToStorage(EMPLOYEES_STORAGE_KEY, updatedEmployees)) {
        toast.success(`Funcionário removido`, {
          description: `${employeeToDelete.name} foi removido da equipe.`
        });
      } else {
        toast.warning("Funcionário removido, mas houve um problema ao salvar os dados permanentemente.");
      }
    } catch (error) {
      console.error("Erro ao remover funcionário:", error);
      toast.error("Ocorreu um erro ao remover o funcionário. Tente novamente.");
    } finally {
      setShowDeleteDialog(false);
      setEmployeeToDelete(null);
    }
  };
  
  // Configure employee editing
  const startEditEmployee = (employee: Employee) => {
    console.log("startEditEmployee called with employee:", employee);
    setEmployeeToEdit({...employee});
    setShowEditDialog(true);
  };
  
  // Configure employee deletion
  const confirmDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteDialog(true);
  };
  
  // Open permissions dialog
  const openPermissionsDialog = (employee: Employee) => {
    setEmployeeForPermissions({...employee});
    setShowPermissionsDialog(true);
  };
  
  // Save employee permissions with enhanced error handling
  const handleSavePermissions = (settings: any) => {
    if (!employeeForPermissions) {
      toast.error("Erro ao salvar permissões: Nenhum funcionário selecionado.");
      return;
    }
    
    try {
      const updatedEmployees = employeesData.map(emp => 
        emp.id === employeeForPermissions.id 
          ? {...emp, permissions: settings.enabledPermissions || []}
          : emp
      );
      
      setEmployeesData(updatedEmployees);
      
      // Salvar no localStorage com função aprimorada
      if (saveToStorage(EMPLOYEES_STORAGE_KEY, updatedEmployees)) {
        toast.success(`Permissões atualizadas`, {
          description: `As permissões de ${employeeForPermissions.name} foram atualizadas com sucesso.`
        });
      } else {
        toast.warning("Permissões atualizadas, mas houve um problema ao salvar os dados permanentemente.");
      }
    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
      toast.error("Ocorreu um erro ao salvar as permissões. Tente novamente.");
    } finally {
      setShowPermissionsDialog(false);
      setEmployeeForPermissions(null);
    }
  };
  
  // Open message dialog
  const openMessageDialog = (employee: Employee) => {
    setMessageRecipient({...employee});
    setMessageContent("");  // Reset message content
    setShowMessageDialog(true);
  };
  
  // Send message with enhanced error handling
  const handleSendMessage = async () => {
    if (!messageRecipient || !messageContent.trim()) {
      toast.error("Por favor, digite uma mensagem para enviar.");
      return;
    }
    
    try {
      // Simular envio de mensagem (poderia ser uma API call no futuro)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`Mensagem enviada`, {
        description: `Sua mensagem foi enviada para ${messageRecipient.name}.`
      });
      
      // Adicionar registro de mensagem enviada (opcional - poderia ser implementado no futuro)
      console.log(`Mensagem enviada para ${messageRecipient.name}: ${messageContent}`);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setShowMessageDialog(false);
      setMessageContent("");
      setMessageRecipient(null);
    }
  };
  
  // Load employees from localStorage on component mount using enhanced function
  useEffect(() => {
    setIsLoading(true);
    
    // Carregar dados com função aprimorada
    const loadedEmployees = loadFromStorage<Employee[]>(EMPLOYEES_STORAGE_KEY, initialEmployeesData);
    setEmployeesData(loadedEmployees);
    
    setIsLoading(false);
  }, []);
  
  // Return loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados dos funcionários...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <EmployeeFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        onAddEmployee={() => setShowAddDialog(true)}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Equipe</CardTitle>
          <CardDescription>
            Gerencie funcionários, papéis e permissões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeTable 
            employees={filteredEmployees}
            onEdit={startEditEmployee}
            onOpenPermissions={openPermissionsDialog}
            onSendMessage={openMessageDialog}
            onDelete={confirmDelete}
          />
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <AddEmployeeDialog 
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        onAddEmployee={handleAddEmployee}
      />
      
      <EditEmployeeDialog 
        open={showEditDialog}
        onClose={() => {
          console.log("EditEmployeeDialog closing");
          setShowEditDialog(false);
          setEmployeeToEdit(null);
        }}
        employee={employeeToEdit}
        setEmployee={setEmployeeToEdit}
        onSave={handleEditEmployee}
      />
      
      <DeleteEmployeeDialog 
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setEmployeeToDelete(null);
        }}
        employee={employeeToDelete}
        onDelete={handleRemoveEmployee}
      />
      
      <MessageDialog 
        open={showMessageDialog}
        onClose={() => {
          setShowMessageDialog(false);
          setMessageRecipient(null);
          setMessageContent("");
        }}
        employee={messageRecipient}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSend={handleSendMessage}
      />
      
      {/* Permissions Dialog */}
      {showPermissionsDialog && employeeForPermissions && (
        <RolePermissionsDialog
          open={showPermissionsDialog}
          onClose={() => {
            setShowPermissionsDialog(false);
            setEmployeeForPermissions(null);
          }}
          onSave={handleSavePermissions}
          initialRole={employeeForPermissions.role}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
