const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  cropsInterested: [{
    type: String,
  }],
  profilePhoto: {
    type: String, // Base64 encoded image data
  },
  essentialInfo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Buyer', buyerSchema);
