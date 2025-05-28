
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import ChangelogNotes from '@/components/dashboard/ChangelogNotes';
import { Ghost } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 lg:p-6 relative">
          {/* Fantasmas animados decorativos - hidden on mobile */}
          <div className="absolute top-16 right-16 opacity-5 pointer-events-none hidden lg:block">
            <Ghost className="h-64 w-64 text-phantom-500" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-10 pointer-events-none hidden md:block">
            <Ghost className="h-32 w-32 text-phantom-500 animate-bounce" />
          </div>
          <div className="absolute top-1/4 left-1/4 opacity-5 pointer-events-none hidden xl:block">
            <Ghost className="h-24 w-24 text-phantom-500 animate-pulse" />
          </div>
          
          {/* Main content with proper mobile spacing */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
      <ChatbotWidget />
      <ChangelogNotes />
    </div>
  );
};

export default Dashboard;
