"use client";

"use client";

import { useRouter } from "next/navigation";
import { THEME_DESTINATIONS } from "@/constants/theme-destinations";
import { ThemeDestinationCard } from "./theme-destination-card";
import { TextHighlighter } from "./text-highlighter";

export default function PopularLocations() {
  const router = useRouter();

  // Handle CTA click - Navigate to packages with theme filter
  const handlePersonalizedPlan = (themeSlug: string) => {
    router.push(`/packages?themes=${themeSlug}`);
  };

  return (
    <div id="discover-destinations" className="h-full max-md:pb-10 md:py-16 bg-gradient-to-b from-gray-50/50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-3">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">
              Curated Just For You
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
            Discover{" "}
            <TextHighlighter
              action="underline"
              color="var(--color-emerald-800)"
              isView={true}
            >
              Amazing
            </TextHighlighter>{" "}
            Destinations{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Crafted Around Your Passion
            </span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Every journey is unique. Choose your theme and explore personalized travel experiences 
            tailored to your passions—whether you seek romance, creative inspiration, professional 
            retreats, or cultural immersion across India's most stunning destinations.
          </p>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {THEME_DESTINATIONS.map((theme) => (
            <ThemeDestinationCard
              key={theme.themeId}
              theme={theme}
              onCtaClick={handlePersonalizedPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
