import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vegetables');
        setVegetables(response.data);
      } catch (error) {
        console.error('Error fetching vegetables:', error);
      }
    };
    fetchVegetables();
  }, []);

  return (
    <div className="vegetables">
      <h2>Vegetables</h2>
      <div className="item-list">
        {vegetables.map((veg, index) => (
          <div key={index} className="card">
            <img src={veg.image} alt={veg.name} />
            <h3>{veg.name}</h3>
            <p>₹{veg.pricePerKg} per kg</p>
            <p>₹{veg.pricePerQuintal} per quintal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;
