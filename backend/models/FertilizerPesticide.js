const mongoose = require('mongoose');

const fertilizerPesticideSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fertilizer', 'pesticide'],
    required: true
  },
  category: {
    type: String,
    enum: ['vegetables', 'fruits', 'grains', 'pulses', 'all'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  advantages: [{
    type: String,
    required: true
  }],
  disadvantages: [{
    type: String,
    required: true
  }],
  optimumUsage: {
    dosage: String,
    frequency: String,
    timing: String,
    applicationMethod: String,
    safetyPrecautions: [String]
  },
  suitableCrops: [{
    type: String,
    required: true
  }],
  environmentalImpact: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  organicCertified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FertilizerPesticide', fertilizerPesticideSchema);
