
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface TeamProductivityData {
  totalTickets: number;
  resolvedTickets: number;
  averageResolutionTime: string;
  teamMembers: {
    id: string;
    name: string;
    ticketsResolved: number;
    averageResponseTime: string;
    satisfaction: number;
  }[];
}

const TeamProductivity = () => {
  const [data, setData] = useState<TeamProductivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');
  const { toast } = useToast();

  const fetchProductivityData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/team/productivity?period=${period}`);
      if (!response.ok) throw new Error('Failed to fetch productivity data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: 'Could not load team productivity metrics.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductivityData();
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
        <h2 className="text-2xl font-bold">Team Productivity</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={ensureSelectValue('Select period')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.totalTickets || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.resolvedTickets || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.averageResolutionTime || '0min'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Member Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.teamMembers.map((member) => (
              <div key={member.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{member.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {member.ticketsResolved} tickets resolved
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="font-medium">{member.averageResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <p className="font-medium">{member.satisfaction}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamProductivity;
