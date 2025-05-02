
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { useRecentChats } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RecentChats: React.FC = () => {
  const { data, isLoading, isError } = useRecentChats();
  const navigate = useNavigate();

  const navigateToInbox = (chatId: string) => {
    navigate(`/channels/inbox/${chatId}`);
  };

  const navigateToAllChats = () => {
    navigate('/channels/inbox');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversas Recentes</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversas Recentes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">Nenhuma conversa recente encontrada</p>
          <Button onClick={navigateToAllChats}>Ver todas as conversas</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-0">
          {data.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigateToInbox(chat.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {chat.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">{chat.time}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.message}
                  </p>
                  <div className="flex items-center">
                    {chat.unread > 0 ? (
                      <Badge variant="default" className="rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center bg-whatsapp text-white">
                        {chat.unread}
                      </Badge>
                    ) : (
                      <CheckCheck className="h-4 w-4 text-whatsapp" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pt-2 pb-4">
          <Button variant="outline" className="w-full" onClick={navigateToAllChats}>
            Ver todas as conversas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentChats;
