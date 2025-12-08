"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_FEATURES } from "@/constants/partner-data";
import { Zap } from "lucide-react";

export default function FeaturesShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto max-sm:px-4  max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <Badge
            variant="outline"
            className="mb-2 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700"
          >
            <Zap className="w-3.5 h-3.5 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-paytone-one">
            Everything You Need to{" "}
            <span className="text-purple-800">Succeed</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            A complete suite of tools designed to streamline operations and
            maximize your revenue potential.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {PLATFORM_FEATURES.map((feature, index) => {
            // Make the first highlighted feature span 2 columns on large screens
            const isFirstHighlight = feature.highlight && index === 0;

            return (
              <Card
                key={index}
                className={`group relative p-6 md:p-8 hover:shadow-md transition-all duration-250 border overflow-hidden drop-shadow-md ${
                  feature.highlight
                    ? " bg-linear-to-br from-purple-50 to-white"
                    : " hover:border-purple-200 bg-white"
                } ${isFirstHighlight ? "lg:col-span-2" : ""}`}
              >
                {/* Decorative Background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ${
                    feature.highlight ? "bg-purple-200" : "bg-purple-100"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-[250ms] ${
                      feature.highlight
                        ? "bg-purple-200 border-2 border-purple-300"
                        : "bg-purple-100 border-2 border-purple-200 group-hover:bg-purple-200 group-hover:border-purple-300"
                    }`}
                  >
                    <feature.icon className="w-7 h-7 text-purple-700" />
                  </div>

                  {/* Badge for Highlighted Features */}
                  {feature.highlight && (
                    <Badge className="bg-purple-600 text-white hover:bg-purple-700 text-xs">
                      Featured
                    </Badge>
                  )}

                  {/* Title */}
                  <h3
                    className={`font-bold leading-tight ${
                      isFirstHighlight
                        ? "text-2xl md:text-3xl"
                        : "text-lg md:text-xl"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-gray-600 leading-relaxed ${
                      isFirstHighlight ? "text-base" : "text-sm"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                {/* {!feature.highlight && (
                  <div className="absolute inset-0 rounded-lg border-2 border-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-[250ms]" />
                )} */}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white">
            <p className="text-gray-700 font-medium">
              <span className="text-purple-700 font-bold">Plus</span> many more
              features to help you manage and grow your business efficiently
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
