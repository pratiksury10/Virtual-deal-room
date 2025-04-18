// routes/chatRoutes.js
const express = require("express");
const { getChatMessages, sendMessage } = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get chat messages for a specific deal
router.get("/:dealId/chat", protect, getChatMessages);

// Send a new message for a specific deal
router.post("/:dealId/chat", protect, sendMessage);

module.exports = router;
