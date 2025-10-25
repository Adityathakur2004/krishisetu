import React, { useState, useEffect, useRef } from 'react';
import './Buyers.css';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    businessAddress: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    cropsInterested: [],
    profilePhoto: null,
    essentialInfo: ''
  });
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/buyers');
      const data = await response.json();
      setBuyers(data);
    } catch (err) {
      setError('Error fetching buyers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCropsChange = (e) => {
    const crops = e.target.value.split(',').map(crop => crop.trim());
    setFormData({ ...formData, cropsInterested: crops });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/buyers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchBuyers();
        setFormData({
          fullName: '',
          businessAddress: '',
          mobileNumber: '',
          emailId: '',
          gstNumber: '',
          cropsInterested: [],
          profilePhoto: null,
          essentialInfo: ''
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError('Error creating buyer');
      }
    } catch (err) {
      setError('Error creating buyer: ' + err.message);
    }
  };

  const viewProfile = (buyer) => {
    setSelectedBuyer(buyer);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setSelectedBuyer(null);
    setShowProfile(false);
  };

  if (loading) {
    return <div className="buyers"><h2>Buyers</h2><p>Loading buyers...</p></div>;
  }

  if (error) {
    return <div className="buyers"><h2>Buyers</h2><p>Error: {error}</p></div>;
  }

  return (
    <div className="buyers">
      <h2>Buyers</h2>
      <p>Find buyers interested in agricultural products.</p>

      <div className="form-section">
        <h3>Create Buyer Profile</h3>
        <form onSubmit={handleSubmit} className="buyer-form">
          <div className="form-group">
            <label>Profile Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {formData.profilePhoto && (
              <img src={formData.profilePhoto} alt="Preview" className="photo-preview" />
            )}
          </div>

          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email ID:</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Business Address:</label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>GST Number:</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Crops Interested (comma separated):</label>
            <input
              type="text"
              name="cropsInterested"
              value={formData.cropsInterested.join(', ')}
              onChange={handleCropsChange}
            />
          </div>

          <div className="form-group">
            <label>Essential Information:</label>
            <textarea
              name="essentialInfo"
              value={formData.essentialInfo}
              onChange={handleInputChange}
              placeholder="Additional business details, requirements, etc."
            />
          </div>

          <button type="submit" className="submit-btn">Create Profile</button>
        </form>
      </div>

      <div className="buyers-list">
        <h3>Buyer Profiles</h3>
        <div className="buyers-grid">
          {buyers.map((buyer) => (
            <div key={buyer._id} className="buyer-card" onClick={() => viewProfile(buyer)}>
              {buyer.profilePhoto && <img src={buyer.profilePhoto} alt={buyer.fullName || buyer.name} className="profile-photo" />}
              <h4>{buyer.fullName || buyer.name}</h4>
              <p><strong>Mobile:</strong> {buyer.mobileNumber || buyer.mobile}</p>
              <p><strong>GST:</strong> {buyer.gstNumber}</p>
              <p><strong>Crops:</strong> {(buyer.cropsInterested || []).join(', ')}</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </div>

      {showProfile && selectedBuyer && (
        <div className="profile-modal">
          <div className="profile-content">
            <button className="close-btn" onClick={closeProfile}>×</button>
            <h3>Buyer Profile</h3>
            {selectedBuyer.profilePhoto && (
              <img src={selectedBuyer.profilePhoto} alt={selectedBuyer.fullName || selectedBuyer.name} className="profile-photo-large" />
            )}
            <div className="profile-details">
              <p><strong>Full Name:</strong> {selectedBuyer.fullName || selectedBuyer.name}</p>
              <p><strong>Mobile Number:</strong> {selectedBuyer.mobileNumber || selectedBuyer.mobile}</p>
              <p><strong>Email ID:</strong> {selectedBuyer.emailId || selectedBuyer.email}</p>
              <p><strong>Business Address:</strong> {selectedBuyer.businessAddress || selectedBuyer.address}</p>
              <p><strong>GST Number:</strong> {selectedBuyer.gstNumber}</p>
              <p><strong>Crops Interested:</strong> {(selectedBuyer.cropsInterested || []).join(', ')}</p>
              <p><strong>Essential Information:</strong> {selectedBuyer.essentialInfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buyers;
