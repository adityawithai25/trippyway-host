"use client";

import { Button } from "@/components/ui/button";
import { Compass, Heart, Sparkles, Target, User } from "lucide-react";
import Link from "next/link";

const purposeCards = [
  {
    icon: Target,
    title: "Define Your Purpose",
    description: "Adventure, serenity, culture, discovery, or healing - your reason defines your route",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconColor: "text-violet-600"
  },
  {
    icon: Heart,
    title: "Honor Your Mood",
    description: "Feeling adventurous? Seeking peace? Craving connection? Your emotions lead the way",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-600"
  },
  {
    icon: User,
    title: "Live Your Preferences",
    description: "Budget, pace, style, companions - every element reflects who you are",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600"
  }
];

export default function PurposeDrivenSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Compass className="w-4 h-4" />
            Our Philosophy
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-paytone-one text-balance">
            Always Move with{" "}
            <span className="text-primary relative inline-block">
              Purpose
              <svg 
                className="absolute -bottom-1.5 left-0 w-full" 
                height="10" 
                viewBox="0 0 200 10" 
                fill="none"
              >
                <path 
                  d="M2 8C60 3 140 3 198 8" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            We don&apos;t sell trips.{" "}
            <span className="text-foreground font-bold">We design experiences</span> that answer one question:{" "}
            <span className="text-primary font-bold italic">What does your soul need right now?</span>
          </p>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            No generic packages. No hard sells. Just intelligent technology understanding your{" "}
            <span className="font-semibold text-foreground">purpose</span>,{" "}
            <span className="font-semibold text-foreground">mood</span>, and{" "}
            <span className="font-semibold text-foreground">desires</span> - 
            then crafting a journey that feels like it was made for you alone. Because it was.
          </p>
        </div>

        {/* Purpose Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-10">
          {purposeCards.map((card, index) => (
            <div
              key={index}
              className={`relative group p-5 md:p-6 rounded-xl bg-gradient-to-br ${card.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${card.gradient} border border-border flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`w-5 h-5 md:w-6 md:h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2 text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Message Box */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-6 md:p-8 rounded-xl bg-gradient-to-br from-primary/10 via-violet-500/10 to-primary/10 border-2 border-primary/20 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs md:text-sm font-bold shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                This is Trippyway
              </div>
            </div>

            <div className="text-center space-y-3 md:space-y-4 pt-2">
              <p className="text-base md:text-lg text-foreground leading-relaxed font-semibold">
                &ldquo;Travel shouldn&apos;t fit you into a box.{" "}
                <span className="text-primary">It should set you free.</span>&rdquo;
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                At Trippyway, your <span className="font-bold text-foreground">inner compass</span> guides every decision. 
                Define your purpose - adventure, peace, growth, connection, or escape - and watch as 
                AI-powered intelligence crafts an itinerary that feels impossibly personal.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed italic">
                No scripts. No pressure. No pretending one size fits all. 
                Just honest, human-centered travel powered by cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Button size="default" className="px-6 font-bold shadow-md hover:shadow-lg" asChild>
                <Link href="/packages">
                  <Compass className="w-4 h-4 mr-2" />
                  Discover Your Journey
                </Link>
              </Button>
              <Button size="default" variant="outline" className="px-6 font-semibold border-2" asChild>
                <Link href="/about">
                  <Sparkles className="w-4 h-4 mr-2" />
                  See How We&apos;re Different
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Stats or Trust Indicators */}
        <div className="mt-12 md:mt-14 pt-8 md:pt-10 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent mb-1.5 group-hover:scale-110 transition-transform">
                130+
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Indian Destinations
              </div>
            </div>
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent mb-1.5 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Purpose-Driven
              </div>
            </div>
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-1.5 group-hover:scale-110 transition-transform">
                ∞
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Unique Combinations
              </div>
            </div>
            <div className="group">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-primary bg-clip-text text-transparent mb-1.5 group-hover:scale-110 transition-transform">
                You First
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Always, Every Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

