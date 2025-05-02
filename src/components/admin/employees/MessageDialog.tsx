
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "./types";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, Paperclip, Smile } from "lucide-react";

interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  messageContent: string;
  setMessageContent: (content: string) => void;
  onSend: () => void;
}

const MessageDialog: React.FC<MessageDialogProps> = ({
  open,
  onClose,
  employee,
  messageContent,
  setMessageContent,
  onSend
}) => {
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  // Handle dialog close properly with cleanup
  const handleDialogClose = () => {
    console.log("MessageDialog: closing");
    setMessageContent(""); // Clear message when closing
    setIsSending(false);
    setAttachments([]);
    onClose();
  };
  
  // Handle attachments
  const handleAttachment = () => {
    // Simulate adding an attachment
    if (attachments.length >= 3) {
      toast.warning("Limite máximo de 3 anexos atingido");
      return;
    }
    
    const mockAttachment = `arquivo-${attachments.length + 1}.pdf`;
    const newAttachments = [...attachments, mockAttachment];
    setAttachments(newAttachments);
    toast.info(`Anexo adicionado: ${mockAttachment}`);
  };
  
  // Handle emojis
  const handleEmoji = () => {
    const emojis = ["😊", "👍", "🎉", "✅", "⭐", "🚀"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessageContent(messageContent + randomEmoji);
  };
  
  // Handle mentions
  const handleMention = () => {
    setMessageContent(messageContent + "@");
  };
  
  // Safely handle send action with validation
  const handleSend = async () => {
    if (!employee) {
      console.error("Cannot send message: employee is null");
      toast.error("Erro: selecione um funcionário para enviar a mensagem");
      return;
    }
    
    if (!messageContent.trim()) {
      console.error("Cannot send empty message");
      toast.error("A mensagem não pode estar vazia");
      return;
    }
    
    setIsSending(true);
    
    try {
      await onSend();
      console.log(`Message sent to ${employee.name}: ${messageContent}`);
      
      // Log attachments if any
      if (attachments.length > 0) {
        console.log(`Attachments sent: ${attachments.join(', ')}`);
      }
      
      toast.success(`Mensagem enviada para ${employee.name}`, {
        description: "Sua mensagem foi entregue com sucesso."
      });
      handleDialogClose();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Ocorreu um erro ao enviar a mensagem");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) handleDialogClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enviar Mensagem</DialogTitle>
          <DialogDescription>
            {employee ? `Enviar uma mensagem para ${employee.name}` : "Enviar uma mensagem"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message-recipient" className="text-right">
              Destinatário
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              {employee && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                    <AvatarFallback>
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{employee.name}</span>
                </>
              )}
              {!employee && <span className="text-muted-foreground">Selecione um destinatário</span>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message-content" className="text-right pt-2">
              Mensagem
            </Label>
            <div className="col-span-3">
              <Textarea
                id="message-content"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="resize-none min-h-[100px]"
                placeholder="Digite sua mensagem..."
                disabled={!employee || isSending}
              />
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAttachment}
                    disabled={!employee || isSending}
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    Anexar
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEmoji}
                    disabled={!employee || isSending}
                  >
                    <Smile className="h-4 w-4 mr-1" />
                    Emoji
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleMention}
                    disabled={!employee || isSending}
                  >
                    <AtSign className="h-4 w-4 mr-1" />
                    Menção
                  </Button>
                </div>
                
                {attachments.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {attachments.length} anexo(s)
                  </span>
                )}
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-xs font-medium mb-1">Anexos:</p>
                  <ul className="text-xs space-y-1">
                    {attachments.map((file, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{file}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 w-5 p-0" 
                          onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                        >
                          ×
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleDialogClose} disabled={isSending}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={handleSend} 
            disabled={!employee || !messageContent.trim() || isSending}
          >
            {isSending ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
