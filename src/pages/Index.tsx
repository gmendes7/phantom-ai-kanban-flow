
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
  Zap,
  Ghost
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ghost className="h-6 w-6 text-phantom-500" />
            <h1 className="text-2xl font-bold text-gradient">Phantom Kanban</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Ghost className="h-20 w-20 text-phantom-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Phantom Kanban Flow AI
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            O quadro Kanban inteligente que usa IA para aumentar sua produtividade e otimizar seu fluxo de trabalho
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Entrar na sua Conta
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-20 bottom-0 top-auto"></div>
            <div className="relative glass-panel rounded-lg p-10 border border-border mx-auto max-w-4xl">
              <Ghost className="absolute -top-10 -left-5 h-16 w-16 text-phantom-500 animate-bounce opacity-70" />
              <Ghost className="absolute -bottom-10 -right-5 h-16 w-16 text-phantom-500 animate-pulse opacity-70" />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 glass-panel rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Tarefas</h3>
                  <div className="task-card">Pesquisar concorrentes</div>
                  <div className="task-card">Design da landing page</div>
                  <div className="task-card">Implementar autenticação</div>
                </div>
                <div className="flex-1 glass-panel rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Em Progresso</h3>
                  <div className="task-card">Corrigir bug de navegação</div>
                </div>
                <div className="flex-1 glass-panel rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Concluído</h3>
                  <div className="task-card">Testar gateway de pagamento</div>
                </div>
              </div>
              <Ghost className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 text-phantom-500/10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gradient">
            Potencializado por Inteligência
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-phantom-500" />}
              title="Insights com IA"
              description="Obtenha previsões e sugestões inteligentes baseadas no histórico de tarefas e desempenho da equipe."
            />
            <FeatureCard 
              icon={<LayoutGrid className="h-10 w-10 text-phantom-500" />}
              title="Quadro Kanban Flexível"
              description="Arraste e solte tarefas, personalize colunas e organize seu fluxo de trabalho exatamente como você precisa."
            />
            <FeatureCard 
              icon={<Ghost className="h-10 w-10 text-phantom-500 animate-bounce" />}
              title="Assistente Inteligente"
              description="Obtenha ajuda e respostas sobre suas tarefas com nosso assistente de chat com IA."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Por que escolher o Phantom Kanban?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <BenefitItem 
                icon={<Zap className="h-5 w-5 text-phantom-500" />}
                title="Aumento de Produtividade"
                description="Nossa IA sugere otimizações para seu fluxo de trabalho, ajudando você a realizar mais em menos tempo."
              />
              <BenefitItem 
                icon={<Calendar className="h-5 w-5 text-phantom-500" />}
                title="Prazos Inteligentes"
                description="Obtenha previsões realistas de prazos com base em dados históricos de desempenho."
              />
              <BenefitItem 
                icon={<Users className="h-5 w-5 text-phantom-500" />}
                title="Colaboração em Equipe"
                description="Atribua tarefas, compartilhe quadros e mantenha todos sincronizados no progresso do projeto."
              />
            </div>
            
            <div className="glass-panel rounded-xl p-8 flex items-center justify-center">
              <div className="relative">
                <div className="glass-panel rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Análise de Desempenho</h3>
                  <p className="mb-4">Visão geral do progresso do seu projeto:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tarefas concluídas</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-phantom-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between">
                      <span>Prazo estimado</span>
                      <span>12 dias</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-phantom-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <Ghost className="absolute -top-10 -right-10 h-20 w-20 text-phantom-500 rotate-12 opacity-70 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-6 bg-gradient-to-b from-phantom-600/20 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para transformar seu fluxo de trabalho?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-muted-foreground">
            Junte-se a milhares de equipes que já usam o Phantom Kanban para aumentar sua produtividade.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Comece Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-8 relative">
            <Ghost className="h-16 w-16 text-phantom-500/50 animate-bounce mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-2">
              <Ghost className="h-5 w-5 text-phantom-500" />
              <h2 className="text-xl font-bold text-gradient">Phantom Kanban</h2>
              <p className="text-sm text-muted-foreground ml-2">
                Desenvolvido por @schjneiderr
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Phantom Kanban Flow AI. Todos os direitos reservados.
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
