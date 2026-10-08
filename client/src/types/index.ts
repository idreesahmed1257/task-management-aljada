export interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  employeeId: string | Employee;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  email: string;
}

export interface DashboardSummary {
  totalEmployees: number;
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface DashboardCharts {
  byPriority: { high: number; medium: number; low: number };
  byEmployee: Array<{ name: string; count: number }>;
}

export interface TaskFilters {
  employeeId?: string;
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
}
