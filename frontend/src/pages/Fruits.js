import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fruits = () => {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fruits');
        setFruits(response.data);
      } catch (error) {
        console.error('Error fetching fruits:', error);
      }
    };
    fetchFruits();
  }, []);

  return (
    <div className="fruits">
      <h2>Fruits</h2>
      <div className="item-list">
        {fruits.map((fruit, index) => (
          <div key={index} className="card">
            <img src={fruit.image} alt={fruit.name} />
            <h3>{fruit.name}</h3>
            <p>₹{fruit.pricePerKg} per kg</p>
            <p>₹{fruit.pricePerQuintal} per quintal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fruits;
