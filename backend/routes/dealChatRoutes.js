// server/routes/dealChatRoutes.js
const express = require('express');
const router = express.Router();
const {protect}  = require('../middleware/authMiddleware');
const Chat = require('../models/Chat');
const User = require('../models/User');

// 🔹 Get all chat messages for a deal
router.get('/:dealId/messages', protect, async (req, res) => {
  try {
    const chats = await Chat.find({ dealId: req.params.dealId })
      .populate('userId', 'email')
      .sort('createdAt');

    const formatted = chats.map(msg => ({
      senderName: msg.userId.email,
      content: msg.message,
      createdAt: msg.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// 🔹 Post a new chat message to a deal
router.post('/:dealId/messages', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const newChat = new Chat({
      dealId: req.params.dealId,
      userId: req.user.id,
      message,
    });

    await newChat.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
