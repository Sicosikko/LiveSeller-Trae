
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface EngagementData {
  activeUsers: number;
  averageSessionDuration: string;
  engagementRate: number;
  userInteractions: {
    type: string;
    count: number;
  }[];
}

const EngagementMetrics = () => {
  const [data, setData] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('today');
  const { toast } = useToast();

  const fetchEngagementData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/engagement?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch engagement data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: 'Could not load engagement metrics.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngagementData();
  }, [timeframe]);

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
        <h2 className="text-2xl font-bold">Engagement Metrics</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={ensureSelectValue('Select timeframe')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.activeUsers || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.averageSessionDuration || '0min'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.engagementRate || 0}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.userInteractions.map((interaction) => (
            <div key={interaction.type} className="flex justify-between items-center py-2">
              <span>{interaction.type}</span>
              <span className="font-bold">{interaction.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementMetrics;
