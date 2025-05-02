
import React from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Smile } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import FormattingToolbar from "./FormattingToolbar";
import VariableBadges from "./VariableBadges";

interface MessageEditorProps {
  message: string;
  setMessage: (value: string) => void;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  previewMessage: string;
  handleFormatting: (format: 'bold' | 'italic' | 'underline') => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({
  message,
  handleMessageChange,
  previewMessage,
  handleFormatting
}) => {
  return (
    <>
      <div className="border rounded-md p-2">
        <FormattingToolbar onFormat={handleFormatting} />
        <Textarea
          className="border-0 focus-visible:ring-0 resize-none min-h-[200px]"
          placeholder="Digite sua mensagem aqui..."
          value={message}
          onChange={handleMessageChange}
        />
      </div>
      
      <VariableBadges />
      
      <div className="space-y-2">
        <Label>Visualização</Label>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div 
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: previewMessage || 'Sua mensagem formatada aparecerá aqui...' }}
          />
        </div>
      </div>
    </>
  );
};

export default MessageEditor;
