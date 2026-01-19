const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// In-memory storage for demo mode
const demoProposals = new Map();

// @route   POST /api/proposals
// @desc    Create a new proposal
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { projectId, coverLetter, bidAmount, deliveryTime } = req.body;

    if (!projectId || !coverLetter || !bidAmount || !deliveryTime) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const proposalId = Date.now().toString();
    const proposal = {
      id: proposalId,
      projectId,
      freelancer: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar || 'https://via.placeholder.com/150',
        rating: req.user.rating || 0
      },
      coverLetter,
      bidAmount,
      deliveryTime,
      status: 'pending',
      aiGenerated: false,
      aiConfidence: 0,
      createdAt: new Date()
    };

    demoProposals.set(proposalId, proposal);

    res.status(201).json({
      success: true,
      proposal
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/proposals/project/:projectId
// @desc    Get all proposals for a project
// @access  Private
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const proposals = Array.from(demoProposals.values())
      .filter(p => p.projectId === req.params.projectId)
      .sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      success: true,
      count: proposals.length,
      proposals
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/proposals/freelancer/:freelancerId
// @desc    Get all proposals by a freelancer
// @access  Private
router.get('/freelancer/:freelancerId', protect, async (req, res) => {
  try {
    const proposals = Array.from(demoProposals.values())
      .filter(p => p.freelancer.id === req.params.freelancerId)
      .sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      success: true,
      count: proposals.length,
      proposals
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/proposals/:id/status
// @desc    Update proposal status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const proposal = demoProposals.get(req.params.id);

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected', 'withdrawn'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    proposal.status = status;
    demoProposals.set(req.params.id, proposal);

    res.json({
      success: true,
      proposal
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
