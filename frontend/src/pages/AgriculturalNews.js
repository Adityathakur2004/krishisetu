import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgriculturalNews.css';

const AgriculturalNews = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, selectedCategory]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/agricultural-news');
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
      setLoading(false);
    }
  };

  const filterNews = () => {
    if (selectedCategory === 'All') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.category === selectedCategory));
    }
  };

  const categories = ['All', 'Policy', 'Technology', 'Market', 'Weather', 'Disease', 'General'];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="news-container">
        <div className="loading">Loading agricultural news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>📰 Agricultural News</h1>
        <p>Stay updated with the latest developments in Indian agriculture</p>
      </div>

      <div className="news-filters">
        <div className="category-filter">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="news-grid">
        {filteredNews.length === 0 ? (
          <div className="no-news">No news available in this category.</div>
        ) : (
          filteredNews.map(item => (
            <div key={item._id} className="news-card">
              {item.imageUrl && (
                <div className="news-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              )}
              <div className="news-content">
                <div className="news-meta">
                  <span className={`category-badge category-${item.category.toLowerCase()}`}>
                    {item.category}
                  </span>
                  <span className="news-date">{formatDate(item.publishedDate)}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-summary">{item.content.substring(0, 150)}...</p>
                <div className="news-footer">
                  <span className="news-source">Source: {item.source}</span>
                  {item.tags && item.tags.length > 0 && (
                    <div className="news-tags">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgriculturalNews;
