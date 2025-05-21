
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, RefreshCw } from 'lucide-react';

const ConfiguracoesAdmin = () => {
  // Configurações do Site
  const [nomeSite, setNomeSite] = useState('Spectra');
  const [descricaoSite, setDescricaoSite] = useState('Sistema de gerenciamento de projetos com suporte de IA');
  const [emailContato, setEmailContato] = useState('contato@spectra.com');
  const [logoUrl, setLogoUrl] = useState('');
  
  // Configurações de Usuários
  const [permitirRegistro, setPermitirRegistro] = useState(true);
  const [verificacaoEmail, setVerificacaoEmail] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(true);
  
  // Configurações Avançadas
  const [modoManutencao, setModoManutencao] = useState(false);
  const [tempoSessao, setTempoSessao] = useState('60');
  const [registrosLog, setRegistrosLog] = useState(true);
  
  // Configurações de SEO
  const [metaTitle, setMetaTitle] = useState('Spectra - Sistema de Gerenciamento com IA');
  const [metaDescription, setMetaDescription] = useState('Gerencie seus projetos de forma eficiente com suporte de inteligência artificial.');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  
  // Salvar configurações
  const salvarConfiguracoes = () => {
    toast.success('Configurações salvas com sucesso!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button onClick={salvarConfiguracoes} className="gap-2">
          <Save size={16} />
          Salvar Alterações
        </Button>
      </div>
      
      <Tabs defaultValue="geral">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="avancado">Avançado</TabsTrigger>
        </TabsList>
        
        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Site</CardTitle>
              <CardDescription>
                Configure as informações básicas do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome-site">Nome do Site</Label>
                <Input 
                  id="nome-site" 
                  value={nomeSite} 
                  onChange={(e) => setNomeSite(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao-site">Descrição do Site</Label>
                <Textarea 
                  id="descricao-site" 
                  value={descricaoSite} 
                  onChange={(e) => setDescricaoSite(e.target.value)} 
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-contato">Email de Contato</Label>
                <Input 
                  id="email-contato" 
                  type="email" 
                  value={emailContato} 
                  onChange={(e) => setEmailContato(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo-url">URL do Logo (opcional)</Label>
                <Input 
                  id="logo-url" 
                  value={logoUrl} 
                  onChange={(e) => setLogoUrl(e.target.value)} 
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Informações do site atualizadas!')} className="w-full">
                Salvar Informações do Site
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Configure a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tema-escuro">Tema Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar tema escuro por padrão
                  </p>
                </div>
                <Switch id="tema-escuro" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-colapsada">Sidebar Recolhida</Label>
                  <p className="text-sm text-muted-foreground">
                    Iniciar com a sidebar lateral recolhida
                  </p>
                </div>
                <Switch id="sidebar-colapsada" defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animacoes">Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar animações de interface
                  </p>
                </div>
                <Switch id="animacoes" defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Usuários */}
        <TabsContent value="usuarios" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro e Autenticação</CardTitle>
              <CardDescription>
                Configure as opções de registro e autenticação de usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="permitir-registro">Permitir Registros</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que novos usuários se registrem
                  </p>
                </div>
                <Switch 
                  id="permitir-registro" 
                  checked={permitirRegistro} 
                  onCheckedChange={setPermitirRegistro} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="verificacao-email">Verificação de Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Exigir verificação de email para novos registros
                  </p>
                </div>
                <Switch 
                  id="verificacao-email" 
                  checked={verificacaoEmail} 
                  onCheckedChange={setVerificacaoEmail}
                  disabled={!permitirRegistro}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="forgot-password">Recuperação de Senha</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir recuperação de senha por email
                  </p>
                </div>
                <Switch 
                  id="forgot-password" 
                  checked={forgotPassword} 
                  onCheckedChange={setForgotPassword} 
                />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="senha-minima">Tamanho Mínimo de Senha</Label>
                <select 
                  id="senha-minima"
                  className="w-full px-3 py-2 border border-input rounded-md"
                  defaultValue="8"
                >
                  <option value="6">6 caracteres</option>
                  <option value="8">8 caracteres</option>
                  <option value="10">10 caracteres</option>
                  <option value="12">12 caracteres</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Configurações de usuários atualizadas!')} className="w-full">
                Salvar Configurações de Usuários
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Papéis e Permissões</CardTitle>
              <CardDescription>
                Configure os papéis e permissões do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Administrador</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Acesso completo a todas as funcionalidades do sistema
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" disabled>
                      Padrão
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Editor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pode editar conteúdo, mas não pode gerenciar usuários
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Editar Permissões
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Usuário</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Acesso básico ao sistema e suas próprias informações
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Editar Permissões
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de SEO */}
        <TabsContent value="seo" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>
                Configure as meta tags para otimização de SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={metaTitle} 
                  onChange={(e) => setMetaTitle(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">
                  Recomendado: entre 50-60 caracteres
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  value={metaDescription} 
                  onChange={(e) => setMetaDescription(e.target.value)} 
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recomendado: entre 150-160 caracteres
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords (separados por vírgula)</Label>
                <Input 
                  id="keywords" 
                  placeholder="kanban, gerenciamento, projetos, tarefas"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Meta tags atualizadas!')} className="w-full">
                Salvar Meta Tags
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Configure ferramentas de analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">ID do Google Analytics</Label>
                <Input 
                  id="google-analytics" 
                  value={googleAnalyticsId} 
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)} 
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookies-consent">Banner de Consentimento de Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir banner de consentimento de cookies para visitantes
                  </p>
                </div>
                <Switch id="cookies-consent" defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Configurações de analytics atualizadas!')} className="w-full">
                Salvar Configurações de Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Configurações Avançadas */}
        <TabsContent value="avancado" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema</CardTitle>
              <CardDescription>
                Configurações avançadas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="modo-manutencao" className="text-destructive font-medium">Modo Manutenção</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar modo de manutenção (site ficará indisponível para visitantes)
                  </p>
                </div>
                <Switch 
                  id="modo-manutencao" 
                  checked={modoManutencao} 
                  onCheckedChange={setModoManutencao} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tempo-sessao">Tempo de Sessão (minutos)</Label>
                <Input 
                  id="tempo-sessao" 
                  type="number" 
                  value={tempoSessao} 
                  onChange={(e) => setTempoSessao(e.target.value)} 
                  min="5"
                  max="1440"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="registros-log">Registros de Log</Label>
                  <p className="text-sm text-muted-foreground">
                    Manter registros de atividades no sistema
                  </p>
                </div>
                <Switch 
                  id="registros-log" 
                  checked={registrosLog} 
                  onCheckedChange={setRegistrosLog} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Configurações avançadas atualizadas!')} className="w-full">
                Salvar Configurações Avançadas
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>
                Ações sensíveis que podem afetar todo o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja limpar todos os logs? Esta ação não pode ser desfeita.')) {
                      toast.success('Logs limpos com sucesso!');
                    }
                  }}
                >
                  Limpar Todos os Logs
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    toast('Backup iniciado. Você será notificado quando concluir.', {
                      description: 'Gerando backup completo do sistema...',
                      action: {
                        label: 'Cancelar',
                        onClick: () => console.log('Backup cancelado')
                      }
                    });
                  }}
                >
                  Backup do Sistema
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    toast.success('Cache do sistema limpo!');
                  }}
                >
                  <RefreshCw size={16} />
                  Limpar Cache do Sistema
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesAdmin;
