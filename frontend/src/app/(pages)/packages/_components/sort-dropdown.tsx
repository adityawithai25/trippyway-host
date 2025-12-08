"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SortOption } from "@/types/packages";
import { SORT_OPTIONS } from "@/constants/package-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Star,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Check,
} from "lucide-react";

interface SortDropdownProps {
  selectedSort?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  className?: string;
}

// Icon mapping for sort options
const getSortIcon = (value: SortOption) => {
  const iconMap: Record<SortOption, any> = {
    featured: Sparkles,
    "price-low": ArrowDown,
    "price-high": ArrowUp,
    rating: Star,
    popularity: TrendingUp,
    newest: Calendar,
  };
  return iconMap[value] || ArrowUpDown;
};

export default function SortDropdown({
  selectedSort = "featured",
  onSortChange,
  className,
}: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortValue: SortOption) => {
    if (onSortChange) {
      onSortChange(sortValue);
      setIsOpen(false);
      return;
    }

    // Default URL-based behavior
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortValue === "featured") {
      // Remove sort param if it's the default
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }

    // Reset to first page when changing sort
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const currentSort = SORT_OPTIONS.find((opt) => opt.value === selectedSort);
  const CurrentIcon = getSortIcon(selectedSort);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-[180px] justify-between gap-2 border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 h-auto font-semibold text-sm",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CurrentIcon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-900">
              {currentSort?.label || "Sort by"}
            </span>
          </div>
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px] rounded-xl border-2 border-gray-100 shadow-lg p-2"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Sort By
        </div>
        {SORT_OPTIONS.map((option) => {
          const Icon = getSortIcon(option.value);
          const isSelected = selectedSort === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={cn(
                "flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                isSelected
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 mt-0.5 shrink-0",
                  isSelected ? "text-primary" : "text-gray-500"
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-semibold text-sm",
                      isSelected ? "text-primary" : "text-gray-900"
                    )}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {option.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================================
// Compact Sort Dropdown (for mobile)
// ============================================================================

export function CompactSortDropdown({
  selectedSort = "featured",
  onSortChange,
}: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sortValue: SortOption) => {
    if (onSortChange) {
      onSortChange(sortValue);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    
    if (sortValue === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }

    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={selectedSort}
      onChange={(e) => handleSortChange(e.target.value as SortOption)}
      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
