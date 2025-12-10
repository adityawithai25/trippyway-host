"use client";

import { useState, useRef, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Track scroll position to update active image indicator
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const scrollLeft = gallery.scrollLeft;
      const itemWidth = gallery.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setCurrentImageIndex(index);
    };

    gallery.addEventListener("scroll", handleScroll);
    return () => gallery.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppConnect = () => {
    const planDetails = `
📦 *Package Details:*
• *Trip:* ${trip.title}
• *Location:* ${trip.location}
• *Duration:* ${trip.duration}
• *Dates:* ${trip.startDate} - ${trip.endDate}
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
          {/* Mobile: Horizontal Scrollable Gallery */}
          <div className="md:hidden">
            <div
              ref={galleryRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth h-[300px]"
            >
              {details.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative min-w-full snap-center snap-always flex-shrink-0"
                >
                  <Image
                    src={image}
                    alt={`${trip.location} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            
            {/* Image counter for mobile */}
            <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg border border-white/10">
              {currentImageIndex + 1}/{details.images.length}
            </div>

            {/* Scroll indicator dots for mobile */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              {details.images.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    const gallery = galleryRef.current;
                    if (gallery) {
                      gallery.scrollTo({
                        left: index * gallery.offsetWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex
                      ? "w-6 h-2 bg-white shadow-lg"
                      : "w-2 h-2 bg-white/60 hover:bg-white/90"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-4 gap-1.5 h-[380px]">
            {/* Large main image */}
            <button className="col-span-2 row-span-2 relative overflow-hidden group">
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
