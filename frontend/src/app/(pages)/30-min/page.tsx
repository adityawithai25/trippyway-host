import { Metadata } from "next";
import BookingCalendar from "./_components/booking-calendar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title:
    "Partner with TrippyWay - Schedule a 30-Minute Call | Travel Partnership",
  description:
    "Join TrippyWay's partner network. Schedule a free 30-minute call to explore travel partnership opportunities, grow your business, and reach more travelers. No pressure, just a conversation to see if we're a good fit.",
  keywords: [
    "TrippyWay partner",
    "travel partnership",
    "become a travel partner",
    "travel business partnership",
    "partner with TrippyWay",
    "travel platform partnership",
    "30 minute call",
    "schedule call",
    "travel partner program",
    "India travel partnership",
  ],
  openGraph: {
    title: "Partner with TrippyWay - Schedule a 30-Minute Call",
    description:
      "Join TrippyWay's partner network. Schedule a free 30-minute call to explore travel partnership opportunities and grow your business.",
    url: "/30-min",
    siteName: "TrippyWay",
    images: [
      {
        url: "/og?title=Partner%20with%20TrippyWay&description=Schedule%20a%20free%2030-minute%20call%20to%20explore%20travel%20partnership%20opportunities",
        width: 1200,
        height: 630,
        alt: "TrippyWay Partner Program - Schedule a Call",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner with TrippyWay - Schedule a 30-Minute Call",
    description:
      "Join TrippyWay's partner network. Schedule a free 30-minute call to explore travel partnership opportunities and grow your business.",
    images: [
      "/og?title=Partner%20with%20TrippyWay&description=Schedule%20a%20free%2030-minute%20call%20to%20explore%20travel%20partnership%20opportunities",
    ],
  },
  alternates: {
    canonical: "/30-min",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="grow pt-32 pb-12 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center my-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900 font-phudu">
              Partner with TrippyWay
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Schedule a free 30-minute call to explore partnership
              opportunities and discover how we can help grow your travel
              business together.
            </p>
          </div>

          <BookingCalendar calLink="aditya-dubey-tw/30min" />
        </div>
      </section>
    </main>
  );
}
