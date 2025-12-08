import {
  TrendingUp,
  Users,
  Sparkles,
  Star,
  ShieldCheck,
  Clock,
  Zap,
  BarChart3,
  Globe,
  HeadphonesIcon,
  DollarSign,
  Target,
  Hotel,
  Home,
  Palmtree,
  Building2,
  Plane,
  MapPin,
  MessageSquare,
  Smartphone,
  Lock,
  Award,
  type LucideIcon,
} from "lucide-react";

export interface PartnerBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PartnerFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface PropertyType {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  // Using placeholder images for now - can be replaced with actual images
  image: string;
}

export interface PartnerStats {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface AIFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

// Hero Section Data
export const HERO_STATS = [
  { value: "50K+", label: "Active Travelers" },
  { value: "10+", label: "Partner Properties" },
  { value: "95%", label: "Satisfaction Rate" },
];

// Benefits Section Data
export const PARTNER_BENEFITS_EXTENDED: PartnerBenefit[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Traveler Matching",
    description:
      "Our intelligent algorithm connects your property with travelers looking for exactly what you offer.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics Dashboard",
    description:
      "Track bookings, revenue, and performance metrics in one comprehensive dashboard.",
  },
  {
    icon: DollarSign,
    title: "Zero Commission for Early Partners",
    description:
      "Join now and enjoy zero commission fees for the first 6 months of partnership.",
  },
  {
    icon: Clock,
    title: "24/7 Partner Support",
    description:
      "Get instant help whenever you need it with our dedicated partner support team.",
  },
  {
    icon: Target,
    title: "Automated Marketing Exposure",
    description:
      "Your property gets featured across our platform with zero marketing effort from your side.",
  },
  {
    icon: Zap,
    title: "Smart Pricing Recommendations",
    description:
      "AI-driven pricing suggestions to maximize your revenue based on demand and seasonality.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Partner Badge",
    description:
      "Build trust with travelers through our verified partner certification program.",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics & Insights",
    description:
      "Understand your business better with predictive analytics and growth recommendations.",
  },
];

// AI-Powered Growth Features
export const AI_GROWTH_FEATURES: AIFeature[] = [
  {
    title: "Smart Traveler Matching",
    description:
      "Our AI analyzes traveler preferences, budgets, and behavior to match them with your property, increasing conversion rates by up to 300%.",
    icon: Target,
  },
  {
    title: "Dynamic Pricing Optimization",
    description:
      "Real-time pricing recommendations based on demand, seasonality, competitor analysis, and market trends.",
    icon: BarChart3,
  },
  {
    title: "Automated Marketing",
    description:
      "Your property is automatically promoted to the right audience at the right time through our AI-powered marketing engine.",
    icon: Sparkles,
  },
  {
    title: "Predictive Analytics",
    description:
      "Forecast demand, identify revenue opportunities, and plan capacity with our advanced prediction models.",
    icon: TrendingUp,
  },
];

// AI Growth Stats
export const AI_GROWTH_STATS: PartnerStats[] = [
  {
    value: "10x",
    label: "Average Booking Growth",
    icon: TrendingUp,
  },
  {
    value: "85%",
    label: "Conversion Rate Increase",
    icon: Target,
  },
  {
    value: "50%",
    label: "Revenue Boost in First 3 Months",
    icon: DollarSign,
  },
];

// Property Types
export const PROPERTY_TYPES: PropertyType[] = [
  {
    id: "hotel",
    name: "Hotels",
    icon: Hotel,
    description: "From boutique to luxury chains",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  },
  {
    id: "homestay",
    name: "Homestays",
    icon: Home,
    description: "Cozy, authentic local experiences",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
  },
  {
    id: "resort",
    name: "Resorts",
    icon: Palmtree,
    description: "All-inclusive vacation paradises",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
  },
  {
    id: "villa",
    name: "Villas",
    icon: Building2,
    description: "Private luxury accommodations",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
  },
  {
    id: "tour-operator",
    name: "Tour Operators",
    icon: Plane,
    description: "Curated travel experiences",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
  },
  {
    id: "activity-provider",
    name: "Activity Providers",
    icon: MapPin,
    description: "Adventures and local attractions",
    image:
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop",
  },
];

// Platform Features
export const PLATFORM_FEATURES: PartnerFeature[] = [
  {
    icon: BarChart3,
    title: "Comprehensive Dashboard",
    description:
      "Monitor all your bookings, revenue, and guest interactions in one intuitive interface.",
    highlight: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Management",
    description:
      "Manage your property on-the-go with our responsive mobile interface.",
    highlight: false,
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description:
      "Communicate with guests directly through WhatsApp for seamless coordination.",
    highlight: false,
  },
  {
    icon: Award,
    title: "Branded Confirmations",
    description:
      "Send booking confirmations with your logo and branding for professional touch.",
    highlight: false,
  },
  // {
  //   icon: Globe,
  //   title: "Multi-Language Support",
  //   description:
  //     "Reach global travelers with support for 10+ languages across the platform.",
  //   highlight: false,
  // },
  {
    icon: Lock,
    title: "Secure Payments",
    description:
      "Industry-leading payment security with instant settlement to your account.",
    highlight: true,
  },
];

// Testimonials
export const PARTNER_TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    business: "Mountain View Resort, Manali",
    rating: 5,
    text: "TrippyWay's AI matching has increased our bookings by 250% in just 3 months. The dashboard is incredibly easy to use.",
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    business: "Coastal Homestay, Goa",
    rating: 5,
    text: "Zero commission for early partners was a game-changer. The smart pricing feature helped us optimize our rates perfectly.",
    avatar: "PS",
  },
  {
    name: "Amit Patel",
    business: "Heritage Tours & Travels",
    rating: 5,
    text: "The automated marketing exposure is phenomenal. We're getting high-quality leads without spending a rupee on ads.",
    avatar: "AP",
  },
];

// FAQ Data
export const PARTNER_FAQ = [
  {
    question: "What is the commission structure?",
    answer:
      "Early partners enjoy zero commission for the first 6 months. After that, we charge a competitive 12-15% commission on bookings, which is lower than most other platforms.",
  },
  {
    question: "How long does the onboarding process take?",
    answer:
      "Once you submit your application, our team reviews it within 2-3 business days. After approval, you can have your property live on the platform within 24-48 hours.",
  },
  {
    question: "Do I need technical knowledge to manage my listing?",
    answer:
      "Not at all! Our platform is designed to be intuitive and user-friendly. We also provide comprehensive training and 24/7 support to help you get started.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "Our AI analyzes traveler preferences, past bookings, budget, travel dates, and behavior patterns to intelligently match them with properties that best fit their needs, significantly increasing your conversion rates.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Yes! You can manage multiple properties from a single dashboard. Each property gets its own analytics and performance tracking.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 partner support through phone, email, and WhatsApp. Our dedicated partner success team is always ready to help you maximize your potential on the platform.",
  },
];

// Value Propositions for Hero
export const VALUE_PROPOSITIONS = [
  {
    icon: Sparkles,
    text: "AI-Powered Matching",
  },
  {
    icon: Users,
    text: "50K+ Active Travelers",
  },
  {
    icon: TrendingUp,
    text: "10x Growth Potential",
  },
];
