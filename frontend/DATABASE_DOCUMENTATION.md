# TrippyWay Database Documentation

## Overview

This document provides comprehensive documentation for the TrippyWay database schema, including all tables, relationships, and common queries.

## Table of Contents

1. [Database Schema Overview](#database-schema-overview)
2. [Core Tables](#core-tables)
3. [Table Relationships](#table-relationships)
4. [Helper Functions](#helper-functions)
5. [Common Queries](#common-queries)
6. [Security (RLS Policies)](#security-rls-policies)
7. [Indexes](#indexes)

---

## Database Schema Overview

The TrippyWay database consists of 11 main tables organized into logical groups:

### Packages System (6 tables)
- `package_themes` - Travel themes (Corporate, College, etc.)
- `travel_packages` - Main travel packages
- `package_theme_mappings` - Many-to-many themes↔packages
- `package_itineraries` - Day-by-day trip plans
- `package_inclusions` - What's included/excluded

### User System (4 tables)
- `user_preferences` - User travel preferences
- `favorites` - User wishlist
- `reviews` - Package reviews
- `booking_enquiries` - Booking requests

### Business System (2 tables)
- `partner_information` - Partner applications
- `email_subscriber` - Newsletter subscriptions

---

## Core Tables

### 1. package_themes

Stores travel package themes (Corporate Retreat, College Trip, Influencer Trip, etc.)

**Columns:**
```sql
id                UUID            PRIMARY KEY
name              TEXT            NOT NULL UNIQUE
slug              TEXT            NOT NULL UNIQUE
description       TEXT
icon              TEXT            -- Icon identifier (e.g., 'briefcase')
color             TEXT            -- Hex color (#3B82F6)
display_order     INTEGER         DEFAULT 0
is_active         BOOLEAN         DEFAULT true
metadata          JSONB           DEFAULT '{}'
created_at        TIMESTAMPTZ     DEFAULT NOW()
updated_at        TIMESTAMPTZ     DEFAULT NOW()
```

**Example:**
```json
{
  "id": "uuid-here",
  "name": "Corporate Retreat",
  "slug": "corporate-retreat",
  "description": "Team building and workshops",
  "icon": "briefcase",
  "color": "#3B82F6",
  "display_order": 0,
  "is_active": true
}
```

### 2. travel_packages

Main table storing all travel packages with pricing, dates, and availability.

**Columns:**
```sql
id                UUID            PRIMARY KEY
title             TEXT            NOT NULL
slug              TEXT            NOT NULL UNIQUE
location          TEXT            NOT NULL
description       TEXT
duration_days     INTEGER         NOT NULL CHECK (> 0)
duration_nights   INTEGER         NOT NULL CHECK (>= 0)
start_date        DATE            -- For fixed-date packages
end_date          DATE            -- For fixed-date packages
price_per_person  DECIMAL(10,2)   NOT NULL
original_price    DECIMAL(10,2)   -- For showing discounts
currency          TEXT            DEFAULT 'INR'
min_people        INTEGER         DEFAULT 1
max_people        INTEGER
spots_total       INTEGER         DEFAULT 0
spots_available   INTEGER         DEFAULT 0
rating            DECIMAL(3,2)    DEFAULT 0 (0-5)
review_count      INTEGER         DEFAULT 0
images            JSONB           Array of image objects
tags              TEXT[]          Array of tags
is_active         BOOLEAN         DEFAULT true
is_featured       BOOLEAN         DEFAULT false
category          TEXT            ('Couples', 'Girls Only', 'Boys Only', 'Mixed', 'Family')
metadata          JSONB           Additional data
created_at        TIMESTAMPTZ     DEFAULT NOW()
updated_at        TIMESTAMPTZ     DEFAULT NOW()
```

**Example:**
```json
{
  "id": "uuid-here",
  "title": "Corporate Leadership Retreat - Manali",
  "slug": "corporate-leadership-retreat-manali",
  "location": "Manali, Himachal Pradesh",
  "duration_days": 4,
  "duration_nights": 3,
  "price_per_person": 18999.00,
  "original_price": 24999.00,
  "spots_total": 50,
  "spots_available": 28,
  "rating": 4.80,
  "category": "Mixed",
  "is_featured": true
}
```

### 3. package_theme_mappings

Many-to-many relationship between packages and themes. Allows packages to have multiple themes.

**Columns:**
```sql
id              UUID            PRIMARY KEY
package_id      UUID            REFERENCES travel_packages(id)
theme_id        UUID            REFERENCES package_themes(id)
is_primary      BOOLEAN         DEFAULT false
created_at      TIMESTAMPTZ     DEFAULT NOW()
UNIQUE(package_id, theme_id)
```

### 4. package_itineraries

Day-by-day itinerary for each package.

**Columns:**
```sql
id                      UUID            PRIMARY KEY
package_id              UUID            REFERENCES travel_packages(id)
day_number              INTEGER         NOT NULL
title                   TEXT            NOT NULL
description             TEXT
activities              JSONB           Array of activity objects
meals_included          TEXT[]          ['breakfast', 'lunch', 'dinner']
accommodation_details   TEXT
images                  JSONB           Array of image objects
created_at              TIMESTAMPTZ     DEFAULT NOW()
updated_at              TIMESTAMPTZ     DEFAULT NOW()
UNIQUE(package_id, day_number)
```

**Activities JSON Example:**
```json
[
  {
    "time": "09:00 AM",
    "title": "Team Building Workshop",
    "description": "Interactive session on communication",
    "highlight": true
  }
]
```

### 5. package_inclusions

What's included and excluded in each package.

**Columns:**
```sql
id              UUID            PRIMARY KEY
package_id      UUID            REFERENCES travel_packages(id)
type            TEXT            CHECK ('included' OR 'excluded')
title           TEXT            NOT NULL
description     TEXT
icon            TEXT            -- Icon identifier
display_order   INTEGER         DEFAULT 0
created_at      TIMESTAMPTZ     DEFAULT NOW()
```

### 6. reviews

User reviews for packages.

**Columns:**
```sql
id                UUID            PRIMARY KEY
name              TEXT            -- For non-authenticated users
user_id           UUID            REFERENCES auth.users(id)
verified          BOOLEAN         DEFAULT false
stars             INTEGER         CHECK (1-5)
review_comment    TEXT            NOT NULL
images            TEXT[]          Array of image URLs
trip_id           TEXT            NOT NULL
created_at        TIMESTAMPTZ     DEFAULT NOW()
updated_at        TIMESTAMPTZ     DEFAULT NOW()
```

### 7. user_preferences

Stores user preferences from onboarding quiz.

**Columns:**
```sql
id                      UUID            PRIMARY KEY
user_id                 UUID            REFERENCES auth.users(id) UNIQUE
travel_type             TEXT
travel_frequency        TEXT
budget_comfort_range    TEXT
activities              JSONB           Array of selected activities
destinations            JSONB           Array of preferred destinations
companions              JSONB           Array of travel companions
goals                   JSONB           Array of travel goals
created_at              TIMESTAMPTZ     DEFAULT NOW()
updated_at              TIMESTAMPTZ     DEFAULT NOW()
```

### 8. favorites

User wishlist/favorites for packages.

**Columns:**
```sql
id              UUID            PRIMARY KEY
user_id         UUID            REFERENCES auth.users(id)
trip_id         TEXT            NOT NULL
created_at      TIMESTAMPTZ     DEFAULT NOW()
UNIQUE(user_id, trip_id)
```

### 9. booking_enquiries

Stores booking requests before WhatsApp handoff (Hybrid booking system).

**Columns:**
```sql
id                  UUID            PRIMARY KEY
user_id             UUID            REFERENCES auth.users(id)
package_id          UUID            REFERENCES travel_packages(id)
package_slug        TEXT            NOT NULL
name                TEXT            NOT NULL
email               TEXT            NOT NULL
phone               TEXT            NOT NULL
traveler_count      INTEGER         NOT NULL CHECK (> 0)
start_date          DATE
end_date            DATE
budget_range        TEXT
special_requests    TEXT
how_heard_about_us  TEXT
status              TEXT            DEFAULT 'pending' ('pending', 'contacted', 'confirmed', 'cancelled')
whatsapp_message_id TEXT
admin_notes         TEXT
created_at          TIMESTAMPTZ     DEFAULT NOW()
updated_at          TIMESTAMPTZ     DEFAULT NOW()
contacted_at        TIMESTAMPTZ
confirmed_at        TIMESTAMPTZ
```

### 10. partner_information

Partner applications from hotels, tour operators, etc.

**Columns:**
```sql
id              UUID            PRIMARY KEY
business_name   TEXT            NOT NULL
business_type   TEXT            CHECK ('hotel', 'homestay', 'resort', 'tour-operator', 'activity-provider', 'travel-agent')
contact_person  TEXT            NOT NULL
email           TEXT            NOT NULL
phone           TEXT            NOT NULL
location        TEXT            NOT NULL
city            TEXT            NOT NULL
state           TEXT            NOT NULL
description     TEXT
experience      INTEGER         -- Years in business
status          TEXT            DEFAULT 'pending' ('pending', 'reviewed', 'approved', 'rejected')
created_at      TIMESTAMPTZ     DEFAULT NOW()
updated_at      TIMESTAMPTZ     DEFAULT NOW()
```

### 11. email_subscriber

Newsletter email subscribers.

**Columns:**
```sql
id          UUID            PRIMARY KEY
email       TEXT            NOT NULL UNIQUE
is_active   BOOLEAN         DEFAULT true
source      TEXT            DEFAULT 'website'
created_at  TIMESTAMPTZ     DEFAULT NOW()
```

---

## Table Relationships

```
auth.users (Supabase Auth)
    |
    +-- user_preferences (1:1) - One preference record per user
    +-- favorites (1:N) - User can have many favorites
    +-- reviews (1:N) - User can write many reviews
    +-- booking_enquiries (1:N) - User can make many bookings

package_themes
    |
    +-- package_theme_mappings (1:N)
            |
            +-- travel_packages (N:1)

travel_packages
    |
    +-- package_itineraries (1:N) - Multiple days
    +-- package_inclusions (1:N) - Multiple inclusions
    +-- booking_enquiries (1:N) - Multiple bookings
    +-- (reviews via trip_id reference)
```

---

## Helper Functions

### 1. get_packages_by_filters()

Advanced package search with multiple filters.

**Parameters:**
- `theme_slugs` (TEXT[]) - Filter by theme slugs
- `min_days` (INTEGER) - Minimum duration
- `max_days` (INTEGER) - Maximum duration
- `min_price` (DECIMAL) - Minimum price
- `max_price` (DECIMAL) - Maximum price
- `package_category` (TEXT) - Filter by category
- `search_term` (TEXT) - Full-text search
- `limit_count` (INTEGER) - Results limit (default 50)
- `offset_count` (INTEGER) - Pagination offset (default 0)

**Usage:**
```sql
SELECT * FROM get_packages_by_filters(
    theme_slugs := ARRAY['corporate-retreat', 'college-trip'],
    min_days := 3,
    max_price := 25000,
    limit_count := 10
);
```

### 2. get_package_details()

Get complete package details with all relations.

**Parameters:**
- `package_slug` (TEXT) - Package slug

**Usage:**
```sql
SELECT * FROM get_package_details('corporate-leadership-retreat-manali');
```

**Returns:**
- Package info
- All associated themes
- Complete itinerary
- Inclusions and exclusions

### 3. get_trip_review_count()

Get total review count for a trip.

**Usage:**
```sql
SELECT get_trip_review_count('corporate-leadership-retreat-manali');
```

### 4. get_trip_avg_rating()

Get average star rating for a trip.

**Usage:**
```sql
SELECT get_trip_avg_rating('corporate-leadership-retreat-manali');
```

### 5. get_user_booking_history()

Get all bookings for a specific user.

**Usage:**
```sql
SELECT * FROM get_user_booking_history('user-uuid-here');
```

---

## Common Queries

### Get all active packages with themes
```sql
SELECT 
    p.id,
    p.title,
    p.slug,
    p.price_per_person,
    json_agg(
        json_build_object(
            'name', t.name,
            'slug', t.slug,
            'color', t.color
        )
    ) as themes
FROM travel_packages p
LEFT JOIN package_theme_mappings ptm ON p.id = ptm.package_id
LEFT JOIN package_themes t ON ptm.theme_id = t.id
WHERE p.is_active = true
GROUP BY p.id
ORDER BY p.is_featured DESC, p.rating DESC;
```

### Get featured packages
```sql
SELECT * FROM travel_packages
WHERE is_active = true AND is_featured = true
ORDER BY rating DESC
LIMIT 6;
```

### Get packages by specific theme
```sql
SELECT p.*
FROM travel_packages p
JOIN package_theme_mappings ptm ON p.id = ptm.package_id
JOIN package_themes t ON ptm.theme_id = t.id
WHERE t.slug = 'corporate-retreat' AND p.is_active = true;
```

### Get user's favorites with package details
```sql
SELECT 
    f.id,
    f.trip_id,
    p.title,
    p.location,
    p.price_per_person,
    p.rating
FROM favorites f
LEFT JOIN travel_packages p ON f.trip_id = p.slug
WHERE f.user_id = 'user-uuid-here'
ORDER BY f.created_at DESC;
```

### Get recent booking enquiries
```sql
SELECT 
    be.*,
    p.title as package_title,
    p.location
FROM booking_enquiries be
LEFT JOIN travel_packages p ON be.package_slug = p.slug
WHERE be.status = 'pending'
ORDER BY be.created_at DESC
LIMIT 20;
```

### Get package reviews with user info
```sql
SELECT 
    r.id,
    r.stars,
    r.review_comment,
    COALESCE(r.name, u.raw_user_meta_data->>'full_name') as reviewer_name,
    r.verified,
    r.created_at
FROM reviews r
LEFT JOIN auth.users u ON r.user_id = u.id
WHERE r.trip_id = 'package-slug-here'
ORDER BY r.created_at DESC;
```

---

## Security (RLS Policies)

### Public Access (Read-Only)
- Package themes (active only)
- Travel packages (active only)
- Package itineraries
- Package inclusions
- Reviews (all)

### Authenticated Users
- **Can read/write**: Own preferences, favorites, reviews, bookings
- **Can create**: Reviews, booking enquiries

### Anonymous Users
- **Can create**: Reviews (unverified), partner applications, email subscriptions, booking enquiries

### Admin-Only
- Partner application reviews
- Email subscriber list
- All booking enquiries

---

## Indexes

### Performance Indexes
```sql
-- Search indexes
CREATE INDEX idx_packages_search ON travel_packages 
    USING GIN(to_tsvector('english', title || ' ' || location || ' ' || description));

-- Filtering indexes
CREATE INDEX idx_packages_price ON travel_packages(price_per_person);
CREATE INDEX idx_packages_duration ON travel_packages(duration_days);
CREATE INDEX idx_packages_rating ON travel_packages(rating);
CREATE INDEX idx_packages_featured ON travel_packages(is_featured);
CREATE INDEX idx_packages_category ON travel_packages(category);

-- Tags search
CREATE INDEX idx_packages_tags ON travel_packages USING GIN(tags);

-- Foreign key indexes
CREATE INDEX idx_theme_mappings_package ON package_theme_mappings(package_id);
CREATE INDEX idx_theme_mappings_theme ON package_theme_mappings(theme_id);
CREATE INDEX idx_itineraries_package ON package_itineraries(package_id);
CREATE INDEX idx_inclusions_package ON package_inclusions(package_id);
CREATE INDEX idx_reviews_trip ON reviews(trip_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_bookings_user ON booking_enquiries(user_id);
CREATE INDEX idx_bookings_package ON booking_enquiries(package_id);
```

---

## Data Integrity

### Constraints
- All foreign keys have `ON DELETE CASCADE` or `SET NULL` for proper cleanup
- Price fields use DECIMAL(10,2) for accurate currency handling
- Rating constrained to 0-5 range
- Dates validated (end_date >= start_date)
- Spots available never exceeds spots total

### Triggers
- Auto-update `updated_at` on all tables with UPDATE
- Auto-verify reviews from authenticated users (potential future enhancement)

---

## Backup & Maintenance

### Regular Tasks
1. **Backup database daily** - Use Supabase dashboard or pg_dump
2. **Archive old bookings** - Move completed bookings older than 1 year
3. **Update package ratings** - Recalculate from reviews periodically
4. **Clean inactive data** - Remove unverified reviews older than 30 days

### Performance Monitoring
```sql
-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

---

## Migration Notes

### From Old Schema
If migrating from the separated SQL files:
1. Run `00_complete_database_setup.sql`
2. Existing data is preserved (idempotent)
3. Old tables are updated, not replaced
4. New columns/indexes are added

### Version Control
- Schema version: 1.0
- Migration file: `00_complete_database_setup.sql`
- Last updated: 2025-12-08

---

## Support

For issues or questions:
1. Check this documentation
2. Review `DATABASE_SETUP_INSTRUCTIONS.md`
3. Verify RLS policies in Supabase dashboard
4. Check application logs for query errors

---

*Last Updated: December 8, 2025*
