# Quick Database Setup - MANUAL STEPS REQUIRED

## The automated scripts are having dependency issues. Please follow these manual steps:

### Step 1: Run SQL in Supabase Dashboard

1. **Open your Supabase Project Dashboard**: https://app.supabase.com
2. **Go to SQL Editor** (left sidebar)
3. **Copy the entire SQL file**: `frontend/supabase/migrations/00_complete_database_setup.sql`
4. **Paste into SQL Editor and Click "RUN"**

This will create all 11 tables and set up the database.

### Step 2: Seed Theme Data

After Step 1 completes, run this SQL in the same SQL Editor:

```sql
INSERT INTO package_themes (name, slug, description, icon, color, display_order, is_active, metadata) VALUES
('Corporate Retreat', 'corporate-retreat', 'Team building and workshops', 'briefcase', '#3B82F6', 0, true, '{"default_tags": ["Team Building", "Professional"]}'),
('College Trip', 'college-trip', 'Budget-friendly student adventures', 'graduation-cap', '#10B981', 1, true, '{"default_tags": ["Budget Friendly", "Student Special"]}'),
('Influencer Trip', 'influencer-trip', 'Instagram-worthy locations', 'camera', '#EC4899', 2, true, '{"default_tags": ["Instagram Worthy", "Photo Ops"]}'),
('Designer & Editor Trip', 'designer-editor-trip', 'Creative inspiration', 'palette', '#8B5CF6', 3, true, '{"default_tags": ["Creative", "Aesthetic"]}'),
('AI Startup Enthusiast', 'ai-startup-enthusiast', 'Tech hubs and innovation', 'zap', '#F59E0B', 4, true, '{"default_tags": ["Tech Hub", "Innovation"]}'),
('Wellness Retreat', 'wellness-retreat', 'Yoga and meditation', 'heart', '#14B8A6', 5, true, '{"default_tags": ["Wellness", "Yoga"]}'),
('Adventure Sports', 'adventure-sports', 'Thrilling activities', 'mountain', '#EF4444', 6, true, '{"default_tags": ["Adventure", "Extreme"]}'),
('Cultural Exploration', 'cultural-exploration', 'Local culture and history', 'compass', '#F97316', 7, true, '{"default_tags": ["Culture", "Heritage"]}'),
('Family Vacation', 'family-vacation', 'Family-friendly destinations', 'users', '#06B6D4', 8, true, '{"default_tags": ["Family Friendly", "All Ages"]}'),
('Luxury Experience', 'luxury-experience', 'Premium stays', 'sparkles', '#A855F7', 9, true, '{"default_tags": ["Luxury", "Premium"]}')
ON CONFLICT (slug) DO NOTHING;
```

### Step 3: Verify Tables

In Supabase Dashboard, go to **Table Editor** and verify you see these 11 tables:
- ✅ package_themes (should have 10 rows)
- ✅ travel_packages
- ✅ package_theme_mappings
- ✅ package_itineraries
- ✅ package_inclusions
- ✅ reviews
- ✅ user_preferences
- ✅ partner_information
- ✅ email_subscriber
- ✅ favorites
- ✅ booking_enquiries

### Step 4: Add Sample Packages (Copy seed-sample-data.ts logic)

Run this INSERT query to add 8 sample packages:

```sql
-- Get theme IDs first
DO $$
DECLARE
  corporate_id UUID;
  college_id UUID;
  influencer_id UUID;
  wellness_id UUID;
  adventure_id UUID;
  family_id UUID;
  luxury_id UUID;
  ai_id UUID;
BEGIN
  -- Get theme IDs
  SELECT id INTO corporate_id FROM package_themes WHERE slug = 'corporate-retreat';
  SELECT id INTO college_id FROM package_themes WHERE slug = 'college-trip';
  SELECT id INTO influencer_id FROM package_themes WHERE slug = 'influencer-trip';
  SELECT id INTO wellness_id FROM package_themes WHERE slug = 'wellness-retreat';
  SELECT id INTO adventure_id FROM package_themes WHERE slug = 'adventure-sports';
  SELECT id INTO family_id FROM package_themes WHERE slug = 'family-vacation';
  SELECT id INTO luxury_id FROM package_themes WHERE slug = 'luxury-experience';
  SELECT id INTO ai_id FROM package_themes WHERE slug = 'ai-startup-enthusiast';

  -- Insert packages
  INSERT INTO travel_packages (title, slug, location, description, duration_days, duration_nights, start_date, end_date, price_per_person, original_price, currency, min_people, max_people, spots_total, spots_available, rating, review_count, images, tags, is_active, is_featured, category, metadata) VALUES
  ('Corporate Leadership Retreat - Manali', 'corporate-leadership-retreat-manali', 'Manali, Himachal Pradesh', 'A transformative 4-day corporate retreat', 4, 3, '2025-02-15', '2025-02-18', 18999, 24999, 'INR', 15, 50, 50, 28, 4.8, 42, '[{"url": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}]'::jsonb, ARRAY['Team Building', 'Professional'], true, true, 'Mixed', '{}'::jsonb),
  ('College Adventure Trek - Rishikesh', 'college-adventure-trek-rishikesh', 'Rishikesh, Uttarakhand', 'Action-packed 3-day college trip', 3, 2, '2025-03-10', '2025-03-12', 3999, 5499, 'INR', 10, 40, 40, 12, 4.9, 156, '[{"url": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"}]'::jsonb, ARRAY['Budget Friendly', 'Adventure'], true, true, 'Mixed', '{}'::jsonb),
  ('Yoga & Wellness Retreat - Rishikesh', 'yoga-wellness-retreat-rishikesh', 'Rishikesh, Uttarakhand', 'Rejuvenate your mind and body', 6, 5, '2025-05-01', '2025-05-06', 19999, 26999, 'INR', 8, 20, 20, 15, 5.0, 124, '[{"url": "https://images.unsplash.com/photo-1545389336-cf090694435e"}]'::jsonb, ARRAY['Wellness', 'Yoga'], true, true, 'Mixed', '{}'::jsonb),
  ('Adventure Sports - Leh Ladakh', 'adventure-sports-expedition-leh-ladakh', 'Leh Ladakh', 'Ultimate adventure expedition', 10, 9, '2025-06-10', '2025-06-19', 42999, 54999, 'INR', 10, 25, 25, 20, 4.8, 78, '[{"url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}]'::jsonb, ARRAY['Adventure', 'Extreme'], true, true, 'Mixed', '{}'::jsonb),
  ('Family Beach Vacation - Andaman', 'family-beach-vacation-andaman', 'Port Blair, Andaman', 'Perfect family getaway', 7, 6, '2025-08-01', '2025-08-07', 38999, 48999, 'INR', 4, 20, 20, 12, 4.9, 145, '[{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19"}]'::jsonb, ARRAY['Family Friendly'], true, true, 'Family', '{}'::jsonb),
  ('Luxury Couples Retreat - Kerala', 'luxury-couples-retreat-kerala', 'Alleppey & Munnar, Kerala', 'Exclusive romantic escape', 5, 4, '2025-09-10', '2025-09-14', 45999, 59999, 'INR', 2, 10, 10, 3, 5.0, 87, '[{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07"}]'::jsonb, ARRAY['Luxury', 'Premium'], true, true, 'Couples', '{}'::jsonb);
  
END $$;
```

### Step 5: Test

Run your dev server:
```bash
npm run dev
```

Visit: http://localhost:3000/packages

You should see the packages page with working filters!

---

**Why manual?** The TypeScript automation scripts need additional dependencies that weren't installed. Manual SQL execution in Supabase Dashboard is the most reliable method.
