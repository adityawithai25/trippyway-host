-- ============================================================================
-- TRIPPYWAY COMPLETE DATABASE SETUP
-- ============================================================================
-- This script creates the complete database schema for the TrippyWay platform
-- Run this in Supabase SQL Editor to set up all tables, functions, and policies
-- 
-- Version: 1.0
-- Date: 2025-12-08
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE 1: PACKAGE THEMES
-- ============================================================================
-- Stores travel package themes (Corporate Retreat, College Trip, etc.)

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_package_themes_slug ON package_themes(slug);
CREATE INDEX IF NOT EXISTS idx_package_themes_active ON package_themes(is_active);
CREATE INDEX IF NOT EXISTS idx_package_themes_display_order ON package_themes(display_order);

-- Trigger
DROP TRIGGER IF EXISTS update_package_themes_updated_at ON package_themes;
CREATE TRIGGER update_package_themes_updated_at
  BEFORE UPDATE ON package_themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 2: TRAVEL PACKAGES
-- ============================================================================
-- Main table for travel packages with pricing, dates, and availability

CREATE TABLE IF NOT EXISTS travel_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  duration_nights INTEGER NOT NULL CHECK (duration_nights >= 0),
  start_date DATE,
  end_date DATE,
  price_per_person DECIMAL(10, 2) NOT NULL CHECK (price_per_person >= 0),
  original_price DECIMAL(10, 2) CHECK (original_price >= 0),
  currency TEXT DEFAULT 'INR',
  min_people INTEGER DEFAULT 1 CHECK (min_people > 0),
  max_people INTEGER CHECK (max_people >= min_people),
  spots_total INTEGER DEFAULT 0 CHECK (spots_total >= 0),
  spots_available INTEGER DEFAULT 0 CHECK (spots_available >= 0 AND spots_available <= spots_total),
  rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
  images JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  category TEXT CHECK (category IN ('Couples', 'Girls Only', 'Boys Only', 'Mixed', 'Family')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_travel_packages_slug ON travel_packages(slug);
CREATE INDEX IF NOT EXISTS idx_travel_packages_location ON travel_packages(location);
CREATE INDEX IF NOT EXISTS idx_travel_packages_duration_days ON travel_packages(duration_days);
CREATE INDEX IF NOT EXISTS idx_travel_packages_price ON travel_packages(price_per_person);
CREATE INDEX IF NOT EXISTS idx_travel_packages_active ON travel_packages(is_active);
CREATE INDEX IF NOT EXISTS idx_travel_packages_featured ON travel_packages(is_featured);
CREATE INDEX IF NOT EXISTS idx_travel_packages_category ON travel_packages(category);
CREATE INDEX IF NOT EXISTS idx_travel_packages_rating ON travel_packages(rating);
CREATE INDEX IF NOT EXISTS idx_travel_packages_tags ON travel_packages USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_travel_packages_search ON travel_packages USING GIN(to_tsvector('english', title || ' ' || COALESCE(location, '') || ' ' || COALESCE(description, '')));

-- Trigger
DROP TRIGGER IF EXISTS update_travel_packages_updated_at ON travel_packages;
CREATE TRIGGER update_travel_packages_updated_at
  BEFORE UPDATE ON travel_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 3: PACKAGE THEME MAPPINGS
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_package ON package_theme_mappings(package_id);
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_theme ON package_theme_mappings(theme_id);
CREATE INDEX IF NOT EXISTS idx_package_theme_mappings_primary ON package_theme_mappings(is_primary);

-- ============================================================================
-- TABLE 4: PACKAGE ITINERARIES
-- ============================================================================
-- Day-by-day itinerary for each package

CREATE TABLE IF NOT EXISTS package_itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL CHECK (day_number > 0),
  title TEXT NOT NULL,
  description TEXT,
  activities JSONB DEFAULT '[]'::jsonb,
  meals_included TEXT[] DEFAULT ARRAY[]::TEXT[],
  accommodation_details TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(package_id, day_number)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_package_itineraries_package ON package_itineraries(package_id);
CREATE INDEX IF NOT EXISTS idx_package_itineraries_day ON package_itineraries(day_number);

-- Trigger
DROP TRIGGER IF EXISTS update_package_itineraries_updated_at ON package_itineraries;
CREATE TRIGGER update_package_itineraries_updated_at
  BEFORE UPDATE ON package_itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 5: PACKAGE INCLUSIONS
-- ============================================================================
-- What's included and excluded in each package

CREATE TABLE IF NOT EXISTS package_inclusions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('included', 'excluded')),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_package_inclusions_package ON package_inclusions(package_id);
CREATE INDEX IF NOT EXISTS idx_package_inclusions_type ON package_inclusions(type);
CREATE INDEX IF NOT EXISTS idx_package_inclusions_order ON package_inclusions(display_order);

-- ============================================================================
-- TABLE 6: REVIEWS
-- ============================================================================
-- User reviews for packages

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  verified BOOLEAN NOT NULL DEFAULT false,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  review_comment TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  trip_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_trip_id ON reviews(trip_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(verified);
CREATE INDEX IF NOT EXISTS idx_reviews_stars ON reviews(stars);

-- Trigger
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 7: USER PREFERENCES
-- ============================================================================
-- Stores user preferences from onboarding quiz

CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  travel_type TEXT,
  travel_frequency TEXT,
  budget_comfort_range TEXT,
  activities JSONB DEFAULT '[]'::jsonb,
  destinations JSONB DEFAULT '[]'::jsonb,
  companions JSONB DEFAULT '[]'::jsonb,
  goals JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Trigger
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 8: PARTNER INFORMATION
-- ============================================================================
-- Partner applications for hotels, tour operators, etc.

CREATE TABLE IF NOT EXISTS partner_information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('hotel', 'homestay', 'resort', 'tour-operator', 'activity-provider', 'travel-agent')),
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  description TEXT,
  experience INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_partner_information_email ON partner_information(email);
CREATE INDEX IF NOT EXISTS idx_partner_information_status ON partner_information(status);
CREATE INDEX IF NOT EXISTS idx_partner_information_city ON partner_information(city);
CREATE INDEX IF NOT EXISTS idx_partner_information_business_type ON partner_information(business_type);

-- Trigger
DROP TRIGGER IF EXISTS update_partner_information_updated_at ON partner_information;
CREATE TRIGGER update_partner_information_updated_at
  BEFORE UPDATE ON partner_information
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 9: EMAIL SUBSCRIBER
-- ============================================================================
-- Newsletter email subscribers

CREATE TABLE IF NOT EXISTS email_subscriber (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_subscriber_email ON email_subscriber(email);
CREATE INDEX IF NOT EXISTS idx_email_subscriber_active ON email_subscriber(is_active);

-- ============================================================================
-- TABLE 10: FAVORITES (Fixed typo from 'favorrites')
-- ============================================================================
-- User wishlist/favorites

CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, trip_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_trip_id ON favorites(trip_id);

-- ============================================================================
-- TABLE 11: BOOKING ENQUIRIES (NEW)
-- ============================================================================
-- Stores booking requests before WhatsApp handoff

CREATE TABLE IF NOT EXISTS booking_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  package_id UUID REFERENCES travel_packages(id) ON DELETE SET NULL,
  package_slug TEXT NOT NULL,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Trip Details
  traveler_count INTEGER NOT NULL CHECK (traveler_count > 0),
  start_date DATE,
  end_date DATE,
  budget_range TEXT,
  
  -- Additional Information
  special_requests TEXT,
  how_heard_about_us TEXT,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  whatsapp_message_id TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  contacted_at TIMESTAMP WITH TIME ZONE,
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_user_id ON booking_enquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_package_id ON booking_enquiries(package_id);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_package_slug ON booking_enquiries(package_slug);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_status ON booking_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_email ON booking_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_created_at ON booking_enquiries(created_at DESC);

-- Trigger
DROP TRIGGER IF EXISTS update_booking_enquiries_updated_at ON booking_enquiries;
CREATE TRIGGER update_booking_enquiries_updated_at
  BEFORE UPDATE ON booking_enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE package_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_theme_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriber ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_enquiries ENABLE ROW LEVEL SECURITY;

-- Package Themes Policies
DROP POLICY IF EXISTS "Public can view active themes" ON package_themes;
CREATE POLICY "Public can view active themes"
  ON package_themes FOR SELECT
  USING (is_active = true);

-- Travel Packages Policies
DROP POLICY IF EXISTS "Public can view active packages" ON travel_packages;
CREATE POLICY "Public can view active packages"
  ON travel_packages FOR SELECT
  USING (is_active = true);

-- Package Theme Mappings Policies
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

-- Package Itineraries Policies
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

-- Package Inclusions Policies
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

-- Reviews Policies
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON reviews;
CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Unauthenticated users can insert reviews" ON reviews;
CREATE POLICY "Unauthenticated users can insert reviews"
  ON reviews FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL AND name IS NOT NULL AND verified = false);

-- User Preferences Policies
DROP POLICY IF EXISTS "Users can read their own preferences" ON user_preferences;
CREATE POLICY "Users can read their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own preferences" ON user_preferences;
CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON user_preferences;
CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own preferences" ON user_preferences;
CREATE POLICY "Users can delete their own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Partner Information Policies
DROP POLICY IF EXISTS "Public can submit partner applications" ON partner_information;
CREATE POLICY "Public can submit partner applications"
  ON partner_information FOR INSERT
  WITH CHECK (true);

-- Email Subscriber Policies
DROP POLICY IF EXISTS "Public can subscribe" ON email_subscriber;
CREATE POLICY "Public can subscribe"
  ON email_subscriber FOR INSERT
  WITH CHECK (true);

-- Favorites Policies
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add favorites" ON favorites;
CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Booking Enquiries Policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON booking_enquiries;
CREATE POLICY "Users can view their own bookings"
  ON booking_enquiries FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Anyone can submit booking enquiry" ON booking_enquiries;
CREATE POLICY "Anyone can submit booking enquiry"
  ON booking_enquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own bookings" ON booking_enquiries;
CREATE POLICY "Users can update their own bookings"
  ON booking_enquiries FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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
    AND (min_days IS NULL OR tp.duration_days >= min_days)
    AND (max_days IS NULL OR tp.duration_days <= max_days)
    AND (min_price IS NULL OR tp.price_per_person >= min_price)
    AND (max_price IS NULL OR tp.price_per_person <= max_price)
    AND (package_category IS NULL OR tp.category = package_category)
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

-- Function to get review count for a trip
CREATE OR REPLACE FUNCTION get_trip_review_count(trip_id_param TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM reviews
    WHERE trip_id = trip_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get average rating for a trip
CREATE OR REPLACE FUNCTION get_trip_avg_rating(trip_id_param TEXT)
RETURNS NUMERIC AS $$
BEGIN
  RETURN (
    SELECT COALESCE(AVG(stars), 0)::NUMERIC(3,2)
    FROM reviews
    WHERE trip_id = trip_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user booking history
CREATE OR REPLACE FUNCTION get_user_booking_history(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  package_slug TEXT,
  package_title TEXT,
  traveler_count INTEGER,
  start_date DATE,
  end_date DATE,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    be.id,
    be.package_slug,
    tp.title as package_title,
    be.traveler_count,
    be.start_date,
    be.end_date,
    be.status,
    be.created_at
  FROM booking_enquiries be
  LEFT JOIN travel_packages tp ON tp.slug = be.package_slug
  WHERE be.user_id = user_id_param
  ORDER BY be.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT SELECT ON reviews TO anon, authenticated;
GRANT INSERT ON reviews TO anon, authenticated;
GRANT UPDATE ON reviews TO authenticated;
GRANT DELETE ON reviews TO authenticated;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE package_themes IS 'Travel package themes (Corporate, College, Influencer, etc.)';
COMMENT ON TABLE travel_packages IS 'Main travel packages with pricing and availability';
COMMENT ON TABLE package_theme_mappings IS 'Many-to-many relationship between packages and themes';
COMMENT ON TABLE package_itineraries IS 'Day-by-day itinerary for each package';
COMMENT ON TABLE package_inclusions IS 'What is included and excluded in packages';
COMMENT ON TABLE reviews IS 'User reviews for packages';
COMMENT ON TABLE user_preferences IS 'User travel preferences from onboarding quiz';
COMMENT ON TABLE partner_information IS 'Partner applications from hotels, tour operators, etc.';
COMMENT ON TABLE email_subscriber IS 'Newsletter email subscribers';
COMMENT ON TABLE favorites IS 'User favorites/wishlist';
COMMENT ON TABLE booking_enquiries IS 'Booking requests before WhatsApp handoff';

COMMENT ON FUNCTION get_packages_by_filters IS 'Get packages with multi-theme filtering, day ranges, and price filters';
COMMENT ON FUNCTION get_package_details IS 'Get complete package details with all relations';
COMMENT ON FUNCTION get_trip_review_count IS 'Get total review count for a specific trip';
COMMENT ON FUNCTION get_trip_avg_rating IS 'Get average star rating for a specific trip';
COMMENT ON FUNCTION get_user_booking_history IS 'Get all booking enquiries for a specific user';

-- ============================================================================
-- SETUP COMPLETE
-- ============================================================================
-- Run the verification queries below to confirm everything is set up correctly
-- ============================================================================

-- Verify all tables exist
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Verify RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Count policies per table
-- SELECT tablename, COUNT(*) as policy_count FROM pg_policies WHERE schemaname = 'public' GROUP BY tablename ORDER BY tablename;
