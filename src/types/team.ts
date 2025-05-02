
import { UserRole } from "@/components/team/RoleSelector";

export interface TeamMemberPerformance {
  chats: number;
  satisfaction: number;
  responseTime: string;
  tasksCompleted: number;
  pendingTasks: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  performance: TeamMemberPerformance;
  status: 'online' | 'offline' | 'busy';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// Update the RolePermissionSettings interface to match the one in RolePermissionsDialog.tsx
export interface RolePermissionSettings {
  role: UserRole;
  permissions: {
    [module: string]: {
      [action: string]: boolean;
    };
  };
  enabledPermissions?: string[]; // Added to support both implementations
}
