const express = require('express');

const router = express.Router();

// Mock live prices data
const mockPrices = [
  { crop: 'Wheat', pricePerKg: 25, pricePerQuintal: 2500 },
  { crop: 'Rice', pricePerKg: 30, pricePerQuintal: 3000 },
  { crop: 'Maize', pricePerKg: 18, pricePerQuintal: 1800 },
  { crop: 'Sugarcane', pricePerKg: 3, pricePerQuintal: 300 },
  { crop: 'Cotton', pricePerKg: 50, pricePerQuintal: 5000 },
];

// Get live prices
router.get('/', (req, res) => {
  res.json(mockPrices);
});

// Get price for specific crop
router.get('/:crop', (req, res) => {
  const crop = req.params.crop;
  const price = mockPrices.find(p => p.crop.toLowerCase() === crop.toLowerCase());
  if (price) {
    res.json(price);
  } else {
    res.status(404).json({ message: 'Crop not found' });
  }
});

module.exports = router;
