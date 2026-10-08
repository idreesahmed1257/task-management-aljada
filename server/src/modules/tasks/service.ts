import mongoose from 'mongoose';
import { Task } from './model';
import { Employee } from '../employees/model';
import { AppError } from '../../utils/AppError';
import type { CreateTaskBody, UpdateTaskBody, TaskQueryFilters } from './types';
import type { TaskStatus } from '../../constants';

export async function listTasks(filters: TaskQueryFilters) {
  const query: Record<string, unknown> = {};
  if (filters.employeeId) {
    if (!mongoose.isValidObjectId(filters.employeeId)) {
      throw AppError.badRequest('Invalid employeeId');
    }
    query.employeeId = filters.employeeId;
  }
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  return Task.find(query).populate('employeeId', 'name email position').sort({ createdAt: -1 });
}

export async function getTask(id: string) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Task not found');
  const task = await Task.findById(id).populate('employeeId', 'name email position');
  if (!task) throw AppError.notFound('Task not found');
  return task;
}

export async function createTask(body: CreateTaskBody) {
  if (!mongoose.isValidObjectId(body.employeeId)) throw AppError.badRequest('Invalid employeeId');
  const emp = await Employee.findById(body.employeeId);
  if (!emp) throw AppError.badRequest('Employee not found');
  return Task.create(body);
}

export async function updateTask(id: string, body: UpdateTaskBody) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Task not found');
  if (body.employeeId) {
    if (!mongoose.isValidObjectId(body.employeeId)) throw AppError.badRequest('Invalid employeeId');
    const emp = await Employee.findById(body.employeeId);
    if (!emp) throw AppError.badRequest('Employee not found');
  }
  const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('employeeId', 'name email position');
  if (!task) throw AppError.notFound('Task not found');
  return task;
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Task not found');
  const task = await Task.findByIdAndUpdate(id, { status }, { new: true }).populate('employeeId', 'name email position');
  if (!task) throw AppError.notFound('Task not found');
  return task;
}

export async function deleteTask(id: string) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Task not found');
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw AppError.notFound('Task not found');
}
