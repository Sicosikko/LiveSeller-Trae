
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, Shield, Mail, UserMinus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Employee } from "./types";
import { roleDetails } from "@/components/team/RoleSelector";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onOpenPermissions: (employee: Employee) => void;
  onSendMessage: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onOpenPermissions,
  onSendMessage,
  onDelete
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead>Função</TableHead>
          <TableHead className="hidden md:table-cell">Departamento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Último Login</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {employee.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{employee.name}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{employee.email}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {roleDetails[employee.role].icon}
                <span>{roleDetails[employee.role].label}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
            <TableCell>
              <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                {employee.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{employee.lastLogin}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(employee)}>
                    <Settings className="h-4 w-4 mr-2" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onOpenPermissions(employee)}>
                    <Shield className="h-4 w-4 mr-2" /> Permissões
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSendMessage(employee)}>
                    <Mail className="h-4 w-4 mr-2" /> Enviar Mensagem
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive" 
                    onClick={() => onDelete(employee)}
                  >
                    <UserMinus className="h-4 w-4 mr-2" /> Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {employees.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              Nenhum funcionário encontrado com os filtros atuais.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
