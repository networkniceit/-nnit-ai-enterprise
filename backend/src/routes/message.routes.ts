import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import * as messageController from '../controllers/message.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  [
    body('receiverId').isNumeric().withMessage('Receiver ID is required'),
    body('content').notEmpty().withMessage('Message content is required')
  ],
  messageController.sendMessage
);

router.get('/conversations', authenticate, messageController.getConversations);
router.get('/conversation/:userId', authenticate, messageController.getConversation);
router.put('/:id/read', authenticate, messageController.markAsRead);

export default router;
