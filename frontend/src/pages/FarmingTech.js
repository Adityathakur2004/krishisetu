import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmingTech.css';

const FarmingTech = () => {
  const [farmingTechs, setFarmingTechs] = useState([]);
  const [selectedCropType, setSelectedCropType] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);
  const [loading, setLoading] = useState(true);

  const cropTypes = ['all', 'vegetables', 'fruits', 'grains', 'pulses'];

  useEffect(() => {
    fetchFarmingTechs();
  }, [selectedCropType]);

  const fetchFarmingTechs = async () => {
    try {
      setLoading(true);
      const url = selectedCropType === 'all'
        ? 'http://localhost:5000/api/farming-tech'
        : `http://localhost:5000/api/farming-tech/crop/${selectedCropType}`;

      const response = await axios.get(url);
      setFarmingTechs(response.data);
    } catch (error) {
      console.error('Error fetching farming technologies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  const closeModal = () => {
    setSelectedTech(null);
  };

  return (
    <div className="farming-tech-container">
      <div className="farming-tech-header">
        <h1>Farming Technology & Techniques</h1>
        <p>Advanced methods to increase crop production and improve farming efficiency</p>
      </div>

      <div className="filter-section">
        <label htmlFor="cropType">Filter by Crop Type:</label>
        <select
          id="cropType"
          value={selectedCropType}
          onChange={(e) => setSelectedCropType(e.target.value)}
        >
          {cropTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Crops' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading farming technologies...</div>
      ) : (
        <div className="tech-grid">
          {farmingTechs.map((tech) => (
            <div key={tech._id} className="tech-card" onClick={() => handleTechClick(tech)}>
              <div className="tech-card-header">
                <h3>{tech.cropName}</h3>
                <span className="crop-type">{tech.cropType}</span>
              </div>
              <div className="tech-stats">
                <span>{tech.techniques.length} Techniques</span>
                <span>{tech.technologies.length} Technologies</span>
              </div>
              <p className="tech-description">
                Click to view detailed farming techniques and technologies for {tech.cropName}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedTech && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTech.cropName} - Farming Technologies</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <section className="tech-section">
                <h3>Advanced Techniques</h3>
                <div className="techniques-list">
                  {selectedTech.techniques.map((technique, index) => (
                    <div key={index} className="technique-item">
                      <h4>{technique.name}</h4>
                      <p><strong>Description:</strong> {technique.description}</p>
                      <p><strong>Benefits:</strong> {technique.benefits.join(', ')}</p>
                      <p><strong>Implementation:</strong> {technique.implementation}</p>
                      <p><strong>Season:</strong> {technique.season}</p>
                      <p><strong>Cost:</strong> ₹{technique.cost}</p>
                      <p><strong>Yield Increase:</strong> {technique.yieldIncrease}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tech-section">
                <h3>Modern Technologies</h3>
                <div className="technologies-list">
                  {selectedTech.technologies.map((technology, index) => (
                    <div key={index} className="technology-item">
                      <h4>{technology.name}</h4>
                      <p><strong>Description:</strong> {technology.description}</p>
                      <p><strong>Equipment:</strong> {technology.equipment.join(', ')}</p>
                      <p><strong>Advantages:</strong> {technology.advantages.join(', ')}</p>
                      <p><strong>Cost:</strong> ₹{technology.cost}</p>
                      <p><strong>ROI:</strong> {technology.roi}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tech-section">
                <h3>Best Practices</h3>
                <div className="practices-list">
                  {selectedTech.bestPractices.map((practice, index) => (
                    <div key={index} className="practice-item">
                      <h4>{practice.practice}</h4>
                      <p>{practice.details}</p>
                      <p><strong>Impact:</strong> {practice.impact}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmingTech;
