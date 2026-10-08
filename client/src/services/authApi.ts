import { api } from './api';
import type { ApiResponse, Admin } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export async function login(payload: LoginPayload): Promise<string> {
  const { data } = await api.post<ApiResponse<LoginData>>('/auth/login', payload);
  if (!data.data?.token) throw new Error('No token in response');
  return data.data.token;
}

export async function getMe(): Promise<Admin> {
  const { data } = await api.get<ApiResponse<Admin>>('/auth/me');
  if (!data.data) throw new Error('No admin data in response');
  return data.data;
}
