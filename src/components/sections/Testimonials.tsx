"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  location: string;
  amount: string;
  category: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ogbonnaya",
    location: "United States",
    amount: "$5,000",
    category: "SaaS",
    quote:
      "Malshan is a highly skilled, dependable developer who excels at troubleshooting, resolving issues, and keeping complex due diligence processes moving with professionalism and integrity.",
  },
  {
    name: "Jeeten Bundhooa",
    location: "Ireland",
    amount: "$100",
    category: "SaaS",
    quote:
      "Malshan was great to work with, professional, responsive, and delivered everything as expected. Communication was smooth throughout the process, and I'd be happy to work together. Highly recommended!",
  },
  {
    name: "An Coppens",
    location: "Sweden",
    amount: "$1,100",
    category: "SaaS",
    quote:
      "Escrow experience was clunky at best, but the transfer and migration from the seller has been really smooth.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">05 — Testimonials</span>
        <div className="flex-1 h-line" />
      </div>

      {/* Heading */}
      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-display font-black leading-none text-ghost"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          Client<br />
          <span className="text-gradient">Voices.</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="testimonial-card group relative flex flex-col p-8 border border-mist-12"
          >
            {/* Quote mark */}
            <span
              className="font-display font-black leading-none mb-4 text-ember/30 group-hover:text-ember/60 transition-colors duration-300"
              style={{ fontSize: "3.5rem" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote */}
            <p className="text-ghost text-sm leading-relaxed mb-8 flex-1">
              {t.quote}
            </p>

            {/* Divider */}
            <div className="h-line mb-6" />

            {/* Footer: name / location / amount */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display font-bold text-ghost mb-1" style={{ fontSize: "1.05rem" }}>
                  {t.name}
                </p>
                <p className="font-mono text-xs text-mist-30" style={{ letterSpacing: "0.1em" }}>
                  {t.location}
                </p>
              </div>
              <div className="text-right">
                <span className="tag-pill inline-block mb-2">{t.category}</span>
                <p className="font-mono text-ember" style={{ fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                  {t.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
