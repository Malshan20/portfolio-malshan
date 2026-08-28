"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = loaderRef.current!;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Count up
    let c = 0;
    const interval = setInterval(() => {
      c += Math.floor(Math.random() * 12) + 3;
      if (c >= 100) {
        c = 100;
        clearInterval(interval);
      }
      setCount(c);
    }, 40);

    tl.to(el, {
      delay: 1.8,
      duration: 0,
      onStart: () => clearInterval(interval),
    })
      .to(el.querySelector(".loader-bar"), { scaleX: 1, duration: 0.5, ease: "power2.inOut" })
      .to(el, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        delay: 0.2,
      })
      .set(el, { display: "none" });

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{ zIndex: 99999 }}
      className="fixed inset-0 bg-void flex flex-col items-center justify-center"
    >
      {/* Logo mark */}
      <div className="mb-16 relative">
        <div className="text-[7rem] font-display font-black leading-none text-gradient select-none">
          M
        </div>
        <div className="absolute -bottom-2 -right-4 w-3 h-3 rounded-full bg-ember" />
      </div>

      {/* Count */}
      <span
        ref={countRef}
        className="font-mono text-sm text-mist-30 mb-8 tabular-nums"
        style={{ letterSpacing: "0.3em" }}
      >
        {String(count).padStart(3, "0")}
      </span>

      {/* Bar */}
      <div className="w-48 h-px bg-mist-12 relative overflow-hidden">
        <div
          className="loader-bar absolute inset-0 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <p
        className="mt-8 section-num"
        style={{ letterSpacing: "0.4em" }}
      >
        Initializing
      </p>
    </div>
  );
}
