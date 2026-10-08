import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { AppError } from '../utils/AppError';

export interface AuthRequest extends Request {
  adminId?: string;
  adminEmail?: string;
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(AppError.unauthorized('No token provided'));
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    req.adminId = payload.adminId;
    req.adminEmail = payload.email;
    next();
  } catch {
    next(AppError.unauthorized('Invalid or expired token'));
  }
}
