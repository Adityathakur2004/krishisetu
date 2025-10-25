const express = require('express');
const axios = require('axios');

const router = express.Router();

// Get weather forecast
router.get('/', async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    let url;

    if (city) {
      // Use city name for weather
      const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
      // Use coordinates
      const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      // Default to Delhi if no parameters
      const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
      url = `https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=${apiKey}&units=metric`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    // Return mock data if API fails
    const mockWeather = {
      city: { name: req.query.city || 'Delhi' },
      list: [
        {
          dt: Date.now() / 1000,
          main: { temp: 28, humidity: 65 },
          weather: [{ description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 }
        }
      ]
    };
    res.json(mockWeather);
  }
});

// Get current weather
router.get('/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching current weather', error: err.message });
  }
});

module.exports = router;
