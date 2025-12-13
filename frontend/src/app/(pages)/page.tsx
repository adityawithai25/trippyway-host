import { Suspense } from "react";
import HeroSection from "@/components/hero-section";
import { DestinationSlider } from "@/components/destination-slider";
import PopularTrips from "@/components/popular-trips";
import PopularLocations from "@/components/custom/popular-location";
import About from "@/components/about";
import Newsletter from "@/components/newsletter";
import PartnerCTASection from "@/components/partner-bento-grid";
import ReviewsSection from "@/components/reviews-section";
import PurposeDrivenSection from "@/components/purpose-driven-section";

// Loading fallback for DestinationSlider
function DestinationSliderSkeleton() {
  return (
    <div className="sticky top-[var(--header-height-mobile)] md:top-[var(--header-height-desktop)] z-30 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-[1200px] px-0 sm:px-6 lg:px-8">
        <div className="relative py-4">
          <div className="flex gap-3 overflow-hidden pl-6 sm:pl-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl animate-pulse"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="h-3 w-20 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<DestinationSliderSkeleton />}>
        <DestinationSlider />
      </Suspense>
      <PopularTrips />
      <PurposeDrivenSection />
      <PopularLocations />
      <PartnerCTASection />
      <ReviewsSection />
      <About />
      <Newsletter />
    </main>
  );
}
