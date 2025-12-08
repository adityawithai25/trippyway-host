# Theme-Based Packages Setup Guide

## ✅ Implementation Complete

All code for the theme-based package system has been successfully implemented! Now you need to set up your Supabase database.

## 🚀 Quick Setup (3 Steps)

### Step 1: Run the Database Migration

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file: `frontend/supabase/migrations/create_theme_packages_schema.sql`
5. Copy ALL the contents and paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

This will create all necessary tables, functions, and security policies.

### Step 2: Seed the Database with Sample Data

**Option A: Run via Node Script (Recommended)**

```bash
cd frontend
npx tsx src/lib/supabase/seed-packages.ts
```

**Option B: Manual Seeding via Supabase Dashboard**

If the script doesn't work, you can manually insert data:

1. Go to Supabase SQL Editor
2. Run this query to insert themes:

```sql
-- Insert themes
INSERT INTO package_themes (name, slug, description, icon, color, display_order, is_active, metadata) VALUES
('Corporate Retreat', 'corporate-retreat', 'Team building, conferences, workshops, and corporate events', 'briefcase', '#3B82F6', 0, true, '{"default_tags": ["Team Building", "Professional", "Workshops"]}'),
('College Trip', 'college-trip', 'Budget-friendly adventures perfect for students', 'graduation-cap', '#10B981', 1, true, '{"default_tags": ["Budget Friendly", "Student Special", "Group Fun"]}'),
('Influencer Trip', 'influencer-trip', 'Instagram-worthy locations perfect for content creation', 'camera', '#EC4899', 2, true, '{"default_tags": ["Instagram Worthy", "Photo Ops", "Content Creation"]}'),
('Designer & Editor Trip', 'designer-editor-trip', 'Creative inspiration from aesthetic locations', 'palette', '#8B5CF6', 3, true, '{"default_tags": ["Creative", "Aesthetic", "Inspiration"]}'),
('AI Startup Enthusiast', 'ai-startup-enthusiast', 'Tech hubs, innovation centers, and networking opportunities', 'zap', '#F59E0B', 4, true, '{"default_tags": ["Tech Hub", "Innovation", "Networking"]}'),
('Wellness Retreat', 'wellness-retreat', 'Rejuvenate with yoga, meditation, and spa experiences', 'heart', '#14B8A6', 5, true, '{"default_tags": ["Wellness", "Yoga", "Spa"]}'),
('Adventure Sports', 'adventure-sports', 'Thrilling activities for adrenaline junkies', 'mountain', '#EF4444', 6, true, '{"default_tags": ["Adventure", "Extreme", "Sports"]}'),
('Cultural Exploration', 'cultural-exploration', 'Immerse in local culture, history, and traditions', 'compass', '#F97316', 7, true, '{"default_tags": ["Culture", "Heritage", "Local Experience"]}'),
('Family Vacation', 'family-vacation', 'Family-friendly destinations with activities for all ages', 'users', '#06B6D4', 8, true, '{"default_tags": ["Family Friendly", "All Ages", "Safe"]}'),
('Luxury Experience', 'luxury-experience', 'Premium stays and exclusive experiences', 'sparkles', '#A855F7', 9, true, '{"default_tags": ["Luxury", "Premium", "Exclusive"]}')
ON CONFLICT (slug) DO NOTHING;
```

### Step 3: Verify Environment Variables

Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 What Was Implemented

### ✅ Database Layer
- **SQL Migration**: `frontend/supabase/migrations/create_theme_packages_schema.sql`
  - 5 tables with proper relationships
  - RLS policies for security
  - Helper functions for efficient querying
  
### ✅ Data Layer
- **Types**: `frontend/src/types/packages.ts`
- **Query Functions**: `frontend/src/lib/supabase/packages-queries.ts`
- **Admin Functions**: `frontend/src/lib/supabase/admin-packages.ts`
- **Seed Script**: `frontend/src/lib/supabase/seed-packages.ts`

### ✅ Configuration & Constants
- **Filter Constants**: `frontend/src/constants/package-filters.ts`
  - Day range options (1-3, 4-7, 8-15, 15+ days)
  - Theme configurations with colors and icons
  - Utility functions for formatting

### ✅ Filtering Logic
- **Filter Functions**: `frontend/src/lib/filters/package-filters.ts`
  - Multi-theme filtering (OR logic)
  - Day range filtering
  - Price range filtering
  - Search functionality
  - Sorting options

### ✅ UI Components
- **Theme Chips**: `frontend/src/app/(pages)/packages/_components/theme-chips.tsx`
  - Multi-select with visual feedback
  - Responsive design
  - Multiple variants (compact, pills)

- **Day Range Filter**: `frontend/src/app/(pages)/packages/_components/day-range-filter.tsx`
  - Chip-based selection
  - Slider option
  - Badge displays

- **Advanced Filters**: `frontend/src/app/(pages)/packages/_components/advanced-filters.tsx`
  - Category selection
  - Price range slider
  - Availability toggle
  - Active filters display

- **Package Card**: `frontend/src/app/(pages)/packages/_components/package-card.tsx`
  - Theme badges
  - Discount display
  - Availability status
  - Responsive design

- **Updated Pages**:
  - `frontend/src/app/(pages)/packages/page.tsx` - Main packages page
  - `frontend/src/app/(pages)/packages/_components/trip-filters.tsx` - Filter logic

## 🎨 Features

### Multi-Select Theme Filtering
- Select multiple themes simultaneously
- OR logic: shows packages matching ANY selected theme
- Visual feedback with colored chips

### Day Range Filtering
- Quick select: 1-3, 4-7, 8-15, 15+ days
- Clear visual indication
- Responsive chips

### Advanced Filtering
- Category (Couples, Girls Only, Boys Only, Mixed, Family)
- Price range with slider
- Availability toggle
- Show active filters with easy removal

### Search
- Search by title, location, description, or tags
- Real-time filtering
- Clear search button

### URL State Management
- All filters sync with URL
- Shareable links
- Browser back/forward support

### Responsive Design
- Mobile: Horizontal scrollable chips
- Tablet/Desktop: Wrapped layout
- Sticky filter bar on scroll
- Touch-friendly controls

## 🔄 How It Works

1. **Server-Side**: Packages page fetches data from Supabase
2. **Client-Side**: Filters component manages state and URL params
3. **Filtering**: Multi-criteria filtering with efficient algorithms
4. **Display**: Package cards show themes, prices, availability

## 🎯 Sample Themes

The seed data includes 10 packages across different themes:
- Corporate Leadership Retreat - Manali
- College Adventure Trek - Rishikesh
- Instagram Influencer Retreat - Jaipur
- Designer's Creative Escape - Goa
- AI Startup Networking Tour - Bangalore
- Yoga & Wellness Retreat - Rishikesh
- Adventure Sports Expedition - Leh Ladakh
- Cultural Heritage Tour - Rajasthan
- Family Beach Vacation - Andaman
- Luxury Couples Retreat - Kerala

## 🐛 Troubleshooting

### "Function not found" error
- Run the SQL migration in Supabase SQL Editor

### "Connection timeout" error
- Check your Supabase credentials in `.env.local`
- Verify your Supabase project is active

### No packages showing
- Run the seed script to populate data
- Check RLS policies in Supabase (should allow public SELECT)

### Home page error with TripCard
- Fixed! Created separate `PackageCard` for new structure
- Old `TripCard` still works for existing trip data

## 📝 Next Steps

1. **Run the migration** (Step 1 above)
2. **Seed the data** (Step 2 above)
3. **Refresh your app** - everything should work!
4. **Optional**: Customize themes, add more packages
5. **Optional**: Build admin panel to manage packages

## 🎉 You're All Set!

Once you complete the 3 setup steps, navigate to `/packages` and you'll see:
- Multi-select theme chips
- Day range filters
- Search bar
- Package grid with theme badges
- Advanced filters (expandable)
- Active filter badges
- Empty state (until you add data)

The UI is fully responsive and ready for production!


