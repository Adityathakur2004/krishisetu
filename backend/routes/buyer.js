const express = require('express');
const Buyer = require('../models/Buyer');

const router = express.Router();

// Get all buyers
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a buyer
router.post('/', async (req, res) => {
  const buyer = new Buyer({
    fullName: req.body.fullName,
    businessAddress: req.body.businessAddress,
    mobileNumber: req.body.mobileNumber,
    emailId: req.body.emailId,
    gstNumber: req.body.gstNumber,
    cropsInterested: req.body.cropsInterested,
    profilePhoto: req.body.profilePhoto,
    essentialInfo: req.body.essentialInfo,
  });

  try {
    const newBuyer = await buyer.save();
    res.status(201).json(newBuyer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
