CREATE TYPE project_status AS ENUM (
  'Planning',
  'Approved',
  'Active Sales',
  'Sales Paused',
  'Sold Out',
  'Delivered',
  'Closed'
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  marketing_name VARCHAR(255) NOT NULL,
  developer VARCHAR(255) NOT NULL,
  status project_status NOT NULL DEFAULT 'Planning',
  website VARCHAR(512),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);