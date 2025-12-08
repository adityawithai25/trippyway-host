// ============================================================================
// Seed Data for Theme-Based Packages
// ============================================================================
// This script seeds the database with sample themes and packages
// Run this file to populate your Supabase database with initial data

import { createClient } from "./server";
import { THEME_CONFIGS } from "@/constants/package-filters";

// ============================================================================
// Theme Seed Data
// ============================================================================

export async function seedThemes() {
  const supabase = await createClient();

  console.log("🌱 Seeding themes...");

  const themes = THEME_CONFIGS.map((config, index) => ({
    name: config.name,
    slug: config.slug,
    description: config.description,
    icon: config.icon,
    color: config.color,
    display_order: index,
    is_active: true,
    metadata: {
      default_tags: config.defaultTags,
    },
  }));

  const { data, error } = await supabase
    .from("package_themes")
    .upsert(themes, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("❌ Error seeding themes:", error);
    return null;
  }

  console.log(`✅ Seeded ${data.length} themes`);
  return data;
}

// ============================================================================
// Package Seed Data
// ============================================================================

export async function seedPackages() {
  const supabase = await createClient();

  console.log("🌱 Seeding packages...");

  // First, get all themes
  const { data: themes } = await supabase
    .from("package_themes")
    .select("id, slug");

  if (!themes || themes.length === 0) {
    console.error("❌ No themes found. Please seed themes first.");
    return;
  }

  const getThemeId = (slug: string) =>
    themes.find((t) => t.slug === slug)?.id;

  // Sample packages with diverse themes
  const samplePackages = [
    {
      title: "Corporate Leadership Retreat - Manali",
      slug: "corporate-leadership-retreat-manali",
      location: "Manali, Himachal Pradesh",
      description:
        "A transformative 4-day corporate retreat focused on leadership development, team building, and strategic planning amidst the scenic Himalayas.",
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
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
      ],
      tags: ["Team Building", "Professional", "Workshops"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: {
        includes_conference_room: true,
        max_group_size: 50,
      },
      theme_slugs: ["corporate-retreat"],
    },
    {
      title: "College Adventure Trek - Rishikesh",
      slug: "college-adventure-trek-rishikesh",
      location: "Rishikesh, Uttarakhand",
      description:
        "An action-packed 3-day college trip with river rafting, camping, bonfires, and adventure activities perfect for students.",
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
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      ],
      tags: ["Budget Friendly", "Adventure", "Student Special"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: {
        student_discount: true,
      },
      theme_slugs: ["college-trip", "adventure-sports"],
    },
    {
      title: "Instagram Influencer Retreat - Jaipur",
      slug: "instagram-influencer-retreat-jaipur",
      location: "Jaipur, Rajasthan",
      description:
        "Explore the pink city's most photogenic locations with professional photography guidance, content creation workshops, and luxury stays.",
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
        "https://images.unsplash.com/photo-1599661046289-e31897846e41",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245",
      ],
      tags: ["Instagram Worthy", "Photo Ops", "Content Creation"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: {
        includes_photographer: true,
        content_workshops: true,
      },
      theme_slugs: ["influencer-trip", "cultural-exploration"],
    },
    {
      title: "Designer's Creative Escape - Goa",
      slug: "designers-creative-escape-goa",
      location: "Goa",
      description:
        "A week-long creative retreat for designers and editors featuring design workshops, beachside brainstorming, and inspiration sessions.",
      duration_days: 7,
      duration_nights: 6,
      start_date: "2025-04-05",
      end_date: "2025-04-11",
      price_per_person: 28999,
      original_price: 35999,
      currency: "INR",
      min_people: 10,
      max_people: 25,
      spots_total: 25,
      spots_available: 18,
      rating: 4.9,
      review_count: 67,
      images: [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
      ],
      tags: ["Creative", "Aesthetic", "Inspiration"],
      is_active: true,
      is_featured: false,
      category: "Mixed",
      metadata: {
        design_workshops: true,
        creative_sessions: true,
      },
      theme_slugs: ["designer-editor-trip", "wellness-retreat"],
    },
    {
      title: "AI Startup Networking Tour - Bangalore",
      slug: "ai-startup-networking-tour-bangalore",
      location: "Bangalore, Karnataka",
      description:
        "Connect with AI founders, visit tech hubs, attend innovation sessions, and network with the startup ecosystem in India's Silicon Valley.",
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
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      ],
      tags: ["Tech Hub", "Innovation", "Networking"],
      is_active: true,
      is_featured: false,
      category: "Mixed",
      metadata: {
        startup_visits: true,
        networking_events: true,
      },
      theme_slugs: ["ai-startup-enthusiast", "corporate-retreat"],
    },
    {
      title: "Yoga & Wellness Retreat - Rishikesh",
      slug: "yoga-wellness-retreat-rishikesh",
      location: "Rishikesh, Uttarakhand",
      description:
        "Rejuvenate your mind and body with daily yoga sessions, meditation, spa treatments, and healthy organic meals by the Ganges.",
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
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      ],
      tags: ["Wellness", "Yoga", "Spa"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: {
        includes_yoga: true,
        spa_treatments: true,
      },
      theme_slugs: ["wellness-retreat"],
    },
    {
      title: "Adventure Sports Expedition - Leh Ladakh",
      slug: "adventure-sports-expedition-leh-ladakh",
      location: "Leh Ladakh, Jammu & Kashmir",
      description:
        "The ultimate adventure with mountain biking, trekking, river crossing, and camping in the world's most stunning landscapes.",
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
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      ],
      tags: ["Adventure", "Extreme", "Sports"],
      is_active: true,
      is_featured: true,
      category: "Mixed",
      metadata: {
        difficulty_level: "hard",
        adventure_activities: true,
      },
      theme_slugs: ["adventure-sports"],
    },
    {
      title: "Cultural Heritage Tour - Rajasthan",
      slug: "cultural-heritage-tour-rajasthan",
      location: "Jaipur, Udaipur, Jodhpur",
      description:
        "Immerse yourself in Rajasthan's rich culture, visit magnificent forts and palaces, experience local traditions, and enjoy authentic cuisine.",
      duration_days: 8,
      duration_nights: 7,
      start_date: "2025-07-15",
      end_date: "2025-07-22",
      price_per_person: 34999,
      original_price: 44999,
      currency: "INR",
      min_people: 12,
      max_people: 30,
      spots_total: 30,
      spots_available: 25,
      rating: 4.7,
      review_count: 102,
      images: [
        "https://images.unsplash.com/photo-1477587458883-47145ed94245",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      ],
      tags: ["Culture", "Heritage", "Local Experience"],
      is_active: true,
      is_featured: false,
      category: "Family",
      metadata: {
        heritage_sites: true,
        cultural_experiences: true,
      },
      theme_slugs: ["cultural-exploration"],
    },
    {
      title: "Family Beach Vacation - Andaman",
      slug: "family-beach-vacation-andaman",
      location: "Port Blair, Andaman & Nicobar Islands",
      description:
        "Perfect family getaway with pristine beaches, water sports, island hopping, and activities suitable for all age groups.",
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
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      ],
      tags: ["Family Friendly", "All Ages", "Safe"],
      is_active: true,
      is_featured: true,
      category: "Family",
      metadata: {
        family_friendly: true,
        kid_activities: true,
      },
      theme_slugs: ["family-vacation"],
    },
    {
      title: "Luxury Couples Retreat - Kerala",
      slug: "luxury-couples-retreat-kerala",
      location: "Alleppey & Munnar, Kerala",
      description:
        "An exclusive romantic escape featuring houseboat stays, candlelight dinners, spa treatments, and private tea estate tours.",
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
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07",
        "https://images.unsplash.com/photo-1602216056026-ca2afdd3b5d1",
      ],
      tags: ["Luxury", "Premium", "Exclusive"],
      is_active: true,
      is_featured: true,
      category: "Couples",
      metadata: {
        luxury_level: "premium",
        romantic: true,
      },
      theme_slugs: ["luxury-experience", "wellness-retreat"],
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
    console.error("❌ Error seeding packages:", packagesError);
    return;
  }

  console.log(`✅ Seeded ${insertedPackages.length} packages`);

  // Create theme mappings
  console.log("🔗 Creating theme mappings...");

  for (let i = 0; i < samplePackages.length; i++) {
    const pkg = samplePackages[i];
    const insertedPkg = insertedPackages.find((p) => p.slug === pkg.slug);

    if (insertedPkg && pkg.theme_slugs) {
      const mappings = pkg.theme_slugs.map((themeSlug, index) => ({
        package_id: insertedPkg.id,
        theme_id: getThemeId(themeSlug),
        is_primary: index === 0, // First theme is primary
      }));

      const { error: mappingError } = await supabase
        .from("package_theme_mappings")
        .upsert(mappings, { onConflict: "package_id,theme_id" });

      if (mappingError) {
        console.error(
          `❌ Error creating mappings for ${pkg.title}:`,
          mappingError
        );
      }
    }
  }

  console.log("✅ Theme mappings created");

  return insertedPackages;
}

// ============================================================================
// Main Seed Function
// ============================================================================

export async function seedDatabase() {
  console.log("🚀 Starting database seeding...\n");

  try {
    // Seed themes first
    const themes = await seedThemes();
    if (!themes) {
      throw new Error("Failed to seed themes");
    }

    console.log("\n");

    // Then seed packages
    const packages = await seedPackages();
    if (!packages) {
      throw new Error("Failed to seed packages");
    }

    console.log("\n✨ Database seeding completed successfully!");
    return { themes, packages };
  } catch (error) {
    console.error("\n❌ Database seeding failed:", error);
    throw error;
  }
}

// ============================================================================
// Run seed if executed directly
// ============================================================================

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("\n✅ Seeding finished");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Seeding error:", error);
      process.exit(1);
    });
}

