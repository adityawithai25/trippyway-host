// ============================================================================
// Package Filtering Logic
// ============================================================================

import {
  TravelPackageWithThemes,
  PackageFilters,
  DayRangeValue,
  PackageCategory,
  SortOption,
} from "@/types/packages";
import { getDayRangeOption } from "@/constants/package-filters";

// ============================================================================
// Client-Side Filtering Functions
// ============================================================================

/**
 * Filter packages based on multiple criteria
 */
export function filterPackages(
  packages: TravelPackageWithThemes[],
  filters: PackageFilters
): TravelPackageWithThemes[] {
  let filtered = [...packages];

  // Theme filter (OR logic - show packages matching ANY selected theme)
  if (filters.themes && filters.themes.length > 0) {
    filtered = filtered.filter((pkg) => {
      if (!pkg.themes || pkg.themes.length === 0) return false;
      return pkg.themes.some((theme) =>
        filters.themes!.includes(theme.slug)
      );
    });
  }

  // Day range filter
  if (filters.dayRange) {
    const dayRangeOption = getDayRangeOption(filters.dayRange);
    if (dayRangeOption) {
      filtered = filtered.filter((pkg) => {
        const { minDays, maxDays } = dayRangeOption;
        if (minDays && pkg.duration_days < minDays) return false;
        if (maxDays && pkg.duration_days > maxDays) return false;
        return true;
      });
    }
  }

  // Price range filter
  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    filtered = filtered.filter(
      (pkg) => Number(pkg.price_per_person) >= filters.minPrice!
    );
  }
  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    filtered = filtered.filter(
      (pkg) => Number(pkg.price_per_person) <= filters.maxPrice!
    );
  }

  // Category filter
  if (filters.category) {
    filtered = filtered.filter((pkg) => pkg.category === filters.category);
  }

  // Search term filter
  if (filters.searchTerm && filters.searchTerm.trim()) {
    const searchLower = filters.searchTerm.toLowerCase().trim();
    filtered = filtered.filter((pkg) => {
      return (
        pkg.title.toLowerCase().includes(searchLower) ||
        pkg.location.toLowerCase().includes(searchLower) ||
        pkg.description?.toLowerCase().includes(searchLower) ||
        pkg.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
  }

  // Featured only filter
  if (filters.showFeaturedOnly) {
    filtered = filtered.filter((pkg) => pkg.is_featured);
  }

  // Available only filter
  if (filters.showAvailableOnly) {
    filtered = filtered.filter((pkg) => pkg.spots_available > 0);
  }

  // Date range filter (if package has start_date/end_date)
  if (filters.startDate) {
    filtered = filtered.filter((pkg) => {
      if (!pkg.start_date) return true; // Include packages without dates
      return new Date(pkg.start_date) >= new Date(filters.startDate!);
    });
  }

  if (filters.endDate) {
    filtered = filtered.filter((pkg) => {
      if (!pkg.end_date) return true; // Include packages without dates
      return new Date(pkg.end_date) <= new Date(filters.endDate!);
    });
  }

  return filtered;
}

/**
 * Sort packages based on sort option
 */
export function sortPackages(
  packages: TravelPackageWithThemes[],
  sortBy: SortOption = "featured"
): TravelPackageWithThemes[] {
  const sorted = [...packages];

  switch (sortBy) {
    case "featured":
      return sorted.sort((a, b) => {
        // Featured first, then by rating, then by newest
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        if (Number(a.rating) !== Number(b.rating)) {
          return Number(b.rating) - Number(a.rating);
        }
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

    case "price-low":
      return sorted.sort(
        (a, b) => Number(a.price_per_person) - Number(b.price_per_person)
      );

    case "price-high":
      return sorted.sort(
        (a, b) => Number(b.price_per_person) - Number(a.price_per_person)
      );

    case "rating":
      return sorted.sort((a, b) => {
        if (Number(a.rating) !== Number(b.rating)) {
          return Number(b.rating) - Number(a.rating);
        }
        // If ratings are equal, sort by review count
        return b.review_count - a.review_count;
      });

    case "popularity":
      return sorted.sort((a, b) => {
        // Calculate popularity score based on bookings (spots taken) and reviews
        const aPopularity =
          (a.spots_total - a.spots_available) * 2 + a.review_count;
        const bPopularity =
          (b.spots_total - b.spots_available) * 2 + b.review_count;
        return bPopularity - aPopularity;
      });

    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    default:
      return sorted;
  }
}

/**
 * Filter and sort packages in one go
 */
export function filterAndSortPackages(
  packages: TravelPackageWithThemes[],
  filters: PackageFilters,
  sortBy: SortOption = "featured"
): TravelPackageWithThemes[] {
  const filtered = filterPackages(packages, filters);
  return sortPackages(filtered, sortBy);
}

// ============================================================================
// Filter Validation and Parsing
// ============================================================================

/**
 * Parse URL search params into PackageFilters
 */
export function parseFiltersFromURL(
  searchParams: URLSearchParams
): PackageFilters {
  const filters: PackageFilters = {};

  // Themes
  const themesParam = searchParams.get("themes");
  if (themesParam) {
    filters.themes = themesParam.split(",").filter(Boolean);
  }

  // Day range
  const daysParam = searchParams.get("days");
  if (daysParam) {
    filters.dayRange = daysParam as DayRangeValue;
  }

  // Price range
  const minPriceParam = searchParams.get("min_price");
  if (minPriceParam) {
    const parsed = parseInt(minPriceParam);
    if (!isNaN(parsed)) {
      filters.minPrice = parsed;
    }
  }

  const maxPriceParam = searchParams.get("max_price");
  if (maxPriceParam) {
    const parsed = parseInt(maxPriceParam);
    if (!isNaN(parsed)) {
      filters.maxPrice = parsed;
    }
  }

  // Category
  const categoryParam = searchParams.get("category");
  if (categoryParam) {
    filters.category = categoryParam as PackageCategory;
  }

  // Search term
  const searchParam = searchParams.get("q");
  if (searchParam) {
    filters.searchTerm = searchParam;
  }

  // Sort
  const sortParam = searchParams.get("sort");
  if (sortParam) {
    filters.sortBy = sortParam as SortOption;
  }

  // Featured only
  const featuredParam = searchParams.get("featured");
  if (featuredParam === "true") {
    filters.showFeaturedOnly = true;
  }

  // Available only
  const availableParam = searchParams.get("available");
  if (availableParam === "true") {
    filters.showAvailableOnly = true;
  }

  // Date range
  const startDateParam = searchParams.get("start_date");
  if (startDateParam) {
    filters.startDate = startDateParam;
  }

  const endDateParam = searchParams.get("end_date");
  if (endDateParam) {
    filters.endDate = endDateParam;
  }

  return filters;
}

/**
 * Convert PackageFilters to URL search params
 */
export function filtersToURLParams(filters: PackageFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.themes && filters.themes.length > 0) {
    params.set("themes", filters.themes.join(","));
  }

  if (filters.dayRange) {
    params.set("days", filters.dayRange);
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    params.set("min_price", filters.minPrice.toString());
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    params.set("max_price", filters.maxPrice.toString());
  }

  if (filters.category) {
    params.set("category", filters.category);
  }

  if (filters.searchTerm) {
    params.set("q", filters.searchTerm);
  }

  if (filters.sortBy) {
    params.set("sort", filters.sortBy);
  }

  if (filters.showFeaturedOnly) {
    params.set("featured", "true");
  }

  if (filters.showAvailableOnly) {
    params.set("available", "true");
  }

  if (filters.startDate) {
    params.set("start_date", filters.startDate);
  }

  if (filters.endDate) {
    params.set("end_date", filters.endDate);
  }

  return params;
}

// ============================================================================
// Filter Statistics
// ============================================================================

/**
 * Get count of packages matching each filter option
 */
export function getFilterCounts(packages: TravelPackageWithThemes[]): {
  byTheme: Record<string, number>;
  byDayRange: Record<DayRangeValue, number>;
  byCategory: Record<PackageCategory, number>;
  available: number;
  featured: number;
} {
  const counts = {
    byTheme: {} as Record<string, number>,
    byDayRange: {
      "1-3": 0,
      "4-7": 0,
      "8-15": 0,
      "15+": 0,
    } as Record<DayRangeValue, number>,
    byCategory: {
      Couples: 0,
      "Girls Only": 0,
      "Boys Only": 0,
      Mixed: 0,
      Family: 0,
    } as Record<PackageCategory, number>,
    available: 0,
    featured: 0,
  };

  packages.forEach((pkg) => {
    // Count by theme
    if (pkg.themes) {
      pkg.themes.forEach((theme) => {
        counts.byTheme[theme.slug] = (counts.byTheme[theme.slug] || 0) + 1;
      });
    }

    // Count by day range
    if (pkg.duration_days >= 1 && pkg.duration_days <= 3) {
      counts.byDayRange["1-3"]++;
    } else if (pkg.duration_days >= 4 && pkg.duration_days <= 7) {
      counts.byDayRange["4-7"]++;
    } else if (pkg.duration_days >= 8 && pkg.duration_days <= 15) {
      counts.byDayRange["8-15"]++;
    } else if (pkg.duration_days >= 15) {
      counts.byDayRange["15+"]++;
    }

    // Count by category
    if (pkg.category) {
      counts.byCategory[pkg.category as PackageCategory]++;
    }

    // Count available
    if (pkg.spots_available > 0) {
      counts.available++;
    }

    // Count featured
    if (pkg.is_featured) {
      counts.featured++;
    }
  });

  return counts;
}

/**
 * Check if filters are empty
 */
export function hasActiveFilters(filters: PackageFilters): boolean {
  return !!(
    (filters.themes && filters.themes.length > 0) ||
    filters.dayRange ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.category ||
    filters.searchTerm ||
    filters.showFeaturedOnly ||
    filters.showAvailableOnly ||
    filters.startDate ||
    filters.endDate
  );
}

/**
 * Get count of active filters
 */
export function getActiveFilterCount(filters: PackageFilters): number {
  let count = 0;

  if (filters.themes && filters.themes.length > 0) count++;
  if (filters.dayRange) count++;
  if (filters.minPrice || filters.maxPrice) count++;
  if (filters.category) count++;
  if (filters.searchTerm) count++;
  if (filters.showFeaturedOnly) count++;
  if (filters.showAvailableOnly) count++;
  if (filters.startDate || filters.endDate) count++;

  return count;
}

// ============================================================================
// Price Range Helpers
// ============================================================================

/**
 * Get min and max prices from packages
 */
export function getPriceRange(
  packages: TravelPackageWithThemes[]
): { min: number; max: number } {
  if (packages.length === 0) {
    return { min: 0, max: 100000 };
  }

  const prices = packages.map((pkg) => Number(pkg.price_per_person));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Round price to nearest thousand
 */
export function roundPriceToThousand(price: number): number {
  return Math.round(price / 1000) * 1000;
}

