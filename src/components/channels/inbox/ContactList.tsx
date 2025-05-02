
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactItem from "./ContactItem";
import { Contact } from "../types/inboxTypes";

interface ContactListProps {
  filteredContacts: Contact[];
  selectedContact: Contact | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  getChannelIcon: (channel: string) => React.ReactNode;
  getChannelClass: (channel: string) => string;
}

const ContactList: React.FC<ContactListProps> = ({
  filteredContacts,
  selectedContact,
  setSelectedContact,
  getChannelIcon,
  getChannelClass,
}) => {
  return (
    <div className="w-full sm:w-80 md:w-96 border-r overflow-y-auto">
      <Tabs defaultValue="all">
        <div className="px-2 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">Não lidas</TabsTrigger>
            <TabsTrigger value="assigned" className="flex-1">Atribuídas</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0 p-0">
          <div className="space-y-1 p-2">
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                selectedContactId={selectedContact?.id || null}
                onSelectContact={setSelectedContact}
                getChannelIcon={getChannelIcon}
                getChannelClass={getChannelClass}
              />
            ))}
            {filteredContacts.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                Nenhuma conversa encontrada
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="unread" className="mt-0 p-0">
          <div className="p-6 text-center text-muted-foreground">
            Exibindo apenas conversas não lidas
          </div>
        </TabsContent>
        
        <TabsContent value="assigned" className="mt-0 p-0">
          <div className="p-6 text-center text-muted-foreground">
            Exibindo apenas conversas atribuídas a você
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactList;
