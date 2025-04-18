const express = require("express");
const router = express.Router();
const { createDeal, getAllDeals, getMyDeals } = require("../controllers/dealController");
const { getPendingDeals, acceptDeal, rejectDeal } = require("../controllers/sellerController");
const {protect} = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const Deal = require('../models/Deal');

// Buyer creates deal
router.post("/create", protect, createDeal);

// Get all deals (could be for an admin or anyone)
router.get('/all', protect, getAllDeals);

// // Get my deals (created by the logged-in user)
// router.get("/my-deals", protect, getMyDeals);

// 🔹 Only buyers can get their own deals
router.get("/my-deals", protect, allowRoles("buyer"), getMyDeals);

// Seller view pending deals    
router.get("/pending", protect, getPendingDeals);

// Seller accepts a deal
router.patch("/:id/accept", protect, acceptDeal);

// Seller rejects a deal    
router.patch("/:id/reject", protect, rejectDeal);

// Get Deal by ID (additional route for deal details)
router.get("/:dealId", async (req, res) => {
    const { dealId } = req.params;
    try {
      const deal = await Deal.findById(dealId);
      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }
      res.json(deal);
    } catch (error) {
      res.status(500).json({ message: "Error fetching deal details", error });
    }
  });

  
// Route to fetch incoming deals for the seller
router.get("/incoming", protect, async (req, res) => {
    try {
      // Ensure the user is authenticated and has a valid user object
      console.log('Logged-in user:', req.user); // Check if user is logged in and user.id exists
  
      // Assuming you're filtering the deals based on the seller's ID from the JWT token
      const sellerId = req.user.id; // Get the seller's ID from the decoded JWT token
      if (!sellerId) {
        return res.status(400).json({ message: 'Seller ID is missing' });
      }
  
      // Find incoming deals for the seller where status is 'pending'
      const deals = await Deal.find({ seller: sellerId, status: 'pending' });
  
      if (!deals || deals.length === 0) {
        return res.status(404).json({ message: "No incoming deals available" });
      }
  
      res.status(200).json(deals);
    } catch (err) {
      console.error('Error fetching incoming deals:', err);
      res.status(500).json({ message: 'Error fetching incoming deals', error: err });
    }
  });

module.exports = router;




