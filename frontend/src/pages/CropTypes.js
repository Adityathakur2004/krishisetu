import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropTypes = () => {
  const [crops, setCrops] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const url = filter ? `http://localhost:5000/api/crops/type/${filter}` : 'http://localhost:5000/api/crops';
        const response = await axios.get(url);
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, [filter]);

  return (
    <div className="crop-types">
      <h2>Crop Types</h2>
      <div className="filter">
        <label htmlFor="type">Filter by Type:</label>
        <select id="type" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Grain">Grain</option>
          <option value="Cash Crop">Cash Crop</option>
          <option value="Fiber Crop">Fiber Crop</option>
        </select>
      </div>
      <div className="crop-list">
        {crops.map((crop, index) => (
          <div key={index} className="card">
            <img src={crop.image} alt={crop.name} />
            <h3>{crop.name}</h3>
            <p>{crop.type}</p>
            <p>{crop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropTypes;
