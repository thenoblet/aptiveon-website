import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface TraceRow {
  id: number;
  time: string;
  tag: string;
  msg: string;
  dur: string;
}

const TEMPLATES: Array<{ tag: string; msg: string; dur: string }> = [
  { tag: 'trace.start', msg: 'flow_id=onb_a12f · tenant=meridian', dur: '' },
  { tag: 'webhook.in', msg: 'POST /trigger/customer.created · 202', dur: '12ms' },
  { tag: 'validate', msg: 'schema=v2.1 · 14 fields · pass', dur: '3ms' },
  { tag: 'enrich', msg: 'clearbit.lookup → ok · cache hit', dur: '44ms' },
  { tag: 'ai.classify', msg: 'intent=premium · conf=0.94', dur: '128ms' },
  { tag: 'provision', msg: 'tenant.create · region=us-east-2', dur: '52ms' },
  { tag: 'crm.sync', msg: 'salesforce.upsert · acct_id=001D9', dur: '89ms' },
  { tag: 'notify', msg: 'slack.#sales → message sent', dur: '21ms' },
  { tag: 'audit.log', msg: 'event_id=ev_77a3c · stored', dur: '4ms' },
  { tag: 'trace.end', msg: 'total=353ms · success', dur: '' },
  { tag: 'webhook.in', msg: 'POST /trigger/payment.failed · 202', dur: '8ms' },
  { tag: 'retry.queue', msg: 'attempt=2 of 5 · backoff=400ms', dur: '11ms' },
  { tag: 'stripe.api', msg: 'charge.retry → success', dur: '212ms' },
  { tag: 'crm.sync', msg: 'hubspot.deal.update · stage=closed', dur: '67ms' },
];

function formatTime(d: Date) {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
}

/**
 * Live workflow trace card — the right-column visual in the home hero.
 * Streams a new row every 1.1s; freezes for users with reduced-motion.
 */
export default function LiveTrace() {
  const reduce = usePrefersReducedMotion();

  const [rows, setRows] = useState<TraceRow[]>(() => {
    const now = Date.now();
    return TEMPLATES.slice(0, 9).map((t, i) => ({
      id: i,
      time: formatTime(new Date(now - (9 - i) * 380)),
      ...t,
    }));
  });
  const [throughput, setThroughput] = useState(87041);

  useEffect(() => {
    if (reduce) return;
    let next = 100;
    const interval = setInterval(() => {
      const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      next += 1;
      setRows((prev) => {
        const row: TraceRow = {
          id: next,
          time: formatTime(new Date()),
          tag: tpl.tag,
          msg: tpl.msg,
          dur: tpl.dur,
        };
        return [...prev.slice(-8), row];
      });
      setThroughput((t) => t + Math.floor(Math.random() * 14 + 4));
    }, 1100);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div className="trace-card" aria-label="Live workflow trace">
      <div className="trace-head">
        <span className="tdot green" aria-hidden="true" />
        <span className="tdot" aria-hidden="true" />
        <span className="tdot" aria-hidden="true" />
        <span className="ttitle">
          <b>trace.aptiveon.com</b> / flows / live
        </span>
        <span className="tmeta">
          <b>● running</b> · 1.1s tail
        </span>
      </div>
      <div className="trace-body">
        {rows.map((r, i) => (
          <div
            className={`trace-row${i === rows.length - 1 && !reduce ? ' is-new' : ''}`}
            key={r.id}
          >
            <span className="t-time">{r.time}</span>
            <span className="t-tag">[{r.tag}]</span>
            <span className="t-msg">{r.msg}</span>
            <span className="t-dur">{r.dur}</span>
          </div>
        ))}
      </div>
      <div className="trace-foot">
        <div className="tf">
          <div className="tfv">{(throughput / 1000).toFixed(1)}K</div>
          <div className="tfl">runs / min</div>
        </div>
        <div className="tf">
          <div className="tfv">2.3s</div>
          <div className="tfl">avg process</div>
        </div>
        <div className="tf">
          <div className="tfv">99.6%</div>
          <div className="tfl">success rate</div>
        </div>
      </div>
    </div>
  );
}
