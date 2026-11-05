import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex-1 min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-32 text-center">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cyan-500/[0.07] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-400/90">{"// Error 404"}</p>
        <h1 className="mt-4 font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-wide uppercase select-none">
          <span className="text-white text-cyber-glow-strong">SIGNAL</span>{" "}
          <span className="inline-flex items-center text-cyan-400 font-mono font-bold drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]">{"//"}</span>{" "}
          <span className="text-white text-cyber-glow-strong">LOST</span>
        </h1>
        <p className="mt-6 max-w-md text-[13px] sm:text-sm leading-relaxed text-slate-400">
          The den you&apos;re looking for doesn&apos;t exist in this sector of
          the void. Recalibrating is usually a single click away.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/25 hover:border-cyan-400/80 bg-white/[0.04] hover:bg-cyan-950/30 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <span className="text-[11px] font-semibold tracking-[0.24em] text-slate-200 group-hover:text-white uppercase">
            RETURN TO BASE
          </span>
        </Link>
      </div>
    </main>
  );
}
