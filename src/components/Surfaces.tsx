import { Monitor, Mic, Box, Watch, Waves, type LucideIcon } from "lucide-react";

type Surface = {
  label: string;
  caption: string;
  icon: LucideIcon;
};

const SURFACES: Surface[] = [
  { label: "Screens", caption: "Web & native layouts", icon: Monitor },
  { label: "Spatial", caption: "3D & immersive scenes", icon: Box },
  { label: "Voice", caption: "Speak & listen", icon: Mic },
  { label: "Wearables", caption: "Phone, watch, headset", icon: Watch },
  { label: "Ambient", caption: "Any surface, anywhere", icon: Waves },
];

const RADIUS = 320;
const STEP = 360 / SURFACES.length;

export function Surfaces() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-ink py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(254,176,0,0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            One system, every surface
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-snow sm:text-4xl">
            Wherever people meet your product, it's the same brand.
          </h2>
          <p className="mt-4 text-lg text-mist">
            Define it once at the center. It shows up right, everywhere, automatically.
          </p>
        </div>

        <div
          className="surfaces-stage mt-16"
          role="img"
          aria-label="A rotating set of surfaces the Headless Design System reaches: screens, spatial scenes, voice, wearables, and ambient interfaces"
        >
          <div className="surfaces-ring" aria-hidden>
            {SURFACES.map((surface, i) => {
              const Icon = surface.icon;
              return (
                <div
                  key={surface.label}
                  className="surfaces-card"
                  style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)` }}
                >
                  <div className="surfaces-card-icon">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="font-display text-base font-bold text-snow">{surface.label}</p>
                  <p className="text-sm text-mist">{surface.caption}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
