import { useEffect, type RefObject } from 'react';

interface Particle {
  kind: 'wordmark' | 'ambient';
  x: number;
  y: number;
  tx?: number;
  ty?: number;
  vx: number;
  vy: number;
  size: number;
  hue: 'orange' | 'mute';
  seed: number;
  dx: number;
  dy: number;
}

const RESOLVE_START = 1400;
const RESOLVE_END = 3600;
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 28;

/**
 * Hero canvas: random points drift through the viewport, then resolve into the
 * shape of "aptiveon." in the lower-right of the hero. Cursor repels particles
 * after the resolve has finished.
 */
export function useHeroParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  heroRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Sample wordmark "aptiveon." by rendering it offscreen.
    const buildTargets = () => {
      const off = document.createElement('canvas');
      const size = Math.min(W * 0.55, 520);
      const oh = Math.round(size * 0.22);
      off.width = size;
      off.height = oh;
      const octx = off.getContext('2d');
      if (!octx) return [] as { tx: number; ty: number }[];
      octx.fillStyle = '#000';
      octx.font = `600 ${Math.round(oh * 0.85)}px "Inter Tight", sans-serif`;
      octx.textBaseline = 'middle';
      octx.textAlign = 'center';
      octx.fillText('aptiveon.', size / 2, oh / 2);
      const img = octx.getImageData(0, 0, size, oh).data;
      const pts: { tx: number; ty: number }[] = [];
      const step = 4;
      for (let y = 0; y < oh; y += step) {
        for (let x = 0; x < size; x += step) {
          const idx = (y * size + x) * 4 + 3;
          if (img[idx] > 128) pts.push({ tx: x, ty: y });
        }
      }
      const ox = W - size - 40;
      const oy = H - oh - 100;
      return pts.map((p) => ({ tx: p.tx + ox, ty: p.ty + oy }));
    };

    let targets = buildTargets();
    const particles: Particle[] = [];
    const COUNT = Math.min(targets.length, 380);
    for (let i = 0; i < COUNT; i++) {
      const t = targets[Math.floor(Math.random() * targets.length)];
      particles.push({
        kind: 'wordmark',
        x: Math.random() * W,
        y: Math.random() * H,
        tx: t.tx,
        ty: t.ty,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.4 + 0.6,
        hue: Math.random() < 0.18 ? 'orange' : 'mute',
        seed: Math.random() * 1000,
        dx: 0,
        dy: 0,
      });
    }
    const AMBIENT = 180;
    for (let j = 0; j < AMBIENT; j++) {
      particles.push({
        kind: 'ambient',
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: Math.random() * 1.3 + 0.5,
        hue: Math.random() < 0.14 ? 'orange' : 'mute',
        seed: Math.random() * 1000,
        dx: 0,
        dy: 0,
      });
    }

    const t0 = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const frame = (now: number) => {
      const elapsed = now - t0;
      ctx.clearRect(0, 0, W, H);
      const resolveP = Math.max(0, Math.min(1, (elapsed - RESOLVE_START) / (RESOLVE_END - RESOLVE_START)));
      const eP = 1 - Math.pow(1 - resolveP, 2.5);

      for (const p of particles) {
        if (p.kind === 'ambient') {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          const ajx = Math.sin(now * 0.0006 + p.seed) * 0.25;
          const ajy = Math.cos(now * 0.0007 + p.seed) * 0.25;
          let rxA = p.x + ajx;
          let ryA = p.y + ajy;

          if (mouse.active) {
            const addx = rxA - mouse.x;
            const addy = ryA - mouse.y;
            const adist2 = addx * addx + addy * addy;
            if (adist2 < REPEL_RADIUS * REPEL_RADIUS && adist2 > 0.5) {
              const adist = Math.sqrt(adist2);
              let aforce = 1 - adist / REPEL_RADIUS;
              aforce = aforce * aforce * REPEL_STRENGTH;
              p.dx += (addx / adist) * aforce * 0.18;
              p.dy += (addy / adist) * aforce * 0.18;
            }
          }
          p.dx *= 0.86;
          p.dy *= 0.86;
          rxA += p.dx;
          ryA += p.dy;

          const aOp = Math.min(1, eP * 1.2);
          ctx.fillStyle =
            p.hue === 'orange'
              ? `rgba(255,91,31,${0.35 * aOp})`
              : `rgba(20,20,19,${0.2 * aOp})`;
          ctx.beginPath();
          ctx.arc(rxA, ryA, p.size, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        if (eP < 1 && p.tx !== undefined && p.ty !== undefined) {
          p.x += p.vx + (p.tx - p.x) * 0.0008 * eP;
          p.y += p.vy + (p.ty - p.y) * 0.0008 * eP;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        } else if (p.tx !== undefined && p.ty !== undefined) {
          const jx = Math.sin(now * 0.0008 + p.seed) * 0.6;
          const jy = Math.cos(now * 0.0009 + p.seed) * 0.6;
          p.x = p.tx + jx;
          p.y = p.ty + jy;
        }

        let rx: number, ry: number;
        if (eP > 0 && eP < 1 && p.tx !== undefined && p.ty !== undefined) {
          rx = p.x + (p.tx - p.x) * eP;
          ry = p.y + (p.ty - p.y) * eP;
        } else {
          rx = p.x;
          ry = p.y;
        }

        if (mouse.active && eP > 0.6) {
          const ddx = rx - mouse.x;
          const ddy = ry - mouse.y;
          const dist2 = ddx * ddx + ddy * ddy;
          if (dist2 < REPEL_RADIUS * REPEL_RADIUS && dist2 > 0.5) {
            const dist = Math.sqrt(dist2);
            let force = 1 - dist / REPEL_RADIUS;
            force = force * force * REPEL_STRENGTH;
            p.dx += (ddx / dist) * force * 0.18;
            p.dy += (ddy / dist) * force * 0.18;
          }
        }
        p.dx *= 0.86;
        p.dy *= 0.86;
        rx += p.dx;
        ry += p.dy;

        ctx.fillStyle =
          p.hue === 'orange'
            ? `rgba(255,91,31,${0.5 + 0.4 * eP})`
            : `rgba(20,20,19,${0.18 + 0.18 * eP})`;
        ctx.beginPath();
        ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Rebuild targets on resize (so the wordmark always lands in the right place)
    const onResize = () => {
      resize();
      targets = buildTargets();
      let i = 0;
      for (const p of particles) {
        if (p.kind === 'wordmark') {
          const t = targets[i % targets.length] ?? targets[0];
          if (t) {
            p.tx = t.tx;
            p.ty = t.ty;
          }
          i++;
        }
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, [canvasRef, heroRef]);
}
