const mongoose = require('mongoose');

const soilTestingSchema = new mongoose.Schema({
  testType: {
    type: String,
    required: true,
    enum: ['pH', 'Nutrient', 'Organic Matter', 'Texture', 'Salinity', 'Complete Analysis']
  },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    farmSize: String
  },
  farmerDetails: {
    name: String,
    contact: String,
    email: String
  },
  testResults: {
    pH: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicMatter: Number,
    texture: String,
    salinity: Number,
    micronutrients: {
      zinc: Number,
      iron: Number,
      manganese: Number,
      copper: Number,
      boron: Number
    }
  },
  recommendations: {
    fertilizers: [{
      type: String,
      quantity: String,
      timing: String
    }],
    amendments: [{
      type: String,
      quantity: String,
      purpose: String
    }],
    practices: [String]
  },
  testDate: {
    type: Date,
    default: Date.now
  },
  labName: {
    type: String,
    required: true
  },
  cost: {
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'In Progress'],
    default: 'Pending'
  },
  reportUrl: String,
  nextTestDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('SoilTesting', soilTestingSchema);
