"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IndianRupee,
  CheckCircle2,
  MessageCircle,
  Loader2,
  Star,
  Phone,
  Users,
} from "lucide-react";
import { Trip } from "@/constants/trip-data";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BookingSidebarProps {
  trip: Trip;
  whatsappNumber: string;
  isAuthenticated: boolean;
  onWhatsAppClick: () => void;
}

export function BookingSidebar({
  trip,
  whatsappNumber,
  isAuthenticated,
  onWhatsAppClick,
}: BookingSidebarProps) {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [isWhatsAppAnimating, setIsWhatsAppAnimating] = useState(false);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push("/sign-up");
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      onWhatsAppClick();
    }, 1500);
  };

  const handleWhatsAppConnect = () => {
    setIsWhatsAppAnimating(true);
    setTimeout(() => {
      onWhatsAppClick();
      setIsWhatsAppAnimating(false);
    }, 300);
  };

  const spotsPercentage =
    ((trip.totalSpots - trip.spotsLeft) / trip.totalSpots) * 100;

  return (
    <div className="sticky top-20 space-y-4">
      <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow duration-[250ms] bg-gradient-to-br from-white to-emerald-50/30 py-3 sm:py-4">
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-emerald-800 animate-in fade-in duration-500">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                {trip.price.toLocaleString("en-IN")}
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">per person</span>
            </div>
            {trip.originalPrice && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground line-through">
                  ₹{trip.originalPrice.toLocaleString("en-IN")}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(
                    ((trip.originalPrice - trip.price) / trip.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-1.5">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 fill-emerald-600" />
              <span>
                {trip.rating} ({trip.reviews} reviews)
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Departure</span>
              <span className="font-medium">{trip.startDate}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Return</span>
              <span className="font-medium">{trip.endDate}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{trip.duration}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Category</span>
              <Badge
                variant="secondary"
                className="text-xs bg-emerald-100 text-emerald-800"
              >
                {trip.category}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs md:text-sm font-medium">
                Booking Status
              </span>
              <Badge
                variant={trip.spotsLeft <= 5 ? "destructive" : "secondary"}
                className={`text-xs ${trip.spotsLeft <= 5 ? "animate-pulse" : ""}`}
              >
                {trip.spotsLeft} spots left
              </Badge>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                style={{ width: `${spotsPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {trip.totalSpots - trip.spotsLeft} travelers joined
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              onClick={handleBookNow}
              disabled={trip.spotsLeft === 0 || isBooking}
              className="w-full h-11 sm:h-12 text-sm md:text-base font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white relative overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
              size="lg"
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : trip.spotsLeft === 0 ? (
                "Sold Out"
              ) : isAuthenticated ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Book Now
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Sign Up to Book
                </>
              )}
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </Button>

            {/* Personalized Planning Consultant Button */}
            <div className="relative">
              <Button
                onClick={handleWhatsAppConnect}
                variant="outline"
                className={cn(
                  "w-full h-11 sm:h-12 text-sm md:text-base font-bold rounded-xl border-2 border-emerald-500 text-emerald-700 relative overflow-hidden group transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg active:scale-95",
                  isWhatsAppAnimating && "ring-4 ring-emerald-200 bg-emerald-50"
                )}
                size="lg"
              >
                {/* Animated background pulse */}
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 animate-[wiggle_1s_ease-in-out_infinite]" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-semibold text-emerald-600">Free Consultation</span>
                    <span className="text-sm font-bold">Personalize Planning</span>
                  </span>
                </span>
                
                {/* Pulsing indicator */}
                <span className="absolute top-2 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </Button>
            </div>

            {/* WhatsApp Quick Connect */}
            <Button
              onClick={handleWhatsAppConnect}
              variant="ghost"
              className="w-full h-10 text-sm font-semibold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              or Chat on WhatsApp
            </Button>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-lg p-3 mt-3">
              <p className="text-xs text-center text-emerald-800 font-medium flex items-center justify-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Travel experts available 24/7 • Free advice
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact */}
      <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-[250ms] py-3 sm:py-4">
        <CardContent className="px-4 sm:px-6">
          <h3 className="text-base font-semibold mb-3 text-emerald-800">
            Need Help?
          </h3>
          <div className="space-y-2.5">
            <a
              href={`tel:+91${whatsappNumber.replace(/\D/g, '')}`}
              className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg hover:bg-muted transition-colors duration-[250ms]"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <Phone className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium">Call Us</p>
                <p className="text-xs text-muted-foreground">
                  {whatsappNumber}
                </p>
              </div>
            </a>
            <button
              onClick={handleWhatsAppConnect}
              className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg hover:bg-muted transition-colors duration-[250ms] w-full"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Quick response</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="text-center p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
          <Users className="w-5 h-5 mx-auto mb-1.5 text-emerald-700" />
          <p className="text-xl font-bold text-emerald-800">
            {trip.totalSpots}+
          </p>
          <p className="text-xs text-muted-foreground">Group Size</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
          <Star className="w-5 h-5 mx-auto mb-1.5 text-emerald-700 fill-emerald-700" />
          <p className="text-xl font-bold text-emerald-800">{trip.rating}</p>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
      </div>
    </div>
  );
}
