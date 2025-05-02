
import React, { useState } from "react";
import { Broadcast, BroadcastStatus } from "@/types/broadcast";
import { useApp } from "@/contexts/AppContext";
import BroadcastSearchBar from "./broadcast-list/BroadcastSearchBar";
import StatusFilter from "./broadcast-list/StatusFilter";
import BroadcastCard from "./broadcast-list/BroadcastCard";
import EmptyState from "./broadcast-list/EmptyState";

// Mock data
const broadcasts: Broadcast[] = [
  {
    id: "1",
    name: "Campanha Promocional Julho",
    status: "scheduled",
    scheduledFor: "2025-07-01T14:00:00",
    totalRecipients: 2500,
    sent: 0,
    failed: 0,
    pending: 2500,
    messageTemplate: "Olá, {nome}! Temos uma oferta especial para você...",
    tags: ["promo", "julho"],
    created: new Date("2025-06-15"),
    createdBy: "admin"
  },
  {
    id: "2",
    name: "Notificação de Novos Produtos",
    status: "in-progress",
    scheduledFor: "2025-06-28T10:00:00",
    totalRecipients: 1800,
    sent: 750,
    failed: 32,
    pending: 1018,
    messageTemplate: "Olá, {nome}! Conheça nossos novos produtos...",
    attachments: ["catalogo.pdf"],
    tags: ["produto", "lancamento"],
    created: new Date("2025-06-20"),
    createdBy: "admin"
  },
  {
    id: "3",
    name: "Pesquisa de Satisfação",
    status: "completed",
    scheduledFor: "2025-06-20T09:00:00",
    totalRecipients: 1200,
    sent: 1150,
    failed: 50,
    pending: 0,
    messageTemplate: "Olá, {nome}! Como foi sua experiência com nosso produto?...",
    tags: ["pesquisa", "feedback"],
    created: new Date("2025-06-10"),
    createdBy: "admin",
    modified: new Date("2025-06-21"),
  },
  {
    id: "4",
    name: "Lembrete de Evento",
    status: "paused",
    scheduledFor: "2025-06-25T16:00:00",
    totalRecipients: 500,
    sent: 125,
    failed: 8,
    pending: 367,
    messageTemplate: "Olá, {nome}! Não esqueça do nosso evento amanhã...",
    attachments: ["convite.jpg"],
    tags: ["evento", "lembrete"],
    created: new Date("2025-06-18"),
    createdBy: "marketing",
  },
  {
    id: "5",
    name: "Recuperação de Carrinho",
    status: "cancelled",
    scheduledFor: "2025-06-22T11:00:00",
    totalRecipients: 780,
    sent: 0,
    failed: 0,
    pending: 0,
    messageTemplate: "Olá, {nome}! Você deixou produtos no seu carrinho...",
    tags: ["carrinho", "abandono"],
    created: new Date("2025-06-15"),
    createdBy: "sales",
    modified: new Date("2025-06-18"),
  },
];

const BroadcastList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { isConnected } = useApp();
  
  const filteredBroadcasts = broadcasts.filter(broadcast => {
    const matchesSearch = broadcast.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || broadcast.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <BroadcastSearchBar search={search} setSearch={setSearch} />
        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>

      {filteredBroadcasts.length === 0 ? (
        <EmptyState />
      ) : (
        filteredBroadcasts.map((broadcast) => (
          <BroadcastCard 
            key={broadcast.id}
            broadcast={broadcast} 
            isConnected={isConnected}
          />
        ))
      )}
    </div>
  );
};

export default BroadcastList;
