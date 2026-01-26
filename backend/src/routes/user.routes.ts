import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);

export default router;
