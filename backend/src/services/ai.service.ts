import Job from '../models/Job';
import User from '../models/User';
import { Op } from 'sequelize';

/**
 * AI-powered job matching service
 * Matches freelancers to jobs based on skills, rating, and availability
 */
export const matchFreelancersToJob = async (job: Job) => {
  try {
    // Find freelancers with matching skills
    const freelancers = await User.findAll({
      where: {
        role: 'freelancer',
        skills: {
          [Op.overlap]: job.skills
        }
      },
      attributes: { exclude: ['password'] },
      order: [
        ['rating', 'DESC'],
        ['completedJobs', 'DESC']
      ],
      limit: 10
    });

    // Calculate match score for each freelancer
    const recommendations = freelancers.map((freelancer) => {
      const matchingSkills = freelancer.skills?.filter((skill) =>
        job.skills.includes(skill)
      ) || [];
      
      const skillMatchScore = (matchingSkills.length / job.skills.length) * 100;
      const ratingScore = ((freelancer.rating || 0) / 5) * 100;
      const experienceScore = Math.min((freelancer.completedJobs || 0) * 2, 100);

      // Weighted average
      const totalScore = (
        skillMatchScore * 0.5 +
        ratingScore * 0.3 +
        experienceScore * 0.2
      );

      return {
        freelancer: {
          id: freelancer.id,
          firstName: freelancer.firstName,
          lastName: freelancer.lastName,
          email: freelancer.email,
          skills: freelancer.skills,
          rating: freelancer.rating,
          completedJobs: freelancer.completedJobs,
          hourlyRate: freelancer.hourlyRate
        },
        matchScore: Math.round(totalScore),
        matchingSkills,
        recommended: totalScore >= 70
      };
    });

    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Match freelancers error:', error);
    return [];
  }
};

/**
 * AI-powered job recommendations for freelancers
 */
export const recommendJobsForFreelancer = async (userId: number) => {
  try {
    const freelancer = await User.findByPk(userId);
    if (!freelancer || !freelancer.skills) {
      return [];
    }

    const jobs = await Job.findAll({
      where: {
        status: 'open',
        skills: {
          [Op.overlap]: freelancer.skills
        }
      },
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      limit: 20
    });

    const recommendations = jobs.map((job) => {
      const matchingSkills = job.skills.filter((skill) =>
        freelancer.skills?.includes(skill)
      );
      
      const skillMatchScore = (matchingSkills.length / job.skills.length) * 100;
      const budgetScore = freelancer.hourlyRate
        ? Math.min((job.budget / (freelancer.hourlyRate * 40)) * 100, 100)
        : 50;

      const totalScore = skillMatchScore * 0.7 + budgetScore * 0.3;

      return {
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          budget: job.budget,
          duration: job.duration,
          skills: job.skills
        },
        matchScore: Math.round(totalScore),
        matchingSkills,
        recommended: totalScore >= 60
      };
    });

    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Recommend jobs error:', error);
    return [];
  }
};
