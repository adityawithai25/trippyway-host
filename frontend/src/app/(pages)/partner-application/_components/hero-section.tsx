import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HERO_STATS, VALUE_PROPOSITIONS } from "@/constants/partner-data";
import { HeroForm } from "./hero-form";

export default function PartnerHeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br pt-20 pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
       radial-gradient(circle at top center, rgba(153, 15, 250, 0.8),transparent 70%)
     `,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 mt-16 max-w-6xl ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-left col-span-2">
            {/* Badge */}
            <div className="flex justify-start animate-in fade-in duration-700">
              <Badge className="px-3 py-1.5 text-xs font-semibold bg-blue-50 backdrop-blur-sm border-blue-200 text-blue-900 hover:bg-blue-100 transition-all duration-[250ms]">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Preferred by 50+ Travel Partners
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 md:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight font-paytone-one">
                The Smart Way to
                <br />
                <span className="text-purple-600/70">
                  Grow Your Travel Business
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed font-inter">
                Join India's AI-powered travel platform and connect with
                thousands of high-intent travelers. Experience{" "}
                <span className="font-bold text-purple-600">10x growth</span>{" "}
                with intelligent automation.
              </p>
            </div>

            {/* Value Propositions */}
            <div className="flex flex-wrap gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {VALUE_PROPOSITIONS.map((prop, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 backdrop-blur-sm rounded-lg border border-blue-200 hover:bg-blue-100 transition-all duration-[250ms]"
                >
                  <prop.icon className="w-4 h-4 text-purple-600" />
                  <span className="text-xs md:text-sm font-medium text-slate-800">
                    {prop.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <Button
                size="lg"
                asChild
                className="relative bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 text-white hover:from-purple-700 hover:via-purple-700 hover:to-purple-800 font-bold text-base px-6 sm:px-8 py-3.5 h-auto rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 border-0 transition-all duration-300 group w-full sm:w-auto transform hover:scale-[1.02] active:scale-100"
              >
                <Link
                  href="#apply-form"
                  className="flex items-center justify-center"
                >
                  <span>Apply as Partner</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-purple-300 hover:border-purple-400 font-semibold text-base px-6 sm:px-8 py-3.5 h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto transform hover:scale-[1.02] active:scale-100"
              >
                <Link
                  href="/30-min"
                  className="flex items-center justify-center"
                >
                  Schedule a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <HeroForm />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-6 max-w-4xl mt-24 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          {HERO_STATS.map((stat, index) => (
            <div key={index} className="relative group text-center">
              <div className="absolute inset-0 bg-blue-50 rounded-xl blur-xl group-hover:bg-blue-100 transition-all duration-[250ms]" />
              <div className="relative bg-blue-50/80 backdrop-blur-md rounded-xl border border-blue-200 p-3 hover:border-blue-300 hover:bg-blue-100 transition-all duration-[250ms]">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 font-paytone-one">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-700 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}
