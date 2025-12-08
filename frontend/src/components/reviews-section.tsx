"use client";

import { Star, TrendingUp, Users, Award, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DEFAULT_REVIEWS,
  TRIP_REVIEWS,
  Review,
} from "@/constants/reviews-data";
import { TextHighlighter } from "./custom/text-highlighter";

// Combine reviews from different trips to get a diverse set
const getAllReviews = (): Review[] => {
  const allReviews: Review[] = [];

  // Collect reviews from different trip categories
  const tripCategories = [
    "3d2n-dec22-couples",
    "3d2n-dec23-girls",
    "4d3n-dec28-girls",
    "3d2n-dec25-mixed",
    "4d3n-dec26-couples",
    "3d2n-dec29-couples",
    "3d2n-dec30-couples",
    "3d2n-dec31-couples",
    "3d2n-jan01-couples",
    "3d2n-jan02-couples",
    "3d2n-jan03-couples",
    "3d2n-jan04-couples",
    "3d2n-jan05-couples",
  ];

  tripCategories.forEach((tripId) => {
    if (TRIP_REVIEWS[tripId]) {
      allReviews.push(
        ...TRIP_REVIEWS[tripId].map((review) => ({
          ...review,
          id: `${tripId}-${review.id}`, // Make IDs unique
        }))
      );
    }
  });

  // Add default reviews as fallback
  allReviews.push(...DEFAULT_REVIEWS);

  // Remove duplicates based on review text
  const uniqueReviews = Array.from(
    new Map(allReviews.map((review) => [review.reviewText, review])).values()
  );

  return uniqueReviews;
};

export default function ReviewsSection() {
  const allReviews = getAllReviews();

  // Filter verified reviews with ratings 3-5
  const verifiedReviews = allReviews.filter(
    (review) => review.verified && review.rating >= 3 && review.rating <= 5
  );

  // Select best 6 reviews (5 stars first, then 4 stars)
  const selectedReviews = [
    ...verifiedReviews.filter((r) => r.rating === 5).slice(0, 4),
    ...verifiedReviews.filter((r) => r.rating === 4).slice(0, 2),
  ].slice(0, 6);

  // Calculate statistics
  const totalReviews = verifiedReviews.length;
  const avgRating = (
    verifiedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);
  const fiveStarCount = verifiedReviews.filter((r) => r.rating === 5).length;
  const fiveStarPercentage = Math.round((fiveStarCount / totalReviews) * 100);

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClass = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
    
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`${sizeClass} ${
          index < rating
            ? "text-amber-500 fill-amber-500"
            : "text-gray-200 fill-gray-200"
        }`}
      />
    ));
  };

  const ReviewCard = ({ review }: { review: Review }) => {
    return (
      <Card className="group h-full border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden relative">
        <CardContent className="p-4">
          {/* Quote Icon - Decorative Background */}
          <div className="absolute top-2 right-2 opacity-5">
            <Quote className="w-16 h-16 text-emerald-600" />
          </div>

          {/* Header: Stars + Verified Badge */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-0.5">
              {renderStars(review.rating)}
            </div>
            {review.verified && (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0 border-0 hover:bg-emerald-50 h-5">
                ✓ Verified
              </Badge>
            )}
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 relative z-10">
            &ldquo;{review.reviewText}&rdquo;
          </p>

          {/* User Info */}
          <div className="flex items-center gap-2.5 relative z-10">
            <Avatar className="h-9 w-9 border-2 border-emerald-100 ring-2 ring-emerald-50">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.userName}`}
              />
              <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 font-semibold text-xs">
                {review.userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-xs truncate">
                {review.userName}
              </h3>
              <p className="text-[10px] text-gray-500">{review.date}</p>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full" />
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our{" "}
            <TextHighlighter
              action="underline"
              color="var(--color-emerald-800)"
              isView={true}
            >
              Travelers
            </TextHighlighter>{" "}
            Say
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Real experiences from travelers who have explored amazing
            destinations with us
          </p>
        </div>

        {/* Statistics Section - Compact */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 max-w-4xl mx-auto">
          {/* Overall Rating */}
          <div className="flex items-center gap-2 bg-gradient-to-br from-emerald-50 to-white px-4 py-3 rounded-xl border-2 border-emerald-500 shadow-sm">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{avgRating}</span>
              <span className="text-xs text-gray-600">/ 5</span>
            </div>
            <div className="flex items-center gap-0.5 ml-1">
              {renderStars(Math.round(parseFloat(avgRating)), "sm")}
            </div>
          </div>

          {/* Total Reviews */}
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors shadow-sm">
            <Users className="w-5 h-5 text-emerald-600" />
            <span className="text-lg font-bold text-gray-900">{totalReviews}+</span>
            <span className="text-xs text-gray-600">Reviews</span>
          </div>

          {/* 5-Star Percentage */}
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors shadow-sm">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-lg font-bold text-gray-900">{fiveStarPercentage}%</span>
            <span className="text-xs text-gray-600">5-Star</span>
          </div>

          {/* Satisfaction Rate */}
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors shadow-sm">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-lg font-bold text-gray-900">98%</span>
            <span className="text-xs text-gray-600">Satisfied</span>
          </div>
        </div>

        {/* Reviews Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {selectedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Trust Badge - Smaller */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-full border border-emerald-200/50 shadow-sm">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-gray-700">
              All reviews verified from actual travelers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
