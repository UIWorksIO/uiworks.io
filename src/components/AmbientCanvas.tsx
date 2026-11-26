import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

/**
 * Soft interactive field — particles, links, and drifting orbs
 * inspired by Applied Compute / Oasis ambient motion.
 */
export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
    const orbs = [
      { x: 0.32, y: 0.38, r: 220, hue: 18 },
      { x: 0.68, y: 0.42, r: 180, hue: 28 },
      { x: 0.5, y: 0.62, r: 160, hue: 12 },
    ];
    let particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(Math.min(90, (w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 2.2,
        a: 0.25 + Math.random() * 0.45,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
    };

    const drawHexHint = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + Math.cos(a) * size;
        const y = cy + Math.sin(a) * size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(241,90,36,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const tick = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      // drifting soft orbs
      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(t * 0.00025 + orb.hue) * 0.04 + (mouse.x - 0.5) * 0.04) * w;
        const oy = (orb.y + Math.cos(t * 0.0003 + orb.hue) * 0.035 + (mouse.y - 0.5) * 0.04) * h;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        g.addColorStop(0, `hsla(${orb.hue}, 95%, 58%, 0.22)`);
        g.addColorStop(0.45, `hsla(${orb.hue}, 90%, 60%, 0.08)`);
        g.addColorStop(1, "hsla(20, 90%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // faint hex constellation near edges
      drawHexHint(w * 0.14, h * 0.28, 28, 0.18);
      drawHexHint(w * 0.86, h * 0.32, 34, 0.16);
      drawHexHint(w * 0.18, h * 0.72, 22, 0.12);
      drawHexHint(w * 0.82, h * 0.68, 26, 0.14);

      // particles + links
      const mx = mouse.x * w;
      const my = mouse.y * h;
      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 180) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(241,90,36,${0.16 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(241,90,36,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // framing arcs
      ctx.strokeStyle = "rgba(241,90,36,0.35)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(w * 0.12, h * 0.12);
      ctx.quadraticCurveTo(w * 0.28, h * 0.5, w * 0.42, h * 0.92);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w * 0.88, h * 0.12);
      ctx.quadraticCurveTo(w * 0.72, h * 0.5, w * 0.58, h * 0.92);
      ctx.stroke();

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
