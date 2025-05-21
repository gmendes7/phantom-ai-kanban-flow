
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Ghost,
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando envio
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      });
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Chatbot no topo da página */}
      <div className="fixed top-20 right-4 z-50">
        <ChatbotWidget />
      </div>
      
      {/* Cabeçalho com botão de voltar */}
      <header className="border-b border-border bg-background backdrop-blur-md sticky top-0 z-40">
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
            <h1 className="text-4xl font-bold text-gradient mb-6">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground">
              Estamos prontos para ouvir suas dúvidas, sugestões ou propostas de parceria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <Phone className="h-12 w-12 text-phantom-500 mb-4" />
                <CardTitle>Telefone</CardTitle>
                <CardDescription>Atendimento em horário comercial</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="tel:+5567991415904" className="text-xl font-medium text-foreground hover:text-phantom-500 transition-colors">
                  (67) 99141-5904
                </a>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <Mail className="h-12 w-12 text-phantom-500 mb-4" />
                <CardTitle>E-mail</CardTitle>
                <CardDescription>Resposta em até 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:tecnologiastrinity@gmail.com" className="text-xl font-medium text-foreground hover:text-phantom-500 transition-colors break-all">
                  tecnologiastrinity@gmail.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <MapPin className="h-12 w-12 text-phantom-500 mb-4" />
                <CardTitle>Localização</CardTitle>
                <CardDescription>Visite-nos pessoalmente</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-medium text-foreground">
                  Campo Grande, MS
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Formulário de contato */}
            <Card>
              <CardHeader>
                <CardTitle>Envie uma mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-sm font-medium">
                        Nome completo
                      </label>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="assunto" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input
                      id="assunto"
                      name="assunto"
                      placeholder="Assunto da mensagem"
                      value={formData.assunto}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="mensagem" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      placeholder="Digite sua mensagem aqui..."
                      rows={5}
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Informações adicionais e redes sociais */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                  <CardDescription>
                    Conecte-se conosco nas redes sociais para novidades e atualizações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://github.com/schjneiderr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://github.com/g.mendes7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub Alternativo</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Desenvolvedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Ghost className="h-16 w-16 text-phantom-500 animated-ghost" />
                      <div>
                        <h3 className="text-lg font-medium">Gabriel Mendes Lourenço</h3>
                        <p className="text-muted-foreground">(@schjneiderr)</p>
                        <p className="text-muted-foreground">18 anos, DEV Full Stack</p>
                      </div>
                    </div>
                    <p>
                      Fundador da Trinity Tecnologias, especializado em desenvolvimento web 
                      e soluções tecnológicas personalizadas para empresas e startups.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-muted-foreground text-sm">
                    "Transformando ideias em soluções digitais inovadoras"
                  </div>
                </CardFooter>
              </Card>
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
                &copy; 2025 Spectra por <a href="https://github.com/schjneiderr" className="text-phantom-500 hover:underline">@schjneiderr</a> / <a href="https://github.com/g.mendes7" className="text-phantom-500 hover:underline">@trinitytecnologias</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contato;
