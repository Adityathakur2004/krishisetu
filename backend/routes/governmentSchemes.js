const express = require('express');
const router = express.Router();

// Government schemes data
const schemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Direct income support of ₹6,000 per year to farmer families.',
    eligibility: 'Small and marginal farmers with landholding up to 2 hectares.',
    benefits: '₹2,000 quarterly installments.',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 2,
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme to protect farmers against crop loss.',
    eligibility: 'All farmers growing notified crops.',
    benefits: 'Compensation for crop loss due to natural calamities.',
    link: 'https://pmfby.gov.in/'
  },
  {
    id: 3,
    name: 'Soil Health Card Scheme',
    description: 'Provides soil health cards to farmers for better crop management.',
    eligibility: 'All farmers.',
    benefits: 'Free soil testing and recommendations.',
    link: 'https://soilhealth.dac.gov.in/'
  },
  {
    id: 4,
    name: 'National Agriculture Market (eNAM)',
    description: 'Online trading platform for agricultural commodities.',
    eligibility: 'Farmers, traders, and buyers.',
    benefits: 'Better price discovery and transparent trading.',
    link: 'https://enam.gov.in/'
  },
  {
    id: 5,
    name: 'Kisan Credit Card (KCC)',
    description: 'Credit facility for farmers for agricultural and allied activities.',
    eligibility: 'Farmers engaged in agriculture and allied activities.',
    benefits: 'Short-term credit up to ₹3 lakh.',
    link: 'https://www.pmkisan.gov.in/KCCScheme.aspx'
  },
  {
    id: 6,
    name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    description: 'Promotes organic farming practices.',
    eligibility: 'Farmers interested in organic farming.',
    benefits: 'Financial assistance for organic inputs and certification.',
    link: 'https://pgsindia-ncof.gov.in/pkvy/'
  }
];

// GET /api/government-schemes - Get all government schemes
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: schemes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching government schemes',
      error: error.message
    });
  }
});

// GET /api/government-schemes/:id - Get a specific scheme by ID
router.get('/:id', (req, res) => {
  try {
    const schemeId = parseInt(req.params.id);
    const scheme = schemes.find(s => s.id === schemeId);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    res.json({
      success: true,
      data: scheme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scheme',
      error: error.message
    });
  }
});

module.exports = router;
