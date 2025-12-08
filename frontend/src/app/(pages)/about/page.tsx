import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MapPin,
  Sparkles,
  Shield,
  Heart,
  TrendingUp,
  Mountain,
  Compass,
  Star,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description:
      "We believe travel transforms lives. Our team is passionate about creating meaningful travel experiences that connect you with India's diverse culture, landscapes, and people.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Your safety is our priority. We work only with verified partners, certified guides, and follow strict safety protocols for all adventure activities and treks.",
  },
  {
    icon: Sparkles,
    title: "Personalization",
    description:
      "Every traveler is unique. Our AI-powered platform combined with human expertise ensures your trip is tailored to your preferences, budget, and travel style.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description:
      "We partner with local guides, vendors, and communities across Uttarakhand, Himachal Pradesh, and North India to provide authentic, immersive experiences.",
  },
  {
    icon: TrendingUp,
    title: "Affordability",
    description:
      "Travel should be accessible. We offer budget-friendly options without compromising on quality, making domestic travel affordable for everyone.",
  },
  {
    icon: MapPin,
    title: "Sustainable Tourism",
    description:
      "We're committed to responsible tourism that benefits local communities and preserves India's natural and cultural heritage for future generations.",
  },
];

const services = [
  {
    title: "Group Tours",
    description:
      "Perfect for college groups, office teams, and backpacker communities. We organize curated group trips with shared experiences and group discounts.",
  },
  {
    title: "Trekking & Adventure",
    description:
      "From Himalayan treks to weekend adventures near Delhi, we offer guided treks, Rishikesh adventures, and Manali–Kasol circuits with experienced guides.",
  },
  {
    title: "Religious & Cultural Tourism",
    description:
      "Experience spiritual journeys including Kumbh Mela 2025, Haridwar-Rishikesh spiritual tours, and temple trails across North India.",
  },
  {
    title: "Custom Trips",
    description:
      "Get personalized itineraries created by our AI system and human travel experts, tailored to your budget, interests, group size, and travel dates.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop"
            alt="Team travel and adventure exploration"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Travel-Tech Company • AI-Powered • 50K+ Travelers
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            About <span className="text-primary">TrippyWay</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            India&apos;s first <span className="font-bold text-primary">AI-powered travel-tech platform</span> making 
            domestic travel smarter, affordable, and hyper-personalized through cutting-edge technology 
            and verified local partnerships.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-white/80">Happy Travelers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">130+</div>
              <div className="text-sm text-white/80">Destinations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">85%</div>
              <div className="text-sm text-white/80">Conversion Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Mission Statement */}
        <Card className="mb-16 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto">
              To democratize travel planning in India by combining <span className="font-semibold text-foreground">artificial intelligence</span> with 
              deep local expertise. We&apos;re building the future where every Indian can discover, 
              customize, and book verified travel experiences in seconds—from the majestic Himalayas 
              to spiritual destinations—with <span className="font-semibold text-foreground">complete trust, transparency, and affordability</span>.
            </p>
          </CardContent>
        </Card>

        {/* Tech & Innovation Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Technology Behind TrippyWay
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We&apos;re tech experts first, travel enthusiasts second. Our platform is built on enterprise-grade technology stack.
            </p>
          </div>

          {/* Image + Tech Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Tech Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Modern technology and data analytics"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Enterprise-Grade Tech Stack</h3>
                <p className="text-white/90 text-sm">Next.js 16 • TypeScript • Supabase • AI Algorithms</p>
              </div>
            </div>

            {/* Right: Tech Cards Stacked */}
            <div className="flex flex-col gap-6">
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">AI-Powered Matching</CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Our proprietary AI algorithm analyzes traveler preferences, budget, behavior patterns, 
                        and real-time availability. <span className="font-semibold text-foreground">85% higher conversion</span> than traditional search.
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Real-Time Processing</CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Processing thousands of data points in milliseconds. Live tracking across <span className="font-semibold text-foreground">130+ destinations</span>, 
                        dynamic pricing, and instant confirmations.
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Verified Partners</CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Every vendor undergoes rigorous verification—GST/PAN validation, bank verification, 
                        quality audits. <span className="font-semibold text-foreground">45-day no lock-in MOU</span>.
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Vendor Partnership Ecosystem */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
                alt="Local partners and vendors working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold mb-3">
                  <Shield className="w-4 h-4" />
                  Verified Partner Ecosystem
                </div>
                <h3 className="text-2xl font-bold mb-2">Growing Together</h3>
                <p className="text-white/90 text-sm">Empowering local businesses through technology</p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Empower Local Travel Vendors
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Unlike traditional OTAs that commoditize vendors, we use technology to grow their business 
                while ensuring traveler trust through rigorous verification.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">100% Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      GST/PAN validation, bank verification, quality audits, and continuous performance monitoring
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">10x Growth Potential</h4>
                    <p className="text-sm text-muted-foreground">
                      AI-powered traveler matching delivers 85% higher conversion vs. traditional listings
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Zero Commission for 6 Months</h4>
                    <p className="text-sm text-muted-foreground">
                      Early partners enjoy 0% commission, then competitive 12-15% with 45-day no lock-in
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-background rounded-xl border-2 border-emerald-100">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Our Vendor Success Formula:</span> Real-time analytics dashboard + 
                  automated marketing exposure + smart pricing recommendations + WhatsApp integration + 24/7 support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What We Offer Travelers
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From group adventures to spiritual journeys, every trip is powered by our <span className="font-semibold text-foreground">AI + verified partner network</span>.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Group Tours */}
            <Card className="hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2083&auto=format&fit=crop"
                  alt="Group of friends enjoying travel together"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                    <Users className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {services[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {services[0].description}
                </p>
              </CardContent>
            </Card>

            {/* Trekking & Adventure */}
            <Card className="hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
                  alt="Trekkers on mountain trail with beautiful landscape"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                    <Mountain className="w-3 h-3" />
                    Adventure
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {services[1].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {services[1].description}
                </p>
              </CardContent>
            </Card>

            {/* Religious & Cultural */}
            <Card className="hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop"
                  alt="Beautiful temple with spiritual atmosphere"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                    <Star className="w-3 h-3" />
                    Spiritual
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {services[2].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {services[2].description}
                </p>
              </CardContent>
            </Card>

            {/* Custom Trips */}
            <Card className="hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop"
                  alt="Planning a personalized travel itinerary"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                    <Compass className="w-3 h-3" />
                    Personalized
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {services[3].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {services[3].description}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The TrippyWay Difference - Infographic Style */}
        <section className="mb-16">
          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="grid md:grid-cols-2">
              {/* Left: Image */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                  alt="Data visualization and analytics"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <div className="text-5xl font-bold mb-2">1M+</div>
                    <div className="text-lg">Data Points Analyzed</div>
                    <div className="text-sm text-white/80 mt-2">Every Second</div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <CardContent className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">The TrippyWay Difference</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  While traditional travel agencies rely on manual processes and limited options, 
                  we use <span className="font-semibold text-primary">machine learning algorithms</span> to analyze millions 
                  of data points — from weather patterns and festival calendars to user behavior and 
                  booking trends — delivering personalized recommendations that feel handpicked just for you.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="text-2xl font-bold text-primary mb-1">130+</div>
                    <div className="text-sm text-muted-foreground">Destinations</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">&lt;2s</div>
                    <div className="text-sm text-muted-foreground">Match Time</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700 mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700 mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Verified</div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision we make and every experience we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const gradients = [
                'from-red-500 to-pink-500',
                'from-green-500 to-emerald-500',
                'from-purple-500 to-indigo-500',
                'from-blue-500 to-cyan-500',
                'from-orange-500 to-red-500',
                'from-teal-500 to-green-500',
              ];
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Geography Focus */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Geography</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We specialize in Uttarakhand & Himachal Pradesh tourism with deep local partnerships 
              and expertise across North India&apos;s most stunning destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Uttarakhand */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop"
                  alt="Beautiful landscapes of Uttarakhand"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">Uttarakhand</h3>
                  <p className="text-white/80 text-sm">Divine Himalayas</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>50+ Destinations</span>
                </div>
              </CardContent>
            </Card>

            {/* Himachal Pradesh */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop"
                  alt="Scenic beauty of Himachal Pradesh"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">Himachal Pradesh</h3>
                  <p className="text-white/80 text-sm">Adventure Paradise</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>40+ Destinations</span>
                </div>
              </CardContent>
            </Card>

            {/* North India */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
                  alt="Cultural richness of North India"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">North India</h3>
                  <p className="text-white/80 text-sm">Rich Heritage</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>30+ Destinations</span>
                </div>
              </CardContent>
            </Card>

            {/* Delhi NCR */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Delhi NCR cityscape"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">Delhi NCR</h3>
                  <p className="text-white/80 text-sm">Urban Gateway</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Weekend Escapes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why TrippyWay Outperforms Traditional Agencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Technology-driven approach that delivers superior results for both travelers and partners
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  AI + Human Expertise Hybrid
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes millions of data points to suggest perfect matches, while 
                  local travel experts fine-tune itineraries. You get the speed of automation 
                  with the personal touch of human curation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  Verified Partner Ecosystem
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Every vendor undergoes GST/PAN verification, quality audits, and continuous 
                  performance monitoring. We track vendor reliability, response times, and 
                  customer satisfaction scores in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Real-Time Optimization
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike static travel packages, our platform dynamically updates prices, 
                  availability, and recommendations based on real-time data. You always get 
                  the best available options at the best prices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  Scale Without Compromise
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Built on modern cloud infrastructure (Supabase, Vercel) that scales 
                  automatically. We handle thousands of concurrent users while maintaining 
                  personalization and 24/7 support through WhatsApp integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Competitive Advantage - TrippyWay vs Traditional */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              Competitive Advantage
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TrippyWay vs Traditional Travel Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why tech-savvy travelers and vendors choose us over legacy OTAs and traditional travel agencies.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-3 gap-4">
                {/* Header Row */}
                <div className="p-5 bg-gradient-to-br from-muted to-muted/50 rounded-xl font-semibold text-lg">
                  Feature
                </div>
                <div className="p-5 bg-gradient-to-br from-primary via-primary to-purple-600 rounded-xl font-bold text-center text-white shadow-lg">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    TrippyWay (Tech-First)
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-muted to-muted/50 rounded-xl font-semibold text-center text-lg">
                  Traditional Agencies/OTAs
                </div>

                {/* Personalization */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Trip Personalization</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-purple-50 border-2 border-primary/30 shadow-sm">
                  <div className="font-bold text-primary mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Matching
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Analyzes preferences, budget, behavior patterns to auto-suggest perfect trips
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Manual Recommendations</div>
                  <div className="text-sm text-muted-foreground">
                    Agent suggests pre-packaged tours based on limited filters
                  </div>
                </div>

                {/* Partner Verification */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Vendor Verification</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-sm">
                  <div className="font-bold text-emerald-700 mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    100% Verified + Real-Time Monitoring
                  </div>
                  <div className="text-sm text-muted-foreground">
                    GST/PAN/Bank verification + continuous quality tracking
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Basic Listings</div>
                  <div className="text-sm text-muted-foreground">
                    Limited verification, no real-time quality monitoring
                  </div>
                </div>

                {/* Pricing Transparency */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Pricing Model</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-sm">
                  <div className="font-bold text-blue-700 mb-1 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Transparent + Dynamic
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Real-time pricing, 12-15% commission (0% for first 6 months)
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Hidden Markups</div>
                  <div className="text-sm text-muted-foreground">
                    20-30% commission + undisclosed margins
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Technology</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-sm">
                  <div className="font-bold text-purple-700 mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Modern Cloud Stack
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next.js 16, TypeScript, AI algorithms, real-time data sync
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Legacy Systems</div>
                  <div className="text-sm text-muted-foreground">
                    Outdated tech, slow updates, manual processes
                  </div>
                </div>

                {/* Vendor Growth */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Partner Growth Support</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-sm">
                  <div className="font-bold text-orange-700 mb-1 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    10x Growth Potential
                  </div>
                  <div className="text-sm text-muted-foreground">
                    AI matching, analytics dashboard, automated marketing, smart pricing
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Basic Listing Exposure</div>
                  <div className="text-sm text-muted-foreground">
                    Pay-to-rank model, limited support, no growth tools
                  </div>
                </div>

                {/* Speed */}
                <div className="p-5 rounded-xl bg-background border-2 border-muted">
                  <div className="font-semibold text-base">Booking Speed</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-sm">
                  <div className="font-bold text-green-700 mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Instant Booking
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Real-time availability, instant confirmation, AI itinerary in seconds
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-muted/20 border-2 border-muted">
                  <div className="font-semibold mb-1">Manual Processing</div>
                  <div className="text-sm text-muted-foreground">
                    24-48 hour confirmation wait, manual coordination
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600" />
            <div className="relative z-10 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Result</h3>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                <span className="font-bold">85% higher conversion rates</span>, 
                <span className="font-bold"> 10x partner growth</span>, and 
                <span className="font-bold"> 95% customer satisfaction</span> through our technology-first approach.
              </p>
            </div>
          </div>
        </section>

        {/* Team & Culture Section */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="TrippyWay team working together"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-8 md:px-16 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Built by Tech Enthusiasts, Travel Lovers
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                  Our diverse team of engineers, designers, and travel experts work together 
                  to revolutionize how India travels. We combine technical excellence with 
                  deep travel industry knowledge.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">20+</div>
                    <div className="text-sm text-white/80">Team Members</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm text-white/80">Years Experience</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-white/80">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop"
              alt="Adventure awaits - explore destinations"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-purple-600/85" />
          </div>
          <div className="relative z-10 px-8 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Travel 2.0?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 50K+ travelers who chose tech-powered personalization over traditional agencies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/packages">Explore AI-Curated Trips</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/partner-application">Partner With Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/help-centre">Get Help</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-muted-foreground mb-6">
            Have questions or want to learn more? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/help-centre">Help Centre</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="mailto:contact@trippyway.com">Email Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
