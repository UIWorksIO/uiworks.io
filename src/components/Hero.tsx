import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WaitlistForm } from "./WaitlistForm";
import { AmbientCanvas } from "./AmbientCanvas";

gsap.registerPlugin(useGSAP);

const NAV = [
  { label: "Why", href: "#why" },
  { label: "System", href: "#system" },
  { label: "Agents", href: "#agents" },
  { label: "Surfaces", href: "#surfaces" },
  { label: "Access", href: "#access" },
];

const TITLE =
  "One system for every interaction humans have with technology.";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-nav", { y: -20, opacity: 0, duration: 0.8 })
        .from(".hero-badge", { y: 24, opacity: 0, duration: 0.55 }, "-=0.4")
        .from(
          words,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.65 }, "-=0.45")
        .from(".hero-form", { y: 28, opacity: 0, scale: 0.98, duration: 0.7 }, "-=0.4")
        .from(".hero-cta-secondary", { y: 16, opacity: 0, duration: 0.5 }, "-=0.45");
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden bg-cream">
      <AmbientCanvas />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-6 pb-10 pt-6 lg:px-8">
        <header className="hero-nav flex items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="UiWorks home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand text-brand">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M3 6.5c2-1.8 4-2.7 6-2.7s4 .9 6 2.7M4 10c1.6-1.3 3.3-2 5-2s3.4.7 5 2M5.5 13.2c1-.8 2.1-1.2 3.5-1.2s2.5.4 3.5 1.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-ink">UiWorks</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-muted transition hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#access"
            className="rounded-full border border-line bg-snow/90 px-4 py-2 text-sm font-semibold text-ink backdrop-blur transition hover:border-brand/40"
          >
            Request access
          </a>
        </header>

        <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center py-16 text-center lg:py-20">
          <p className="hero-badge mb-5 inline-flex rounded-full border border-line bg-snow/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-mist backdrop-blur">
            Headless Design System
          </p>
          <h1 className="hero-title font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.55rem]">
            {TITLE.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block will-change-transform">
                  {word}
                  {i < TITLE.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            Keep brand perfect across 2D, 3D, voice, touch, and every device surface — then ship
            experience updates without App Store waits or republishing.
          </p>
          <div className="hero-form mx-auto mt-10 w-full max-w-lg">
            <WaitlistForm id="hero-waitlist" size="large" />
          </div>
          <a
            href="#system"
            className="hero-cta-secondary mt-5 text-sm font-semibold text-ink-muted underline-offset-4 transition hover:text-brand hover:underline"
          >
            See the system in motion
          </a>
        </div>
      </div>
    </section>
  );
}
