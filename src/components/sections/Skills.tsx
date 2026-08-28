"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "AI Integration & SDKs", level: 92, category: "AI" },
  { name: "Node.js / Backend", level: 90, category: "Backend" },
  { name: "Supabase / Databases", level: 88, category: "Backend" },
  { name: "Python/Fastapi", level: 80, category: "Language"},
  { name: "GSAP / Framer Motion", level: 85, category: "Animation" },
  { name: "TypeScript", level: 85, category: "Language" },
  { name: "React Native / Mobile", level: 72, category: "Mobile" },
];

const capabilities = [
  { title: "AI-Powered SaaS", desc: "Building production-grade AI applications with real-time features, voice, and intelligent automation.", icon: "◈" },
  { title: "Full-Stack Systems", desc: "End-to-end architecture from database design to API layers to polished front-end interfaces.", icon: "⬡" },
  { title: "Mobile Development", desc: "Cross-platform React Native apps shipped to the Play Store with native feel and offline capabilities.", icon: "◇" },
  { title: "Creative Frontend", desc: "Pixel-perfect UI with GSAP animations, scroll experiences, and micro-interactions that delight users.", icon: "○" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          if (!animated) {
            setAnimated(true);
            barsRef.current.forEach((bar, i) => {
              if (bar) {
                gsap.to(bar, {
                  scaleX: 1,
                  duration: 1.2,
                  ease: "power3.out",
                  delay: i * 0.08,
                });
              }
            });
          }
        },
      });

      // Card reveals
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".cap-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!.querySelector(".cap-grid"),
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animated]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">03 — Expertise</span>
        <div className="flex-1 h-line" />
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        {/* Skills bars */}
        <div>
          <h2
            className="font-display font-black text-ghost mb-12 leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Proficiency
          </h2>
          <div className="space-y-7">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ghost text-sm font-mono" style={{ letterSpacing: "0.05em" }}>
                    {skill.name}
                  </span>
                  <span className="text-ember font-mono text-xs">{skill.level}%</span>
                </div>
                <div className="h-px bg-mist-12 relative overflow-hidden">
                  <div
                    ref={(el) => { barsRef.current[i] = el; }}
                    style={{
                      height: "2px",
                      background: "linear-gradient(90deg, #FF3D00, #FF6B35)",
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                      width: `${skill.level}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h2
            className="font-display font-black text-ghost mb-12 leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            What I Build
          </h2>
          <div className="cap-grid grid grid-cols-1 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="cap-card p-6 border border-mist-12 hover:border-ember/40 transition-all duration-400 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-ember text-xl mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    {cap.icon}
                  </span>
                  <div>
                    <h3
                      className="font-display font-bold text-ghost mb-2"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-mist-30 text-sm leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
