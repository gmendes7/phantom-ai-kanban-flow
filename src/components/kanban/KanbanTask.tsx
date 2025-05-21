
import { Calendar, Clock, User2, MoreHorizontal, Clock9 } from 'lucide-react';
import { Task } from '@/types/kanban';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface KanbanTaskProps {
  task: Task;
  onDragStart: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({
  task,
  onDragStart,
  onEdit,
  onDelete
}) => {
  // Obter cor da prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 border-red-500';
      case 'medium':
        return 'text-yellow-500 border-yellow-500';
      case 'low':
        return 'text-green-500 border-green-500';
      default:
        return 'text-blue-500 border-blue-500';
    }
  };
  
  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Verificar se a tarefa está atrasada
  const isOverdue = () => {
    if (task.status === 'done') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return today > dueDate;
  };
  
  // Verificar se a tarefa está prestes a vencer (dentro dos próximos 2 dias)
  const isDueSoon = () => {
    if (task.status === 'done') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 2;
  };
  
  // Analisar previsão de IA vs data de vencimento real
  const getDueDateDifference = () => {
    const predicted = new Date(task.predictedDeadline);
    const actual = new Date(task.dueDate);
    const diffTime = predicted.getTime() - actual.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "No prazo";
    return diffDays > 0 
      ? `${diffDays} dia${diffDays !== 1 ? 's' : ''} de folga` 
      : `${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? 's' : ''} apertado`;
  };

  // Traduzir prioridade para português
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <div
      className="task-card animate-fade-in"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{task.title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-accent"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={onDelete}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {task.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {getPriorityText(task.priority)}
        </Badge>
        
        {task.status === 'done' ? (
          <Badge variant="outline" className="text-kanban-done border-kanban-done">
            Concluído
          </Badge>
        ) : isOverdue() ? (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Atrasado
          </Badge>
        ) : isDueSoon() ? (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Vence em breve
          </Badge>
        ) : null}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <User2 className="h-3 w-3 mr-1" />
          <span className="truncate">{task.assignedTo}</span>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Vencimento: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
              <div className="flex items-center text-xs">
                <Clock9 className="h-3 w-3 mr-1 text-phantom-400" />
                <span className="text-phantom-400">Previsão IA: {getDueDateDifference()}</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default KanbanTask;
