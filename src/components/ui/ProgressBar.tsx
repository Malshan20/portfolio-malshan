"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current!;
    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / docH;
      bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={barRef} className="progress-bar" />;
}
