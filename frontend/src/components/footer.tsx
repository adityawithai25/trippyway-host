import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border sm:pt-16 pt-8 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-12 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="TrippyWay Logo"
                  width={72}
                  height={72}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Making travel simple, affordable, and unforgettable. Your journey
              begins here.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/help-centre"
                  className="hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-condition"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/help-centre"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <Link
                  href="https://wa.me/919250294508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +91 9250294508
                  <span className="text-xs text-emerald-600 ml-1">(WhatsApp)</span>
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <Link
                  href="mailto:trippyywayy@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  trippyywayy@gmail.com
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <Link
                  href="https://www.instagram.com/thetrippywayofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/thetrippywayofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/thetrippywayofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/thetrippywayofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 TrippyWay. All rights reserved.</p>
      </div>
    </footer>
  );
}
