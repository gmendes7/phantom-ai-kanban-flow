
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Ghost, 
  ArrowLeft, 
  Code, 
  BarChart, 
  Smartphone, 
  Globe, 
  Shield, 
  Lightbulb, 
  Brain, 
  Zap, 
  Bot, 
  BarChart3, 
  Layers, 
  Kanban
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const Servicos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Chatbot no início da página */}
      <div className="fixed top-20 right-4 z-50">
        <ChatbotWidget />
      </div>
      
      {/* Cabeçalho com botão de voltar */}
      <header className="border-b border-border bg-background backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={16} /> Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Ghost className="h-8 w-8 text-phantom-500" />
            <h1 className="text-2xl font-bold text-gradient">Spectra</h1>
          </div>
          <div className="w-[100px]"></div>
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-gradient mb-6">Nossos Serviços</h1>
            <p className="text-xl text-muted-foreground">
              Soluções tecnológicas completas para transformar seu negócio digital
            </p>
          </div>
          
          {/* Seção Desenvolvimento */}
          <section id="desenvolvimento" className="mb-20 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Code className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Desenvolvimento</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Globe className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Websites</CardTitle>
                  <CardDescription>Presença online otimizada</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Sites institucionais, blogs, e-commerce e landing pages com design
                    responsivo e alta performance.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">WordPress</Badge>
                    <Badge variant="outline">SEO</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Solicitar Orçamento</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Smartphone className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Aplicativos</CardTitle>
                  <CardDescription>Mobile e web apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Aplicativos nativos e híbridos para iOS e Android, além de
                    web apps progressivos de alta performance.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">React Native</Badge>
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">PWA</Badge>
                    <Badge variant="outline">Firebase</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Solicitar Orçamento</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Layers className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Sistemas Web</CardTitle>
                  <CardDescription>Plataformas e dashboards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Sistemas personalizados para gerenciamento, CRMs, ERPs e outras
                    plataformas específicas para seu negócio.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Solicitar Orçamento</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Nova Seção para Quadro Kanban */}
          <section id="kanban" className="mb-20 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Kanban className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Quadro Kanban</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Kanban className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Sistema Kanban Personalizado</CardTitle>
                  <CardDescription>Organize suas tarefas com eficiência</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Nosso sistema Kanban oferece uma visualização clara e eficiente do fluxo de trabalho,
                    permitindo organizar tarefas, definir prioridades e acompanhar o progresso com facilidade.
                    Totalmente personalizável e intuitivo.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Temas Personalizáveis</Badge>
                    <Badge variant="outline">Suporte à IA</Badge>
                    <Badge variant="outline">Colunas Ajustáveis</Badge>
                    <Badge variant="outline">Analytics</Badge>
                  </div>
                  <div className="mt-4 bg-secondary/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Principais recursos:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Quadro intuitivo para visualização de tarefas</li>
                      <li>Personalização completa de temas e cores</li>
                      <li>Assistente de IA para sugestões e insights</li>
                      <li>Gestão de prazos e prioridades</li>
                      <li>Relatórios de produtividade</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/kanban" className="w-full">
                    <Button className="w-full">Experimentar Agora</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Seção Consultoria */}
          <section id="consultoria" className="mb-20 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Consultoria</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Lightbulb className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Estratégia Digital</CardTitle>
                  <CardDescription>Planejamento e inovação</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Orientação estratégica para negócios que desejam implementar
                    ou aprimorar sua presença digital.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <BarChart className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Otimização</CardTitle>
                  <CardDescription>Performance e eficiência</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Análise e otimização de sistemas existentes para melhorar
                    performance, segurança e experiência do usuário.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <BarChart3 className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Dados e insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Implementação e análise de métricas para tomada de decisões
                    baseadas em dados concretos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Seção IA */}
          <section id="inteligencia-artificial" className="mb-20 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Inteligência Artificial</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Bot className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Chatbots & Assistentes</CardTitle>
                  <CardDescription>Automação inteligente</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Desenvolvimento de chatbots e assistentes virtuais para
                    atendimento, vendas e suporte.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Zap className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Automação</CardTitle>
                  <CardDescription>Processos otimizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Automação de processos com machine learning e IA para
                    aumentar eficiência e reduzir custos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <Brain className="h-12 w-12 text-phantom-500 mb-4" />
                  <CardTitle>Soluções Personalizadas</CardTitle>
                  <CardDescription>IA sob medida</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Desenvolvimento de soluções de IA específicas para seu
                    negócio ou nicho de mercado.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button variant="outline" className="w-full">Saiba Mais</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* CTA */}
          <div className="bg-gradient-to-r from-phantom-500/20 to-phantom-500/40 rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato para discutirmos seu projeto e encontrarmos a solução ideal.
            </p>
            <Link to="/contato">
              <Button size="lg">Fale Conosco</Button>
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Ghost className="h-6 w-6 text-phantom-500" />
              <span className="text-xl font-bold text-gradient">Spectra</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Início
              </Link>
              <Link to="/sobre" className="text-muted-foreground hover:text-foreground">
                Sobre
              </Link>
              <Link to="/servicos" className="text-muted-foreground hover:text-foreground">
                Serviços
              </Link>
              <Link to="/contato" className="text-muted-foreground hover:text-foreground">
                Contato
              </Link>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">
                &copy; 2025 Spectra por <a href="https://github.com/schjneiderr" className="text-phantom-500 hover:underline">@schjneiderr</a> / <a href="https://github.com/g.mendes7" className="text-phantom-500 hover:underline">@trinitytecnologias</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Servicos;
