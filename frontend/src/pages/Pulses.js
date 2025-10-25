import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pulses = () => {
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const fetchPulses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pulses');
        setPulses(response.data);
      } catch (error) {
        console.error('Error fetching pulses:', error);
      }
    };
    fetchPulses();
  }, []);

  return (
    <div className="pulses">
      <h2>Pulses</h2>
      <div className="item-list">
        {pulses.map((pulse, index) => (
          <div key={index} className="card">
            <img src={pulse.image} alt={pulse.name} />
            <h3>{pulse.name}</h3>
            <p>₹{pulse.pricePerKg} per kg</p>
            <p>₹{pulse.pricePerQuintal} per quintal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pulses;
