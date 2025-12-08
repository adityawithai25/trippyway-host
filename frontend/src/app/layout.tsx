import type { Metadata } from "next";
import { Geist, Geist_Mono, Paytone_One, Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const paytoneOne = Paytone_One({
  variable: "--font-paytone-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "TrippyWay - Your Travel Companion",
  description:
    "TrippyWay is your travel companion. We help you find the best trips and activities for your next adventure.",
  openGraph: {
    title: "TrippyWay - Your Travel Companion",
    description: "Plan, customise, and book hyper-personalised India trips with local expertise.",
    url: "/",
    siteName: "TrippyWay",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrippyWay - Your Travel Companion",
    description: "Plan, customise, and book hyper-personalised India trips with local expertise.",
    images: ["/og"],
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paytoneOne.variable} ${inter.variable} antialiased scrollbar scrollbar-none`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
