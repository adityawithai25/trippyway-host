import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TRIPS } from "@/constants/trip-data";
import { getUserAuth } from "@/lib/auth";
import { getWhatsAppNumber } from "@/lib/whatsapp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import PackageDetailClient from "./_components/package-detail-client";
import {
  detailedItineraries,
  getDefaultItinerary,
} from "@/constants/package-details";

interface PackagePageProps {
  params: Promise<{ id: string }>;
}

async function PackageContent({ params }: PackagePageProps) {
  const { id } = await params;

  // Find trip by ID
  const trip = TRIPS.find((t) => t.id === id);

  if (!trip) {
    notFound();
  }

  // Get WhatsApp number from environment variable
  const whatsappNumber = getWhatsAppNumber();

  // Get detailed itinerary or use default
  const itineraryData = detailedItineraries[trip.id];
  const details = itineraryData
    ? { ...itineraryData, whatsappNumber }
    : getDefaultItinerary(trip, whatsappNumber);

  return (
    <>
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-6 py-3">
        <Button variant="ghost" asChild className="gap-2 text-sm">
          <Link href="/packages">
            <ChevronLeft className="w-4 h-4" />
            Back to Weekend Trips
          </Link>
        </Button>
      </div>

      {/* Client Component for Interactive Features */}
      <Suspense fallback={<PackageDetailClient trip={trip} details={details} isAuthenticated={false} />}>
        <AuthWrapper trip={trip} details={details} />
      </Suspense>
    </>
  );
}

async function AuthWrapper({ trip, details }: { trip: any; details: any }) {
  const isAuthenticated = await getUserAuth();
  return (
    <PackageDetailClient
      trip={trip}
      details={details}
      isAuthenticated={isAuthenticated}
    />
  );
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 max-w-6xl mx-auto">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PackageContent params={params} />
        </Suspense>
      </main>
    </div>
  );
}
