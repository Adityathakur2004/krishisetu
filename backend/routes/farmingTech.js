const express = require('express');
const router = express.Router();
const FarmingTech = require('../models/FarmingTech');

// Get all farming technologies
router.get('/', async (req, res) => {
  try {
    const farmingTechs = await FarmingTech.find();
    res.json(farmingTechs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get farming technologies by crop type
router.get('/crop/:cropType', async (req, res) => {
  try {
    const farmingTechs = await FarmingTech.find({ cropType: req.params.cropType });
    res.json(farmingTechs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get farming technologies by specific crop
router.get('/crop/:cropType/:cropName', async (req, res) => {
  try {
    const farmingTech = await FarmingTech.findOne({
      cropType: req.params.cropType,
      cropName: req.params.cropName
    });
    if (!farmingTech) {
      return res.status(404).json({ message: 'Farming technology not found' });
    }
    res.json(farmingTech);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new farming technology
router.post('/', async (req, res) => {
  const farmingTech = new FarmingTech({
    cropType: req.body.cropType,
    cropName: req.body.cropName,
    techniques: req.body.techniques,
    technologies: req.body.technologies,
    bestPractices: req.body.bestPractices
  });

  try {
    const newFarmingTech = await farmingTech.save();
    res.status(201).json(newFarmingTech);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update farming technology
router.put('/:id', async (req, res) => {
  try {
    const farmingTech = await FarmingTech.findById(req.params.id);
    if (!farmingTech) {
      return res.status(404).json({ message: 'Farming technology not found' });
    }

    farmingTech.techniques = req.body.techniques || farmingTech.techniques;
    farmingTech.technologies = req.body.technologies || farmingTech.technologies;
    farmingTech.bestPractices = req.body.bestPractices || farmingTech.bestPractices;

    const updatedFarmingTech = await farmingTech.save();
    res.json(updatedFarmingTech);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete farming technology
router.delete('/:id', async (req, res) => {
  try {
    const farmingTech = await FarmingTech.findById(req.params.id);
    if (!farmingTech) {
      return res.status(404).json({ message: 'Farming technology not found' });
    }
    await farmingTech.remove();
    res.json({ message: 'Farming technology deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
