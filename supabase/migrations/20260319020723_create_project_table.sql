-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For geospatial queries

-- =====================================================
-- MAIN PROJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  name VARCHAR(255) NOT NULL,
  marketing_name VARCHAR(255) NOT NULL,
  developer VARCHAR(255) NOT NULL,

  -- Address (embedded)
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  neighborhood VARCHAR(100),
  borough VARCHAR(100),
  tax_lot_block VARCHAR(50),
  tax_lot_lot VARCHAR(50),
  location GEOMETRY(POINT, 4326), -- PostGIS for geospatial queries

  -- Building Details
  total_units INTEGER, -- Updated by trigger
  units_sold INTEGER, -- Updated by trigger
  units_available INTEGER, -- Updated by trigger
  total_floors INTEGER,
  year_built INTEGER,
  architect VARCHAR(255),
  building_class VARCHAR(50) CHECK (building_class IN ('Luxury', 'Mid-Market', 'Affordable')),
  building_type VARCHAR(50) CHECK (building_type IN ('Condo', 'Co-op', 'Rental', 'Mixed-Use')),
  zoning VARCHAR(100),

  -- Status & Timeline
  status VARCHAR(50) NOT NULL DEFAULT 'Planning' CHECK (status IN (
    'Planning', 'Approved', 'Active Sales', 'Sales Paused', 
    'Sold Out', 'Delivered', 'Closed'
  )),
  -- Timeline (stored as JSONB for flexibility)
  timeline JSONB, -- Structure: { projectLaunched, constructionStarted, tcoExpected, etc. }
  
  -- Pricing Information
  price_min DECIMAL(12, 2),
  price_max DECIMAL(12, 2),
  average_price_per_sqft DECIMAL(10, 2),
  pricing_strategy VARCHAR(50) CHECK (pricing_strategy IN ('Fixed', 'Market-Based', 'Tiered')),
  last_price_update TIMESTAMPTZ,
  incentives TEXT[], -- Array of incentive strings
  financing_options TEXT[], -- Array of financing option strings

  -- Tax Incentives
  has_421a BOOLEAN DEFAULT false,
  tax_abatement_expiration DATE,
  has_485x BOOLEAN DEFAULT false,
  affordable_housing_units INTEGER,
  affordable_housing_percentage DECIMAL(5, 2),

  -- Amenities (stored as JSONB)
  amenities JSONB, -- Structure: { buildingAmenities: [...], unitFeatures: [...] }

  -- Marketing
  website VARCHAR(512),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  deleted_at TIMESTAMPTZ
);

-- =====================================================
-- RELATED TABLES
-- =====================================================

-- Phases Table
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  phase_number INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN (
    'Pre-Launch', 'Pre-Construction', 'Under Construction', 
    'Nearing Completion', 'TCO Received', 'Move-In Ready', 
    'Sell-Out', 'Completed'
  )),
  
  start_date DATE,
  expected_completion_date DATE,
  total_units INTEGER NOT NULL,
  sold_units INTEGER DEFAULT 0,
  available_units INTEGER,
  currently_selling BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT uq_project_phase_number UNIQUE (project_id, phase_number)
);

-- INVENTORY
-- Units Table (one-to-many with projects, optional link to phases)
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id) ON DELETE SET NULL,
  
  -- Unit identification
  unit_number VARCHAR(50) NOT NULL,
  -- unit_type VARCHAR(50) NOT NULL, -- "Studio", "1BR", "2BR", "3BR", "Penthouse"
  unit_type VARCHAR(50) NOT NULL DEFAULT '1BR' CHECK (unit_type IN (
    'Studio', '1BR', '2BR', '3BR', 'Penthouse'
  )),
  floor INTEGER,
  layout_line VARCHAR(10), -- "A", "B", "C" (layout line)
  
  -- Physical details
  bedrooms DECIMAL(3,1), -- 2.5 for 2BR+Den
  bathrooms DECIMAL(3,1), -- 2.5 bathrooms
  sqft INTEGER NOT NULL,
  outdoor_space_sqft INTEGER, -- Balcony, terrace
  exposure VARCHAR(50), -- "North", "South-West", "City View"
  
  -- Pricing
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2), -- Track if discounted
  price_per_sqft DECIMAL(10, 2) GENERATED ALWAYS AS (price / sqft) STORED,
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'Not Released' CHECK (status IN (
    'Not Released',    -- Not yet on market
    'Available',       -- Ready to sell
    'In Contract',     -- Under contract
    'Sold',           -- Closed
    'On Hold',        -- Temporarily unavailable
    'Sponsor Owned'   -- Developer keeping
  )),
  
  -- Features
  features JSONB, -- {"hasBalcony": true, "hasView": true, "corner": true}
  appliances TEXT[], -- ["Miele", "Sub-Zero", "Bosch"]
  flooring VARCHAR(100), -- "Hardwood", "Marble"
    
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT uq_project_unit_number UNIQUE (project_id, unit_number)
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Core search indexes
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_borough ON projects(borough) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_neighborhood ON projects(neighborhood) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_building_type ON projects(building_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_building_class ON projects(building_class) WHERE deleted_at IS NULL;

-- Price range searches
CREATE INDEX idx_projects_price_range ON projects(price_min, price_max) WHERE deleted_at IS NULL;

-- Date-based queries
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_updated_at ON projects(updated_at DESC);

-- Inventory searches
CREATE INDEX idx_projects_units_available ON projects(units_available) 
  WHERE units_available > 0 AND deleted_at IS NULL;

-- Full-text search
CREATE INDEX idx_projects_search ON projects USING GIN(
  to_tsvector('english', 
    COALESCE(name, '') || ' ' || 
    COALESCE(marketing_name, '') || ' ' ||
    COALESCE(developer, '') || ' ' ||
    COALESCE(neighborhood, '') || ' ' ||
    COALESCE(borough, '')
  )
) WHERE deleted_at IS NULL;

-- Geospatial index (PostGIS)
CREATE INDEX idx_projects_location ON projects USING GIST(location) WHERE deleted_at IS NULL;

-- JSONB indexes
CREATE INDEX idx_projects_amenities ON projects USING GIN(amenities) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_timeline ON projects USING GIN(timeline) WHERE deleted_at IS NULL;

-- Composite indexes for common queries
CREATE INDEX idx_projects_status_borough ON projects(status, borough) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_borough_price ON projects(borough, price_min, price_max) WHERE deleted_at IS NULL;

-- Related tables indexes
CREATE INDEX idx_phases_project_id ON phases(project_id);
CREATE INDEX idx_phases_status ON phases(status);

-- Inventory indexes
CREATE INDEX idx_units_project_id ON units(project_id);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_type ON units(unit_type);
CREATE INDEX idx_units_price ON units(price);
CREATE INDEX idx_units_bedrooms ON units(bedrooms);
CREATE INDEX idx_units_sqft ON units(sqft);
CREATE INDEX idx_units_features ON units USING GIN(features);

-- Composite indexes for common queries
CREATE INDEX idx_units_project_status ON units(project_id, status);
CREATE INDEX idx_units_type_status ON units(unit_type, status) WHERE status = 'Available';

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phases_updated_at
  BEFORE UPDATE ON phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to keep projects.total_units in sync
CREATE OR REPLACE FUNCTION update_project_unit_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE projects SET
    total_units = (SELECT COUNT(*) FROM units WHERE project_id = COALESCE(NEW.project_id, OLD.project_id)),
    units_sold = (SELECT COUNT(*) FROM units WHERE project_id = COALESCE(NEW.project_id, OLD.project_id) AND status = 'Sold'),
    units_available = (SELECT COUNT(*) FROM units WHERE project_id = COALESCE(NEW.project_id, OLD.project_id) AND status = 'Available')
  WHERE id = COALESCE(NEW.project_id, OLD.project_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_counts
AFTER INSERT OR UPDATE OR DELETE ON units
FOR EACH ROW
EXECUTE FUNCTION update_project_unit_counts();

