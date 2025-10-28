import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmingEquipment.css';

const FarmingEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [equipment, selectedCategory, selectedCrop]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get('/api/farming-equipment');
      setEquipment(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      setError('Failed to load farming equipment. Please try again later.');
      setLoading(false);
    }
  };

  const filterEquipment = () => {
    let filtered = equipment;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedCrop !== 'All') {
      filtered = filtered.filter(item =>
        item.suitableCrops.some(crop =>
          crop.toLowerCase().includes(selectedCrop.toLowerCase())
        )
      );
    }

    setFilteredEquipment(filtered);
  };

  const getUniqueValues = (key) => {
    if (key === 'suitableCrops') {
      const allCrops = equipment.flatMap(item => item.suitableCrops);
      return ['All', ...new Set(allCrops)];
    }
    const values = [...new Set(equipment.map(item => item[key]))];
    return ['All', ...values];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const openModal = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
  };

  if (loading) {
    return (
      <div className="equipment-container">
        <div className="loading">Loading farming equipment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="equipment-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="equipment-container">
      <div className="equipment-header">
        <h1>🚜 Farming Equipment</h1>
        <p>Modern agricultural machinery and equipment for efficient farming</p>
      </div>

      <div className="equipment-filters">
        <div className="filter-group">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {getUniqueValues('category').map(category => (
              <option key={category} value={category}>{category}</option>
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
      </div>

      <div className="equipment-grid">
        {filteredEquipment.length === 0 ? (
          <div className="no-equipment">No equipment available for the selected filters.</div>
        ) : (
          filteredEquipment.map(item => (
            <div key={item._id} className="equipment-card">
              <div className="equipment-image">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.name} />
                ) : (
                  <div className="no-image">🚜</div>
                )}
              </div>

              <div className="equipment-content">
                <h3 className="equipment-name">{item.name}</h3>
                <p className="equipment-category">{item.category}</p>

                <div className="price-info">
                  <div className="price-range">
                    <span className="label">Price Range:</span>
                    <span className="value">
                      {formatPrice(item.price.minPrice)} - {formatPrice(item.price.maxPrice)}
                    </span>
                  </div>
                </div>

                <div className="specifications">
                  {item.specifications.power && (
                    <div className="spec-item">
                      <span className="label">Power:</span>
                      <span className="value">{item.specifications.power}</span>
                    </div>
                  )}
                  {item.specifications.capacity && (
                    <div className="spec-item">
                      <span className="label">Capacity:</span>
                      <span className="value">{item.specifications.capacity}</span>
                    </div>
                  )}
                </div>

                <div className="suitable-crops">
                  <span className="label">Suitable for:</span>
                  <div className="crops-list">
                    {item.suitableCrops.slice(0, 3).map(crop => (
                      <span key={crop} className="crop-tag">{crop}</span>
                    ))}
                    {item.suitableCrops.length > 3 && (
                      <span className="crop-tag">+{item.suitableCrops.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="availability">
                  <span className={`availability-badge ${item.availability.toLowerCase().replace(' ', '-')}`}>
                    {item.availability}
                  </span>
                </div>

                <button
                  className="view-details-btn"
                  onClick={() => openModal(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedEquipment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEquipment.name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="equipment-gallery">
                {selectedEquipment.images && selectedEquipment.images.length > 0 ? (
                  selectedEquipment.images.map((image, index) => (
                    <img key={index} src={image} alt={`${selectedEquipment.name} ${index + 1}`} />
                  ))
                ) : (
                  <div className="no-image-large">🚜</div>
                )}
              </div>

              <div className="equipment-details">
                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{selectedEquipment.description}</p>
                </div>

                <div className="detail-section">
                  <h3>Specifications</h3>
                  <div className="specs-grid">
                    {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
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
                    {selectedEquipment.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Cost Information</h3>
                  <div className="cost-info">
                    <div className="cost-item">
                      <span className="cost-label">Installation:</span>
                      <span className="cost-value">{formatPrice(selectedEquipment.cost.installation)}</span>
                    </div>
                    <div className="cost-item">
                      <span className="cost-label">Maintenance (Annual):</span>
                      <span className="cost-value">{formatPrice(selectedEquipment.cost.maintenance)}</span>
                    </div>
                  </div>
                </div>

                {selectedEquipment.rentalAvailable && (
                  <div className="detail-section">
                    <h3>Rental Options</h3>
                    <div className="rental-info">
                      <div className="rental-item">
                        <span className="rental-label">Daily:</span>
                        <span className="rental-value">{formatPrice(selectedEquipment.rentalPrice.daily)}</span>
                      </div>
                      <div className="rental-item">
                        <span className="rental-label">Weekly:</span>
                        <span className="rental-value">{formatPrice(selectedEquipment.rentalPrice.weekly)}</span>
                      </div>
                      <div className="rental-item">
                        <span className="rental-label">Monthly:</span>
                        <span className="rental-value">{formatPrice(selectedEquipment.rentalPrice.monthly)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="detail-section">
                  <h3>Maintenance</h3>
                  <div className="maintenance-info">
                    <div className="maintenance-item">
                      <span className="maintenance-label">Frequency:</span>
                      <span className="maintenance-value">{selectedEquipment.maintenance.frequency}</span>
                    </div>
                    <div className="maintenance-item">
                      <span className="maintenance-label">Cost:</span>
                      <span className="maintenance-value">{formatPrice(selectedEquipment.maintenance.cost)}</span>
                    </div>
                  </div>
                  <div className="maintenance-tips">
                    <h4>Tips:</h4>
                    <ul>
                      {selectedEquipment.maintenance.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedEquipment.manufacturer && (
                  <div className="detail-section">
                    <h3>Manufacturer</h3>
                    <div className="manufacturer-info">
                      <p><strong>Name:</strong> {selectedEquipment.manufacturer.name}</p>
                      <p><strong>Contact:</strong> {selectedEquipment.manufacturer.contact}</p>
                      {selectedEquipment.manufacturer.website && (
                        <p><strong>Website:</strong>
                          <a href={selectedEquipment.manufacturer.website} target="_blank" rel="noopener noreferrer">
                            {selectedEquipment.manufacturer.website}
                          </a>
                        </p>
                      )}
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

export default FarmingEquipment;
