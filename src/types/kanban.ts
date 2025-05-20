
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  predictedDeadline: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
}
