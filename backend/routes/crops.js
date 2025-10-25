const express = require('express');

const router = express.Router();

// Mock crop data with images
const crops = [
  {
    name: 'Wheat',
    type: 'Grain',
    image: 'https://example.com/wheat.jpg',
    description: 'A staple grain crop.',
  },
  {
    name: 'Rice',
    type: 'Grain',
    image: 'https://example.com/rice.jpg',
    description: 'Primary food crop in many regions.',
  },
  {
    name: 'Maize',
    type: 'Grain',
    image: 'https://example.com/maize.jpg',
    description: 'Versatile crop used for food and feed.',
  },
  {
    name: 'Sugarcane',
    type: 'Cash Crop',
    image: 'https://example.com/sugarcane.jpg',
    description: 'Source of sugar and ethanol.',
  },
  {
    name: 'Cotton',
    type: 'Fiber Crop',
    image: 'https://example.com/cotton.jpg',
    description: 'Used for textile production.',
  },
];

// Get all crops
router.get('/', (req, res) => {
  res.json(crops);
});

// Get crops by type
router.get('/type/:type', (req, res) => {
  const type = req.params.type;
  const filteredCrops = crops.filter(c => c.type.toLowerCase() === type.toLowerCase());
  res.json(filteredCrops);
});

module.exports = router;
