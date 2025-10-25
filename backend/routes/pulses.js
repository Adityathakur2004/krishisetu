const express = require('express');

const router = express.Router();

const pulses = [
  { name: 'Lentils', pricePerKg: 80, image: 'https://example.com/lentils.jpg' },
  { name: 'Chickpeas', pricePerKg: 70, image: 'https://example.com/chickpeas.jpg' },
  { name: 'Kidney Beans', pricePerKg: 90, image: 'https://example.com/kidney-beans.jpg' },
  { name: 'Pigeon Peas', pricePerKg: 60, image: 'https://example.com/pigeon-peas.jpg' },
  { name: 'Black Gram', pricePerKg: 75, image: 'https://example.com/black-gram.jpg' },
];

router.get('/', (req, res) => {
  res.json(pulses);
});

module.exports = router;
