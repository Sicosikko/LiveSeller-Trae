
import React, { useState } from "react";
import { Bell, User, Search, Settings, LogOut, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  title?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard", isLoading = false, children }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = useDebounce(async (query: string) => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      // Implement real search logic
    } catch (error) {
      toast({
        title: 'Search error',
        description: 'Failed to perform search',
        variant: 'destructive'
      });
    }
  }, 500);
  
  // Get first name from user's email if available
  const userName = user?.email ? user.email.split('@')[0] : 'Usuário';
  
  // Get initials for avatar
  const getInitials = () => {
    if (!user?.email) return 'U';
    
    const nameParts = userName.split('.');
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return userName.substring(0, 2).toUpperCase();
  };
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <header className="bg-background border-b sticky top-0 z-40 flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        {children}
        <h1 className="text-xl font-semibold flex items-center gap-2">
          {isLoading && <Loader className="h-4 w-4 animate-spin" />}
          {title}
        </h1>
      </div>
      
      <div className="hidden md:block flex-1 px-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('common.search')}
            className="w-full bg-background pl-8 border-muted-foreground/20 focus-visible:ring-primary/30"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center space-x-1 p-1 rounded-full hover:bg-accent focus-visible:ring-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-brand-blue text-white">{getInitials()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block font-medium text-sm">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex cursor-pointer items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{t('header.profile')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('header.settings')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('header.logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
