import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RefreshCw, Sparkles, Network, type LucideIcon } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Feature = {
  title: string;
  headline: string;
  body: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Bypass republishing",
    headline: "Evolve experiences without store waits.",
    body: "Ship interaction updates the moment they're ready — no rebuild, no review queue, no forced app republish.",
    icon: RefreshCw,
  },
  {
    title: "Every modality",
    headline: "2D, 3D, voice, touch — one brand.",
    body: "Keep every human interaction on-brand: screens, spatial interfaces, voice, gesture, and whatever comes next.",
    icon: Sparkles,
  },
  {
    title: "Agent-ready",
    headline: "Governed UI for every agent surface.",
    body: "Generative screens, approvals, and in-app actions all resolve through the same Headless Design System — powerful agents, brand-safe output.",
    icon: Network,
  },
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".feature-intro > *", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".feature-tile", {
        scrollTrigger: { trigger: ".feature-grid", start: "top 80%" },
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section
      id="why"
      ref={root}
      className="relative border-t border-line bg-cream-deep py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="feature-intro max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Why Headless Design System
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Consistency across every interaction. Zero republish friction.
          </h2>
          <p className="mt-4 text-lg text-mist">
            The goal: brand-perfect experiences wherever humans meet technology — and the freedom
            to update them without waiting on stores.
          </p>
        </div>

        <div className="feature-grid mt-14 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="feature-tile rounded-3xl border border-line bg-cream p-7"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-wash text-brand">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {feature.title}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{feature.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
