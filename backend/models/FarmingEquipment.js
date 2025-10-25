const mongoose = require('mongoose');

const farmingEquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Tractor', 'Harvester', 'Seeder', 'Sprayer', 'Tiller', 'Irrigation', 'Processing', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    power: String,
    capacity: String,
    dimensions: String,
    weight: String,
    fuelType: String
  },
  price: {
    minPrice: Number,
    maxPrice: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  suitableCrops: [{
    type: String,
    trim: true
  }],
  advantages: [{
    type: String,
    trim: true
  }],
  maintenance: {
    frequency: String,
    cost: Number,
    tips: [String]
  },
  availability: {
    type: String,
    enum: ['Available', 'Limited', 'Out of Stock'],
    default: 'Available'
  },
  manufacturer: {
    name: String,
    contact: String,
    website: String
  },
  images: [{
    type: String
  }],
  rentalAvailable: {
    type: Boolean,
    default: false
  },
  rentalPrice: {
    daily: Number,
    weekly: Number,
    monthly: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FarmingEquipment', farmingEquipmentSchema);
