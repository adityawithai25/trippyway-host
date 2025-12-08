"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AI_GROWTH_FEATURES, AI_GROWTH_STATS } from "@/constants/partner-data";
import { Sparkles, Bot } from "lucide-react";

export default function AIGrowthSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-purple-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-sm:px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 space-y-2">
          <Badge className="mb-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-sm">
            <Bot className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered Platform
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight font-paytone-one">
            Grow Your Business{" "}
            <span className="text-purple-200">10x with AI</span>
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-inter">
            Automate operations, maximize revenue, and scale faster than ever.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          {AI_GROWTH_STATS.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-xl blur-xl group-hover:bg-white/10 transition-all duration-[250ms]" />
              <Card className="relative bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-[250ms] p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-purple-200" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-paytone-one">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_GROWTH_FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="group bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-[250ms] p-4 md:p-5 relative overflow-hidden"
            >
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />

              <div className="relative z-10 space-y-2.5">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-110 transition-all duration-[250ms]">
                  <feature.icon className="w-5 h-5 text-purple-200" />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
