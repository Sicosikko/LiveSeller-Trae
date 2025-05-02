
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Clock, Laptop } from "lucide-react";
import { useThemeSwitcher } from "@/hooks/use-theme-switcher";

type Theme = 'light' | 'dark' | 'system' | 'device' | 'auto';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, availableThemes } = useThemeSwitcher();

  // Definir ícone apropriado conforme o tema
  const getIcon = () => {
    switch (theme as Theme) {
      case "light": return <Sun className="h-4 w-4" />;
      case "dark": return <Moon className="h-4 w-4" />;
      case "system": return <Monitor className="h-4 w-4" />;
      case "device": return <Laptop className="h-4 w-4" />;
      case "auto": return <Clock className="h-4 w-4" />;
      default: return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full transition-all duration-200 hover:bg-primary/10"
          aria-label="Alternar tema"
        >
          {getIcon()}
          <span className="sr-only">
            Alternar tema, tema atual: {
              theme === "light" ? "Claro" :
              theme === "dark" ? "Escuro" :
              theme === "system" ? "Sistema" :
              theme === "device" ? "Dispositivo" : "Automático"
            }
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in">
        {availableThemes.map((themeOption) => (
          <DropdownMenuItem 
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id as Theme)}
            className={`flex items-center gap-2 cursor-pointer ${theme === themeOption.id ? 'bg-primary/10' : ''}`}
          >
            {themeOption.id === "light" && <Sun className="mr-2 h-4 w-4" />}
            {themeOption.id === "dark" && <Moon className="mr-2 h-4 w-4" />}
            {themeOption.id === "system" && <Monitor className="mr-2 h-4 w-4" />}
            {themeOption.id === "device" && <Laptop className="mr-2 h-4 w-4" />}
            {themeOption.id === "auto" && <Clock className="mr-2 h-4 w-4" />}
            <span>{themeOption.name}</span>
            {theme === themeOption.id && (
              <span className="ml-auto rounded-full w-2 h-2 bg-primary" aria-hidden="true"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
