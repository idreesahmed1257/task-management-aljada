import { Router } from 'express';
import { list, getOne, create, update, updateStatus, remove } from './controller';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { createTaskSchema, updateTaskSchema, updateStatusSchema } from './validation';

const router = Router();

router.use(authenticate);

router.get('/', list);
router.get('/:id', getOne);
router.post('/', validate(createTaskSchema), create);
router.patch('/:id/status', validate(updateStatusSchema), updateStatus);
router.patch('/:id', validate(updateTaskSchema), update);
router.delete('/:id', remove);

export default router;
