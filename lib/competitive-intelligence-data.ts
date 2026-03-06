/**
 * Competitive Intelligence Data Generator
 * Generates data for competitive dashboard and market share analysis
 * Last updated: 2024
 */

import { CHART_COLORS } from '@/lib/chart-theme'

export interface Proposition {
  title: string
  description: string
  category: string
}

export interface CompanyData {
  id: string
  name: string
  headquarters: string
  ceo: string
  yearEstablished: number
  portfolio: string
  strategies: string[]
  regionalStrength: string
  overallRevenue: number // in USD Mn
  segmentalRevenue: number // in USD Mn for 2024
  marketShare: number // percentage
  propositions?: Proposition[] // Dynamic propositions array
}

export interface MarketShareData {
  company: string
  marketShare: number
  color: string
}

export interface CompetitiveIntelligenceData {
  metadata: {
    market: string
    year: number
    currency: string
    revenue_unit: string
    total_companies: number
  }
  companies: CompanyData[]
  market_share_data: MarketShareData[]
}

let cachedData: CompetitiveIntelligenceData | null = null

/**
 * Parse competitive intelligence CSV row and extract propositions
 */
function parsePropositionsFromRow(row: Record<string, any>): Proposition[] {
  const propositions: Proposition[] = []
  
  // Look for proposition fields (Proposition 1 Title, Proposition 1 Description, etc.)
  let propIndex = 1
  while (true) {
    const titleKey = `Proposition ${propIndex} Title`
    const descKey = `Proposition ${propIndex} Description`
    const catKey = `Proposition ${propIndex} Category`
    
    const title = row[titleKey]?.toString().trim()
    const description = row[descKey]?.toString().trim()
    const category = row[catKey]?.toString().trim()
    
    // If no title, stop looking for more propositions
    if (!title || title === 'N/A' || title === '') {
      break
    }
    
    propositions.push({
      title,
      description: description || '',
      category: category || 'General'
    })
    
    propIndex++
    
    // Safety limit - prevent infinite loops
    if (propIndex > 10) break
  }
  
  return propositions
}

/**
 * Parse competitive intelligence data from CSV/JSON format
 */
export function parseCompetitiveIntelligenceFromData(rows: Record<string, any>[]): CompanyData[] {
  return rows.map((row, index) => {
    const marketShare = parseFloat(row['Market Share (%)']?.toString().replace('%', '') || '0')
    const revenue = generateRevenue(marketShare)
    
    // Parse propositions from row
    const propositions = parsePropositionsFromRow(row)
    
    // Get company name for color lookup
    const companyName = row['Company Name']?.toString() || ''
    const color = companyColors[companyName] || companyColors['Others'] || '#94a3b8'
    
    return {
      id: (row['Company ID'] || companyName.toLowerCase().replace(/\s+/g, '-') || `company-${index}`).toString(),
      name: companyName,
      headquarters: row['Headquarters']?.toString() || '',
      ceo: row['CEO']?.toString() || '',
      yearEstablished: parseInt(row['Year Established']?.toString() || '0'),
      portfolio: row['Product/Service Portfolio']?.toString() || '',
      strategies: (row['Strategies (comma-separated)']?.toString() || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      regionalStrength: row['Regional Strength']?.toString() || '',
      overallRevenue: parseFloat(row['Overall Revenue (USD Mn)']?.toString() || revenue.overall.toString()),
      segmentalRevenue: parseFloat(row['Segmental Revenue (USD Mn)']?.toString() || revenue.segmental.toString()),
      marketShare: marketShare,
      propositions: propositions.length > 0 ? propositions : undefined,
      color: color
    }
  })
}

/**
 * Load competitive intelligence data from store or API
 */
export async function loadCompetitiveIntelligenceData(): Promise<CompetitiveIntelligenceData | null> {
  if (cachedData) {
    return cachedData
  }

  // Try to get data from store first (if uploaded via dashboard builder)
  // Only try this in browser environment (client-side)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store')
        // Parse the store data
        const companies = parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
        
        // Calculate market share data
        const marketShareData = companies.map((company, index) => ({
          company: company.name,
          marketShare: company.marketShare,
          color: CHART_COLORS.primary[index % CHART_COLORS.primary.length]
        }))
        
        const data: CompetitiveIntelligenceData = {
          metadata: {
            market: 'Competitive Intelligence Market',
            year: 2024,
            currency: 'USD',
            revenue_unit: 'Mn',
            total_companies: companies.length
          },
          companies,
          market_share_data: marketShareData
        }
        
        // Cache the data
        cachedData = data
        return cachedData
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }

  try {
    // Try to load from API endpoint
    const response = await fetch('/api/load-competitive-intelligence', {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      // If file not found, return null to use fallback data
      if (response.status === 404) {
        console.log('Competitive intelligence CSV not found, using fallback data')
        return null
      }
      throw new Error(`Failed to load competitive intelligence: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Cache the data
    cachedData = data as CompetitiveIntelligenceData
    
    return cachedData
  } catch (error) {
    console.error('Error loading competitive intelligence data:', error)
    // Return null to use fallback data
    return null
  }
}

// Top companies in America's And Middle East & Africa Meat Mixer Market
const companies = [
  'Hobart Corporation',
  'The Middleby Corporation',
  'Sirman S.p.A',
  'Minerva Omega Group',
  'Dadaux SAS',
  'Nemco Food Equipment',
  'Lakidis',
  'IOZZELLI',
  'SKYMSEN',
  'Others'
]

// Company colors using the enterprise palette
const companyColors: Record<string, string> = {
  'Hobart Corporation': '#52B69A',
  'The Middleby Corporation': '#34A0A4',
  'Sirman S.p.A': '#D9ED92',
  'Minerva Omega Group': '#184E77',
  'Dadaux SAS': '#B5E48C',
  'Nemco Food Equipment': '#1E6091',
  'Lakidis': '#168AAD',
  'IOZZELLI': '#1A759F',
  'SKYMSEN': '#76C893',
  'Others': '#99D98C'
}

// Headquarters locations
const headquarters: Record<string, string> = {
  'Hobart Corporation': 'Troy, Ohio, USA',
  'The Middleby Corporation': 'Elgin, Illinois, USA',
  'Sirman S.p.A': 'Marsango, Italy',
  'Minerva Omega Group': 'Bologna, Italy',
  'Dadaux SAS': 'Bersaillin, France',
  'Nemco Food Equipment': 'Hicksville, Ohio, USA',
  'Lakidis': 'Thessaloniki, Greece',
  'IOZZELLI': 'Lucca, Italy',
  'SKYMSEN': 'Brusque, Brazil',
  'Others': 'Various'
}

// CEOs
const ceos: Record<string, string> = {
  'Hobart Corporation': 'Kevin Clark',
  'The Middleby Corporation': 'Tim FitzGerald',
  'Sirman S.p.A': 'Andrea Silvestri',
  'Minerva Omega Group': 'Marco Gualtieri',
  'Dadaux SAS': 'Philippe Dadaux',
  'Nemco Food Equipment': 'Jim Reichart',
  'Lakidis': 'Dimitris Lakidis',
  'IOZZELLI': 'Roberto Iozzelli',
  'SKYMSEN': 'Carlos Eduardo Schmidt',
  'Others': 'Multiple'
}

// Year established
const yearEstablished: Record<string, number> = {
  'Hobart Corporation': 1897,
  'The Middleby Corporation': 1888,
  'Sirman S.p.A': 1946,
  'Minerva Omega Group': 1945,
  'Dadaux SAS': 1920,
  'Nemco Food Equipment': 1976,
  'Lakidis': 1968,
  'IOZZELLI': 1955,
  'SKYMSEN': 1983,
  'Others': 0
}

// Product portfolios
const portfolios: Record<string, string> = {
  'Hobart Corporation': 'Horizontal & Vertical Mixers, Grinders, Commercial Kitchen Equipment',
  'The Middleby Corporation': 'Meat Processing, Cooking, Refrigeration, Food Prep Equipment',
  'Sirman S.p.A': 'Bowl Mixers, Meat Grinders, Vacuum Packers, Slicers',
  'Minerva Omega Group': 'Meat Mixers, Grinder-Mixers, Sausage Stuffers, Processing Lines',
  'Dadaux SAS': 'Industrial Meat Mixers, Tumblers, Injectors, Butchery Equipment',
  'Nemco Food Equipment': 'Prep Equipment, Mixers, Warmers, Dispensers',
  'Lakidis': 'Meat Mixers, Cutters, Grinders, Sausage Filling Machines',
  'IOZZELLI': 'Continuous Mixers, Industrial Processing Equipment, Custom Solutions',
  'SKYMSEN': 'Meat Mixers, Grinders, Slicers, Food Processing for Latin America',
  'Others': 'Various Meat Processing Equipment'
}

// Regional strengths
const regionalStrengths: Record<string, string> = {
  'Hobart Corporation': 'North America, Middle East',
  'The Middleby Corporation': 'North America, Latin America',
  'Sirman S.p.A': 'Latin America, Middle East',
  'Minerva Omega Group': 'Latin America, North America',
  'Dadaux SAS': 'North America, Middle East & Africa',
  'Nemco Food Equipment': 'North America',
  'Lakidis': 'Middle East & Africa, Latin America',
  'IOZZELLI': 'Latin America, Middle East',
  'SKYMSEN': 'Latin America, Africa',
  'Others': 'Regional'
}

// Market share percentages (must sum to 100)
const marketShares: Record<string, number> = {
  'Hobart Corporation': 15.0,
  'The Middleby Corporation': 12.0,
  'Sirman S.p.A': 8.0,
  'Minerva Omega Group': 7.0,
  'Dadaux SAS': 6.0,
  'Nemco Food Equipment': 5.0,
  'Lakidis': 4.0,
  'IOZZELLI': 3.0,
  'SKYMSEN': 3.0,
  'Others': 37.0
}

// Generate strategies based on company type
function generateStrategies(company: string): string[] {
  const strategyMap: Record<string, string[]> = {
    'Hobart Corporation': ['Premium Brand Positioning', 'Service Network Expansion', 'IoT-Enabled Equipment'],
    'The Middleby Corporation': ['Acquisition-Led Growth', 'Cross-Selling Portfolio', 'Automation Integration'],
    'Sirman S.p.A': ['European Quality Standards', 'Latin America Expansion', 'Compact Design Innovation'],
    'Minerva Omega Group': ['Full Processing Line Solutions', 'Aftermarket Services', 'Emerging Market Focus'],
    'Dadaux SAS': ['Industrial Scale Focus', 'Custom Engineering', 'Food Safety Compliance'],
    'Nemco Food Equipment': ['Value Pricing', 'Distributor Network Growth', 'Quick-Ship Programs'],
    'Lakidis': ['Mediterranean Market Expertise', 'Halal Certification', 'MEA Expansion'],
    'IOZZELLI': ['Continuous Mixing Technology', 'Energy Efficiency', 'Niche Specialization'],
    'SKYMSEN': ['Latin America Dominance', 'Cost Leadership', 'Local Manufacturing'],
    'Others': ['Regional Focus', 'Price Competition', 'Local Service Networks']
  }

  return strategyMap[company] || ['Market Development', 'Product Innovation', 'Strategic Partnerships']
}

// Generate propositions based on company type
function generatePropositions(company: string): Proposition[] {
  const propositionMap: Record<string, Proposition[]> = {
    'Hobart Corporation': [
      { title: 'Premium Commercial Mixers', description: 'Industry-leading horizontal and vertical meat mixers with capacities up to 500 kg', category: 'Product Leadership' },
      { title: 'IoT-Connected Equipment', description: 'Smart mixers with remote monitoring, predictive maintenance, and recipe management', category: 'Technology' },
      { title: 'Global Service Network', description: 'Authorized service in 50+ countries with 24/7 parts availability', category: 'Service Excellence' }
    ],
    'The Middleby Corporation': [
      { title: 'Complete Processing Solutions', description: 'End-to-end meat processing lines from mixing to packaging', category: 'Full Solutions' },
      { title: 'Acquisition Synergies', description: 'Portfolio of 60+ brands enabling cross-selling and bundled equipment deals', category: 'Strategic Growth' },
      { title: 'Energy-Efficient Designs', description: 'Mixers consuming 30% less energy with variable-speed drives', category: 'Sustainability' }
    ],
    'Sirman S.p.A': [
      { title: 'Italian Design Excellence', description: 'Compact, ergonomic bowl and vertical mixers for space-constrained operations', category: 'Design Innovation' },
      { title: 'Hygienic Construction', description: 'Full stainless steel construction meeting EU and FDA food safety standards', category: 'Food Safety' },
      { title: 'Latin America Growth', description: 'Expanding distribution network across Brazil, Argentina, and Mexico', category: 'Market Expansion' }
    ],
    'Minerva Omega Group': [
      { title: 'Grinder-Mixer Integration', description: 'Combined grinding and mixing solutions reducing processing steps by 40%', category: 'Process Innovation' },
      { title: 'Sausage Production Lines', description: 'Complete sausage production from mixing to stuffing to linking', category: 'Vertical Integration' },
      { title: 'Technical Training Programs', description: 'Operator certification and maintenance training at regional centers', category: 'Customer Support' }
    ],
    'Dadaux SAS': [
      { title: 'Industrial-Scale Mixing', description: 'High-capacity continuous mixers for large-scale meat processing plants', category: 'Scale Leadership' },
      { title: 'Custom Engineering', description: 'Bespoke mixer configurations for specialty meat products', category: 'Customization' },
      { title: 'Food Safety Compliance', description: 'HACCP-compliant equipment with CIP systems', category: 'Regulatory Compliance' }
    ],
    'Nemco Food Equipment': [
      { title: 'Value-Oriented Equipment', description: 'Reliable mixers at competitive price points for mid-market customers', category: 'Price Advantage' },
      { title: 'Quick-Ship Program', description: 'Standard models shipped within 48 hours from US warehouses', category: 'Logistics' },
      { title: 'Distributor Network', description: 'Strong dealer network across North America with local support', category: 'Distribution' }
    ],
    'Lakidis': [
      { title: 'Mediterranean Expertise', description: 'Specialized mixers for lamb, goat, and halal meat processing', category: 'Specialization' },
      { title: 'Halal Certification', description: 'Full halal-compliant equipment for Middle East markets', category: 'Market Adaptation' },
      { title: 'Compact Solutions', description: 'Small to medium capacity mixers ideal for butcher shops', category: 'SME Focus' }
    ],
    'IOZZELLI': [
      { title: 'Continuous Mixing Technology', description: 'Advanced continuous flow mixers for high-volume production', category: 'Technology Leadership' },
      { title: 'Energy Efficiency', description: 'Patented low-energy mixing mechanisms reducing operating costs', category: 'Cost Efficiency' },
      { title: 'Custom Automation', description: 'PLC-controlled mixing sequences for consistent product quality', category: 'Automation' }
    ],
    'SKYMSEN': [
      { title: 'Latin America Market Leader', description: 'Dominant presence in Brazil with growing LATAM distribution', category: 'Regional Strength' },
      { title: 'Cost-Competitive Manufacturing', description: 'Local production enabling 20-30% price advantage vs imports', category: 'Cost Leadership' },
      { title: 'Tropical Climate Designs', description: 'Equipment designed for high-humidity environments', category: 'Design Adaptation' }
    ],
    'Others': [
      { title: 'Regional Specialization', description: 'Local manufacturers serving specific market needs', category: 'Market Adaptation' },
      { title: 'Price Competition', description: 'Competitive pricing for budget-conscious buyers', category: 'Value Proposition' },
      { title: 'Local Service', description: 'Quick response times and local parts availability', category: 'Service' }
    ]
  }

  return propositionMap[company] || [
    { title: 'Market Development', description: 'Expanding into new markets and segments', category: 'Market Strategy' },
    { title: 'Product Innovation', description: 'Continuous R&D and product development', category: 'Innovation' },
    { title: 'Strategic Partnerships', description: 'Building alliances for market expansion', category: 'Partnerships' }
  ]
}

// Generate revenue based on market share
function generateRevenue(marketShare: number): { overall: number, segmental: number } {
  // Total market size approximately 450 USD Mn (base year 2025)
  const totalMarketSize = 450
  const segmentalRevenue = (marketShare / 100) * totalMarketSize
  
  // Overall revenue is typically 3-5x the segmental revenue (company has other products)
  const multiplier = 3 + Math.random() * 2
  const overallRevenue = segmentalRevenue * multiplier
  
  return {
    overall: Math.round(overallRevenue),
    segmental: Math.round(segmentalRevenue)
  }
}

/**
 * Generate competitive intelligence data for all companies
 * Now loads from store, JSON file, or fallback to hardcoded data
 * Can also accept parsed CSV data
 */
export async function generateCompetitiveData(csvData?: Record<string, any>[]): Promise<CompanyData[]> {
  // If CSV data is provided, parse it
  if (csvData && csvData.length > 0) {
    return parseCompetitiveIntelligenceFromData(csvData)
  }
  
  // Try to get data from store first (only in browser environment)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store for generateCompetitiveData')
        return parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }
  
  const jsonData = await loadCompetitiveIntelligenceData()
  
  if (jsonData && jsonData.companies) {
    return jsonData.companies
  }
  
  // Fallback to hardcoded data
  return companies.map(company => {
    const revenue = generateRevenue(marketShares[company])
    
    // Generate sample propositions based on company
    const propositions: Proposition[] = generatePropositions(company)
    
    return {
      id: company.toLowerCase().replace(/\s+/g, '-'),
      name: company,
      headquarters: headquarters[company],
      ceo: ceos[company],
      yearEstablished: yearEstablished[company],
      portfolio: portfolios[company],
      strategies: generateStrategies(company),
      regionalStrength: regionalStrengths[company],
      overallRevenue: revenue.overall,
      segmentalRevenue: revenue.segmental,
      marketShare: marketShares[company],
      propositions,
      color: companyColors[company]
    }
  })
}

/**
 * Generate market share data for pie chart
 * Now loads from JSON file, with fallback to hardcoded data
 * Groups smaller companies into "Others" to reduce clutter
 */
export async function generateMarketShareData(showTopN: number = 10): Promise<MarketShareData[]> {
  const jsonData = await loadCompetitiveIntelligenceData()
  
  let allData: MarketShareData[]
  
  if (jsonData && jsonData.market_share_data) {
    allData = jsonData.market_share_data
  } else {
    // Fallback to hardcoded data
    allData = companies.map(company => ({
      company,
      marketShare: marketShares[company],
      color: companyColors[company]
    }))
  }
  
  // Sort by market share (descending)
  const sorted = [...allData].sort((a, b) => b.marketShare - a.marketShare)
  
  // Take top N companies
  const topCompanies = sorted.slice(0, showTopN)
  
  // Group the rest into "Others"
  const othersShare = sorted.slice(showTopN).reduce((sum, c) => sum + c.marketShare, 0)
  
  if (othersShare > 0) {
    topCompanies.push({
      company: 'Others',
      marketShare: othersShare,
      color: '#94a3b8' // Gray color for Others
    })
  }
  
  return topCompanies
}

/**
 * Get top companies by market share
 */
export async function getTopCompanies(limit: number = 5): Promise<CompanyData[]> {
  const allCompanies = await generateCompetitiveData()
  return allCompanies
    .filter(c => c.name !== 'Others')
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, limit)
}

/**
 * Calculate market concentration (HHI - Herfindahl-Hirschman Index)
 */
export function calculateMarketConcentration(): { hhi: number; concentration: string } {
  const shares = Object.values(marketShares)
  const hhi = shares.reduce((sum, share) => sum + Math.pow(share, 2), 0)
  
  let concentration = 'Competitive'
  if (hhi < 1500) {
    concentration = 'Competitive'
  } else if (hhi < 2500) {
    concentration = 'Moderately Concentrated'
  } else {
    concentration = 'Highly Concentrated'
  }
  
  return { hhi: Math.round(hhi), concentration }
}

/**
 * Get company comparison data for competitive dashboard
 * Now includes propositions with parent/child header structure
 */
export async function getCompanyComparison(): Promise<{
  headers: string[];
  rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string; // Parent section header
    isProposition?: boolean; // Flag for proposition rows
  }[];
  sections?: string[]; // List of section headers
}> {
  const companies = (await generateCompetitiveData()).slice(0, 10) // Top 10 companies
  
  const headers = companies.map(c => c.name)
  
  // Find maximum number of propositions across all companies
  const maxPropositions = Math.max(
    ...companies.map(c => c.propositions?.length || 0),
    3 // Default to 3 if no propositions
  )
  
  const rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string;
    isProposition?: boolean;
  }[] = [
    {
      label: "Headquarters",
      values: companies.map(c => c.headquarters),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Key Management (CEO)",
      values: companies.map(c => c.ceo),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Year of Establishment",
      values: companies.map(c => c.yearEstablished || 'N/A'),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Product/Service Portfolio",
      values: companies.map(c => c.portfolio),
      section: "PRODUCT & SERVICES"
    },
    {
      label: "Strategies/Recent Developments",
      values: companies.map(c => c.strategies.join(', ')),
      section: "STRATEGY & DEVELOPMENT"
    },
    {
      label: "Regional Strength",
      values: companies.map(c => c.regionalStrength),
      section: "MARKET PRESENCE"
    },
    {
      label: "Overall Revenue (USD Mn)",
      values: companies.map(c => c.overallRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Segmental Revenue (USD Mn), 2024",
      values: companies.map(c => c.segmentalRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Market Share (%)",
      values: companies.map(c => c.marketShare.toFixed(1) + '%'),
      section: "FINANCIAL METRICS"
    }
  ]
  
  // Add proposition rows dynamically
  if (maxPropositions > 0) {
    for (let i = 0; i < maxPropositions; i++) {
      const propIndex = i + 1
      
      // Proposition Title row
      rows.push({
        label: `Proposition ${propIndex} - Title`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.title || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Description row
      rows.push({
        label: `Proposition ${propIndex} - Description`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.description || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Category row
      rows.push({
        label: `Proposition ${propIndex} - Category`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.category || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
    }
  }
  
  // Extract unique sections
  const sections = Array.from(new Set(rows.map(r => r.section).filter(Boolean))) as string[]
  
  return { headers, rows, sections }
}
