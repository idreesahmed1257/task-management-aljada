import { api } from './api';
import type { ApiResponse, Task, TaskFilters, TaskStatus } from '../types';

export interface TaskPayload {
  title: string;
  description?: string;
  employeeId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: TaskStatus;
}

export async function getTasks(filters?: TaskFilters): Promise<Task[]> {
  const params: Record<string, string> = {};
  if (filters?.employeeId) params.employeeId = filters.employeeId;
  if (filters?.status) params.status = filters.status;
  if (filters?.priority) params.priority = filters.priority;
  const { data } = await api.get<ApiResponse<Task[]>>('/tasks', { params });
  return data.data ?? [];
}

export async function getTask(id: string): Promise<Task> {
  const { data } = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
  if (!data.data) throw new Error('Task not found');
  return data.data;
}

export async function createTask(payload: TaskPayload): Promise<Task> {
  const { data } = await api.post<ApiResponse<Task>>('/tasks', payload);
  if (!data.data) throw new Error('Failed to create task');
  return data.data;
}

export async function updateTask(id: string, payload: Partial<TaskPayload>): Promise<Task> {
  const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, payload);
  if (!data.data) throw new Error('Failed to update task');
  return data.data;
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status });
  if (!data.data) throw new Error('Failed to update task status');
  return data.data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
