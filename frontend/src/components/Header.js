import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="home-button">
          <h1>KrishiSetu</h1>
        </Link>
        <div className="language-switcher">
          <label htmlFor="language">Language: </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <nav className={isMenuOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/prices" onClick={() => setIsMenuOpen(false)}>Live Prices</Link></li>
          <li><Link to="/disease" onClick={() => setIsMenuOpen(false)}>Disease Prediction</Link></li>
          <li><Link to="/crops" onClick={() => setIsMenuOpen(false)}>Crop Types</Link></li>
          <li><Link to="/transportation" onClick={() => setIsMenuOpen(false)}>Transportation</Link></li>
          <li><Link to="/buyers" onClick={() => setIsMenuOpen(false)}>Buyers</Link></li>
          <li><Link to="/sellers" onClick={() => setIsMenuOpen(false)}>Sellers</Link></li>
          <li><Link to="/weather" onClick={() => setIsMenuOpen(false)}>Weather</Link></li>
          <li><Link to="/vegetables" onClick={() => setIsMenuOpen(false)}>Vegetables</Link></li>
          <li><Link to="/pulses" onClick={() => setIsMenuOpen(false)}>Pulses</Link></li>
          <li><Link to="/fruits" onClick={() => setIsMenuOpen(false)}>Fruits</Link></li>
          <li><Link to="/government-schemes" onClick={() => setIsMenuOpen(false)}>Government Schemes</Link></li>
          <li><Link to="/farming-tech" onClick={() => setIsMenuOpen(false)}>Farming Technology</Link></li>
          <li><Link to="/fertilizer-pesticide" onClick={() => setIsMenuOpen(false)}>Fertilizers & Pesticides</Link></li>
          <li><Link to="/agricultural-news" onClick={() => setIsMenuOpen(false)}>Agricultural News</Link></li>
          <li><Link to="/market-trends" onClick={() => setIsMenuOpen(false)}>Market Trends</Link></li>
          <li><Link to="/farming-equipment" onClick={() => setIsMenuOpen(false)}>Farming Equipment</Link></li>
          <li><Link to="/soil-testing" onClick={() => setIsMenuOpen(false)}>Soil Testing</Link></li>
          <li><Link to="/irrigation-systems" onClick={() => setIsMenuOpen(false)}>Irrigation Systems</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
