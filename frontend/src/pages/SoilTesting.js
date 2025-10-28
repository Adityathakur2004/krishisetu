import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SoilTesting.css';

const SoilTesting = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    testType: 'Complete Analysis',
    location: {
      address: '',
      coordinates: { latitude: '', longitude: '' },
      farmSize: ''
    },
    farmerDetails: {
      name: '',
      contact: '',
      email: ''
    },
    labName: '',
    cost: { amount: '', currency: 'INR' }
  });

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    filterTests();
  }, [tests, selectedFarmer, selectedLocation]);

  const fetchTests = async () => {
    try {
      const response = await axios.get('/api/soil-testing');
      setTests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching soil tests:', error);
      setError('Failed to load soil testing data. Please try again later.');
      setLoading(false);
    }
  };

  const filterTests = () => {
    let filtered = tests;

    if (selectedFarmer !== 'All') {
      filtered = filtered.filter(test =>
        test.farmerDetails.name.toLowerCase().includes(selectedFarmer.toLowerCase())
      );
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(test =>
        test.location.address.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredTests(filtered);
  };

  const getUniqueValues = (key) => {
    if (key === 'farmer') {
      const values = [...new Set(tests.map(test => test.farmerDetails.name))];
      return ['All', ...values];
    }
    if (key === 'location') {
      const values = [...new Set(tests.map(test => test.location.address))];
      return ['All', ...values];
    }
    return ['All'];
  };

  const handleInputChange = (e, section, field) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [name]: value
        }
      }
    }));
  };

  const handleFarmerDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      farmerDetails: {
        ...prev.farmerDetails,
        [name]: value
      }
    }));
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      cost: {
        ...prev.cost,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/soil-testing', formData);
      alert('Soil test request submitted successfully!');
      setShowForm(false);
      setFormData({
        testType: 'Complete Analysis',
        location: {
          address: '',
          coordinates: { latitude: '', longitude: '' },
          farmSize: ''
        },
        farmerDetails: {
          name: '',
          contact: '',
          email: ''
        },
        labName: '',
        cost: { amount: '', currency: 'INR' }
      });
      fetchTests(); // Refresh the list
    } catch (error) {
      console.error('Error submitting soil test request:', error);
      alert('Failed to submit soil test request. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#2e7d32';
      case 'In Progress': return '#f57c00';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <div className="soil-testing-container">
        <div className="loading">Loading soil testing data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="soil-testing-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="soil-testing-container">
      <div className="soil-testing-header">
        <h1>🧪 Soil Testing Services</h1>
        <p>Comprehensive soil analysis for optimal crop production</p>
      </div>

      <div className="soil-testing-actions">
        <button
          className="request-test-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel Request' : 'Request New Soil Test'}
        </button>
      </div>

      {showForm && (
        <div className="test-request-form">
          <h2>Request Soil Test</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Test Type:</label>
              <select
                name="testType"
                value={formData.testType}
                onChange={(e) => handleInputChange(e)}
                required
              >
                <option value="pH">pH Test</option>
                <option value="Nutrient">Nutrient Analysis</option>
                <option value="Organic Matter">Organic Matter Test</option>
                <option value="Texture">Soil Texture Analysis</option>
                <option value="Salinity">Salinity Test</option>
                <option value="Complete Analysis">Complete Analysis</option>
              </select>
            </div>

            <div className="form-section">
              <h3>Location Details</h3>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.location.address}
                  onChange={handleLocationChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Latitude:</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.location.coordinates.latitude}
                    onChange={handleCoordinatesChange}
                  />
                </div>
                <div className="form-group">
                  <label>Longitude:</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.location.coordinates.longitude}
                    onChange={handleCoordinatesChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Farm Size (acres):</label>
                <input
                  type="text"
                  name="farmSize"
                  value={formData.location.farmSize}
                  onChange={handleLocationChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Farmer Details</h3>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.farmerDetails.name}
                  onChange={handleFarmerDetailsChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.farmerDetails.contact}
                    onChange={handleFarmerDetailsChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.farmerDetails.email}
                    onChange={handleFarmerDetailsChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Lab Name:</label>
                <input
                  type="text"
                  name="labName"
                  value={formData.labName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cost (INR):</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.cost.amount}
                  onChange={handleCostChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </div>
      )}

      <div className="soil-testing-filters">
        <div className="filter-group">
          <label>Filter by Farmer:</label>
          <select
            value={selectedFarmer}
            onChange={(e) => setSelectedFarmer(e.target.value)}
          >
            {getUniqueValues('farmer').map(farmer => (
              <option key={farmer} value={farmer}>{farmer}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {getUniqueValues('location').map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tests-grid">
        {filteredTests.length === 0 ? (
          <div className="no-tests">No soil tests available for the selected filters.</div>
        ) : (
          filteredTests.map(test => (
            <div key={test._id} className="test-card">
              <div className="test-header">
                <h3>{test.farmerDetails.name}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(test.status) }}
                >
                  {test.status}
                </span>
              </div>

              <div className="test-info">
                <div className="info-item">
                  <span className="label">Test Type:</span>
                  <span className="value">{test.testType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location:</span>
                  <span className="value">{test.location.address}</span>
                </div>
                <div className="info-item">
                  <span className="label">Lab:</span>
                  <span className="value">{test.labName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(test.testDate)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Cost:</span>
                  <span className="value">₹{test.cost.amount}</span>
                </div>
              </div>

              {test.testResults && (
                <div className="test-results">
                  <h4>Test Results</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="label">pH:</span>
                      <span className="value">{test.testResults.pH}</span>
                    </div>
                    <div className="result-item">
                      <span className="label">Nitrogen:</span>
                      <span className="value">{test.testResults.nitrogen} ppm</span>
                    </div>
                    <div className="result-item">
                      <span className="label">Phosphorus:</span>
                      <span className="value">{test.testResults.phosphorus} ppm</span>
                    </div>
                    <div className="result-item">
                      <span className="label">Potassium:</span>
                      <span className="value">{test.testResults.potassium} ppm</span>
                    </div>
                    <div className="result-item">
                      <span className="label">Organic Matter:</span>
                      <span className="value">{test.testResults.organicMatter}%</span>
                    </div>
                    <div className="result-item">
                      <span className="label">Texture:</span>
                      <span className="value">{test.testResults.texture}</span>
                    </div>
                  </div>
                </div>
              )}

              {test.recommendations && (
                <div className="recommendations">
                  <h4>Recommendations</h4>
                  {test.recommendations.fertilizers && test.recommendations.fertilizers.length > 0 && (
                    <div className="rec-section">
                      <h5>Fertilizers:</h5>
                      <ul>
                        {test.recommendations.fertilizers.map((fert, index) => (
                          <li key={index}>
                            {fert.type}: {fert.quantity} ({fert.timing})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {test.recommendations.practices && test.recommendations.practices.length > 0 && (
                    <div className="rec-section">
                      <h5>Practices:</h5>
                      <ul>
                        {test.recommendations.practices.map((practice, index) => (
                          <li key={index}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SoilTesting;
