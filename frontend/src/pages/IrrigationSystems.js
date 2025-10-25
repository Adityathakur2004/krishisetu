import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IrrigationSystems.css';

const IrrigationSystems = () => {
  const [systems, setSystems] = useState([]);
  const [filteredSystems, setFilteredSystems] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedClimate, setSelectedClimate] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);

  useEffect(() => {
    fetchSystems();
  }, []);

  useEffect(() => {
    filterSystems();
  }, [systems, selectedType, selectedCrop, selectedClimate]);

  const fetchSystems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/irrigation-systems');
      setSystems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching irrigation systems:', error);
      setError('Failed to load irrigation systems. Please try again later.');
      setLoading(false);
    }
  };

  const filterSystems = () => {
    let filtered = systems;

    if (selectedType !== 'All') {
      filtered = filtered.filter(system => system.type === selectedType);
    }

    if (selectedCrop !== 'All') {
      filtered = filtered.filter(system =>
        system.suitableCrops.some(crop =>
          crop.toLowerCase().includes(selectedCrop.toLowerCase())
        )
      );
    }

    if (selectedClimate !== 'All') {
      filtered = filtered.filter(system =>
        system.climateSuitability.includes(selectedClimate)
      );
    }

    setFilteredSystems(filtered);
  };

  const getUniqueValues = (key) => {
    if (key === 'suitableCrops') {
      const allCrops = systems.flatMap(system => system.suitableCrops);
      return ['All', ...new Set(allCrops)];
    }
    if (key === 'climateSuitability') {
      const allClimates = systems.flatMap(system => system.climateSuitability);
      return ['All', ...new Set(allClimates)];
    }
    const values = [...new Set(systems.map(system => system[key]))];
    return ['All', ...values];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getEfficiencyColor = (percentage) => {
    if (percentage >= 90) return '#2e7d32';
    if (percentage >= 80) return '#f57c00';
    return '#d32f2f';
  };

  const openModal = (system) => {
    setSelectedSystem(system);
  };

  const closeModal = () => {
    setSelectedSystem(null);
  };

  if (loading) {
    return (
      <div className="irrigation-container">
        <div className="loading">Loading irrigation systems...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="irrigation-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="irrigation-container">
      <div className="irrigation-header">
        <h1>💧 Irrigation Systems</h1>
        <p>Advanced irrigation solutions for efficient water management</p>
      </div>

      <div className="irrigation-filters">
        <div className="filter-group">
          <label>Filter by Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {getUniqueValues('type').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            {getUniqueValues('suitableCrops').map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Climate:</label>
          <select
            value={selectedClimate}
            onChange={(e) => setSelectedClimate(e.target.value)}
          >
            {getUniqueValues('climateSuitability').map(climate => (
              <option key={climate} value={climate}>{climate}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="systems-grid">
        {filteredSystems.length === 0 ? (
          <div className="no-systems">No irrigation systems available for the selected filters.</div>
        ) : (
          filteredSystems.map(system => (
            <div key={system._id} className="system-card">
              <div className="system-header">
                <h3 className="system-name">{system.name}</h3>
                <span className="system-type">{system.type}</span>
              </div>

              <div className="system-description">
                <p>{system.description}</p>
              </div>

              <div className="system-specs">
                <div className="spec-item">
                  <span className="label">Flow Rate:</span>
                  <span className="value">{system.specifications.flowRate}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Coverage:</span>
                  <span className="value">{system.specifications.coverage}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Power Source:</span>
                  <span className="value">{system.powerSource}</span>
                </div>
              </div>

              <div className="efficiency-info">
                <div className="efficiency-bar">
                  <span className="label">Water Efficiency:</span>
                  <div className="efficiency-display">
                    <div
                      className="efficiency-fill"
                      style={{
                        width: `${system.waterEfficiency.percentage}%`,
                        backgroundColor: getEfficiencyColor(system.waterEfficiency.percentage)
                      }}
                    ></div>
                    <span className="efficiency-text">{system.waterEfficiency.percentage}%</span>
                  </div>
                </div>
                <p className="efficiency-desc">{system.waterEfficiency.description}</p>
              </div>

              <div className="cost-info">
                <div className="cost-item">
                  <span className="label">Installation:</span>
                  <span className="value">{formatPrice(system.cost.installation)}</span>
                </div>
                <div className="cost-item">
                  <span className="label">Maintenance:</span>
                  <span className="value">{formatPrice(system.cost.maintenance)}/year</span>
                </div>
              </div>

              <div className="suitable-crops">
                <span className="label">Suitable for:</span>
                <div className="crops-list">
                  {system.suitableCrops.slice(0, 3).map(crop => (
                    <span key={crop} className="crop-tag">{crop}</span>
                  ))}
                  {system.suitableCrops.length > 3 && (
                    <span className="crop-tag">+{system.suitableCrops.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="automation-info">
                <span className={`automation-badge ${system.automationLevel.toLowerCase().replace(' ', '-')}`}>
                  {system.automationLevel}
                </span>
              </div>

              <button
                className="view-details-btn"
                onClick={() => openModal(system)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {selectedSystem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSystem.name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="system-gallery">
                {selectedSystem.images && selectedSystem.images.length > 0 ? (
                  selectedSystem.images.map((image, index) => (
                    <img key={index} src={image} alt={`${selectedSystem.name} ${index + 1}`} />
                  ))
                ) : (
                  <div className="no-image-large">💧</div>
                )}
              </div>

              <div className="system-details">
                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{selectedSystem.description}</p>
                </div>

                <div className="detail-section">
                  <h3>Specifications</h3>
                  <div className="specs-grid">
                    {Object.entries(selectedSystem.specifications).map(([key, value]) => (
                      <div key={key} className="spec-detail">
                        <span className="spec-label">{key}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Advantages</h3>
                  <ul>
                    {selectedSystem.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Disadvantages</h3>
                  <ul>
                    {selectedSystem.disadvantages.map((disadvantage, index) => (
                      <li key={index}>{disadvantage}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Installation & Maintenance</h3>
                  <div className="install-maintain">
                    <div className="install-info">
                      <h4>Installation</h4>
                      <p><strong>Time:</strong> {selectedSystem.installation.time}</p>
                      <p><strong>Difficulty:</strong>
                        <span className={`difficulty ${selectedSystem.installation.difficulty.toLowerCase()}`}>
                          {selectedSystem.installation.difficulty}
                        </span>
                      </p>
                      <div className="requirements">
                        <strong>Requirements:</strong>
                        <ul>
                          {selectedSystem.installation.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="maintain-info">
                      <h4>Maintenance</h4>
                      <p><strong>Frequency:</strong> {selectedSystem.maintenance.frequency}</p>
                      <p><strong>Cost:</strong> {formatPrice(selectedSystem.maintenance.cost)}/year</p>
                      <div className="maintenance-tasks">
                        <strong>Tasks:</strong>
                        <ul>
                          {selectedSystem.maintenance.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Climate Suitability</h3>
                  <div className="climate-tags">
                    {selectedSystem.climateSuitability.map(climate => (
                      <span key={climate} className="climate-tag">{climate}</span>
                    ))}
                  </div>
                </div>

                {selectedSystem.suppliers && selectedSystem.suppliers.length > 0 && (
                  <div className="detail-section">
                    <h3>Suppliers</h3>
                    <div className="suppliers-list">
                      {selectedSystem.suppliers.map((supplier, index) => (
                        <div key={index} className="supplier-item">
                          <h4>{supplier.name}</h4>
                          <p><strong>Contact:</strong> {supplier.contact}</p>
                          <p><strong>Location:</strong> {supplier.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IrrigationSystems;
