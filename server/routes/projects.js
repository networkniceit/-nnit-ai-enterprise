const express = require('express');
const router = express.Router();
const { protect, demoUsers } = require('../middleware/auth');

// In-memory storage for demo mode
const demoProjects = new Map();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let projects = Array.from(demoProjects.values());

    // Filter by category
    if (category && category !== 'all') {
      projects = projects.filter(p => p.category === category);
    }

    // Filter by status
    if (status && status !== 'all') {
      projects = projects.filter(p => p.status === status);
    }

    // Search in title and description
    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    projects.sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, budget, duration, requiredSkills } = req.body;

    if (!title || !description || !category || !budget || !duration) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const projectId = Date.now().toString();
    const project = {
      id: projectId,
      title,
      description,
      category,
      budget: {
        min: budget.min || 0,
        max: budget.max || 0
      },
      duration,
      requiredSkills: requiredSkills || [],
      status: 'open',
      client: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      },
      proposals: [],
      aiMatchScore: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    demoProjects.set(projectId, project);

    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = demoProjects.get(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const project = demoProjects.get(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if (project.client.id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this project' });
    }

    // Update project
    const updatedProject = {
      ...project,
      ...req.body,
      id: project.id,
      client: project.client,
      updatedAt: new Date()
    };

    demoProjects.set(req.params.id, updatedProject);

    res.json({
      success: true,
      project: updatedProject
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = demoProjects.get(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if (project.client.id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this project' });
    }

    demoProjects.delete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
