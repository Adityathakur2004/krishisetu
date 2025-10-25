import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transportation = () => {
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    organizationName: '',
    address: '',
    mobile: '',
    gstNumber: '',
    email: '',
    drivers: [],
    vehicles: [],
    services: [],
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transportation');
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
    fetchOrganizations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transportation', formData);
      alert('Organization added successfully!');
      setFormData({
        organizationName: '',
        address: '',
        mobile: '',
        gstNumber: '',
        email: '',
        drivers: [],
        vehicles: [],
        services: [],
      });
      // Refresh list
      const response = await axios.get('http://localhost:5000/api/transportation');
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

  const getGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('GPS Location:', position.coords);
          // In a real app, send this to backend
        },
        (error) => {
          console.error('Error getting GPS location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="transportation">
      <h2>Transportation Services</h2>
      <button onClick={getGPSLocation}>Get GPS Location</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name:</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gstNumber">GST Number:</label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Organization</button>
      </form>
      <div className="organization-list">
        <h3>Transportation Organizations</h3>
        {organizations.map((org, index) => (
          <div key={index} className="card">
            <h4>{org.organizationName}</h4>
            <p>{org.address}</p>
            <p>Mobile: {org.mobile}</p>
            <p>GST: {org.gstNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transportation;
