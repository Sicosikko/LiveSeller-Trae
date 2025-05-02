
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MessageEditor from "./MessageEditor";

interface MessageTabProps {
  message: string;
  setMessage: (value: string) => void;
  previewMessage: string;
  setPreviewMessage: (value: string) => void;
  handleFormatting: (format: 'bold' | 'italic' | 'underline') => void;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageTab: React.FC<MessageTabProps> = ({
  message,
  setMessage,
  previewMessage,
  handleFormatting,
  handleMessageChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor de Mensagem</CardTitle>
        <CardDescription>Crie sua mensagem com formatação para WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MessageEditor 
          message={message}
          setMessage={setMessage}
          handleMessageChange={handleMessageChange}
          previewMessage={previewMessage}
          handleFormatting={handleFormatting}
        />
      </CardContent>
    </Card>
  );
};

export default MessageTab;
