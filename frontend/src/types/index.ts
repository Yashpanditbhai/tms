export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Task {
  _id: string;
  taskId: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: User;
  createdBy: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  stats: TaskStats | null;
  loading: boolean;
  error: string | null;
  filters: { status: string; search: string };
}

export interface TaskStats {
  total: number;
  pending: number;
  'in-progress': number;
  completed: number;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
