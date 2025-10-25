const express = require('express');
const Transportation = require('../models/Transportation');

const router = express.Router();

// Get all transportation organizations
router.get('/', async (req, res) => {
  try {
    const transportations = await Transportation.find();
    res.json(transportations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a transportation organization
router.post('/', async (req, res) => {
  const transportation = new Transportation({
    organizationName: req.body.organizationName,
    address: req.body.address,
    mobile: req.body.mobile,
    gstNumber: req.body.gstNumber,
    email: req.body.email,
    drivers: req.body.drivers,
    vehicles: req.body.vehicles,
    services: req.body.services,
  });

  try {
    const newTransportation = await transportation.save();
    res.status(201).json(newTransportation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update GPS location for a vehicle
router.put('/vehicle/:orgId/:vehicleId/gps', async (req, res) => {
  try {
    const { orgId, vehicleId } = req.params;
    const { latitude, longitude } = req.body;

    const transportation = await Transportation.findById(orgId);
    if (!transportation) return res.status(404).json({ message: 'Organization not found' });

    const vehicle = transportation.vehicles.id(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.gpsLocation = {
      latitude,
      longitude,
      lastUpdated: new Date(),
    };

    await transportation.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
