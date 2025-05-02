
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  endDate: Date;
  type: 'meeting' | 'demo' | 'call' | 'other';
  attendees: string[];
  teamMemberIds: string[];
  location?: string;
  googleEventId?: string;
  color?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CalendarSettings {
  workingHours: {
    start: string;
    end: string;
  };
  defaultEventDuration: number; // em minutos
  reminderTime: number; // em minutos antes do evento
  notifications: {
    team: boolean;
    customers: boolean;
    email: boolean;
    sms: boolean;
  };
  googleCalendarSync: {
    enabled: boolean;
    twoWay: boolean;
    autoSync: boolean;
    lastSynced?: Date;
  };
}
