import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuyerSellerDetails = () => {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [formData, setFormData] = useState({
    type: 'buyer',
    name: '',
    address: '',
    mobile: '',
    gstNumber: '',
    email: '',
    cropsInterested: '',
    cropsAvailable: '',
    pricePerKg: '',
    pricePerQuintal: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyersResponse = await axios.get('http://localhost:5000/api/buyers-sellers/buyers');
        const sellersResponse = await axios.get('http://localhost:5000/api/buyers-sellers/sellers');
        setBuyers(buyersResponse.data);
        setSellers(sellersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      if (formData.type === 'buyer') {
        data.cropsInterested = formData.cropsInterested.split(',');
        await axios.post('http://localhost:5000/api/buyers-sellers/buyers', data);
      } else {
        data.cropsAvailable = formData.cropsAvailable.split(',');
        await axios.post('http://localhost:5000/api/buyers-sellers/sellers', data);
      }
      alert(`${formData.type} added successfully!`);
      setFormData({
        type: 'buyer',
        name: '',
        address: '',
        mobile: '',
        gstNumber: '',
        email: '',
        cropsInterested: '',
        cropsAvailable: '',
        pricePerKg: '',
        pricePerQuintal: '',
      });
      // Refresh lists
      const buyersResponse = await axios.get('http://localhost:5000/api/buyers-sellers/buyers');
      const sellersResponse = await axios.get('http://localhost:5000/api/buyers-sellers/sellers');
      setBuyers(buyersResponse.data);
      setSellers(sellersResponse.data);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="buyer-seller-details">
      <h2>Buyers and Sellers</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            required
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
        {formData.type === 'buyer' && (
          <div className="form-group">
            <label htmlFor="cropsInterested">Crops Interested (comma-separated):</label>
            <input
              type="text"
              id="cropsInterested"
              name="cropsInterested"
              value={formData.cropsInterested}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.type === 'seller' && (
          <>
            <div className="form-group">
              <label htmlFor="cropsAvailable">Crops Available (comma-separated):</label>
              <input
                type="text"
                id="cropsAvailable"
                name="cropsAvailable"
                value={formData.cropsAvailable}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerKg">Price per Kg (₹):</label>
              <input
                type="number"
                id="pricePerKg"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerQuintal">Price per Quintal (₹):</label>
              <input
                type="number"
                id="pricePerQuintal"
                name="pricePerQuintal"
                value={formData.pricePerQuintal}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <button type="submit">Add {formData.type}</button>
      </form>
      <div className="lists">
        <div className="buyers">
          <h3>Buyers</h3>
          {buyers.map((buyer, index) => (
            <div key={index} className="card">
              <h4>{buyer.name}</h4>
              <p>{buyer.address}</p>
              <p>Mobile: {buyer.mobile}</p>
              <p>GST: {buyer.gstNumber}</p>
            </div>
          ))}
        </div>
        <div className="sellers">
          <h3>Sellers</h3>
          {sellers.map((seller, index) => (
            <div key={index} className="card">
              <h4>{seller.name}</h4>
              <p>{seller.address}</p>
              <p>Mobile: {seller.mobile}</p>
              <p>GST: {seller.gstNumber}</p>
              <p>Price: ₹{seller.pricePerKg}/kg, ₹{seller.pricePerQuintal}/quintal</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerSellerDetails;
