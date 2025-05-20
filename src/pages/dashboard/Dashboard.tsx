
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Ghost } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="absolute top-16 right-16 opacity-5 pointer-events-none">
            <Ghost className="h-64 w-64 text-phantom-500" />
          </div>
          <Outlet />
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Dashboard;
