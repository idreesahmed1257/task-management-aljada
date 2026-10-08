import { z } from 'zod';
import { TASK_STATUSES, TASK_PRIORITIES } from '../../constants';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().optional().default(''),
  employeeId: z.string().min(1, 'Employee is required'),
  priority: z.enum(TASK_PRIORITIES as [string, ...string[]]),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(TASK_STATUSES as [string, ...string[]]),
});

export const updateTaskSchema = createTaskSchema.partial();

export const updateStatusSchema = z.object({
  status: z.enum(TASK_STATUSES as [string, ...string[]]),
});
