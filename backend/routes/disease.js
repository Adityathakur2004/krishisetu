const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Mock disease prediction function
const predictDisease = (filename) => {
  // In a real app, this would use AI/ML model
  const diseases = ['Healthy', 'Leaf Blight', 'Powdery Mildew', 'Rust', 'Bacterial Spot'];
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
  return {
    disease: randomDisease,
    confidence: Math.random() * 100,
    image: filename,
  };
};

// Upload and predict disease
router.post('/predict', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const result = predictDisease(req.file.filename);
  res.json(result);
});

// For video upload (similar, but for video)
router.post('/predict-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No video uploaded' });
  }

  const result = predictDisease(req.file.filename);
  res.json(result);
});

module.exports = router;
