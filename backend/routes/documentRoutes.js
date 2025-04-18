const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");
const { protect } = require("../middleware/authMiddleware");
const fs = require("fs");
const mongoose = require("mongoose");


// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.post("/upload", protect, upload.single("document"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }
  
      console.log("Incoming file:", req.file);
      console.log("Incoming body:", req.body);
      console.log("User:", req.user);
  
      const { dealId, allowedRoles } = req.body;
  
      if (!dealId || !mongoose.Types.ObjectId.isValid(dealId)) {
        return res.status(400).json({ msg: "Invalid deal ID" });
      }
  
      const doc = new Document({
        dealId: new mongoose.Types.ObjectId(dealId),
        uploadedBy: req.user.id,
        fileName: req.file.originalname,
        fileUrl: req.file.filename,
        fileType: req.file.mimetype,
        allowedRoles: allowedRoles ? JSON.parse(allowedRoles) : [],
      });
  
      await doc.save();
      res.status(201).json(doc);
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  });

// Get documents by deal ID and role
router.get("/:dealId", protect, async (req, res) => {
  try {
    const { dealId } = req.params;
    const userRole = req.user.role;

    const docs = await Document.find({
      dealId,
      allowedRoles: { $in: [userRole] },
    }).sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching documents", error: err.message });
  }
});

// Download Route
router.get("/download/:filename", protect, (req, res) => {
  const filepath = path.join(__dirname, "../uploads", req.params.filename);
  res.download(filepath);
});

module.exports = router;
