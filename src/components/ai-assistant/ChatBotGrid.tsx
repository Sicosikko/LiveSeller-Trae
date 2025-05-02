
import React from "react";
import { ChatBot } from "./types";
import BotCard from "./BotCard";
import EmptyBotCard from "./EmptyBotCard";

interface ChatBotGridProps {
  bots: ChatBot[];
  onCreateBot: () => void;
  filter?: "chatbot" | "automation" | "hybrid" | "all";
}

const ChatBotGrid: React.FC<ChatBotGridProps> = ({ 
  bots, 
  onCreateBot, 
  filter = "all"
}) => {
  // Filtrar os bots pelo tipo, se necessário
  const filteredBots = filter === "all" 
    ? bots 
    : bots.filter(bot => bot.type === filter || (filter === "chatbot" && bot.type === "hybrid"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}

      {filter === "all" && (
        <EmptyBotCard onClick={onCreateBot} />
      )}
    </div>
  );
};

export default ChatBotGrid;
