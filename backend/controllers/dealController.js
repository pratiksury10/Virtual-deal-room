const Deal = require("../models/Deal");

const createDeal = async (req, res) => {
    try {
      console.log("User in request:", req.user); // Log user data
      const { title, description, price } = req.body;
      
      // Ensure all required fields are present

        if (!title || !description || !price)  {
        return res.status(400).json({ msg: "Missing required fields" });
      }
  
      const buyerId = req.user.id;
  
      const newDeal = new Deal({
        title,
        description,
        price,
        buyer: buyerId,
      });
  
      const savedDeal = await newDeal.save();
      res.status(201).json(savedDeal);
    } catch (error) {
      console.error("Error creating deal:", error);
      res.status(500).json({ message: "Server error while creating deal" });
    }
  };


// Get deals created by the logged-in user
const getMyDeals = async (req, res) => {
    const userId = req.user.id;  // Assuming the token contains the user ID
    try {
      const deals = await Deal.find({ buyer: userId })  // Filter deals by the logged-in user's buyer ID
        .populate('buyer', 'email')  // Populating buyer email
        .populate('seller', 'email');  // Populating seller email
      res.json(deals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to load deals' });
    }
  };

// Accept Deal (assign seller to the deal)
const acceptDeal = async (req, res) => {
  try {
    const { id } = req.params;  // Get deal ID from params
    const sellerId = req.user._id;  // Get seller ID from token

    // Find the deal and update the status to "accepted" and assign the seller
    const updatedDeal = await Deal.findByIdAndUpdate(
      id, 
      { 
        status: "accepted", 
        seller: sellerId // Assign the seller's ID
      }, 
      { new: true } // Return the updated deal
    );

    if (!updatedDeal) {
      return res.status(404).json({ msg: "Deal not found" });
    }

    res.status(200).json(updatedDeal);
  } catch (error) {
    console.error("Error accepting deal:", error);
    res.status(500).json({ msg: "Server error while accepting deal" });
  }
};


const getAllDeals = async (req, res) => {
    try {
      const deals = await Deal.find().populate('seller', 'email').populate('buyer', 'email');
      res.json(deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  

module.exports = { createDeal, acceptDeal, getAllDeals, getMyDeals };

