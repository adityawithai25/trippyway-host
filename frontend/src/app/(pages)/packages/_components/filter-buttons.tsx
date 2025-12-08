"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FILTERS } from "@/constants/trip-data";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  activeCategory: string;
  activeDuration: string;
}

export default function FilterButtons({
  activeCategory,
  activeDuration,
}: FilterButtonsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to convert lowercase URL value back to display value
  const fromUrlValue = (
    type: "category" | "duration",
    value: string
  ): string => {
    if (type === "category") {
      const categoryMap: Record<string, string> = {
        couples: "Couples",
        "girls-only": "Girls Only",
        "boys-only": "Boys Only",
        mixed: "Mixed",
      };
      return categoryMap[value.toLowerCase()] || "All";
    } else {
      // duration
      const durationMap: Record<string, string> = {
        "3d2n": "3D2N",
        "4d3n": "4D3N",
      };
      return durationMap[value.toLowerCase()] || "All";
    }
  };

  // Get current filters from URL (lowercase) and convert to display values
  const urlCategory = searchParams.get("category") || "";
  const urlDuration = searchParams.get("duration") || "";
  const currentCategory = urlCategory
    ? fromUrlValue("category", urlCategory)
    : activeCategory;
  const currentDuration = urlDuration
    ? fromUrlValue("duration", urlDuration)
    : activeDuration;

  // Helper to convert display value to lowercase URL value
  const toUrlValue = (type: "category" | "duration", value: string): string => {
    if (value === "All") return "";

    if (type === "category") {
      const categoryMap: Record<string, string> = {
        Couples: "couples",
        "Girls Only": "girls-only",
        "Boys Only": "boys-only",
        Mixed: "mixed",
      };
      return categoryMap[value] || value.toLowerCase().replace(/\s+/g, "-");
    } else {
      // duration
      const durationMap: Record<string, string> = {
        "3D2N": "3d2n",
        "4D3N": "4d3n",
      };
      return durationMap[value] || value.toLowerCase();
    }
  };

  // Update URL when filters change (store lowercase values)
  const updateFilter = (type: "category" | "duration", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const urlValue = toUrlValue(type, value);

    if (!urlValue || value === "All") {
      params.delete(type);
    } else {
      params.set(type, urlValue);
    }

    // Update URL without page reload
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10 justify-center items-center sm:sticky sm:top-16 sm:z-30 py-4 rounded-2xl backdrop-blur-sm bg-white/50 md:bg-transparent">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {FILTERS.categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => updateFilter("category", cat)}
            className={`px-5 py-2.5 hover:text-white! cursor-pointer rounded-full text-sm font-semibold transition-all duration-200 border shadow-sm hover:shadow-md ${
              currentCategory === cat
                ? "bg-primary text-white border-primary transform scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-600 hover:text-emerald-700"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300/50"></div>

      {/* Duration Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {FILTERS.durations.map((dur) => (
          <Button
            key={dur}
            onClick={() => updateFilter("duration", dur)}
            className={`px-5 py-2.5 rounded-full hover:bg-gray-800! hover:text-white! text-sm font-semibold transition-all duration-200 border shadow-sm hover:shadow-md ${
              currentDuration === dur
                ? "bg-gray-800 text-white border-gray-800 transform scale-105 hover:bg-gray-800! hover:text-white!"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-600  hover:bg-gray-800! hover:text-white!"
            }`}
          >
            {dur}
          </Button>
        ))}
      </div>
    </div>
  );
}
