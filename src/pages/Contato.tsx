
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ghost, ArrowLeft, Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  nome: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  assunto: z.string().min(5, { message: 'Assunto deve ter pelo menos 5 caracteres' }),
  mensagem: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' })
});

const Contato = () => {
  const [enviando, setEnviando] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      email: '',
      assunto: '',
      mensagem: ''
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setEnviando(true);
    
    // Simulando envio com timeout
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso!');
      form.reset();
      setEnviando(false);
    }, 1500);
    
    console.log('Dados do formulário:', data);
  };
  
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
            <h1 className="text-4xl font-bold text-gradient mb-6">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground">
              Estamos prontos para ouvir suas ideias e transformá-las em realidade digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500 mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">
                  contato@spectra.com
                </p>
                <a href="mailto:contato@spectra.com" className="text-phantom-500 hover:underline">
                  Enviar email
                </a>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500 mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Telefone</h3>
                <p className="text-muted-foreground mb-4">
                  +55 (62) 99999-9999
                </p>
                <a href="tel:+5562999999999" className="text-phantom-500 hover:underline">
                  Ligar agora
                </a>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-phantom-500/20 flex items-center justify-center text-phantom-500 mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Localização</h3>
                <p className="text-muted-foreground mb-4">
                  Goiânia, Goiás - Brasil
                </p>
                <a 
                  href="https://maps.google.com/?q=Goiania,Goias,Brasil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-phantom-500 hover:underline"
                >
                  Ver no mapa
                </a>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Formulário de contato */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu.email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Assunto da mensagem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite sua mensagem aqui..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={enviando}
                  >
                    {enviando ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Redes sociais e mapa */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos encontre também</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-phantom-500 hover:text-white transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-phantom-500 hover:text-white transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-phantom-500 hover:text-white transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-phantom-500 hover:text-white transition-colors"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Localização</h3>
                <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                  {/* Aqui poderia ser integrado um mapa real */}
                  <div className="h-full w-full flex items-center justify-center bg-secondary border border-border">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Goiânia, Goiás - Brasil</span>
                  </div>
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

export default Contato;
