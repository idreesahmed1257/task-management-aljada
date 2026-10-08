import { z } from 'zod';

export const createEmployeeSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email').toLowerCase().trim(),
  position: z.string().min(1, 'Position is required').trim(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
