const express = require('express');
const Seller = require('../models/Seller');

const router = express.Router();

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a seller
router.post('/', async (req, res) => {
  const seller = new Seller({
    fullName: req.body.fullName,
    address: req.body.address,
    mobileNumber: req.body.mobileNumber,
    cropType: req.body.cropType,
    cropName: req.body.cropName,
    pricePerQuintal: req.body.pricePerQuintal,
    profilePhoto: req.body.profilePhoto,
    essentialInfo: req.body.essentialInfo,
  });

  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
