import React, { useState } from 'react';
import axios from 'axios';

const DiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/disease/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error predicting disease:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-prediction">
      <h2>Crop Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>
      </form>
      {result && (
        <div className="result">
          <h3>Prediction Result:</h3>
          <p>Disease: {result.disease}</p>
          <p>Confidence: {result.confidence.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default DiseasePrediction;
