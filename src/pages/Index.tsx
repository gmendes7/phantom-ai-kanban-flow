
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Ghost, ArrowRight, Code, Shield, Brain, Mail } from 'lucide-react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b border-border bg-background backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ghost className="h-8 w-8 text-phantom-500" />
            <h1 className="text-2xl font-bold text-gradient">Spectra</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/sobre" className={navigationMenuTriggerStyle()}>
                  Sobre
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-phantom-500/20 to-phantom-500/50 p-6 no-underline outline-none focus:shadow-md"
                          href="/servicos"
                        >
                          <Ghost className="h-8 w-8 text-phantom-500" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Soluções Digitais
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Transforme sua presença digital com nossas soluções completas
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/servicos#desenvolvimento"
                        >
                          <div className="text-sm font-medium leading-none">Desenvolvimento</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Websites e aplicações sob medida
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/servicos#consultoria"
                        >
                          <div className="text-sm font-medium leading-none">Consultoria</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Orientação especializada para seu negócio
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/servicos#inteligencia-artificial"
                        >
                          <div className="text-sm font-medium leading-none">Inteligência Artificial</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Soluções avançadas com IA
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contato" className={navigationMenuTriggerStyle()}>
                  Contato
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 flex-1 flex flex-col justify-center bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gradient">
                Transforme sua Experiência Digital com a Spectra
              </h1>
              <p className="text-xl text-muted-foreground">
                Soluções inovadoras de desenvolvimento e gerenciamento de projetos potencializadas por inteligência artificial.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    Acessar Plataforma <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/sobre">
                  <Button size="lg" variant="outline" className="gap-2">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center relative h-[400px]">
              <div className="absolute w-64 h-64 bg-phantom-500/20 rounded-full filter blur-3xl animate-pulse" />
              <Ghost className="absolute h-64 w-64 text-phantom-500 animate-float" />
              <div className="absolute top-0 right-0 opacity-20">
                <Ghost className="h-32 w-32 text-phantom-500 animate-bounce" />
              </div>
              <div className="absolute bottom-0 left-1/4 opacity-30">
                <Ghost className="h-24 w-24 text-phantom-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas para transformar ideias em realidade digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg hover:shadow-lg transition-all border border-border">
              <Code className="h-12 w-12 text-phantom-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Desenvolvimento Web</h3>
              <p className="text-muted-foreground mb-4">
                Websites e aplicações responsivas com design moderno e alta performance.
              </p>
              <Link to="/servicos#desenvolvimento" className="text-phantom-500 hover:underline inline-flex items-center">
                Saiba mais <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-card p-8 rounded-lg hover:shadow-lg transition-all border border-border">
              <Shield className="h-12 w-12 text-phantom-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Consultoria Técnica</h3>
              <p className="text-muted-foreground mb-4">
                Suporte especializado para otimizar processos e implementar novas tecnologias.
              </p>
              <Link to="/servicos#consultoria" className="text-phantom-500 hover:underline inline-flex items-center">
                Saiba mais <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-card p-8 rounded-lg hover:shadow-lg transition-all border border-border">
              <Brain className="h-12 w-12 text-phantom-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Soluções com IA</h3>
              <p className="text-muted-foreground mb-4">
                Integração de inteligência artificial para potencializar seus projetos.
              </p>
              <Link to="/servicos#inteligencia-artificial" className="text-phantom-500 hover:underline inline-flex items-center">
                Saiba mais <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gradient mb-6">Pronto para começar?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Entre em contato conosco para discutir seu próximo projeto
          </p>
          <Link to="/contato">
            <Button size="lg" className="gap-2">
              Fale Conosco <Mail size={16} />
            </Button>
          </Link>
        </div>
      </section>
      
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
                &copy; 2025 Spectra. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
