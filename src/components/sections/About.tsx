"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2021",
    title: "The Spark",
    desc: "Fell in love with web development. Started building with React, learning the craft of turning ideas into interfaces.",
  },
  {
    year: "2022",
    title: "Full-Stack Leap",
    desc: "Mastered Node.js & backend systems. Shipped first full-stack apps, discovered the power of Supabase and serverless.",
  },
  {
    year: "2023",
    title: "AI Awakening",
    desc: "Integrated AI APIs into real products. Built 2nd Brain — an AI study assistant that sold to its first customers.",
  },
  {
    year: "2024",
    title: "SaaS Empire",
    desc: "Launched & sold 5+ SaaS products. Mastered the full cycle: idea → build → launch → sell. Travel~I hit the Play Store.",
  },
  {
    year: "2025–",
    title: "Building the Future",
    desc: "Deep AI integration, mobile-first SaaS, and creative engineering. Pushing the frontier of what's possible solo.",
  },
  {
    year: "2026",
    title: "Building the empire",
    desc: "Move forward to enterprise level AI, B2B SaaS business startups developments.",
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Content
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // Timeline items
      timelineItemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">02 — Story</span>
        <div className="flex-1 h-line" />
      </div>

      {/* Heading */}
      <div className="overflow-hidden mb-16">
        <h2
          ref={headingRef}
          className="font-display font-black leading-none text-ghost"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          Crafting tomorrow&apos;s<br />
          <span className="text-gradient">digital experiences.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: bio */}
        <div ref={contentRef}>
          <p className="text-mist-30 leading-loose mb-8" style={{ fontSize: "1.05rem" }}>
            I&apos;m Malshan Dissanayaka, a Full-Stack Developer based in Kurunegala, Sri Lanka.
            I specialize in building AI-powered SaaS products that are fast, beautiful, and
            built to scale. I turn complex ideas into elegant, production-ready applications
            — then ship them to real users.
          </p>
          <p className="text-mist-30 leading-loose mb-10" style={{ fontSize: "1.05rem" }}>
            Over the past few years, I&apos;ve built and sold multiple SaaS platforms, developed
            cross-platform mobile apps, and pushed the boundaries of what&apos;s possible with
            modern AI APIs. I work across the full stack — from pixel-perfect UI to
            intelligent backend systems.
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Node.js", "TypeScript", "Supabase", "React Native", "AI SDK", "GSAP", "Tailwind"].map(
              (tech) => (
                <span key={tech} className="tag-pill">
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right: timeline */}
        <div>
          {timeline.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => { timelineItemsRef.current[i] = el; }}
              className="flex gap-6 pb-10 last:pb-0 relative group"
            >
              {/* Line */}
              {i < timeline.length - 1 && (
                <div
                  className="absolute left-[2.75rem] top-8 bottom-0 w-px"
                  style={{ background: "rgba(240,237,232,0.06)" }}
                />
              )}

              {/* Year */}
              <div className="flex-shrink-0 w-14 pt-0.5">
                <span className="font-mono text-xs text-ember" style={{ letterSpacing: "0.1em" }}>
                  {item.year}
                </span>
              </div>

              {/* Dot */}
              <div className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full border border-mist-12 group-hover:border-ember group-hover:bg-ember transition-all duration-300" />

              {/* Content */}
              <div>
                <h3
                  className="font-display font-bold text-ghost text-lg mb-2 group-hover:text-gradient transition-all duration-300"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </h3>
                <p className="text-mist-30 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
