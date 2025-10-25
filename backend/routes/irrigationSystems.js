const express = require('express');
const router = express.Router();
const IrrigationSystems = require('../models/IrrigationSystems');

// Get all irrigation systems
router.get('/', async (req, res) => {
  try {
    const systems = await IrrigationSystems.find();
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get systems by type
router.get('/type/:type', async (req, res) => {
  try {
    const systems = await IrrigationSystems.find({
      type: req.params.type
    });
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get systems by crop suitability
router.get('/crop/:crop', async (req, res) => {
  try {
    const systems = await IrrigationSystems.find({
      suitableCrops: new RegExp(req.params.crop, 'i')
    });
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get systems by climate
router.get('/climate/:climate', async (req, res) => {
  try {
    const systems = await IrrigationSystems.find({
      climateSuitability: req.params.climate
    });
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single system
router.get('/:id', async (req, res) => {
  try {
    const system = await IrrigationSystems.findById(req.params.id);
    if (!system) {
      return res.status(404).json({ message: 'Irrigation system not found' });
    }
    res.json(system);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new irrigation system
router.post('/', async (req, res) => {
  const system = new IrrigationSystems({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    specifications: req.body.specifications,
    suitableCrops: req.body.suitableCrops,
    advantages: req.body.advantages,
    disadvantages: req.body.disadvantages,
    waterEfficiency: req.body.waterEfficiency,
    cost: req.body.cost,
    installation: req.body.installation,
    maintenance: req.body.maintenance,
    climateSuitability: req.body.climateSuitability,
    powerSource: req.body.powerSource,
    automationLevel: req.body.automationLevel,
    images: req.body.images,
    suppliers: req.body.suppliers
  });

  try {
    const newSystem = await system.save();
    res.status(201).json(newSystem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
