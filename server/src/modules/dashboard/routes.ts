import { Router } from 'express';
import { summary, charts } from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.get('/summary', authenticate, summary);
router.get('/charts', authenticate, charts);

export default router;
