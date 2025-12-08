import HeroSection from "@/components/hero-section";
import PopularTrips from "@/components/popular-trips";
import PopularLocations from "@/components/custom/popular-location";
import About from "@/components/about";
import Newsletter from "@/components/newsletter";
import PartnerCTASection from "@/components/partner-bento-grid";
import ReviewsSection from "@/components/reviews-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PopularTrips />
      <PopularLocations />
      <PartnerCTASection />
      <ReviewsSection />
      <About />
      <Newsletter />
    </main>
  );
}
