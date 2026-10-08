import { Router } from 'express';
import { login, me } from './controller';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { loginSchema } from './validation';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, me);

export default router;
