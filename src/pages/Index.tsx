
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle, 
  LayoutGrid, 
  MessageCircle, 
  Brain, 
  Calendar,
  Users,
  Zap
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">Phantom Kanban</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Phantom Kanban Flow AI
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            The intelligent Kanban board that uses AI to boost your productivity and streamline your workflow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login to Your Account
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-20 bottom-0 top-auto"></div>
            <img 
              src="https://i.imgur.com/8jIZ12h.png" 
              alt="Phantom Kanban Screenshot" 
              className="rounded-lg shadow-xl border border-border mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gradient">
            Powered by Intelligence
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-phantom-500" />}
              title="AI-Powered Insights"
              description="Get intelligent predictions and suggestions based on your task history and team performance."
            />
            <FeatureCard 
              icon={<LayoutGrid className="h-10 w-10 text-phantom-500" />}
              title="Flexible Kanban Board"
              description="Drag and drop tasks, customize columns, and organize your workflow exactly how you need it."
            />
            <FeatureCard 
              icon={<MessageCircle className="h-10 w-10 text-phantom-500" />}
              title="Intelligent Assistant"
              description="Get help and answers about your tasks from our AI-powered chat assistant."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose Phantom Kanban?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <BenefitItem 
                icon={<Zap className="h-5 w-5 text-phantom-500" />}
                title="Boost Productivity"
                description="Our AI suggests optimizations to your workflow to help you accomplish more in less time."
              />
              <BenefitItem 
                icon={<Calendar className="h-5 w-5 text-phantom-500" />}
                title="Smart Deadlines"
                description="Get realistic deadline predictions based on your historical performance data."
              />
              <BenefitItem 
                icon={<Users className="h-5 w-5 text-phantom-500" />}
                title="Team Collaboration"
                description="Assign tasks, share boards, and keep everyone synchronized on project progress."
              />
            </div>
            
            <div className="glass-panel rounded-xl p-8 flex items-center justify-center">
              <img 
                src="https://i.imgur.com/nS1SsZB.png" 
                alt="Phantom Kanban Task View"
                className="rounded-lg max-w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-6 bg-gradient-to-b from-phantom-600/20 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-muted-foreground">
            Join thousands of teams already using Phantom Kanban to boost their productivity.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gradient">Phantom Kanban</h2>
              <p className="text-sm text-muted-foreground">
                Developed by @schjneiderr
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Phantom Kanban Flow AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-panel p-6 rounded-lg text-center hover:shadow-lg transition-all">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 bg-secondary rounded-full p-2 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Index;
