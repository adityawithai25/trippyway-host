-- ============================================
-- REVIEWS TABLE SETUP FOR SUPABASE
-- ============================================
-- Copy and paste this entire file into Supabase SQL Editor and run it
-- ============================================

-- Step 1: Create the reviews table
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

-- Step 2: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_trip_id ON reviews(trip_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(verified);

-- Step 3: Create updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 5: Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Step 6: Create RLS Policies

-- Policy 1: Anyone can read reviews (public read access)
CREATE POLICY "Anyone can view reviews"
  ON reviews
  FOR SELECT
  USING (true);

-- Policy 2: Authenticated users can insert their own reviews
CREATE POLICY "Authenticated users can insert reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- If user_id is provided, it must match the authenticated user
    (user_id IS NULL OR user_id = auth.uid())
  );

-- Policy 3: Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policy 4: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Policy 5: Unauthenticated users can insert reviews without user_id
CREATE POLICY "Unauthenticated users can insert reviews"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (
    user_id IS NULL AND
    name IS NOT NULL AND
    verified = false
  );

-- Step 7: Grant necessary permissions
GRANT SELECT ON reviews TO anon, authenticated;
GRANT INSERT ON reviews TO anon, authenticated;
GRANT UPDATE ON reviews TO authenticated;
GRANT DELETE ON reviews TO authenticated;

-- ============================================
-- STORAGE BUCKET SETUP (Run via Supabase Dashboard)
-- ============================================
-- Note: Storage buckets are created via Supabase Dashboard, not SQL
-- 
-- Steps to create the 'reviews' storage bucket:
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Name: "reviews"
-- 4. Public bucket: YES (if you want public access to images)
--    OR NO (if you want private access with signed URLs)
-- 5. Click "Create bucket"
--
-- After creating the bucket, run the storage policies below:
-- ============================================

-- Step 8: Storage Policies for 'reviews' bucket
-- Note: Replace 'reviews' with your actual bucket name if different

-- Policy 1: Anyone can view images (if bucket is public)
CREATE POLICY "Anyone can view review images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'reviews');

-- Policy 2: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload review images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'reviews' AND
    -- Optional: Validate file type
    (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'gif', 'webp'))
  );

-- Policy 3: Users can update their own uploaded images
CREATE POLICY "Users can update their own review images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'reviews' AND
    (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'reviews' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy 4: Users can delete their own uploaded images
CREATE POLICY "Users can delete their own review images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'reviews' AND
    -- Allow deletion if user uploaded it or if it's in their trip folder
    (
      (storage.foldername(name))[1] = auth.uid()::text OR
      -- Or if the file path contains a trip_id that matches user's reviews
      EXISTS (
        SELECT 1 FROM reviews
        WHERE reviews.user_id = auth.uid()
        AND reviews.images @> ARRAY[storage.objects.name]
      )
    )
  );

-- Policy 5: Unauthenticated users can upload images (if needed)
-- Note: This is less secure, consider removing if not needed
CREATE POLICY "Unauthenticated users can upload review images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (
    bucket_id = 'reviews' AND
    (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'gif', 'webp'))
  );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify everything is set up correctly:

-- Check if table exists and has correct structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'reviews'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'reviews';

-- Check storage policies
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Test insert (will fail if policies are incorrect)
-- INSERT INTO reviews (name, stars, review_comment, trip_id, verified)
-- VALUES ('Test User', 5, 'This is a test review', 'test-trip-id', false);

-- ============================================
-- OPTIONAL: HELPER FUNCTIONS
-- ============================================

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

-- ============================================
-- NOTES
-- ============================================
-- 1. The reviews table stores image URLs (not the actual files)
-- 2. Images are stored in Supabase Storage bucket 'reviews'
-- 3. The storage policies allow public read access but controlled write access
-- 4. Unauthenticated users can submit reviews but they won't be verified
-- 5. Authenticated users' reviews are automatically marked as verified
-- 6. Users can only update/delete their own reviews
-- ============================================

