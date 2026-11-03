"use client";

import React, { useRef } from "react";
import { WolfScrollCanvas } from "@/components/WolfScrollCanvas";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative h-[450vh] w-full bg-black">
      {/* Sticky pinned full-screen viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black pt-20 pb-16">
        {/* Cinematic scroll-linked image sequence canvas animation */}
        <WolfScrollCanvas containerRef={containerRef} />

        {/* Subtle Cyan Ambient Light Glow in the center behind the headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] md:w-[700px] md:h-[450px] bg-cyan-500/[0.07] blur-[140px] rounded-full pointer-events-none z-0" />

        {/* Subtle Digital Grid lines overlay */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Main Oversized Typography */}
          <h1 className="font-display font-extrabold md:font-black tracking-tight sm:tracking-normal md:tracking-wide uppercase select-none">
            {/* Top Line: 3D WOLF // THE */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08]">
              <span className="text-white text-cyber-glow">
                3D WOLF
              </span>

              {/* Glowing Double Slash // */}
              <span className="inline-flex items-center text-cyan-400 text-cyber-glow-strong font-mono font-bold tracking-tight mx-0.5 sm:mx-1 drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">
                //
              </span>

              <span className="text-white text-cyber-glow">
                THE
              </span>
            </div>

            {/* Bottom Line: DIGITAL PACK */}
            <div className="mt-1 sm:mt-2 md:mt-3 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] text-white text-cyber-glow tracking-wider">
              DIGITAL PACK
            </div>
          </h1>

          {/* Subtitle / Editorial Manifesto */}
          <p className="mt-5 sm:mt-6 md:mt-7 max-w-xl md:max-w-2xl text-[12px] sm:text-[13px] md:text-[14px] text-slate-300/85 font-normal tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] px-2">
            Exploring the intersection of 3D design, AI, retro gaming, photo restoration,
            <span className="block mt-0.5">and self-hosting. Architecting the void.</span>
          </p>

          {/* Call to Action: Explore the Den */}
          <div className="mt-7 sm:mt-8 md:mt-9 flex justify-center">
            <a
              href="#explore"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 rounded-full border border-white/25 hover:border-cyan-400/80 bg-white/[0.04] hover:bg-cyan-950/30 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
            >
              {/* Slashed Circle / Compass Icon */}
              <span className="relative flex items-center justify-center w-4 h-4 text-cyan-400/90 group-hover:text-cyan-300 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="5.7" y1="5.7" x2="18.3" y2="18.3" />
                </svg>
              </span>

              {/* Button Text */}
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-slate-200 group-hover:text-white uppercase transition-colors">
                EXPLORE THE DEN
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Scroll / Atmosphere Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
