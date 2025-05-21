
import { useState } from 'react';
import { 
  Palette, 
  Check 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface ThemeOption {
  name: string;
  key: string;
  colors: {
    todo: string;
    inprogress: string;
    review: string;
    done: string;
    bg: string;
  };
}

const themes: ThemeOption[] = [
  {
    name: 'Roxo (Padrão)',
    key: 'purple',
    colors: {
      todo: '#6366f1',
      inprogress: '#8b5cf6',
      review: '#ec4899',
      done: '#10b981',
      bg: 'bg-background'
    }
  },
  {
    name: 'Azul',
    key: 'blue',
    colors: {
      todo: '#3b82f6',
      inprogress: '#6366f1',
      review: '#8b5cf6',
      done: '#10b981',
      bg: 'bg-blue-950/30'
    }
  },
  {
    name: 'Verde',
    key: 'green',
    colors: {
      todo: '#10b981',
      inprogress: '#3b82f6',
      review: '#8b5cf6',
      done: '#22c55e',
      bg: 'bg-green-950/20'
    }
  },
  {
    name: 'Preto',
    key: 'black',
    colors: {
      todo: '#6b7280',
      inprogress: '#4b5563',
      review: '#374151',
      done: '#1f2937',
      bg: 'bg-black'
    }
  },
  {
    name: 'Branco',
    key: 'white',
    colors: {
      todo: '#d1d5db',
      inprogress: '#9ca3af',
      review: '#6b7280',
      done: '#4b5563',
      // Corrigido para usar duas classes separadas ao invés de uma string com espaço
      bg: 'bg-white text-black'
    }
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  onSelectTheme: (theme: ThemeOption) => void;
}

const ThemeSelector = ({ currentTheme, onSelectTheme }: ThemeSelectorProps) => {
  const handleSelectTheme = (theme: ThemeOption) => {
    onSelectTheme(theme);
    toast.success(`Tema alterado para ${theme.name}`);
  };

  const getCurrentTheme = () => {
    return themes.find(theme => theme.key === currentTheme) || themes[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span>Temas</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem 
            key={theme.key}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSelectTheme(theme)}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                <div className="w-3 h-6 rounded-l-sm" style={{ backgroundColor: theme.colors.todo }}></div>
                <div className="w-3 h-6" style={{ backgroundColor: theme.colors.inprogress }}></div>
                <div className="w-3 h-6" style={{ backgroundColor: theme.colors.review }}></div>
                <div className="w-3 h-6 rounded-r-sm" style={{ backgroundColor: theme.colors.done }}></div>
              </div>
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.key && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
export { themes };
