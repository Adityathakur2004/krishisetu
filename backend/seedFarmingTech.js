const mongoose = require('mongoose');
const FarmingTech = require('./models/FarmingTech');

const farmingTechData = [
  {
    cropType: 'vegetables',
    cropName: 'Tomato',
    techniques: [
      {
        name: 'Drip Irrigation',
        description: 'Water-efficient irrigation system delivering water directly to plant roots',
        benefits: ['Reduces water usage by 50%', 'Increases yield by 20-30%', 'Reduces weed growth', 'Prevents fungal diseases'],
        implementation: 'Install drip lines 15-20cm apart, maintain 1-2 bar pressure, irrigate 2-3 times per week',
        season: 'Year-round in controlled environment',
        cost: 25000,
        yieldIncrease: '25-35%'
      },
      {
        name: 'Raised Bed Farming',
        description: 'Growing crops on elevated beds for better drainage and soil management',
        benefits: ['Better drainage', 'Easier weed control', 'Improved soil aeration', 'Higher yields per square meter'],
        implementation: 'Create 20-30cm high beds, 1-1.5m wide, with 30cm paths between beds',
        season: 'All seasons',
        cost: 5000,
        yieldIncrease: '30-40%'
      },
      {
        name: 'Integrated Pest Management',
        description: 'Combining biological, cultural, and chemical methods for pest control',
        benefits: ['Reduces chemical usage', 'Maintains ecological balance', 'Cost-effective long-term', 'Safer produce'],
        implementation: 'Monitor pests weekly, use beneficial insects, apply neem oil, maintain field sanitation',
        season: 'Throughout growing season',
        cost: 8000,
        yieldIncrease: '15-25%'
      }
    ],
    technologies: [
      {
        name: 'Hydroponic System',
        description: 'Soil-less cultivation using nutrient-rich water solutions',
        equipment: ['Growing trays', 'Water pumps', 'Nutrient tanks', 'pH meters', 'Growing media'],
        advantages: ['90% less water usage', 'Faster growth', 'Year-round production', 'Space efficient'],
        cost: 150000,
        roi: '200-300% in 2 years'
      },
      {
        name: 'Automated Climate Control',
        description: 'Computer-controlled greenhouse environment management',
        equipment: ['Temperature sensors', 'Humidity controllers', 'Ventilation fans', 'Shade nets', 'Heaters'],
        advantages: ['Precise environmental control', 'Consistent quality', 'Extended growing season', 'Reduced labor costs'],
        cost: 200000,
        roi: '150-250% in 3 years'
      }
    ],
    bestPractices: [
      {
        practice: 'Soil Testing Before Planting',
        details: 'Test soil pH, nutrient levels, and organic matter content every 3 months',
        impact: 'Optimizes fertilizer use, prevents nutrient deficiencies, improves yield quality'
      },
      {
        practice: 'Crop Rotation',
        details: 'Rotate tomato with legumes, leafy vegetables, and root crops every season',
        impact: 'Prevents soil-borne diseases, maintains soil fertility, reduces pest pressure'
      },
      {
        practice: 'Mulching',
        details: 'Apply 5-7cm layer of organic mulch around plants',
        impact: 'Conserves soil moisture, suppresses weeds, maintains soil temperature'
      },
      {
        practice: 'Proper Plant Spacing',
        details: 'Maintain 45-60cm between plants and 75-90cm between rows',
        impact: 'Ensures adequate air circulation, reduces disease incidence, facilitates harvesting'
      }
    ]
  },
  {
    cropType: 'vegetables',
    cropName: 'Potato',
    techniques: [
      {
        name: 'Seed Treatment',
        description: 'Treating potato seeds with fungicides and growth promoters before planting',
        benefits: ['Prevents seed-borne diseases', 'Improves germination', 'Early uniform emergence', 'Higher yield potential'],
        implementation: 'Soak seeds in fungicide solution for 30 minutes, dry in shade, plant within 24 hours',
        season: 'October-November (Rabi) and February-March (Kharif)',
        cost: 1500,
        yieldIncrease: '20-30%'
      },
      {
        name: 'Hilling Up',
        description: 'Mounding soil around plant base to protect tubers and improve yield',
        benefits: ['Prevents greening of tubers', 'Increases tuber size', 'Reduces pest damage', 'Better drainage'],
        implementation: 'Hill up soil to 15-20cm height when plants are 15-20cm tall, repeat after 2-3 weeks',
        season: '45-60 days after planting',
        cost: 2000,
        yieldIncrease: '25-35%'
      },
      {
        name: 'Foliar Nutrition',
        description: 'Applying nutrients directly to leaves for faster absorption',
        benefits: ['Quick nutrient uptake', 'Corrects deficiencies rapidly', 'Improves quality', 'Stress tolerance'],
        implementation: 'Spray balanced NPK solution (19:19:19) at 2-3g/L every 15 days from 30 DAP',
        season: 'Throughout growing season',
        cost: 3000,
        yieldIncrease: '15-25%'
      }
    ],
    technologies: [
      {
        name: 'Precision Planter',
        description: 'Automated machine for accurate seed placement and spacing',
        equipment: ['GPS-guided tractor', 'Automatic depth control', 'Seed metering system', 'Fertilizer attachment'],
        advantages: ['Uniform plant stand', 'Optimal plant density', 'Reduced seed wastage', 'Time-saving'],
        cost: 500000,
        roi: '180-250% in 2 years'
      },
      {
        name: 'Cold Storage Integration',
        description: 'Temperature-controlled storage for harvested potatoes',
        equipment: ['Refrigerated storage units', 'Humidity controllers', 'Ventilation system', 'Quality monitoring sensors'],
        advantages: ['Extends shelf life to 6-8 months', 'Reduces post-harvest losses', 'Better price realization', 'Year-round supply'],
        cost: 1000000,
        roi: '150-200% in 3 years'
      }
    ],
    bestPractices: [
      {
        practice: 'Certified Seed Selection',
        details: 'Use certified disease-free seeds from reputable sources',
        impact: 'Ensures genetic purity, disease resistance, uniform growth, higher yields'
      },
      {
        practice: 'Proper Irrigation Scheduling',
        details: 'Irrigate at 60-70% soil moisture depletion, avoid waterlogging',
        impact: 'Prevents tuber cracking, reduces disease incidence, optimizes water use'
      },
      {
        practice: 'Disease Monitoring',
        details: 'Regular field scouting for early blight, late blight, and viral diseases',
        impact: 'Enables timely intervention, reduces yield losses, minimizes chemical use'
      },
      {
        practice: 'Harvest at Right Maturity',
        details: 'Harvest when 70-80% foliage has senesced, tubers are mature',
        impact: 'Maximizes yield, better storage quality, higher market value'
      }
    ]
  },
  {
    cropType: 'fruits',
    cropName: 'Mango',
    techniques: [
      {
        name: 'High Density Planting',
        description: 'Planting more trees per unit area with dwarf varieties',
        benefits: ['Higher yield per hectare', 'Early bearing', 'Easy management', 'Better quality control'],
        implementation: 'Plant 400-500 trees per hectare with 5x4m spacing, use dwarf rootstocks',
        season: 'June-July',
        cost: 15000,
        yieldIncrease: '200-300%'
      },
      {
        name: 'Canopy Management',
        description: 'Pruning and training for optimal light penetration and fruit production',
        benefits: ['Better fruit quality', 'Reduced disease incidence', 'Improved air circulation', 'Higher yields'],
        implementation: 'Maintain open center system, prune annually after harvest, remove water sprouts',
        season: 'December-February',
        cost: 5000,
        yieldIncrease: '30-40%'
      },
      {
        name: 'Flower Induction',
        description: 'Artificial methods to induce flowering in off-season',
        benefits: ['Year-round production', 'Higher market prices', 'Extended harvest period', 'Better income stability'],
        implementation: 'Use paclobutrazol (1-2g/tree) or potassium nitrate spray during off-season',
        season: 'May-June and September-October',
        cost: 8000,
        yieldIncrease: '50-70%'
      }
    ],
    technologies: [
      {
        name: 'Drip Irrigation with Fertigation',
        description: 'Automated irrigation with nutrient delivery system',
        equipment: ['Drip lines', 'Fertilizer injectors', 'Automation controllers', 'Soil moisture sensors'],
        advantages: ['90% water saving', 'Precise nutrient delivery', 'Reduced labor', 'Higher efficiency'],
        cost: 300000,
        roi: '250-350% in 2 years'
      },
      {
        name: 'Fruit Quality Sorting Machine',
        description: 'Automated grading and sorting based on size, color, and quality',
        equipment: ['Optical sensors', 'Conveyor belts', 'Sorting mechanism', 'Packaging system'],
        advantages: ['Consistent quality', 'Higher market value', 'Reduced labor costs', 'Export standard products'],
        cost: 800000,
        roi: '200-300% in 3 years'
      }
    ],
    bestPractices: [
      {
        practice: 'Variety Selection',
        details: 'Choose varieties suitable for local climate and market demand',
        impact: 'Better adaptation, higher yields, premium prices, market competitiveness'
      },
      {
        practice: 'Integrated Nutrient Management',
        details: 'Combine organic and inorganic fertilizers based on soil test results',
        impact: 'Maintains soil health, improves fruit quality, reduces input costs'
      },
      {
        practice: 'Pest and Disease Management',
        details: 'Regular monitoring and IPM approach for mango hoppers, powdery mildew, anthracnose',
        impact: 'Reduces crop losses, ensures food safety, sustainable production'
      },
      {
        practice: 'Post-Harvest Management',
        details: 'Proper harvesting, grading, storage, and transportation techniques',
        impact: 'Minimizes losses, maintains quality, better price realization'
      }
    ]
  },
  {
    cropType: 'grains',
    cropName: 'Rice',
    techniques: [
      {
        name: 'System of Rice Intensification (SRI)',
        description: 'Resource-efficient rice production method with wider spacing and intermittent irrigation',
        benefits: ['50% less water', '30% less seed', 'Higher yields', 'Reduced methane emissions'],
        implementation: 'Single seedling per hill, 25x25cm spacing, alternate wetting and drying irrigation',
        season: 'June-July (Kharif) and December-January (Rabi)',
        cost: 3000,
        yieldIncrease: '20-50%'
      },
      {
        name: 'Direct Seeded Rice (DSR)',
        description: 'Sowing rice seeds directly in field without nursery raising',
        benefits: ['Saves labor and water', 'Reduces transplanting shock', 'Earlier maturity', 'Cost-effective'],
        implementation: 'Use seed drill for uniform sowing, maintain 20-25cm row spacing, ensure good seed-soil contact',
        season: 'June-July',
        cost: 2500,
        yieldIncrease: '15-25%'
      },
      {
        name: 'Integrated Weed Management',
        description: 'Combination of cultural, mechanical, and chemical weed control methods',
        benefits: ['Reduces herbicide use', 'Maintains soil health', 'Cost-effective', 'Environment-friendly'],
        implementation: 'Use weed-competitive varieties, manual weeding at 20-25 DAS, post-emergence herbicides',
        season: 'Throughout cropping season',
        cost: 4000,
        yieldIncrease: '25-35%'
      }
    ],
    technologies: [
      {
        name: 'Laser Land Leveling',
        description: 'Precision leveling for uniform water distribution and higher yields',
        equipment: ['Laser transmitter', 'Receiver', 'Scraper blade', 'Tractor'],
        advantages: ['Uniform water distribution', '20-25% yield increase', 'Water saving', 'Better fertilizer use efficiency'],
        cost: 150000,
        roi: '300-400% in 1 year'
      },
      {
        name: 'Rice Transplanter',
        description: 'Automated machine for rice transplanting with precise spacing',
        equipment: ['8-row transplanter', 'Seedling trays', 'GPS guidance', 'Depth control'],
        advantages: ['Faster transplanting', 'Uniform plant stand', 'Reduced labor costs', 'Higher yields'],
        cost: 1200000,
        roi: '200-250% in 2 years'
      }
    ],
    bestPractices: [
      {
        practice: 'Seed Treatment and Quality Seeds',
        details: 'Use certified seeds treated with fungicides and bio-agents',
        impact: 'Ensures healthy crop stand, disease resistance, uniform maturity'
      },
      {
        practice: 'Water Management',
        details: 'Maintain 5cm water level during vegetative stage, reduce during reproductive stage',
        impact: 'Optimizes yield, reduces water wastage, prevents lodging'
      },
      {
        practice: 'Nutrient Management',
        details: 'Apply fertilizers based on soil test, use slow-release fertilizers',
        impact: 'Improves nutrient use efficiency, reduces environmental pollution'
      },
      {
        practice: 'Harvest at Right Moisture',
        details: 'Harvest at 20-22% grain moisture content for better storage',
        impact: 'Reduces post-harvest losses, maintains grain quality'
      }
    ]
  },
  {
    cropType: 'pulses',
    cropName: 'Chickpea',
    techniques: [
      {
        name: 'Seed Inoculation',
        description: 'Treating seeds with Rhizobium bacteria for nitrogen fixation',
        benefits: ['Reduces nitrogen fertilizer need', 'Increases yield', 'Improves soil fertility', 'Cost-effective'],
        implementation: 'Mix seeds with Rhizobium culture @ 10g/kg seed, dry in shade before sowing',
        season: 'October-November',
        cost: 1000,
        yieldIncrease: '15-25%'
      },
      {
        name: 'Conservation Tillage',
        description: 'Minimum soil disturbance to preserve soil structure and moisture',
        benefits: ['Conserves soil moisture', 'Reduces erosion', 'Saves energy', 'Improves soil health'],
        implementation: 'Use zero-till drill for sowing, leave crop residues on surface, avoid deep ploughing',
        season: 'October-November',
        cost: 2000,
        yieldIncrease: '20-30%'
      },
      {
        name: 'Foliar Application of Micronutrients',
        description: 'Spraying micronutrients on leaves for better absorption',
        benefits: ['Corrects deficiencies quickly', 'Improves pod filling', 'Enhances quality', 'Stress tolerance'],
        implementation: 'Spray ZnSO4 (0.5%) + FeSO4 (1%) at flowering and pod development stages',
        season: 'Flowering and pod development',
        cost: 1500,
        yieldIncrease: '10-20%'
      }
    ],
    technologies: [
      {
        name: 'Zero-Till Seed Drill',
        description: 'Machine for sowing seeds without ploughing',
        equipment: ['Zero-till drill', 'GPS guidance', 'Seed metering system', 'Fertilizer attachment'],
        advantages: ['Saves time and fuel', 'Conserves soil moisture', 'Reduces costs', 'Sustainable farming'],
        cost: 200000,
        roi: '250-350% in 2 years'
      },
      {
        name: 'Grain Moisture Meter',
        description: 'Device to measure grain moisture for optimal harvest timing',
        equipment: ['Digital moisture meter', 'Sampling probe', 'Temperature compensation', 'Data logging'],
        advantages: ['Accurate moisture reading', 'Prevents over-drying losses', 'Better storage quality', 'Cost optimization'],
        cost: 25000,
        roi: '500-600% in 1 year'
      }
    ],
    bestPractices: [
      {
        practice: 'Variety Selection',
        details: 'Choose high-yielding, disease-resistant varieties suitable for local conditions',
        impact: 'Higher yields, better disease resistance, market preference'
      },
      {
        practice: 'Sowing Time Optimization',
        details: 'Sow during first fortnight of October for rainfed and November for irrigated conditions',
        impact: 'Avoids terminal heat stress, ensures proper crop growth'
      },
      {
        practice: 'Plant Protection',
        details: 'Monitor for wilt, blight, and pod borer; use IPM approach',
        impact: 'Minimizes yield losses, ensures quality produce'
      },
      {
        practice: 'Post-Harvest Management',
        details: 'Thresh at 12-14% moisture, clean and dry properly before storage',
        impact: 'Reduces storage losses, maintains seed viability'
      }
    ]
  }
];

async function seedFarmingTech() {
  try {
    await mongoose.connect('mongodb://localhost:27017/krishisetu', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await FarmingTech.deleteMany({});
    console.log('Cleared existing farming technology data');

    // Insert new data
    const insertedData = await FarmingTech.insertMany(farmingTechData);
    console.log(`Inserted ${insertedData.length} farming technology records`);

    console.log('Farming technology seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding farming technology data:', error);
    process.exit(1);
  }
}

seedFarmingTech();
