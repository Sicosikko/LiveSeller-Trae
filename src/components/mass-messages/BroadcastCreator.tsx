
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigurationTab from "./broadcast-creator/ConfigurationTab";
import MessageTab from "./broadcast-creator/MessageTab";
import AudienceTab from "./broadcast-creator/AudienceTab";
import FooterActions from "./broadcast-creator/FooterActions";

const BroadcastCreator: React.FC = () => {
  const [message, setMessage] = useState("");
  const [previewMessage, setPreviewMessage] = useState("");
  const [broadcastName, setBroadcastName] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLeadsCount, setSelectedLeadsCount] = useState(0);

  const handleFormatting = (format: 'bold' | 'italic' | 'underline') => {
    let formattedText = message;
    let selectionStart = 0;
    let selectionEnd = message.length;
    
    // In a real implementation, we would use refs to get the actual selection
    // For demo purposes, we'll just wrap the entire message
    
    switch (format) {
      case 'bold':
        formattedText = `*${formattedText}*`;
        break;
      case 'italic':
        formattedText = `_${formattedText}_`;
        break;
      case 'underline':
        formattedText = `~${formattedText}~`;
        break;
    }
    
    setMessage(formattedText);
    updatePreview(formattedText);
  };
  
  const updatePreview = (text: string) => {
    // In a real implementation, this would parse WhatsApp markdown
    // For this demo, we'll just do a simple replacement
    let preview = text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/~(.*?)~/g, '<u>$1</u>');
      
    setPreviewMessage(preview);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // In a real implementation, this would parse the CSV/Excel file
      // For demo purposes, we'll just set a random number of leads
      setSelectedLeadsCount(Math.floor(Math.random() * 1000) + 100);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">Configuração</TabsTrigger>
          <TabsTrigger value="message">Mensagem</TabsTrigger>
          <TabsTrigger value="audience">Destinatários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4">
          <ConfigurationTab 
            broadcastName={broadcastName}
            setBroadcastName={setBroadcastName}
            scheduledDate={scheduledDate}
            setScheduledDate={setScheduledDate}
            scheduledTime={scheduledTime}
            setScheduledTime={setScheduledTime}
          />
        </TabsContent>
        
        <TabsContent value="message" className="space-y-4">
          <MessageTab 
            message={message}
            setMessage={setMessage}
            previewMessage={previewMessage}
            setPreviewMessage={setPreviewMessage}
            handleFormatting={handleFormatting}
            handleMessageChange={handleMessageChange}
          />
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-4">
          <AudienceTab 
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            selectedLeadsCount={selectedLeadsCount}
            setSelectedLeadsCount={setSelectedLeadsCount}
            handleFileChange={handleFileChange}
          />
        </TabsContent>
      </Tabs>
      
      <FooterActions />
    </div>
  );
};

export default BroadcastCreator;
