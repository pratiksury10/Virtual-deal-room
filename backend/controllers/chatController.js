// controllers/chatController.js
const Chat = require("../models/Chat");
const Deal = require("../models/Deal");

// Fetch chat messages for a specific deal
const getChatMessages = async (req, res) => {
  const { dealId } = req.params;

  try {
    const messages = await Chat.find({ dealId }).populate('userId', 'email');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// Send a new chat message for a specific deal
const sendMessage = async (req, res) => {
  const { dealId } = req.params;
  const { message } = req.body;
  const { userId } = req.user; 

  try {
    const newMessage = new Chat({ dealId, userId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};

module.exports = { getChatMessages, sendMessage };