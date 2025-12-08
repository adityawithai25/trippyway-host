"use client";

import { useState } from "react";
import { Trip } from "@/constants/trip-data";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { InteractiveButtons } from "./interactive-buttons";
import { BookingSidebar } from "./booking-sidebar";
import { PackageContent } from "./package-content";
import { BookingSuccessModal } from "./booking-success-modal";

interface PackageDetails {
  images: string[];
  description: string;
  whatsappNumber: string;
  itinerary: Array<{
    day: string;
    title: string;
    activities: Array<{
      time: string;
      title: string;
      description: string;
      icon: string;
      highlight?: boolean;
    }>;
  }>;
  included: Array<string | { title: string; description: string }>;
  notIncluded: Array<string | { title: string; description: string }>;
  thingsToCarry: string[];
}

interface PackageDetailClientProps {
  trip: Trip;
  details: PackageDetails;
  isAuthenticated: boolean;
}

export default function PackageDetailClient({
  trip,
  details,
  isAuthenticated,
}: PackageDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleWhatsAppConnect = () => {
    const planDetails = `
📦 *Package Details:*
• *Trip:* ${trip.title}
• *Location:* ${trip.location}
• *Duration:* ${trip.duration}
• *Dates:* ${trip.startDate} - ${trip.endDate}
• *Price:* ₹${trip.price.toLocaleString("en-IN")} per person
• *Category:* ${trip.category}
• *Package Type:* ${trip.packageType}
• *Spots Available:* ${trip.spotsLeft} out of ${trip.totalSpots}
• *Rating:* ${trip.rating} ⭐ (${trip.reviews} reviews)

${details.description}

I'm interested in booking this package. Please share more details and availability.
    `.trim();

    const message = encodeURIComponent(planDetails);
    const whatsappUrl = `https://wa.me/${details.whatsappNumber.replace(
      /\D/g,
      ""
    )}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: trip.title,
        text: `Check out this amazing trip to ${trip.location}!`,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {/* Image Gallery Grid */}
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 h-[300px] md:h-[380px]">
            {/* Large main image */}
            <button className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden group">
              <Image
                src={details.images[0]}
                alt={`${trip.location} - Main view`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>

            {/* Grid of smaller images */}
            {details.images.slice(1, 5).map((image: string, index: number) => (
              <button key={index} className="relative overflow-hidden group">
                <Image
                  src={image}
                  alt={`${trip.location} - Image ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {index === 3 && details.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{details.images.length - 5} more
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Floating action buttons */}
          <InteractiveButtons
            isLiked={isLiked}
            onLike={() => setIsLiked(!isLiked)}
            onShare={handleShare}
          />

          {/* Trip title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {trip.startDate} - {trip.endDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {trip.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {trip.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Content */}
          <PackageContent
            details={details}
            tripId={trip.id}
            isAuthenticated={isAuthenticated}
          />

          {/* Right Side - Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              trip={trip}
              whatsappNumber={details.whatsappNumber}
              isAuthenticated={isAuthenticated}
              onWhatsAppClick={() => {
                setShowSuccessModal(true);
                setTimeout(() => {
                  handleWhatsAppConnect();
                }, 500);
              }}
            />
          </div>
        </div>
      </div>

      {/* Booking Success Modal */}
      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        tripTitle={trip.title}
      />
    </>
  );
}
