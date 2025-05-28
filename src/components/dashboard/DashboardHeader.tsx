
import { Bell, Search, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import NotificationModal from './NotificationModal';

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="border-b border-border px-4 lg:px-6 py-3 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ghost className="h-5 w-5 text-phantom-500 hidden sm:block" />
            <h1 className="text-lg sm:text-xl font-bold hidden md:block">Painel</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar tarefas..." 
                className="pl-9 w-[200px] md:w-[240px] h-9" 
              />
            </div>
            
            {/* Mobile search button */}
            <Button size="icon" variant="ghost" className="sm:hidden h-10 w-10">
              <Search size={18} />
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="relative h-10 w-10"
              onClick={() => setShowNotifications(true)}
            >
              <Bell size={18} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      <NotificationModal 
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
    </>
  );
};

export default DashboardHeader;
