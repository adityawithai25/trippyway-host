import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Brain, Shield, TrendingUp } from "lucide-react";
import { Globe } from "@/components/custom/globe";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Intelligent matching algorithms that understand your travel preferences and budget"
  },
  {
    icon: Shield,
    title: "Verified Partner Network",
    description: "Every vendor thoroughly vetted with GST verification and quality standards"
  },
  {
    icon: TrendingUp,
    title: "Real-Time Optimization",
    description: "Dynamic pricing and availability tracking across 130+ destinations"
  },
  {
    icon: Sparkles,
    title: "Instant Itinerary Generation",
    description: "TrippyAI creates personalized trip plans in seconds based on your preferences"
  },
];

export default function About() {
  return (
    <section id="about" className="bg-background pb-24">
      <div className="max-w-6xl mx-auto max-sm:px-4 ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-3xl max-sm:hidden ">
            <Globe />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                Travel-Tech Innovation
              </div>
              <h2 className="text-4xl font-bold font-paytone-one text-primary">
                Where Technology Meets Travel Expertise
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We&apos;re not just another travel booking platform. TrippyWay is a 
                <span className="font-semibold text-foreground"> travel-tech company</span> revolutionizing 
                domestic tourism in India through AI-powered personalization, verified local partnerships, 
                and real-time smart matching.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Built on modern web technologies with Next.js, TypeScript, and Supabase, 
                our platform processes thousands of data points to deliver hyper-personalized 
                travel experiences that traditional agencies can&apos;t match.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-3">
              <Button size="lg" className="px-8" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/partner-application">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
