const mongoose = require('mongoose');

const marketTrendsSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number,
    required: true
  },
  priceChange: {
    type: Number,
    required: true
  },
  priceChangePercent: {
    type: Number,
    required: true
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    required: true
  },
  marketLocation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  factors: [{
    type: String,
    trim: true
  }],
  forecast: {
    shortTerm: {
      prediction: String,
      confidence: {
        type: Number,
        min: 0,
        max: 100
      }
    },
    longTerm: {
      prediction: String,
      confidence: {
        type: Number,
        min: 0,
        max: 100
      }
    }
  },
  demandLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  supplyLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MarketTrends', marketTrendsSchema);
