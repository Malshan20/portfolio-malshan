"use client";

const items = [
  "React", "★", "Next.js", "★", "Node.js", "★", "AI Integration", "★",
  "Supabase", "★", "React Native", "★", "TypeScript", "★", "GSAP", "★",
  "Framer Motion", "★", "Tailwind CSS", "★", "AI SDK", "★", "Groq API", "★",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-5 overflow-hidden border-y border-mist-12 bg-void/50 backdrop-blur-sm">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`px-6 font-mono text-xs ${
              item === "★"
                ? "text-ember"
                : "text-mist-30"
            }`}
            style={{ letterSpacing: "0.2em" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
