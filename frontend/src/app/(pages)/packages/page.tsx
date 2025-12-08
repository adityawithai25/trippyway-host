import { Suspense } from "react";
import { TextHighlighter } from "@/components/custom/text-highlighter";
import { getPackageThemes, getPackages } from "@/lib/supabase/packages-queries";
import { PackageFilters, DayRangeValue, PackageCategory } from "@/types/packages";
import TripFilters from "./_components/trip-filters";
import { ThemeChipsSkeleton } from "./_components/theme-chips";
import { DayRangeFilterSkeleton } from "./_components/day-range-filter";

async function SearchParamsWrapper({
  searchParams,
}: {
  searchParams: Promise<{
    themes?: string;
    days?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    q?: string;
    sort?: string;
    featured?: string;
    available?: string;
    page?: string;
    start_date?: string;
    end_date?: string;
  }>;
}) {
  const params = await searchParams;

  // Parse filters from URL
  const filters: PackageFilters = {};

  if (params.themes) {
    filters.themes = params.themes.split(",").filter(Boolean);
  }

  if (params.days) {
    filters.dayRange = params.days as DayRangeValue;
  }

  if (params.category) {
    filters.category = params.category as PackageCategory;
  }

  if (params.min_price) {
    const parsed = parseInt(params.min_price);
    if (!isNaN(parsed)) filters.minPrice = parsed;
  }

  if (params.max_price) {
    const parsed = parseInt(params.max_price);
    if (!isNaN(parsed)) filters.maxPrice = parsed;
  }

  if (params.q) {
    filters.searchTerm = params.q;
  }

  if (params.sort) {
    filters.sortBy = params.sort as any;
  }

  if (params.featured === "true") {
    filters.showFeaturedOnly = true;
  }

  if (params.available === "true") {
    filters.showAvailableOnly = true;
  }

  // Date range
  if (params.start_date) {
    filters.startDate = params.start_date;
  }

  if (params.end_date) {
    filters.endDate = params.end_date;
  }

  // Get page number
  const page = params.page ? parseInt(params.page) : 1;

  // Check if theme filter exists
  const hasThemeFilter = params.themes && params.themes.length > 0;

  // Fetch themes and packages from Supabase
  const [themes, packagesResponse] = await Promise.all([
    getPackageThemes(),
    getPackages(filters, page, 12),
  ]);

  return (
    <>
      {/* Dynamic Header based on filters */}
      <div className="text-center mb-8">
        {hasThemeFilter ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-3">
              <span className="text-xl">🎯</span>
              <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                Personalized For You
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your{" "}
              <TextHighlighter action="underline" color="var(--color-primary)">
                <span>Curated</span>
              </TextHighlighter>{" "}
              Travel Packages
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked packages matching your selected theme. Each itinerary is thoughtfully 
              designed to create unforgettable experiences tailored to your interests.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your{" "}
              <TextHighlighter action="underline" color="var(--color-primary)">
                <span>Perfect</span>
              </TextHighlighter>{" "}
              Escape
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of theme-based travel packages designed 
              for every purpose - from corporate retreats to college adventures.
            </p>
          </>
        )}
      </div>
      
      <TripFilters
        themes={themes}
        initialPackages={packagesResponse.packages}
        initialFilters={filters}
        totalCount={packagesResponse.total}
        currentPage={page}
        hasMore={packagesResponse.hasMore}
      />
    </>
  );
}

interface SelectTripPageProps {
  searchParams: Promise<{
    themes?: string;
    days?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    q?: string;
    sort?: string;
    featured?: string;
    available?: string;
    page?: string;
    start_date?: string;
    end_date?: string;
  }>;
}

export default async function SelectTripPage({
  searchParams,
}: SelectTripPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-24 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<FiltersSkeleton />}>
          <SearchParamsWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

// Skeleton loader for the entire filters section
function FiltersSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4" />
        <div className="h-6 w-96 bg-gray-200 rounded mx-auto" />
      </div>

      {/* Filters Section Skeleton */}
      <div className="space-y-6">
        {/* Theme Chips Skeleton */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4">
          <ThemeChipsSkeleton />
        </div>

        {/* Day Range Skeleton */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4">
          <DayRangeFilterSkeleton />
        </div>

        {/* Trip Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse"
            >
              <div className="relative h-56 w-full bg-gray-200" />
              <div className="p-5 flex-1 flex flex-col space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-8 w-full bg-gray-200 rounded" />
                <div className="flex-1" />
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
