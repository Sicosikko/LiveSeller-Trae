
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { isDeveloperAccount } from '@/utils/developerAccess';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Displays a special badge for developers of the SaaS platform
 */
const DeveloperBadge: React.FC = () => {
  const { user } = useAuth();
  
  if (!user?.email || !isDeveloperAccount(user.email)) {
    return null;
  }

  return (
    <Badge className="bg-purple-600 text-white hover:bg-purple-700">
      <Shield className="h-3 w-3 mr-1" />
      Desenvolvedor
    </Badge>
  );
};

export default DeveloperBadge;
