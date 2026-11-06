import { WaitlistForm } from "./WaitlistForm";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-grid-fade">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 45%, rgba(254,176,0,0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-6 pb-16 pt-8 lg:px-8">
        <header className="animate-fade-up flex items-center justify-between">
          <a href="/" className="group inline-flex items-center gap-2.5" aria-label="UiWorks home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-lg font-extrabold text-ink shadow-[0_0_24px_rgba(254,176,0,0.35)]">
              U
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-snow">
              UiWorks
            </span>
          </a>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-mist">
            Private beta
          </span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-8 lg:py-16">
          <div className="max-w-xl">
            <p className="animate-fade-up-delay-1 mb-5 text-sm font-medium uppercase tracking-[0.2em] text-brand">
              Headless Design System
            </p>
            <h1 className="animate-fade-up-delay-1 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-snow sm:text-5xl lg:text-[3.25rem]">
              One system.
              <span className="block text-brand"> Every interaction.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg leading-relaxed text-mist">
              Unify how people experience your brand across every modality — 2D screens,
              3D and spatial experiences, voice, touch, and any interaction with devices or
              technology — then ship changes instantly without App Store waits or republishing.
            </p>
            <ul className="animate-fade-up-delay-2 mt-6 space-y-2.5 text-[15px] text-mist">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  Cross-platform brand consistency across every human interaction — not just
                  screens.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  Bypass App Store updates — evolve experiences without republishing the app.
                </span>
              </li>
            </ul>
            <div className="animate-fade-up-delay-3 mt-10 max-w-md">
              <WaitlistForm id="hero-waitlist" size="large" />
            </div>
          </div>

          <div className="animate-fade-up-delay-2 w-full min-w-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
