"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Innovation & Labs", href: "/labs" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/60 border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-cyan-400/50 bg-black shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.75)] group-hover:border-cyan-300 transition-all duration-300 flex-shrink-0">
            <Image
              src="/3d-wolf-logo.jpg"
              alt="3D Wolf Logo"
              fill
              className="object-cover object-[center_38%] scale-[2.15] transition-transform duration-300 group-hover:scale-[2.25]"
              priority
            />
          </div>
          <span className="font-display font-black text-lg md:text-xl tracking-[0.2em] text-white uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] group-hover:text-cyan-300 transition-colors">
            3D WOLF
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-xs lg:text-[13px] font-normal transition-colors duration-200 py-1.5 ${
                isActive(item.href)
                  ? "text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className={isActive(item.href) ? "border-b border-cyan-400 pb-0.5" : ""}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Hire Me CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-cyan-300 transition-colors duration-200"
          >
            HIRE ME
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6 stroke-current transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-500/20 bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-widest uppercase py-2 transition-colors flex items-center justify-between ${
                  isActive(item.href)
                    ? "text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-3"
                    : "text-slate-300 hover:text-white pl-3"
                }`}
              >
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,1)]" />
                )}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center text-xs font-semibold tracking-[0.2em] uppercase text-cyan-300 py-3 rounded-full border border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              HIRE ME
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
