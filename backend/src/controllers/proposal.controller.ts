import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import Proposal, { ProposalStatus } from '../models/Proposal';
import Job, { JobStatus } from '../models/Job';
import User from '../models/User';

export const createProposal = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId, coverLetter, proposedBudget, estimatedDuration } = req.body;

    // Check if job exists and is open
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== JobStatus.OPEN) {
      return res.status(400).json({ error: 'Job is not open for proposals' });
    }

    // Check if freelancer already submitted a proposal
    const existingProposal = await Proposal.findOne({
      where: { jobId, freelancerId: req.userId! }
    });

    if (existingProposal) {
      return res.status(400).json({ error: 'You have already submitted a proposal for this job' });
    }

    const proposal = await Proposal.create({
      jobId,
      freelancerId: req.userId!,
      coverLetter,
      proposedBudget,
      estimatedDuration,
      status: ProposalStatus.PENDING
    });

    res.status(201).json({
      message: 'Proposal submitted successfully',
      proposal
    });
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProposalsByJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Only job owner can see proposals
    if (job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const proposals = await Proposal.findAll({
      where: { jobId },
      include: [
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'rating', 'skills', 'completedJobs']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ proposals });
  } catch (error) {
    console.error('Get proposals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProposalsByFreelancer = async (req: AuthRequest, res: Response) => {
  try {
    const { freelancerId } = req.params;

    // Only the freelancer can see their own proposals
    if (Number(freelancerId) !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const proposals = await Proposal.findAll({
      where: { freelancerId },
      include: [
        {
          model: Job,
          as: 'job',
          include: [
            {
              model: User,
              as: 'client',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ proposals });
  } catch (error) {
    console.error('Get freelancer proposals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptProposal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const proposal = await Proposal.findByPk(id, {
      include: [{ model: Job, as: 'job' }]
    });

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const job = await Job.findByPk(proposal.jobId);
    if (!job || job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update proposal status
    await proposal.update({ status: ProposalStatus.ACCEPTED });

    // Update job with freelancer and set to in progress
    await job.update({
      freelancerId: proposal.freelancerId,
      status: JobStatus.IN_PROGRESS
    });

    // Reject all other proposals for this job
    await Proposal.update(
      { status: ProposalStatus.REJECTED },
      {
        where: {
          jobId: proposal.jobId,
          id: { [require('sequelize').Op.ne]: proposal.id }
        }
      }
    );

    res.json({
      message: 'Proposal accepted successfully',
      proposal
    });
  } catch (error) {
    console.error('Accept proposal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectProposal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const proposal = await Proposal.findByPk(id);
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const job = await Job.findByPk(proposal.jobId);
    if (!job || job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await proposal.update({ status: ProposalStatus.REJECTED });

    res.json({
      message: 'Proposal rejected successfully',
      proposal
    });
  } catch (error) {
    console.error('Reject proposal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
