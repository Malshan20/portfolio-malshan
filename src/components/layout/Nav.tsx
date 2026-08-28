"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intro animation
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current!;
    if (menuOpen) {
      gsap.fromTo(
        menu,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        menu.querySelectorAll(".menu-link"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-void/80 backdrop-blur-xl border-b border-mist-12"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="font-display font-black text-2xl text-ghost group-hover:text-gradient transition-all duration-300">
            MD
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-ember group-hover:scale-125 transition-transform duration-200" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="section-num text-mist-30 hover:text-ghost transition-colors duration-200 relative group"
              style={{ letterSpacing: "0.25em" }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <a
            href="mailto:malshandissanayaka246@gmail.com"
            className="px-5 py-2 border border-mist-12 hover:border-ember text-ghost text-xs font-mono hover:text-ember transition-all duration-300"
            style={{ letterSpacing: "0.2em" }}
          >
            HIRE ME
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-px bg-ghost transition-all duration-300 ${menuOpen ? "w-8 rotate-45 translate-y-[5px]" : "w-8"}`}
          />
          <span
            className={`h-px bg-ghost transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-5"}`}
          />
          <span
            className={`h-px bg-ghost transition-all duration-300 ${menuOpen ? "w-8 -rotate-45 -translate-y-[5px]" : "w-8"}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-void z-40 flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="menu-link font-display font-black text-5xl text-ghost hover:text-gradient transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:malshandissanayaka246@gmail.com"
            className="menu-link mt-4 px-8 py-3 border border-ember text-ember font-mono text-sm"
            style={{ letterSpacing: "0.2em" }}
          >
            HIRE ME
          </a>
        </div>
      )}
    </>
  );
}
