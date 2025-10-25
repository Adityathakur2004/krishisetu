const mongoose = require('mongoose');

const farmingTechSchema = new mongoose.Schema({
  cropType: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'grains', 'pulses']
  },
  cropName: {
    type: String,
    required: true
  },
  techniques: [{
    name: String,
    description: String,
    benefits: [String],
    implementation: String,
    season: String,
    cost: Number,
    yieldIncrease: String
  }],
  technologies: [{
    name: String,
    description: String,
    equipment: [String],
    advantages: [String],
    cost: Number,
    roi: String
  }],
  bestPractices: [{
    practice: String,
    details: String,
    impact: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FarmingTech', farmingTechSchema);
