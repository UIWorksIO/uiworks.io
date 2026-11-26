import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Monitor, Mic, Box, Watch, Waves, Hand, type LucideIcon } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Surface = {
  label: string;
  caption: string;
  icon: LucideIcon;
};

const SURFACES: Surface[] = [
  { label: "2D Screens", caption: "Web & native layouts", icon: Monitor },
  { label: "3D Spatial", caption: "Immersive scenes", icon: Box },
  { label: "Voice", caption: "Speak & listen", icon: Mic },
  { label: "Touch", caption: "Gesture & haptics", icon: Hand },
  { label: "Devices", caption: "Phone, watch, headset", icon: Watch },
  { label: "Ambient", caption: "Any interface", icon: Waves },
];

export function Surfaces() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".surfaces-intro > *", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".modality-card", {
        scrollTrigger: { trigger: ".surfaces-grid", start: "top 82%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section id="surfaces" ref={root} className="relative border-t border-line bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="surfaces-intro mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            One system, every surface
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Wherever people meet your product, it&apos;s the same brand.
          </h2>
          <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-muted">
            “There should be as many interaction surfaces as there are moments of intent — unified
            by one system.”
          </p>
        </div>

        <div className="surfaces-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map((surface) => {
            const Icon = surface.icon;
            return (
              <article
                key={surface.label}
                className="modality-card rounded-3xl border border-line bg-snow p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-wash text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{surface.label}</h3>
                <p className="mt-1 text-sm text-mist">{surface.caption}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
