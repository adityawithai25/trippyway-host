"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DAY_RANGE_OPTIONS } from "@/constants/package-filters";
import { DayRangeValue } from "@/types/packages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Check } from "lucide-react";

interface DayRangeFilterProps {
  selectedRange?: DayRangeValue | null;
  onRangeChange?: (range: DayRangeValue | null) => void;
  className?: string;
  variant?: "default" | "compact";
}

export default function DayRangeFilter({
  selectedRange,
  onRangeChange,
  className,
  variant = "default",
}: DayRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRangeClick = (rangeValue: DayRangeValue) => {
    if (onRangeChange) {
      // If same range is clicked, deselect it
      onRangeChange(selectedRange === rangeValue ? null : rangeValue);
      return;
    }

    // Default URL-based behavior
    const params = new URLSearchParams(searchParams.toString());

    if (selectedRange === rangeValue) {
      // Deselect if clicking the same range
      params.delete("days");
    } else {
      params.set("days", rangeValue);
    }

    // Reset to first page when changing filters
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isSelected = (rangeValue: DayRangeValue) =>
    selectedRange === rangeValue;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
          className
        )}
      >
        {DAY_RANGE_OPTIONS.map((option) => {
          const selected = isSelected(option.value);

          return (
            <button
              key={option.value}
              onClick={() => handleRangeClick(option.value)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0",
                selected
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              )}
            >
              <Calendar className="w-3 h-3" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 md:gap-3 justify-center items-center",
        className
      )}
    >
      {DAY_RANGE_OPTIONS.map((option) => {
        const selected = isSelected(option.value);

        return (
          <Button
            key={option.value}
            onClick={() => handleRangeClick(option.value)}
            variant="outline"
            className={cn(
              "relative px-4 py-2.5 h-auto rounded-full text-sm font-semibold transition-all duration-200 border-2 shadow-sm hover:shadow-md group",
              selected
                ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700 transform scale-105"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-2">
              <Calendar
                className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  selected ? "text-white" : "text-gray-600"
                )}
              />
              <div className="flex flex-col items-start">
                <span className="leading-none">{option.label}</span>
                <span
                  className={cn(
                    "text-xs font-normal leading-none mt-0.5",
                    selected ? "text-gray-200" : "text-gray-500"
                  )}
                >
                  {option.description}
                </span>
              </div>
              {selected && (
                <Check className="w-4 h-4 ml-1 animate-in fade-in zoom-in duration-200" />
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Day Range Filter Skeleton Loader
// ============================================================================

export function DayRangeFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-14 w-36 bg-gray-200 rounded-full animate-pulse"
        />
      ))}
    </div>
  );
}

// ============================================================================
// Simple Day Range Pills (minimal design)
// ============================================================================

interface SimpleDayRangePillsProps {
  selectedRange?: DayRangeValue | null;
  onRangeChange: (range: DayRangeValue | null) => void;
  showAll?: boolean;
}

export function SimpleDayRangePills({
  selectedRange,
  onRangeChange,
  showAll = true,
}: SimpleDayRangePillsProps) {
  const options = showAll
    ? [{ value: null, label: "All Days" }, ...DAY_RANGE_OPTIONS]
    : DAY_RANGE_OPTIONS;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((option) => {
        const value = "value" in option ? option.value : null;
        const selected = selectedRange === value;

        return (
          <button
            key={option.label}
            onClick={() =>
              onRangeChange(value as DayRangeValue | null)
            }
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
              selected
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Day Range Slider (alternative input method)
// ============================================================================

interface DayRangeSliderProps {
  minDays: number;
  maxDays: number;
  onRangeChange: (min: number, max: number) => void;
  className?: string;
}

export function DayRangeSlider({
  minDays,
  maxDays,
  onRangeChange,
  className,
}: DayRangeSliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    onRangeChange(newMin, Math.max(newMin, maxDays));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    onRangeChange(Math.min(minDays, newMax), newMax);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Duration</span>
        <span className="text-sm text-gray-600">
          {minDays} - {maxDays === 30 ? "30+" : maxDays} days
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500">Min Days</label>
            <input
              type="range"
              min="1"
              max="30"
              value={minDays}
              onChange={handleMinChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500">Max Days</label>
            <input
              type="range"
              min="1"
              max="30"
              value={maxDays}
              onChange={handleMaxChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Day Range Badge (for displaying selected range)
// ============================================================================

interface DayRangeBadgeProps {
  range: DayRangeValue;
  onRemove?: () => void;
  className?: string;
}

export function DayRangeBadge({
  range,
  onRemove,
  className,
}: DayRangeBadgeProps) {
  const option = DAY_RANGE_OPTIONS.find((opt) => opt.value === range);

  if (!option) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium",
        className
      )}
    >
      <Calendar className="w-3.5 h-3.5" />
      <span>{option.label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
          aria-label="Remove filter"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

