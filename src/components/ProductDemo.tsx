import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NODES = ["2D", "3D", "Voice", "Touch", "Devices", "Ambient"];

/**
 * Scroll-scrubbed product stage — Applied Compute style pinned demo.
 */
export function ProductDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(".demo-shell", { y: 40, opacity: 0.4, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1 })
        .fromTo(".demo-hub", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0.15)
        .fromTo(
          ".demo-node",
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.7 },
          0.35,
        )
        .fromTo(
          ".demo-link",
          { strokeDashoffset: 120 },
          { strokeDashoffset: 0, stagger: 0.06, duration: 0.8 },
          0.4,
        )
        .fromTo(".demo-packet", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.7)
        .to(".demo-packet", { offsetDistance: "100%", stagger: 0.1, duration: 1.2, ease: "none" }, 0.75)
        .fromTo(
          ".demo-status",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          1.4,
        )
        .to(".demo-pulse", { scale: 1.35, opacity: 0, duration: 0.8, repeat: 1 }, 1.5);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-cream">
      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Live system</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Change once. Every interaction updates.
          </h2>
          <p className="mt-4 text-lg text-mist">
            Scroll to watch the Headless Design System push brand-perfect updates across every
            modality — without republishing the app.
          </p>
        </div>

        <div className="demo-shell relative overflow-hidden rounded-[1.75rem] border border-line bg-snow shadow-[0_40px_80px_-48px_rgba(20,20,20,0.35)]">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs font-medium text-mist">uiworks · design system</span>
            <span className="demo-status ml-auto rounded-full bg-brand-wash px-2.5 py-1 text-[11px] font-semibold text-brand">
              Sync live
            </span>
          </div>

          <div className="relative grid min-h-[420px] place-items-center px-4 py-10 sm:min-h-[480px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 640 420"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              {NODES.map((_, i) => {
                const a = ((i / NODES.length) * Math.PI * 2) - Math.PI / 2;
                const x = 320 + Math.cos(a) * 150;
                const y = 210 + Math.sin(a) * 120;
                return (
                  <g key={i}>
                    <path
                      className="demo-link"
                      d={`M320 210 L${x} ${y}`}
                      stroke="#f15a24"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="120"
                      strokeDashoffset="120"
                    />
                    <circle
                      className="demo-packet"
                      r="3.5"
                      fill="#f15a24"
                      style={{ offsetPath: `path('M320 210 L${x} ${y}')`, offsetDistance: "0%" }}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="demo-hub relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-brand bg-cream text-center shadow-[0_0_0_10px_rgba(241,90,36,0.08)]">
              <span className="demo-pulse absolute inset-0 rounded-full border border-brand/40" />
              <span className="text-[11px] font-bold leading-tight text-ink">
                Headless
                <br />
                Design System
              </span>
            </div>

            {NODES.map((label, i) => {
              const a = ((i / NODES.length) * Math.PI * 2) - Math.PI / 2;
              const x = Math.cos(a) * 42;
              const y = Math.sin(a) * 34;
              return (
                <div
                  key={label}
                  className="demo-node absolute z-10 rounded-full border border-line bg-snow px-3 py-1.5 text-xs font-semibold text-ink shadow-sm"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
