import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import Message from '../models/Message';
import User from '../models/User';
import { Op } from 'sequelize';

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { receiverId, content, jobId } = req.body;

    const message = await Message.create({
      senderId: req.userId!,
      receiverId,
      content,
      jobId: jobId || null,
      read: false
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const conversations = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: req.userId! },
          { receiverId: req.userId! }
        ]
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Group by conversation partner
    const conversationMap = new Map();
    conversations.forEach((msg) => {
      const partnerId = msg.senderId === req.userId ? msg.receiverId : msg.senderId;
      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, msg);
      }
    });

    const uniqueConversations = Array.from(conversationMap.values());

    res.json({ conversations: uniqueConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const otherUserId = Number(userId);

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: req.userId!, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: req.userId! }
        ]
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json({ messages });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.receiverId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await message.update({ read: true });

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
