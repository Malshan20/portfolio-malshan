"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectForm from "./ProjectForm";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

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
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".contact-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("malshandissanayaka246@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">07 — Contact</span>
        <div className="flex-1 h-line" />
      </div>

      {/* Big CTA heading */}
      <div className="overflow-hidden mb-16">
        <h2
          ref={headingRef}
          className="font-display font-black leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)", letterSpacing: "-0.03em" }}
        >
          <span className="text-ghost">Let&apos;s Build</span>
          <br />
          <span className="text-gradient">Something.</span>
        </h2>
      </div>

      <ProjectForm />

      <div className="grid md:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <p className="contact-reveal text-mist-30 leading-loose text-lg mb-10">
            Ready to bring your next idea to life? Whether it&apos;s an AI-powered SaaS,
            a mobile app, or a creative web experience — I&apos;m open to new projects
            and collaborations.
          </p>

          {/* Email */}
          <div className="contact-reveal mb-10">
            <p className="section-num mb-3">Email</p>
            <button
              onClick={copyEmail}
              className="group flex items-center gap-4 text-ghost font-mono hover:text-ember transition-colors duration-300"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", letterSpacing: "0.02em" }}
            >
              malshandissanayaka246@gmail.com
              <span
                className="text-xs px-2 py-1 border border-mist-12 group-hover:border-ember transition-all duration-200"
                style={{ letterSpacing: "0.15em" }}
              >
                {copied ? "COPIED ✓" : "COPY"}
              </span>
            </button>
          </div>

          {/* Availability */}
          <div className="contact-reveal flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-ice" style={{ boxShadow: "0 0 8px rgba(0,212,255,0.8)" }} />
            <span className="font-mono text-xs text-mist-30" style={{ letterSpacing: "0.2em" }}>
              AVAILABLE WORLDWIDE — OPEN TO NEW PROJECTS
            </span>
          </div>
        </div>

        {/* Right: links */}
        <div className="contact-reveal">
          <p className="section-num mb-8">Find me online</p>
          <div className="space-y-4">
            {[
              { label: "GitHub", url: "https://github.com/Malshan20", handle: "@Malshan20" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/maleeshamalshan", handle: "Malshan Dissanayaka" },
              { label: "Twitter / X", url: "https://x.com/Ma_malshan", handle: "@Ma_malshan" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 border border-mist-12 hover:border-ember/40 group transition-all duration-300"
              >
                <div>
                  <span className="section-num block mb-1">{link.label}</span>
                  <span className="font-mono text-sm text-ghost group-hover:text-ember transition-colors duration-200">
                    {link.handle}
                  </span>
                </div>
                <span className="text-mist-30 group-hover:text-ember group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
