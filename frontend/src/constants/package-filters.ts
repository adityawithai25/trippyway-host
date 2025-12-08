// ============================================================================
// Package Filter Constants and Configurations
// ============================================================================

import {
  DayRangeOption,
  DayRangeValue,
  SortOptionConfig,
  SortOption,
  ThemeConfig,
  PackageCategory,
} from "@/types/packages";
import {
  Briefcase,
  GraduationCap,
  Camera,
  Palette,
  Sparkles,
  Heart,
  Mountain,
  Compass,
  Users,
  Zap,
} from "lucide-react";

// ============================================================================
// Day Range Options
// ============================================================================

export const DAY_RANGE_OPTIONS: DayRangeOption[] = [
  {
    value: "1-3",
    label: "1-3 Days",
    description: "Weekend Getaways",
    minDays: 1,
    maxDays: 3,
  },
  {
    value: "4-7",
    label: "4-7 Days",
    description: "Week-long Trips",
    minDays: 4,
    maxDays: 7,
  },
  {
    value: "8-15",
    label: "8-15 Days",
    description: "Extended Vacations",
    minDays: 8,
    maxDays: 15,
  },
  {
    value: "15+",
    label: "15+ Days",
    description: "Long Adventures",
    minDays: 15,
    maxDays: null,
  },
];

export function getDayRangeOption(
  value: DayRangeValue
): DayRangeOption | undefined {
  return DAY_RANGE_OPTIONS.find((option) => option.value === value);
}

export function getDayRangeFromDays(days: number): DayRangeValue | null {
  if (days >= 1 && days <= 3) return "1-3";
  if (days >= 4 && days <= 7) return "4-7";
  if (days >= 8 && days <= 15) return "8-15";
  if (days >= 15) return "15+";
  return null;
}

// ============================================================================
// Theme Configurations
// ============================================================================

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    slug: "corporate-retreat",
    name: "Corporate Retreat",
    description: "Team building, conferences, workshops, and corporate events",
    icon: "briefcase",
    color: "#3B82F6", // Blue
    defaultTags: ["Team Building", "Professional", "Workshops"],
  },
  {
    slug: "college-trip",
    name: "College Trip",
    description: "Budget-friendly adventures perfect for students",
    icon: "graduation-cap",
    color: "#10B981", // Green
    defaultTags: ["Budget Friendly", "Student Special", "Group Fun"],
  },
  {
    slug: "influencer-trip",
    name: "Influencer Trip",
    description: "Instagram-worthy locations perfect for content creation",
    icon: "camera",
    color: "#EC4899", // Pink
    defaultTags: ["Instagram Worthy", "Photo Ops", "Content Creation"],
  },
  {
    slug: "designer-editor-trip",
    name: "Designer & Editor Trip",
    description: "Creative inspiration from aesthetic locations",
    icon: "palette",
    color: "#8B5CF6", // Purple
    defaultTags: ["Creative", "Aesthetic", "Inspiration"],
  },
  {
    slug: "ai-startup-enthusiast",
    name: "AI Startup Enthusiast",
    description: "Tech hubs, innovation centers, and networking opportunities",
    icon: "zap",
    color: "#F59E0B", // Amber
    defaultTags: ["Tech Hub", "Innovation", "Networking"],
  },
  {
    slug: "wellness-retreat",
    name: "Wellness Retreat",
    description: "Rejuvenate with yoga, meditation, and spa experiences",
    icon: "heart",
    color: "#14B8A6", // Teal
    defaultTags: ["Wellness", "Yoga", "Spa"],
  },
  {
    slug: "adventure-sports",
    name: "Adventure Sports",
    description: "Thrilling activities for adrenaline junkies",
    icon: "mountain",
    color: "#EF4444", // Red
    defaultTags: ["Adventure", "Extreme", "Sports"],
  },
  {
    slug: "cultural-exploration",
    name: "Cultural Exploration",
    description: "Immerse in local culture, history, and traditions",
    icon: "compass",
    color: "#F97316", // Orange
    defaultTags: ["Culture", "Heritage", "Local Experience"],
  },
  {
    slug: "family-vacation",
    name: "Family Vacation",
    description: "Family-friendly destinations with activities for all ages",
    icon: "users",
    color: "#06B6D4", // Cyan
    defaultTags: ["Family Friendly", "All Ages", "Safe"],
  },
  {
    slug: "luxury-experience",
    name: "Luxury Experience",
    description: "Premium stays and exclusive experiences",
    icon: "sparkles",
    color: "#A855F7", // Violet
    defaultTags: ["Luxury", "Premium", "Exclusive"],
  },
];

export function getThemeConfig(slug: string): ThemeConfig | undefined {
  return THEME_CONFIGS.find((theme) => theme.slug === slug);
}

export function getThemeIcon(iconName: string) {
  const iconMap: Record<string, any> = {
    briefcase: Briefcase,
    "graduation-cap": GraduationCap,
    camera: Camera,
    palette: Palette,
    sparkles: Sparkles,
    heart: Heart,
    mountain: Mountain,
    compass: Compass,
    users: Users,
    zap: Zap,
  };

  return iconMap[iconName] || Compass;
}

// ============================================================================
// Sort Options
// ============================================================================

export const SORT_OPTIONS: SortOptionConfig[] = [
  {
    value: "featured",
    label: "Featured",
    description: "Our top picks and featured packages",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
    description: "Most affordable packages first",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
    description: "Premium packages first",
  },
  {
    value: "rating",
    label: "Highest Rated",
    description: "Best reviewed packages first",
  },
  {
    value: "popularity",
    label: "Most Popular",
    description: "Based on bookings and views",
  },
  {
    value: "newest",
    label: "Newest First",
    description: "Recently added packages",
  },
];

export function getSortOption(value: SortOption): SortOptionConfig | undefined {
  return SORT_OPTIONS.find((option) => option.value === value);
}

// ============================================================================
// Category Options
// ============================================================================

export const CATEGORY_OPTIONS: PackageCategory[] = [
  "Couples",
  "Girls Only",
  "Boys Only",
  "Mixed",
  "Family",
];

export const CATEGORY_LABELS: Record<PackageCategory, string> = {
  Couples: "Couples Only",
  "Girls Only": "Girls Only",
  "Boys Only": "Boys Only",
  Mixed: "Mixed Groups",
  Family: "Family Friendly",
};

export const CATEGORY_DESCRIPTIONS: Record<PackageCategory, string> = {
  Couples: "Romantic getaways for couples",
  "Girls Only": "Safe and fun trips exclusively for women",
  "Boys Only": "Brotherhood adventures for men",
  Mixed: "Open to everyone, meet new people",
  Family: "Perfect for families with all age groups",
};

// ============================================================================
// Price Range Presets
// ============================================================================

export const PRICE_RANGE_PRESETS = [
  { label: "Budget", min: 0, max: 5000 },
  { label: "Mid-Range", min: 5000, max: 15000 },
  { label: "Premium", min: 15000, max: 30000 },
  { label: "Luxury", min: 30000, max: null },
];

// ============================================================================
// Filter Utility Functions
// ============================================================================

export function formatDuration(days: number, nights: number): string {
  if (days === 1) {
    return "1 Day";
  }
  if (nights === 0) {
    return `${days} Days`;
  }
  return `${days} Days / ${nights} Nights`;
}

export function formatPrice(
  price: number,
  currency: string = "INR"
): string {
  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${price.toLocaleString()}`;
}

export function calculateDiscount(
  price: number,
  originalPrice: number | null
): number | null {
  if (!originalPrice || originalPrice <= price) {
    return null;
  }

  const discount = ((originalPrice - price) / originalPrice) * 100;
  return Math.round(discount);
}

export function getAvailabilityStatus(
  spotsAvailable: number,
  spotsTotal: number
): "available" | "limited" | "full" {
  if (spotsAvailable === 0) {
    return "full";
  }

  const percentAvailable = (spotsAvailable / spotsTotal) * 100;

  if (percentAvailable <= 20) {
    return "limited";
  }

  return "available";
}

export function getAvailabilityLabel(
  status: "available" | "limited" | "full"
): string {
  const labels = {
    available: "Available",
    limited: "Limited Seats",
    full: "Sold Out",
  };

  return labels[status];
}

export function getAvailabilityColor(
  status: "available" | "limited" | "full"
): string {
  const colors = {
    available: "green",
    limited: "orange",
    full: "red",
  };

  return colors[status];
}

// ============================================================================
// URL Query Parameter Keys
// ============================================================================

export const FILTER_QUERY_KEYS = {
  themes: "themes", // comma-separated slugs
  days: "days", // day range value
  minPrice: "min_price",
  maxPrice: "max_price",
  category: "category",
  search: "q",
  sort: "sort",
  featured: "featured",
  available: "available",
  page: "page",
} as const;

// ============================================================================
// Default Filter Values
// ============================================================================

export const DEFAULT_FILTERS = {
  themes: [],
  dayRange: null,
  minPrice: null,
  maxPrice: null,
  category: null,
  searchTerm: "",
  sortBy: "featured" as SortOption,
  showFeaturedOnly: false,
  showAvailableOnly: false,
};

export const DEFAULT_PAGE_SIZE = 12;

// ============================================================================
// Tag Colors and Styles - Professional & Subtle
// ============================================================================

export const TAG_COLORS: Record<string, string> = {
  "Weekend favourite": "bg-white/95 text-gray-700 border border-gray-200",
  "Couples Only": "bg-white/95 text-gray-700 border border-gray-200",
  "Girls Only": "bg-white/95 text-gray-700 border border-gray-200",
  "Boys Only": "bg-white/95 text-gray-700 border border-gray-200",
  "Mixed Group": "bg-white/95 text-gray-700 border border-gray-200",
  "Safe Travel": "bg-white/95 text-gray-700 border border-gray-200",
  "Almost Full": "bg-white/95 text-gray-700 border border-gray-200",
  "Budget Friendly": "bg-white/95 text-gray-700 border border-gray-200",
  "Selling Fast": "bg-white/95 text-gray-700 border border-gray-200",
  Party: "bg-white/95 text-gray-700 border border-gray-200",
  Adventure: "bg-white/95 text-gray-700 border border-gray-200",
  "Limited Seats": "bg-white/95 text-gray-700 border border-gray-200",
  Available: "bg-white/95 text-gray-700 border border-gray-200",
  "Mahakumbh 2025": "bg-white/95 text-orange-700 border border-orange-300",
  Spiritual: "bg-white/95 text-amber-700 border border-amber-300",
  "Complete Circuit": "bg-white/95 text-purple-700 border border-purple-300",
  "Mauni Amavasya": "bg-white/95 text-red-700 border border-red-300",
  "Quick Trip": "bg-white/95 text-blue-700 border border-blue-300",
  Luxury: "bg-white/95 text-violet-700 border border-violet-300",
  "Family Friendly": "bg-white/95 text-green-700 border border-green-300",
  "Romantic Escape": "bg-white/95 text-pink-700 border border-pink-300",
  "Valentine Special": "bg-white/95 text-rose-700 border border-rose-300",
  "Mountain Romance": "bg-white/95 text-purple-700 border border-purple-300",
  Photography: "bg-white/95 text-violet-700 border border-violet-300",
  "Content Creation": "bg-white/95 text-indigo-700 border border-indigo-300",
  Heritage: "bg-white/95 text-amber-700 border border-amber-300",
  "Corporate Retreat": "bg-white/95 text-blue-700 border border-blue-300",
  "Team Building": "bg-white/95 text-sky-700 border border-sky-300",
  Leadership: "bg-white/95 text-cyan-700 border border-cyan-300",
  Innovation: "bg-white/95 text-teal-700 border border-teal-300",
  "Cultural Arts": "bg-white/95 text-orange-700 border border-orange-300",
  Theater: "bg-white/95 text-amber-700 border border-amber-300",
  "Classical Performance": "bg-white/95 text-yellow-700 border border-yellow-300",
  default: "bg-white/95 text-gray-700 border border-gray-200",
};

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}

// ============================================================================
// Responsive Breakpoints for Filters
// ============================================================================

export const FILTER_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
} as const;

// ============================================================================
// Animation Durations
// ============================================================================

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

