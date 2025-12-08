import TripCard from "@/app/(pages)/packages/_components/trip-card";
import { TRIPS } from "@/constants/trip-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";

const randomizeTrips = async () => {
  "use cache";
  cacheLife({ revalidate: 30 * 60 }); // 30 minutes
  return TRIPS.map((trip) => {
    // Generate random booking percentage between 60% and 90%
    const minPercentage = 60;
    const maxPercentage = 90;
    const randomPercentage =
      Math.random() * (maxPercentage - minPercentage) + minPercentage;

    // Calculate booked spots based on random percentage
    const bookedSpots = Math.round((trip.totalSpots * randomPercentage) / 100);

    // Ensure at least 1 spot is left
    const spotsLeft = Math.max(1, trip.totalSpots - bookedSpots);

    return {
      ...trip,
      spotsLeft,
      reviews: Math.round(trip.reviews * (0.9 + Math.random() * 0.2)),
    };
  });
};

export default async function PopularTrips() {
  const randomizedTrips = await randomizeTrips();

  // Show featured trips (first 6 trips, or you can filter by specific criteria)
  const featuredTrips = randomizedTrips?.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase">
            Weekend Packages
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
            Popular Weekend Escapes
          </h2>
          <p className="text-gray-600 max-w-2xl ">
            Discover our most loved trips, handpicked for unforgettable memories
            and amazing experiences.
          </p>
        </div>

        {/* Trips Grid */}
        {featuredTrips.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/packages">
                  View All Trips
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Loading amazing trips...</p>
          </div>
        )}
      </div>
    </section>
  );
}
