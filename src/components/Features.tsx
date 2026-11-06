import { useEffect, useRef, useState, type MouseEvent } from "react";
import { RefreshCw, Sparkles, Network, type LucideIcon } from "lucide-react";

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
    body: "Keep every human interaction on-brand: screens, spatial interfaces, voice, gesture, and whatever comes next — from a single Headless Design System.",
    icon: Sparkles,
  },
  {
    title: "Company-wide mesh",
    headline: "Connect every team to one source of truth.",
    body: "Design, product, and engineering share one living system. Change once at the center — every device and interaction updates in sync.",
    icon: Network,
  },
];

function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function handleTilt(e: MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--tilt-y", `${px * 10}deg`);
  card.style.setProperty("--tilt-x", `${py * -10}deg`);
}

function resetTilt(e: MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
}

export function Features() {
  const { ref, visible } = useInView<HTMLElement>(0.15);

  return (
    <section
      id="why"
      ref={ref}
      className="relative border-t border-white/5 bg-ink-elevated py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Why Headless Design System
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-snow sm:text-4xl">
            Consistency across every interaction. Zero republish friction.
          </h2>
          <p className="mt-4 text-lg text-mist">
            The goal: brand-perfect experiences wherever humans meet technology — and the
            freedom to update them without waiting on stores.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className={`feature-card rounded-3xl border border-white/10 bg-ink-soft/80 p-7 ${
                  visible ? "animate-fade-up" : "opacity-0"
                }`}
                style={visible ? { animationDelay: `${i * 0.12}s` } : undefined}
              >
                <div className="feature-card-icon mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {feature.title}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-snow">
                  {feature.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
