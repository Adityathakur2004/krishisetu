import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LivePrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prices');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };
    fetchPrices();
  }, []);

  return (
    <div className="live-prices">
      <h2>Live Prices</h2>
      <div className="price-list">
        {prices.map((price, index) => (
          <div key={index} className="card">
            <h3>{price.crop}</h3>
            <p>₹{price.pricePerKg} per kg</p>
            <p>₹{price.pricePerQuintal} per quintal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePrices;
