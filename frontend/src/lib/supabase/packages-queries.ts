// ============================================================================
// Supabase Packages Query Functions
// ============================================================================

import { createClient } from "./server";
import {
  PackageTheme,
  TravelPackageWithThemes,
  PackageDetails,
  PackageFilters,
  GetPackagesResponse,
  DayRangeValue,
  PackageCategory,
} from "@/types/packages";
import { TRIPS } from "@/constants/trip-data";
import { convertAllTripsToPackages, getMockThemes } from "@/lib/adapters/trips-to-packages";

// ============================================================================
// Theme Queries
// ============================================================================

export async function getPackageThemes(): Promise<PackageTheme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_themes")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching package themes:", error);
  }

  // If no data from Supabase, use mock themes as fallback
  if (!data || data.length === 0) {
    console.log("No themes from Supabase, using mock themes");
    return getMockThemes();
  }

  return data;
}

export async function getPackageThemeBySlug(
  slug: string
): Promise<PackageTheme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_themes")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching package theme:", error);
    return null;
  }

  return data;
}

// ============================================================================
// Package Queries with Filtering
// ============================================================================

/**
 * Get packages with filtering using the database helper function
 */
export async function getPackages(
  filters: PackageFilters = {},
  page: number = 1,
  pageSize: number = 50
): Promise<GetPackagesResponse> {
  const supabase = await createClient();

  // Parse day range
  const { minDays, maxDays } = parseDayRange(filters.dayRange);

  // Calculate offset
  const offset = (page - 1) * pageSize;

  // Call the database function
  // Note: Date filtering is done client-side in package-filters.ts
  const { data, error } = await supabase.rpc("get_packages_by_filters", {
    theme_slugs: filters.themes && filters.themes.length > 0 ? filters.themes : null,
    min_days: minDays,
    max_days: maxDays,
    min_price: filters.minPrice || null,
    max_price: filters.maxPrice || null,
    package_category: filters.category || null,
    search_term: filters.searchTerm || null,
    limit_count: pageSize,
    offset_count: offset,
  });

  if (error) {
    console.error("Error fetching packages:", error);
  }

  const packages = (data || []) as TravelPackageWithThemes[];

  // If no data from Supabase, use TRIPS mock data as fallback
  if (packages.length === 0) {
    console.log("No packages from Supabase, using TRIPS mock data");
    const mockPackages = convertAllTripsToPackages(TRIPS);
    
    return {
      packages: mockPackages,
      total: mockPackages.length,
      page: 1,
      pageSize: mockPackages.length,
      hasMore: false,
    };
  }

  return {
    packages,
    total: packages.length,
    page,
    pageSize,
    hasMore: packages.length === pageSize,
  };
}

/**
 * Get packages by specific themes (more flexible than filters)
 */
export async function getPackagesByThemes(
  themeSlugs: string[],
  dayRange?: DayRangeValue,
  category?: PackageCategory,
  limit: number = 50
): Promise<TravelPackageWithThemes[]> {
  const filters: PackageFilters = {
    themes: themeSlugs,
    dayRange,
    category,
  };

  const response = await getPackages(filters, 1, limit);
  return response.packages;
}

/**
 * Get featured packages
 */
export async function getFeaturedPackages(
  limit: number = 6
): Promise<TravelPackageWithThemes[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_packages_by_filters", {
    theme_slugs: null,
    min_days: null,
    max_days: null,
    min_price: null,
    max_price: null,
    package_category: null,
    search_term: null,
    limit_count: limit,
    offset_count: 0,
  });

  if (error) {
    console.error("Error fetching featured packages:", error);
    return [];
  }

  // Filter for featured packages on the client side
  const packages = (data || []) as TravelPackageWithThemes[];
  return packages.filter((pkg) => pkg.is_featured);
}

/**
 * Search packages by term
 */
export async function searchPackages(
  searchTerm: string,
  limit: number = 20
): Promise<TravelPackageWithThemes[]> {
  const filters: PackageFilters = {
    searchTerm,
  };

  const response = await getPackages(filters, 1, limit);
  return response.packages;
}

// ============================================================================
// Single Package Queries
// ============================================================================

/**
 * Get package details with all relations
 */
export async function getPackageBySlug(
  slug: string
): Promise<PackageDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_package_details", {
    package_slug: slug,
  });

  if (error) {
    console.error("Error fetching package details:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as PackageDetails;
}

/**
 * Get package by ID
 */
export async function getPackageById(
  id: string
): Promise<PackageDetails | null> {
  const supabase = await createClient();

  // First get the basic package info
  const { data: packageData, error: packageError } = await supabase
    .from("travel_packages")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (packageError || !packageData) {
    console.error("Error fetching package:", packageError);
    return null;
  }

  // Then use the slug to get full details
  return getPackageBySlug(packageData.slug);
}

/**
 * Get similar packages (same theme or category)
 */
export async function getSimilarPackages(
  packageId: string,
  limit: number = 4
): Promise<TravelPackageWithThemes[]> {
  const supabase = await createClient();

  // First get the package's themes
  const { data: mappings } = await supabase
    .from("package_theme_mappings")
    .select("theme_id")
    .eq("package_id", packageId);

  if (!mappings || mappings.length === 0) {
    return [];
  }

  const themeIds = mappings.map((m) => m.theme_id);

  // Get packages with similar themes
  const { data: packages, error } = await supabase
    .from("package_theme_mappings")
    .select(
      `
      package_id,
      travel_packages (
        id,
        title,
        slug,
        location,
        description,
        duration_days,
        duration_nights,
        start_date,
        end_date,
        price_per_person,
        original_price,
        currency,
        min_people,
        max_people,
        spots_available,
        spots_total,
        rating,
        review_count,
        images,
        tags,
        category,
        is_featured,
        is_active,
        metadata,
        created_at,
        updated_at
      )
    `
    )
    .in("theme_id", themeIds)
    .neq("package_id", packageId)
    .limit(limit * 2); // Get more to filter

  if (error || !packages) {
    console.error("Error fetching similar packages:", error);
    return [];
  }

  // Extract unique packages and add themes
  const uniquePackagesMap = new Map();
  for (const mapping of packages) {
    const pkg = mapping.travel_packages as any;
    if (pkg && pkg.is_active && !uniquePackagesMap.has(pkg.id)) {
      uniquePackagesMap.set(pkg.id, {
        ...pkg,
        themes: [],
      });
    }
  }

  // Limit to requested amount
  const uniquePackages = Array.from(uniquePackagesMap.values()).slice(
    0,
    limit
  );

  // Fetch themes for each package
  for (const pkg of uniquePackages) {
    const { data: themeData } = await supabase
      .from("package_theme_mappings")
      .select(
        `
        is_primary,
        package_themes (
          id,
          name,
          slug,
          icon,
          color
        )
      `
      )
      .eq("package_id", pkg.id);

    if (themeData) {
      pkg.themes = themeData.map((t: any) => ({
        ...t.package_themes,
        is_primary: t.is_primary,
      }));
    }
  }

  return uniquePackages as TravelPackageWithThemes[];
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse day range value to min/max days
 */
function parseDayRange(
  dayRange?: DayRangeValue
): { minDays: number | null; maxDays: number | null } {
  if (!dayRange) {
    return { minDays: null, maxDays: null };
  }

  switch (dayRange) {
    case "1-3":
      return { minDays: 1, maxDays: 3 };
    case "4-7":
      return { minDays: 4, maxDays: 7 };
    case "8-15":
      return { minDays: 8, maxDays: 15 };
    case "15+":
      return { minDays: 15, maxDays: null };
    default:
      return { minDays: null, maxDays: null };
  }
}

/**
 * Get available day ranges based on packages
 */
export async function getAvailableDayRanges(): Promise<DayRangeValue[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("travel_packages")
    .select("duration_days")
    .eq("is_active", true);

  if (!data) {
    return [];
  }

  const durations = data.map((p) => p.duration_days);
  const ranges: DayRangeValue[] = [];

  if (durations.some((d) => d >= 1 && d <= 3)) ranges.push("1-3");
  if (durations.some((d) => d >= 4 && d <= 7)) ranges.push("4-7");
  if (durations.some((d) => d >= 8 && d <= 15)) ranges.push("8-15");
  if (durations.some((d) => d >= 15)) ranges.push("15+");

  return ranges;
}

/**
 * Get price range of all packages
 */
export async function getPriceRange(): Promise<{
  min: number;
  max: number;
}> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("travel_packages")
    .select("price_per_person")
    .eq("is_active", true);

  if (!data || data.length === 0) {
    return { min: 0, max: 100000 };
  }

  const prices = data.map((p) => p.price_per_person);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get package count by theme
 */
export async function getPackageCountByTheme(): Promise<
  Record<string, number>
> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("package_theme_mappings")
    .select(
      `
      theme_id,
      package_themes (slug),
      travel_packages (is_active)
    `
    );

  if (!data) {
    return {};
  }

  const counts: Record<string, number> = {};

  for (const mapping of data) {
    const theme = (mapping.package_themes as any)?.slug;
    const isActive = (mapping.travel_packages as any)?.is_active;

    if (theme && isActive) {
      counts[theme] = (counts[theme] || 0) + 1;
    }
  }

  return counts;
}

// ============================================================================
// Cache Tags for Next.js
// ============================================================================

export const CACHE_TAGS = {
  themes: "package-themes",
  packages: "travel-packages",
  packageDetails: (slug: string) => `package-${slug}`,
};

