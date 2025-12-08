"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Mail,
  Phone,
  Search,
  Briefcase,
  Calendar,
  CreditCard,
  Shield,
  MapPin,
  Users,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  FileText,
  Star,
  Sparkles,
} from "lucide-react";
import { getWhatsAppNumber } from "@/lib/whatsapp";
import { useState, useMemo } from "react";

const faqCategories = [
  {
    title: "Getting Started",
    iconName: "Sparkles",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    questions: [
      {
        q: "How do I start planning my trip?",
        a: "Simply use our AI-powered search on the homepage. Enter your destination, dates, and number of travelers. Our system will create personalized trip recommendations instantly. You can also browse our curated packages on the Packages page.",
        icon: MapPin,
      },
      {
        q: "Do I need to create an account to book?",
        a: "No account needed to browse! However, creating an account helps you save preferences, track bookings, and receive personalized recommendations. You can sign up using email or Google login in just a few seconds.",
        icon: Users,
      },
      {
        q: "What makes TrippyWay different?",
        a: "We combine AI technology with local expertise to create hyper-personalized trips. Unlike generic platforms, we specialize in North India (Uttarakhand, Himachal) and work only with verified local partners. Plus, our 24/7 WhatsApp support means you're never alone.",
        icon: Star,
      },
    ],
  },
  {
    title: "Booking & Payment",
    iconName: "CreditCard",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    questions: [
      {
        q: "How do I book a trip on TrippyWay?",
        a: "Browse trips, select your package, choose dates and group size, then click 'Book Now'. Fill in traveler details and make payment through our secure gateway. You'll get instant confirmation via email, SMS, and WhatsApp.",
        icon: Calendar,
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI (GPay, PhonePe, Paytm), net banking, and digital wallets. All payments are secured with 256-bit SSL encryption. We also offer EMI options on select bookings.",
        icon: CreditCard,
      },
      {
        q: "Can I modify my booking after confirmation?",
        a: "Yes! Modifications are possible based on availability. Contact us within 48 hours via WhatsApp or email. Changes to dates, group size, or accommodation may incur additional charges. Some packages have restrictions during peak season.",
        icon: CheckCircle,
      },
      {
        q: "When will I receive my booking confirmation?",
        a: "Instantly! You'll receive confirmation via email and SMS within seconds of payment. Your booking details, trip coordinator contact, and digital voucher will be sent immediately. Check spam folder if you don't see it.",
        icon: Clock,
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely! We use industry-standard PCI-DSS compliant payment gateways. Your card details are encrypted and never stored on our servers. We partner with trusted payment providers like Razorpay for maximum security.",
        icon: Shield,
      },
    ],
  },
  {
    title: "Cancellations & Refunds",
    iconName: "AlertCircle",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    questions: [
      {
        q: "What is your cancellation policy?",
        a: "Policies vary by trip. Generally: 15+ days before = Full refund (minus 5% processing fee), 7-14 days = 50% refund, Less than 7 days = 25% refund or credit note. Adventure/trek trips have stricter policies due to permits. Always check your booking's specific terms.",
        icon: FileText,
      },
      {
        q: "How do I cancel my booking?",
        a: "Contact us immediately via WhatsApp or email with your booking ID. Our team will process your cancellation request within 24 hours and confirm the refund amount as per policy. Rush cancellations? Call us directly.",
        icon: Phone,
      },
      {
        q: "How long do refunds take?",
        a: "Approved refunds are processed to your original payment method within 5-7 business days. Bank processing may take additional 3-5 days. You'll receive email updates at every step. For credit card refunds, it reflects in 1-2 billing cycles.",
        icon: Clock,
      },
      {
        q: "What if TrippyWay cancels my trip?",
        a: "If we cancel due to weather, permits, or unforeseen circumstances, you get a 100% refund (no processing fee) OR reschedule to another date free of charge OR transfer to a different trip of equal value. Your choice!",
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Trips & Itineraries",
    iconName: "MapPin",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    questions: [
      {
        q: "What types of trips do you offer?",
        a: "We specialize in: Group Tours (college/office trips), Trekking & Adventure (Himalayan treks, rafting), Weekend Getaways (Delhi NCR region), Religious Tours (Char Dham, Haridwar), Custom Trips (AI-designed itineraries). Focus areas: Uttarakhand, Himachal Pradesh, and North India.",
        icon: MapPin,
      },
      {
        q: "How does AI personalization work?",
        a: "Our TrippyAI analyzes your preferences (budget, travel style, group type, interests) and matches them with real-time data on weather, availability, and local events. It then creates a custom itinerary that you can further modify with our travel experts.",
        icon: Sparkles,
      },
      {
        q: "Can I customize a package?",
        a: "Absolutely! Every trip is customizable. Want to add extra days? Different hotels? Adventure activities? Special dietary needs? Just message us on WhatsApp with your booking ID and requirements. We'll redesign the itinerary at no extra cost.",
        icon: Users,
      },
      {
        q: "What's included in trip prices?",
        a: "Typical inclusions: Accommodation, Transportation (depending on package), Guided activities, Some meals (specified per trip), Entry fees/permits. Exclusions: Personal expenses, Travel insurance, Meals not mentioned, Optional activities. Always check the 'Inclusions' section before booking.",
        icon: Info,
      },
      {
        q: "Do you provide solo traveler options?",
        a: "Yes! We have dedicated solo traveler trips and can also accommodate solo bookings in group tours. For solo adventures, you can join existing groups or book private tours. Note: Single occupancy may have additional charges.",
        icon: Users,
      },
    ],
  },
  {
    title: "Safety & Guidelines",
    iconName: "Shield",
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    questions: [
      {
        q: "Are your trips safe?",
        a: "Safety is our #1 priority. All partners are verified, guides are certified, and we follow strict safety protocols. Emergency contact numbers, first-aid kits, and 24/7 trip coordinators are standard. For adventure trips, safety briefings are mandatory.",
        icon: Shield,
      },
      {
        q: "Is travel insurance included?",
        a: "Basic travel insurance is included in adventure/trek packages. For comprehensive coverage (medical, trip cancellation, baggage), we recommend purchasing additional insurance. We partner with ICICI Lombard and can help you get coverage at discounted rates.",
        icon: FileText,
      },
      {
        q: "What should I pack for treks?",
        a: "You'll receive a detailed packing list after booking. Essentials: Trekking shoes, warm layers, rain gear, personal medications, sunscreen, headlamp, reusable water bottle. For high-altitude treks, additional gear like sleeping bags may be required (we can arrange rentals).",
        icon: Info,
      },
      {
        q: "What if I have dietary restrictions?",
        a: "We accommodate vegetarian, vegan, Jain, and most dietary preferences. Inform us during booking or at least 3 days before departure. For remote treks, options may be limited, but we always ensure you have nutritious meals that meet your needs.",
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Account & Technical",
    iconName: "HelpCircle",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page, enter your email, and check your inbox for reset instructions. The link expires in 1 hour. Still having trouble? WhatsApp us and we'll help you regain access immediately.",
        icon: Users,
      },
      {
        q: "Can I change my email/phone number?",
        a: "Yes, log in and go to Profile Settings. Update your email or phone, verify via OTP, and you're done. Note: Your booking confirmations will be sent to the updated contact info going forward.",
        icon: Mail,
      },
      {
        q: "Where can I see my booking history?",
        a: "Log in to your account and click 'My Bookings' in the dropdown menu. You'll see all past, upcoming, and cancelled bookings with full details, payment receipts, and trip coordinator contacts.",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Partners & Business",
    iconName: "Briefcase",
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50",
    questions: [
      {
        q: "How can I partner with TrippyWay?",
        a: "We're always looking for quality partners! If you're a hotel owner, transport provider, trek organizer, or activity operator in Uttarakhand/Himachal, apply through our Partner Application page. We'll review and get back within 3 business days.",
        icon: Briefcase,
      },
      {
        q: "What are the partnership benefits?",
        a: "Access to 50K+ verified travelers, automated marketing & SEO, smart pricing recommendations, WhatsApp integration for customer communication, dedicated partner dashboard, competitive commissions (8-15%), and 24/7 partner support.",
        icon: Star,
      },
      {
        q: "Do you offer corporate travel services?",
        a: "Yes! We handle corporate offsites, team-building retreats, and conference travel. We offer customized packages, bulk discounts, GST invoices, and dedicated account managers. Contact us at business@trippyway.com for enterprise solutions.",
        icon: Users,
      },
    ],
  },
];

export default function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const whatsappNumber = getWhatsAppNumber();

  // Handle WhatsApp support for booking issues
  const handleBookingSupport = () => {
    const message = encodeURIComponent(
      "Hi, I need help with my booking. Can you please assist me?"
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`,
      "_blank"
    );
  };

  // Filter FAQs based on search
  const filteredCategories = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.a.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background py-16">
      <div className="max-w-6xl mx-auto px-4 mt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            24/7 Support • Instant Answers • Expert Help
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
            Help Centre
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about planning trips, making bookings,
            and getting the most out of your TrippyWay experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers... (e.g., 'refund policy', 'booking')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Found{" "}
                {filteredCategories.reduce(
                  (acc, cat) => acc + cat.questions.length,
                  0
                )}{" "}
                result(s)
              </p>
            )}
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Email Support */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Email Support</CardTitle>
              <CardDescription>
                Get detailed assistance via email. Response within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg">
                <Link href="mailto:support@trippyway.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Support - Booking Issues */}
          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-background hover:border-emerald-400 transition-all hover:shadow-lg group">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg text-emerald-700">
                Booking Issues?
              </CardTitle>
              <CardDescription>
                Get instant help on WhatsApp. Our team responds in minutes!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleBookingSupport}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Partner Inquiries */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Partner With Us</CardTitle>
              <CardDescription>
                Join our network of verified travel partners across India.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/partner-application">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Apply Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6 my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          {/* Getting Started */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Getting Started</CardTitle>
                  <CardDescription>3 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How do I start planning my trip?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Simply use our AI-powered search on the homepage. Enter your destination, dates, and number of travelers. Our system will create personalized trip recommendations instantly. You can also browse our curated packages on the Packages page.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Do I need to create an account to book?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    No account needed to browse! However, creating an account helps you save preferences, track bookings, and receive personalized recommendations. You can sign up using email or Google login in just a few seconds.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What makes TrippyWay different?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    We combine AI technology with local expertise to create hyper-personalized trips. Unlike generic platforms, we specialize in North India (Uttarakhand, Himachal) and work only with verified local partners. Plus, our 24/7 WhatsApp support means you're never alone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking & Payment */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <CreditCard className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Booking & Payment</CardTitle>
                  <CardDescription>5 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How do I book a trip on TrippyWay?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Browse trips, select your package, choose dates and group size, then click 'Book Now'. Fill in traveler details and make payment through our secure gateway. You'll get instant confirmation via email, SMS, and WhatsApp.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What payment methods are accepted?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI (GPay, PhonePe, Paytm), net banking, and digital wallets. All payments are secured with 256-bit SSL encryption. We also offer EMI options on select bookings.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Can I modify my booking after confirmation?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Yes! Modifications are possible based on availability. Contact us within 48 hours via WhatsApp or email. Changes to dates, group size, or accommodation may incur additional charges. Some packages have restrictions during peak season.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">When will I receive my booking confirmation?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Instantly! You'll receive confirmation via email and SMS within seconds of payment. Your booking details, trip coordinator contact, and digital voucher will be sent immediately. Check spam folder if you don't see it.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Is my payment information secure?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Absolutely! We use industry-standard PCI-DSS compliant payment gateways. Your card details are encrypted and never stored on our servers. We partner with trusted payment providers like Razorpay for maximum security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellations & Refunds */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Cancellations & Refunds</CardTitle>
                  <CardDescription>4 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What is your cancellation policy?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Policies vary by trip. Generally: 15+ days before = Full refund (minus 5% processing fee), 7-14 days = 50% refund, Less than 7 days = 25% refund or credit note. Adventure/trek trips have stricter policies due to permits. Always check your booking's specific terms.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How do I cancel my booking?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Contact us immediately via WhatsApp or email with your booking ID. Our team will process your cancellation request within 24 hours and confirm the refund amount as per policy. Rush cancellations? Call us directly.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How long do refunds take?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Approved refunds are processed to your original payment method within 5-7 business days. Bank processing may take additional 3-5 days. You'll receive email updates at every step. For credit card refunds, it reflects in 1-2 billing cycles.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What if TrippyWay cancels my trip?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    If we cancel due to weather, permits, or unforeseen circumstances, you get a 100% refund (no processing fee) OR reschedule to another date free of charge OR transfer to a different trip of equal value. Your choice!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trips & Itineraries */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Trips & Itineraries</CardTitle>
                  <CardDescription>5 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What types of trips do you offer?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    We specialize in: Group Tours (college/office trips), Trekking & Adventure (Himalayan treks, rafting), Weekend Getaways (Delhi NCR region), Religious Tours (Char Dham, Haridwar), Custom Trips (AI-designed itineraries). Focus areas: Uttarakhand, Himachal Pradesh, and North India.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How does AI personalization work?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Our TrippyAI analyzes your preferences (budget, travel style, group type, interests) and matches them with real-time data on weather, availability, and local events. It then creates a custom itinerary that you can further modify with our travel experts.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Can I customize a package?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Absolutely! Every trip is customizable. Want to add extra days? Different hotels? Adventure activities? Special dietary needs? Just message us on WhatsApp with your booking ID and requirements. We'll redesign the itinerary at no extra cost.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What's included in trip prices?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Typical inclusions: Accommodation, Transportation (depending on package), Guided activities, Some meals (specified per trip), Entry fees/permits. Exclusions: Personal expenses, Travel insurance, Meals not mentioned, Optional activities. Always check the 'Inclusions' section before booking.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Do you provide solo traveler options?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Yes! We have dedicated solo traveler trips and can also accommodate solo bookings in group tours. For solo adventures, you can join existing groups or book private tours. Note: Single occupancy may have additional charges.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Guidelines */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Safety & Guidelines</CardTitle>
                  <CardDescription>4 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Are your trips safe?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Safety is our #1 priority. All partners are verified, guides are certified, and we follow strict safety protocols. Emergency contact numbers, first-aid kits, and 24/7 trip coordinators are standard. For adventure trips, safety briefings are mandatory.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Is travel insurance included?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Basic travel insurance is included in adventure/trek packages. For comprehensive coverage (medical, trip cancellation, baggage), we recommend purchasing additional insurance. We partner with ICICI Lombard and can help you get coverage at discounted rates.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What should I pack for treks?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    You'll receive a detailed packing list after booking. Essentials: Trekking shoes, warm layers, rain gear, personal medications, sunscreen, headlamp, reusable water bottle. For high-altitude treks, additional gear like sleeping bags may be required (we can arrange rentals).
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What if I have dietary restrictions?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    We accommodate vegetarian, vegan, Jain, and most dietary preferences. Inform us during booking or at least 3 days before departure. For remote treks, options may be limited, but we always ensure you have nutritious meals that meet your needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account & Technical */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <HelpCircle className="w-7 h-7 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Account & Technical</CardTitle>
                  <CardDescription>3 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How do I reset my password?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Click 'Forgot Password' on the login page, enter your email, and check your inbox for reset instructions. The link expires in 1 hour. Still having trouble? WhatsApp us and we'll help you regain access immediately.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Can I change my email/phone number?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Yes, log in and go to Profile Settings. Update your email or phone, verify via OTP, and you're done. Note: Your booking confirmations will be sent to the updated contact info going forward.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Where can I see my booking history?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Log in to your account and click 'My Bookings' in the dropdown menu. You'll see all past, upcoming, and cancelled bookings with full details, payment receipts, and trip coordinator contacts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partners & Business */}
          <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-teal-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Partners & Business</CardTitle>
                  <CardDescription>3 questions answered</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">How can I partner with TrippyWay?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    We're always looking for quality partners! If you're a hotel owner, transport provider, trek organizer, or activity operator in Uttarakhand/Himachal, apply through our Partner Application page. We'll review and get back within 3 business days.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">What are the partnership benefits?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Access to 50K+ verified travelers, automated marketing & SEO, smart pricing recommendations, WhatsApp integration for customer communication, dedicated partner dashboard, competitive commissions (8-15%), and 24/7 partner support.
                  </p>
                </div>
                <div className="border-l-4 border-primary/20 pl-6 py-2 hover:border-primary/60 transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg text-foreground">Do you offer corporate travel services?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    Yes! We handle corporate offsites, team-building retreats, and conference travel. We offer customized packages, bulk discounts, GST invoices, and dedicated account managers. Contact us at business@trippyway.com for enterprise solutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section - Enhanced */}
        <Card className="mt-16 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">
              Still Have Questions?
            </CardTitle>
            <CardDescription className="text-base">
              Our dedicated support team is here to help you 24/7. Choose your
              preferred way to connect.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <button
                onClick={handleBookingSupport}
                className="p-6 rounded-xl border-2 border-border hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
              >
                <MessageCircle className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2 text-lg">WhatsApp</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {whatsappNumber}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online Now
                </div>
              </button>

              {/* Email */}
              <a
                href="mailto:support@trippyway.com"
                className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <Mail className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2 text-lg">Email</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  support@trippyway.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Response within 24 hours
                </p>
              </a>

              {/* Phone */}
              <a
                href={`tel:${whatsappNumber}`}
                className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <Phone className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2 text-lg">Phone</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {whatsappNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  Mon-Sun, 9 AM - 9 PM IST
                </p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">More Resources</h3>
          <p className="text-muted-foreground mb-6">
            Learn more about our policies, services, and company
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/terms-condition">
                <FileText className="w-4 h-4 mr-2" />
                Terms & Conditions
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/privacy-policy">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                <Info className="w-4 h-4 mr-2" />
                About Us
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/packages">
                <MapPin className="w-4 h-4 mr-2" />
                Browse Trips
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">
              Support Available
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary mb-1">
              &lt; 5 min
            </div>
            <div className="text-sm text-muted-foreground">
              WhatsApp Response
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary mb-1">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary mb-1">98%</div>
            <div className="text-sm text-muted-foreground">
              Issue Resolution
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
