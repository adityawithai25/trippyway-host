import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PARTNER_BENEFITS } from "@/constants/partner-benfits";

const PartnerCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1.5 border-primary/20 bg-primary/5 text-primary"
          >
            <Building2 className="w-3.5 h-3.5 mr-2" />
            For Travel Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-paytone-one mb-4 leading-tight">
            Grow Your Business with{" "}
            <span className="text-primary">TrippyWay</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-inter leading-relaxed">
            Join the AI-powered travel revolution. Connect with high-intent
            travelers and boost your bookings.
          </p>
        </div>

        <BentoGrid className="h-auto md:h-[560px]">
          <BentoCard className="md:col-span-2 md:row-span-2 justify-between bg-gradient-to-br from-background via-emerald-50/30 to-emerald-50/50 border-emerald-200/50 hover:shadow-lg transition-all duration-[250ms]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-200 shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800 tracking-wider uppercase">
                    AI-Powered Growth
                  </span>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-[250ms] font-bold text-base group"
                >
                  <Link
                    href="/partner-application"
                    className="flex items-center justify-center"
                  >
                    Apply as Partner
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-[250ms]" />
                  </Link>
                </Button>
              </div>

              {/* Main Heading Section */}
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight text-gray-900">
                  Get Discovered by Travelers
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Our AI matches your property with travelers looking for
                  exactly what you offer.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {PARTNER_BENEFITS.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md hover:scale-[1.02] transition-all duration-[250ms] group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-200 shrink-0 group-hover:bg-emerald-200 transition-colors duration-[250ms]">
                      <benefit.icon className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm mb-1.5 text-gray-900 leading-tight">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Background Element */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-5 pointer-events-none">
              <TrendingUp className="w-full h-full text-emerald-600" />
            </div>
          </BentoCard>

          {/* Secondary Card - Call Booking CTA */}
          <BentoCard
            className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white border-none hover:shadow-xl hover:scale-[1.02] transition-all duration-[250ms] cursor-pointer group"
            href="https://cal.com/aditya-dubey-tw"
          >
            <div className="relative z-10 h-full flex flex-col justify-between p-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-[250ms] shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2.5 leading-tight">
                    Schedule a Demo
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    See how our AI tools can increase your revenue. Talk to an
                    expert.
                  </p>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white bg-white/20 px-4 py-2.5 rounded-lg backdrop-blur-sm border border-white/30 group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-[250ms] w-fit self-start">
                Book a Call <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Decorative Background Blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-white/5 rounded-full blur-xl" />
          </BentoCard>

          {/* Third Card - Trust & Stats */}
          <BentoCard className="md:col-span-1 md:row-span-1 justify-between bg-gradient-to-br from-white to-emerald-50/30 border-emerald-200/50 hover:shadow-md transition-all duration-[250ms]">
            <div className="space-y-4">
              {/* Top Section - Icon and Badge */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-emerald-100 rounded-lg border border-emerald-200 shrink-0">
                  <Users className="w-5 h-5 text-emerald-700" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200 font-bold text-xs"
                >
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                </Badge>
              </div>

              {/* Stats Number */}
              <div className="space-y-1">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                  10+
                </h3>
                <p className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wider leading-tight">
                  Active Partners
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-emerald-200/50" />

              {/* Partner Avatars Section */}
              <div className="space-y-2">
                <div className="flex items-center -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-br from-emerald-100 to-emerald-200 items-center justify-center text-[10px] font-bold text-emerald-800 shadow-sm shrink-0"
                    >
                      {i}
                    </div>
                  ))}
                  <div className="h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                    +5
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join hotels, tour operators, and activity providers.
                </p>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
};

export default PartnerCTASection;
