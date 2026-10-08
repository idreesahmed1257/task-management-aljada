import type { Request, Response, NextFunction } from 'express';
import * as service from './service';
import { success, created, noContent } from '../../utils/response';
import type { TaskQueryFilters } from './types';
import type { TaskStatus } from '../../constants';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters: TaskQueryFilters = {
      employeeId: req.query.employeeId as string | undefined,
      status: req.query.status as TaskStatus | undefined,
      priority: req.query.priority as 'low' | 'medium' | 'high' | undefined,
    };
    const tasks = await service.listTasks(filters);
    success(res, tasks);
  } catch (err) { next(err); }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await service.getTask(req.params.id);
    success(res, task);
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await service.createTask(req.body);
    created(res, task);
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await service.updateTask(req.params.id, req.body);
    success(res, task);
  } catch (err) { next(err); }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const task = await service.updateTaskStatus(req.params.id, req.body.status);
    success(res, task);
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteTask(req.params.id);
    noContent(res);
  } catch (err) { next(err); }
}
