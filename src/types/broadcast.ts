
export type BroadcastStatus = 'scheduled' | 'in-progress' | 'paused' | 'completed' | 'cancelled';

export interface Broadcast {
  id: string;
  name: string;
  status: BroadcastStatus;
  scheduledFor: string;
  totalRecipients: number;
  sent: number;
  failed: number;
  pending: number;
  messageTemplate: string;
  attachments?: string[];
  tags?: string[];
  created: Date;
  createdBy: string;
  modified?: Date;
}

export interface BroadcastFilter {
  status?: BroadcastStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface BroadcastStats {
  total: number;
  active: number;
  scheduled: number;
  completed: number;
  successRate: number;
  avgDeliveryTime: number;
}
