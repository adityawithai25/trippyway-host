"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_BENEFITS_EXTENDED } from "@/constants/partner-data";
import { Star } from "lucide-react";

export default function BenefitsGrid() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto max-sm:px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 space-y-2 px-2">
          <Badge
            variant="outline"
            className="mb-1 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700 text-sm"
          >
            <Star className="w-3.5 h-3.5 mr-1.5" />
            Partner Benefits
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
            Why Partner with <span className="text-purple-800">TrippyWay</span>?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Join a platform designed to help your travel business thrive.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PARTNER_BENEFITS_EXTENDED.map((benefit, index) => (
            <Card
              key={index}
              className="group relative p-4 transition-all duration-250 hover:shadow-md bg-white overflow-hidden"
            >
              {/* Content */}
              <div className="relative z-10 space-y-2.5">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center group-hover:bg-purple-200 group-hover:border-purple-300 group-hover:scale-110 transition-all duration-[250ms]">
                  <benefit.icon className="w-5 h-5 text-purple-700" />
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
