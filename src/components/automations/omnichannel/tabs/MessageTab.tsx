
import React from "react";
import ChannelTemplate from "../ChannelTemplate";
import { MessageSquare, Mail, Phone } from "lucide-react";

interface MessageTabProps {
  enabledChannels: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  toggleChannel: (channel: keyof MessageTabProps["enabledChannels"]) => void;
}

const MessageTab: React.FC<MessageTabProps> = ({ enabledChannels, toggleChannel }) => {
  return (
    <>
      <ChannelTemplate 
        channel="WhatsApp" 
        icon={<MessageSquare className="h-5 w-5 text-green-600" />}
        enabled={enabledChannels.whatsapp}
        onToggle={() => toggleChannel("whatsapp")}
      />
      
      <ChannelTemplate 
        channel="Email" 
        icon={<Mail className="h-5 w-5 text-blue-600" />}
        enabled={enabledChannels.email}
        onToggle={() => toggleChannel("email")}
      />
      
      <ChannelTemplate 
        channel="SMS" 
        icon={<Phone className="h-5 w-5 text-amber-600" />}
        enabled={enabledChannels.sms}
        onToggle={() => toggleChannel("sms")}
      />
    </>
  );
};

export default MessageTab;
