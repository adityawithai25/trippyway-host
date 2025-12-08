// ============================================================================
// Theme-Based Travel Package Types
// ============================================================================

// ============================================================================
// Database Types (matching Supabase schema)
// ============================================================================

export interface PackageTheme {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  display_order: number;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  location: string;
  description: string | null;
  duration_days: number;
  duration_nights: number;
  start_date: string | null;
  end_date: string | null;
  price_per_person: number;
  original_price: number | null;
  currency: string;
  min_people: number;
  max_people: number | null;
  spots_total: number;
  spots_available: number;
  rating: number;
  review_count: number;
  images: PackageImage[];
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  category: PackageCategory | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PackageThemeMapping {
  id: string;
  package_id: string;
  theme_id: string;
  is_primary: boolean;
  created_at: string;
}

export interface PackageItinerary {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string | null;
  activities: Activity[];
  meals_included: MealType[];
  accommodation_details: string | null;
  images: PackageImage[];
  created_at: string;
  updated_at: string;
}

export interface PackageInclusion {
  id: string;
  package_id: string;
  type: "included" | "excluded";
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

// ============================================================================
// Supporting Types
// ============================================================================

export interface PackageImage {
  url: string;
  alt?: string;
  caption?: string;
  order?: number;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export type PackageCategory =
  | "Couples"
  | "Girls Only"
  | "Boys Only"
  | "Mixed"
  | "Family";

// ============================================================================
// Enriched Types (with relations)
// ============================================================================

export interface TravelPackageWithThemes extends TravelPackage {
  themes: PackageThemeInfo[];
}

export interface PackageThemeInfo {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  is_primary: boolean;
}

export interface PackageDetails extends TravelPackage {
  themes: PackageThemeInfo[];
  itinerary: PackageItinerary[];
  inclusions: Omit<PackageInclusion, "package_id" | "type" | "created_at">[];
  exclusions: Omit<PackageInclusion, "package_id" | "type" | "created_at">[];
}

// ============================================================================
// Filter Types
// ============================================================================

export interface PackageFilters {
  themes?: string[]; // Array of theme slugs
  dayRange?: DayRangeValue;
  minPrice?: number;
  maxPrice?: number;
  category?: PackageCategory;
  searchTerm?: string;
  sortBy?: SortOption;
  showFeaturedOnly?: boolean;
  showAvailableOnly?: boolean;
  startDate?: string; // ISO date string for travel start date
  endDate?: string; // ISO date string for travel end date
}

export type DayRangeValue = "1-3" | "4-7" | "8-15" | "15+";

export interface DayRangeOption {
  value: DayRangeValue;
  label: string;
  description: string;
  minDays: number;
  maxDays: number | null; // null means no upper limit
}

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "popularity"
  | "newest";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
  description: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface GetPackagesResponse {
  packages: TravelPackageWithThemes[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface GetPackageDetailsResponse {
  package: PackageDetails;
}

export interface GetThemesResponse {
  themes: PackageTheme[];
}

// ============================================================================
// Form Types
// ============================================================================

export interface CreatePackageData
  extends Omit<
    TravelPackage,
    "id" | "created_at" | "updated_at" | "is_active"
  > {
  theme_ids: string[]; // Theme IDs to associate
  primary_theme_id?: string; // Primary theme ID
  itinerary?: Omit<
    PackageItinerary,
    "id" | "package_id" | "created_at" | "updated_at"
  >[];
  inclusions?: Omit<PackageInclusion, "id" | "package_id" | "created_at">[];
}

export interface UpdatePackageData extends Partial<CreatePackageData> {
  id: string;
}

// ============================================================================
// UI State Types
// ============================================================================

export interface PackageFilterState {
  selectedThemes: string[];
  selectedDayRange: DayRangeValue | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  selectedCategory: PackageCategory | null;
  searchQuery: string;
  sortBy: SortOption;
  showFeaturedOnly: boolean;
  showAvailableOnly: boolean;
}

export interface PackageListState {
  packages: TravelPackageWithThemes[];
  filteredPackages: TravelPackageWithThemes[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

export type PackageAvailability = "available" | "limited" | "full";

export interface PackageCardData {
  id: string;
  title: string;
  slug: string;
  location: string;
  duration: string; // e.g., "3 Days / 2 Nights"
  price: number;
  originalPrice: number | null;
  discountPercentage: number | null;
  rating: number;
  reviewCount: number;
  spotsAvailable: number;
  spotsTotal: number;
  availability: PackageAvailability;
  image: string;
  themes: PackageThemeInfo[];
  tags: string[];
  category: PackageCategory | null;
  isFeatured: boolean;
  startDate: string | null;
  endDate: string | null;
}

// ============================================================================
// Constants Types
// ============================================================================

export interface ThemeConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaultTags: string[];
}

// ============================================================================
// Search & Autocomplete Types
// ============================================================================

export interface PackageSearchResult {
  id: string;
  title: string;
  slug: string;
  location: string;
  duration_days: number;
  price_per_person: number;
  image: string;
  themes: string[]; // theme names
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface PackageAnalytics {
  package_id: string;
  views: number;
  bookings: number;
  conversion_rate: number;
  average_rating: number;
  trending_score: number;
}

