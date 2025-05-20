
import { TrashIcon, PlusIcon, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  children: React.ReactNode;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onAddTask: () => void;
  onDeleteColumn: () => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  color,
  children,
  onDragOver,
  onDrop,
  onAddTask,
  onDeleteColumn
}) => {
  return (
    <div
      className="kanban-column"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full bg-${color} mr-2`}></div>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onAddTask}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={onDeleteColumn}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="space-y-2 flex-1">
        {children}
      </div>
    </div>
  );
};

export default KanbanColumn;
