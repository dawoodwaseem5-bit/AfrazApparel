"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Company", href: "/company" },
    { name: "Services", href: "#services" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-full mx-auto px-6 md:px-12 flex justify-between items-center min-w-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="AfrazApparel Logo" className="object-contain w-full h-full" />
          </div>
          <span className="font-playfair text-xl font-semibold tracking-wide text-black dark:text-white">
            Afraz<span className="text-accent">Apparel</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            const className = "text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors relative group";
            const content = (
              <>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </>
            );
            return isRoute ? (
              <Link key={link.name} href={link.href} className={className}>
                {content}
              </Link>
            ) : (
              <a key={link.name} href={link.href} className={className}>
                {content}
              </a>
            );
          })}
          <ThemeToggle />
          <a
            href="#contact"
            className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            aria-label="Toggle mobile menu"
            className="text-black dark:text-white hover:text-accent transition-colors p-2 -mr-2 touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#111111] border-t border-gray-100 dark:border-white/10 flex flex-col py-6 px-6 gap-6 shadow-2xl">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            const className = "text-lg font-medium text-black dark:text-gray-200 hover:text-accent transition-colors";
            return isRoute ? (
              <Link
                key={link.name}
                href={link.href}
                className={className}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={className}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
