
import { useState, useRef } from 'react';
import { 
  PlusIcon, 
  TrashIcon,
  LayoutGrid,
  Calendar,
  User2,
  Clock,
  AlertTriangle,
  Check,
  PenLine,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import KanbanTask from '@/components/kanban/KanbanTask';
import KanbanColumn from '@/components/kanban/KanbanColumn';
import AddTaskDialog from '@/components/kanban/AddTaskDialog';
import { Task, KanbanColumn as ColumnType } from '@/types/kanban';

// Sample initial data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Research competitors',
    description: 'Analyze top 5 competitors in the market',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-06-15',
    assignedTo: 'Demo User',
    createdAt: '2023-06-01',
    predictedDeadline: '2023-06-18'
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create wireframes for the new landing page',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-06-20',
    assignedTo: 'Demo User',
    createdAt: '2023-06-02',
    predictedDeadline: '2023-06-19'
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Add login and registration functionality',
    status: 'inprogress',
    priority: 'high',
    dueDate: '2023-06-18',
    assignedTo: 'Demo User',
    createdAt: '2023-06-03',
    predictedDeadline: '2023-06-17'
  },
  {
    id: '4',
    title: 'Fix navigation bug',
    description: 'Mobile menu does not close properly',
    status: 'inprogress',
    priority: 'medium',
    dueDate: '2023-06-10',
    assignedTo: 'Demo User',
    createdAt: '2023-06-05',
    predictedDeadline: '2023-06-11'
  },
  {
    id: '5',
    title: 'Write user documentation',
    description: 'Create user guides for new features',
    status: 'review',
    priority: 'low',
    dueDate: '2023-06-25',
    assignedTo: 'Demo User',
    createdAt: '2023-06-10',
    predictedDeadline: '2023-06-24'
  },
  {
    id: '6',
    title: 'Test payment gateway',
    description: 'Verify all payment flows work correctly',
    status: 'done',
    priority: 'high',
    dueDate: '2023-06-05',
    assignedTo: 'Demo User',
    createdAt: '2023-06-01',
    completedAt: '2023-06-04',
    predictedDeadline: '2023-06-07'
  }
];

const initialColumns: ColumnType[] = [
  { id: 'todo', title: 'To Do', color: 'kanban-todo' },
  { id: 'inprogress', title: 'In Progress', color: 'kanban-inprogress' },
  { id: 'review', title: 'Review', color: 'kanban-review' },
  { id: 'done', title: 'Done', color: 'kanban-done' }
];

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addColumnActive, setAddColumnActive] = useState(false);
  const newColumnInputRef = useRef<HTMLInputElement>(null);
  
  // AI recommendations state (simulated)
  const [showRecommendations, setShowRecommendations] = useState(false);
  const recommendations = [
    'You have 3 high priority tasks - consider focusing on those first',
    'Based on past performance, "Design landing page" might take longer than estimated',
    'Consider breaking down "Implement authentication" into smaller tasks'
  ];

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'predictedDeadline'>) => {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString().split('T')[0];
    
    // Simulated AI prediction of deadline (in a real app this would come from an ML model)
    // For demo, we'll just add a random number of days (1-7) to the due date
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
    toast.success('Task added successfully');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast.success('Task updated successfully');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully');
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
      
      // If dropping in done column, add completion date
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
        toast.success(`Added new column: ${title}`);
      }
    } else {
      setAddColumnActive(true);
      setTimeout(() => {
        newColumnInputRef.current?.focus();
      }, 100);
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    // Check if column has tasks
    const hasTasks = tasks.some(task => task.status === columnId);
    
    if (hasTasks) {
      toast.error('Cannot delete column with tasks');
      return;
    }
    
    setColumns(columns.filter(column => column.id !== columnId));
    toast.success('Column deleted successfully');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setAddTaskDialogOpen(true)}
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Add Task
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddColumn}
            >
              <LayoutGrid className="mr-1 h-4 w-4" />
              {addColumnActive ? 'Save Column' : 'Add Column'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              <AlertTriangle className="mr-1 h-4 w-4" />
              AI Insights
              {!showRecommendations && <Badge className="ml-1">3</Badge>}
            </Button>
          </div>
        </div>
        
        {/* AI Recommendations */}
        {showRecommendations && (
          <Card className="mb-6 border-phantom-500/50 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-phantom-500" />
                AI Recommendations
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
      
      {/* Column input when adding */}
      {addColumnActive && (
        <div className="mb-4 flex items-center">
          <input
            ref={newColumnInputRef}
            type="text"
            placeholder="Column name"
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
            Cancel
          </Button>
        </div>
      )}
      
      {/* Kanban Board */}
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
      
      {/* Add/Edit Task Dialog */}
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
