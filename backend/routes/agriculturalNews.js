const express = require('express');
const router = express.Router();
const AgriculturalNews = require('../models/AgriculturalNews');

// Get all agricultural news
router.get('/', async (req, res) => {
  try {
    const news = await AgriculturalNews.find({ isActive: true })
      .sort({ publishedDate: -1 })
      .limit(20);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const news = await AgriculturalNews.find({
      category: req.params.category,
      isActive: true
    }).sort({ publishedDate: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single news item
router.get('/:id', async (req, res) => {
  try {
    const news = await AgriculturalNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new news (admin functionality)
router.post('/', async (req, res) => {
  const news = new AgriculturalNews({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    source: req.body.source,
    publishedDate: req.body.publishedDate,
    imageUrl: req.body.imageUrl,
    tags: req.body.tags
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
