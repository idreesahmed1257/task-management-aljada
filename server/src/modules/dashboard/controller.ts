import type { Request, Response, NextFunction } from 'express';
import { getSummary, getChartData } from './service';
import { success } from '../../utils/response';

export async function summary(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await getSummary();
    success(res, data);
  } catch (err) {
    next(err);
  }
}

export async function charts(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await getChartData();
    success(res, data);
  } catch (err) {
    next(err);
  }
}
