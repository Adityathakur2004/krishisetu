const express = require('express');
const router = express.Router();
const FarmingEquipment = require('../models/FarmingEquipment');

// Get all farming equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await FarmingEquipment.find();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get equipment by category
router.get('/category/:category', async (req, res) => {
  try {
    const equipment = await FarmingEquipment.find({
      category: req.params.category
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get equipment by crop suitability
router.get('/crop/:crop', async (req, res) => {
  try {
    const equipment = await FarmingEquipment.find({
      suitableCrops: new RegExp(req.params.crop, 'i')
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single equipment
router.get('/:id', async (req, res) => {
  try {
    const equipment = await FarmingEquipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new equipment
router.post('/', async (req, res) => {
  const equipment = new FarmingEquipment({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    specifications: req.body.specifications,
    price: req.body.price,
    suitableCrops: req.body.suitableCrops,
    advantages: req.body.advantages,
    maintenance: req.body.maintenance,
    availability: req.body.availability,
    manufacturer: req.body.manufacturer,
    images: req.body.images,
    rentalAvailable: req.body.rentalAvailable,
    rentalPrice: req.body.rentalPrice
  });

  try {
    const newEquipment = await equipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
