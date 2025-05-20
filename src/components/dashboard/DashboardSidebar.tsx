
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Kanban, Settings, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div 
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col bg-secondary transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gradient">Phantom Kanban</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      {/* User profile */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-4 border-b border-border`}>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {user?.name?.charAt(0) || 'U'}
        </div>
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <p className="truncate font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        <NavItem 
          to="/dashboard/kanban" 
          icon={<Kanban size={20} />}
          label="Kanban Board"
          collapsed={collapsed}
        />
        <NavItem 
          to="/dashboard/settings" 
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>
      
      {/* Logout button */}
      <div className="p-2 border-t border-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className={`w-full justify-${collapsed ? 'center' : 'start'} text-muted-foreground hover:text-destructive`}
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon, label, collapsed }: NavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => `
            flex items-center px-3 py-2 rounded-md transition-colors
            ${isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-foreground hover:bg-secondary-foreground/10'
            }
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          {icon}
          {!collapsed && <span className="ml-2">{label}</span>}
        </NavLink>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default DashboardSidebar;
