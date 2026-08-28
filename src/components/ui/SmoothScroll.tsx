"use client";
import { useEffect, ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    const init = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    init();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
