"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PackageCard from "./package-card";
import { CompactThemeChips } from "./theme-chips";
import DayRangeFilter from "./day-range-filter";
import { DateRangePicker } from "./date-range-picker";
import { CompactPriceRange } from "./price-range-slider";
import SortDropdown from "./sort-dropdown";
import {
  PackageTheme,
  TravelPackageWithThemes,
  PackageFilters,
  DayRangeValue,
  PackageCategory,
  SortOption,
} from "@/types/packages";
import { filterAndSortPackages, hasActiveFilters, getActiveFilterCount } from "@/lib/filters/package-filters";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

interface TripFiltersProps {
  themes: PackageTheme[];
  initialPackages: TravelPackageWithThemes[];
  initialFilters: PackageFilters;
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}

export default function TripFilters({
  themes,
  initialPackages,
  initialFilters,
  totalCount,
  currentPage,
  hasMore,
}: TripFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [packages, setPackages] = useState(initialPackages);
  const [filters, setFilters] = useState<PackageFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  // Get selected themes from filters
  const selectedThemes = filters.themes || [];
  const selectedDayRange = filters.dayRange || null;
  const selectedCategory = filters.category || null;
  const priceRange: [number, number] = [
    filters.minPrice || 0,
    filters.maxPrice || 100000,
  ];
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  
  // Date state
  const [startDate, setStartDate] = useState<Date | null>(
    filters.startDate ? new Date(filters.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    filters.endDate ? new Date(filters.endDate) : null
  );

  // Update packages when filters or initial data changes
  useEffect(() => {
    setPackages(initialPackages);
  }, [initialPackages]);

  useEffect(() => {
    setFilters(initialFilters);
    setSearchTerm(initialFilters.searchTerm || "");
  }, [initialFilters]);

  // Category options
  const categoryOptions: PackageCategory[] = [
    "Couples",
    "Family",
    "Girls Only",
    "Boys Only",
    "Mixed",
  ];

  // Helper to update URL params
  const updateFilters = (newFilters: Partial<PackageFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    const updatedFilters = { ...filters, ...newFilters };

    // Update URL params
    if (updatedFilters.themes && updatedFilters.themes.length > 0) {
      params.set("themes", updatedFilters.themes.join(","));
    } else {
      params.delete("themes");
    }

    if (updatedFilters.dayRange) {
      params.set("days", updatedFilters.dayRange);
    } else {
      params.delete("days");
    }

    if (updatedFilters.minPrice !== undefined && updatedFilters.minPrice !== null) {
      params.set("min_price", updatedFilters.minPrice.toString());
    } else {
      params.delete("min_price");
    }

    if (updatedFilters.maxPrice !== undefined && updatedFilters.maxPrice !== null) {
      params.set("max_price", updatedFilters.maxPrice.toString());
    } else {
      params.delete("max_price");
    }

    if (updatedFilters.category) {
      params.set("category", updatedFilters.category);
    } else {
      params.delete("category");
    }

    if (updatedFilters.searchTerm) {
      params.set("q", updatedFilters.searchTerm);
    } else {
      params.delete("q");
    }

    if (updatedFilters.sortBy) {
      params.set("sort", updatedFilters.sortBy);
    } else {
      params.delete("sort");
    }

    if (updatedFilters.showAvailableOnly) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }

    if (updatedFilters.startDate) {
      params.set("start_date", updatedFilters.startDate);
    } else {
      params.delete("start_date");
    }

    if (updatedFilters.endDate) {
      params.set("end_date", updatedFilters.endDate);
    } else {
      params.delete("end_date");
    }

    // Reset to first page
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handler functions
  const handleThemeToggle = (themeSlug: string) => {
    const newThemes = selectedThemes.includes(themeSlug)
      ? selectedThemes.filter((t) => t !== themeSlug)
      : [...selectedThemes, themeSlug];
    updateFilters({ themes: newThemes });
  };

  const handleDayRangeChange = (range: DayRangeValue | null) => {
    updateFilters({ dayRange: range || undefined });
  };

  const handleCategoryChange = (category: PackageCategory | null) => {
    updateFilters({ category: category || undefined });
  };

  const handlePriceChange = (value: [number, number]) => {
    updateFilters({ minPrice: value[0], maxPrice: value[1] });
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    updateFilters({
      startDate: start ? format(start, "yyyy-MM-dd") : undefined,
      endDate: end ? format(end, "yyyy-MM-dd") : undefined,
    });
  };

  const handleSearch = () => {
    updateFilters({ searchTerm });
  };

  const handleSortChange = (sort: SortOption) => {
    updateFilters({ sortBy: sort });
  };

  const handleAvailabilityToggle = () => {
    updateFilters({ showAvailableOnly: !filters.showAvailableOnly });
  };

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setStartDate(null);
    setEndDate(null);
    router.push("/packages");
  };

  // Apply client-side filtering and sorting
  const filteredPackages = filterAndSortPackages(
    packages,
    filters,
    filters.sortBy || "featured"
  );

  // Check if any filters are active
  const hasFilters = hasActiveFilters(filters);
  const activeCount = getActiveFilterCount(filters);

  return (
    <div className="space-y-4">
      {/* ========================================
          PROFESSIONAL COMPACT FILTER SECTION
          ======================================== */}
      <div className="bg-white rounded-lg border border-gray-200/60 shadow-sm">
        {/* Primary Filters */}
        <div className="p-4 space-y-3">
          {/* Row 1: Search + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search destinations..."
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all text-sm bg-gray-50/30"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    updateFilters({ searchTerm: "" });
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Date Range Picker */}
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
              placeholder="Travel dates"
            />
          </div>

          {/* Row 2: Group Type Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => {
              const selected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() =>
                    handleCategoryChange(selected ? null : category)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selected
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Row 3: Duration + Budget (Inline with subtle labels) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Duration Pills */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">Trip Duration</label>
              <DayRangeFilter
                selectedRange={selectedDayRange}
                onRangeChange={handleDayRangeChange}
                variant="compact"
              />
            </div>

            {/* Budget Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">Budget Range</label>
              <CompactPriceRange
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>

        {/* More Filters Toggle */}
        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="w-full px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-gray-500 hover:bg-gray-50/50 transition-colors border-t border-gray-100"
        >
          <span>
            {showMoreFilters ? "Hide" : "Show"} Themes
            {selectedThemes.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-gray-900 text-white rounded text-[10px]">
                {selectedThemes.length}
              </span>
            )}
          </span>
          {showMoreFilters ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Expandable Themes */}
        {showMoreFilters && (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30">
            <CompactThemeChips
              themes={themes}
              selectedThemes={selectedThemes}
              onThemeToggle={handleThemeToggle}
              maxVisible={themes.length}
            />
          </div>
        )}
      </div>

      {/* ========================================
          RESULTS BAR
          ======================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left: Results count */}
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-gray-900">
            {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"}
          </span>
          {hasFilters && activeCount > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <button
                onClick={handleClearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
              >
                Clear filters ({activeCount})
              </button>
            </>
          )}
        </div>

        {/* Right: Sort + Availability */}
        <div className="flex items-center gap-2">
          {/* Availability Toggle */}
          <button
            onClick={handleAvailabilityToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filters.showAvailableOnly
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filters.showAvailableOnly ? "bg-emerald-500" : "bg-gray-400"}`} />
            Available
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            selectedSort={filters.sortBy || "featured"}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* ========================================
          PACKAGE GRID
          ======================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>

      {/* ========================================
          EMPTY STATE
          ======================================== */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200/60">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No packages found
          </h3>
          <p className="text-gray-500 mb-4 text-sm max-w-md mx-auto">
            Try adjusting your filters to see more results.
          </p>
          {hasFilters && (
            <Button 
              onClick={handleClearAllFilters} 
              size="sm" 
              className="px-4 bg-gray-900 hover:bg-gray-800"
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl border border-gray-200/60">
            <Loader2 className="w-7 h-7 animate-spin text-gray-900 mx-auto" />
            <p className="mt-3 text-sm font-medium text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton loader
TripFilters.Skeleton = function TripFiltersSkeleton() {
  return (
    <div className="space-y-4">
      {/* Compact Filter Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200/60 p-4 animate-pulse">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-10 bg-gray-100 rounded-lg" />
            <div className="h-10 bg-gray-100 rounded-lg" />
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-7 w-20 bg-gray-100 rounded-md" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="h-20 bg-gray-100 rounded-lg" />
            <div className="h-20 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Package Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200/60 overflow-hidden flex flex-col h-full animate-pulse"
          >
            <div className="relative h-56 w-full bg-gray-100" />
            <div className="p-5 flex-1 flex flex-col space-y-3">
              <div className="h-5 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
              <div className="h-8 w-full bg-gray-100 rounded" />
              <div className="flex-1" />
              <div className="h-12 w-full bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
