'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerData {
  // Customer Information
  sNo: number
  customerPlantOrganizationName: string
  parentGroupHoldingCompany: string
  country: string
  cityIndustrialCluster: string
  endUseIndustry: string
  facilityType: string
  // Product/Equipment Information
  primaryDoorType: string
  automationLevel: string
  material: string
  installedIndustrialDoorBase: string
  // Contact Details
  keyContactPerson: string
  designation: string
  emailAddress: string
  phoneNumber: string
  linkedInProfile: string
  websiteUrl: string
  // Needs & Pain Points
  primaryNeedFocus: string
  keyProductNeeds: string
  keyServiceNeeds: string
  // Purchasing Behaviour (for Proposition 3)
  decisionMakers: string
  currentSupplierSetup: string
  currentMaintenanceModel: string
  // Opportunity & Project Status (for Proposition 3)
  priorityLevel: string
  expectedOpportunitySize: string
  plannedProjects: string
  // CMI Insights (for Proposition 3)
  customerBenchmarkingSummary: string
}

// Sample data for Meat Mixer Market
const sampleCustomerData: CustomerData[] = [
  {
    sNo: 1,
    customerPlantOrganizationName: 'Tyson Foods - Springdale Plant',
    parentGroupHoldingCompany: 'Tyson Foods Inc.',
    country: 'USA',
    cityIndustrialCluster: 'Springdale, Arkansas',
    endUseIndustry: 'Meat Processing',
    facilityType: 'Industrial Processing Plant',
    primaryDoorType: 'Industrial Meat Mixers, Vacuum Mixers',
    automationLevel: 'Fully Automated',
    material: 'Stainless Steel, Heavy-Duty',
    installedIndustrialDoorBase: '25 mixers / 500-2000 lb capacity',
    keyContactPerson: 'Michael Anderson',
    designation: 'VP - Plant Operations',
    emailAddress: 'm.anderson@tysonfoods.com',
    phoneNumber: '+1 479 555 1234',
    linkedInProfile: 'linkedin.com/in/michaelanderson-tyson',
    websiteUrl: 'www.tysonfoods.com',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'High-capacity mixers, vacuum blenders, automation controls',
    keyServiceNeeds: 'Preventive maintenance, spare parts, calibration',
    decisionMakers: 'VP Operations, Maintenance Director, Procurement',
    currentSupplierSetup: 'OEM / Multi-vendor',
    currentMaintenanceModel: 'In-house with OEM support',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Large ($500K+)',
    plannedProjects: 'Capacity expansion, Automation upgrade',
    customerBenchmarkingSummary: 'High potential - Strategic account, largest US processor'
  },
  {
    sNo: 2,
    customerPlantOrganizationName: 'JBS USA - Greeley Facility',
    parentGroupHoldingCompany: 'JBS S.A.',
    country: 'USA',
    cityIndustrialCluster: 'Greeley, Colorado',
    endUseIndustry: 'Beef & Pork Processing',
    facilityType: 'Large-Scale Processing Plant',
    primaryDoorType: 'Industrial Paddle Mixers, Ribbon Blenders',
    automationLevel: 'Fully Automated',
    material: 'Stainless Steel 304/316',
    installedIndustrialDoorBase: '40 mixers / 200-3000 lb capacity',
    keyContactPerson: 'Carlos Oliveira',
    designation: 'Plant Manager',
    emailAddress: 'c.oliveira@jbsusa.com',
    phoneNumber: '+1 970 555 2345',
    linkedInProfile: 'linkedin.com/in/carlosoliveira-jbs',
    websiteUrl: 'www.jbsusa.com',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Paddle mixers, grinder-mixer combos, sanitary fittings',
    keyServiceNeeds: 'Installation, maintenance contracts, emergency repair',
    decisionMakers: 'Plant Manager, Engineering Manager, Central Procurement',
    currentSupplierSetup: 'OEM / Preferred vendors',
    currentMaintenanceModel: 'Mixed',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Large ($750K+)',
    plannedProjects: 'New production line, Equipment modernization',
    customerBenchmarkingSummary: 'High potential - Global player with large fleet'
  },
  {
    sNo: 3,
    customerPlantOrganizationName: 'BRF S.A. - Chapeco Plant',
    parentGroupHoldingCompany: 'BRF S.A.',
    country: 'Brazil',
    cityIndustrialCluster: 'Chapeco, Santa Catarina',
    endUseIndustry: 'Poultry & Processed Meats',
    facilityType: 'Processing & Export Facility',
    primaryDoorType: 'Vacuum Mixers, Tumbling Machines',
    automationLevel: 'Fully Automated',
    material: 'Stainless Steel, Food-Grade',
    installedIndustrialDoorBase: '30 mixers / 300-1500 kg capacity',
    keyContactPerson: 'Ana Paula Santos',
    designation: 'Production Director',
    emailAddress: 'a.santos@bfrsa.com',
    phoneNumber: '+55 49 5555 3456',
    linkedInProfile: 'linkedin.com/in/anapaulasantos-brf',
    websiteUrl: 'www.bfrsa.com',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'Vacuum mixers, tumblers, marinating equipment',
    keyServiceNeeds: 'Maintenance, spare parts, technical training',
    decisionMakers: 'Production Director, Engineering Head, Procurement',
    currentSupplierSetup: 'OEM / Regional dealers',
    currentMaintenanceModel: 'In-house',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Large ($400K+)',
    plannedProjects: 'Halal line expansion, Export capacity upgrade',
    customerBenchmarkingSummary: 'High potential - Major LatAm processor'
  },
  {
    sNo: 4,
    customerPlantOrganizationName: 'Al Kabeer Group - Jebel Ali',
    parentGroupHoldingCompany: 'Al Kabeer Group',
    country: 'UAE',
    cityIndustrialCluster: 'Jebel Ali Free Zone, Dubai',
    endUseIndustry: 'Halal Meat Processing',
    facilityType: 'Halal Processing Facility',
    primaryDoorType: 'Commercial Meat Mixers, Bowl Cutters',
    automationLevel: 'Semi-Automated',
    material: 'Stainless Steel',
    installedIndustrialDoorBase: '15 mixers / 100-800 kg capacity',
    keyContactPerson: 'Ahmed Al-Maktoum',
    designation: 'Operations Manager',
    emailAddress: 'a.maktoum@alkabeer.com',
    phoneNumber: '+971 4 555 4567',
    linkedInProfile: 'linkedin.com/in/ahmedalmaktoum-akb',
    websiteUrl: 'www.alkabeer.com',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Halal-certified mixers, grinders, portion control',
    keyServiceNeeds: 'Installation, halal compliance audit, maintenance',
    decisionMakers: 'Operations Manager, Quality Assurance, Procurement',
    currentSupplierSetup: 'Multi-vendor / Importers',
    currentMaintenanceModel: 'Outsourced',
    priorityLevel: 'Medium',
    expectedOpportunitySize: 'Medium ($150-300K)',
    plannedProjects: 'Capacity expansion, GCC market entry',
    customerBenchmarkingSummary: 'High potential - Growing MEA player'
  },
  {
    sNo: 5,
    customerPlantOrganizationName: 'Tiger Brands - Johannesburg',
    parentGroupHoldingCompany: 'Tiger Brands Limited',
    country: 'South Africa',
    cityIndustrialCluster: 'Germiston Industrial Area',
    endUseIndustry: 'Processed Meats & Sausages',
    facilityType: 'Processing Plant',
    primaryDoorType: 'Paddle Mixers, Sausage Stuffers',
    automationLevel: 'Semi-Automated',
    material: 'Stainless Steel, Cast Iron',
    installedIndustrialDoorBase: '12 mixers / 50-500 kg capacity',
    keyContactPerson: 'James Mokoena',
    designation: 'Technical Manager',
    emailAddress: 'j.mokoena@tigerbrands.co.za',
    phoneNumber: '+27 11 555 5678',
    linkedInProfile: 'linkedin.com/in/jamesmokoena-tiger',
    websiteUrl: 'www.tigerbrands.com',
    primaryNeedFocus: 'Services',
    keyProductNeeds: 'Replacement mixers, upgrade to automated models',
    keyServiceNeeds: 'Maintenance, repair, spare parts supply',
    decisionMakers: 'Technical Manager, Factory Manager, Procurement',
    currentSupplierSetup: 'Dealers / Importers',
    currentMaintenanceModel: 'Outsourced',
    priorityLevel: 'Medium',
    expectedOpportunitySize: 'Medium ($100-250K)',
    plannedProjects: 'Equipment modernization, Safety compliance',
    customerBenchmarkingSummary: 'High potential - Leading African processor'
  }
]

interface PrepositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Preposition({ title, isOpen, onToggle, children }: PrepositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-2 pb-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openPreposition, setOpenPreposition] = useState<number | null>(1)

  const togglePreposition = (num: number) => {
    setOpenPreposition(openPreposition === num ? null : num)
  }

  // Preposition 1 Table - Customer Information + Contact Details
  const renderPreposition1Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[60px]">
              S.No.
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Customer / Plant / Organization Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Parent Group / Holding Company
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              City / Industrial Cluster
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              End-use Industry
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Facility Type
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Designation / Department</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[140px]">Phone/ WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Website URL</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">{customer.sNo}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerPlantOrganizationName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.country}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.cityIndustrialCluster}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.endUseIndustry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.facilityType}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 2 Table - Customer Information + Contact Details + Needs & Pain Points
  const renderPreposition2Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Needs & Pain Points
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[60px]">S.No.</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">Customer / Plant / Organization Name</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">Parent Group / Holding Company</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">Country</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">City / Industrial Cluster</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">End-use Industry</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">Facility Type</th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Designation / Department</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[140px]">Phone/ WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Website URL</th>
            {/* Needs & Pain Points */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Primary Need Focus</div>
              <div className="font-normal text-[10px] text-gray-600">(Products / Services / Both)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Key Product Needs</div>
              <div className="font-normal text-[10px] text-gray-600">(doors, automation, safety, insulation, seals, etc.)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Service Needs</div>
              <div className="font-normal text-[10px] text-gray-600">(installation, maintenance, AMC, repair, retrofit, etc.)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">{customer.sNo}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerPlantOrganizationName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.country}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.cityIndustrialCluster}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.endUseIndustry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.facilityType}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              {/* Needs & Pain Points */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryNeedFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyProductNeeds}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyServiceNeeds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 3 Table - Customer Information + Contact Details + Needs & Pain Points + Purchasing Behaviour + Opportunity & Project Status + CMI Insights
  const renderPreposition3Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Needs & Pain Points
            </th>
            <th colSpan={3} className="bg-[#9370DB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-white">
              Purchasing Behaviour
            </th>
            <th colSpan={3} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Opportunity & Project Status
            </th>
            <th colSpan={1} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[60px]">S.No.</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">Customer / Plant / Organization Name</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">Parent Group / Holding Company</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">Country</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">City / Industrial Cluster</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">End-use Industry</th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">Facility Type</th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Designation / Department</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[140px]">Phone/ WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[150px]">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap min-w-[130px]">Website URL</th>
            {/* Needs & Pain Points */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Primary Need Focus</div>
              <div className="font-normal text-[10px] text-gray-600">(Products / Services / Both)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Key Product Needs</div>
              <div className="font-normal text-[10px] text-gray-600">(doors, automation, safety, insulation, seals, etc.)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Service Needs</div>
              <div className="font-normal text-[10px] text-gray-600">(installation, maintenance, AMC, repair, retrofit, etc.)</div>
            </th>
            {/* Purchasing Behaviour */}
            <th className="bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Decision Makers</div>
              <div className="font-normal text-[10px] text-gray-600">(facility manager, maintenance head, procurement, etc.)</div>
            </th>
            <th className="bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Current Supplier Setup</div>
              <div className="font-normal text-[10px] text-gray-600">(OEM / dealers / EPC / multi-vendor / in-house)</div>
            </th>
            <th className="bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Current Maintenance Model</div>
              <div className="font-normal text-[10px] text-gray-600">(in-house / outsourced / mixed)</div>
            </th>
            {/* Opportunity & Project Status */}
            <th className="bg-[#DEB887] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Priority Level for Door Upgrade / Service</div>
              <div className="font-normal text-[10px] text-gray-600">(Low / Medium / High)</div>
            </th>
            <th className="bg-[#DEB887] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Expected Opportunity Size</div>
              <div className="font-normal text-[10px] text-gray-600">(small / medium / large; or spend range)</div>
            </th>
            <th className="bg-[#DEB887] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Planned Projects / Triggers</div>
              <div className="font-normal text-[10px] text-gray-600">(expansion, retrofit, compliance, automation)</div>
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Customer Benchmarking Summary</div>
              <div className="font-normal text-[10px] text-gray-600">(Potential Customers / Peer Group)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">{customer.sNo}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerPlantOrganizationName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.country}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.cityIndustrialCluster}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.endUseIndustry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.facilityType}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              {/* Needs & Pain Points */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryNeedFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyProductNeeds}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyServiceNeeds}</td>
              {/* Purchasing Behaviour */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.decisionMakers}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.currentSupplierSetup}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.currentMaintenanceModel}</td>
              {/* Opportunity & Project Status */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.priorityLevel}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.expectedOpportunitySize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.plannedProjects}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerBenchmarkingSummary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-6">Customer Intelligence Database</h2>

      <Preposition
        title="Proposition 1 - Basic"
        isOpen={openPreposition === 1}
        onToggle={() => togglePreposition(1)}
      >
        {renderPreposition1Table()}
      </Preposition>

      <Preposition
        title="Proposition 2 - Advanced"
        isOpen={openPreposition === 2}
        onToggle={() => togglePreposition(2)}
      >
        {renderPreposition2Table()}
      </Preposition>

      <Preposition
        title="Proposition 3 - Premium"
        isOpen={openPreposition === 3}
        onToggle={() => togglePreposition(3)}
      >
        {renderPreposition3Table()}
      </Preposition>
    </div>
  )
}
