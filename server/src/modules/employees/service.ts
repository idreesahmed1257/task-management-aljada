import mongoose from 'mongoose';
import { Employee } from './model';
import { Task } from '../tasks/model';
import { AppError } from '../../utils/AppError';
import type { CreateEmployeeBody, UpdateEmployeeBody } from './types';

export async function listEmployees(search?: string) {
  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  return Employee.find(query).sort({ createdAt: -1 });
}

export async function getEmployee(id: string) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Employee not found');
  const emp = await Employee.findById(id);
  if (!emp) throw AppError.notFound('Employee not found');
  return emp;
}

export async function createEmployee(body: CreateEmployeeBody) {
  const existing = await Employee.findOne({ email: body.email.toLowerCase() });
  if (existing) throw AppError.conflict('Employee email already exists', 'EMPLOYEE_EMAIL_EXISTS');
  return Employee.create(body);
}

export async function updateEmployee(id: string, body: UpdateEmployeeBody) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Employee not found');
  if (body.email) {
    const existing = await Employee.findOne({ email: body.email.toLowerCase(), _id: { $ne: id } });
    if (existing) throw AppError.conflict('Employee email already exists', 'EMPLOYEE_EMAIL_EXISTS');
  }
  const emp = await Employee.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!emp) throw AppError.notFound('Employee not found');
  return emp;
}

export async function deleteEmployee(id: string) {
  if (!mongoose.isValidObjectId(id)) throw AppError.notFound('Employee not found');
  const taskCount = await Task.countDocuments({ employeeId: id });
  if (taskCount > 0) {
    throw AppError.conflict(
      'Cannot delete employee with assigned tasks. Reassign or delete tasks first.',
      'EMPLOYEE_HAS_TASKS'
    );
  }
  const emp = await Employee.findByIdAndDelete(id);
  if (!emp) throw AppError.notFound('Employee not found');
}
