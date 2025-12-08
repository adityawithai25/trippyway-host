import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { FeatureItem } from "./feature-item";
import { ItinerarySection } from "./itinerary-section";
import { ReviewsSection } from "./reviews-section";

interface PackageDetails {
  description: string;
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

interface PackageContentProps {
  details: PackageDetails;
  tripId?: string;
  isAuthenticated: boolean;
}

export function PackageContent({
  details,
  tripId,
  isAuthenticated,
}: PackageContentProps) {
  return (
    <div className="lg:col-span-2 space-y-5">
      {/* Description */}

      <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-emerald-800">
        About This Trip
      </h2>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {details.description}
      </p>

      {/* Itinerary */}
      <ItinerarySection itinerary={details.itinerary} />

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow py-4">
          <CardContent className="">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {details.included.map(
                (
                  item: string | { title: string; description: string },
                  idx: number
                ) => (
                  <FeatureItem key={idx} feature={item} type="included" />
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow py-4">
          <CardContent className="">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-orange-500" />
              Not Included
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {details.notIncluded.map(
                (
                  item: string | { title: string; description: string },
                  idx: number
                ) => (
                  <FeatureItem key={idx} feature={item} type="excluded" />
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Things to Carry */}
      <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow py-4">
        <CardContent>
          <h3 className="text-base font-semibold mb-3 text-emerald-800">
            Things to Carry
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {details.thingsToCarry.map((item: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <ReviewsSection tripId={tripId} isAuthenticated={isAuthenticated} />
    </div>
  );
}
