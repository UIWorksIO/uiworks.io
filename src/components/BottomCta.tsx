import { WaitlistForm } from "./WaitlistForm";

export function BottomCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(254,176,0,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Limited early access
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-snow sm:text-4xl">
          Get early access to the Headless Design System.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-mist">
          Unify brand across every interaction — 2D, 3D, voice, and beyond — and ship
          updates without App Store friction.
        </p>
        <div className="mx-auto mt-10 max-w-md text-left">
          <WaitlistForm id="bottom-waitlist" size="large" />
        </div>
      </div>
    </section>
  );
}
