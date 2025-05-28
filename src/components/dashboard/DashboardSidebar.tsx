
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Kanban, Settings, User, Menu, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-secondary/80 backdrop-blur-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${
          collapsed && !mobileOpen ? 'w-16' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-secondary transition-all duration-300 ease-in-out overflow-hidden border-r border-border`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border min-h-[64px]">
          {(!collapsed || mobileOpen) && (
            <h1 className="text-xl font-bold text-gradient">Phantom Kanban</h1>
          )}
          <div className="flex items-center gap-2">
            {/* Close button for mobile */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeMobileSidebar}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
            {/* Collapse button for desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* User profile */}
        <div className={`flex items-center ${collapsed && !mobileOpen ? 'justify-center' : 'justify-start'} p-4 border-b border-border`}>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="ml-3 overflow-hidden flex-1">
              <p className="truncate font-medium text-sm">{user?.name}</p>
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
            collapsed={collapsed && !mobileOpen}
            onClick={closeMobileSidebar}
          />
          <NavItem 
            to="/dashboard/settings" 
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed && !mobileOpen}
            onClick={closeMobileSidebar}
          />
        </nav>
        
        {/* Logout button */}
        <div className="p-2 border-t border-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className={`w-full justify-${collapsed && !mobileOpen ? 'center' : 'start'} text-muted-foreground hover:text-destructive min-h-[44px]`}
              >
                <LogOut size={20} />
                {(!collapsed || mobileOpen) && <span className="ml-2">Logout</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, collapsed, onClick }: NavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) => `
            flex items-center px-3 py-3 rounded-md transition-colors min-h-[44px]
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
