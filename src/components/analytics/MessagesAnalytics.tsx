
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface MessageAnalytics {
  totalMessages: number;
  responseRate: number;
  averageResponseTime: string;
  messagesByChannel: {
    channel: string;
    count: number;
  }[];
}

const MessagesAnalytics = () => {
  const [data, setData] = useState<MessageAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7');
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/messages?period=${period}`);
      if (!response.ok) throw new Error('Falha ao carregar dados');
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível obter as métricas de mensagens.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Análise de Mensagens</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={ensureSelectValue('Selecione o período')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="15">Últimos 15 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.totalMessages || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.responseRate || 0}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.averageResponseTime || '0min'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de mensagens por canal */}
      <Card>
        <CardHeader>
          <CardTitle>Mensagens por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.messagesByChannel.map((item) => (
            <div key={item.channel} className="flex justify-between items-center py-2">
              <span>{item.channel}</span>
              <span className="font-bold">{item.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesAnalytics;
