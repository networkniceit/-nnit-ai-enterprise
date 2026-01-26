import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import Job, { JobStatus } from '../models/Job';
import User from '../models/User';
import { matchFreelancersToJob } from '../services/ai.service';

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, budget, duration, skills } = req.body;

    const job = await Job.create({
      title,
      description,
      budget,
      duration,
      skills,
      status: JobStatus.OPEN,
      clientId: req.userId!
    });

    // Get AI-powered freelancer recommendations
    const recommendations = await matchFreelancersToJob(job);

    res.status(201).json({
      message: 'Job created successfully',
      job,
      recommendations
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { status, skills, page = 1, limit = 10 } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    const { rows: jobs, count } = await Job.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      jobs,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'rating']
        }
      ]
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, budget, duration, skills, status } = req.body;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await job.update({
      title: title || job.title,
      description: description || job.description,
      budget: budget || job.budget,
      duration: duration || job.duration,
      skills: skills || job.skills,
      status: status || job.status
    });

    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const completeJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.clientId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await job.update({ status: JobStatus.COMPLETED });

    // Update freelancer's completed jobs count
    if (job.freelancerId) {
      const freelancer = await User.findByPk(job.freelancerId);
      if (freelancer) {
        await freelancer.update({
          completedJobs: (freelancer.completedJobs || 0) + 1
        });
      }
    }

    res.json({ message: 'Job completed successfully', job });
  } catch (error) {
    console.error('Complete job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
