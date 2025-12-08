#!/usr/bin/env ts-node
// ============================================================================
// Seed Sample Data Script
// ============================================================================
// This script adds sample travel packages to the database
// Run: npx ts-node scripts/seed-sample-data.ts

import { createClient } from "@supabase/supabase-js";

// Colors for console
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bright: "\x1b[1m",
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  log("❌ Missing Supabase environment variables!", colors.red);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// Sample Data
// ============================================================================

async function seedPackages() {
  log("\n🌱 Seeding sample travel packages...", colors.cyan);
  
  // First, get all themes
  const { data: themes, error: themesError } = await supabase
    .from("package_themes")
    .select("id, slug");
  
  if (themesError || !themes || themes.length === 0) {
    log("❌ No themes found. Please run setup script first.", colors.red);
    return false;
  }
  
  const getThemeId = (slug: string) => themes.find((t) => t.slug === slug)?.id;
  
  const samplePackages = [
    {
      title: "Corporate Leadership Retreat - Manali",
      slug: "corporate-leadership-retreat-manali",
      location: "Manali, Himachal Pradesh",
      description: "A transformative 4-day corporate retreat focused on leadership development, team building, and strategic planning amidst the scenic Himalayas.",
      duration_days: 4,
      duration_nights: 3,
      start_date: "2025-02-15",
      end_date: "2025-02-18",
      price_per_person: 18999,
      original_price: 24999,
      currency: "INR",
      min_people: 15,
      max_people: 50,
      spots_total: 50,
      spots_available: 28,
      rating: 4.8,
      review_count: 42,
      images: [
        { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", alt: "Team meeting" },
        { url: "https://images.unsplash.com/photo-1552664730-d307ca884978", alt: "Workshop session" },
      ],
      tags: ["Team Building", "Professional", "Workshops"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: { includes_conference_room: true, max_group_size: 50 },
      theme_slugs: ["corporate-retreat"],
    },
    {
      title: "College Adventure Trek - Rishikesh",
      slug: "college-adventure-trek-rishikesh",
      location: "Rishikesh, Uttarakhand",
      description: "An action-packed 3-day college trip with river rafting, camping, bonfires, and adventure activities perfect for students.",
      duration_days: 3,
      duration_nights: 2,
      start_date: "2025-03-10",
      end_date: "2025-03-12",
      price_per_person: 3999,
      original_price: 5499,
      currency: "INR",
      min_people: 10,
      max_people: 40,
      spots_total: 40,
      spots_available: 12,
      rating: 4.9,
      review_count: 156,
      images: [
        { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23", alt: "River rafting" },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", alt: "Camping" },
      ],
      tags: ["Budget Friendly", "Adventure", "Student Special"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: { student_discount: true },
      theme_slugs: ["college-trip", "adventure-sports"],
    },
    {
      title: "Instagram Influencer Retreat - Jaipur",
      slug: "instagram-influencer-retreat-jaipur",
      location: "Jaipur, Rajasthan",
      description: "Explore the pink city's most photogenic locations with professional photography guidance, content creation workshops, and luxury stays.",
      duration_days: 5,
      duration_nights: 4,
      start_date: "2025-03-20",
      end_date: "2025-03-24",
      price_per_person: 22999,
      original_price: 29999,
      currency: "INR",
      min_people: 8,
      max_people: 20,
      spots_total: 20,
      spots_available: 5,
      rating: 4.7,
      review_count: 89,
      images: [
        { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41", alt: "Jaipur palace" },
        { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245", alt: "Hawa Mahal" },
      ],
      tags: ["Instagram Worthy", "Photo Ops", "Content Creation"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: { includes_photographer: true, content_workshops: true },
      theme_slugs: ["influencer-trip", "cultural-exploration"],
    },
    {
      title: "Yoga & Wellness Retreat - Rishikesh",
      slug: "yoga-wellness-retreat-rishikesh",
      location: "Rishikesh, Uttarakhand",
      description: "Rejuvenate your mind and body with daily yoga sessions, meditation, spa treatments, and healthy organic meals by the Ganges.",
      duration_days: 6,
      duration_nights: 5,
      start_date: "2025-05-01",
      end_date: "2025-05-06",
      price_per_person: 19999,
      original_price: 26999,
      currency: "INR",
      min_people: 8,
      max_people: 20,
      spots_total: 20,
      spots_available: 15,
      rating: 5.0,
      review_count: 124,
      images: [
        { url: "https://images.unsplash.com/photo-1545389336-cf090694435e", alt: "Yoga session" },
        { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", alt: "Meditation" },
      ],
      tags: ["Wellness", "Yoga", "Spa"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: { includes_yoga: true, spa_treatments: true },
      theme_slugs: ["wellness-retreat"],
    },
    {
      title: "Adventure Sports Expedition - Leh Ladakh",
      slug: "adventure-sports-expedition-leh-ladakh",
      location: "Leh Ladakh, Jammu & Kashmir",
      description: "The ultimate adventure with mountain biking, trekking, river crossing, and camping in the world's most stunning landscapes.",
      duration_days: 10,
      duration_nights: 9,
      start_date: "2025-06-10",
      end_date: "2025-06-19",
      price_per_person: 42999,
      original_price: 54999,
      currency: "INR",
      min_people: 10,
      max_people: 25,
      spots_total: 25,
      spots_available: 20,
      rating: 4.8,
      review_count: 78,
      images: [
        { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", alt: "Mountain landscape" },
        { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", alt: "Trekking" },
      ],
      tags: ["Adventure", "Extreme", "Sports"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: { difficulty_level: "hard", adventure_activities: true },
      theme_slugs: ["adventure-sports"],
    },
    {
      title: "Family Beach Vacation - Andaman",
      slug: "family-beach-vacation-andaman",
      location: "Port Blair, Andaman & Nicobar Islands",
      description: "Perfect family getaway with pristine beaches, water sports, island hopping, and activities suitable for all age groups.",
      duration_days: 7,
      duration_nights: 6,
      start_date: "2025-08-01",
      end_date: "2025-08-07",
      price_per_person: 38999,
      original_price: 48999,
      currency: "INR",
      min_people: 4,
      max_people: 20,
      spots_total: 20,
      spots_available: 12,
      rating: 4.9,
      review_count: 145,
      images: [
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", alt: "Beach view" },
        { url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1", alt: "Water sports" },
      ],
      tags: ["Family Friendly", "All Ages", "Safe"],
      is_active: true,
      is_featured: true,
      category: "Family",
      metadata: { family_friendly: true, kid_activities: true },
      theme_slugs: ["family-vacation"],
    },
    {
      title: "Luxury Couples Retreat - Kerala",
      slug: "luxury-couples-retreat-kerala",
      location: "Alleppey & Munnar, Kerala",
      description: "An exclusive romantic escape featuring houseboat stays, candlelight dinners, spa treatments, and private tea estate tours.",
      duration_days: 5,
      duration_nights: 4,
      start_date: "2025-09-10",
      end_date: "2025-09-14",
      price_per_person: 45999,
      original_price: 59999,
      currency: "INR",
      min_people: 2,
      max_people: 10,
      spots_total: 10,
      spots_available: 3,
      rating: 5.0,
      review_count: 87,
      images: [
        { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07", alt: "Houseboat" },
        { url: "https://images.unsplash.com/photo-1602216056026-ca2afdd3b5d1", alt: "Tea estate" },
      ],
      tags: ["Luxury", "Premium", "Exclusive"],
      is_active: true,
      is_featured: true,
      category: "Couples",
      metadata: { luxury_level: "premium", romantic: true },
      theme_slugs: ["luxury-experience", "wellness-retreat"],
    },
    {
      title: "AI Startup Networking Tour - Bangalore",
      slug: "ai-startup-networking-tour-bangalore",
      location: "Bangalore, Karnataka",
      description: "Connect with AI founders, visit tech hubs, attend innovation sessions, and network with the startup ecosystem in India's Silicon Valley.",
      duration_days: 4,
      duration_nights: 3,
      start_date: "2025-04-15",
      end_date: "2025-04-18",
      price_per_person: 24999,
      original_price: 31999,
      currency: "INR",
      min_people: 15,
      max_people: 35,
      spots_total: 35,
      spots_available: 22,
      rating: 4.6,
      review_count: 34,
      images: [
        { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd", alt: "Tech workspace" },
        { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", alt: "Networking event" },
      ],
      tags: ["Tech Hub", "Innovation", "Networking"],
      is_active: true,
      is_featured: false,
      category: "Mixed",
      metadata: { startup_visits: true, networking_events: true },
      theme_slugs: ["ai-startup-enthusiast", "corporate-retreat"],
    },
  ];
  
  // Insert packages
  const { data: insertedPackages, error: packagesError } = await supabase
    .from("travel_packages")
    .upsert(
      samplePackages.map((pkg) => {
        const { theme_slugs, ...packageData } = pkg;
        return packageData;
      }),
      { onConflict: "slug" }
    )
    .select();
  
  if (packagesError) {
    log(`❌ Error seeding packages: ${packagesError.message}`, colors.red);
    return false;
  }
  
  log(`✅ Seeded ${insertedPackages.length} packages`, colors.green);
  
  // Create theme mappings
  log("🔗 Creating theme mappings...", colors.cyan);
  
  for (let i = 0; i < samplePackages.length; i++) {
    const pkg = samplePackages[i];
    const insertedPkg = insertedPackages.find((p: any) => p.slug === pkg.slug);
    
    if (insertedPkg && pkg.theme_slugs) {
      const mappings = pkg.theme_slugs.map((themeSlug, index) => ({
        package_id: insertedPkg.id,
        theme_id: getThemeId(themeSlug),
        is_primary: index === 0,
      }));
      
      const { error: mappingError } = await supabase
        .from("package_theme_mappings")
        .upsert(mappings, { onConflict: "package_id,theme_id" });
      
      if (mappingError) {
        log(`⚠️  Error creating mappings for ${pkg.title}`, colors.yellow);
      }
    }
  }
  
  log("✅ Theme mappings created", colors.green);
  return true;
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  log("\n╔════════════════════════════════════════════════════════════════╗", colors.bright);
  log("║                                                                ║", colors.bright);
  log("║            🌱 Seeding Sample Data 🌱                          ║", colors.bright);
  log("║                                                                ║", colors.bright);
  log("╚════════════════════════════════════════════════════════════════╝", colors.bright);
  
  const success = await seedPackages();
  
  if (success) {
    log("\n✨ Sample data seeded successfully! ✨", colors.green + colors.bright);
    log("\n📌 Next Steps:", colors.cyan);
    log("   1. Visit: http://localhost:3000/packages", colors.cyan);
    log("   2. Try filtering by themes", colors.cyan);
    log("   3. Test the booking flow", colors.cyan);
  } else {
    log("\n❌ Seeding failed. Check errors above.", colors.red);
  }
  
  log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    log(`\n❌ Error: ${error.message}`, colors.red);
    process.exit(1);
  });
