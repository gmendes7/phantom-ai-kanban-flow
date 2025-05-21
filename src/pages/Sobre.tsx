
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ghost, Github, Linkedin, Mail, ArrowLeft } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
            <h1 className="text-4xl font-bold text-gradient mb-6">Sobre Nós</h1>
            <p className="text-xl text-muted-foreground">
              Somos uma equipe apaixonada por tecnologia e inovação, 
              dedicada a criar soluções digitais que transformam negócios.
            </p>
          </div>
          
          {/* Seção Missão e Visão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Desenvolver soluções tecnológicas inovadoras e acessíveis que potencializem
                  o crescimento dos nossos clientes, sempre com foco na qualidade e na experiência do usuário.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser reconhecida como referência em desenvolvimento tecnológico, 
                  criando produtos que façam a diferença na vida das pessoas e 
                  no sucesso dos negócios.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Seção Equipe */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Nossa Equipe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-phantom-500 text-2xl">GM</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>Gabriel Mendes Lourenço</CardTitle>
                  <CardDescription>Fundador & Dev Full Stack</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    18 anos, goiano, dono da tri.nity tecnologias. Desenvolvedor full stack 
                    apaixonado por criar soluções inovadoras e eficientes.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">@schjneiderr</span>
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Github size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail size={20} />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-phantom-500/80 text-2xl">TT</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>Tri.nity Tecnologias</CardTitle>
                  <CardDescription>Empresa de Tecnologia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Empresa especializada em soluções tecnológicas inovadoras,
                    focada em transformar ideias em realidade digital.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">@tri.nitytecnologias</span>
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Github size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail size={20} />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-all border-dashed">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-secondary text-2xl">+</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>Faça Parte da Equipe</CardTitle>
                  <CardDescription>Estamos contratando!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Procuramos talentos apaixonados por tecnologia para se juntar à nossa equipe 
                    e ajudar a construir o futuro digital.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contato" className="w-full">
                    <Button className="w-full">Entre em Contato</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Seção valores */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Nossos Valores</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Inovação</h3>
                  <p className="text-muted-foreground">
                    Buscamos constantemente novas tecnologias e abordagens para oferecer
                    soluções de ponta aos nossos clientes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Qualidade</h3>
                  <p className="text-muted-foreground">
                    Comprometimento com a excelência em todos os aspectos do nosso trabalho,
                    desde o código até a experiência do usuário.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Colaboração</h3>
                  <p className="text-muted-foreground">
                    Acreditamos no poder do trabalho em equipe e na parceria
                    próxima com nossos clientes para alcançar resultados excepcionais.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Transparência</h3>
                  <p className="text-muted-foreground">
                    Comunicação clara e honesta em todos os níveis, tanto internamente
                    quanto com nossos clientes e parceiros.
                  </p>
                </div>
              </div>
            </div>
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
                &copy; 2025 Spectra. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
