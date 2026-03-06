'use client'

import { useState } from 'react'

interface OEMData {
  // OEM Information
  oemManufacturerName: string
  hqCountry: string
  primaryDoorTypeFocus: string
  automationFocus: string
  materialFocus: string
  keyEndUseFocus: string
  // Channel & Support
  goToMarketChannels: string
  serviceAftermarketStrength: string
  typicalPositioning: string
  keyDistributorIntegratorApproach: string
  // CMI Insights
  keyInsights: string
}

interface DistributorData {
  // Partner Profile
  distributorName: string
  parentGroupHoldingCompany: string
  hqCountry: string
  countriesCovered: string
  keyOEMBrandsCarried: string
  channelType: string
  keyDoorTypesCovered: string
  automationCapability: string
  endUseFocus: string
  // Contact Details
  keyContactPerson: string
  designation: string
  email: string
  phoneWhatsApp: string
  linkedIn: string
  website: string
  // Fit & Opportunity
  competitiveStrengths: string
  gapsWeaknesses: string
}

// Meat Mixer OEM Data
const oemData: OEMData[] = [
  {
    oemManufacturerName: 'Hobart',
    hqCountry: 'USA',
    primaryDoorTypeFocus: 'Commercial Meat Mixers, Grinders, Processing Equipment',
    automationFocus: 'Full Automation, PLC Controls',
    materialFocus: 'Stainless Steel, Heavy-Duty Construction',
    keyEndUseFocus: 'Meat Processing, Foodservice, Industrial Kitchens',
    goToMarketChannels: 'Direct Sales, Authorized Dealers, Distributors',
    serviceAftermarketStrength: 'Strong - Nationwide Service Network',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Exclusive Distributors, Direct Key Accounts',
    keyInsights: 'Market leader with 15% share, strongest brand recognition in Americas'
  },
  {
    oemManufacturerName: 'Middleby Corporation',
    hqCountry: 'USA',
    primaryDoorTypeFocus: 'Industrial Meat Mixers, Blenders, Processing Lines',
    automationFocus: 'Advanced Automation, IoT-enabled',
    materialFocus: 'Stainless Steel, Food-grade Alloys',
    keyEndUseFocus: 'Industrial Processing, QSR Chains, Institutional',
    goToMarketChannels: 'Direct Sales, Channel Partners, OEM Bundling',
    serviceAftermarketStrength: 'Strong - Multi-brand Service Platform',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Multi-brand Distributors, Turnkey Solutions',
    keyInsights: '12% market share, aggressive acquisition strategy expanding portfolio'
  },
  {
    oemManufacturerName: 'Sirman SpA',
    hqCountry: 'Italy',
    primaryDoorTypeFocus: 'Commercial Meat Mixers, Mincers, Tenderizers',
    automationFocus: 'Semi to Full Automation',
    materialFocus: 'Stainless Steel, Italian Engineering',
    keyEndUseFocus: 'Butcher Shops, Restaurants, Delis',
    goToMarketChannels: 'Distributor Network, Export Partners',
    serviceAftermarketStrength: 'Moderate - Regional Service Partners',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Regional Distributors, Import Partners',
    keyInsights: '8% share, strong European heritage driving MEA expansion'
  },
  {
    oemManufacturerName: 'Minerva Omega Group',
    hqCountry: 'Italy',
    primaryDoorTypeFocus: 'Meat Mixers, Grinders, Slicers, Sausage Stuffers',
    automationFocus: 'Semi Automation, Modular Design',
    materialFocus: 'Stainless Steel, Cast Iron Components',
    keyEndUseFocus: 'SME Meat Processors, Retail Butcheries',
    goToMarketChannels: 'Authorized Dealers, Export Network',
    serviceAftermarketStrength: 'Moderate - Dealer-dependent',
    typicalPositioning: 'Mid',
    keyDistributorIntegratorApproach: 'Multi-tier Distribution, Regional Dealers',
    keyInsights: '7% share, broad product range appealing to mid-market segment'
  },
  {
    oemManufacturerName: 'Dadaux',
    hqCountry: 'France',
    primaryDoorTypeFocus: 'Meat Mixers, Grinders, Bowl Cutters',
    automationFocus: 'Full Automation, Programmable',
    materialFocus: 'Stainless Steel, Precision Engineering',
    keyEndUseFocus: 'Industrial Meat Processing, Charcuterie',
    goToMarketChannels: 'Direct Sales, Specialized Dealers',
    serviceAftermarketStrength: 'Strong - Factory-trained Technicians',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Exclusive Distributors, Direct Sales',
    keyInsights: '6% share, French engineering precision valued in premium segment'
  },
  {
    oemManufacturerName: 'Nemco Food Equipment',
    hqCountry: 'USA',
    primaryDoorTypeFocus: 'Countertop Mixers, Prep Equipment, Slicers',
    automationFocus: 'Semi Automation',
    materialFocus: 'Stainless Steel, Compact Design',
    keyEndUseFocus: 'Restaurants, Small Processors, Catering',
    goToMarketChannels: 'Foodservice Distributors, Online Channels',
    serviceAftermarketStrength: 'Moderate - Warranty Programs',
    typicalPositioning: 'Value to Mid',
    keyDistributorIntegratorApproach: 'Foodservice Distributors, E-commerce',
    keyInsights: '5% share, strong in value segment with compact solutions'
  },
  {
    oemManufacturerName: 'Lakidis',
    hqCountry: 'Greece',
    primaryDoorTypeFocus: 'Industrial Meat Mixers, Vacuum Mixers, Tumblers',
    automationFocus: 'Full Automation, Vacuum Technology',
    materialFocus: 'Stainless Steel, Heavy-gauge Construction',
    keyEndUseFocus: 'Large-scale Meat Processing, Export Facilities',
    goToMarketChannels: 'Direct Sales, Agent Network',
    serviceAftermarketStrength: 'Moderate - Regional Coverage',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Agent Network, Project-based Sales',
    keyInsights: '4% share, vacuum mixing technology differentiation'
  },
  {
    oemManufacturerName: 'IOZZELLI',
    hqCountry: 'Italy',
    primaryDoorTypeFocus: 'Meat Mixers, Kneaders, Processing Machines',
    automationFocus: 'Semi to Full Automation',
    materialFocus: 'Stainless Steel, Robust Construction',
    keyEndUseFocus: 'Artisan Processors, Butcher Shops',
    goToMarketChannels: 'Dealer Network, Export Partners',
    serviceAftermarketStrength: 'Limited - Dealer-dependent',
    typicalPositioning: 'Mid',
    keyDistributorIntegratorApproach: 'Regional Dealers, Import Partners',
    keyInsights: '3% share, niche player in artisan segment with Italian craftsmanship'
  }
,
  {
    oemManufacturerName: 'SKYMSEN',
    hqCountry: 'Brazil',
    primaryDoorTypeFocus: 'Meat Mixers, Grinders, Slicers, Food Processing Equipment',
    automationFocus: 'Semi Automation, Mechanized',
    materialFocus: 'Stainless Steel, Local Grade Materials',
    keyEndUseFocus: 'Butcher Shops, Supermarkets, Small Processors',
    goToMarketChannels: 'Dealer Network, Latin America Export Partners',
    serviceAftermarketStrength: 'Moderate - Dealer-dependent, Local Coverage',
    typicalPositioning: 'Value to Mid',
    keyDistributorIntegratorApproach: 'Latin America Distributors, Retail Partners',
    keyInsights: '3% share, dominant in Latin America value segment with cost-competitive solutions'
  },
  {
    oemManufacturerName: 'Ram Beef Equipment LLC',
    hqCountry: 'South Africa',
    primaryDoorTypeFocus: 'Beef Mixers, Mincing Equipment, Butchery Machines',
    automationFocus: 'Manual to Semi Automation',
    materialFocus: 'Stainless Steel, Food-grade Materials',
    keyEndUseFocus: 'Butcheries, Small Meat Processors, Retail Butchers',
    goToMarketChannels: 'Direct Sales, Regional Agents',
    serviceAftermarketStrength: 'Limited - Direct Service',
    typicalPositioning: 'Value',
    keyDistributorIntegratorApproach: 'Direct Sales, MEA Agents',
    keyInsights: 'MEA-focused niche player specializing in beef processing for the African butchery market'
  },
  {
    oemManufacturerName: 'Roser Food Equipment',
    hqCountry: 'Spain',
    primaryDoorTypeFocus: 'Meat Mixers, Marinators, Food Processing Machinery',
    automationFocus: 'Semi to Full Automation',
    materialFocus: 'Stainless Steel, European Food-grade Standards',
    keyEndUseFocus: 'Meat Processing, Charcuterie, Industrial Food Plants',
    goToMarketChannels: 'Distributor Network, Export Partners',
    serviceAftermarketStrength: 'Moderate - European Service Network',
    typicalPositioning: 'Mid',
    keyDistributorIntegratorApproach: 'European and Latin America Distributors',
    keyInsights: 'European OEM expanding into MEA via distributor network; specializes in marinating and mixing integration'
  }
]

// Meat Mixer Distributor Data
const distributorData: DistributorData[] = [
  {
    distributorName: 'TriMark USA',
    parentGroupHoldingCompany: 'TriMark Group',
    hqCountry: 'USA',
    countriesCovered: 'USA, Canada',
    keyOEMBrandsCarried: 'Hobart, Middleby, Globe',
    channelType: 'Full-line Foodservice Distributor',
    keyDoorTypesCovered: 'Meat Mixers, Grinders, Processing Equipment',
    automationCapability: 'Full Range',
    endUseFocus: 'Restaurants, Hotels, Institutional Kitchens',
    keyContactPerson: 'David Reynolds',
    designation: 'VP - Equipment Sales',
    email: 'd.reynolds@trimarkusa.com',
    phoneWhatsApp: '+1 202 555 1001',
    linkedIn: 'linkedin.com/in/davidreynolds-trimark',
    website: 'www.trimarkusa.com',
    competitiveStrengths: 'Largest US foodservice distributor, Full design & install',
    gapsWeaknesses: 'Limited MEA coverage'
  },
  {
    distributorName: 'Hess Meat Machines',
    parentGroupHoldingCompany: 'Hess Group',
    hqCountry: 'USA',
    countriesCovered: 'USA, Latin America',
    keyOEMBrandsCarried: 'Hobart, Sirman, Dadaux, Lakidis',
    channelType: 'Specialized Equipment Dealer',
    keyDoorTypesCovered: 'Industrial Meat Mixers, Vacuum Mixers, Bowl Cutters',
    automationCapability: 'Full Automation',
    endUseFocus: 'Industrial Meat Processing, Custom Blending',
    keyContactPerson: 'Carlos Martinez',
    designation: 'Director of Sales',
    email: 'carlos@hessmeatmachines.com',
    phoneWhatsApp: '+1 312 555 2002',
    linkedIn: 'linkedin.com/in/carlosmartinez-hess',
    website: 'www.hessmeatmachines.com',
    competitiveStrengths: 'Deep meat processing expertise, Technical support',
    gapsWeaknesses: 'Smaller company, limited service footprint'
  },
  {
    distributorName: 'Procurand Food Equipment',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'Brazil',
    countriesCovered: 'Brazil, Argentina, Chile, Colombia',
    keyOEMBrandsCarried: 'SKYMSEN, Minerva Omega, Sirman',
    channelType: 'Regional Distributor',
    keyDoorTypesCovered: 'Meat Mixers, Grinders, Slicers',
    automationCapability: 'Semi to Full',
    endUseFocus: 'Meat Processors, Supermarkets, Butcheries',
    keyContactPerson: 'Ana Lucia Ferreira',
    designation: 'General Manager',
    email: 'ana@procurand.com.br',
    phoneWhatsApp: '+55 11 5555 3003',
    linkedIn: 'linkedin.com/in/analuciaferreira',
    website: 'www.procurand.com.br',
    competitiveStrengths: 'Strong LatAm network, Local language support',
    gapsWeaknesses: 'No North American or MEA presence'
  },
  {
    distributorName: 'Gulf Food Equipment Trading',
    parentGroupHoldingCompany: 'Al Futtaim Group',
    hqCountry: 'UAE',
    countriesCovered: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait',
    keyOEMBrandsCarried: 'Hobart, Middleby, Dadaux',
    channelType: 'Authorized Regional Distributor',
    keyDoorTypesCovered: 'Commercial Meat Mixers, Industrial Processing Lines',
    automationCapability: 'Full Automation',
    endUseFocus: 'Hotels, Catering, Industrial Meat Processing',
    keyContactPerson: 'Ahmed Al-Rashidi',
    designation: 'Commercial Director',
    email: 'ahmed@gulfoodequip.ae',
    phoneWhatsApp: '+971 50 555 4004',
    linkedIn: 'linkedin.com/in/ahmedalrashidi',
    website: 'www.gulffoodequipment.ae',
    competitiveStrengths: 'GCC market expertise, Strong relationships with hospitality sector',
    gapsWeaknesses: 'Limited coverage outside GCC'
  },
  {
    distributorName: 'Afrifood Machinery',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'South Africa',
    countriesCovered: 'South Africa, Kenya, Nigeria, Ghana',
    keyOEMBrandsCarried: 'Minerva Omega, IOZZELLI, Local brands',
    channelType: 'Multi-brand Dealer',
    keyDoorTypesCovered: 'Meat Mixers, Mincers, Sausage Fillers',
    automationCapability: 'Semi Automation',
    endUseFocus: 'Butcheries, Small Processors, Retail',
    keyContactPerson: 'James Okonkwo',
    designation: 'Managing Director',
    email: 'james@afrifoodmachinery.co.za',
    phoneWhatsApp: '+27 82 555 5005',
    linkedIn: 'linkedin.com/in/jamesokonkwo-afm',
    website: 'www.afrifoodmachinery.co.za',
    competitiveStrengths: 'Pan-African logistics, Value segment expertise',
    gapsWeaknesses: 'Limited premium brand access, Service network gaps'
  },
  {
    distributorName: 'ProFood Solutions Mexico',
    parentGroupHoldingCompany: 'ProFood Group',
    hqCountry: 'Mexico',
    countriesCovered: 'Mexico, Central America',
    keyOEMBrandsCarried: 'Hobart, Nemco, SKYMSEN',
    channelType: 'Exclusive Distributor',
    keyDoorTypesCovered: 'Meat Mixers, Grinders, Prep Equipment',
    automationCapability: 'Semi to Full',
    endUseFocus: 'Meat Processors, Restaurant Chains, Supermarkets',
    keyContactPerson: 'Roberto Sanchez',
    designation: 'Sales Director',
    email: 'roberto@profoodsolutions.mx',
    phoneWhatsApp: '+52 55 5555 6006',
    linkedIn: 'linkedin.com/in/robertosanchez-pfs',
    website: 'www.profoodsolutions.mx',
    competitiveStrengths: 'Strong Mexico market presence, Growing Central America network',
    gapsWeaknesses: 'No South American coverage'
  }
]

interface CompetitiveIntelligenceProps {
  height?: number
}

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [activeTable, setActiveTable] = useState<'oem' | 'distributor'>('oem')

  const renderOEMTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              OEM Information
            </th>
            <th colSpan={4} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Channel & Support
            </th>
            <th colSpan={1} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* OEM Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              OEM / Manufacturer Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Primary Product Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Automation Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Material Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key End-use Focus
            </th>
            {/* Channel & Support */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Go-to-Market Channels
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Service / Aftermarket Strength
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Typical Positioning</div>
              <div className="font-normal text-[10px] text-gray-600">(Value/Mid/Premium)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Distributor/Integrator Approach
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Insights
            </th>
          </tr>
        </thead>
        <tbody>
          {oemData.map((oem, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* OEM Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{oem.oemManufacturerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.primaryDoorTypeFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.automationFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.materialFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyEndUseFocus}</td>
              {/* Channel & Support */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.goToMarketChannels}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.serviceAftermarketStrength}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.typicalPositioning}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyDistributorIntegratorApproach}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyInsights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDistributorTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={9} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Partner Profile
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={2} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Fit & Opportunity
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Partner Profile */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Distributor / Channel Partner Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Parent Group / Holding Company
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Countries Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key OEM Brands Carried
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Channel Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Retailers/EPC Contractor/Others)</div>
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Key Product Types Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Automation Capability
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              End-use Focus
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Key Contact Person
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Designation / Department
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Email
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Phone / WhatsApp
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              LinkedIn
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Website
            </th>
            {/* Fit & Opportunity */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Competitive Strengths
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Gaps / Weaknesses
            </th>
          </tr>
        </thead>
        <tbody>
          {distributorData.map((distributor, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Partner Profile */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{distributor.distributorName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.countriesCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyOEMBrandsCarried}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.channelType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyDoorTypesCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.automationCapability}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.endUseFocus}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${distributor.email}`}>{distributor.email}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.phoneWhatsApp}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.linkedIn}`} target="_blank" rel="noopener noreferrer">{distributor.linkedIn}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.website}`} target="_blank" rel="noopener noreferrer">{distributor.website}</a>
              </td>
              {/* Fit & Opportunity */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.competitiveStrengths}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.gapsWeaknesses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-4">
        {activeTable === 'oem' ? 'OEM Intelligence' : 'Distributor Intelligence'}
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTable('oem')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTable === 'oem'
              ? 'bg-[#4A90A4] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          OEM Intelligence
        </button>
        <button
          onClick={() => setActiveTable('distributor')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTable === 'distributor'
              ? 'bg-[#4A90A4] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Distributor Intelligence
        </button>
      </div>

      {/* Render Active Table */}
      {activeTable === 'oem' ? renderOEMTable() : renderDistributorTable()}
    </div>
  )
}

export default CompetitiveIntelligence
