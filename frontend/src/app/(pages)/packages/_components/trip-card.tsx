"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Clock, MapPin, Phone } from "lucide-react";
import { Trip } from "@/constants/trip-data";
import { Button } from "@/components/ui/button";
import { ImageSlider } from "@/components/ui/image-slider";
import { WHATSAPP_NUMBER } from "@/constants/whatsapp";

interface TripCardProps {
  trip: Trip;
}

const TripCard = memo(function TripCard({ trip }: TripCardProps) {
  // const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  // const favorite = isFavorite(trip.id);

  // Calculate percentage booked
  const bookedPercentage = Math.round(
    ((trip.totalSpots - trip.spotsLeft) / trip.totalSpots) * 100
  );

  // const handleFavoriteClick = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!isLoading) {
  //     await toggleFavorite(trip.id);
  //   }
  // };

  return (
    <Link
      href={`/packages/${trip.id}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-[250ms] border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container with Slider - Enhanced Size */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden bg-gray-100">
        {trip.images && trip.images.length > 0 ? (
          <ImageSlider
            images={trip.images}
            alt={trip.title}
            className="group-hover:scale-[1.08] transition-all duration-700 ease-out"
          />
        ) : (
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.08] transition-all duration-700 ease-out"
            quality={90}
          />
        )}

        {/* Top Badge */}
        <div className="absolute top-3 left-3 z-30 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-gray-200/50">
          <span className="text-[11px] font-semibold text-gray-800">
            {trip.tags[0] || "Featured"}
          </span>
        </div>

        {/* Heart Icon */}
        {/* <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm group-hover:scale-110 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button> */}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Meta Header */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-2.5 tracking-wide uppercase">
          <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md border border-gray-200">
            {trip.category}
          </span>
          <span className="flex items-center gap-1 font-medium">{trip.duration}</span>
        </div>

        {/* Title & Location */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 flex-1 pr-2">
              {trip.title}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-gray-500 uppercase font-medium mb-0.5">Starting From</span>
              {trip.originalPrice && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base font-semibold text-gray-400 line-through decoration-2">
                    ₹{trip.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    {Math.round(((trip.originalPrice - trip.price) / trip.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
              <span className="text-2xl font-bold text-emerald-700 leading-none">
                ₹{trip.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">per person</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-[-4px]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{trip.location}</span>
          </div>
        </div>

        {/* Date & Rating Row */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">
              {trip.startDate} - {trip.endDate}
            </span>
          </div>
          <div className="flex items-center gap-1 font-bold text-gray-800">
            <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>{trip.rating}</span>
          </div>
        </div>

        {/* Spacer to push bottom elements down */}
        <div className="flex-1"></div>

        {/* Booking Status */}
        <div className="mb-5">
          <div className="flex justify-between items-center text-xs mb-2">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Users className="w-3.5 h-3.5" />
              <span>{trip.totalSpots - trip.spotsLeft} joined</span>
            </div>
            {trip.spotsLeft <= 5 ? (
              <span className="bg-white text-amber-700 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                {trip.spotsLeft} spots left
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold">
                {trip.spotsLeft} spots available
              </span>
            )}
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-600 to-emerald-500`}
              style={{ width: `${bookedPercentage}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-[10px] text-gray-400">
              {bookedPercentage}% booked
            </span>
          </div>
        </div>

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

TripCard.displayName = "TripCard";

export default TripCard;
