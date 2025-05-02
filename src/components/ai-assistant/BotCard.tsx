
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bot, BarChart2, MessageSquare, Edit, Trash2, Settings } from "lucide-react";
import { ChatBot } from "./types";
import { StatusBadge, TypeBadge } from "./StatusBadges";

interface BotCardProps {
  bot: ChatBot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  return (
    <Card key={bot.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center">
              {bot.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">{bot.description}</CardDescription>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <StatusBadge status={bot.status} />
            <TypeBadge type={bot.type} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {bot.status === "active" ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Satisfação</span>
                <span className="font-medium">{bot.satisfaction}%</span>
              </div>
              <Progress value={bot.satisfaction} className="h-1" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Interações</span>
              <span className="font-medium">{bot.interactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Última atualização</span>
              <span>{bot.lastUpdated}</span>
            </div>
            {bot.languages && (
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-muted-foreground">Idiomas:</span>
                {bot.languages.map((lang) => (
                  <Badge key={lang} variant="outline" className="text-xs bg-blue-50">{lang}</Badge>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            <Bot className="mx-auto h-8 w-8 mb-2 opacity-40" />
            <p>Este assistente ainda não foi publicado</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t bg-muted/30">
        <div className="flex gap-2">
          {bot.status === "active" && (
            <>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <BarChart2 className="h-3.5 w-3.5 mr-1" /> Analytics
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <MessageSquare className="h-3.5 w-3.5 mr-1" /> Conversas
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BotCard;
