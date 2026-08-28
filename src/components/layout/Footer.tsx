"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mist-12 px-8 md:px-16 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-xl text-ghost">MD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
        </div>

        {/* Center */}
        <p className="section-num text-center">
          © {year} Malshan Dissanayaka — Built with Next.js & GSAP
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-mono text-xs text-mist-30 hover:text-ghost transition-colors duration-300"
          style={{ letterSpacing: "0.2em" }}
        >
          BACK TO TOP
          <span className="rotate-90 group-hover:-translate-y-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </footer>
  );
}
