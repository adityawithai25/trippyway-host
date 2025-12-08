"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Clock, MapPin, Calendar } from "lucide-react";
import { TravelPackageWithThemes } from "@/types/packages";
import { Button } from "@/components/ui/button";
import { getThemeIcon } from "@/constants/package-filters";
import {
  formatDuration,
  formatPrice,
  calculateDiscount,
  getAvailabilityStatus,
  getTagColor,
} from "@/constants/package-filters";

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
  const mainImage = Array.isArray(pkg.images) && pkg.images.length > 0
    ? (typeof pkg.images[0] === 'string' ? pkg.images[0] : pkg.images[0].url)
    : typeof pkg.images === 'string'
    ? pkg.images
    : "/placeholder.svg";

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-[250ms] border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {pkg.is_featured && (
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm border border-gray-200/50">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-semibold">Featured</span>
            </div>
          )}
          {pkg.tags && pkg.tags.length > 0 && (
            <div className={`${getTagColor(pkg.tags[0])} backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm`}>
              <span className="text-[11px] font-semibold">{pkg.tags[0]}</span>
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-red-600 px-2.5 py-1 rounded-md shadow-sm border border-red-200/50">
            <span className="text-[11px] font-bold">{discount}% OFF</span>
          </div>
        )}
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
              <span className="text-[10px] text-gray-400 uppercase">From</span>
              {pkg.original_price && (
                <span className="text-xs text-gray-400 line-through leading-none">
                  {formatPrice(Number(pkg.original_price), pkg.currency)}
                </span>
              )}
              <span className="text-lg font-bold text-emerald-700 leading-none">
                {formatPrice(Number(pkg.price_per_person), pkg.currency)}
              </span>
              <span className="text-[10px] text-gray-400">per person</span>
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

        {/* Button */}
        <Button
          className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold transition-all duration-[250ms] text-sm shadow-sm pointer-events-none"
          onClick={(e) => e.preventDefault()}
        >
          View Detailed Plan
        </Button>
      </div>
    </Link>
  );
});

PackageCard.displayName = "PackageCard";

export default PackageCard;


