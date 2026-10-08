import { Router } from 'express';
import { list, getOne, create, update, remove } from './controller';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { createEmployeeSchema, updateEmployeeSchema } from './validation';

const router = Router();

router.use(authenticate);

router.get('/', list);
router.get('/:id', getOne);
router.post('/', validate(createEmployeeSchema), create);
router.patch('/:id', validate(updateEmployeeSchema), update);
router.delete('/:id', remove);

export default router;
