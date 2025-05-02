
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChatBot } from "./types";

interface StatusBadgeProps {
  status: ChatBot["status"];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-500">Ativo</Badge>;
    case "inactive":
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Inativo</Badge>;
    case "draft":
      return <Badge variant="outline" className="text-slate-500 border-slate-500">Rascunho</Badge>;
  }
};

interface TypeBadgeProps {
  type: ChatBot["type"];
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  switch (type) {
    case "chatbot":
      return <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">Chatbot</Badge>;
    case "automation":
      return <Badge variant="outline" className="bg-purple-100 text-purple-600 border-purple-200">Automação</Badge>;
    case "hybrid":
      return <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">Híbrido</Badge>;
  }
};
