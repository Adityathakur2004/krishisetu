const mongoose = require('mongoose');

const irrigationSystemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Drip', 'Sprinkler', 'Flood', 'Furrow', 'Center Pivot', 'Subsurface', 'Micro-Sprinkler'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    flowRate: String,
    pressure: String,
    coverage: String,
    pipeDiameter: String,
    emitterSpacing: String
  },
  suitableCrops: [{
    type: String,
    trim: true
  }],
  advantages: [{
    type: String,
    trim: true
  }],
  disadvantages: [{
    type: String,
    trim: true
  }],
  waterEfficiency: {
    percentage: Number,
    description: String
  },
  cost: {
    installation: Number,
    maintenance: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  installation: {
    requirements: [String],
    time: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    }
  },
  maintenance: {
    frequency: String,
    tasks: [String],
    cost: Number
  },
  climateSuitability: [{
    type: String,
    enum: ['Tropical', 'Subtropical', 'Temperate', 'Arid', 'Semi-Arid']
  }],
  powerSource: {
    type: String,
    enum: ['Electric', 'Solar', 'Manual', 'Diesel'],
    default: 'Electric'
  },
  automationLevel: {
    type: String,
    enum: ['Manual', 'Semi-Automatic', 'Fully Automatic'],
    default: 'Manual'
  },
  images: [{
    type: String
  }],
  suppliers: [{
    name: String,
    contact: String,
    location: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('IrrigationSystems', irrigationSystemsSchema);
