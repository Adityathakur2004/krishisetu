const express = require('express');
const router = express.Router();
const SoilTesting = require('../models/SoilTesting');

// Get all soil tests
router.get('/', async (req, res) => {
  try {
    const tests = await SoilTesting.find().sort({ testDate: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tests by farmer
router.get('/farmer/:farmerName', async (req, res) => {
  try {
    const tests = await SoilTesting.find({
      'farmerDetails.name': new RegExp(req.params.farmerName, 'i')
    }).sort({ testDate: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tests by location
router.get('/location/:location', async (req, res) => {
  try {
    const tests = await SoilTesting.find({
      'location.address': new RegExp(req.params.location, 'i')
    }).sort({ testDate: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single test
router.get('/:id', async (req, res) => {
  try {
    const test = await SoilTesting.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Soil test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request new soil test
router.post('/', async (req, res) => {
  const soilTest = new SoilTesting({
    testType: req.body.testType,
    location: req.body.location,
    farmerDetails: req.body.farmerDetails,
    labName: req.body.labName,
    cost: req.body.cost,
    status: req.body.status || 'Pending'
  });

  try {
    const newTest = await soilTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update test results
router.put('/:id/results', async (req, res) => {
  try {
    const test = await SoilTesting.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Soil test not found' });
    }

    test.testResults = req.body.testResults;
    test.recommendations = req.body.recommendations;
    test.status = 'Completed';
    test.reportUrl = req.body.reportUrl;
    test.nextTestDate = req.body.nextTestDate;

    const updatedTest = await test.save();
    res.json(updatedTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
