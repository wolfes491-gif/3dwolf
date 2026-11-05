import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog // 3D WOLF",
  description:
    "Field notes on 3D design, AI, retro gaming, photo restoration and self-hosting.",
};

interface Post {
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

const POSTS: Post[] = [
  {
    date: "2026-10-28",
    category: "3D Design",
    title: "Architecting the Void: Notes on My First Procedural Wolf",
    excerpt:
      "How a parametric pipeline turned a blocky wireframe into a howling silhouette — and what broke along the way.",
  },
  {
    date: "2026-10-12",
    category: "AI & Imaging",
    title: "Restoring 1987: An AI Pipeline for Degraded Film Scans",
    excerpt:
      "Grain, color shift and scratches — a walk-through of the restoration stack I use on old family photos.",
  },
  {
    date: "2026-09-30",
    category: "Self-Hosting",
    title: "Building My Retro Gaming Den From Scratch",
    excerpt:
      "Containers, CRT shaders and save states: the full stack behind a self-hosted emulation library.",
  },
  {
    date: "2026-09-15",
    category: "3D Design",
    title: "Wireframe Dreams: Low-Poly Aesthetics in 2026",
    excerpt:
      "Why the low-poly look is having a moment, and how to keep it from feeling like a default.",
  },
  {
    date: "2026-08-24",
    category: "AI & Imaging",
    title: "From Film Grain to Neural Noise",
    excerpt:
      "Where generative restoration stops helping and starts hallucinating — lessons from too many test renders.",
  },
  {
    date: "2026-08-03",
    category: "Retro Gaming",
    title: "The Den's First 1,000 Hours of Retro Playthroughs",
    excerpt:
      "A retrospective on the machines that shaped my taste — and which cartridges still howl.",
  },
];

export default function Blog() {
  return (
    <main className="relative bg-black text-white">
      {/* Ambient glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-400/90">{"// The Log"}</p>
          <h1 className="mt-4 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase select-none">
            <span className="text-white text-cyber-glow">FIELD</span>{" "}
            <span className="inline-flex items-center text-cyan-400 font-mono font-bold drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">{"//"}</span>{" "}
            <span className="text-white text-cyber-glow">NOTES</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-[13px] sm:text-sm text-slate-300/85 leading-relaxed">
            Dispatches from the den — build logs, experiments and things worth
            keeping.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
            Feed under construction — entries below are placeholders
          </p>
        </div>

        {/* Post list */}
        <div className="max-w-7xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#16181e]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
            >
              <div className="flex items-center justify-between gap-3">
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] tracking-[0.16em] text-slate-500"
                >
                  {post.date}
                </time>
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-cyan-300/80 border border-cyan-400/25 bg-cyan-950/30 rounded-full px-3 py-1">
                  {post.category}
                </span>
              </div>
              <h2 className="mt-4 font-display text-base sm:text-lg leading-snug tracking-wide uppercase text-white group-hover:text-cyan-300 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-400">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
