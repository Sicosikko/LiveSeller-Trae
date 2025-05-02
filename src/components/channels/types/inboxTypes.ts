
export interface Contact {
  id: string;
  name: string;
  message: string;
  time: string;
  channel: "whatsapp" | "instagram" | "messenger" | "telegram" | "email";
  unread: number;
  avatar?: string;
}

export interface Feedback {
  id: string;
  contactId: string;
  agentId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface ChatHistory {
  id: string;
  contactId: string;
  agentId: string;
  messages: ChatMessage[];
  startTime: Date;
  endTime?: Date;
  status: "active" | "ended" | "transferred";
  feedback?: Feedback;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: "agent" | "contact" | "system";
  content: string;
  timestamp: Date;
  attachments?: string[];
  read: boolean;
}

export interface QueueSettings {
  maxWaitTime: number;
  priorityThreshold: number;
  routingRules: RoutingRule[];
}

export interface RoutingRule {
  id: string;
  condition: "channel" | "keyword" | "customerType";
  value: string;
  targetAgentIds: string[];
  priority: "normal" | "high" | "urgent";
}
