
import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Calendar } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface NotificationSettingsProps {
  sendNotificationsField: UseFormRegisterReturn;
  addToGoogleCalendarField: UseFormRegisterReturn;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  sendNotificationsField,
  addToGoogleCalendarField
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="send-notifications" className="text-sm font-medium">
            Enviar notificações automáticas
          </Label>
        </div>
        <Switch
          id="send-notifications"
          {...sendNotificationsField}
          defaultChecked={true}
        />
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="add-to-calendar" className="text-sm font-medium">
            Adicionar ao Google Calendar
          </Label>
        </div>
        <Switch
          id="add-to-calendar"
          {...addToGoogleCalendarField}
          defaultChecked={true}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
