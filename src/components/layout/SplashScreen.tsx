import { useEffect, useState } from 'react';

interface Props {
  images?: string[];
  minMs?: number;
  fadeMs?: number;
  onLoaded?: () => void;
}

const WORDMARK = Array.from('aptiveon.');

/**
 * First-paint splash. Holds for at least `minMs`, preloads any critical
 * images the home page needs above the fold in parallel, then fades over
 * `fadeMs` and unmounts itself.
 */
export default function SplashScreen({
  images = [],
  minMs = 1200,
  fadeMs = 600,
  onLoaded,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, minMs));
    const preload = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    );

    Promise.all([minDelay, ...preload]).then(() => {
      if (cancelled) return;
      setFadeOut(true);
      timeout = setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        onLoaded?.();
      }, fadeMs);
    });

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [images, minMs, fadeMs, onLoaded]);

  if (!visible) return null;

  return (
    <div
      className={`splash ${fadeOut ? 'is-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Aptiveon"
    >
      <div className="splash-stage">
        <span className="glyph splash-glyph" aria-hidden="true" />

        <div className="splash-wordmark" aria-hidden="true">
          {WORDMARK.map((ch, i) => (
            <span
              key={i}
              className="splash-ltr"
              style={{ animationDelay: `${300 + i * 60}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="splash-bar" aria-hidden="true">
          <div className="splash-bar-fill" />
        </div>

        <p className="splash-tagline">Workflow infrastructure for regulated AI</p>
      </div>
    </div>
  );
}
