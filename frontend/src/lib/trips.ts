import { cacheLife } from "next/cache";
import { TRIPS, Trip } from "@/constants/trip-data";

/**
 * Server-side randomization function with use cache directive
 * Generates randomized trip data with booking percentages and spot availability
 * @returns Promise<Trip[]> - Array of trips with randomized booking data
 */
export async function getRandomizedTrips(): Promise<Trip[]> {
  "use cache";

  // Set cache lifetime: revalidate every 30 minutes (1800 seconds)
  cacheLife({ revalidate: 1800 });

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
      // Optionally update reviews count to reflect activity
      reviews: Math.round(trip.reviews * (0.9 + Math.random() * 0.2)),
    };
  });
}

/**
 * Normalize category filter value from lowercase URL params
 * @param value - Category value from URL params (can be undefined)
 * @returns Normalized category string
 */
export function normalizeCategory(value: string | undefined): string {
  if (!value) return "All";
  const lower = value.toLowerCase();
  const categoryMap: Record<string, string> = {
    all: "All",
    couples: "Couples",
    "girls-only": "Girls Only",
    "girls only": "Girls Only", // Handle both formats
    "boys-only": "Boys Only",
    "boys only": "Boys Only", // Handle both formats
    mixed: "Mixed",
  };
  return categoryMap[lower] || "All";
}

/**
 * Normalize duration filter value from lowercase URL params
 * @param value - Duration value from URL params (can be undefined)
 * @returns Normalized duration string
 */
export function normalizeDuration(value: string | undefined): string {
  if (!value) return "All";
  const lower = value.toLowerCase();
  const durationMap: Record<string, string> = {
    all: "All",
    "3d2n": "3D2N",
    "4d3n": "4D3N",
  };
  return durationMap[lower] || "All";
}


