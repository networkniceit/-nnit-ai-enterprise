import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth';
import * as jobController from '../controllers/job.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('client'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('budget').isNumeric().withMessage('Budget must be a number'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('skills').isArray().withMessage('Skills must be an array')
  ],
  jobController.createJob
);

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', authenticate, authorize('client'), jobController.updateJob);
router.delete('/:id', authenticate, authorize('client'), jobController.deleteJob);
router.post('/:id/complete', authenticate, authorize('client'), jobController.completeJob);

export default router;
