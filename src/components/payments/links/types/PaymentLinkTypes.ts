
export interface PaymentLink {
  id: string;
  name: string;
  description?: string;
  value: number;
  currency: string; // Added currency field
  url: string;
  status: "active" | "expired" | "completed";
  created: string;
  expires: string | null;
  uses: number;
  maxUses: number | null;
  syncStatus?: "synced" | "pending" | "failed";
  lastSynced?: string;
}

export interface PaymentLinkSyncResponse {
  success: boolean;
  message: string;
  links?: PaymentLink[];
  timestamp: string;
}

export type SyncStrategy = "optimistic" | "pessimistic";
