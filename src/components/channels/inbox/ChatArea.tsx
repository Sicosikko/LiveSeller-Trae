
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Contact } from "../types/inboxTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FeedbackForm from "./FeedbackForm";
import { MessageSquare, Send, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ChatAreaProps {
  selectedContact: Contact | null;
  getChannelIcon: (channel: string) => React.ReactNode;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedContact, getChannelIcon }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Em um sistema real, enviaria a mensagem via WebSocket
    console.log("Enviando mensagem:", message);
    toast.success("Mensagem enviada");
    setMessage("");
  };
  
  const handleFeedbackSubmit = async (rating: number, comment: string) => {
    // Em um sistema real, enviaremos para o Supabase
    console.log("Feedback enviado:", { 
      contactId: selectedContact?.id, 
      rating, 
      comment 
    });
    
    // Simulando uma chamada assíncrona
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  
  if (selectedContact) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              {getChannelIcon(selectedContact.channel)}
            </div>
            <div>
              <h3 className="font-medium">{selectedContact.name}</h3>
              <p className="text-xs text-muted-foreground">
                Conversa via {selectedContact.channel.charAt(0).toUpperCase() + selectedContact.channel.slice(1)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFeedback(true)}
            >
              <Star className="h-4 w-4 mr-1" />
              Avaliar
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Abrir Conversa
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
          {/* Aqui seria exibido o histórico de mensagens */}
          <div className="flex flex-col gap-4">
            <div className="bg-muted p-3 rounded-lg self-start max-w-[80%]">
              <p>Olá, como posso ajudar?</p>
              <span className="text-xs text-muted-foreground mt-1">10:30</span>
            </div>
            <div className="bg-primary text-primary-foreground p-3 rounded-lg self-end max-w-[80%]">
              <p>Gostaria de informações sobre os planos de assinatura</p>
              <span className="text-xs text-primary-foreground/80 mt-1">10:32</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea 
              placeholder="Digite sua mensagem..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              className="self-end"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4 mr-1" />
              Enviar
            </Button>
          </div>
        </div>
        
        <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
          <DialogContent>
            <FeedbackForm 
              chatId={selectedContact.id}
              onSubmit={handleFeedbackSubmit}
              onClose={() => setShowFeedback(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div className="hidden sm:flex flex-1 items-center justify-center bg-muted/30">
      <div className="text-center p-6">
        <p className="text-muted-foreground">Selecione uma conversa para começar</p>
      </div>
    </div>
  );
};

export default ChatArea;
