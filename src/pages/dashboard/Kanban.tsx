
import { useState, useRef, useEffect } from 'react';
import { 
  PlusIcon, 
  LayoutGrid,
  Calendar,
  AlertTriangle,
  Check,
  Ghost
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import KanbanTask from '@/components/kanban/KanbanTask';
import KanbanColumn from '@/components/kanban/KanbanColumn';
import AddTaskDialog from '@/components/kanban/AddTaskDialog';
import ThemeSelector, { themes } from '@/components/kanban/ThemeSelector';
import { Task, KanbanColumn as ColumnType } from '@/types/kanban';

// Dados iniciais de exemplo
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Pesquisar concorrentes',
    description: 'Analisar os 5 principais concorrentes do mercado',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-06-15',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-01',
    predictedDeadline: '2023-06-18'
  },
  {
    id: '2',
    title: 'Design da página inicial',
    description: 'Criar wireframes para a nova página inicial',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-06-20',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-02',
    predictedDeadline: '2023-06-19'
  },
  {
    id: '3',
    title: 'Implementar autenticação',
    description: 'Adicionar funcionalidade de login e registro',
    status: 'inprogress',
    priority: 'high',
    dueDate: '2023-06-18',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-03',
    predictedDeadline: '2023-06-17'
  },
  {
    id: '4',
    title: 'Corrigir bug de navegação',
    description: 'Menu mobile não fecha corretamente',
    status: 'inprogress',
    priority: 'medium',
    dueDate: '2023-06-10',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-05',
    predictedDeadline: '2023-06-11'
  },
  {
    id: '5',
    title: 'Escrever documentação',
    description: 'Criar guias de usuário para os novos recursos',
    status: 'review',
    priority: 'low',
    dueDate: '2023-06-25',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-10',
    predictedDeadline: '2023-06-24'
  },
  {
    id: '6',
    title: 'Testar gateway de pagamento',
    description: 'Verificar se todos os fluxos de pagamento funcionam corretamente',
    status: 'done',
    priority: 'high',
    dueDate: '2023-06-05',
    assignedTo: 'Usuário Demo',
    createdAt: '2023-06-01',
    completedAt: '2023-06-04',
    predictedDeadline: '2023-06-07'
  }
];

const initialColumns: ColumnType[] = [
  { id: 'todo', title: 'A Fazer', color: 'kanban-todo' },
  { id: 'inprogress', title: 'Em Progresso', color: 'kanban-inprogress' },
  { id: 'review', title: 'Revisão', color: 'kanban-review' },
  { id: 'done', title: 'Concluído', color: 'kanban-done' }
];

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addColumnActive, setAddColumnActive] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');
  const [themeColors, setThemeColors] = useState(themes[0].colors);
  const newColumnInputRef = useRef<HTMLInputElement>(null);
  
  // Estado de recomendações de IA (simulado)
  const [showRecommendations, setShowRecommendations] = useState(false);
  const recommendations = [
    'Você tem 3 tarefas de alta prioridade - considere focar nelas primeiro',
    'Com base no desempenho anterior, "Design da página inicial" pode levar mais tempo que o estimado',
    'Considere dividir "Implementar autenticação" em tarefas menores'
  ];

  // Efeito para aplicar cores do tema
  useEffect(() => {
    const selectedTheme = themes.find(theme => theme.key === currentTheme) || themes[0];
    setThemeColors(selectedTheme.colors);
    
    // Atualizar variáveis CSS para o tema
    document.documentElement.style.setProperty('--kanban-todo-color', selectedTheme.colors.todo);
    document.documentElement.style.setProperty('--kanban-inprogress-color', selectedTheme.colors.inprogress);
    document.documentElement.style.setProperty('--kanban-review-color', selectedTheme.colors.review);
    document.documentElement.style.setProperty('--kanban-done-color', selectedTheme.colors.done);
    
    // Aplicar classe de fundo se existir
    const body = document.querySelector('body');
    if (body) {
      // Remover todas as classes de tema anteriores
      themes.forEach(t => {
        if (t.colors.bg.startsWith('bg-')) {
          // Corrigindo o problema: separando classes com espaços em tokens individuais
          const bgClasses = t.colors.bg.split(' ');
          bgClasses.forEach(className => {
            if (className) body.classList.remove(className);
          });
        }
      });
      
      // Adicionar nova classe de tema
      if (selectedTheme.colors.bg.startsWith('bg-')) {
        // Adicionando as classes separadamente se contiver espaços
        const newClasses = selectedTheme.colors.bg.split(' ');
        newClasses.forEach(className => {
          if (className) body.classList.add(className);
        });
      }
    }
  }, [currentTheme]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'predictedDeadline'>) => {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString().split('T')[0];
    
    // Previsão simulada de prazo com IA (em um app real, viria de um modelo ML)
    // Para demo, apenas adicionaremos um número aleatório de dias (1-7) à data de vencimento
    const dueDate = new Date(newTask.dueDate);
    const randomDays = Math.floor(Math.random() * 7) + 1;
    const predictedDate = new Date(dueDate);
    predictedDate.setDate(dueDate.getDate() + randomDays);
    const predictedDeadline = predictedDate.toISOString().split('T')[0];
    
    const task: Task = {
      id,
      ...newTask,
      createdAt,
      predictedDeadline
    };
    
    setTasks([...tasks, task]);
    toast.success('Tarefa adicionada com sucesso');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast.success('Tarefa atualizada com sucesso');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Tarefa excluída com sucesso');
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      const updatedTask = { ...draggedTask, status: columnId };
      setTasks(tasks.map(task => 
        task.id === draggedTask.id ? updatedTask : task
      ));
      
      // Se soltar na coluna concluído, adicionar data de conclusão
      if (columnId === 'done' && !draggedTask.completedAt) {
        const completedTask = { 
          ...updatedTask, 
          completedAt: new Date().toISOString().split('T')[0] 
        };
        setTasks(tasks.map(task => 
          task.id === draggedTask.id ? completedTask : task
        ));
      }
      
      setDraggedTask(null);
    }
  };

  const handleAddColumn = () => {
    if (addColumnActive && newColumnInputRef.current?.value) {
      const title = newColumnInputRef.current.value.trim();
      if (title) {
        const id = title.toLowerCase().replace(/\s+/g, '-');
        const randomColor = `rgb(${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55})`;
        
        const newColumn: ColumnType = {
          id,
          title,
          color: randomColor
        };
        
        setColumns([...columns, newColumn]);
        setAddColumnActive(false);
        toast.success(`Nova coluna adicionada: ${title}`);
      }
    } else {
      setAddColumnActive(true);
      setTimeout(() => {
        newColumnInputRef.current?.focus();
      }, 100);
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    // Verificar se a coluna tem tarefas
    const hasTasks = tasks.some(task => task.status === columnId);
    
    if (hasTasks) {
      toast.error('Não é possível excluir uma coluna com tarefas');
      return;
    }
    
    setColumns(columns.filter(column => column.id !== columnId));
    toast.success('Coluna excluída com sucesso');
  };

  const handleThemeChange = (theme: any) => {
    setCurrentTheme(theme.key);
    localStorage.setItem('kanban-theme', theme.key);
  };

  // Efeito para carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('kanban-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <div className={`h-full flex flex-col ${themeColors.bg.startsWith('bg-') ? themeColors.bg : ''}`}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Ghost className="mr-2 h-6 w-6 text-phantom-500 animate-pulse" />
              Quadro Kanban
            </h1>
            <p className="text-muted-foreground">Gerencie suas tarefas com eficiência</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setAddTaskDialogOpen(true)}
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Adicionar Tarefa
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddColumn}
            >
              <LayoutGrid className="mr-1 h-4 w-4" />
              {addColumnActive ? 'Salvar Coluna' : 'Adicionar Coluna'}
            </Button>
            
            <ThemeSelector
              currentTheme={currentTheme}
              onSelectTheme={handleThemeChange}
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              <AlertTriangle className="mr-1 h-4 w-4" />
              Insights IA
              {!showRecommendations && <Badge className="ml-1">3</Badge>}
            </Button>
          </div>
        </div>
        
        {/* Recomendações de IA */}
        {showRecommendations && (
          <Card className="mb-6 border-phantom-500/50 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-phantom-500" />
                Recomendações da IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-phantom-500 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Input de coluna quando adicionando */}
      {addColumnActive && (
        <div className="mb-4 flex items-center">
          <input
            ref={newColumnInputRef}
            type="text"
            placeholder="Nome da coluna"
            className="border border-border rounded-md px-3 py-2 mr-2 bg-secondary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddColumn();
              if (e.key === 'Escape') setAddColumnActive(false);
            }}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setAddColumnActive(false)}
          >
            Cancelar
          </Button>
        </div>
      )}
      
      {/* Quadro Kanban */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full gap-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              onAddTask={() => {
                setEditingTask(null);
                setAddTaskDialogOpen(true);
              }}
              onDeleteColumn={() => handleDeleteColumn(column.id)}
            >
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <KanbanTask
                    key={task.id}
                    task={task}
                    onDragStart={() => handleDragStart(task)}
                    onEdit={() => {
                      setEditingTask(task);
                      setAddTaskDialogOpen(true);
                    }}
                    onDelete={() => handleDeleteTask(task.id)}
                  />
                ))
              }
            </KanbanColumn>
          ))}
        </div>
      </div>
      
      {/* Diálogo de Adicionar/Editar Tarefa */}
      <AddTaskDialog
        open={addTaskDialogOpen}
        onOpenChange={setAddTaskDialogOpen}
        onSave={editingTask ? handleUpdateTask : handleAddTask}
        columns={columns}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Kanban;
