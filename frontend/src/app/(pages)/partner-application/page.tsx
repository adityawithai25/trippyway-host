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
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <Badge
              variant="outline"
              className="mb-2 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700"
            >
              <Star className="w-3.5 h-3.5 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-paytone-one">
              What Our <span className="text-purple-600">Partners Say</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Join hundreds of successful travel businesses already growing with
              TrippyWay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNER_TESTIMONIALS.map((testimonial, index) => (
              <Card
                key={index}
                className="border drop-shadow-md border-gray-200 p-4  hover:shadow-lg transition-all duration-[250ms]"
              >
                <CardContent className="p-4 space-y-4">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-500/90 text-yellow-500/90"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center text-purple-700 font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
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
        className="py-12 sm:py-16 md:py-24 bg-linear-to-t from-gray-50 to-white scroll-mt-20"
      >
        <div className="container mx-auto max-sm:px-4  max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 border-2 border-purple-200 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black">
                        Partner Application
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Join our network of verified travel partners
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <PartnerApplicationForm />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Benefits Recap & Help */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-2 border-purple-200 bg-linear-to-br from-purple-50 to-white">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-700" />
                    Quick Benefits Recap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Zero commission for first 6 months
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        AI-powered traveler matching
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Real-time analytics dashboard
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        24/7 dedicated support
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Automated marketing exposure
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Have questions about the partnership program?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:bg-purple-50"
                    asChild
                  >
                    <a href="mailto:partners@trippyway.com">
                      <Mail className="w-4 h-4 mr-2" />
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
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
              Frequently Asked{" "}
              <span className="text-purple-800">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-inter">
              Everything you need to know about partnering with TrippyWay
            </p>
          </div>

          <div className="space-y-4">
            {PARTNER_FAQ.map((faq, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 hover:border-purple-300 transition-all duration-[250ms]"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
