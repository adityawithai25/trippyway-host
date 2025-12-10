"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Clock, MapPin, Calendar, Phone } from "lucide-react";
import { TravelPackageWithThemes } from "@/types/packages";
import { Button } from "@/components/ui/button";
import { ImageSlider } from "@/components/ui/image-slider";
import { getThemeIcon } from "@/constants/package-filters";
import {
  formatDuration,
  formatPrice,
  calculateDiscount,
  getAvailabilityStatus,
  getTagColor,
} from "@/constants/package-filters";
import { WHATSAPP_NUMBER } from "@/constants/whatsapp";

interface PackageCardProps {
  package: TravelPackageWithThemes;
}

const PackageCard = memo(function PackageCard({ package: pkg }: PackageCardProps) {
  // Calculate percentage booked
  const bookedPercentage = pkg.spots_total > 0
    ? Math.round(
        ((pkg.spots_total - pkg.spots_available) / pkg.spots_total) * 100
      )
    : 0;

  const discount = calculateDiscount(
    Number(pkg.price_per_person),
    pkg.original_price ? Number(pkg.original_price) : null
  );
  const availabilityStatus = getAvailabilityStatus(
    pkg.spots_available,
    pkg.spots_total
  );
  const primaryTheme = pkg.themes?.find((t) => t.is_primary) || pkg.themes?.[0];
  
  // Handle multiple images for slider
  const packageImages = Array.isArray(pkg.images) && pkg.images.length > 0
    ? pkg.images.map((img) => typeof img === 'string' ? img : img.url)
    : typeof pkg.images === 'string'
    ? [pkg.images]
    : ["/placeholder.svg"];

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-[250ms] border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container with Slider - Enhanced Size */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden bg-gray-100">
        {packageImages.length > 1 ? (
          <ImageSlider
            images={packageImages}
            alt={pkg.title}
            className="group-hover:scale-[1.08] transition-all duration-700 ease-out"
          />
        ) : (
          <Image
            src={packageImages[0]}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.08] transition-all duration-700 ease-out"
            quality={90}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5">
          {pkg.is_featured && (
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-gray-200/50">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-semibold">Featured</span>
            </div>
          )}
          {pkg.tags && pkg.tags.length > 0 && (
            <div className={`${getTagColor(pkg.tags[0])} backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md`}>
              <span className="text-[11px] font-semibold">{pkg.tags[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Meta Header with Theme */}
        <div className="flex items-center justify-between text-[11px] font-semibold mb-2.5 tracking-wide uppercase">
          <div className="flex items-center gap-1.5 flex-wrap">
            {pkg.category && (
              <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md border border-gray-200">
                {pkg.category}
              </span>
            )}
            {primaryTheme && (
              <span
                className="px-2 py-1 rounded-md border"
                style={{ 
                  color: primaryTheme.color || "#6B7280",
                  borderColor: primaryTheme.color || "#E5E7EB",
                  backgroundColor: `${primaryTheme.color}08` || "#F9FAFB"
                }}
              >
                {primaryTheme.name}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-gray-500 font-medium">
            {formatDuration(pkg.duration_days, pkg.duration_nights)}
          </span>
        </div>

        {/* Title & Location */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 flex-1 pr-2">
              {pkg.title}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-gray-500 uppercase font-medium mb-0.5">Starting From</span>
              {pkg.original_price && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base font-semibold text-gray-400 line-through decoration-2">
                    {formatPrice(Number(pkg.original_price), pkg.currency)}
                  </span>
                  {discount && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              )}
              <span className="text-2xl font-bold text-emerald-700 leading-none">
                {formatPrice(Number(pkg.price_per_person), pkg.currency)}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">per person</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-[-4px]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{pkg.location}</span>
          </div>
        </div>

        {/* Date & Rating Row */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {pkg.start_date && pkg.end_date ? (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-xs">
                {new Date(pkg.start_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {" - "}
                {new Date(pkg.end_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-xs">Flexible Dates</span>
            </div>
          )}
          <div className="flex items-center gap-1 font-bold text-gray-800">
            <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>{Number(pkg.rating).toFixed(1)}</span>
            <span className="text-xs text-gray-500 font-normal">
              ({pkg.review_count})
            </span>
          </div>
        </div>

        {/* Spacer to push bottom elements down */}
        <div className="flex-1"></div>

        {/* Booking Status */}
        {pkg.spots_total > 0 && (
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs mb-2">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {pkg.spots_total - pkg.spots_available} joined
                </span>
              </div>
              {availabilityStatus === "limited" ? (
                <span className="bg-white text-amber-700 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                  {pkg.spots_available} spots left
                </span>
              ) : availabilityStatus === "full" ? (
                <span className="bg-white text-red-700 px-2.5 py-1 rounded-md font-semibold border border-red-200">
                  Sold Out
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  {pkg.spots_available} spots available
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  availabilityStatus === "full"
                    ? "bg-gradient-to-r from-red-600 to-red-500"
                    : availabilityStatus === "limited"
                    ? "bg-gradient-to-r from-amber-600 to-amber-500"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-500"
                }`}
                style={{ width: `${bookedPercentage}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-[10px] text-gray-400">
                {bookedPercentage}% booked
              </span>
            </div>
          </div>
        )}

        {/* Button with Call Icon */}
        <div className="flex gap-2.5">
          <Button
            className="flex-1 h-11 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold transition-all duration-[250ms] text-sm shadow-sm pointer-events-none"
            onClick={(e) => e.preventDefault()}
          >
            View Detailed Plan
          </Button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`tel:+${WHATSAPP_NUMBER}`, '_self');
            }}
            className="group flex-shrink-0 w-11 h-11 flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.08] active:scale-95 relative overflow-hidden pointer-events-auto"
            aria-label="Call for personalized planning"
          >
            {/* Animated background shine */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            {/* Phone Icon */}
            <Phone className="w-[18px] h-[18px] relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
            
            {/* Pulsing indicator dot - smaller and more subtle */}
            <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
});

PackageCard.displayName = "PackageCard";

export default PackageCard;


