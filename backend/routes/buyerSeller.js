const express = require('express');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');

const router = express.Router();

// Get all buyers
router.get('/buyers', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a buyer
router.post('/buyers', async (req, res) => {
  const buyer = new Buyer({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    gstNumber: req.body.gstNumber,
    email: req.body.email,
    cropsInterested: req.body.cropsInterested,
    profilePhoto: req.body.profilePhoto,
  });

  try {
    const newBuyer = await buyer.save();
    res.status(201).json(newBuyer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a seller
router.post('/sellers', async (req, res) => {
  const seller = new Seller({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    gstNumber: req.body.gstNumber,
    email: req.body.email,
    cropsAvailable: req.body.cropsAvailable,
    profilePhoto: req.body.profilePhoto,
  });

  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
