const mongoose = require('mongoose');

const agriculturalNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Policy', 'Technology', 'Market', 'Weather', 'Disease', 'General'],
    default: 'General'
  },
  source: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AgriculturalNews', agriculturalNewsSchema);
