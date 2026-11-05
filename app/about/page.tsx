import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About // 3D WOLF",
  description:
    "The person behind the pack — 3D design, AI experiments, retro gaming, photo restoration and self-hosting.",
};

const FOCUS_AREAS = [
  {
    name: "3D Design & Sculpting",
    note: "Procedural models, low-poly aesthetics and GLTF / USDZ pipelines.",
  },
  {
    name: "AI Experiments",
    note: "Generative and restorative AI pushed past the demo stage.",
  },
  {
    name: "Retro Gaming",
    note: "Emulation stacks, CRT shaders and deep playthroughs.",
  },
  {
    name: "Photo Restoration",
    note: "Bringing degraded film scans back to life without erasing their history.",
  },
  {
    name: "Self-Hosting",
    note: "Own hardware, own data. Everything runs in the den.",
  },
];

export default function About() {
  return (
    <main className="relative bg-black text-white">
      {/* Ambient glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-400/90">{"// About"}</p>
          <h1 className="mt-4 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase select-none">
            <span className="text-white text-cyber-glow">BEHIND</span>{" "}
            <span className="inline-flex items-center text-cyan-400 font-mono font-bold drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">{"//"}</span>{" "}
            <span className="text-white text-cyber-glow">THE PACK</span>
          </h1>
        </div>

        {/* Bio */}
        <div className="max-w-2xl mx-auto space-y-5 text-sm sm:text-[15px] leading-relaxed text-slate-300/90">
          <p>
            3D WOLF is the studio den of a creative technologist working at the
            edge where 3D design, AI and old-school computing collide. What
            started as late-night sculpting sessions turned into a full pack:
            pipelines that restore forgotten photos, machines that keep retro
            consoles howling, and infrastructure that runs entirely on its own
            hardware.
          </p>
          <p>
            The work shares one obsession — building things that feel alive.
            Whether it&apos;s a procedural wolf carving out a silhouette or an
            AI pipeline coaxing color back onto a 40-year-old film scan, the
            goal is always the same: architecture with a pulse, inside the void.
          </p>
        </div>

        {/* Focus areas */}
        <div className="max-w-5xl mx-auto mt-14 sm:mt-20">
          <h2 className="mb-6 text-center font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400">
            Focus Areas
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area) => (
              <article
                key={area.name}
                className="group rounded-2xl border border-white/[0.08] bg-[#16181e]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
              >
                <h3 className="font-display text-base tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
                  {area.name}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">
                  {area.note}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-xl mx-auto mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/labs"
            className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/25 hover:border-cyan-400/80 bg-white/[0.04] hover:bg-cyan-950/30 transition-all duration-300 text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-200 hover:text-white"
          >
            SEE WHAT THE LAB IS RUNNING
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-2.5 rounded-full border border-cyan-400/50 bg-cyan-950/40 hover:bg-cyan-950/60 transition-all duration-300 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-300 hover:text-white"
          >
            START A CONVERSATION
          </Link>
        </div>
      </section>
    </main>
  );
}
