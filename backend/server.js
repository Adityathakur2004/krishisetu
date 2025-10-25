const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/krishisetu')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const buyerRoutes = require('./routes/buyer');
const sellerRoutes = require('./routes/seller');
const transportationRoutes = require('./routes/transportation');
const priceRoutes = require('./routes/prices');
const cropRoutes = require('./routes/crops');
const weatherRoutes = require('./routes/weather');
const diseaseRoutes = require('./routes/disease');
const vegetableRoutes = require('./routes/vegetables');
const pulseRoutes = require('./routes/pulses');
const fruitRoutes = require('./routes/fruits');
const governmentSchemesRoutes = require('./routes/governmentSchemes');
const farmingTechRoutes = require('./routes/farmingTech');
const fertilizerPesticideRoutes = require('./routes/fertilizerPesticide');
const agriculturalNewsRoutes = require('./routes/agriculturalNews');
const marketTrendsRoutes = require('./routes/marketTrends');
const farmingEquipmentRoutes = require('./routes/farmingEquipment');
const soilTestingRoutes = require('./routes/soilTesting');
const irrigationSystemsRoutes = require('./routes/irrigationSystems');

app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/transportation', transportationRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/vegetables', vegetableRoutes);
app.use('/api/pulses', pulseRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/government-schemes', governmentSchemesRoutes);
app.use('/api/farming-tech', farmingTechRoutes);
app.use('/api/fertilizer-pesticide', fertilizerPesticideRoutes);
app.use('/api/agricultural-news', agriculturalNewsRoutes);
app.use('/api/market-trends', marketTrendsRoutes);
app.use('/api/farming-equipment', farmingEquipmentRoutes);
app.use('/api/soil-testing', soilTestingRoutes);
app.use('/api/irrigation-systems', irrigationSystemsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to KrishiSetu API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
