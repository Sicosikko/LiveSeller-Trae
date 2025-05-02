
export interface FlowStep {
  id: string;
  type: "message" | "condition" | "delay" | "action";
  title: string;
  description?: string;
  config?: any;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  isActive: boolean;
  channels: string[];
  tags: string[];
  roleAccess: string[];
}
