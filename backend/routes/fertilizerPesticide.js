const express = require('express');
const router = express.Router();
const FertilizerPesticide = require('../models/FertilizerPesticide');

// Get all fertilizers and pesticides
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;
    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;

    const items = await FertilizerPesticide.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fertilizers/pesticides by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const items = await FertilizerPesticide.find({ category: { $in: [category, 'all'] } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fertilizers/pesticides by type and category
router.get('/:type/:category', async (req, res) => {
  try {
    const { type, category } = req.params;
    const items = await FertilizerPesticide.find({
      type,
      category: { $in: [category, 'all'] }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific fertilizer/pesticide by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await FertilizerPesticide.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new fertilizer/pesticide
router.post('/', async (req, res) => {
  try {
    const item = new FertilizerPesticide(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update fertilizer/pesticide
router.put('/:id', async (req, res) => {
  try {
    const item = await FertilizerPesticide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete fertilizer/pesticide
router.delete('/:id', async (req, res) => {
  try {
    const item = await FertilizerPesticide.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
