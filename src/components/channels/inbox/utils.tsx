
import React from "react";
import { MessageSquare, Instagram, Facebook, Send, Mail } from "lucide-react";

export const getChannelIcon = (channel: string): React.ReactNode => {
  switch (channel) {
    case 'whatsapp':
      return <MessageSquare className="h-4 w-4 text-green-600" />;
    case 'instagram':
      return <Instagram className="h-4 w-4 text-purple-600" />;
    case 'messenger':
      return <Facebook className="h-4 w-4 text-blue-600" />;
    case 'telegram':
      return <Send className="h-4 w-4 text-sky-600" />;
    case 'email':
      return <Mail className="h-4 w-4 text-rose-600" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

export const getChannelClass = (channel: string): string => {
  switch (channel) {
    case 'whatsapp':
      return "bg-green-100 text-green-800";
    case 'instagram':
      return "bg-purple-100 text-purple-800";
    case 'messenger':
      return "bg-blue-100 text-blue-800";
    case 'telegram':
      return "bg-sky-100 text-sky-800";
    case 'email':
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
