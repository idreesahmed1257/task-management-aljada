import type { TaskStatus, TaskPriority } from '../../constants';

export interface CreateTaskBody {
  title: string;
  description?: string;
  employeeId: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  employeeId?: string;
  priority?: TaskPriority;
  dueDate?: string;
  status?: TaskStatus;
}

export interface UpdateTaskStatusBody {
  status: TaskStatus;
}

export interface TaskQueryFilters {
  employeeId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}
