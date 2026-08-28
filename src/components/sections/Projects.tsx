"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  desc: string;
  tags: string[];
  img: string;
  url?: string;
  status?: string;
  statusColor?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "CanoryAI",
    desc: "CanoryAI turns EUDR due diligence from a manual, error-prone paper chase into an automated pipeline — AI reads supplier documents, satellites verify every plot of land, and a defensible declaration is ready before your shipment reaches the border.",
    tags: ["Enterprise AI", "B2B", "Next.js", "Python/FastAPI", "Groq API", "Gemini Vision API", "Supabase", "File processing", "API development", "SEO/AEO"],
    img: "/canoryAI.png",
    url: "https://canopy-ai-xi.vercel.app/",
    status: "Live",
    statusColor: "#00D4FF",
    featured: true,
  },
  {
    title: "Telivio",
    desc: "Telivio is the AI recruiter that never skips a CV, never loses a great candidate in a pile of 400 applications, and never leaves anyone wondering if they’ll hear back.",
    tags: ["Next.js", "PDF processing", "Groq API", "Supabase", "Calendly API", "Polar.sh paymentgateway"],
    img: "/telivio.png",
    url: "https://telivio.vercel.app/",
    status: "Live",
    statusColor: "#00D4FF",
    featured: true,
  },
  {
    title: "QuillGlow",
    desc: "All-in-one AI-powered learning hub. Users can upload PDFs, images, and notes to generate structured revision notes, interactive mind maps, adaptive flashcards, mock exams, and chat with a context-aware AI Tutor grounded in their own materials.",
    tags: ["Next.js", "PDF/Image Processing", "Gemini API", "YouTube API", "Supabase",  "Polar.sh paymentgateway", "SEO/AEO" ],
    img: "/quillglow.png",
    url: "https://quillglow.com",
    status: "Sold",
    statusColor: "#FF3D00",
    featured: true,
  },
  {
    title: "2nd Brain",
    desc: "SaaS AI study assistant with voice tutor, flashcards, and exam generator. Advanced AI-powered learning platform.",
    tags: ["React", "Next.js", "AI SDK", "Supabase", "Voice API"],
    img: "/2nd-brain.png",
    url: "https://2nd-brain-lilac.vercel.app",
    status: "Sold",
    statusColor: "#FF3D00",
    featured: true,
  },
  {
    title: "Travel~I",
    desc: "Cross-platform web app for trip planning, bookings, and interactive UI/UX. Complete AI travel companion.",
    tags: ["Next.js", "Maps API", "AI SDK", "Supabase"],
    img: "/travel-i.png",
    url: "https://travel-i-tau.vercel.app/",
    status: "Sold",
    statusColor: "#FF3D00",
    featured: true,
  },
  {
    title: "Travel~I Android",
    desc: "Native Android version of Travel~I. Seamless bookings, AI itinerary planning, and offline access.",
    tags: ["React Native", "Expo", "Maps API", "AI SDK"],
    img: "/traveli-android.png",
    url: "https://play.google.com/store/apps/details?id=com.maxmalshan.traveli",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "StudyForge",
    desc: "Intelligent flashcards, adaptive quizzes, and progress tracking powered by AI.",
    tags: ["Next.js", "Groq API", "Supabase", "Stripe"],
    img: "/studyforge.png",
    url: "https://study-forge.app",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "EduQuest",
    desc: "Transform learning into interactive game adventures. AI-powered educational games for all levels.",
    tags: ["Next.js", "AI SDK", "Supabase", "Groq API"],
    img: "/e-quest.png",
    url: "https://e-quest.app",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "Fitlyra",
    desc: "AI-powered fitness app for personalized workout plans, nutrition tracking, and progress visualization.",
    tags: ["Next.js", "AI SDK", "Supabase", "Stripe"],
    img: "/fitlyra.png",
    url: "https://fitlyra.fit",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "StudyNergy",
    desc: "AI-driven gamified learning app designed to make education engaging, interactive, and competitive.",
    tags: ["Next.js", "AI SDK", "Supabase", "Groq API"],
    img: "/studynergy.png",
    url: "https://studynergy.com",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "LexAI",
    desc: "LexAI reads, summarizes, and flags risks in your legal contracts using advanced AI. Upload any document and get instant plain-English insights — no law degree required.",
    tags: ["Next.js", "AI SDK", "Supabase", "Groq API"],
    img: "/lexai.png",
    url: "https://www.lexaicontracts.com",
    status: "Sold",
    statusColor: "#FF3D00",
  },
  {
    title: "Nixio",
    desc: "Nixio validates your idea, designs a robust product architecture, crafts compelling content, and delivers a sell-ready PDF — all powered by live market intelligence from Whop.",
    tags: ["Next.js", "AI SDK", "Supabase", "Groq API", "Polar payments"],
    img: "/nixio.png",
    url: "https://www.nixiolabs.com/",
    status: "For Sale",
    statusColor: "#FFB347",
    featured: true,
  },
];

export default function Projects() {
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
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-num">04 — Work</span>
        <div className="flex-1 h-line" />
      </div>

      {/* Heading */}
      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-display font-black leading-none text-ghost"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          Selected<br />
          <span className="text-gradient">Projects.</span>
        </h2>
      </div>

      {/* Featured: large 2-col */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            size="large"
            innerRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* Rest: 3-col */}
      <div className="grid md:grid-cols-3 gap-6">
        {rest.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            size="small"
            innerRef={(el) => { cardRefs.current[featured.length + i] = el; }}
          />
        ))}
      </div>

      {/* More work link */}
      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/Malshan20?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 font-mono text-xs text-mist-30 hover:text-ghost transition-colors duration-300"
          style={{ letterSpacing: "0.2em" }}
        >
          VIEW ALL ON GITHUB
          <span className="w-8 h-px bg-mist-30 group-hover:w-16 group-hover:bg-ember transition-all duration-300" />
        </a>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  size,
  innerRef,
}: {
  project: Project;
  size: "large" | "small";
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={innerRef}
      className="project-card group cursor-none"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-mist ${size === "large" ? "h-72 md:h-80" : "h-52"}`}
        >
          <div className="card-img absolute inset-0">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Dark overlay always */}
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
          {/* Hover overlay */}
          <div
            className="card-overlay absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(2,2,5,0.7)" }}
          >
            <span
              className="font-mono text-xs text-ghost border border-ghost px-4 py-2"
              style={{ letterSpacing: "0.2em" }}
            >
              VIEW PROJECT ↗
            </span>
          </div>
          {/* Status */}
          <div className="absolute top-4 left-4">
            <span
              className="font-mono text-xs px-3 py-1"
              style={{
                letterSpacing: "0.15em",
                color: project.statusColor,
                border: `1px solid ${project.statusColor}40`,
                background: `${project.statusColor}10`,
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-display font-bold text-ghost mb-2 group-hover:text-gradient transition-all duration-300"
            style={{
              fontSize: size === "large" ? "1.4rem" : "1.1rem",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>
          <p className="text-mist-30 text-sm leading-relaxed mb-4">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
