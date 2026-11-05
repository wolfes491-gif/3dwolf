import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Innovation & Labs // 3D WOLF",
  description:
    "Active experiments at the intersection of 3D design, AI, retro gaming and self-hosting. Architecting the void.",
};

interface Lab {
  code: string;
  name: string;
  status: "active" | "beta" | "archived";
  blurb: string;
  tags: string[];
}

const LABS: Lab[] = [
  {
    code: "LAB-01",
    name: "Neural Photo Restoration",
    status: "active",
    blurb:
      "Rebuilding degraded film scans and old family photos with AI pipelines — grain removal, color recovery and detail reconstruction without erasing the original character.",
    tags: ["AI", "Imaging"],
  },
  {
    code: "LAB-02",
    name: "Procedural Wolf",
    status: "beta",
    blurb:
      "Generative experiments in procedural 3D sculpture — parametric topology, wireframe aesthetics and low-poly silhouettes exported to GLTF / USDZ.",
    tags: ["3D Design", "Generative"],
  },
  {
    code: "LAB-03",
    name: "Retro Emulation Den",
    status: "active",
    blurb:
      "A self-hosted retro gaming stack with CRT shader pipelines, save states and a curated library — the den where old machines keep howling.",
    tags: ["Self-Hosting", "Retro Gaming"],
  },
  {
    code: "LAB-04",
    name: "Void Infrastructure",
    status: "active",
    blurb:
      "Homelab experiments in containers, monitoring and self-hosted services. Everything runs on my own hardware — no black boxes allowed.",
    tags: ["Infra", "Self-Hosting"],
  },
  {
    code: "LAB-05",
    name: "Cyber Aesthetics Archive",
    status: "archived",
    blurb:
      "A curated reference archive of synthwave, pixel art and cyberpunk visual language that feeds the look of every project in the pack.",
    tags: ["Art", "Reference"],
  },
];

const STATUS_STYLES: Record<Lab["status"], { dot: string; label: string }> = {
  active: {
    dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]",
    label: "ACTIVE",
  },
  beta: {
    dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,1)]",
    label: "BETA",
  },
  archived: { dot: "bg-slate-500", label: "ARCHIVED" },
};

export default function Labs() {
  return (
    <main className="relative bg-black text-white">
      {/* Ambient glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-400/90">{"// Innovation & Labs"}</p>
          <h1 className="mt-4 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase select-none">
            <span className="text-white text-cyber-glow">INNOVATION</span>{" "}
            <span className="inline-flex items-center text-cyan-400 font-mono font-bold drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">{"//"}</span>{" "}
            <span className="text-white text-cyber-glow">LABS</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-[13px] sm:text-sm text-slate-300/85 leading-relaxed">
            Active experiments at the intersection of 3D design, AI, retro
            gaming and self-hosting. This is where the pack tests, breaks and
            rebuilds things.
          </p>
        </div>

        {/* Lab grid */}
        <div className="max-w-7xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab) => (
            <article
              key={lab.code}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#16181e]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500">
                  {lab.code}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] text-slate-400">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[lab.status].dot}`}
                  />
                  {STATUS_STYLES[lab.status].label}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
                {lab.name}
              </h2>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-400">
                {lab.blurb}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {lab.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-[10px] font-semibold tracking-[0.16em] uppercase text-cyan-300/80 border border-cyan-400/25 bg-cyan-950/30 rounded-full px-3 py-1"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Open slot / CTA card */}
          <article className="group relative flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-cyan-400/30 bg-white/[0.02] p-6 min-h-[220px] transition-all duration-300 hover:border-cyan-400/60">
            <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500">
              LAB-??
            </span>
            <h2 className="mt-4 font-display text-lg tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
              Your Experiment
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">
              Have an idea that belongs in the den? The next slot is open.
            </p>
            <Link
              href="/contact"
              className="mt-5 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-300 hover:text-white transition-colors"
            >
              START IT
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
