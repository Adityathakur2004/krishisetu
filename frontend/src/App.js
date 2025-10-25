import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LivePrices from './pages/LivePrices';
import DiseasePrediction from './pages/DiseasePrediction';
import CropTypes from './pages/CropTypes';
import Transportation from './pages/Transportation';
import Buyers from './pages/Buyers';
import Sellers from './pages/Sellers';
import WeatherForecast from './pages/WeatherForecast';
import Vegetables from './pages/Vegetables';
import Pulses from './pages/Pulses';
import Fruits from './pages/Fruits';
import GovernmentSchemes from './pages/GovernmentSchemes';
import FarmingTech from './pages/FarmingTech';
import FertilizerPesticide from './pages/FertilizerPesticide';
import AgriculturalNews from './pages/AgriculturalNews';
import MarketTrends from './pages/MarketTrends';
import FarmingEquipment from './pages/FarmingEquipment';
import SoilTesting from './pages/SoilTesting';
import IrrigationSystems from './pages/IrrigationSystems';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <Router>
      <div className="App">
        <Header language={language} setLanguage={setLanguage} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<LivePrices />} />
            <Route path="/disease" element={<DiseasePrediction />} />
            <Route path="/crops" element={<CropTypes />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/weather" element={<WeatherForecast />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/pulses" element={<Pulses />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/farming-tech" element={<FarmingTech />} />
            <Route path="/fertilizer-pesticide" element={<FertilizerPesticide />} />
            <Route path="/agricultural-news" element={<AgriculturalNews />} />
            <Route path="/market-trends" element={<MarketTrends />} />
            <Route path="/farming-equipment" element={<FarmingEquipment />} />
            <Route path="/soil-testing" element={<SoilTesting />} />
            <Route path="/irrigation-systems" element={<IrrigationSystems />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
