"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PackageCategory } from "@/types/packages";
import {
  CATEGORY_OPTIONS,
  CATEGORY_LABELS,
  PRICE_RANGE_PRESETS,
} from "@/constants/package-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  IndianRupee,
  Users,
  Star,
  Check,
} from "lucide-react";

interface AdvancedFiltersProps {
  selectedCategory?: PackageCategory | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  showAvailableOnly?: boolean;
  onFiltersChange?: (filters: {
    category?: PackageCategory | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    showAvailableOnly?: boolean;
  }) => void;
  className?: string;
}

export default function AdvancedFilters({
  selectedCategory,
  minPrice,
  maxPrice,
  showAvailableOnly,
  onFiltersChange,
  className,
}: AdvancedFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if any advanced filters are active to auto-expand
  const hasActiveAdvancedFilters =
    selectedCategory || minPrice || maxPrice || showAvailableOnly;
  const [isExpanded, setIsExpanded] = useState(hasActiveAdvancedFilters);

  // Local state for price range
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || 100000);

  const handleCategoryChange = (category: PackageCategory | null) => {
    if (onFiltersChange) {
      onFiltersChange({ category });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (min: number, max: number) => {
    setLocalMinPrice(min);
    setLocalMaxPrice(max);

    if (onFiltersChange) {
      onFiltersChange({ minPrice: min, maxPrice: max });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (min > 0) {
      params.set("min_price", min.toString());
    } else {
      params.delete("min_price");
    }
    if (max < 100000) {
      params.set("max_price", max.toString());
    } else {
      params.delete("max_price");
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleAvailableOnlyToggle = () => {
    const newValue = !showAvailableOnly;

    if (onFiltersChange) {
      onFiltersChange({ showAvailableOnly: newValue });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(100000);

    if (onFiltersChange) {
      onFiltersChange({
        category: null,
        minPrice: null,
        maxPrice: null,
        showAvailableOnly: false,
      });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("available");
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory || minPrice || maxPrice || showAvailableOnly;

  return (
    <div className={cn("bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden", className)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            hasActiveFilters ? "bg-primary/10" : "bg-gray-100"
          )}>
            <SlidersHorizontal className={cn(
              "w-5 h-5",
              hasActiveFilters ? "text-primary" : "text-gray-600"
            )} />
          </div>
          <div className="text-left">
            <span className="font-bold text-gray-900 text-base block">More Filters</span>
            <span className="text-xs text-gray-500">
              {hasActiveFilters 
                ? `${Object.keys({selectedCategory, minPrice, maxPrice, showAvailableOnly}).filter(k => eval(k)).length} filters active` 
                : "Category, Price, Availability"}
            </span>
          </div>
          {hasActiveFilters && (
            <span className="px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full">
              {Object.keys({selectedCategory, minPrice, maxPrice, showAvailableOnly}).filter(k => eval(k)).length}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-5 pt-0 space-y-6 border-t-2 border-gray-100">
          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <label className="text-sm font-bold text-gray-900">
                Group Type
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange(null)}
                className={cn(
                  "rounded-full text-xs",
                  !selectedCategory
                    ? "bg-primary text-white border-primary"
                    : "bg-white"
                )}
              >
                All
              </Button>
              {CATEGORY_OPTIONS.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "rounded-full text-xs",
                    selectedCategory === category
                      ? "bg-primary text-white border-primary"
                      : "bg-white"
                  )}
                >
                  {CATEGORY_LABELS[category]}
                  {selectedCategory === category && (
                    <Check className="w-3 h-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="w-5 h-5 text-primary" />
              <label className="text-sm font-bold text-gray-900">
                Price Range
              </label>
            </div>

            {/* Price Presets */}
            <div className="flex flex-wrap gap-2 mb-4">
              {PRICE_RANGE_PRESETS.map((preset) => {
                const isActive =
                  localMinPrice === preset.min &&
                  (preset.max === null
                    ? localMaxPrice >= 100000
                    : localMaxPrice === preset.max);

                return (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePriceChange(preset.min, preset.max || 100000)
                    }
                    className={cn(
                      "rounded-full text-xs",
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white"
                    )}
                  >
                    {preset.label}
                  </Button>
                );
              })}
            </div>

            {/* Custom Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>₹{localMinPrice.toLocaleString()}</span>
                <span>
                  ₹
                  {localMaxPrice >= 100000
                    ? "100,000+"
                    : localMaxPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={localMinPrice}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      setLocalMinPrice(newMin);
                    }}
                    onMouseUp={(e) => {
                      const newMin = parseInt(
                        (e.target as HTMLInputElement).value
                      );
                      handlePriceChange(newMin, localMaxPrice);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={localMaxPrice}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      setLocalMaxPrice(newMax);
                    }}
                    onMouseUp={(e) => {
                      const newMax = parseInt(
                        (e.target as HTMLInputElement).value
                      );
                      handlePriceChange(localMinPrice, newMax);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-primary" />
              <label className="text-sm font-bold text-gray-900">
                Availability
              </label>
            </div>
            <button
              onClick={handleAvailableOnlyToggle}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium",
                showAvailableOnly
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center",
                  showAvailableOnly
                    ? "bg-white border-white"
                    : "bg-white border-gray-300"
                )}
              >
                {showAvailableOnly && (
                  <Check className="w-3 h-3 text-primary" />
                )}
              </div>
              <span>Show available packages only</span>
            </button>
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <div className="pt-4 border-t-2 border-gray-100">
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="w-full rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-300 border-2"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Advanced Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Active Filters Display (shows selected filters as badges)
// ============================================================================

interface ActiveFiltersDisplayProps {
  selectedCategory?: PackageCategory | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  showAvailableOnly?: boolean;
  onRemoveCategory?: () => void;
  onRemovePrice?: () => void;
  onRemoveAvailability?: () => void;
  onClearAll?: () => void;
  className?: string;
}

export function ActiveFiltersDisplay({
  selectedCategory,
  minPrice,
  maxPrice,
  showAvailableOnly,
  onRemoveCategory,
  onRemovePrice,
  onRemoveAvailability,
  onClearAll,
  className,
}: ActiveFiltersDisplayProps) {
  const hasFilters = selectedCategory || minPrice || maxPrice || showAvailableOnly;

  if (!hasFilters) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm font-medium text-gray-600">Active filters:</span>

      {selectedCategory && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Users className="w-3.5 h-3.5" />
          <span>{CATEGORY_LABELS[selectedCategory]}</span>
          {onRemoveCategory && (
            <button
              onClick={onRemoveCategory}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {(minPrice || maxPrice) && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>
            ₹{minPrice || 0} - ₹{maxPrice || "100k+"}
          </span>
          {onRemovePrice && (
            <button
              onClick={onRemovePrice}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {showAvailableOnly && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Check className="w-3.5 h-3.5" />
          <span>Available Only</span>
          {onRemoveAvailability && (
            <button
              onClick={onRemoveAvailability}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

