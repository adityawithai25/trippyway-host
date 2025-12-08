import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnerApplicationForm from "./_components/form";
import PartnerHeroSection from "./_components/hero-section";
import BenefitsGrid from "./_components/benefits-grid";
import AIGrowthSection from "./_components/ai-growth-section";
import PropertyTypesSection from "./_components/property-types";
import FeaturesShowcase from "./_components/features-showcase";
import { PARTNER_TESTIMONIALS, PARTNER_FAQ } from "@/constants/partner-data";

const PartnerApplication = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PartnerHeroSection />

      {/* Benefits Grid */}
      <BenefitsGrid />

      {/* AI Growth Section */}
      <AIGrowthSection />

      {/* Property Types */}
      <PropertyTypesSection />

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-6 md:mb-8 space-y-2">
            <Badge
              variant="outline"
              className="mb-1 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700 text-sm"
            >
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Success Stories
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
              What Our <span className="text-purple-600">Partners Say</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              Join hundreds of successful travel businesses already growing with TrippyWay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTNER_TESTIMONIALS.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-all duration-[250ms]"
              >
                <CardContent className="p-4 space-y-3">
                  {/* Rating */}
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500/90 text-yellow-500/90"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.business}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section
        id="apply-form"
        className="py-8 sm:py-12 md:py-16 bg-linear-to-t from-gray-50 to-white scroll-mt-20"
      >
        <div className="container mx-auto max-sm:px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 relative">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl font-black">
                        Partner Application
                      </CardTitle>
                      <CardDescription className="mt-0.5 text-xs">
                        Join our network of verified travel partners
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <PartnerApplicationForm />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Benefits Recap & Help */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="border border-purple-200 bg-linear-to-br from-purple-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-700" />
                    Quick Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Zero commission for first 6 months
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        AI-powered traveler matching
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Real-time analytics dashboard
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        24/7 dedicated support
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Automated marketing exposure
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Have questions about the partnership program?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border border-purple-200 hover:bg-purple-50 text-xs"
                    asChild>
                    <a href="mailto:partners@trippyway.com">
                      <Mail className="w-3 h-3 mr-1.5" />
                      Contact Support
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-6 md:mb-8 space-y-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
              Frequently Asked{" "}
              <span className="text-purple-800">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-inter">
              Everything you need to know about partnering with TrippyWay
            </p>
          </div>

          <div className="space-y-3">
            {PARTNER_FAQ.map((faq, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:border-purple-300 transition-all duration-[250ms]"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg font-bold text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnerApplication;
