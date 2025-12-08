-- ============================================================================
-- SEED TRAVEL PACKAGES DATA
-- ============================================================================
-- Run this SQL in Supabase Dashboard SQL Editor to populate sample packages
-- This bypasses RLS since you're running as admin
-- ============================================================================

-- Insert 10 sample travel packages
INSERT INTO travel_packages (
  title, slug, location, description, duration_days, duration_nights,
  start_date, end_date, price_per_person, original_price, currency,
  min_people, max_people, spots_total, spots_available,
  rating, review_count, images, tags, is_active, is_featured, category, metadata
) VALUES
(
  'Corporate Leadership Retreat - Manali',
  'corporate-leadership-retreat-manali',
  'Manali, Himachal Pradesh',
  'A transformative 4-day corporate retreat designed to enhance team collaboration and leadership skills. Includes strategic workshops, team-building activities, and networking sessions in the serene Himalayan mountains.',
  4, 3,
  '2025-02-15', '2025-02-18',
  18999, 24999, 'INR',
  15, 50, 50, 28,
  4.8, 42,
  '[{"url": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}]'::jsonb,
  ARRAY['Team Building', 'Professional', 'Mountains'],
  true, true, 'Mixed', '{}'::jsonb
),
(
  'College Adventure Trek - Rishikesh',
  'college-adventure-trek-rishikesh',
  'Rishikesh, Uttarakhand',
  'Action-packed 3-day college trip with river rafting, bungee jumping, camping, and bonfire nights. Perfect for students seeking adventure on a budget!',
  3, 2,
  '2025-03-10', '2025-03-12',
  3999, 5499, 'INR',
  10, 40, 40, 12,
  4.9, 156,
  '[{"url": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"}]'::jsonb,
  ARRAY['Budget Friendly', 'Adventure', 'Student Special'],
  true, true, 'Mixed', '{}'::jsonb
),
(
  'Instagram Influencer Retreat - Jaipur',
  'instagram-influencer-retreat-jaipur',
  'Jaipur, Rajasthan',
  'Curated 5-day retreat at the most photogenic locations in the Pink City. Professional photoshoots, content creation workshops, and networking with fellow creators.',
  5, 4,
  '2025-04-05', '2025-04-09',
  24999, 32999, 'INR',
  8, 20, 20, 5,
  4.7, 89,
  '[{"url": "https://images.unsplash.com/photo-1599661046289-e31897846e41"}]'::jsonb,
  ARRAY['Instagram Worthy', 'Photo Ops', 'Content Creation'],
  true, true, 'Mixed', '{}'::jsonb
),
(
  'Yoga & Wellness Retreat - Rishikesh',
  'yoga-wellness-retreat-rishikesh',
  'Rishikesh, Uttarakhand',
  'Rejuvenate your mind, body, and soul with daily yoga sessions, meditation workshops, Ayurvedic spa treatments, and organic meals by the Ganges.',
  6, 5,
  '2025-05-01', '2025-05-06',
  19999, 26999, 'INR',
  8, 20, 20, 15,
  5.0, 124,
  '[{"url": "https://images.unsplash.com/photo-1545389336-cf090694435e"}]'::jsonb,
  ARRAY['Wellness', 'Yoga', 'Meditation'],
  true, true, 'Mixed', '{}'::jsonb
),
(
  'Adventure Sports Expedition - Leh Ladakh',
  'adventure-sports-expedition-leh-ladakh',
  'Leh Ladakh',
  'Ultimate 10-day adventure expedition featuring trekking, mountain biking, river crossing, and camping under the stars in the world''s highest motorable passes.',
  10, 9,
  '2025-06-10', '2025-06-19',
  42999, 54999, 'INR',
  10, 25, 25, 20,
  4.8, 78,
  '[{"url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}]'::jsonb,
  ARRAY['Adventure', 'Extreme', 'Mountains'],
  true, true, 'Mixed', '{}'::jsonb
),
(
  'Family Beach Vacation - Andaman',
  'family-beach-vacation-andaman',
  'Port Blair, Andaman & Nicobar',
  'Perfect 7-day family getaway with beach activities, water sports, island hopping, snorkeling, and kid-friendly excursions in pristine beaches.',
  7, 6,
  '2025-08-01', '2025-08-07',
  38999, 48999, 'INR',
  4, 20, 20, 12,
  4.9, 145,
  '[{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19"}]'::jsonb,
  ARRAY['Family Friendly', 'Beach', 'All Ages'],
  true, true, 'Family', '{}'::jsonb
),
(
  'Luxury Couples Retreat - Kerala',
  'luxury-couples-retreat-kerala',
  'Alleppey & Munnar, Kerala',
  'Exclusive 5-day romantic escape with private houseboat stay, luxury resort, couples spa, candlelight dinners, and scenic tea plantation tours.',
  5, 4,
  '2025-09-10', '2025-09-14',
  45999, 59999, 'INR',
  2, 10, 10, 3,
  5.0, 87,
  '[{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07"}]'::jsonb,
  ARRAY['Luxury', 'Premium', 'Romantic'],
  true, true, 'Couples', '{}'::jsonb
),
(
  'AI Startup Networking Tour - Bangalore',
  'ai-startup-networking-tour-bangalore',
  'Bangalore, Karnataka',
  '4-day tech-focused trip visiting AI startups, innovation hubs, networking events, and workshops. Perfect for entrepreneurs and tech enthusiasts.',
  4, 3,
  '2025-10-05', '2025-10-08',
  15999, 21999, 'INR',
  10, 30, 30, 22,
  4.6, 34,
  '[{"url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}]'::jsonb,
  ARRAY['Tech Hub', 'Innovation', 'Networking'],
  true, false, 'Mixed', '{}'::jsonb
),
(
  'Creative Designer Retreat - Goa',
  'creative-designer-retreat-goa',
  'Goa',
  '6-day creative immersion with design workshops, beach sessions, creative networking, and inspiration from Goa''s vibrant art scene.',
  6, 5,
  '2025-11-15', '2025-11-20',
  22999, 29999, 'INR',
  8, 25, 25, 18,
  4.7, 56,
  '[{"url": "https://images.unsplash.com/photo-1511920170033-f8396924c348"}]'::jsonb,
  ARRAY['Creative', 'Aesthetic', 'Beach'],
  true, false, 'Mixed', '{}'::jsonb
),
(
  'Heritage & Culture Tour - Rajasthan',
  'heritage-culture-tour-rajasthan',
  'Jaipur, Udaipur, Jodhpur',
  '8-day cultural journey through Rajasthan''s royal heritage. Visit majestic forts, palaces, local markets, traditional performances, and authentic cuisine.',
  8, 7,
  '2025-12-01', '2025-12-08',
  34999, 44999, 'INR',
  12, 30, 30, 25,
  4.9, 112,
  '[{"url": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"}]'::jsonb,
  ARRAY['Culture', 'Heritage', 'Royal Experience'],
  true, true, 'Mixed', '{}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  price_per_person = EXCLUDED.price_per_person,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  updated_at = NOW();

-- Now create theme mappings
INSERT INTO package_theme_mappings (package_id, theme_id)
SELECT 
  p.id as package_id,
  t.id as theme_id
FROM travel_packages p
CROSS JOIN package_themes t
WHERE 
  (p.slug = 'corporate-leadership-retreat-manali' AND t.slug = 'corporate-retreat')
  OR (p.slug = 'college-adventure-trek-rishikesh' AND t.slug IN ('college-trip', 'adventure-sports'))
  OR (p.slug = 'instagram-influencer-retreat-jaipur' AND t.slug IN ('influencer-trip', 'cultural-exploration'))
  OR (p.slug = 'yoga-wellness-retreat-rishikesh' AND t.slug = 'wellness-retreat')
  OR (p.slug = 'adventure-sports-expedition-leh-ladakh' AND t.slug = 'adventure-sports')
  OR (p.slug = 'family-beach-vacation-andaman' AND t.slug = 'family-vacation')
  OR (p.slug = 'luxury-couples-retreat-kerala' AND t.slug = 'luxury-experience')
  OR (p.slug = 'ai-startup-networking-tour-bangalore' AND t.slug = 'ai-startup-enthusiast')
  OR (p.slug = 'creative-designer-retreat-goa' AND t.slug = 'designer-editor-trip')
  OR (p.slug = 'heritage-culture-tour-rajasthan' AND t.slug = 'cultural-exploration')
ON CONFLICT (package_id, theme_id) DO NOTHING;

-- Add some sample itineraries for the first package
INSERT INTO package_itineraries (package_id, day_number, title, description, activities, meals, accommodation)
SELECT 
  p.id,
  1,
  'Arrival & Team Ice Breaker',
  'Welcome to Manali! Check-in at the resort and participate in fun ice-breaking activities.',
  ARRAY['Resort check-in', 'Welcome drinks', 'Team introduction games', 'Evening bonfire'],
  ARRAY['Dinner'],
  'Luxury Mountain Resort'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_itineraries (package_id, day_number, title, description, activities, meals, accommodation)
SELECT 
  p.id,
  2,
  'Leadership Workshop & Adventure',
  'Morning leadership sessions followed by outdoor team activities.',
  ARRAY['Leadership workshop', 'Problem-solving challenges', 'River rafting', 'Group dinner'],
  ARRAY['Breakfast', 'Lunch', 'Dinner'],
  'Luxury Mountain Resort'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

-- Add package inclusions
INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'inclusion',
  'Accommodation',
  '3 nights in luxury resort with mountain views',
  'hotel'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'inclusion',
  'Meals',
  'All meals included (breakfast, lunch, dinner)',
  'utensils'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'inclusion',
  'Activities',
  'Team building workshops and adventure activities',
  'activity'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'inclusion',
  'Transportation',
  'Airport/station pickup and drop',
  'car'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'exclusion',
  'Airfare',
  'Flight tickets to/from Manali',
  'plane'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

INSERT INTO package_inclusions (package_id, type, item, description, icon)
SELECT 
  p.id,
  'exclusion',
  'Personal Expenses',
  'Shopping, laundry, telephone calls',
  'shopping-bag'
FROM travel_packages p WHERE p.slug = 'corporate-leadership-retreat-manali'
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT 
  (SELECT COUNT(*) FROM travel_packages) as packages_count,
  (SELECT COUNT(*) FROM package_theme_mappings) as mappings_count,
  (SELECT COUNT(*) FROM package_itineraries) as itineraries_count,
  (SELECT COUNT(*) FROM package_inclusions) as inclusions_count;
