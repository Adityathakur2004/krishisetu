import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      <div className="card welcome-card">
        <h2>Welcome to KrishiSetu</h2>
        <p>Your comprehensive agricultural platform for farmers, buyers, and sellers.</p>
      </div>
      <div className="slider-container">
        <button className="slider-arrow left-arrow" onClick={scrollLeft}>{'<'}</button>
        <div className="features" ref={sliderRef}>
        <Link to="/prices" className="card-link">
          <div className="card feature-card">
            <h3>Live Prices</h3>
            <p>Get real-time prices for crops, vegetables, pulses, and fruits.</p>
          </div>
        </Link>
        <Link to="/disease" className="card-link">
          <div className="card feature-card">
            <h3>Disease Prediction</h3>
            <p>Upload images or videos of crops to detect diseases accurately.</p>
          </div>
        </Link>
        <Link to="/crops" className="card-link">
          <div className="card feature-card">
            <h3>Crop Information</h3>
            <p>Learn about different crop types with detailed information and images.</p>
          </div>
        </Link>
        <Link to="/transportation" className="card-link">
          <div className="card feature-card">
            <h3>Transportation</h3>
            <p>Find transportation services with GPS tracking for your agricultural needs.</p>
          </div>
        </Link>
        <Link to="/buyers" className="card-link">
          <div className="card feature-card">
            <h3>Buyers</h3>
            <p>Connect with buyers across the region.</p>
          </div>
        </Link>
        <Link to="/sellers" className="card-link">
          <div className="card feature-card">
            <h3>Sellers</h3>
            <p>Connect with sellers across the region.</p>
          </div>
        </Link>
        <Link to="/weather" className="card-link">
          <div className="card feature-card">
            <h3>Weather Forecast</h3>
            <p>Get accurate weather forecasts to plan your farming activities.</p>
          </div>
        </Link>
        <Link to="/vegetables" className="card-link">
          <div className="card feature-card">
            <h3>Vegetables</h3>
            <p>Browse fresh vegetables and their market prices.</p>
          </div>
        </Link>
        <Link to="/pulses" className="card-link">
          <div className="card feature-card">
            <h3>Pulses</h3>
            <p>Find information on pulses and legumes.</p>
          </div>
        </Link>
        <Link to="/fruits" className="card-link">
          <div className="card feature-card">
            <h3>Fruits</h3>
            <p>Explore various fruits and their prices.</p>
          </div>
        </Link>
        <Link to="/government-schemes" className="card-link">
          <div className="card feature-card">
            <h3>Government Schemes</h3>
            <p>Learn about government schemes for farmers.</p>
          </div>
        </Link>
        <Link to="/farming-tech" className="card-link">
          <div className="card feature-card">
            <h3>Farming Technology</h3>
            <p>Discover latest farming technology and innovations.</p>
          </div>
        </Link>
        <Link to="/fertilizer-pesticide" className="card-link">
          <div className="card feature-card">
            <h3>Fertilizers & Pesticides</h3>
            <p>Get information on fertilizers and pesticides.</p>
          </div>
        </Link>
        <Link to="/agricultural-news" className="card-link">
          <div className="card feature-card">
            <h3>Agricultural News</h3>
            <p>Stay updated with the latest agricultural news.</p>
          </div>
        </Link>
        <Link to="/market-trends" className="card-link">
          <div className="card feature-card">
            <h3>Market Trends</h3>
            <p>Analyze market trends and make informed decisions.</p>
          </div>
        </Link>
        <Link to="/farming-equipment" className="card-link">
          <div className="card feature-card">
            <h3>Farming Equipment</h3>
            <p>Browse farming equipment for your needs.</p>
          </div>
        </Link>
        <Link to="/soil-testing" className="card-link">
          <div className="card feature-card">
            <h3>Soil Testing</h3>
            <p>Get accurate soil testing services.</p>
          </div>
        </Link>
        <Link to="/irrigation-systems" className="card-link">
          <div className="card feature-card">
            <h3>Irrigation Systems</h3>
            <p>Explore modern irrigation solutions.</p>
          </div>
        </Link>
        </div>
        <button className="slider-arrow right-arrow" onClick={scrollRight}>{'>'}</button>
      </div>
    </div>
  );
};

export default Home;
