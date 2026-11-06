import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function VisualFallback() {
  return <div className="hero-visual-glow" aria-hidden />;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="hero-visual relative mx-auto aspect-[5/4] w-full max-w-[640px]"
      role="img"
      aria-label="A rotating constellation representing the Headless Design System's core, connected to every interaction surface: 2D, 3D, voice, touch, devices, and ambient interfaces"
    >
      <SceneErrorBoundary fallback={<VisualFallback />}>
        <Suspense fallback={<VisualFallback />}>
          <HeroScene reducedMotion={reducedMotion} />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
