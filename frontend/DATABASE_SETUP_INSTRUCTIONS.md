# TrippyWay Database Setup Instructions

## Complete Step-by-Step Guide

This guide will help you set up the complete TrippyWay database from scratch.

---

## Prerequisites

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Node.js installed (v18 or higher)

### Environment Variables Required

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional, for automation)
```

---

## Setup Options

Choose one of the following methods:

### ⚡ Option A: Automated Setup (Recommended for Development)
**Time**: ~2 minutes  
**Difficulty**: Easy

### 🔧 Option B: Manual Setup (Recommended for Production)
**Time**: ~5 minutes  
**Difficulty**: Medium

---

## Option A: Automated Setup

### Step 1: Run the Setup Script

```bash
cd frontend
npx ts-node scripts/setup-complete-database.ts
```

The script will:
- ✅ Check Supabase connection
- ✅ Execute the SQL migration
- ✅ Create all tables
- ✅ Set up RLS policies
- ✅ Create helper functions
- ✅ Seed theme data

### Step 2: Seed Sample Data (Optional)

```bash
npx ts-node scripts/seed-sample-data.ts
```

This adds 8 sample travel packages for testing.

### Step 3: Verify Setup

```bash
npm run dev
```

Visit: http://localhost:3000/packages

You should see the packages page with filters working!

---

## Option B: Manual Setup

### Step 1: Open Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Master SQL Script

1. Open the file: `frontend/supabase/migrations/00_complete_database_setup.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **Run** (or press Cmd/Ctrl + Enter)

Wait for execution to complete (~30 seconds).

### Step 3: Verify Tables Created

1. Go to **Table Editor** in Supabase Dashboard
2. You should see these tables:
   - ✅ package_themes
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

### Step 4: Seed Theme Data

Run this SQL in the SQL Editor:

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

### Step 5: Add Sample Packages (Optional)

If you want sample data for testing:

```bash
cd frontend
npx ts-node scripts/seed-sample-data.ts
```

Or run the sample package SQL manually (find in `scripts/seed-sample-data.ts`).

### Step 6: Test Your Setup

```bash
npm run dev
```

Visit: http://localhost:3000/packages

---

## Verification Checklist

Run these queries in Supabase SQL Editor to verify setup:

### 1. Check Tables Exist

```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Expected: 11 tables

### 2. Check RLS is Enabled

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
```

Expected: All 11 tables with rowsecurity = true

### 3. Check Themes Seeded

```sql
SELECT COUNT(*) FROM package_themes;
```

Expected: 10 themes

### 4. Check Helper Functions

```sql
SELECT proname 
FROM pg_proc 
WHERE proname LIKE 'get_%';
```

Expected: 5 functions (get_packages_by_filters, get_package_details, etc.)

### 5. Check Policies

```sql
SELECT tablename, COUNT(*) as policy_count 
FROM pg_policies 
WHERE schemaname = 'public' 
GROUP BY tablename 
ORDER BY tablename;
```

Expected: Multiple policies per table

---

## Troubleshooting

### Issue: "relation does not exist"

**Solution**: Run the SQL migration file again. Tables weren't created.

```bash
# Check if you're in the right project
echo $NEXT_PUBLIC_SUPABASE_URL
```

### Issue: "permission denied for table"

**Solution**: RLS policies may be too restrictive.

1. Go to **Authentication** > **Policies** in Supabase
2. Check policies for the table
3. Verify "Public can view" policies exist

### Issue: "Error fetching package themes"

**Solution**: Themes table is empty or RLS blocking access.

```sql
-- Check if themes exist
SELECT COUNT(*) FROM package_themes;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'package_themes';
```

If count is 0, run the theme seed SQL from Step 4.

### Issue: "Cannot execute SQL script automatically"

**Solution**: Use manual setup (Option B) instead.

The automation requires `exec_sql` function which may not be available in all Supabase plans.

### Issue: Packages page shows no packages

**Causes**:
1. No packages in database → Run seed script
2. RLS blocking access → Check policies
3. Wrong table name → Check console errors

**Solution**:
```sql
-- Check if packages exist
SELECT COUNT(*) FROM travel_packages;

-- Check if RLS allows access
SET ROLE anon;
SELECT COUNT(*) FROM travel_packages WHERE is_active = true;
RESET ROLE;
```

### Issue: Favorites not working (404 error)

**Solution**: Fixed! The typo has been corrected. If you ran setup before the fix:

```sql
-- Rename the old table
ALTER TABLE favorrites RENAME TO favorites;
```

---

## Post-Setup Tasks

### 1. Test User Registration

1. Visit: http://localhost:3000/sign-up
2. Create a test account
3. Verify email received (if email configured)
4. Check user appears in Supabase Auth

### 2. Test Package Filtering

1. Visit: http://localhost:3000/packages
2. Click different theme chips
3. Try day range filters
4. Test search functionality
5. Check sort dropdown

### 3. Test Booking Flow

1. Click on a package
2. Click "Book Now"
3. Fill booking form
4. Verify enquiry saved in `booking_enquiries` table

### 4. Test Reviews

1. Go to a package detail page
2. Submit a review
3. Check review appears in `reviews` table
4. Verify authenticated reviews marked as verified

### 5. Test Partner Application

1. Visit: http://localhost:3000/partner-application
2. Fill and submit form
3. Check entry in `partner_information` table

---

## Database Maintenance

### Regular Tasks

**Daily:**
- Backup database (Supabase auto-backups for paid plans)

**Weekly:**
- Check booking enquiry statuses
- Review new partner applications
- Monitor review submissions

**Monthly:**
- Update package ratings from reviews
- Archive old completed bookings
- Clean up test data

### Backup Commands

```bash
# Export all data (requires supabase CLI)
supabase db dump -f backup.sql

# Export specific table
supabase db dump -t travel_packages -f packages_backup.sql
```

### Update Package Ratings

```sql
-- Update ratings from reviews
UPDATE travel_packages tp
SET 
  rating = COALESCE((
    SELECT AVG(stars)::NUMERIC(3,2)
    FROM reviews
    WHERE trip_id = tp.slug
  ), 0),
  review_count = (
    SELECT COUNT(*)::INTEGER
    FROM reviews
    WHERE trip_id = tp.slug
  );
```

---

## Next Steps

### For Development

1. ✅ Database is set up
2. ⏭️ Start development server: `npm run dev`
3. ⏭️ Test all features
4. ⏭️ Add your own packages
5. ⏭️ Customize themes

### For Production

1. ✅ Database is set up
2. ⏭️ Remove sample data
3. ⏭️ Add real packages
4. ⏭️ Configure email service (Supabase Auth)
5. ⏭️ Set up domain and SSL
6. ⏭️ Enable database backups
7. ⏭️ Monitor performance

---

## Additional Resources

### Documentation
- 📚 [DATABASE_DOCUMENTATION.md](./DATABASE_DOCUMENTATION.md) - Complete schema reference
- 📦 [Supabase Documentation](https://supabase.com/docs)
- 🔐 [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

### Scripts
- `scripts/setup-complete-database.ts` - Automated setup
- `scripts/seed-sample-data.ts` - Sample data seeder
- `supabase/migrations/00_complete_database_setup.sql` - Master SQL script

### Support
- Check console errors in browser DevTools
- Review Supabase logs in dashboard
- Verify environment variables are set correctly

---

## Quick Reference

### Important URLs
```
Development:          http://localhost:3000
Packages Page:        http://localhost:3000/packages
Sign Up:             http://localhost:3000/sign-up
Partner Application: http://localhost:3000/partner-application
Supabase Dashboard:  https://app.supabase.com
```

### Important Commands
```bash
# Run dev server
npm run dev

# Setup database (automated)
npx ts-node scripts/setup-complete-database.ts

# Seed sample data
npx ts-node scripts/seed-sample-data.ts

# Check Supabase status
supabase status
```

### Key Files
```
SQL Migration:       supabase/migrations/00_complete_database_setup.sql
Setup Script:        scripts/setup-complete-database.ts
Seed Script:         scripts/seed-sample-data.ts
Documentation:       DATABASE_DOCUMENTATION.md
Environment:         .env.local
```

---

## Success Criteria

Your setup is complete when:

- ✅ All 11 tables exist in Supabase
- ✅ 10 themes visible in package_themes table
- ✅ Packages page loads without errors
- ✅ Theme filters work
- ✅ User can sign up and sign in
- ✅ Package details page loads
- ✅ Reviews can be submitted
- ✅ Booking enquiries are saved
- ✅ Partner application form works

---

**Setup Date**: December 8, 2025  
**Database Version**: 1.0  
**Last Updated**: December 8, 2025

---

🎉 **Congratulations!** Your TrippyWay database is now fully set up and ready to use!

For questions or issues, refer to the [DATABASE_DOCUMENTATION.md](./DATABASE_DOCUMENTATION.md) or check the Troubleshooting section above.
