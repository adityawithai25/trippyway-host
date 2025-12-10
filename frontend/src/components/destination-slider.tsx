"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DESTINATIONS, type Destination } from "@/constants/destinations";
import { cn } from "@/lib/utils";

/**
 * DestinationSlider Component
 * Professional horizontal scrollable navigation with emoji icons and green theme
 * Features: Sticky positioning, smooth scroll, active states, navigation arrows
 */
export function DestinationSlider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeDestination, setActiveDestination] = useState<string>("explore");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Sync active destination from URL params
  useEffect(() => {
    try {
      const destination = searchParams.get("destination");
      if (destination) {
        // Validate that the destination exists in our list
        const validDestination = DESTINATIONS.find(d => d.slug === destination);
        if (validDestination) {
          setActiveDestination(validDestination.id);
        } else {
          setActiveDestination("explore");
        }
      } else {
        setActiveDestination("explore");
      }
    } catch (error) {
      // Fallback to explore if there's any error
      setActiveDestination("explore");
    }
  }, [searchParams]);

  // Check scroll position to show/hide arrows
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    container.addEventListener("scroll", checkScroll);
    // Check on mount and after a brief delay for proper measurement
    checkScroll();
    const timeoutId = setTimeout(checkScroll, 100);
    
    return () => {
      container.removeEventListener("scroll", checkScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollLeft = useCallback(() => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }, []);

  const handleDestinationClick = useCallback((destination: Destination) => {
    setActiveDestination(destination.id);
    
    if (destination.slug) {
      router.push(`/packages?destination=${destination.slug}`);
    } else {
      router.push("/packages");
    }
  }, [router]);

  return (
    <div className="sticky top-[var(--header-height-mobile)] md:top-[var(--header-height-desktop)] z-30 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-[1200px] px-0 sm:px-6 lg:px-8">
        <div className="relative" role="region" aria-roledescription="carousel">
          {/* Scrollable container */}
          <div
            ref={containerRef}
            className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex -ml-2 w-full">
              {DESTINATIONS.map((destination, index) => (
                <div
                  key={destination.id}
                  role="group"
                  aria-roledescription="slide"
                  className={cn(
                    "min-w-0 shrink-0 basis-auto",
                    index === 0 ? "pl-6 sm:pl-2" : "pl-2"
                  )}
                >
                  <button
                    onClick={() => handleDestinationClick(destination)}
                    data-state={
                      activeDestination === destination.id ? "active" : "inactive"
                    }
                    className={cn(
                      "group relative mt-2 md:mt-3 mb-2 flex min-w-max cursor-pointer flex-col items-center justify-center gap-2 px-4 py-3 text-sm font-medium outline-none transition-all duration-300",
                      "rounded-2xl",
                      activeDestination === destination.id
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md scale-105"
                        : "hover:bg-gray-50/80 hover:scale-102"
                    )}
                  >
                    <div className="relative flex flex-col items-center justify-center transition-all duration-300">
                      {/* Emoji Icon with aesthetic background */}
                      <div className={cn(
                        "relative mb-1.5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 shadow-sm",
                        activeDestination === destination.id 
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-200 shadow-lg scale-110 rotate-3" 
                          : "bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-emerald-100 group-hover:to-teal-100 group-hover:shadow-md group-hover:scale-105 group-hover:-rotate-2"
                      )}>
                        <span 
                          role="img" 
                          aria-label={destination.name}
                          className="relative z-10 drop-shadow-sm"
                        >
                          {destination.icon}
                        </span>
                      </div>
                      <span className={cn(
                        "whitespace-nowrap font-semibold text-xs transition-colors duration-300",
                        activeDestination === destination.id
                          ? "text-emerald-700"
                          : "text-gray-700 group-hover:text-emerald-600"
                      )}>
                        {destination.name}
                      </span>
                    </div>
                    
                    {/* Trending badge */}
                    {destination.trending && (
                      <div className="absolute -top-1 -right-2 flex items-center gap-0.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Left navigation arrow - desktop only */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className={cn(
                "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3",
                "size-11 rounded-full bg-white border border-gray-200 shadow-xl items-center justify-center",
                "hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300",
                "text-gray-600 hover:text-emerald-600 hover:scale-110 active:scale-95"
              )}
              aria-label="Previous destinations"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right navigation arrow - desktop only */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className={cn(
                "hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3",
                "size-11 rounded-full bg-white border border-gray-200 shadow-xl items-center justify-center",
                "hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300",
                "text-gray-600 hover:text-emerald-600 hover:scale-110 active:scale-95"
              )}
              aria-label="Next destinations"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



