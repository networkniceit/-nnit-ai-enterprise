import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import * as proposalController from '../controllers/proposal.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  [
    body('jobId').isNumeric().withMessage('Job ID is required'),
    body('coverLetter').notEmpty().withMessage('Cover letter is required'),
    body('proposedBudget').isNumeric().withMessage('Proposed budget must be a number'),
    body('estimatedDuration').notEmpty().withMessage('Estimated duration is required')
  ],
  proposalController.createProposal
);

router.get('/job/:jobId', authenticate, proposalController.getProposalsByJob);
router.get('/freelancer/:freelancerId', authenticate, proposalController.getProposalsByFreelancer);
router.put('/:id/accept', authenticate, proposalController.acceptProposal);
router.put('/:id/reject', authenticate, proposalController.rejectProposal);

export default router;
