# Database Setup Guide

## Error: "Error fetching package themes"

This error occurs because the database tables haven't been created yet. Follow these steps to set up your database:

## Quick Setup (2 Steps)

### Step 1: Create Database Tables

1. **Open your Supabase Dashboard**: https://app.supabase.com
2. **Go to SQL Editor** (left sidebar)
3. **Copy the entire SQL migration file**: `frontend/supabase/migrations/create_theme_packages_schema.sql`
4. **Paste and Run** the SQL in the editor
5. You should see a success message

### Step 2: Seed Initial Data

Run the setup script to add sample themes:

```bash
cd frontend
npx ts-node scripts/setup-database.ts
```

Or manually seed from the Supabase SQL Editor:

```sql
-- Insert themes
INSERT INTO package_themes (name, slug, description, icon, color, display_order, is_active) VALUES
('Corporate Retreat', 'corporate-retreat', 'Team building, conferences, workshops, and corporate events', 'briefcase', '#3B82F6', 0, true),
('College Trip', 'college-trip', 'Budget-friendly adventures perfect for students', 'graduation-cap', '#10B981', 1, true),
('Influencer Trip', 'influencer-trip', 'Instagram-worthy locations perfect for content creation', 'camera', '#EC4899', 2, true),
('Designer & Editor Trip', 'designer-editor-trip', 'Creative inspiration from aesthetic locations', 'palette', '#8B5CF6', 3, true),
('AI Startup Enthusiast', 'ai-startup-enthusiast', 'Tech hubs, innovation centers, and networking opportunities', 'zap', '#F59E0B', 4, true),
('Wellness Retreat', 'wellness-retreat', 'Rejuvenate with yoga, meditation, and spa experiences', 'heart', '#14B8A6', 5, true),
('Adventure Sports', 'adventure-sports', 'Thrilling activities for adrenaline junkies', 'mountain', '#EF4444', 6, true),
('Cultural Exploration', 'cultural-exploration', 'Immerse in local culture, history, and traditions', 'compass', '#F97316', 7, true),
('Family Vacation', 'family-vacation', 'Family-friendly destinations with activities for all ages', 'users', '#06B6D4', 8, true),
('Luxury Experience', 'luxury-experience', 'Premium stays and exclusive experiences', 'sparkles', '#A855F7', 9, true)
ON CONFLICT (slug) DO NOTHING;
```

### Step 3: Add Sample Packages (Optional)

To add sample travel packages:

```bash
cd frontend
npx ts-node src/lib/supabase/seed-packages.ts
```

## Verification

1. **Check Tables Created**:
   - Go to Supabase Dashboard → Table Editor
   - You should see tables:
     - `package_themes`
     - `travel_packages`
     - `package_theme_mappings`
     - `package_itineraries`
     - `package_inclusions`

2. **Check Data**:
   - Open `package_themes` table
   - You should see 10 themes listed

3. **Test the Application**:
   - Restart your dev server: `npm run dev`
   - Visit: http://localhost:3000/packages
   - You should see the filters without errors

## Troubleshooting

### Error: "relation does not exist"
- **Solution**: Run the SQL migration file in Supabase SQL Editor

### Error: "permission denied"
- **Solution**: Check RLS (Row Level Security) policies are set correctly
- The migration file already includes public read policies

### Error: "duplicate key value"
- **Solution**: This is normal if data already exists (safe to ignore)

### Still seeing errors?
1. Check your `.env.local` file has correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Verify your Supabase project is active
3. Check the browser console for detailed error messages

## Database Schema Overview

The database uses a flexible theme-based system:

```
package_themes (10 themes)
    ↓
package_theme_mappings (many-to-many)
    ↓
travel_packages (your trips)
    ├─→ package_itineraries (day-by-day plans)
    └─→ package_inclusions (what's included/excluded)
```

## Files Reference

- **Schema**: `frontend/supabase/migrations/create_theme_packages_schema.sql`
- **Seed Script**: `frontend/src/lib/supabase/seed-packages.ts`
- **Setup Script**: `frontend/scripts/setup-database.ts`
- **Queries**: `frontend/src/lib/supabase/packages-queries.ts`

---

**After setup, your packages page filters will work perfectly!** ✨
