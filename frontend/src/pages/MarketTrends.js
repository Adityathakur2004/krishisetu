import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketTrends.css';

const MarketTrends = () => {
  const [trends, setTrends] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  useEffect(() => {
    filterTrends();
  }, [trends, selectedCrop, selectedLocation]);

  const fetchTrends = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/market-trends');
      setTrends(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trends:', error);
      setError('Failed to load market trends. Please try again later.');
      setLoading(false);
    }
  };

  const filterTrends = () => {
    let filtered = trends;

    if (selectedCrop !== 'All') {
      filtered = filtered.filter(trend => trend.cropName.toLowerCase().includes(selectedCrop.toLowerCase()));
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(trend => trend.marketLocation.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    setFilteredTrends(filtered);
  };

  const getUniqueValues = (key) => {
    const values = [...new Set(trends.map(trend => trend[key]))];
    return ['All', ...values];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#d32f2f';
      case 'down': return '#2e7d32';
      default: return '#f57c00';
    }
  };

  if (loading) {
    return (
      <div className="trends-container">
        <div className="loading">Loading market trends...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trends-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="trends-container">
      <div className="trends-header">
        <h1>📊 Market Trends</h1>
        <p>Real-time agricultural commodity price movements and analysis</p>
      </div>

      <div className="trends-filters">
        <div className="filter-group">
          <label>Filter by Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            {getUniqueValues('cropName').map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {getUniqueValues('marketLocation').map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="trends-grid">
        {filteredTrends.length === 0 ? (
          <div className="no-trends">No trends available for the selected filters.</div>
        ) : (
          filteredTrends.map(trend => (
            <div key={trend._id} className="trend-card">
              <div className="trend-header">
                <h3 className="crop-name">{trend.cropName}</h3>
                <div className="trend-indicator" style={{ color: getTrendColor(trend.trend) }}>
                  {getTrendIcon(trend.trend)}
                  <span className="trend-text">{trend.trend.toUpperCase()}</span>
                </div>
              </div>

              <div className="price-info">
                <div className="current-price">
                  <span className="label">Current Price:</span>
                  <span className="value">{formatPrice(trend.currentPrice)}</span>
                </div>
                <div className="price-change">
                  <span className="label">Change:</span>
                  <span className={`value ${trend.trend === 'up' ? 'positive' : trend.trend === 'down' ? 'negative' : 'neutral'}`}>
                    {trend.priceChange > 0 ? '+' : ''}{formatPrice(trend.priceChange)}
                    ({trend.priceChangePercent > 0 ? '+' : ''}{trend.priceChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="market-info">
                <div className="location">📍 {trend.marketLocation}</div>
                <div className="date">
                  {new Date(trend.date).toLocaleDateString('en-IN')}
                </div>
              </div>

              <div className="demand-supply">
                <div className="demand">
                  <span className="label">Demand:</span>
                  <span className={`value demand-${trend.demandLevel.toLowerCase()}`}>
                    {trend.demandLevel}
                  </span>
                </div>
                <div className="supply">
                  <span className="label">Supply:</span>
                  <span className={`value supply-${trend.supplyLevel.toLowerCase()}`}>
                    {trend.supplyLevel}
                  </span>
                </div>
              </div>

              {trend.factors && trend.factors.length > 0 && (
                <div className="factors">
                  <h4>Influencing Factors:</h4>
                  <ul>
                    {trend.factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {trend.forecast && (
                <div className="forecast">
                  <h4>Price Forecast:</h4>
                  <div className="forecast-details">
                    <div className="short-term">
                      <strong>Short-term:</strong> {trend.forecast.shortTerm.prediction}
                      <span className="confidence">({trend.forecast.shortTerm.confidence}% confidence)</span>
                    </div>
                    <div className="long-term">
                      <strong>Long-term:</strong> {trend.forecast.longTerm.prediction}
                      <span className="confidence">({trend.forecast.longTerm.confidence}% confidence)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarketTrends;
