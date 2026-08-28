"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover & Define",
    desc: "Deep dive into the problem space. User research, competitive analysis, and defining the core value proposition before writing a single line of code.",
    tools: ["Notion", "FigJam", "User Interviews"],
  },
  {
    num: "02",
    title: "Design & Architect",
    desc: "UI/UX wireframes to high-fidelity prototypes. System architecture decisions for scale — database schema, API design, AI integration strategy.",
    tools: ["Figma", "Supabase", "ERD Design"],
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Rapid development with Next.js, AI SDKs, and Supabase. Weekly releases, constant testing, and iterative improvements based on real feedback.",
    tools: ["Next.js", "Cursor AI", "Vercel", "GitHub"],
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "Production deployment with monitoring, SEO, analytics, and user acquisition. Post-launch iteration and scaling based on real metrics.",
    tools: ["Vercel", "Analytics", "Stripe", "SEO"],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">06 — Process</span>
        <div className="flex-1 h-line" />
      </div>

      {/* Heading */}
      <h2
        className="font-display font-black leading-none text-ghost mb-20"
        style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
      >
        How I<br />
        <span className="text-gradient">Work.</span>
      </h2>

      {/* Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => { stepRefs.current[i] = el; }}
            className="group p-8 border border-mist-12 hover:border-ember/40 transition-all duration-400 relative overflow-hidden"
          >
            {/* Number watermark */}
            <div
              className="absolute -top-4 -right-2 font-display font-black text-8xl leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,61,0,0.04)", letterSpacing: "-0.02em" }}
            >
              {step.num}
            </div>

            {/* Number */}
            <span className="font-mono text-ember text-xs block mb-6" style={{ letterSpacing: "0.2em" }}>
              {step.num}
            </span>

            {/* Title */}
            <h3
              className="font-display font-bold text-ghost text-xl mb-4 group-hover:text-gradient transition-all duration-300"
              style={{ letterSpacing: "-0.01em" }}
            >
              {step.title}
            </h3>

            {/* Desc */}
            <p className="text-mist-30 text-sm leading-relaxed mb-6">{step.desc}</p>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5">
              {step.tools.map((tool) => (
                <span key={tool} className="tag-pill">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
