
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DraggableChatbotWidget from '@/components/chatbot/DraggableChatbotWidget';
import ChangelogNotes from '@/components/dashboard/ChangelogNotes';
import AnimatedGhost from '@/components/ui/AnimatedGhost';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 lg:p-6 relative">
          {/* Fantasmas animados decorativos com comportamentos melhorados */}
          <div className="absolute top-16 right-16 opacity-10 pointer-events-none hidden lg:block z-0">
            <AnimatedGhost size={256} color="#8b5cf6" variant="pac-man" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-15 pointer-events-none hidden md:block z-0">
            <AnimatedGhost size={128} color="#ec4899" variant="floating" />
          </div>
          <div className="absolute top-1/4 left-1/4 opacity-10 pointer-events-none hidden xl:block z-0">
            <AnimatedGhost size={96} color="#10b981" variant="pac-man" />
          </div>
          <div className="absolute top-1/3 right-1/3 opacity-15 pointer-events-none hidden lg:block z-0">
            <AnimatedGhost size={80} color="#f59e0b" variant="default" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 opacity-10 pointer-events-none hidden xl:block z-0">
            <AnimatedGhost size={112} color="#ef4444" variant="floating" />
          </div>
          
          {/* Main content com z-index superior aos fantasmas */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
      <DraggableChatbotWidget />
      <ChangelogNotes />
    </div>
  );
};

export default Dashboard;
