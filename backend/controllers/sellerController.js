const Deal = require("../models/Deal");

// 🟡 Seller: View all pending deals
const getPendingDeals = async (req, res) => {
  try {
    const pendingDeals = await Deal.find({ status: "pending" }).populate("buyer", "name email");
    res.status(200).json(pendingDeals);
  } catch (err) {
    console.error("Error fetching deals:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🟢 Seller: Accept a deal
const acceptDeal = async (req, res) => {
  const sellerId = req.user._id;
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id);
    if (!deal || deal.status !== "pending") {
      return res.status(400).json({ msg: "Invalid or already accepted/rejected deal" });
    }

    deal.status = "accepted";
    deal.seller = sellerId;
    await deal.save();

    res.status(200).json({ msg: "Deal accepted", deal });
  } catch (err) {
    console.error("Error accepting deal:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔴 Seller: Reject a deal
const rejectDeal = async (req, res) => {
  const sellerId = req.user._id;
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id);
    if (!deal || deal.status !== "pending") {
      return res.status(400).json({ msg: "Invalid or already processed deal" });
    }

    deal.status = "rejected";
    deal.seller = sellerId;
    await deal.save();

    res.status(200).json({ msg: "Deal rejected", deal });
  } catch (err) {
    console.error("Error rejecting deal:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getPendingDeals,
  acceptDeal,
  rejectDeal,
};
