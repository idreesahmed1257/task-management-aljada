import { api } from './api';
import type { ApiResponse, Employee } from '../types';

export interface EmployeePayload {
  name: string;
  email: string;
  position: string;
}

export async function getEmployees(search?: string): Promise<Employee[]> {
  const params = search ? { search } : {};
  const { data } = await api.get<ApiResponse<Employee[]>>('/employees', { params });
  return data.data ?? [];
}

export async function getEmployee(id: string): Promise<Employee> {
  const { data } = await api.get<ApiResponse<Employee>>(`/employees/${id}`);
  if (!data.data) throw new Error('Employee not found');
  return data.data;
}

export async function createEmployee(payload: EmployeePayload): Promise<Employee> {
  const { data } = await api.post<ApiResponse<Employee>>('/employees', payload);
  if (!data.data) throw new Error('Failed to create employee');
  return data.data;
}

export async function updateEmployee(id: string, payload: Partial<EmployeePayload>): Promise<Employee> {
  const { data } = await api.patch<ApiResponse<Employee>>(`/employees/${id}`, payload);
  if (!data.data) throw new Error('Failed to update employee');
  return data.data;
}

export async function deleteEmployee(id: string): Promise<void> {
  await api.delete(`/employees/${id}`);
}
