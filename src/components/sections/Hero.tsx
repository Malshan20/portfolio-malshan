"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.1 });

    // Orb entrance
    tl.fromTo(
      orbRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
    );

    // Heading lines stagger
    tl.fromTo(
      headingRef.current!.querySelectorAll(".hero-line"),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power4.out" },
      "-=0.9"
    );

    // Sub
    tl.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Stats
    tl.fromTo(
      statsRef.current!.querySelectorAll(".stat-item"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    // Scroll indicator
    tl.fromTo(
      scrollLineRef.current,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Parallax orb on scroll
    gsap.to(orbRef.current, {
      yPercent: 30,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Mouse-tracking orb
    const hero = heroRef.current!;
    const onMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      gsap.to(orbRef.current, {
        x,
        y,
        duration: 1.5,
        ease: "power2.out",
      });
    };
    hero.addEventListener("mousemove", onMouse);
    return () => hero.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-pattern"
    >
      {/* Background orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none orb-animate"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(255,61,0,0.18) 0%, rgba(255,107,53,0.08) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 70%, rgba(0,212,255,0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* Ring decorations */}
        <div
          className="absolute inset-16 rounded-full border"
          style={{ borderColor: "rgba(255,61,0,0.07)" }}
        />
        <div
          className="absolute inset-32 rounded-full border"
          style={{ borderColor: "rgba(255,61,0,0.05)" }}
        />
        <div
          className="absolute inset-48 rounded-full border"
          style={{ borderColor: "rgba(255,61,0,0.08)" }}
        />
      </div>

      {/* Chapter label */}
      <div className="absolute top-28 left-8 md:left-16" style={{ zIndex: 2 }}>
        <p className="section-num">Chapter I — The Beginning</p>
      </div>

      {/* Content */}
      <div
        className="relative px-8 md:px-16 pt-24 pb-16 max-w-[1400px] mx-auto w-full"
        style={{ zIndex: 2 }}
      >
        {/* Main heading */}
        <div ref={headingRef} className="mb-10">
          <div className="reveal-wrapper mb-2">
            <h1
              className="hero-line font-display font-black leading-[0.9] text-ghost select-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", letterSpacing: "-0.02em" }}
            >
              MALSHAN
            </h1>
          </div>
          <div className="reveal-wrapper mb-2">
            <h1
              className="hero-line font-display font-black leading-[0.9] text-gradient select-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 7.5rem)", letterSpacing: "-0.02em" }}
            >
              DISSA-
            </h1>
          </div>
          <div className="reveal-wrapper flex items-end gap-6 flex-wrap">
            <h1
              className="hero-line font-display font-black leading-[0.9] text-ghost select-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 7.5rem)", letterSpacing: "-0.02em" }}
            >
              NAYAKA
            </h1>
            <div className="hero-line mb-3 hidden md:block">
              <div
                className="px-4 py-2 border border-mist-12 text-mist-30 font-mono text-xs"
                style={{ letterSpacing: "0.2em" }}
              >
                BASED IN KURUNEGALA, LK
              </div>
            </div>
          </div>
        </div>

        {/* Sub */}
        <div ref={subRef} className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <div className="max-w-md">
            <p
              className="text-mist-30 font-mono text-sm leading-relaxed"
              style={{ letterSpacing: "0.05em" }}
            >
              Full-Stack Developer & AI Specialist crafting the future of
              intelligent web & mobile applications. Turning complex ideas into
              sleek, production-ready SaaS products.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 flex gap-4 flex-wrap">
          <button
            onClick={() => {
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative overflow-hidden px-8 py-4 bg-ember text-ghost font-mono text-xs transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,61,0,0.4)]"
            style={{ letterSpacing: "0.2em" }}
          >
            <span className="relative z-10">VIEW MY WORK</span>
            <div className="absolute inset-0 bg-plasma translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <a
            href="mailto:malshandissanayaka246@gmail.com"
            className="px-8 py-4 border border-mist-12 text-ghost font-mono text-xs hover:border-ember hover:text-ember transition-all duration-300"
            style={{ letterSpacing: "0.2em" }}
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-16 flex gap-12 flex-wrap">
          {[
            { num: "11+", label: "Projects Shipped" },
            { num: "8+", label: "SaaS Products Sold" },
            { num: "3+", label: "Years Building" },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <div
                className="font-display font-black text-4xl md:text-5xl text-ghost leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.num}
              </div>
              <div className="section-num mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollLineRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 origin-bottom"
        style={{ zIndex: 2 }}
      >
        <p className="section-num" style={{ letterSpacing: "0.3em" }}>
          SCROLL
        </p>
        <div className="w-px h-12 bg-mist-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-ember"
            style={{
              height: "40%",
              animation: "scrollDrop 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDrop {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>

      {/* Corner decoration */}
      <div
        className="absolute bottom-10 right-8 md:right-16 hidden md:block"
        style={{ zIndex: 2 }}
      >
        <div
          className="font-mono text-[0.6rem] text-mist-30 text-right"
          style={{ letterSpacing: "0.2em" }}
        >
          <p>AI & SAAS SPECIALIST</p>
          <p>FULL-STACK DEVELOPER</p>
        </div>
      </div>
    </section>
  );
}
