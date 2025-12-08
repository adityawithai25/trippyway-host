"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AI_GROWTH_FEATURES, AI_GROWTH_STATS } from "@/constants/partner-data";
import { Sparkles, Bot } from "lucide-react";

export default function AIGrowthSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-sm:px-4  max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <Badge className="mb-2 px-4 py-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-paytone-one">
            Grow Your Business{" "}
            <span className="text-purple-200">10x with AI</span>
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto font-inter leading-relaxed">
            Harness the power of artificial intelligence to automate operations,
            maximize revenue, and scale your travel business faster than ever.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 md:mb-16">
          {AI_GROWTH_STATS.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-all duration-[250ms]" />
              <Card className="relative bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-[250ms] p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-purple-200" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-paytone-one">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_GROWTH_FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="group bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-[250ms] p-6 md:p-8 relative overflow-hidden"
            >
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-110 transition-all duration-[250ms]">
                  <feature.icon className="w-7 h-7 text-purple-200" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="w-5 h-5 text-purple-200" />
            <span className="text-white font-medium">
              Powered by advanced machine learning algorithms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
