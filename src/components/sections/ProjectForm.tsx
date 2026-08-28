"use client";
import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full bg-transparent border-b border-mist-12 focus:border-ember outline-none py-3 font-mono text-sm text-ghost placeholder:text-mist-30 transition-colors duration-300";

const labelClasses = "section-num mb-2 block";

export default function ProjectForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="contact-reveal border border-mist-12 p-8 md:p-12 mb-20">
      <p className="section-num mb-3">Start a project</p>
      <h3
        className="font-display font-bold mb-8"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
      >
        Tell me about it.
      </h3>

      {status === "success" ? (
        <div className="py-6">
          <p className="text-ghost font-mono text-sm mb-1">Message sent ✓</p>
          <p className="text-mist-30 text-sm">
            Thanks for reaching out — I&apos;ll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot field — hidden from real users, catches bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="company" className={labelClasses}>
                Company (optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company or team name"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="projectType" className={labelClasses}>
                Project type
              </label>
              <select
                id="projectType"
                name="projectType"
                defaultValue=""
                className={`${inputClasses} appearance-none`}
              >
                <option value="" disabled className="bg-void">
                  Select one
                </option>
                <option value="AI / SaaS product" className="bg-void">
                  AI / SaaS product
                </option>
                <option value="Web app" className="bg-void">
                  Web app
                </option>
                <option value="Mobile app" className="bg-void">
                  Mobile app
                </option>
                <option value="Automation / integration" className="bg-void">
                  Automation / integration
                </option>
                <option value="Full-time / contract role" className="bg-void">
                  Full-time / contract role
                </option>
                <option value="Other" className="bg-void">
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="projectName" className={labelClasses}>
                Project name *
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                required
                placeholder="What's it called?"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="budget" className={labelClasses}>
                Budget (optional)
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue=""
                className={`${inputClasses} appearance-none`}
              >
                <option value="" className="bg-void">
                  Prefer not to say
                </option>
                <option value="< $500" className="bg-void">
                  Under $500
                </option>
                <option value="$500 - $2,000" className="bg-void">
                  $500 – $2,000
                </option>
                <option value="$2,000 - $5,000" className="bg-void">
                  $2,000 – $5,000
                </option>
                <option value="$5,000 - $15,000" className="bg-void">
                  $5,000 – $15,000
                </option>
                <option value="$15,000+" className="bg-void">
                  $15,000+
                </option>
                <option value="Not sure yet" className="bg-void">
                  Not sure yet
                </option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="timeline" className={labelClasses}>
              Timeline (optional)
            </label>
            <input
              id="timeline"
              name="timeline"
              type="text"
              placeholder="e.g. ASAP, within a month, flexible"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="details" className={labelClasses}>
              Brief *
            </label>
            <textarea
              id="details"
              name="details"
              required
              rows={5}
              placeholder="What are you building, and what do you need help with?"
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-8 py-3 bg-ember hover:bg-plasma text-void font-mono text-xs font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ letterSpacing: "0.2em" }}
            >
              {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
            </button>
            {status === "error" && (
              <p className="text-ember font-mono text-xs">{errorMsg}</p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
