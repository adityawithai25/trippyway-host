"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PackageTheme } from "@/types/packages";
import { getThemeIcon } from "@/constants/package-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeChipsProps {
  themes: PackageTheme[];
  selectedThemes: string[];
  onThemeToggle?: (themeSlug: string) => void;
  className?: string;
}

export default function ThemeChips({
  themes,
  selectedThemes,
  onThemeToggle,
  className,
}: ThemeChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleThemeClick = (themeSlug: string) => {
    if (onThemeToggle) {
      onThemeToggle(themeSlug);
      return;
    }

    // Default URL-based behavior
    const params = new URLSearchParams(searchParams.toString());
    const currentThemes = params.get("themes")?.split(",").filter(Boolean) || [];

    const newThemes = currentThemes.includes(themeSlug)
      ? currentThemes.filter((t) => t !== themeSlug)
      : [...currentThemes, themeSlug];

    if (newThemes.length === 0) {
      params.delete("themes");
    } else {
      params.set("themes", newThemes.join(","));
    }

    // Reset to first page when changing filters
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isSelected = (themeSlug: string) => selectedThemes.includes(themeSlug);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 md:gap-3 justify-center items-center",
        className
      )}
    >
      {themes.map((theme) => {
        const Icon = getThemeIcon(theme.icon || "compass");
        const selected = isSelected(theme.slug);

        return (
          <Button
            key={theme.id}
            onClick={() => handleThemeClick(theme.slug)}
            variant="outline"
            className={cn(
              "relative px-4 py-2.5 h-auto rounded-full text-sm font-semibold transition-all duration-200 border-2 shadow-sm hover:shadow-md group",
              selected
                ? "border-primary bg-primary text-white hover:bg-primary/90 transform scale-105"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            )}
            style={
              selected && theme.color
                ? {
                    backgroundColor: theme.color,
                    borderColor: theme.color,
                  }
                : {}
            }
          >
            <div className="flex items-center gap-2">
              <Icon
                className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  selected ? "text-white" : "text-gray-600"
                )}
              />
              <span>{theme.name}</span>
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
// Theme Chips Skeleton Loader
// ============================================================================

export function ThemeChipsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"
        />
      ))}
    </div>
  );
}

// ============================================================================
// Compact Theme Chips (for mobile or smaller spaces)
// ============================================================================

interface CompactThemeChipsProps {
  themes: PackageTheme[];
  selectedThemes: string[];
  onThemeToggle: (themeSlug: string) => void;
  maxVisible?: number;
}

export function CompactThemeChips({
  themes,
  selectedThemes,
  onThemeToggle,
  maxVisible = 4,
}: CompactThemeChipsProps) {
  const visibleThemes = themes.slice(0, maxVisible);
  const remainingCount = themes.length - maxVisible;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {visibleThemes.map((theme) => {
        const Icon = getThemeIcon(theme.icon || "compass");
        const selected = selectedThemes.includes(theme.slug);

        return (
          <button
            key={theme.id}
            onClick={() => onThemeToggle(theme.slug)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0",
              selected
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            )}
            style={
              selected && theme.color
                ? {
                    backgroundColor: theme.color,
                    borderColor: theme.color,
                  }
                : {}
            }
          >
            <Icon className="w-3 h-3" />
            <span>{theme.name}</span>
          </button>
        );
      })}
      {remainingCount > 0 && (
        <button className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-gray-100 text-gray-600 border border-gray-200 shrink-0">
          +{remainingCount} more
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Theme Pills with Count (shows number of packages per theme)
// ============================================================================

interface ThemePillsProps {
  themes: PackageTheme[];
  selectedThemes: string[];
  themeCounts?: Record<string, number>;
  onThemeToggle: (themeSlug: string) => void;
}

export function ThemePills({
  themes,
  selectedThemes,
  themeCounts,
  onThemeToggle,
}: ThemePillsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {themes.map((theme) => {
        const Icon = getThemeIcon(theme.icon || "compass");
        const selected = selectedThemes.includes(theme.slug);
        const count = themeCounts?.[theme.slug];

        return (
          <button
            key={theme.id}
            onClick={() => onThemeToggle(theme.slug)}
            className={cn(
              "group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border-2",
              selected
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md"
            )}
            style={
              selected && theme.color
                ? {
                    backgroundColor: theme.color,
                    borderColor: theme.color,
                  }
                : {}
            }
          >
            <Icon
              className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
                selected ? "text-white" : "text-gray-600"
              )}
            />
            <span>{theme.name}</span>
            {count !== undefined && count > 0 && (
              <span
                className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold",
                  selected
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

