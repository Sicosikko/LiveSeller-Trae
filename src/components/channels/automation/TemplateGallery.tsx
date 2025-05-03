
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ensureSelectValue } from '@/utils/selectUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  lastModified: string;
  usageCount: number;
}

const TemplateGallery = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('active');
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/templates?category=${category}&status=${status}`);
      if (!response.ok) throw new Error('Failed to fetch templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      toast({
        title: 'Error loading templates',
        description: 'Could not load template gallery. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [category, status]);

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
        <h2 className="text-2xl font-bold">Template Gallery</h2>
        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ensureSelectValue('Select category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="welcome">Welcome Messages</SelectItem>
              <SelectItem value="support">Support Responses</SelectItem>
              <SelectItem value="sales">Sales Follow-up</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ensureSelectValue('Select status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <p>Used {template.usageCount} times</p>
                  <p className="text-muted-foreground">Last modified: {template.lastModified}</p>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No templates found for the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
