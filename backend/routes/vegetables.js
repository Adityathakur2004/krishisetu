const express = require('express');

const router = express.Router();

const vegetables = [
  { name: 'Tomato', pricePerKg: 40, image: 'https://example.com/tomato.jpg' },
  { name: 'Potato', pricePerKg: 20, image: 'https://example.com/potato.jpg' },
  { name: 'Onion', pricePerKg: 30, image: 'https://example.com/onion.jpg' },
  { name: 'Carrot', pricePerKg: 50, image: 'https://example.com/carrot.jpg' },
  { name: 'Cabbage', pricePerKg: 25, image: 'https://example.com/cabbage.jpg' },
];

router.get('/', (req, res) => {
  res.json(vegetables);
});

module.exports = router;
