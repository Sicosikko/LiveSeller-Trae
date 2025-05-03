
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Filter } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  lastContact: string;
  tags: string[];
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

const LeadsManager = () => {
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/leads?search=${searchTerm}&status=${status}&page=${page}&pageSize=10`
      );
      if (!response.ok) throw new Error('Failed to fetch leads');
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: 'Error loading leads',
        description: 'Could not load leads data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlockLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/block`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to block lead');
      
      toast({
        title: 'Lead blocked',
        description: 'The lead has been blocked successfully.',
      });
      
      fetchLeads(); // Refresh the list
    } catch (error) {
      toast({
        title: 'Error blocking lead',
        description: 'Could not block the lead. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [searchTerm, status, page]);

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
        <h2 className="text-2xl font-bold">Leads Management</h2>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ensureSelectValue('Filter by status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Last Contact</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.leads.map((lead) => (
                  <tr key={lead.id} className="border-b">
                    <td className="p-2">{lead.name}</td>
                    <td className="p-2">
                      {lead.phone}<br/>
                      <span className="text-sm text-muted-foreground">{lead.email}</span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lead.status === 'active' ? 'bg-green-100 text-green-800' :
                        lead.status === 'blocked' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-2">{lead.lastContact}</td>
                    <td className="p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlockLead(lead.id)}
                        disabled={lead.status === 'blocked'}
                      >
                        Block
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {data?.leads.length} of {data?.total} leads
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={data?.leads.length < 10}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManager;
