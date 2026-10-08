import type { Request, Response, NextFunction } from 'express';
import { loginAdmin, getAdminById } from './service';
import { success } from '../../utils/response';
import type { AuthRequest } from '../../middlewares/auth';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const token = await loginAdmin(email, password);
    success(res, { token });
  } catch (err) {
    next(err);
  }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const admin = await getAdminById(req.adminId!);
    success(res, admin);
  } catch (err) {
    next(err);
  }
}
