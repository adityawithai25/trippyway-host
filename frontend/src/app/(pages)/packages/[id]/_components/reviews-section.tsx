"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import {
  TRIP_REVIEWS,
  DEFAULT_REVIEWS,
  Review,
} from "@/constants/reviews-data";
import { getReviews, ReviewData } from "@/actions/reviews";
import { ReviewForm } from "@/components/review-form";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface ReviewsSectionProps {
  tripId?: string;
  isAuthenticated: boolean;
}

// Convert API ReviewData to Review format for compatibility
const convertReviewData = (review: ReviewData): Review => {
  const userName = review.name || "Anonymous";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const date = review.created_at
    ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true })
    : "Recently";

  return {
    id: review.id,
    userName,
    userInitials: initials,
    rating: review.stars,
    date,
    reviewText: review.review_comment,
    verified: review.verified,
    images: review.images || [],
  };
};

export function ReviewsSection({
  tripId,
  isAuthenticated,
}: ReviewsSectionProps) {
  const [apiReviews, setApiReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!tripId) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getReviews(tripId);
        const converted = data.map(convertReviewData);
        setApiReviews(converted);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [tripId]);

  // Get trip-specific reviews or use default (fallback)
  const staticReviews: Review[] =
    tripId && TRIP_REVIEWS[tripId] ? TRIP_REVIEWS[tripId] : DEFAULT_REVIEWS;

  // Generate a deterministic random number between 3-6 based on tripId
  const getRandomCount = (id: string): number => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Generate number between 3-6
    return Math.abs(hash % 4) + 3; // 3, 4, 5, or 6
  };

  // Get random count for this trip (or default to 4 if no tripId)
  const reviewCount = tripId ? getRandomCount(tripId) : 4;

  // Select random reviews based on tripId (deterministic but appears random)
  const getSelectedReviews = (
    reviews: Review[],
    count: number,
    id: string
  ): Review[] => {
    if (reviews.length <= count) return reviews;

    // Create a seed from tripId for deterministic selection
    let seed = 0;
    for (let i = 0; i < id.length; i++) {
      seed = (seed << 5) - seed + id.charCodeAt(i);
      seed = seed & seed; // Convert to 32-bit integer
    }

    // Shuffle array deterministically using seed
    const shuffled = [...reviews];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff; // Linear congruential generator
      const j = seed % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  };

  // Use API reviews if available, otherwise use static reviews
  const staticSelectedReviews = getSelectedReviews(
    staticReviews,
    reviewCount,
    tripId || "default"
  );

  // Combine API reviews with static reviews (API reviews first)
  const allDisplayReviews = [...apiReviews, ...staticSelectedReviews];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "text-emerald-600 fill-emerald-600"
            : "text-gray-300 fill-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow py-4">
      <CardContent>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-emerald-800">
          Customer Reviews
        </h2>

        {/* Review Form */}
        {tripId && (
          <div className="mb-8 pb-8 border-b border-border/50">
            <h3 className="text-lg font-semibold mb-4 text-emerald-800">
              Write a Review
            </h3>
            <ReviewForm tripId={tripId} isAuthenticated={isAuthenticated} />
          </div>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading reviews...
          </div>
        ) : allDisplayReviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review!
          </div>
        ) : (
          <div className="space-y-6">
            {allDisplayReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="h-12 w-12 border-2 border-emerald-200 shrink-0">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.userName}`}
                    />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 font-semibold">
                      {review.userInitials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Review Content */}
                  <div className="flex-1 space-y-3">
                    {/* User Info & Rating */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-base">
                            {review.userName}
                          </h3>
                          {review.verified && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.reviewText}
                    </p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {review.images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                          >
                            <Image
                              src={imageUrl}
                              alt={`Review image ${index + 1}`}
                              fill
                              className="object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(imageUrl, "_blank")}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
