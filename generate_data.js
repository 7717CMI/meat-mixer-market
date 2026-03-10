const fs = require('fs');
const path = require('path');

// Years: 2021-2033
const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// Geographies with their region grouping
// Source: Americas & MEA only — NO Europe, NO Asia Pacific
const REGIONS = {
  "North America": ["U.S.", "Canada"],
  "Latin America": ["Brazil", "Argentina", "Mexico", "Rest of Latin America"],
  "Middle East & Africa": ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Israel", "Rest of Middle East", "North Africa", "Central Africa", "South Africa"]
};

// Meat Mixer market segment definitions with share splits (proportions within each segment type)
const SEGMENT_TYPES = {
  "By Product Type": {
    "Horizontal Meat Mixers": 0.33,
    "Vertical Meat Mixers": 0.28,
    "Bowl Meat Mixers": 0.21,
    "Continuous Meat Mixers": 0.18
  },
  "By Features": {
    "Automatic Meat Mixers": 0.45,
    "Semi-Automatic Meat Mixers": 0.35,
    "Manual Meat Mixers": 0.20
  },
  "By Type of Meat": {
    "Beef": 0.30,
    "Poultry": 0.28,
    "Pork": 0.25,
    "Lamb": 0.10,
    "Others (fish, etc.)": 0.07
  },
  "By Mixing Capacity": {
    "Medium (51 kg to 200 kg)": 0.42,
    "Large (above 200 kg)": 0.35,
    "Small (up to 50 kg)": 0.23
  },
  "By Application": {
    "Meat Processing Plants": 0.40,
    "Supermarkets & Retail Chains": 0.25,
    "Restaurants & Catering Services": 0.20,
    "Butcher Shops": 0.15
  },
  "By Distribution Channel": {
    "Direct Sales (Manufacturers to End-Users)": 0.45,
    "Distributors & Wholesalers": 0.35,
    "Retail & Online Sales": 0.20
  }
};

// Regional base values (USD Million) for 2021 - Americas & MEA market ~$480M in 2021
const REGION_BASE_VALUES = {
  "North America": 295,
  "Latin America": 115,
  "Middle East & Africa": 70
};

// Country share within region (must sum to ~1.0)
const COUNTRY_SHARES = {
  "North America": { "U.S.": 0.82, "Canada": 0.18 },
  "Latin America": { "Brazil": 0.45, "Argentina": 0.15, "Mexico": 0.25, "Rest of Latin America": 0.15 },
  "Middle East & Africa": { "Saudi Arabia": 0.18, "UAE": 0.14, "Qatar": 0.04, "Kuwait": 0.03, "Israel": 0.06, "Rest of Middle East": 0.15, "North Africa": 0.15, "Central Africa": 0.10, "South Africa": 0.15 }
};

// Growth rates (CAGR) per region
const REGION_GROWTH_RATES = {
  "North America": 0.062,
  "Latin America": 0.072,
  "Middle East & Africa": 0.068
};

// Segment-specific growth multipliers (relative to regional base CAGR)
const SEGMENT_GROWTH_MULTIPLIERS = {
  "By Product Type": {
    "Horizontal Meat Mixers": 1.00,
    "Vertical Meat Mixers": 1.05,
    "Bowl Meat Mixers": 0.95,
    "Continuous Meat Mixers": 1.10
  },
  "By Features": {
    "Automatic Meat Mixers": 1.12,
    "Semi-Automatic Meat Mixers": 1.00,
    "Manual Meat Mixers": 0.85
  },
  "By Type of Meat": {
    "Beef": 0.95,
    "Poultry": 1.08,
    "Pork": 1.02,
    "Lamb": 0.98,
    "Others (fish, etc.)": 1.15
  },
  "By Mixing Capacity": {
    "Medium (51 kg to 200 kg)": 1.05,
    "Large (above 200 kg)": 1.10,
    "Small (up to 50 kg)": 0.95
  },
  "By Application": {
    "Meat Processing Plants": 1.08,
    "Supermarkets & Retail Chains": 1.05,
    "Restaurants & Catering Services": 1.02,
    "Butcher Shops": 0.90
  },
  "By Distribution Channel": {
    "Direct Sales (Manufacturers to End-Users)": 0.98,
    "Distributors & Wholesalers": 1.03,
    "Retail & Online Sales": 1.20
  }
};

// Volume multiplier: units per USD Million (rough: ~50 units per $1M for meat mixer equipment)
const volumePerMillionUSD = 50;

// Seeded pseudo-random for reproducibility
let seed = 42;
function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function addNoise(value, noiseLevel = 0.03) {
  return value * (1 + (seededRandom() - 0.5) * 2 * noiseLevel);
}

function roundTo1(val) {
  return Math.round(val * 10) / 10;
}

function roundToInt(val) {
  return Math.round(val);
}

function generateTimeSeries(baseValue, growthRate, roundFn) {
  const series = {};
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const rawValue = baseValue * Math.pow(1 + growthRate, i);
    series[year] = roundFn(addNoise(rawValue));
  }
  return series;
}

function generateData(isVolume) {
  const data = {};
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;

  // Compute global base values
  const globalBase = Object.values(REGION_BASE_VALUES).reduce((a, b) => a + b, 0) * multiplier;
  // Global weighted average growth rate
  const totalBase = Object.values(REGION_BASE_VALUES).reduce((a, b) => a + b, 0);
  const globalGrowth = Object.entries(REGION_BASE_VALUES).reduce((acc, [r, v]) => acc + REGION_GROWTH_RATES[r] * (v / totalBase), 0);

  // --- Global level ---
  data["Global"] = {};
  for (const [segType, segments] of Object.entries(SEGMENT_TYPES)) {
    data["Global"][segType] = {};
    for (const [segName, share] of Object.entries(segments)) {
      const segGrowth = globalGrowth * SEGMENT_GROWTH_MULTIPLIERS[segType][segName];
      const segBase = globalBase * share;
      data["Global"][segType][segName] = generateTimeSeries(segBase, segGrowth, roundFn);
    }
  }
  // By Region for Global (shows each region's total time series only)
  // Countries are resolved via segmentation_analysis.json hierarchy, not nested here
  data["Global"]["By Region"] = {};
  for (const [regionName] of Object.entries(REGIONS)) {
    const regionBase = REGION_BASE_VALUES[regionName] * multiplier;
    const regionGrowth = REGION_GROWTH_RATES[regionName];
    // Region total time series only
    data["Global"]["By Region"][regionName] = generateTimeSeries(regionBase, regionGrowth, roundFn);
  }

  // --- Region level ---
  for (const [regionName, countries] of Object.entries(REGIONS)) {
    const regionBase = REGION_BASE_VALUES[regionName] * multiplier;
    const regionGrowth = REGION_GROWTH_RATES[regionName];

    data[regionName] = {};
    for (const [segType, segments] of Object.entries(SEGMENT_TYPES)) {
      data[regionName][segType] = {};
      for (const [segName, share] of Object.entries(segments)) {
        const segGrowth = regionGrowth * SEGMENT_GROWTH_MULTIPLIERS[segType][segName];
        const segBase = regionBase * share;
        data[regionName][segType][segName] = generateTimeSeries(segBase, segGrowth, roundFn);
      }
    }

    // Country-level data directly on each country key
    for (const country of countries) {
      const cShare = COUNTRY_SHARES[regionName][country];
      const countryBase = regionBase * cShare;
      const countryGrowthVariation = 1 + (seededRandom() - 0.5) * 0.04;
      const countryGrowth = regionGrowth * countryGrowthVariation;

      data[country] = {};
      for (const [segType, segments] of Object.entries(SEGMENT_TYPES)) {
        data[country][segType] = {};
        for (const [segName, share] of Object.entries(segments)) {
          const segGrowth = countryGrowth * SEGMENT_GROWTH_MULTIPLIERS[segType][segName];
          const segBase = countryBase * share;
          const shareVariation = 1 + (seededRandom() - 0.5) * 0.1;
          data[country][segType][segName] = generateTimeSeries(segBase * shareVariation, segGrowth, roundFn);
        }
      }
    }
  }

  return data;
}

// Build segmentation_analysis.json
function generateSegmentationAnalysis() {
  const segStructure = {};

  for (const [segType, segments] of Object.entries(SEGMENT_TYPES)) {
    segStructure[segType] = {};
    for (const segName of Object.keys(segments)) {
      segStructure[segType][segName] = {};
    }
  }

  // By Region with object children (not arrays)
  segStructure["By Region"] = {};
  for (const [regionName, countries] of Object.entries(REGIONS)) {
    segStructure["By Region"][regionName] = {};
    for (const country of countries) {
      segStructure["By Region"][regionName][country] = {};
    }
  }

  const result = {
    "Global": segStructure
  };

  // Also add each region
  for (const regionName of Object.keys(REGIONS)) {
    result[regionName] = {};
    for (const [segType, segments] of Object.entries(SEGMENT_TYPES)) {
      result[regionName][segType] = {};
      for (const segName of Object.keys(segments)) {
        result[regionName][segType][segName] = {};
      }
    }
  }

  return result;
}

// Generate both datasets
seed = 42;
const valueData = generateData(false);
seed = 7777;
const volumeData = generateData(true);
const segmentationData = generateSegmentationAnalysis();

// Write files
const outDir = path.join(__dirname, 'public', 'data');
fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(path.join(outDir, 'segmentation_analysis.json'), JSON.stringify(segmentationData, null, 2));

console.log('Generated value.json, volume.json, and segmentation_analysis.json successfully');
console.log('Value geographies:', Object.keys(valueData).length);
console.log('Top-level keys:', Object.keys(valueData).slice(0, 10));
console.log('Volume geographies:', Object.keys(volumeData).length);
console.log('Segment types in Global:', Object.keys(valueData['Global']));
console.log('By Region keys:', Object.keys(valueData['Global']['By Region']));
console.log('');
console.log('segmentation_analysis.json top-level keys:', Object.keys(segmentationData));
console.log('By Region children type check (should be objects, not arrays):');
const byRegion = segmentationData['Global']['By Region'];
Object.entries(byRegion).forEach(([region, val]) => {
  console.log(`  ${region}: ${Array.isArray(val) ? 'ARRAY (broken)' : 'object (ok)'}, children: ${Object.keys(val).join(', ')}`);
});
