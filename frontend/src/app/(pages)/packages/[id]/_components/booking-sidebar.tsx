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

          <div className="space-y-2.5">
            <Button
              onClick={handleBookNow}
              disabled={trip.spotsLeft === 0 || isBooking}
              className="w-full h-10 sm:h-11 text-sm md:text-base font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white relative overflow-hidden shadow-md active:scale-95 transition-all duration-[250ms]"
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
            </Button>

            <Button
              onClick={handleWhatsAppConnect}
              variant="outline"
              className={`w-full h-10 sm:h-11 text-sm md:text-base font-semibold rounded-lg border-2 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-700 active:scale-95 transition-all duration-[250ms] relative overflow-hidden ${
                isWhatsAppAnimating ? "ring-2 ring-emerald-300" : ""
              }`}
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Connect on WhatsApp
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Have questions? Our travel experts are available 24/7
            </p>
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
              href={`tel:${whatsappNumber}`}
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
