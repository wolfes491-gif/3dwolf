import Link from "next/link";
import Image from "next/image";

const footerNav = [
  { name: "Home", href: "/" },
  { name: "Innovation & Labs", href: "/labs" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Cached so the value is stable across static prerenders.
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="relative border-t border-cyan-500/10 bg-black">
      {/* Subtle glowing seam line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/50 bg-black shadow-[0_0_12px_rgba(34,211,238,0.35)] flex-shrink-0">
              <Image
                src="/3d-wolf-logo.jpg"
                alt="3D Wolf Logo"
                fill
                className="object-cover object-[center_38%] scale-[2.15]"
              />
            </div>
            <span className="font-display font-black text-lg tracking-[0.2em] text-white uppercase group-hover:text-cyan-300 transition-colors">
              3D WOLF
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500">
            Exploring the intersection of 3D design, AI, retro gaming, photo
            restoration and self-hosting. Architecting the void.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="md:justify-self-center">
          <h2 className="font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400 mb-4">
            Navigate
          </h2>
          <ul className="space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs tracking-[0.18em] uppercase text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Signal */}
        <div className="md:justify-self-end">
          <h2 className="font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400 mb-4">
            Signal
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <a
                href="mailto:3ddirk@3dwolf.be"
                className="tracking-wide hover:text-cyan-300 transition-colors"
              >
                3ddirk@3dwolf.be
              </a>
            </li>
            <li className="text-slate-500">Social channels coming soon</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] tracking-[0.18em] uppercase text-slate-500">
            © {year} 3D WOLF // The Digital Pack
          </p>
          <p className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
            All systems nominal
          </p>
        </div>
      </div>
    </footer>
  );
}
