"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useCallback } from "react";
import { MapPin, Calendar as CalendarIcon, Search, TrendingUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import TypingAnimation from "@/components/custom/typing-animation";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { searchLocations, POPULAR_INDIAN_DESTINATIONS, type SearchResult } from "@/lib/indianCitiesSearch";
import { TravelerSlider } from "@/components/ui/traveler-slider";

import {
  HERO_BACKGROUNDS,
  ROTATING_TEXTS,
  POPULAR_DESTINATIONS,
} from "@/constants/hero-section";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Search bar state
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const resultsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);
  
  // Handle destination search with instant results
  const handleDestinationChange = useCallback((value: string) => {
    setDestination(value);
    setSelectedIndex(-1);
    
    if (value.length >= 2) {
      setIsSearching(true);
      // Instant search - no debouncing needed for in-memory search
      const results = searchLocations(value, 8);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, []);
  
  const handleSelectDestination = (result: SearchResult) => {
    const displayName = result.type === 'zone' && result.parentCity 
      ? `${result.name}, ${result.parentCity}` 
      : result.name;
    setDestination(displayName);
    setShowDestinations(false);
    setSearchResults([]);
    setSelectedIndex(-1);
  };
  
  // Keyboard navigation with wrapping
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDestinations || searchResults.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0 // Loop to start
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1 // Loop to end
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleSelectDestination(searchResults[selectedIndex]);
        } else if (searchResults.length === 1) {
          // Auto-select if only one result
          handleSelectDestination(searchResults[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDestinations(false);
        setSearchResults([]);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        // Allow tab to work normally but close dropdown
        setShowDestinations(false);
        break;
    }
  }, [showDestinations, searchResults, selectedIndex]);
  
  // Highlight matching text in search results
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return <span>{text}</span>;
    
    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return (
        <>
          {parts.map((part, index) => 
            part.toLowerCase() === query.toLowerCase() ? (
              <span key={index} className="font-bold text-primary bg-primary/10 px-0.5 rounded">
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </>
      );
    } catch {
      return <span>{text}</span>;
    }
  };

  useEffect(() => {
    // Auto-change background every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_BACKGROUNDS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Mobile detection for responsive calendar
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle search submit
  const handleSearch = () => {
    if (!destination.trim()) {
      router.push("/packages");
      return;
    }

    const formatDateTime = (date: Date) => {
      // Format as YYYY-MM-DDTHH:mm (e.g., 2024-06-18T09:02)
      // This omits seconds and milliseconds, which is often preferable for UI/query strings
      return date.toISOString().slice(0, 16).split("T")[0];
    };

    const constructQueryParams = () => {
      const now = new Date();
      const defaultStart = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      const defaultEnd = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

      return new URLSearchParams({
        destination: destination.trim(),
        startDate: formatDateTime(startDate || defaultStart),
        endDate: formatDateTime(endDate || defaultEnd),
        budget: "20000", // Default budget
        peopleCount: travelers.toString(),
      }).toString();
    };
    router.push(
      `/query?${new URLSearchParams(constructQueryParams()).toString()}`
    );
  };

  // Professional date formatting with weekday
  const formatDatePro = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric" 
    });
  };

  // Calculate trip duration in nights
  const getTripDuration = () => {
    if (startDate && endDate) {
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      return nights === 1 ? "1 night" : `${nights} nights`;
    }
    return null;
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Images with Transition */}
      {HERO_BACKGROUNDS.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Fixed Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-4 animate-fade-in max-sm:mt-12">
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group relative rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-base text-white transition-all duration-300 ease-in hover:cursor-pointer hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 gap-3 transition ease-out">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-white text-sm tracking-wide">
                    TrippyAI Launching Soon
                  </span>
                </span>
              </AnimatedShinyText>
            </div>
          </div>

          {/* Overline - Small tagline */}
          <div className="flex items-center justify-center gap-2 max-sm:hidden">
            <div className="h-px w-12 bg-white"></div>
            <span className="text-sm  md:text-base font-semibold tracking-widest uppercase text-white ">
              Redefining Travel Planning
            </span>
            <div className="h-px w-12 bg-white"></div>
          </div>

          <h1 className="text-4xl font-sans md:text-5xl lg:text-6xl text-balance font-bold sm:leading-[1.1] leading-tight text-white ">
            Your Journey,{" "}
            <TypingAnimation
              className="text-primary"
              loop
              showCursor={false}
              words={ROTATING_TEXTS}
            />
          </h1>

          <p className="text-md md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-inter">
            Experience the future of travel with AI that understands your dreams
            and designs perfect itineraries in seconds.
          </p>

          {/* Hero Search Bar */}
          <div className="max-w-5xl mx-auto pt-6">
            <div className="w-full rounded-2xl bg-white/10 border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-3xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch divide-y divide-white/10 md:divide-y-0 md:divide-x md:divide-white/10">
                {/* Destination Input - Enhanced with professional search */}
                <div className="flex-1 min-w-0">
                  <Popover
                    open={showDestinations}
                    onOpenChange={setShowDestinations}
                  >
                    <PopoverTrigger asChild>
                      <div 
                        onClick={() => destinationInputRef.current?.focus()}
                        className="h-full px-5 sm:px-6 py-4 sm:py-5 cursor-text hover:bg-white/8 transition-all duration-200 flex items-center gap-4 min-h-[80px] sm:min-h-[88px]"
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white/15 transition-colors">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                            Where to
                          </p>
                          <input
                            ref={destinationInputRef}
                            type="text"
                            value={destination}
                            onChange={(e) => handleDestinationChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Goa, Manali, Delhi..."
                            className="w-full text-base sm:text-lg font-semibold text-white placeholder:text-white/40 bg-transparent border-none outline-none focus:ring-0 p-0 leading-tight"
                            onFocus={() => setShowDestinations(true)}
                            autoComplete="off"
                          />
                        </div>
                        {destination && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDestination("");
                              setSearchResults([]);
                            }}
                            className="text-white/50 hover:text-white transition-colors flex-shrink-0"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[420px] max-w-[calc(100vw-2rem)] p-0 border-border/50" align="start" sideOffset={8}>
                      <div className="max-h-[420px] overflow-y-auto">
                        {/* Search Results */}
                        {searchResults.length > 0 ? (
                          <div className="p-2">
                            <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                              <Search className="w-3.5 h-3.5 text-muted-foreground" />
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''} Found
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              {searchResults.map((result, index) => (
                                <button
                                  key={`${result.code}-${index}`}
                                  ref={(el) => { resultsRef.current[index] = el; }}
                                  onClick={() => handleSelectDestination(result)}
                                  onMouseEnter={() => setSelectedIndex(index)}
                                  className={cn(
                                    "w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg transition-all text-left group",
                                    selectedIndex === index 
                                      ? "bg-primary/15 ring-2 ring-primary/30" 
                                      : "hover:bg-accent"
                                  )}
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={cn(
                                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                                      selectedIndex === index 
                                        ? "bg-primary/20 ring-2 ring-primary/40" 
                                        : "bg-primary/10 group-hover:bg-primary/15"
                                    )}>
                                      <MapPin className={cn(
                                        "w-4 h-4",
                                        selectedIndex === index ? "text-primary" : "text-primary/80"
                                      )} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-sm truncate">
                                        {highlightMatch(result.name, destination)}
                                      </div>
                                      <div className="text-xs text-muted-foreground truncate">
                                        {result.type === 'zone' && result.parentCity 
                                          ? `${result.parentCity}, India` 
                                          : 'India'}
                                      </div>
                                    </div>
                                  </div>
                                  <span className={cn(
                                    "text-[10px] px-2 py-1 rounded-md font-medium flex-shrink-0",
                                    result.type === 'zone' 
                                      ? "bg-blue-50 text-blue-600" 
                                      : "bg-emerald-50 text-emerald-600"
                                  )}>
                                    {result.type === 'zone' ? '📍 Area' : '🏙️ City'}
                                  </span>
                                </button>
                              ))}
                            </div>
                            {/* Keyboard hint */}
                            <div className="px-2 pt-2 pb-1 text-[10px] text-muted-foreground flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] font-mono">↑↓</kbd>
                                Navigate
                              </span>
                              <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] font-mono">Enter</kbd>
                                Select
                              </span>
                              <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] font-mono">Esc</kbd>
                                Close
                              </span>
                            </div>
                          </div>
                        ) : destination.length > 0 && searchResults.length === 0 && !isSearching ? (
                          /* No results found */
                          <div className="p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                              <Search className="w-8 h-8 text-muted-foreground opacity-40" />
                            </div>
                            <p className="text-sm font-medium mb-1">No destinations found</p>
                            <p className="text-xs text-muted-foreground">
                              Try searching for "Goa", "Manali", or other Indian destinations
                            </p>
                          </div>
                        ) : isSearching ? (
                          /* Loading state */
                          <div className="p-4 text-center">
                            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                          </div>
                        ) : (
                          /* Popular and Trending Destinations */
                          <div className="p-3 space-y-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 px-1">
                                <div className="w-1 h-4 bg-primary rounded-full" />
                                <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                                  Popular Destinations
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {POPULAR_INDIAN_DESTINATIONS.filter(d => d.popular).slice(0, 6).map((dest) => (
                                  <button
                                    key={dest.code}
                                    onClick={() => {
                                      setDestination(dest.name);
                                      setShowDestinations(false);
                                    }}
                                    className="px-3 py-1.5 text-xs font-medium bg-accent hover:bg-primary hover:text-white rounded-lg transition-all hover:scale-105"
                                  >
                                    {dest.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2 pt-1 border-t border-border/50">
                              <div className="flex items-center gap-2 px-1">
                                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                                <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                                  Trending Now
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {POPULAR_INDIAN_DESTINATIONS.filter(d => d.trending).map((dest) => (
                                  <button
                                    key={dest.code}
                                    onClick={() => {
                                      setDestination(dest.name);
                                      setShowDestinations(false);
                                    }}
                                    className="px-3 py-1.5 text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white rounded-lg transition-all hover:scale-105 flex items-center gap-1"
                                  >
                                    {dest.name}
                                    <TrendingUp className="w-3 h-3" />
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            {/* Search tip */}
                            <div className="pt-2 border-t border-border/50">
                              <p className="text-[11px] text-muted-foreground text-center">
                                💡 Start typing to search from 130+ Indian destinations
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Travel Dates - Single Professional Field */}
                <div className="flex-1 min-w-0">
                  <Popover
                    open={showDatePicker}
                    onOpenChange={setShowDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <div className="h-full px-5 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-white/8 transition-all duration-200 flex items-center gap-4 min-h-[80px] sm:min-h-[88px]">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                            Travel dates
                          </p>
                          <p className="text-base sm:text-lg font-semibold text-white truncate leading-tight">
                            {startDate && endDate
                              ? `${formatDatePro(startDate)} → ${formatDatePro(endDate)}`
                              : startDate
                              ? `${formatDatePro(startDate)} → Select end`
                              : "Select dates"}
                          </p>
                          {getTripDuration() && (
                            <p className="text-xs text-white/50 mt-1 font-medium">
                              {getTripDuration()}
                            </p>
                          )}
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 max-w-[95vw]" align="center" sideOffset={8}>
                      <div className="p-4 space-y-4">
                        {/* Header with duration */}
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Select your travel dates</h3>
                          {getTripDuration() && (
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                                {getTripDuration()?.split(' ')[0]}
                              </span>
                              <span className="font-medium">{getTripDuration()}</span>
                            </p>
                          )}
                        </div>

                        {/* Calendar */}
                        <Calendar
                          mode="range"
                          selected={{
                            from: startDate || undefined,
                            to: endDate || undefined,
                          }}
                          onSelect={(range) => {
                            if (range?.from) {
                              setStartDate(range.from);
                              setEndDate(range.to || range.from);
                              // Auto-close when both dates are selected
                              if (range.to && range.to !== range.from) {
                                setTimeout(() => setShowDatePicker(false), 300);
                              }
                            }
                          }}
                          numberOfMonths={isMobile ? 1 : 2}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />

                        {/* Quick Duration Presets */}
                        <div className="pt-3 border-t">
                          <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wide">
                            Popular durations
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const today = new Date();
                                setStartDate(addDays(today, 7));
                                setEndDate(addDays(today, 9));
                                setTimeout(() => setShowDatePicker(false), 300);
                              }}
                              className="h-9 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                            >
                              Weekend (2N)
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const today = new Date();
                                setStartDate(addDays(today, 7));
                                setEndDate(addDays(today, 14));
                                setTimeout(() => setShowDatePicker(false), 300);
                              }}
                              className="h-9 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                            >
                              Week (7N)
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const today = new Date();
                                setStartDate(addDays(today, 7));
                                setEndDate(addDays(today, 21));
                                setTimeout(() => setShowDatePicker(false), 300);
                              }}
                              className="h-9 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                            >
                              2 Weeks (14N)
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const today = new Date();
                                setStartDate(addDays(today, 7));
                                setEndDate(addDays(today, 37));
                                setTimeout(() => setShowDatePicker(false), 300);
                              }}
                              className="h-9 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                            >
                              Month (30N)
                            </Button>
                          </div>
                        </div>

                        {/* Clear Button */}
                        {(startDate || endDate) && (
                          <div className="pt-3 border-t">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                              }}
                              className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            >
                              Clear dates
                            </Button>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Travelers Input */}
                <div className="flex-1 min-w-0">
                  <div className="h-full px-5 sm:px-6 py-4 sm:py-5 hover:bg-white/8 transition-all duration-200 flex items-center min-h-[80px] sm:min-h-[88px]">
                    <TravelerSlider
                      value={travelers}
                      onChange={setTravelers}
                      min={1}
                      max={12}
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:w-auto md:flex-shrink-0">
                  <div className="h-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={handleSearch}
                      className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-50 active:scale-95 rounded-xl md:rounded-full px-8 py-6 text-base font-bold flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all duration-200 min-h-[60px]"
                    >
                      <Search className="w-5 h-5" />
                      <span className="hidden sm:inline">Search</span>
                      <span className="sm:hidden">Search</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          {/* <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20">
              <span className="text-lg">⚡</span>
              <span className="text-sm text-white font-medium">
                Instant Itineraries
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20">
              <span className="text-lg">🎯</span>
              <span className="text-sm text-white font-medium">
                Personalized Plans
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20">
              <span className="text-lg">🧠</span>
              <span className="text-sm text-white font-medium">Smart AI</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
