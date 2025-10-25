import React, { useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="weather-forecast">
      <h2>Weather Forecast</h2>
      <div className="form-group">
        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          id="lat"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter latitude"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          id="lon"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Enter longitude"
        />
      </div>
      <button onClick={getCurrentLocation}>Use Current Location</button>
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div className="weather-info">
          <h3>Weather Information</h3>
          <p>City: {weather.city?.name}</p>
          <p>Temperature: {weather.list?.[0]?.main?.temp}°C</p>
          <p>Humidity: {weather.list?.[0]?.main?.humidity}%</p>
          <p>Description: {weather.list?.[0]?.weather?.[0]?.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
