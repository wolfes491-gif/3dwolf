import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact // 3D WOLF",
  description:
    "Open a channel — commissions, collaborations and lab experiments.",
};

const SOCIALS = [
  { platform: "GitHub", handle: "@your-handle" },
  { platform: "X / Twitter", handle: "@your-handle" },
  { platform: "Instagram", handle: "@your-handle" },
];

export default function Contact() {
  return (
    <main className="relative bg-black text-white">
      {/* Ambient glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-400/90">{"// Contact"}</p>
          <h1 className="mt-4 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase select-none">
            <span className="text-white text-cyber-glow">OPEN</span>{" "}
            <span className="inline-flex items-center text-cyan-400 font-mono font-bold drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">{"//"}</span>{" "}
            <span className="text-white text-cyber-glow">A CHANNEL</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-[13px] sm:text-sm text-slate-300/85 leading-relaxed">
            Commissions, collaborations or an experiment that needs a lab — the
            den door is open.
          </p>
        </div>

        {/* Channels */}
        <div className="max-w-4xl mx-auto grid gap-5 sm:grid-cols-2">
          {/* Email */}
          <article className="group rounded-2xl border border-white/[0.08] bg-[#16181e]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
            <h2 className="font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400">
              Direct Line
            </h2>
            <a
              href="mailto:hello@3dwolf.example"
              className="mt-4 inline-block font-mono text-sm sm:text-base text-cyan-300 hover:text-white transition-colors break-all"
            >
              hello@3dwolf.example
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
              Commissions, collaborations and lab experiments. Email works best
              — include scope, timeline and budget.
            </p>
          </article>

          {/* Socials */}
          <article className="group rounded-2xl border border-white/[0.08] bg-[#16181e]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
            <h2 className="font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-3">
              {SOCIALS.map((social) => (
                <li
                  key={social.platform}
                  className="flex items-center justify-between gap-3 text-[13px] text-slate-300"
                >
                  <span>{social.platform}</span>
                  <span className="font-mono text-xs text-slate-500">
                    {social.handle}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600">
          Social handles are placeholders — replace in app/contact/page.tsx
        </p>
      </section>
    </main>
  );
}
