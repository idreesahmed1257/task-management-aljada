import type { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, source: 'body' | 'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(source === 'body' ? req.body : req.query);
    if (!result.success) {
      const errors = (result.error as ZodError).errors.map((e) => e.message).join(', ');
      res.status(422).json({ success: false, message: errors, code: 'VALIDATION_ERROR' });
      return;
    }
    if (source === 'body') req.body = result.data;
    next();
  };
}
