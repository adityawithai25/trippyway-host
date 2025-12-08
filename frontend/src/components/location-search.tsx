"use client";

/**
 * LocationSearch Component
 * Fast client-side autocomplete for Indian cities and zones
 * Uses in-memory search for instant results
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, TrendingUp, Star, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  searchLocations,
  POPULAR_INDIAN_DESTINATIONS,
  type SearchResult,
} from "@/lib/indianCitiesSearch";

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  showPopular?: boolean;
  showTrending?: boolean;
}

export function LocationSearch({
  value,
  onChange,
  placeholder = "Search cities, areas...",
  label = "Where do you want to go?",
  className,
  showPopular = true,
  showTrending = true,
}: LocationSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search on input change - instant suggestions on every keystroke
  const handleSearch = useCallback((query: string) => {
    if (query.trim().length > 0) {
      const results = searchLocations(query, 8);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, []);

  // Effect to run search when value changes
  useEffect(() => {
    handleSearch(value);
  }, [value, handleSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle result selection
  const handleSelect = (result: SearchResult) => {
    const displayName =
      result.type === "zone" && result.parentCity
        ? `${result.name}, ${result.parentCity}`
        : result.name;
    onChange(displayName);
    setIsFocused(false);
  };

  // Handle quick select from popular/trending
  const handleQuickSelect = (destination: { name: string }) => {
    onChange(destination.name);
    setIsFocused(false);
  };

  // Clear input
  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const popularDests = POPULAR_INDIAN_DESTINATIONS.filter((d) => d.popular);
  const trendingDests = POPULAR_INDIAN_DESTINATIONS.filter((d) => d.trending);

  return (
    <div ref={containerRef} className={cn("space-y-3", className)}>
      {label && (
        <label className="text-sm font-medium flex items-center gap-2 text-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          {label}
        </label>
      )}

      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="h-11 pl-10 pr-10 text-base"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {isFocused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full mt-2 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
            >
              <div className="p-1.5 space-y-0.5 max-h-72 overflow-y-auto">
                {suggestions.map((result, index) => (
                  <motion.button
                    key={`${result.name}-${result.code}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    type="button"
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{result.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.type === "zone" && result.parentCity
                            ? `${result.parentCity}, India`
                            : "India"}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {result.type === "zone" ? "Area" : "City"}
                    </Badge>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Select Chips - Only show when input is empty and focused */}
      {!value && isFocused && (showPopular || showTrending) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3 pt-1"
        >
          {/* Popular Destinations */}
          {showPopular && popularDests.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-medium text-muted-foreground">
                  Popular
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularDests.slice(0, 6).map((dest) => (
                  <button
                    key={dest.name}
                    type="button"
                    onClick={() => handleQuickSelect(dest)}
                    className="px-2.5 py-1 text-xs font-medium bg-accent/50 hover:bg-accent border border-border rounded-full transition-all hover:scale-105"
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Destinations */}
          {showTrending && trendingDests.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium text-muted-foreground">
                  Trending
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {trendingDests.map((dest) => (
                  <button
                    key={dest.name}
                    type="button"
                    onClick={() => handleQuickSelect(dest)}
                    className="px-2.5 py-1 text-xs font-medium bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full transition-all hover:scale-105 flex items-center gap-1"
                  >
                    {dest.name}
                    <TrendingUp className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default LocationSearch;


