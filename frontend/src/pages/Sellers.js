import React, { useState, useEffect, useRef } from 'react';
import './Sellers.css';

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    mobileNumber: '',
    cropType: '',
    cropName: '',
    pricePerQuintal: '',
    profilePhoto: null,
    essentialInfo: ''
  });
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState({
    buyerName: '',
    buyerAddress: '',
    quantity: '',
    totalAmount: '',
    date: new Date().toISOString().split('T')[0]
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sellers');
      const data = await response.json();
      setSellers(data);
    } catch (err) {
      setError('Error fetching sellers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sellers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchSellers();
        setFormData({
          fullName: '',
          address: '',
          mobileNumber: '',
          cropType: '',
          cropName: '',
          pricePerQuintal: '',
          profilePhoto: null,
          essentialInfo: ''
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError('Error creating seller');
      }
    } catch (err) {
      setError('Error creating seller: ' + err.message);
    }
  };

  const viewProfile = (seller) => {
    setSelectedSeller(seller);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setSelectedSeller(null);
    setShowProfile(false);
  };

  const generateBill = (seller) => {
    setSelectedSeller(seller);
    setBillData({
      ...billData,
      sellerName: seller.fullName || seller.name,
      sellerAddress: seller.address,
      cropName: seller.cropName || seller.cropsAvailable?.[0]?.cropName || '',
      pricePerQuintal: seller.pricePerQuintal || seller.cropsAvailable?.[0]?.pricePerQuintal || ''
    });
    setShowBill(true);
  };

  const closeBill = () => {
    setShowBill(false);
    setSelectedSeller(null);
  };

  const printBill = () => {
    window.print();
  };

  const calculateTotal = () => {
    const quantity = parseFloat(billData.quantity) || 0;
    const price = parseFloat(billData.pricePerQuintal) || 0;
    return (quantity * price).toFixed(2);
  };

  if (loading) {
    return <div className="sellers"><h2>Sellers</h2><p>Loading sellers...</p></div>;
  }

  if (error) {
    return <div className="sellers"><h2>Sellers</h2><p>Error: {error}</p></div>;
  }

  return (
    <div className="sellers">
      <h2>Sellers</h2>
      <p>Find sellers offering agricultural products.</p>

      <div className="form-section">
        <h3>Create Seller Profile</h3>
        <form onSubmit={handleSubmit} className="seller-form">
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
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
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
            <label>Type of Crop:</label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Crop Type</option>
              <option value="Cereals">Cereals</option>
              <option value="Pulses">Pulses</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Oilseeds">Oilseeds</option>
              <option value="Spices">Spices</option>
            </select>
          </div>

          <div className="form-group">
            <label>Crop Name:</label>
            <input
              type="text"
              name="cropName"
              value={formData.cropName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price per Quintal (₹):</label>
            <input
              type="number"
              name="pricePerQuintal"
              value={formData.pricePerQuintal}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Essential Information:</label>
            <textarea
              name="essentialInfo"
              value={formData.essentialInfo}
              onChange={handleInputChange}
              placeholder="Additional farming details, quality standards, etc."
            />
          </div>

          <button type="submit" className="submit-btn">Create Profile</button>
        </form>
      </div>

      <div className="sellers-list">
        <h3>Seller Profiles</h3>
        <div className="sellers-grid">
          {sellers.map((seller) => (
            <div key={seller._id} className="seller-card">
              {seller.profilePhoto && <img src={seller.profilePhoto} alt={seller.fullName || seller.name} className="profile-photo" />}
              <h4>{seller.fullName || seller.name}</h4>
              <p><strong>Mobile:</strong> {seller.mobileNumber || seller.mobile}</p>
              <p><strong>Crop:</strong> {seller.cropName || seller.cropsAvailable?.[0]?.cropName || 'N/A'}</p>
              <p><strong>Price:</strong> ₹{seller.pricePerQuintal || seller.cropsAvailable?.[0]?.pricePerQuintal || 'N/A'}/quintal</p>
              <div className="card-actions">
                <button className="view-profile-btn" onClick={() => viewProfile(seller)}>View Profile</button>
                <button className="generate-bill-btn" onClick={() => generateBill(seller)}>Generate Bill</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showProfile && selectedSeller && (
        <div className="profile-modal">
          <div className="profile-content">
            <button className="close-btn" onClick={closeProfile}>×</button>
            <h3>Seller Profile</h3>
            {selectedSeller.profilePhoto && (
              <img src={selectedSeller.profilePhoto} alt={selectedSeller.fullName || selectedSeller.name} className="profile-photo-large" />
            )}
            <div className="profile-details">
              <p><strong>Full Name:</strong> {selectedSeller.fullName || selectedSeller.name}</p>
              <p><strong>Address:</strong> {selectedSeller.address}</p>
              <p><strong>Mobile Number:</strong> {selectedSeller.mobileNumber || selectedSeller.mobile}</p>
              <p><strong>Crop Type:</strong> {selectedSeller.cropType || 'N/A'}</p>
              <p><strong>Crop Name:</strong> {selectedSeller.cropName || selectedSeller.cropsAvailable?.[0]?.cropName || 'N/A'}</p>
              <p><strong>Price per Quintal:</strong> ₹{selectedSeller.pricePerQuintal || selectedSeller.cropsAvailable?.[0]?.pricePerQuintal || 'N/A'}</p>
              <p><strong>Essential Information:</strong> {selectedSeller.essentialInfo}</p>
            </div>
          </div>
        </div>
      )}

      {showBill && selectedSeller && (
        <div className="bill-modal">
          <div className="bill-content">
            <button className="close-btn" onClick={closeBill}>×</button>
            <div className="bill-header">
              <h3>Digital Bill Slip</h3>
              <button className="print-btn" onClick={printBill}>Print Bill</button>
            </div>

            <div className="bill-details">
              <div className="seller-info">
                <h4>Seller Information</h4>
                <p><strong>Name:</strong> {billData.sellerName}</p>
                <p><strong>Address:</strong> {billData.sellerAddress}</p>
                <p><strong>Crop:</strong> {billData.cropName}</p>
                <p><strong>Price per Quintal:</strong> ₹{billData.pricePerQuintal}</p>
              </div>

              <div className="buyer-info">
                <h4>Buyer Information</h4>
                <input
                  type="text"
                  name="buyerName"
                  placeholder="Buyer Name"
                  value={billData.buyerName}
                  onChange={handleBillChange}
                />
                <textarea
                  name="buyerAddress"
                  placeholder="Buyer Address"
                  value={billData.buyerAddress}
                  onChange={handleBillChange}
                />
              </div>

              <div className="transaction-info">
                <h4>Transaction Details</h4>
                <p><strong>Date:</strong> {billData.date}</p>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity (Quintal)"
                  value={billData.quantity}
                  onChange={handleBillChange}
                  step="0.01"
                />
                <p><strong>Total Amount:</strong> ₹{calculateTotal()}</p>
              </div>
            </div>

            <div className="bill-footer">
              <p>Thank you for your business!</p>
              <p>Generated by KrishiSetu</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sellers;
