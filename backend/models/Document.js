const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: String,
    fileUrl: String,
    fileType: String,
    allowedRoles: [String], // Example: ['buyer', 'seller']
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
