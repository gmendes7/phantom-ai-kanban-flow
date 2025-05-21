
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Ghost,
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarCollapsed ? 'w-16' : 'w-64'} 
          bg-secondary border-r border-border h-screen transition-all duration-300 ease-in-out
          flex-shrink-0 md:block fixed md:relative z-40 top-0 left-0
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Ghost className="h-6 w-6 text-phantom-500" />
              <span className="font-bold text-gradient text-xl">Spectra</span>
            </div>
          )}
          
          {sidebarCollapsed && (
            <Ghost className="h-6 w-6 text-phantom-500 mx-auto" />
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={sidebarCollapsed ? 'mx-auto' : ''}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu size={18} />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-2 px-2">
            <li>
              <Link to="/admin">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'}`}
                >
                  <LayoutDashboard size={20} />
                  {!sidebarCollapsed && <span className="ml-2">Dashboard</span>}
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'}`}
                >
                  <Users size={20} />
                  {!sidebarCollapsed && <span className="ml-2">Usuários</span>}
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/configuracoes">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'}`}
                >
                  <Settings size={20} />
                  {!sidebarCollapsed && <span className="ml-2">Configurações</span>}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'} text-muted-foreground hover:text-destructive`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={`flex-1 min-h-screen flex flex-col w-full md:w-auto`}>
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden mr-2"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={18} />
            </Button>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-phantom-500/20 flex items-center justify-center">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="hidden md:inline">{user?.name || 'Admin'}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/perfil">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/configuracoes">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
        
        {/* Footer */}
        <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
          &copy; 2025 Spectra Admin. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
