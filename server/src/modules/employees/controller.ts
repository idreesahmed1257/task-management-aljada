import type { Request, Response, NextFunction } from 'express';
import * as service from './service';
import { success, created, noContent } from '../../utils/response';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const employees = await service.listEmployees(req.query.search as string | undefined);
    success(res, employees);
  } catch (err) { next(err); }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const emp = await service.getEmployee(req.params.id);
    success(res, emp);
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const emp = await service.createEmployee(req.body);
    created(res, emp);
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const emp = await service.updateEmployee(req.params.id, req.body);
    success(res, emp);
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteEmployee(req.params.id);
    noContent(res);
  } catch (err) { next(err); }
}
