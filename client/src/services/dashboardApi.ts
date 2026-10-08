import { api } from './api';
import type { ApiResponse, DashboardSummary, DashboardCharts } from '../types';

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const { data } = await api.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
  if (!data.data) throw new Error('Failed to load dashboard summary');
  return data.data;
}

export async function getDashboardCharts(): Promise<DashboardCharts> {
  const { data } = await api.get<ApiResponse<DashboardCharts>>('/dashboard/charts');
  if (!data.data) throw new Error('Failed to load chart data');
  return data.data;
}
