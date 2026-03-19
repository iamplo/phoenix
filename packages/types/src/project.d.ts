export interface Project {
  // Core Info -------------------------
  id: string;
  name: string;
  developer: string;
  address: Address;

  // Status & Timeline ------------------
  status: ProjectStatus;
  phases: Phase[];
  timeline: Timeline;

  // Details -------------------------
  buildingDetails: BuildingDetails;
  unitMix: UnitType[];
  amenities: {
    building: Amenity[];
    units: Amenity[];
  };

  // Financial ------------------------
  pricing: PricingInfo;
  taxIncentives: TaxInfo;
  costs: CostBreakdown;

  //Marketing --------------------------
  media: MediaAsset[];
  documents: Document[];
  website?: string;
  marketingName: string;

  //Sales ------------------------------
  inventory: InventoryStats;

  // Contacts --------------------------
  team: Contact[];
  // salesOffice: Location;

  // Requirements ----------------------
  purchasingRequirements: Requirements;
  brokerInfo: BrokerInfo;

  // Metadata --------------------------
  createdAt: Date;
  updatedAt: Date;
  // lastSyncedAt: Date;
  // notes: Note[]
}

interface Phase {
  id: string;
  name: string;
  phaseNumber: number;
  status: PhaseStatus;
  startDate: Date;
  expectedCompletionDate: Date;
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  currentlySelling: boolean;
}

export interface Timeline {
  projectLaunched?: Date;
  constructionStarted?: Date;
  tcoExpected?: Date;
  tcoReceived?: Date;
  coExpected?: Date;
  coReceived?: Date;
  firstClosing?: Date;
  finalClosing?: Date;
  projectCompletion?: Date;
  // milestones: [];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  borough: string;
  taxLot: {
    block: string;
    lot: string;
  };
}

export interface BuildingDetails {
  totalUnits: number;
  totalFloors: string;
  yearBuilt: string;
  architect: string;
  buildingClass: "Luxury" | "Mid-Market" | "Affordable";
  buildingType: "Condo" | "Co-op" | "Rental" | "Mixed-Use";
  zoning: string;
}

interface UnitType {
  type: string;
  count: number;
  priceRange: {
    min: number;
    max: number;
  };
  sqftRange?: {
    min: number;
    max: number;
  };
}

interface InventoryStats {
  totalUnits: number;
  soldUnits: number;
  unitsInContract: number;
  availableUnits: number;
  unitsOnHold: number;
  releasedForSale: number;
  notYetReleased: number;
  sponsorOwned: number;
}

interface CostBreakdown {
  commonChargesPerSqft: number;
  realEstateTaxPerSqft: number;
  flipTaxPercentage?: number;
  monthlyAssessment?: number;
  closingCostPercentage: {
    min: number;
    max: number;
  };
}

interface PricingInfo {
  priceRange: {
    min: number;
    max: number;
  };
  averagePricePerSqft: number;
  pricingStrategy: "Fixed" | "Market-Based" | "Tiered";
  lastPriceUpdate: Date;
  incentives: string[];
  financingOptions: string[];
}

interface TaxInfo {
  has421a: boolean;
  taxAbatementExpiration?: Date;
  has485x: boolean;
  affordableHousingUnits?: number;
  affordableHousingPercentage?: number;
}

interface Contact {
  id: string;
  role: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface BrokerInfo {
  coBroker: boolean;
  commissionPercentage: number;
  commisoinPaidAt: "Contract" | "Closing";
  registraionRequired: boolean;
  exclusiveBroker?: string;
}

interface Requirements {
  minimumDownPayment: number;
  boardApprovalRequired: boolean;
  financingContingency: boolean;
  petPolicy: string;
  sublettingPolicy: string;
  piedTerreAllowed: boolean;
  foreignBuyersAllowed: boolean;
  llcPurchasesAllowed: boolean;
  llcRestrictions?: string;
}

interface Amenity {
  id: string;
  name: string;
  category: string;
  included: boolean;
  monthlyCost?: number;
  description?: string;
}

type ProjectStatus =
  | "Planning"
  | "Approved"
  | "Active Sales"
  | "Sales Paused"
  | "Sold Out"
  | "Delivered"
  | "Closed";

type PhaseStatus =
  | "Pre-Launch"
  | "Pre-Construction"
  | "Under Construction"
  | "Nearing Completion"
  | "TCO RReceived"
  | "Move-In Ready"
  | "Sell-Out"
  | "Completed";

interface MediaAsset {
  id: string;
  projectId: string;
  type: MediaType;
  category: MediaCategory;
  url: string;
  title?: string;
  description?: string;
  altText?: string;
  uploadedAt: Date;
  uploadedBy: string;
  updatedAt: Date;
  displayOrder: number;
}

type MediaType = "Image" | "Video" | "Document" | "VirtualTour" | "3DModel";

type MediaCategory =
  | "Exterior Rendering"
  | "Interior Rendering"
  | "Floor Plan"
  | "Actual Photo"
  | "Drone Footage"
  | "Walkthrough Video"
  | "Virtual Tour"
  | "Offering Plan"
  | "Brochure"
  | "Fact Sheet"
  | "Pricing Sheet"
  | "Purchase Application";

interface Document {
  id: string;
  projectId: string;
  type: DocumentType;
  title: string;
  description?: string;
  fileName: string;
  originalFileName: string;
  uploadedAt: Date;
  uploadedBy: string;
  updatedAt: Date;
  displayOrder: number;
}

type DocumentType =
  | "Offering Plan"
  | "Floor Plan"
  | "Amendment"
  | "Marketing Brochure"
  | "Fact Sheet"
  | "Pricing Sheet"
  | "Purchase Application"
  | "Disclosure"
  | "Financial Statement"
  | "Certificate"
  | "Legal Document"
  | "Internal Memo"
  | "Compliance";

  