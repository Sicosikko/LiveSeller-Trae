
import React from "react";
import { Shield, Users, MessageSquare, Bot, BarChart, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export type UserRole = "admin" | "editor" | "atendente" | "vendedor";

export const roleDetails: Record<UserRole, { 
  label: string; 
  description: string; 
  icon: JSX.Element; 
  color: string;
}> = {
  "admin": {
    label: "Administrador",
    description: "Acesso completo ao sistema e todas as funcionalidades.",
    icon: <Shield className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 border-red-200"
  },
  "editor": {
    label: "Editor",
    description: "Pode gerenciar conteúdo, chatbots e configurações de atendimento.",
    icon: <Bot className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  "atendente": {
    label: "Atendente",
    description: "Pode responder conversas e atender clientes.",
    icon: <MessageSquare className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 border-green-200"
  },
  "vendedor": {
    label: "Vendedor",
    description: "Pode gerenciar leads e processar vendas.",
    icon: <BarChart className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
};

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  value, 
  onChange,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role">Função</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as UserRole)}
        disabled={disabled}
      >
        <SelectTrigger id="role" className="w-full">
          <SelectValue placeholder="Selecione uma função" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(roleDetails).map(([role, details]) => (
            <SelectItem key={role} value={role}>
              <div className="flex items-center gap-2">
                <span className="mr-1">{details.icon}</span>
                {details.label}
                {role === "admin" && (
                  <Badge variant="outline" className="ml-auto flex items-center gap-1 border-red-200 bg-red-50">
                    <Lock className="h-3 w-3" /> Restrito
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        {roleDetails[value].description}
      </p>
    </div>
  );
};

export default RoleSelector;
