
import React from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Smile } from "lucide-react";

interface FormattingToolbarProps {
  onFormat: (format: 'bold' | 'italic' | 'underline') => void;
}

const FormattingToolbar: React.FC<FormattingToolbarProps> = ({ onFormat }) => {
  return (
    <div className="flex items-center gap-2 border-b pb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => onFormat('bold')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => onFormat('italic')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => onFormat('underline')}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <Smile className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormattingToolbar;
