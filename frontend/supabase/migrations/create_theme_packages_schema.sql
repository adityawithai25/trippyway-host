-- ============================================================================
-- Theme-Based Travel Packages Database Schema
-- ============================================================================
-- Description: Comprehensive schema for theme-based travel packages with
-- multi-select filtering, day ranges, and flexible package management
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PACKAGE THEMES TABLE
-- ============================================================================
-- Stores different travel themes (Corporate, College, Influencer, etc.)

CREATE TABLE IF NOT EXISTS package_themes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT, -- Icon identifier (e.g., 'briefcase', 'graduation-cap')
  color TEXT, -- Hex color for UI theming
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for package_themes
CREATE INDEX IF NOT EXISTS idx_package_themes_slug ON package_themes(slug);
CREATE INDEX IF NOT EXISTS idx_package_themes_active ON package_themes(is_active);
CREATE INDEX IF NOT EXISTS idx_package_themes_display_order ON package_themes(display_order);

-- ============================================================================
-- 2. TRAVEL PACKAGES TABLE
-- ============================================================================
-- Main table for travel packages

CREATE TABLE IF NOT EXISTS travel_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  duration_nights INTEGER NOT NULL CHECK (duration_nights >= 0),
  start_date DATE, -- For fixed-date packages
  end_date DATE, -- For fixed-date packages
  price_per_person DECIMAL(10, 2) NOT NULL CHECK (price_per_person >= 0),
  original_price DECIMAL(10, 2) CHECK (original_price >= 0),
  currency TEXT DEFAULT 'INR',
  min_people INTEGER DEFAULT 1 CHECK (min_people > 0),
  max_people INTEGER CHECK (max_people >= min_people),
  spots_total INTEGER DEFAULT 0 CHECK (spots_total >= 0),
  spots_available INTEGER DEFAULT 0 CHECK (spots_available >= 0 AND spots_available <= spots_total),
  rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs with metadata
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  category TEXT, -- "Couples", "Girls Only", "Boys Only", "Mixed", "Family"
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

-- Indexes for travel_packages
CREATE INDEX IF NOT EXISTS idx_travel_packages_slug ON travel_packages(slug);
CREATE INDEX IF NOT EXISTS idx_travel_packages_location ON travel_packages(location);
CREATE INDEX IF NOT EXISTS idx_travel_packages_duration_days ON travel_packages(duration_days);
CREATE INDEX IF NOT EXISTS idx_travel_packages_price ON travel_packages(price_per_person);
CREATE INDEX IF NOT EXISTS idx_travel_packages_active ON travel_packages(is_active);
CREATE INDEX IF NOT EXISTS idx_travel_packages_featured ON travel_packages(is_featured);
CREATE INDEX IF NOT EXISTS idx_travel_packages_category ON travel_packages(category);
CREATE INDEX IF NOT EXISTS idx_travel_packages_rating ON travel_packages(rating);
CREATE INDEX IF NOT EXISTS idx_travel_packages_tags ON travel_packages USING GIN(tags);

-- ============================================================================
-- 3. PACKAGE THEME MAPPINGS TABLE
-- ============================================================================
-- Many-to-many relationship between packages and themes

CREATE TABLE IF NOT EXISTS package_theme_mappings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES package_themes(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(package_id, theme_id)
);

-- Indexes for package_theme_mappings
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_package ON package_theme_mappings(package_id);
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_theme ON package_theme_mappings(theme_id);
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_primary ON package_theme_mappings(is_primary);

-- ============================================================================
-- 4. PACKAGE ITINERARIES TABLE
-- ============================================================================
-- Detailed day-by-day itinerary for each package

CREATE TABLE IF NOT EXISTS package_itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL CHECK (day_number > 0),
  title TEXT NOT NULL,
  description TEXT,
  activities JSONB DEFAULT '[]'::jsonb, -- Array of activity objects
  meals_included TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['breakfast', 'lunch', 'dinner']
  accommodation_details TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(package_id, day_number)
);

-- Indexes for package_itineraries
CREATE INDEX IF NOT EXISTS idx_package_itineraries_package ON package_itineraries(package_id);
CREATE INDEX IF NOT EXISTS idx_package_itineraries_day ON package_itineraries(day_number);

-- ============================================================================
-- 5. PACKAGE INCLUSIONS TABLE
-- ============================================================================
-- What's included and excluded in each package

CREATE TABLE IF NOT EXISTS package_inclusions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('included', 'excluded')),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Icon identifier for UI
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for package_inclusions
CREATE INDEX IF NOT EXISTS idx_package_inclusions_package ON package_inclusions(package_id);
CREATE INDEX IF NOT EXISTS idx_package_inclusions_type ON package_inclusions(type);
CREATE INDEX IF NOT EXISTS idx_package_inclusions_order ON package_inclusions(display_order);

-- ============================================================================
-- TRIGGER FUNCTIONS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_package_themes_updated_at ON package_themes;
CREATE TRIGGER update_package_themes_updated_at
  BEFORE UPDATE ON package_themes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_travel_packages_updated_at ON travel_packages;
CREATE TRIGGER update_travel_packages_updated_at
  BEFORE UPDATE ON travel_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_package_itineraries_updated_at ON package_itineraries;
CREATE TRIGGER update_package_itineraries_updated_at
  BEFORE UPDATE ON package_itineraries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE package_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_theme_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;

-- Public read access for active themes
DROP POLICY IF EXISTS "Public can view active themes" ON package_themes;
CREATE POLICY "Public can view active themes"
  ON package_themes FOR SELECT
  USING (is_active = true);

-- Public read access for active packages
DROP POLICY IF EXISTS "Public can view active packages" ON travel_packages;
CREATE POLICY "Public can view active packages"
  ON travel_packages FOR SELECT
  USING (is_active = true);

-- Public read access for theme mappings (of active packages)
DROP POLICY IF EXISTS "Public can view theme mappings" ON package_theme_mappings;
CREATE POLICY "Public can view theme mappings"
  ON package_theme_mappings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM travel_packages
      WHERE travel_packages.id = package_theme_mappings.package_id
      AND travel_packages.is_active = true
    )
  );

-- Public read access for itineraries (of active packages)
DROP POLICY IF EXISTS "Public can view itineraries" ON package_itineraries;
CREATE POLICY "Public can view itineraries"
  ON package_itineraries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM travel_packages
      WHERE travel_packages.id = package_itineraries.package_id
      AND travel_packages.is_active = true
    )
  );

-- Public read access for inclusions (of active packages)
DROP POLICY IF EXISTS "Public can view inclusions" ON package_inclusions;
CREATE POLICY "Public can view inclusions"
  ON package_inclusions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM travel_packages
      WHERE travel_packages.id = package_inclusions.package_id
      AND travel_packages.is_active = true
    )
  );

-- ============================================================================
-- ADMIN POLICIES (Requires auth.users table with admin role)
-- ============================================================================
-- Note: Uncomment and adjust these when you have admin user management

-- Admin can manage themes
-- DROP POLICY IF EXISTS "Admins can manage themes" ON package_themes;
-- CREATE POLICY "Admins can manage themes"
--   ON package_themes FOR ALL
--   USING (
--     auth.uid() IN (
--       SELECT id FROM auth.users
--       WHERE raw_user_meta_data->>'role' = 'admin'
--     )
--   );

-- Admin can manage packages
-- DROP POLICY IF EXISTS "Admins can manage packages" ON travel_packages;
-- CREATE POLICY "Admins can manage packages"
--   ON travel_packages FOR ALL
--   USING (
--     auth.uid() IN (
--       SELECT id FROM auth.users
--       WHERE raw_user_meta_data->>'role' = 'admin'
--     )
--   );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get packages by themes with filtering
CREATE OR REPLACE FUNCTION get_packages_by_filters(
  theme_slugs TEXT[] DEFAULT NULL,
  min_days INTEGER DEFAULT NULL,
  max_days INTEGER DEFAULT NULL,
  min_price DECIMAL DEFAULT NULL,
  max_price DECIMAL DEFAULT NULL,
  package_category TEXT DEFAULT NULL,
  search_term TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  location TEXT,
  description TEXT,
  duration_days INTEGER,
  duration_nights INTEGER,
  start_date DATE,
  end_date DATE,
  price_per_person DECIMAL,
  original_price DECIMAL,
  currency TEXT,
  spots_available INTEGER,
  spots_total INTEGER,
  rating DECIMAL,
  review_count INTEGER,
  images JSONB,
  tags TEXT[],
  category TEXT,
  is_featured BOOLEAN,
  themes JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tp.id,
    tp.title,
    tp.slug,
    tp.location,
    tp.description,
    tp.duration_days,
    tp.duration_nights,
    tp.start_date,
    tp.end_date,
    tp.price_per_person,
    tp.original_price,
    tp.currency,
    tp.spots_available,
    tp.spots_total,
    tp.rating,
    tp.review_count,
    tp.images,
    tp.tags,
    tp.category,
    tp.is_featured,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', pt.id,
            'name', pt.name,
            'slug', pt.slug,
            'icon', pt.icon,
            'color', pt.color,
            'is_primary', ptm.is_primary
          )
        )
        FROM package_theme_mappings ptm
        JOIN package_themes pt ON pt.id = ptm.theme_id
        WHERE ptm.package_id = tp.id
      ),
      '[]'::jsonb
    ) as themes
  FROM travel_packages tp
  WHERE tp.is_active = true
    -- Theme filter (OR logic - package matches ANY selected theme)
    AND (
      theme_slugs IS NULL 
      OR EXISTS (
        SELECT 1 
        FROM package_theme_mappings ptm
        JOIN package_themes pt ON pt.id = ptm.theme_id
        WHERE ptm.package_id = tp.id 
        AND pt.slug = ANY(theme_slugs)
      )
    )
    -- Day range filter
    AND (min_days IS NULL OR tp.duration_days >= min_days)
    AND (max_days IS NULL OR tp.duration_days <= max_days)
    -- Price filter
    AND (min_price IS NULL OR tp.price_per_person >= min_price)
    AND (max_price IS NULL OR tp.price_per_person <= max_price)
    -- Category filter
    AND (package_category IS NULL OR tp.category = package_category)
    -- Search term (searches in title, location, description)
    AND (
      search_term IS NULL 
      OR tp.title ILIKE '%' || search_term || '%'
      OR tp.location ILIKE '%' || search_term || '%'
      OR tp.description ILIKE '%' || search_term || '%'
    )
  ORDER BY 
    tp.is_featured DESC,
    tp.rating DESC,
    tp.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get package details with all relations
CREATE OR REPLACE FUNCTION get_package_details(package_slug TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  location TEXT,
  description TEXT,
  duration_days INTEGER,
  duration_nights INTEGER,
  start_date DATE,
  end_date DATE,
  price_per_person DECIMAL,
  original_price DECIMAL,
  currency TEXT,
  min_people INTEGER,
  max_people INTEGER,
  spots_available INTEGER,
  spots_total INTEGER,
  rating DECIMAL,
  review_count INTEGER,
  images JSONB,
  tags TEXT[],
  category TEXT,
  is_featured BOOLEAN,
  metadata JSONB,
  themes JSONB,
  itinerary JSONB,
  inclusions JSONB,
  exclusions JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tp.id,
    tp.title,
    tp.slug,
    tp.location,
    tp.description,
    tp.duration_days,
    tp.duration_nights,
    tp.start_date,
    tp.end_date,
    tp.price_per_person,
    tp.original_price,
    tp.currency,
    tp.min_people,
    tp.max_people,
    tp.spots_available,
    tp.spots_total,
    tp.rating,
    tp.review_count,
    tp.images,
    tp.tags,
    tp.category,
    tp.is_featured,
    tp.metadata,
    -- Themes
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', pt.id,
            'name', pt.name,
            'slug', pt.slug,
            'icon', pt.icon,
            'color', pt.color,
            'is_primary', ptm.is_primary
          )
          ORDER BY ptm.is_primary DESC, pt.display_order
        )
        FROM package_theme_mappings ptm
        JOIN package_themes pt ON pt.id = ptm.theme_id
        WHERE ptm.package_id = tp.id
      ),
      '[]'::jsonb
    ) as themes,
    -- Itinerary
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', pi.id,
            'day_number', pi.day_number,
            'title', pi.title,
            'description', pi.description,
            'activities', pi.activities,
            'meals_included', pi.meals_included,
            'accommodation_details', pi.accommodation_details,
            'images', pi.images
          )
          ORDER BY pi.day_number
        )
        FROM package_itineraries pi
        WHERE pi.package_id = tp.id
      ),
      '[]'::jsonb
    ) as itinerary,
    -- Inclusions
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', pincl.id,
            'title', pincl.title,
            'description', pincl.description,
            'icon', pincl.icon
          )
          ORDER BY pincl.display_order
        )
        FROM package_inclusions pincl
        WHERE pincl.package_id = tp.id AND pincl.type = 'included'
      ),
      '[]'::jsonb
    ) as inclusions,
    -- Exclusions
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', pexcl.id,
            'title', pexcl.title,
            'description', pexcl.description,
            'icon', pexcl.icon
          )
          ORDER BY pexcl.display_order
        )
        FROM package_inclusions pexcl
        WHERE pexcl.package_id = tp.id AND pexcl.type = 'excluded'
      ),
      '[]'::jsonb
    ) as exclusions
  FROM travel_packages tp
  WHERE tp.slug = package_slug
    AND tp.is_active = true;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE package_themes IS 'Travel package themes (Corporate, College, Influencer, etc.)';
COMMENT ON TABLE travel_packages IS 'Main travel packages with pricing and availability';
COMMENT ON TABLE package_theme_mappings IS 'Many-to-many relationship between packages and themes';
COMMENT ON TABLE package_itineraries IS 'Day-by-day itinerary for each package';
COMMENT ON TABLE package_inclusions IS 'What is included and excluded in packages';

COMMENT ON FUNCTION get_packages_by_filters IS 'Get packages with multi-theme filtering, day ranges, and price filters';
COMMENT ON FUNCTION get_package_details IS 'Get complete package details with all relations';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================

