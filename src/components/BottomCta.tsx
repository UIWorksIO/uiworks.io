import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WaitlistForm } from "./WaitlistForm";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function BottomCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".cta-panel > *", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section id="access" ref={root} className="relative border-t border-line bg-cream-deep py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="cta-panel overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgba(20,20,20,0.45)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-soft">
            Limited early access
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-snow sm:text-4xl">
            Get early access to the Headless Design System.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/65">
            Unify brand across every interaction — 2D, 3D, voice, and beyond — and ship updates
            without App Store friction.
          </p>
          <div className="mx-auto mt-10 max-w-md text-left">
            <WaitlistForm id="bottom-waitlist" size="large" variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
