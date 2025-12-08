"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_BENEFITS_EXTENDED } from "@/constants/partner-data";
import { Star } from "lucide-react";

export default function BenefitsGrid() {
  return (
    <section className="py-12 sm:py-16 md:py-24 ">
      <div className="container mx-auto max-sm:px-4  max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 px-2">
          <Badge
            variant="outline"
            className="mb-2 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700"
          >
            <Star className="w-3.5 h-3.5 mr-2" />
            Partner Benefits
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-paytone-one">
            Why Partner with <span className="text-purple-800">TrippyWay</span>?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Join a platform that's designed to help your travel business thrive
            with cutting-edge technology and dedicated support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNER_BENEFITS_EXTENDED.map((benefit, index) => (
            <Card
              key={index}
              className="group relative p-6  transition-all duration-250 drop-shadow-md  bg-white overflow-hidden"
            >
              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center group-hover:bg-purple-200 group-hover:border-purple-300 group-hover:scale-110 transition-all duration-[250ms]">
                  <benefit.icon className="w-7 h-7 text-purple-700" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 font-medium">
            And many more benefits to help you succeed
          </p>
        </div>
      </div>
    </section>
  );
}
