import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FertilizerPesticide.css';

const FertilizerPesticide = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, filters]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fertilizer-pesticide');
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fertilizer/pesticide data:', error);
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (filters.type !== 'all') {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(item =>
        item.category === filters.category || item.category === 'all'
      );
    }

    setFilteredItems(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return <div className="loading">Loading fertilizer and pesticide information...</div>;
  }

  return (
    <div className="fertilizer-pesticide-container">
      <div className="header-section">
        <h1>Fertilizers & Pesticides Guide</h1>
        <p>Learn about safe and effective use of fertilizers and pesticides for optimal crop production</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="fertilizer">Fertilizers</option>
            <option value="pesticide">Pesticides</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Crop Category:</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Crops</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="pulses">Pulses</option>
          </select>
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map(item => (
          <div key={item._id} className="item-card" onClick={() => openModal(item)}>
            <div className="item-header">
              <h3>{item.name}</h3>
              <span className={`item-type ${item.type}`}>
                {item.type === 'fertilizer' ? '🌱 Fertilizer' : '🛡️ Pesticide'}
              </span>
            </div>
            <p className="item-description">{item.description}</p>
            <div className="item-meta">
              <span className="category">Category: {item.category}</span>
              <span className={`impact ${item.environmentalImpact}`}>
                Environmental Impact: {item.environmentalImpact}
              </span>
              {item.organicCertified && <span className="organic">🌿 Organic Certified</span>}
            </div>
            <div className="suitable-crops">
              <strong>Suitable for:</strong> {item.suitableCrops.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedItem.name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="section">
                <h3>Description</h3>
                <p>{selectedItem.description}</p>
              </div>

              <div className="section">
                <h3>Advantages</h3>
                <ul>
                  {selectedItem.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3>Disadvantages</h3>
                <ul>
                  {selectedItem.disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3>Optimum Usage</h3>
                <div className="usage-details">
                  <p><strong>Dosage:</strong> {selectedItem.optimumUsage.dosage}</p>
                  <p><strong>Frequency:</strong> {selectedItem.optimumUsage.frequency}</p>
                  <p><strong>Timing:</strong> {selectedItem.optimumUsage.timing}</p>
                  <p><strong>Application Method:</strong> {selectedItem.optimumUsage.applicationMethod}</p>
                </div>
              </div>

              <div className="section">
                <h3>Safety Precautions</h3>
                <ul>
                  {selectedItem.optimumUsage.safetyPrecautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3>Suitable Crops</h3>
                <div className="crops-list">
                  {selectedItem.suitableCrops.map((crop, index) => (
                    <span key={index} className="crop-tag">{crop}</span>
                  ))}
                </div>
              </div>

              <div className="section">
                <div className="meta-info">
                  <span className={`impact-badge ${selectedItem.environmentalImpact}`}>
                    Environmental Impact: {selectedItem.environmentalImpact}
                  </span>
                  {selectedItem.organicCertified && (
                    <span className="organic-badge">🌿 Organic Certified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerPesticide;
