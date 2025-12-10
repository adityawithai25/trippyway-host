"use client";

/**
 * TravelerSlider Component
 * Premium counter with +/- buttons for selecting number of travelers
 * Consistent design matching other search bar fields
 */

import { motion, AnimatePresence } from "motion/react";
import { Users, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelerSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function TravelerSlider({
  value,
  onChange,
  min = 1,
  max = 12,
  className,
}: TravelerSliderProps) {
  // Singular vs plural label
  const getTravelerLabel = (count: number) => {
    return count === 1 ? "Traveler" : "Travelers";
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      {/* Icon */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
        <Users className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      
      {/* Content - Label and Counter */}
      <div className="flex-1">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
          Travelers
        </p>
        
        {/* Counter Controls - Compact and clean */}
        <div className="flex items-center gap-3">
          {/* Decrement Button */}
          <button
            onClick={handleDecrement}
            disabled={value <= min}
            className={cn(
              "w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200",
              value <= min
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/25 active:scale-95"
            )}
            aria-label="Decrease travelers"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>

          {/* Count Display with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="min-w-[90px] text-center"
            >
              <span className="text-base sm:text-lg font-semibold text-white">
                {value} {getTravelerLabel(value)}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            disabled={value >= max}
            className={cn(
              "w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200",
              value >= max
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/25 active:scale-95"
            )}
            aria-label="Increase travelers"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
