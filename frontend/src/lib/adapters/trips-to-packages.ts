// ============================================================================
// Adapter: Convert TRIPS constant to TravelPackageWithThemes format
// ============================================================================

import { Trip } from "@/constants/trip-data";
import {
  TravelPackageWithThemes,
  PackageTheme,
  PackageThemeInfo,
} from "@/types/packages";

// ============================================================================
// Mock Theme Data
// ============================================================================

export const MOCK_THEMES: PackageTheme[] = [
  {
    id: "romantic",
    name: "Romantic Getaway",
    slug: "romantic",
    description: "Perfect for couples seeking intimate moments",
    icon: "heart",
    color: "#FF6B9D",
    display_order: 1,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "adventure",
    name: "Adventure",
    slug: "adventure",
    description: "Thrilling experiences for adventure seekers",
    icon: "mountain",
    color: "#FF8C42",
    display_order: 2,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "girls-trip",
    name: "Girls Trip",
    slug: "girls-trip",
    description: "Safe and fun trips for girl squads",
    icon: "users",
    color: "#C77DFF",
    display_order: 3,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "boys-trip",
    name: "Boys Trip",
    slug: "boys-trip",
    description: "Brotherhood and adventure combined",
    icon: "users",
    color: "#4361EE",
    display_order: 4,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "nye-special",
    name: "New Year Special",
    slug: "nye-special",
    description: "Ring in the new year in style",
    icon: "sparkles",
    color: "#FFD60A",
    display_order: 5,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "budget-friendly",
    name: "Budget Friendly",
    slug: "budget-friendly",
    description: "Amazing experiences without breaking the bank",
    icon: "dollar-sign",
    color: "#06D6A0",
    display_order: 6,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "weekend-getaway",
    name: "Weekend Getaway",
    slug: "weekend-getaway",
    description: "Quick escapes for busy professionals",
    icon: "calendar",
    color: "#118AB2",
    display_order: 7,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "spiritual",
    name: "Spiritual Journey",
    slug: "spiritual",
    description: "Divine experiences and sacred pilgrimages",
    icon: "sparkles",
    color: "#F59E0B",
    display_order: 8,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mahakumbh",
    name: "Mahakumbh 2025",
    slug: "mahakumbh",
    description: "Once-in-a-lifetime spiritual congregation",
    icon: "star",
    color: "#EF4444",
    display_order: 9,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "romantic-escape",
    name: "Romantic Escape",
    slug: "romantic-escape",
    description: "Create unforgettable moments together",
    icon: "heart",
    color: "#EC4899",
    display_order: 10,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "photography",
    name: "Photography & Content",
    slug: "photography",
    description: "Capture India's most photogenic landscapes",
    icon: "camera",
    color: "#8B5CF6",
    display_order: 11,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "corporate-retreat",
    name: "Corporate Retreat",
    slug: "corporate-retreat",
    description: "Elevate your team with strategic retreats",
    icon: "briefcase",
    color: "#3B82F6",
    display_order: 12,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cultural-arts",
    name: "Theater & Arts",
    slug: "cultural-arts",
    description: "Immerse in India's cultural heartbeat",
    icon: "palette",
    color: "#F59E0B",
    display_order: 13,
    is_active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extract duration days from "3 Days / 2 Nights" format
 */
function parseDuration(duration: string): {
  days: number;
  nights: number;
} {
  const daysMatch = duration.match(/(\d+)\s*Days?/i);
  const nightsMatch = duration.match(/(\d+)\s*Nights?/i);

  const days = daysMatch ? parseInt(daysMatch[1]) : 3;
  const nights = nightsMatch ? parseInt(nightsMatch[1]) : days - 1;

  return { days, nights };
}

/**
 * Parse date string like "Dec 22" to ISO date for current/next year
 */
function parseStartDate(dateStr: string): string {
  try {
    const currentYear = new Date().getFullYear();
    const date = new Date(`${dateStr}, ${currentYear}`);
    
    // If date is in the past, use next year
    if (date < new Date()) {
      date.setFullYear(currentYear + 1);
    }
    
    return date.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

/**
 * Infer themes from trip tags and category
 */
function inferThemesFromTrip(trip: Trip): PackageThemeInfo[] {
  const themes: PackageThemeInfo[] = [];

  // Map category to theme
  if (trip.category === "Couples") {
    themes.push({
      id: "romantic",
      name: "Romantic Getaway",
      slug: "romantic",
      icon: "heart",
      color: "#FF6B9D",
      is_primary: true,
    });
  } else if (trip.category === "Girls Only") {
    themes.push({
      id: "girls-trip",
      name: "Girls Trip",
      slug: "girls-trip",
      icon: "users",
      color: "#C77DFF",
      is_primary: true,
    });
  } else if (trip.category === "Boys Only") {
    themes.push({
      id: "boys-trip",
      name: "Boys Trip",
      slug: "boys-trip",
      icon: "users",
      color: "#4361EE",
      is_primary: true,
    });
  }

  // Check tags for additional themes
  const tagsLower = trip.tags.map((t) => t.toLowerCase());

  if (
    tagsLower.some((t) =>
      t.includes("adventure") || t.includes("trek") || t.includes("mountain")
    )
  ) {
    themes.push({
      id: "adventure",
      name: "Adventure",
      slug: "adventure",
      icon: "mountain",
      color: "#FF8C42",
      is_primary: false,
    });
  }

  if (tagsLower.some((t) => t.includes("nye") || t.includes("new year"))) {
    themes.push({
      id: "nye-special",
      name: "New Year Special",
      slug: "nye-special",
      icon: "sparkles",
      color: "#FFD60A",
      is_primary: false,
    });
  }

  if (tagsLower.some((t) => t.includes("budget"))) {
    themes.push({
      id: "budget-friendly",
      name: "Budget Friendly",
      slug: "budget-friendly",
      icon: "dollar-sign",
      color: "#06D6A0",
      is_primary: false,
    });
  }

  if (tagsLower.some((t) => t.includes("weekend"))) {
    themes.push({
      id: "weekend-getaway",
      name: "Weekend Getaway",
      slug: "weekend-getaway",
      icon: "calendar",
      color: "#118AB2",
      is_primary: false,
    });
  }

  if (tagsLower.some((t) => t.includes("spiritual") || t.includes("pilgrimage") || t.includes("temple"))) {
    themes.push({
      id: "spiritual",
      name: "Spiritual Journey",
      slug: "spiritual",
      icon: "sparkles",
      color: "#F59E0B",
      is_primary: false,
    });
  }

  if (tagsLower.some((t) => t.includes("mahakumbh") || t.includes("kumbh"))) {
    themes.push({
      id: "mahakumbh",
      name: "Mahakumbh 2025",
      slug: "mahakumbh",
      icon: "star",
      color: "#EF4444",
      is_primary: true,
    });
  }

  if (tagsLower.some((t) => t.includes("romantic escape") || t.includes("valentine") || t.includes("romance"))) {
    themes.push({
      id: "romantic-escape",
      name: "Romantic Escape",
      slug: "romantic-escape",
      icon: "heart",
      color: "#EC4899",
      is_primary: true,
    });
  }

  if (tagsLower.some((t) => t.includes("photography") || t.includes("content creation") || t.includes("photo"))) {
    themes.push({
      id: "photography",
      name: "Photography & Content",
      slug: "photography",
      icon: "camera",
      color: "#8B5CF6",
      is_primary: true,
    });
  }

  if (tagsLower.some((t) => t.includes("corporate retreat") || t.includes("team building") || t.includes("leadership"))) {
    themes.push({
      id: "corporate-retreat",
      name: "Corporate Retreat",
      slug: "corporate-retreat",
      icon: "briefcase",
      color: "#3B82F6",
      is_primary: true,
    });
  }

  if (tagsLower.some((t) => t.includes("cultural arts") || t.includes("theater") || t.includes("performance") || t.includes("classical"))) {
    themes.push({
      id: "cultural-arts",
      name: "Theater & Arts",
      slug: "cultural-arts",
      icon: "palette",
      color: "#F59E0B",
      is_primary: true,
    });
  }

  // If no themes assigned, add a default based on category
  if (themes.length === 0) {
    themes.push({
      id: "weekend-getaway",
      name: "Weekend Getaway",
      slug: "weekend-getaway",
      icon: "calendar",
      color: "#118AB2",
      is_primary: true,
    });
  }

  return themes;
}

/**
 * Determine if package is featured based on tags
 */
function isFeatured(trip: Trip): boolean {
  const featuredKeywords = [
    "weekend favourite",
    "selling fast",
    "almost full",
    "limited seats",
  ];
  return trip.tags.some((tag) =>
    featuredKeywords.some((keyword) =>
      tag.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

// ============================================================================
// Main Conversion Function
// ============================================================================

/**
 * Convert Trip to TravelPackageWithThemes format
 */
export function convertTripToPackage(trip: Trip): TravelPackageWithThemes {
  const { days, nights } = parseDuration(trip.duration);
  const startDate = parseStartDate(trip.startDate);

  return {
    id: trip.id,
    title: trip.title,
    slug: trip.id,
    location: trip.location,
    description: trip.description,
    duration_days: days,
    duration_nights: nights,
    start_date: startDate,
    end_date: null, // Can be calculated if needed
    price_per_person: trip.price,
    original_price: trip.originalPrice || null,
    currency: "INR",
    min_people: 1,
    max_people: trip.totalSpots,
    spots_total: trip.totalSpots,
    spots_available: trip.spotsLeft,
    rating: trip.rating,
    review_count: trip.reviews,
    images: [
      {
        url: trip.image,
        alt: trip.title,
        caption: trip.location,
        order: 1,
      },
    ],
    tags: trip.tags,
    is_active: true,
    is_featured: isFeatured(trip),
    category: trip.category,
    metadata: {
      packageType: trip.packageType,
      startDateDisplay: trip.startDate,
      endDateDisplay: trip.endDate,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    themes: inferThemesFromTrip(trip),
  };
}

/**
 * Convert all TRIPS to packages
 */
export function convertAllTripsToPackages(
  trips: Trip[]
): TravelPackageWithThemes[] {
  return trips.map(convertTripToPackage);
}

/**
 * Get mock themes
 */
export function getMockThemes(): PackageTheme[] {
  return MOCK_THEMES;
}
