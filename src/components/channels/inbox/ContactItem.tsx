import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { Contact } from "../types/inboxTypes";

interface ContactItemProps {
  contact: Contact;
  selectedContactId: string | null;
  onSelectContact: (contact: Contact) => void;
  getChannelIcon: (channel: string) => React.ReactNode;
  getChannelClass: (channel: string) => string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  selectedContactId,
  onSelectContact,
  getChannelIcon,
  getChannelClass,
}) => {
  return (
    <div
      key={contact.id}
      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted ${
        selectedContactId === contact.id ? "bg-muted" : ""
      }`}
      onClick={() => onSelectContact(contact)}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 rounded-full p-0.5 bg-white">
          {getChannelIcon(contact.channel)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm truncate">{contact.name}</h3>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className={`text-xs px-1.5 ${getChannelClass(contact.channel)}`}
            >
              {contact.channel.charAt(0).toUpperCase() + contact.channel.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground truncate">{contact.message}</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" /> {contact.time}
          </p>
          {contact.unread > 0 && (
            <Badge className="rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center bg-whatsapp text-white">
              {contact.unread}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
