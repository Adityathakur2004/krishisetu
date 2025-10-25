const express = require('express');
const router = express.Router();
const MarketTrends = require('../models/MarketTrends');

// Get all market trends
router.get('/', async (req, res) => {
  try {
    const trends = await MarketTrends.find()
      .sort({ date: -1 })
      .limit(50);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trends by crop
router.get('/crop/:cropName', async (req, res) => {
  try {
    const trends = await MarketTrends.find({
      cropName: new RegExp(req.params.cropName, 'i')
    }).sort({ date: -1 });
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trends by location
router.get('/location/:location', async (req, res) => {
  try {
    const trends = await MarketTrends.find({
      marketLocation: new RegExp(req.params.location, 'i')
    }).sort({ date: -1 });
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get latest trends
router.get('/latest', async (req, res) => {
  try {
    const trends = await MarketTrends.find()
      .sort({ date: -1 })
      .limit(10);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new market trend
router.post('/', async (req, res) => {
  const trend = new MarketTrends({
    cropName: req.body.cropName,
    currentPrice: req.body.currentPrice,
    previousPrice: req.body.previousPrice,
    priceChange: req.body.priceChange,
    priceChangePercent: req.body.priceChangePercent,
    trend: req.body.trend,
    marketLocation: req.body.marketLocation,
    factors: req.body.factors,
    forecast: req.body.forecast,
    demandLevel: req.body.demandLevel,
    supplyLevel: req.body.supplyLevel
  });

  try {
    const newTrend = await trend.save();
    res.status(201).json(newTrend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
