import { useEffect, type RefObject } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: 'orange' | 'mute';
  seed: number;
  dx: number;
  dy: number;
}

/**
 * Full-viewport ambient particle drift used on Customers page. Particles wrap
 * at edges, jitter on a per-particle seed, and repel from the cursor.
 */
export function useAmbientParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  count = 140,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Honour reduced motion; halve density on phones.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const viewportW = window.innerWidth;
    const adjustedCount = viewportW < 480 ? Math.min(40, count) : viewportW < 768 ? Math.min(70, count) : count;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth,
      H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    for (let i = 0; i < adjustedCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.3 + 0.5,
        hue: Math.random() < 0.18 ? 'orange' : 'mute',
        seed: Math.random() * 1000,
        dx: 0,
        dy: 0,
      });
    }

    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const REPEL_R = 90;
    const REPEL_S = 28;
    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const elapsed = now - t0;
      const fade = Math.min(1, elapsed / 1400);
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx + Math.sin(now * 0.0006 + p.seed) * 0.12;
        p.y += p.vy + Math.cos(now * 0.0007 + p.seed) * 0.12;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        let rx = p.x;
        let ry = p.y;
        if (mouse.active) {
          const ddx = rx - mouse.x;
          const ddy = ry - mouse.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < REPEL_R * REPEL_R && d2 > 0.5) {
            const d = Math.sqrt(d2);
            let f = 1 - d / REPEL_R;
            f = f * f * REPEL_S;
            p.dx += (ddx / d) * f * 0.18;
            p.dy += (ddy / d) * f * 0.18;
          }
        }
        p.dx *= 0.86;
        p.dy *= 0.86;
        rx += p.dx;
        ry += p.dy;

        ctx.fillStyle =
          p.hue === 'orange' ? `rgba(255,91,31,${0.45 * fade})` : `rgba(20,20,19,${0.18 * fade})`;
        ctx.beginPath();
        ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [canvasRef, count]);
}
