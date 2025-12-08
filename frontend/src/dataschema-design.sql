-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 1. User Preferences Table
-- ==========================================

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

-- Indices
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);


-- ==========================================
-- 2. Partner Information Table
-- ==========================================

CREATE TABLE IF NOT EXISTS partner_information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  description TEXT,
  experience INTEGER, -- Stores years of experience
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_partner_information_email ON partner_information(email);
CREATE INDEX IF NOT EXISTS idx_partner_information_status ON partner_information(status);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_partner_information_updated_at ON partner_information;
CREATE TRIGGER update_partner_information_updated_at
  BEFORE UPDATE ON partner_information
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for partner_information
ALTER TABLE partner_information ENABLE ROW LEVEL SECURITY;

-- Allow public/anon users to submit applications
CREATE POLICY "Public can submit partner applications"
  ON partner_information FOR INSERT
  WITH CHECK (true);

-- Only admins (or service role) can view applications
-- Assuming no specific admin role setup yet, restricting to service_role mostly.
-- If you have an admin role: USING (auth.jwt() ->> 'role' = 'admin')
CREATE POLICY "Admins can view partner applications"
  ON partner_information FOR SELECT
  USING (
    -- Example: Allow service role (which bypasses RLS anyway) or specific admin checks
    -- For now, strictly service_role or if we implement admin logic later.
    -- Often 'service_role' key usage bypasses RLS, so this is for authenticated 'admin' users.
    -- Placeholder: 
    false 
  );

-- ==========================================
-- 3. Email Subscriber Table
-- ==========================================

CREATE TABLE IF NOT EXISTS email_subscriber (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_email_subscriber_email ON email_subscriber(email);

-- RLS Policies for email_subscriber
ALTER TABLE email_subscriber ENABLE ROW LEVEL SECURITY;

-- Allow public/anon users to subscribe
CREATE POLICY "Public can subscribe"
  ON email_subscriber FOR INSERT
  WITH CHECK (true);

-- Prevent duplicates via RLS? No, constraint handles that. 
-- But we might want to allow upsert if needed, or just fail.

-- Only admins can view subscribers
CREATE POLICY "Admins can view subscribers"
  ON email_subscriber FOR SELECT
  USING (false); 
  -- Again, assuming service_role usage for admin dashboard for now.

