import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Workflow Performance card — the home hero's default right-column visual.
 * Restrained engineering aesthetic: hairline border, mono labels, single
 * accent on the most recent bar; the rest in slate. Updates every 2.2s
 * unless the user prefers reduced motion.
 */
export default function LivePerformance() {
  const reduce = usePrefersReducedMotion();
  const [bars, setBars] = useState<number[]>([35, 55, 42, 70, 60, 85, 65]);
  const [execCount, setExecCount] = useState(87041);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 55 + 28)));
      setExecCount((c) => c + Math.floor(Math.random() * 12 + 4));
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const maxBar = Math.max(...bars, 1);
  const formatK = (n: number) => `${(n / 1000).toFixed(1)}K`;

  return (
    <div className="perf-card" aria-label="Workflow performance">
      <div className="perf-head">
        <span className="perf-eyebrow">Workflow Performance · 7d</span>
        <span className="perf-trend">
          <span className="arrow" aria-hidden="true">
            ↑
          </span>{' '}
          20.2% this month
        </span>
      </div>

      <div
        className="perf-chart"
        role="img"
        aria-label="Bar chart of last 7 days"
      >
        {bars.map((h, i) => {
          const isLast = i === bars.length - 1;
          return (
            <div
              key={i}
              className={`perf-bar${isLast ? ' is-active' : ''}`}
              style={{ height: `${(h / maxBar) * 100}%` }}
            />
          );
        })}
      </div>

      <div className="perf-axis" aria-hidden="true">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="perf-stats">
        <div className="perf-stat">
          <div className="psv">{formatK(execCount)}</div>
          <div className="psl">runs / min</div>
        </div>
        <div className="perf-stat">
          <div className="psv">2.3s</div>
          <div className="psl">avg process</div>
        </div>
        <div className="perf-stat">
          <div className="psv">99.6%</div>
          <div className="psl">success rate</div>
        </div>
      </div>
    </div>
  );
}
