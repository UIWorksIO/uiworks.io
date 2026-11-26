import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ITEMS = [
  "2D Screens",
  "3D Spatial",
  "Voice",
  "Touch",
  "Devices",
  "Ambient",
  "Wearables",
  "Web",
];

export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const track = root.current?.querySelector(".marquee-track");
      if (!track) return;
      const width = (track as HTMLElement).scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root },
  );

  const row = [...ITEMS, ...ITEMS];

  return (
    <div ref={root} className="relative overflow-hidden border-y border-line bg-cream-deep py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-deep to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10 px-6 will-change-transform">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
