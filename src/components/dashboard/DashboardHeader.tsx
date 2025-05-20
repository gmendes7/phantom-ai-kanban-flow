
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const DashboardHeader = () => {
  return (
    <header className="border-b border-border px-4 py-3 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-9 max-w-[240px]" 
            />
          </div>
          
          <Button size="icon" variant="ghost" className="relative">
            <Bell size={18} />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
