
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Ghost, 
  ArrowLeft, 
  Brain, 
  Zap, 
  Users, 
  Code, 
  Heart,
  Star,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedGhost from '@/components/ui/AnimatedGhost';

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-phantom-25 to-white">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-phantom-100">
              <ArrowLeft size={16} /> Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <AnimatedGhost size={32} color="#8b5cf6" variant="pac-man" />
            <h1 className="text-2xl font-bold text-gradient">Spectra</h1>
          </div>
          <div className="w-[100px]"></div>
        </div>
      </header>

      {/* Fantasmas decorativos */}
      <div className="fixed top-20 right-10 opacity-20 pointer-events-none z-0">
        <AnimatedGhost size={128} color="#ec4899" variant="floating" />
      </div>
      <div className="fixed bottom-20 left-10 opacity-25 pointer-events-none z-0">
        <AnimatedGhost size={96} color="#10b981" variant="pac-man" />
      </div>
      <div className="fixed top-1/2 right-1/4 opacity-15 pointer-events-none z-0">
        <AnimatedGhost size={80} color="#f59e0b" variant="default" />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 py-8 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-6">
              <AnimatedGhost size={120} color="#8b5cf6" variant="pac-man" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Conheça o Phantom AI
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Uma inteligência artificial fantasminha que revoluciona o gerenciamento de projetos
              com charme, diversão e eficiência.
            </p>
          </div>

          {/* Sobre a IA */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Brain className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Sobre o Phantom AI</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all border-phantom-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-phantom-500" />
                    <CardTitle>Inteligência Fantasminha</CardTitle>
                  </div>
                  <CardDescription>
                    Uma IA amigável e divertida para guiar você
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    O Phantom AI não é apenas um assistente virtual comum. Ele combina 
                    a eficiência de uma IA moderna com a personalidade carismática 
                    de um fantasminha do Pac-Man. Sempre pronto para ajudar com 
                    dicas, sugestões e orientações para seu projeto.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-phantom-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-phantom-500" />
                    <CardTitle>Conversação Natural</CardTitle>
                  </div>
                  <CardDescription>
                    Interaja como se fosse um amigo fantasminha
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Desenvolvido para entender suas necessidades de forma natural, 
                    o Phantom AI responde perguntas sobre o sistema, oferece dicas 
                    de produtividade e até mesmo conta curiosidades sobre o projeto. 
                    É como ter um guia fantasma sempre ao seu lado!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sobre a Spectra */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Ghost className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">A Plataforma Spectra</h2>
            </div>
            
            <Card className="border-phantom-200 bg-gradient-to-br from-phantom-50 to-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Phantom AI Kanban Flow</CardTitle>
                <CardDescription className="text-lg">
                  O futuro do gerenciamento de projetos chegou
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-center">
                  A Spectra é uma plataforma revolucionária que combina a simplicidade 
                  do método Kanban com o poder da inteligência artificial. Criada para 
                  tornar o gerenciamento de projetos mais eficiente, divertido e intuitivo.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4">
                    <Zap className="h-8 w-8 text-phantom-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-2">Produtividade</h4>
                    <p className="text-sm text-muted-foreground">
                      Organize tarefas com eficiência máxima
                    </p>
                  </div>
                  
                  <div className="text-center p-4">
                    <Brain className="h-8 w-8 text-phantom-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-2">IA Integrada</h4>
                    <p className="text-sm text-muted-foreground">
                      Assistente inteligente sempre disponível
                    </p>
                  </div>
                  
                  <div className="text-center p-4">
                    <Heart className="h-8 w-8 text-phantom-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-2">Experiência</h4>
                    <p className="text-sm text-muted-foreground">
                      Interface divertida e fácil de usar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Criador */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Code className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Quem Criou</h2>
            </div>
            
            <Card className="border-phantom-200">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-phantom-500 to-phantom-600 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Gabriel Mendes (@schjneiderr)</CardTitle>
                <CardDescription className="text-lg">
                  Fundador da Trinity Tecnologias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge variant="secondary">18 anos</Badge>
                  <Badge variant="secondary">Desenvolvedor Full-Stack</Badge>
                  <Badge variant="secondary">Trinity Tecnologias</Badge>
                  <Badge variant="secondary">Inovação</Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-center">
                  Desenvolvedor apaixonado por tecnologia e inovação, Gabriel criou a 
                  Spectra aos 18 anos como parte da visão da Trinity Tecnologias de 
                  revolucionar a forma como as pessoas gerenciam seus projetos. 
                  Com foco em experiência do usuário e tecnologias modernas.
                </p>
                
                <div className="text-center mt-6">
                  <Link to="/contato">
                    <Button className="bg-phantom-600 hover:bg-phantom-700">
                      Entre em Contato
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recursos */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Star className="h-8 w-8 text-phantom-500" />
              <h2 className="text-3xl font-bold">Principais Recursos</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Quadro Kanban Inteligente",
                  description: "Organize tarefas com drag & drop e insights de IA"
                },
                {
                  title: "Phantom AI Assistant",
                  description: "Fantasminha que ajuda e orienta em tempo real"
                },
                {
                  title: "Temas Personalizáveis",
                  description: "Cores vibrantes inspiradas no mundo dos fantasmas"
                },
                {
                  title: "Mobile First",
                  description: "Otimizado para dispositivos móveis e tablets"
                },
                {
                  title: "Animações Divertidas",
                  description: "Fantasmas que reagem ao movimento do mouse"
                },
                {
                  title: "Notificações Inteligentes",
                  description: "Sistema de alertas e dicas personalizadas"
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all border-phantom-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-phantom-500/20 to-phantom-600/30 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <AnimatedGhost size={64} color="#8b5cf6" variant="pac-man" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Pronto para conhecer o Phantom AI?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Experimente agora mesmo o quadro Kanban mais divertido e eficiente que você já viu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard/kanban">
                <Button size="lg" className="bg-phantom-600 hover:bg-phantom-700">
                  Experimentar Quadro Kanban
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" size="lg">
                  Ver Nossos Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <AnimatedGhost size={24} color="#8b5cf6" variant="pac-man" />
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
                &copy; 2025 Spectra por{' '}
                <a href="https://github.com/schjneiderr" className="text-phantom-500 hover:underline">
                  @schjneiderr
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
