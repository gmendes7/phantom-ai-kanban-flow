
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Filter, 
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Tipos
interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  status: 'ativo' | 'inativo';
  dataCriacao: string;
}

// Dados simulados
const usuariosSimulados: Usuario[] = [
  {
    id: '1',
    nome: 'Gabriel Mendes Lourenço',
    email: 'gabriel@spectra.com',
    cargo: 'Administrador',
    status: 'ativo',
    dataCriacao: '2025-05-01'
  },
  {
    id: '2',
    nome: 'tri.nity tecnologias',
    email: 'trinity@spectra.com',
    cargo: 'Administrador',
    status: 'ativo',
    dataCriacao: '2025-05-01'
  },
  {
    id: '3',
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    cargo: 'Editor',
    status: 'ativo',
    dataCriacao: '2025-04-15'
  },
  {
    id: '4',
    nome: 'Maria Santos',
    email: 'maria@exemplo.com',
    cargo: 'Usuário',
    status: 'ativo',
    dataCriacao: '2025-04-10'
  },
  {
    id: '5',
    nome: 'Carlos Ferreira',
    email: 'carlos@exemplo.com',
    cargo: 'Usuário',
    status: 'inativo',
    dataCriacao: '2025-03-22'
  },
  {
    id: '6',
    nome: 'Ana Luiza',
    email: 'ana@exemplo.com',
    cargo: 'Editor',
    status: 'ativo',
    dataCriacao: '2025-03-15'
  },
];

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosSimulados);
  const [busca, setBusca] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    cargo: 'Usuário',
    senha: ''
  });
  
  // Filtrar usuários
  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.cargo.toLowerCase().includes(busca.toLowerCase())
  );
  
  // Criar ou atualizar usuário
  const salvarUsuario = () => {
    if (usuarioSelecionado) {
      // Atualizar usuário existente
      setUsuarios(usuarios.map(u => 
        u.id === usuarioSelecionado.id 
          ? { 
              ...u, 
              nome: novoUsuario.nome || u.nome, 
              email: novoUsuario.email || u.email,
              cargo: novoUsuario.cargo as any || u.cargo
            } 
          : u
      ));
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Criar novo usuário
      const novoId = String(usuarios.length + 1);
      setUsuarios([
        ...usuarios,
        {
          id: novoId,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          cargo: novoUsuario.cargo,
          status: 'ativo',
          dataCriacao: new Date().toISOString().split('T')[0]
        }
      ]);
      toast.success('Usuário criado com sucesso!');
    }
    setIsDialogOpen(false);
    resetForm();
  };
  
  // Excluir usuário
  const excluirUsuario = (id: string) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
    toast.success('Usuário excluído com sucesso!');
  };
  
  // Abrir form para edição
  const editarUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setNovoUsuario({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      senha: ''
    });
    setIsDialogOpen(true);
  };
  
  // Resetar formulário
  const resetForm = () => {
    setUsuarioSelecionado(null);
    setNovoUsuario({
      nome: '',
      email: '',
      cargo: 'Usuário',
      senha: ''
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuários..."
              className="pl-8 w-full sm:w-64"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1" onClick={resetForm}>
                <Plus size={16} />
                <span className="hidden md:inline">Adicionar Usuário</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {usuarioSelecionado ? 'Editar Usuário' : 'Adicionar Usuário'}
                </DialogTitle>
                <DialogDescription>
                  {usuarioSelecionado 
                    ? 'Edite as informações do usuário abaixo.' 
                    : 'Preencha as informações para criar um novo usuário.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input 
                    id="nome" 
                    placeholder="Nome completo" 
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="email@exemplo.com" 
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cargo" className="text-sm font-medium">
                    Cargo
                  </label>
                  <select 
                    id="cargo"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={novoUsuario.cargo}
                    onChange={(e) => setNovoUsuario({...novoUsuario, cargo: e.target.value})}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Editor">Editor</option>
                    <option value="Usuário">Usuário</option>
                  </select>
                </div>
                
                {!usuarioSelecionado && (
                  <div className="space-y-2">
                    <label htmlFor="senha" className="text-sm font-medium">
                      Senha
                    </label>
                    <Input 
                      id="senha" 
                      type="password"
                      placeholder="Senha" 
                      value={novoUsuario.senha}
                      onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                    />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={salvarUsuario}
                  disabled={!novoUsuario.nome || !novoUsuario.email || (!usuarioSelecionado && !novoUsuario.senha)}
                >
                  {usuarioSelecionado ? 'Salvar' : 'Criar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabela de usuários */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={usuario.status === 'ativo' ? 'default' : 'secondary'}
                      className={usuario.status === 'ativo' ? 'bg-green-500' : ''}
                    >
                      {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(usuario.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => editarUsuario(usuario)}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </DropdownMenuItem>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => e.preventDefault()} 
                              className="text-destructive"
                            >
                              <Trash size={16} className="mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o usuário {usuario.nome}?
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => excluirUsuario(usuario.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        
                        <DropdownMenuItem onClick={() => {
                          setUsuarios(usuarios.map(u => 
                            u.id === usuario.id 
                              ? { ...u, status: u.status === 'ativo' ? 'inativo' : 'ativo' } 
                              : u
                          ));
                          toast.success(`Usuário ${usuario.status === 'ativo' ? 'desativado' : 'ativado'} com sucesso!`);
                        }}>
                          {usuario.status === 'ativo' ? (
                            <>
                              <span className="h-4 w-4 mr-2 rounded-full bg-red-500" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <span className="h-4 w-4 mr-2 rounded-full bg-green-500" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
