import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AutomationWorkflow {
  id: string;
  name: string;
  status: 'active' | 'paused';
  lastTriggered: string;
  triggerCount: number;
}

const ChannelAutomation = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelType, setChannelType] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/automation/workflows?channel=${channelType}`);
      if (!response.ok) throw new Error('Failed to fetch workflows');
      const data = await response.json();
      setWorkflows(data);
    } catch (error) {
      toast({
        title: 'Error loading workflows',
        description: 'Could not load automation workflows.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = () => {
    navigate('/automation/new');
  };

  useEffect(() => {
    fetchWorkflows();
  }, [channelType]);

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
        <h2 className="text-2xl font-bold">Automation Workflows</h2>
        <div className="flex gap-2">
          <Select value={channelType} onValueChange={setChannelType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ensureSelectValue('Filter by channel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="website">Website Chat</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleCreateWorkflow}>
            New Workflow
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {workflow.name}
                <span className={`text-sm ${
                  workflow.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {workflow.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Last triggered: {workflow.lastTriggered}
                </p>
                <p className="text-sm">
                  Total executions: {workflow.triggerCount}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate(`/automation/${workflow.id}`)}
                >
                  Manage Workflow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflows.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No automation workflows found.</p>
        </div>
      )}
    </div>
  );
};

export default ChannelAutomation;
