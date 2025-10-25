const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
  },
});

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String, // e.g., truck, van
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  capacity: {
    type: String, // e.g., 5 tons
  },
  gpsLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date,
  },
});

const transportationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  drivers: [driverSchema],
  vehicles: [vehicleSchema],
  services: [{
    type: String, // e.g., crop transport, cold storage
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transportation', transportationSchema);
