"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState, useRef, RefObject } from "react";
import { Menu, X, LogOut, User as UserIcon, Settings } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Navigation links configuration
const NAV_LINKS = [
  { href: "/packages", label: "Weekend Trips" },
  { href: "/about", label: "About" },
  { href: "/partner-application", label: "Become a Partner" },
  { href: "/help-centre", label: "Contact" },
] as const;

// Styling constants for consistency
const HEADER_STYLES = {
  container:
    "flex bg-white/95 backdrop-blur-xl justify-between items-center max-w-6xl px-4 md:px-6 mx-auto w-full md:rounded-full fixed md:top-4 left-0 right-0 z-50 transition-all duration-300 ease-out border border-zinc-200/50",
  scrolled: "shadow-xl border-zinc-300/50",
  unscrolled: "shadow-md",
  nav: {
    link: "relative text-zinc-600 hover:text-zinc-900 transition-colors duration-250  text-sm tracking-wide group font-semibold",
    linkUnderline:
      "absolute bottom-0 left-0 w-0 h-0.5  group-hover:w-full transition-all duration-300 ease-out",
  },
  mobile: {
    button:
      "p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-zinc-100/80 active:scale-95 transition-all duration-250 ease-out",
    menu: "absolute top-full w-[min(calc(100vw-16px),600px)] -right-[8px] mt-3 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl z-50 overflow-hidden border border-zinc-200/50",
    link: "text-base font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/80 active:bg-zinc-200/80 transition-all duration-250 ease-out py-3.5 px-4 rounded-xl min-h-[44px] flex items-center",
  },
} as const;

export default function Header({ hideOnAuth }: { hideOnAuth?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    closeMobileMenu();
  };

  // Close mobile menu when clicking outside
  useOutsideClick(mobileMenuContainerRef as RefObject<HTMLDivElement>, () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  return (
    <header
      className={`${HEADER_STYLES.container} ${
        isScrolled ? HEADER_STYLES.scrolled : HEADER_STYLES.unscrolled
      } ${hideOnAuth ? "sm:hidden" : ""}`}
    >
      {/* Logo Section */}
      <div className="flex items-center md:py-2">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="transition-transform duration-250 hover:scale-105 active:scale-95"
        >
          <Image
            src="/logo.png"
            alt="TrippyWay Logo"
            width={72}
            height={72}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`hidden md:flex gap-6 items-center ${
          hideOnAuth ? "hidden sm:flex" : ""
        }`}
      >
        {/* Navigation Links */}
        <ul className="flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={HEADER_STYLES.nav.link}>
                {link.label}
                <span className={HEADER_STYLES.nav.linkUnderline} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-8 w-px bg-zinc-300" />
        {/* User Section */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-emerald-500/20 transition-all duration-250"
              >
                <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 shadow-xl border-zinc-200/50 rounded-2xl p-2"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal px-3 py-2.5">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-semibold text-zinc-900 leading-none">
                    {user.user_metadata.full_name || "User"}
                  </p>
                  <p className="text-xs leading-none text-zinc-500 font-medium">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer flex items-center px-3 py-2.5 rounded-xl hover:bg-zinc-100 transition-colors duration-200"
                >
                  <UserIcon className="mr-3 h-4 w-4 text-zinc-600" />
                  <span className="font-medium text-zinc-700">
                    Manage Profile
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 px-3 py-2.5 rounded-xl transition-colors duration-200"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            asChild
            className="shadow-md hover:shadow-lg transition-all duration-250 px-6"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </nav>

      {/* Mobile Menu Section */}
      <div ref={mobileMenuContainerRef} className="relative md:hidden">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className={HEADER_STYLES.mobile.button}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-zinc-700" />
          ) : (
            <Menu className="h-6 w-6 text-zinc-700" />
          )}
        </button>

        {/* Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0  z-40 animate-in fade-in duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Dropdown */}
        <div
          className={`${
            HEADER_STYLES.mobile.menu
          } transform transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible scale-100"
              : "opacity-0 -translate-y-2 invisible scale-95"
          }`}
        >
          <div className="flex flex-col p-4 gap-2">
            {/* User Info Section (Mobile) */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold text-zinc-900 truncate">
                    {user.user_metadata.full_name || "User"}
                  </span>
                  <span className="text-xs text-zinc-600 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={HEADER_STYLES.mobile.link}
                >
                  {link.label}
                </Link>
              ))}

              {/* Profile Link (Mobile - if user logged in) */}
              {user && (
                <>
                  <div className="h-px bg-zinc-200 my-2" />
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className={`${HEADER_STYLES.mobile.link} gap-3`}
                  >
                    <Settings className="h-4 w-4 text-zinc-600" />
                    <span>Manage Profile</span>
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Auth Button */}
            <div className="pt-3 mt-2 border-t border-zinc-200">
              {user ? (
                <Button
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-250 py-2.5"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-semibold">Log out</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full shadow-md hover:shadow-lg transition-all duration-250 py-2.5 font-semibold"
                  asChild
                >
                  <Link href="/sign-in" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
