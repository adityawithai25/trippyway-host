import {
  TrendingUp,
  Users,
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import React from "react";

interface PartnerBenefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    icon: TrendingUp,
    title: "Increase Bookings",
    description:
      "Get discovered by travelers actively planning trips to your location",
  },
  {
    icon: Users,
    title: "Right Customers",
    description:
      "AI matches your offerings with travelers looking for exactly what you provide",
  },
  {
    icon: Sparkles,
    title: "Smart Visibility",
    description:
      "Your property appears when it matches traveler preferences perfectly",
  },
  {
    icon: Zap,
    title: "Instant Exposure",
    description:
      "Be part of thousands of AI-generated itineraries automatically",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track views, bookings, and customer insights in real-time",
  },
  {
    icon: ShieldCheck,
    title: "Verified Badge",
    description: "Build trust with the exclusive 'TrippyWay Verified' badge",
  },
];
