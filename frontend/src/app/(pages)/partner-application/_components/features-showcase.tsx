"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_FEATURES } from "@/constants/partner-data";
import { Zap } from "lucide-react";

export default function FeaturesShowcase() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto max-sm:px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 space-y-2">
          <Badge
            variant="outline"
            className="mb-1 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700 text-sm"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Platform Features
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
            Everything You Need to{" "}
            <span className="text-purple-800">Succeed</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Streamline operations and maximize revenue with our complete suite of tools.
          </p>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {PLATFORM_FEATURES.map((feature, index) => {
            return (
              <Card
                key={index}
                className={`group relative p-4 md:p-5 hover:shadow-md transition-all duration-250 border overflow-hidden ${
                  feature.highlight
                    ? "bg-linear-to-br from-purple-50 to-white"
                    : "hover:border-purple-200 bg-white"
                }`}
              >
                {/* Decorative Background */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ${
                    feature.highlight ? "bg-purple-200" : "bg-purple-100"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-2.5">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-[250ms] ${
                      feature.highlight
                        ? "bg-purple-200 border border-purple-300"
                        : "bg-purple-100 border border-purple-200 group-hover:bg-purple-200 group-hover:border-purple-300"
                    }`}
                  >
                    <feature.icon className="w-5 h-5 text-purple-700" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
