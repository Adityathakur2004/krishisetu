const express = require('express');

const router = express.Router();

const fruits = [
  { name: 'Apple', pricePerKg: 120, image: 'https://example.com/apple.jpg' },
  { name: 'Banana', pricePerKg: 40, image: 'https://example.com/banana.jpg' },
  { name: 'Orange', pricePerKg: 60, image: 'https://example.com/orange.jpg' },
  { name: 'Mango', pricePerKg: 80, image: 'https://example.com/mango.jpg' },
  { name: 'Grapes', pricePerKg: 100, image: 'https://example.com/grapes.jpg' },
];

router.get('/', (req, res) => {
  res.json(fruits);
});

module.exports = router;
