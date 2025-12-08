"use client";

/**
 * ThemeDestinationCard Component
 * Displays theme-based destinations with images, highlights, and CTA
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Camera, Briefcase, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ThemeDestination } from "@/constants/theme-destinations";

interface ThemeDestinationCardProps {
  theme: ThemeDestination;
  onCtaClick: (themeSlug: string) => void;
  className?: string;
}

// Map icon names to actual Lucide icons
const iconMap = {
  Heart,
  Camera,
  Briefcase,
  Sparkles,
};

export function ThemeDestinationCard({
  theme,
  onCtaClick,
  className,
}: ThemeDestinationCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get the icon component
  const IconComponent = iconMap[theme.icon as keyof typeof iconMap] || MapPin;

  // Show first 3 destinations in the card
  const displayDestinations = theme.destinations.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100",
        className
      )}
    >
      {/* Header Section */}
      <div className="p-6 pb-5 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-start gap-3.5">
          {/* Icon Badge */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${theme.color}20` }}
          >
            <IconComponent
              className="w-6 h-6"
              style={{ color: theme.color }}
            />
          </motion.div>

          {/* Theme Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1.5 leading-tight">
              {theme.themeName}
            </h3>
            <p
              className="text-sm font-semibold mb-2 line-clamp-2 leading-snug"
              style={{ color: theme.color }}
            >
              {theme.tagline}
            </p>
            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
              {theme.description}
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="p-4 pt-2">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {displayDestinations.map((destination, index) => (
            <motion.div
              key={destination.cityCode}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer group/dest"
            >
              {/* Destination Image */}
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover/dest:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 transition-opacity duration-300" />

              {/* Destination Name */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3 h-3 text-white" />
                  <h4 className="text-sm font-bold text-white">
                    {destination.name}
                  </h4>
                </div>

                {/* Highlights - Show on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-1"
                  >
                    {destination.highlights.slice(0, 2).map((highlight, i) => (
                      <p key={i} className="text-[10px] text-white/90 leading-tight flex items-start gap-1">
                        <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                        <span className="line-clamp-1">{highlight}</span>
                      </p>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Hover Ring */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: hoveredIndex === index
                    ? `inset 0 0 0 2px ${theme.color}`
                    : 'none',
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Destination Count Badge */}
        {theme.destinations.length > 3 && (
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <MapPin className="w-3 h-3" />
              +{theme.destinations.length - 3} more destinations
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={() => onCtaClick(theme.themeSlug)}
          size="lg"
          className="w-full group/btn font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          style={{
            backgroundColor: theme.color,
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Explore Curated Packages</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      </div>

      {/* Decorative Corner Gradient */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.color }}
      />
    </motion.div>
  );
}
