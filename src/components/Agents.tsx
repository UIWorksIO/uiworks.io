import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Blocks,
  Library,
  LayoutTemplate,
  AppWindow,
  ShieldCheck,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AgentCapability = {
  title: string;
  body: string;
  icon: LucideIcon;
};

/**
 * Maps to CopilotKit-style agent UI patterns without naming
 * A2UI / MCP / schema mechanics in marketing copy.
 */
const CAPABILITIES: AgentCapability[] = [
  {
    title: "Generative UI",
    body: "Agents render your typed, approved components — cards, forms, charts — never freeform layouts that break brand.",
    icon: Blocks,
  },
  {
    title: "Open-ended composition",
    body: "Agents can assemble UI from any component library you allow — still constrained to one Headless Design System.",
    icon: Library,
  },
  {
    title: "Catalog-driven UI",
    body: "Agents only compose from your own component catalog. Every generative screen stays native, consistent, and shippable.",
    icon: LayoutTemplate,
  },
  {
    title: "Tooling surfaces",
    body: "When tools and services bring their own UI into the experience, they still resolve through the same brand system.",
    icon: AppWindow,
  },
  {
    title: "Human in the loop",
    body: "Approval cards, confirmations, and review steps appear inline — same language, same interaction quality.",
    icon: ShieldCheck,
  },
  {
    title: "Frontend actions",
    body: "Agents take real actions in your app through governed UI — navigate, update, confirm — without leaving brand.",
    icon: MousePointerClick,
  },
];

export function Agents() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".agents-intro > *", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".agent-card", {
        scrollTrigger: { trigger: ".agents-grid", start: "top 82%" },
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section
      id="agents"
      ref={root}
      className="relative border-t border-line bg-cream-deep py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="agents-intro max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Agent interaction layer
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Same headless UI — across every way agents meet your users.
          </h2>
          <p className="mt-4 text-lg text-mist">
            Whether an agent generates screens, asks for approval, or acts inside your product,
            UiWorks keeps every interaction on one governed design system. Brand stays perfect.
            Agents stay powerful.
          </p>
        </div>

        <div className="agents-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="agent-card feature-tile rounded-3xl border border-line bg-cream p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-wash text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
