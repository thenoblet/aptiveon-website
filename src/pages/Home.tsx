import { useEffect, useRef, useState, type ComponentType } from 'react';
import LivePerformance from '@/components/ui/LivePerformance';
import Marquee from '@/components/ui/Marquee';
import Sparkbar from '@/components/ui/Sparkbar';
import { useHeroParticles } from '@/hooks/useHeroParticles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Home() {
  return (
    <>
      <Hero />
      <BandMarquee />
      <PlatformPulse />
      <GroundFloor />
      <Impact />
      <Architecture />
      <Showcase />
      <Integrations />
      <LiveFeed />
      <Testimonials />
      <InProduction />
      <BrandMoment />
      <HomeCta />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useHeroParticles(canvasRef, heroRef);

  return (
    <section ref={heroRef} className="home-hero" id="top">
      <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
      <div className="wrap home-hero-grid">
        <div>
          <span className="hero-badge">
            <span className="pulse" aria-hidden="true" />
            Now with AI-powered automation
          </span>
          <h1 className="hero-title">
            Build systems that
            <br />
            <em>actually run.</em>
          </h1>
          <p className="hero-desc">
            Aptiveon helps teams design, automate, and scale intelligent
            workflows that adapt, learn, and deliver real business impact.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn btn-primary">
              Talk to sales <span className="arr">→</span>
            </a>
            <a href="#showcase" className="btn btn-ghost">
              ▸ See it in action
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <LivePerformance />
        </div>
      </div>
    </section>
  );
}

/* ─── BAND MARQUEE ─────────────────────────────────────────── */
const BAND_ITEMS = [
  'Workflow Automation',
  'AI Knowledge Systems',
  'Real-time Processing',
  'Enterprise Security',
  'Multi-Cloud Deploy',
  'SOC Automation',
  'Applied Systems',
  'Neural Networks',
  'Data Pipelines',
];
function BandMarquee() {
  return <Marquee items={BAND_ITEMS} variant="band" />;
}

/* ─── PLATFORM PULSE ───────────────────────────────────────── */
const PULSE_METRICS = [
  { value: '87.4', suffix: 'K', label: 'Events / day', sub: '↑ 12% this week', up: true, accent: true },
  { value: '7,348', suffix: '', label: 'Workflows automated', sub: '↑ 480 this week', up: true, accent: false },
  { value: '99.9', suffix: '%', label: 'Platform uptime', sub: 'Enterprise SLA', up: false, accent: false },
  { value: '1.9', suffix: 'ms', label: 'Median latency', sub: 'p99 < 8ms', up: false, accent: false },
];

function PlatformPulse() {
  const reduce = usePrefersReducedMotion();
  const [sparks, setSparks] = useState<number[][]>(() =>
    PULSE_METRICS.map((_, mi) =>
      Array.from(
        { length: 16 },
        (_, i) => 50 + Math.sin(i * 0.7 + mi) * 18 + Math.random() * 10,
      ),
    ),
  );
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setSparks((prev) => prev.map((s) => [...s.slice(1), 50 + Math.random() * 30]));
    }, 1800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="platform-pulse" id="pulse">
      <div className="wrap">
        <div className="pulse-head">
          <div className="live">
            <span className="dot" aria-hidden="true" />
            Platform Pulse — live
          </div>
          <div className="note">last refresh · just now</div>
        </div>
        <div className="pulse-row">
          {PULSE_METRICS.map((m, i) => (
            <div key={m.label} className="pulse-cell">
              <div className="pv">
                <span>{m.value}</span>
                <span className="suffix">{m.suffix}</span>
              </div>
              <div className="pl">{m.label}</div>
              <div className="ps">
                <span className={m.up ? 'up' : ''}>{m.sub}</span>
              </div>
              <div
                className="pulse-spark"
                style={{ color: m.accent ? 'var(--accent)' : 'var(--ink-4)' }}
              >
                <Sparkbar values={sparks[i] ?? []} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GROUND FLOOR ────────────────────────────────────────── */
interface Pillar {
  tag: string;
  title: string;
  desc: string;
  inputs: string[];
  outputs: string[];
  stat: string;
}
const PILLARS: Pillar[] = [
  {
    tag: 'Workflow Systems',
    title: 'The connecting layer',
    desc: 'Practical systems that link data, workflows, users, and business operations into one coherent engine.',
    inputs: ['Documents', 'Databases', 'APIs', 'Operator actions'],
    outputs: ['Automated pipelines', 'Audit trails', 'Live dashboards'],
    stat: '14,000+ workflows automated',
  },
  {
    tag: 'AI Integration',
    title: 'Intelligence that ships',
    desc: 'AI that runs on your real data and real processes — not sandboxes. Even AI work is 70% plumbing. We do both.',
    inputs: ['Unstructured data', 'User queries', 'Business rules'],
    outputs: ['Classifications', 'Recommendations', 'Generated reports'],
    stat: '99.4% cited-answer accuracy',
  },
  {
    tag: 'Internal Tools',
    title: 'Replace the spreadsheet',
    desc: 'Build the internal tool your team actually needs. Fast to ship, reliable in production, easy to maintain.',
    inputs: ['Raw data', 'Team workflows', 'Legacy processes'],
    outputs: ['Custom dashboards', 'Approval flows', 'Reporting systems'],
    stat: '86% analyst-hours saved',
  },
];

function GroundFloor() {
  return (
    <section className="ground-floor section" id="solutions">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                What we build
              </span>
            </div>
            <h2>
              The ground floor.
              <br />
              <em>Everything runs on it.</em>
            </h2>
          </div>
          <p>
            Most engagements start here — practical software systems that
            connect data, workflows, and people. Even the best AI layer needs
            solid plumbing underneath.
          </p>
        </div>

        <div className="gf-rows">
          {PILLARS.map((p, i) => (
            <div key={p.tag} className="gf-row">
              <div className="gf-num">0{i + 1} / 03</div>
              <div className="gf-text">
                <div className="gf-tag">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="chip chip-lg chip-accent">{p.stat}</span>
              </div>
              <div className="gf-io">
                <div className="gf-io-block">
                  <div className="gf-io-label">Inputs</div>
                  <div className="gf-chips">
                    {p.inputs.map((c) => (
                      <span key={c} className="gf-chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="gf-arrow" aria-hidden="true">
                  ↓
                </div>
                <div className="gf-io-block">
                  <div className="gf-io-label">Outputs</div>
                  <div className="gf-chips">
                    {p.outputs.map((c) => (
                      <span key={c} className="gf-chip out">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── IMPACT ──────────────────────────────────────────────── */
const IMPACT_MOMENTS = [
  {
    value: '99.9%',
    label: 'Platform uptime across all enterprise deployments',
    sub: 'Guaranteed SLA',
    detail: 'Multi-region failover · Zero maintenance windows · 24/7 monitoring',
  },
  {
    value: '86K+',
    label: 'Teams running workflows on Aptiveon every day',
    sub: 'Active users',
    detail:
      'Across 40+ countries · Capital markets · Healthcare · Public sector',
  },
  {
    value: '< 2ms',
    label: 'Median workflow execution latency at scale',
    sub: 'Real-time speed',
    detail:
      'p99 under 8ms · Measured across 87K+ daily events · No cold starts',
  },
  {
    value: '86%',
    label: 'Analyst-hours saved on the workflow that runs most',
    sub: 'Measured outcome',
    detail:
      'Across 9 enterprise customers · First measured 90 days post-deploy',
  },
];

function Impact() {
  return (
    <section className="impact">
      <div className="wrap">
        <div className="impact-head">
          <div className="label">— Measured outcomes</div>
          <div className="note">enterprise deployments · last 90 days</div>
        </div>
        <div className="impact-row">
          {IMPACT_MOMENTS.map((m) => (
            <div key={m.label} className="impact-cell">
              <div className="ie">{m.sub}</div>
              <div className="iv">{m.value}</div>
              <div className="il">{m.label}</div>
              <div className="id">{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ARCHITECTURE ────────────────────────────────────────── */
const ARCH_SOURCES = [
  { label: 'Webhooks', glyph: 'WH' },
  { label: 'REST / GraphQL', glyph: 'API' },
  { label: 'Databases', glyph: 'DB' },
  { label: 'File Uploads', glyph: 'FS' },
  { label: 'Scheduled Jobs', glyph: 'CR' },
  { label: 'IoT & Events', glyph: 'IOT' },
];
const ARCH_OUTPUTS = [
  { label: 'Notifications', glyph: 'NT' },
  { label: 'CRM & Sales', glyph: 'CRM' },
  { label: 'CI/CD Deploys', glyph: 'CI' },
  { label: 'Reports & BI', glyph: 'BI' },
  { label: 'Security SOC', glyph: 'SOC' },
  { label: 'AI Responses', glyph: 'AI' },
];
const ARCH_LAYERS = [
  { label: 'Event Router', meta: '2.4K/s' },
  { label: 'AI / ML Core', meta: '94 nodes' },
  { label: 'Rules Engine', meta: '188 rules' },
  { label: 'Transform Layer', meta: 'avro · proto' },
  { label: 'Queue & Retry', meta: '3 zones' },
];

function Architecture() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [processed, setProcessed] = useState(14829);

  useEffect(() => {
    if (reduce) return;
    const a = setInterval(
      () => setActive((l) => (l + 1) % ARCH_LAYERS.length),
      1300,
    );
    const b = setInterval(
      () => setProcessed((n) => n + Math.floor(Math.random() * 8 + 3)),
      900,
    );
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [reduce]);

  return (
    <section className="arch section" id="platform">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Architecture
              </span>
            </div>
            <h2>
              The engine
              <br />
              <em>behind it all.</em>
            </h2>
          </div>
          <p>
            Your data enters. Your outcomes leave. Everything in between is
            Aptiveon.
          </p>
        </div>

        <div className="arch-diagram">
          <div className="arch-col">
            <div className="arch-col-label">Data Sources</div>
            {ARCH_SOURCES.map((s, i) => (
              <div key={s.label} className="arch-node">
                <span className="ico">{s.glyph}</span>
                <span className="lbl">{s.label}</span>
                <span className="ix">0{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="arch-engine">
            <div className="arch-engine-head">
              <span className="name">
                <em>A</em>ptiveon Engine
              </span>
              <span className="ver">v4.2.1 · prod</span>
            </div>
            {ARCH_LAYERS.map((l, i) => (
              <div
                key={l.label}
                className={`arch-layer${active === i ? ' active' : ''}`}
              >
                <span className="lbl">{l.label}</span>
                <span className="meta">{l.meta}</span>
              </div>
            ))}
            <div className="arch-counter">
              <span className="cn">{processed.toLocaleString()}</span>
              <span className="cl">events processed</span>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-col-label">Outcomes</div>
            {ARCH_OUTPUTS.map((o, i) => (
              <div key={o.label} className="arch-node">
                <span className="ico">{o.glyph}</span>
                <span className="lbl">{o.label}</span>
                <span className="ix">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="arch-bottom">
          <span>Zero config required</span>
          <span>Runs at enterprise scale</span>
          <span>Full audit trail</span>
          <span>200+ native integrations</span>
          <span>SOC 2 Type II</span>
        </div>
      </div>
    </section>
  );
}

/* ─── SHOWCASE ────────────────────────────────────────────── */
interface Slide {
  num: string;
  label: string;
  title: string;
  desc: string;
  features: string[];
  Frame: ComponentType;
}
function WorkflowFrame() {
  return (
    <div className="show-frame">
      <div className="show-frame-chrome">
        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>app.aptiveon.com / workflows / customer-onboarding</span>
      </div>
      <div className="show-frame-body">
        <div className="wf">
          <div className="wf-meta">
            <span>Customer Onboarding · v14</span>
            <span className="pill">Running</span>
          </div>
          <div className="wf-row">
            <div className="wf-node">
              <span className="ix">01</span>Webhook
            </div>
            <div className="wf-edge" />
            <div className="wf-node">
              <span className="ix">02</span>Validate
            </div>
            <div className="wf-edge" />
            <div className="wf-node">
              <span className="ix">03</span>Enrich
            </div>
          </div>
          <div className="wf-row">
            <div className="wf-node">
              <span className="ix">04</span>Provision
            </div>
            <div className="wf-edge" />
            <div className="wf-node">
              <span className="ix">05</span>Sync CRM
            </div>
            <div className="wf-edge" />
            <div className="wf-node done">
              <span className="ix">06</span>Done
            </div>
          </div>
          <div className="wf-stats">
            <div className="ws">
              <div className="wsv">14,293</div>
              <div className="wsl">runs today</div>
            </div>
            <div className="ws">
              <div className="wsv">99.8%</div>
              <div className="wsl">success</div>
            </div>
            <div className="ws">
              <div className="wsv">1.2ms</div>
              <div className="wsl">avg latency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function KnowledgeFrame() {
  return (
    <div className="show-frame">
      <div className="show-frame-chrome">
        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>app.aptiveon.com / assistant</span>
      </div>
      <div className="show-frame-body">
        <div className="chat">
          <div className="chat-msg user">How do I set up webhook triggers?</div>
          <div className="chat-msg">
            Navigate to your workflow, select <strong>Trigger → Webhook</strong>.
            You'll get a unique URL. Supports JSON, form data, and multipart.
            <div className="src">
              Source · <b>Webhooks Guide v2.3</b>
            </div>
          </div>
          <div className="chat-msg user">Can it handle nested JSON?</div>
          <div className="chat-msg">
            Yes — up to 10 levels deep. Use dot notation like{' '}
            <code>payload.user.email</code> to access nested fields.
            <div className="src">
              Source · <b>Data Handling Docs</b>
            </div>
          </div>
          <div className="chat-input">
            Ask anything about Aptiveon...
            <span className="arrow" aria-hidden="true">
              ↑
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function SOCFrame() {
  const alerts = [
    { sev: 'CRITICAL', cls: 'sev-crit', label: 'Brute force detected — admin panel', time: '0:32' },
    { sev: 'HIGH', cls: 'sev-high', label: 'Unusual API access pattern · 47.21.x.x', time: '2:10' },
    { sev: 'MED', cls: 'sev-med', label: 'Failed auth × 12 — staging environment', time: '5:44' },
    { sev: 'INFO', cls: 'sev-info', label: 'New service account provisioned', time: '9:01' },
  ];
  return (
    <div className="show-frame">
      <div className="show-frame-chrome">
        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>app.aptiveon.com / soc / incidents</span>
      </div>
      <div className="show-frame-body">
        <div className="soc-head">
          <div className="sh">
            <div className="shv accent">2</div>
            <div className="shl">Critical</div>
          </div>
          <div className="sh">
            <div className="shv">7</div>
            <div className="shl">High</div>
          </div>
          <div className="sh">
            <div className="shv good">94%</div>
            <div className="shl">Auto-resolved</div>
          </div>
        </div>
        <div className="soc-list">
          {alerts.map((a) => (
            <div key={a.label} className="soc-row">
              <span className={`sev ${a.cls}`}>{a.sev}</span>
              <span className="lbl">{a.label}</span>
              <span className="time">{a.time}m</span>
              <span className="action">Triage →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function TeamFrame() {
  const members = [
    { p: 'women/9', n: 'Elara Kim', r: 'Platform Lead', t: 'Platform' },
    { p: 'men/7', n: 'James Okafor', r: 'VP Infrastructure', t: 'Infra' },
    { p: 'women/44', n: 'Sarah Chen', r: 'Head of Engineering', t: 'Core' },
    { p: 'men/22', n: 'Ryan Torres', r: 'ML Infra Engineer', t: 'AI/ML' },
    { p: 'women/25', n: 'Aisha Torres', r: 'Software Engineer', t: 'Platform' },
    { p: 'men/32', n: 'Marcus Webb', r: 'CTO', t: 'Leadership' },
  ];
  return (
    <div className="show-frame">
      <div className="show-frame-chrome">
        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>aptiveon.com / internship / applied-systems</span>
      </div>
      <div className="show-frame-body">
        <div className="team-grid">
          {members.map((m) => (
            <div key={m.p} className="team-card">
              <div className="av">
                <img
                  src={`https://randomuser.me/api/portraits/${m.p}.jpg`}
                  alt={m.n}
                  loading="lazy"
                />
              </div>
              <div className="nm">{m.n}</div>
              <div className="rl">{m.r}</div>
              <div className="tg">{m.t}</div>
            </div>
          ))}
        </div>
        <div className="team-foot">
          <div className="tf">
            <div className="tfv">200+</div>
            <div className="tfl">engineers worldwide</div>
          </div>
          <div className="tf">
            <div className="tfv">Day 1</div>
            <div className="tfl">production access</div>
          </div>
          <div className="tf">
            <div className="tfv">Remote</div>
            <div className="tfl">first culture</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDES: Slide[] = [
  {
    num: '01',
    label: 'Workflow Engine',
    title: 'Automate everything\nyour team touches.',
    desc: 'Connect your tools, teams, and processes into intelligent automated workflows that scale with your business.',
    features: [
      'Visual drag-and-drop builder',
      'Trigger-based automation',
      'Real-time execution logs',
      'Unlimited integrations',
    ],
    Frame: WorkflowFrame,
  },
  {
    num: '02',
    label: 'AI Knowledge Assistant',
    title: 'Intelligence at your\nfingertips.',
    desc: 'Embed an AI assistant that learns from your docs, codebase, and team knowledge — and gives real answers instantly.',
    features: [
      'Natural language queries',
      'Auto-ingests your docs',
      'Context-aware responses',
      'Slack & Teams integration',
    ],
    Frame: KnowledgeFrame,
  },
  {
    num: '03',
    label: 'SOC Automation',
    title: 'Security operations,\non autopilot.',
    desc: 'Automate threat detection, incident response, and compliance reporting with AI-driven security workflows.',
    features: [
      'AI threat correlation',
      'Automated playbooks',
      'Compliance dashboards',
      '24/7 monitoring',
    ],
    Frame: SOCFrame,
  },
  {
    num: '04',
    label: 'Applied Systems Program',
    title: 'Join the team\nbuilding the future.',
    desc: "Aptiveon's internship program puts you on real systems used by enterprise clients worldwide. Ship on day one.",
    features: [
      'Paid positions available',
      'Remote-first culture',
      'Senior engineer mentorship',
      'Production access week one',
    ],
    Frame: TeamFrame,
  },
];

function Showcase() {
  const [idx, setIdx] = useState(0);
  const s = SLIDES[idx]!;
  const Frame = s.Frame;
  return (
    <section className="showcase section" id="showcase">
      <div className="wrap">
        <div className="section-head single">
          <div className="eyebrow-row">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Products
            </span>
          </div>
          <h2>
            Four surfaces,
            <br />
            <em>one engine.</em>
          </h2>
        </div>

        <div className="show-tabs" role="tablist">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.num}
              type="button"
              className={`show-tab${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
              role="tab"
              aria-selected={i === idx}
            >
              <span className="num">{slide.num}</span>
              <span>{slide.label}</span>
            </button>
          ))}
        </div>

        <div className="show-panel">
          <div className="show-info">
            <h3>
              {s.title.split('\n').map((line, i) => (
                <span key={i} className="ln">
                  {line}
                </span>
              ))}
            </h3>
            <p>{s.desc}</p>
            <ul className="show-features">
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#cta" className="btn btn-primary">
              Learn more <span className="arr">→</span>
            </a>
          </div>
          <div>
            <Frame />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRATIONS ────────────────────────────────────────── */
const INTG_ROW1 = [
  'Slack',
  'GitHub',
  'Salesforce',
  'Google Cloud',
  'HubSpot',
  'Notion',
  'Stripe',
  'Jira',
];
const INTG_ROW2 = [
  'PostgreSQL',
  'Zapier',
  'Linear',
  'Figma',
  'Twilio',
  'OpenAI',
  'Snowflake',
  'Datadog',
];
function IntgRender(item: string) {
  return (
    <span className="intg-cell">
      <span className="glyph" aria-hidden="true">
        {item.slice(0, 2).toUpperCase()}
      </span>
      <span>{item}</span>
    </span>
  );
}

function Integrations() {
  return (
    <section className="intg" id="integrations">
      <div className="wrap">
        <div className="intg-head">
          <h2>
            Connects with the tools
            <br />
            <em>you already use.</em>
          </h2>
          <p>
            200+ native integrations. If there's an API, Aptiveon can talk to
            it.
          </p>
        </div>
      </div>
      <Marquee items={INTG_ROW1} variant="logos" renderItem={IntgRender} />
      <Marquee items={INTG_ROW2} variant="logos" reverse renderItem={IntgRender} />
      <div className="wrap">
        <p className="intg-foot">+ 180 more via REST API, GraphQL, and webhooks</p>
      </div>
    </section>
  );
}

/* ─── LIVE FEED ───────────────────────────────────────────── */
interface FeedEvent {
  text: string;
  tag: string;
  lat: string;
  id: string;
  ts: Date;
}
const FEED_TEMPLATES = [
  { text: 'Workflow "Customer Onboarding" completed in 1.1ms', tag: 'success', lat: '1.1ms' },
  { text: '2,847 emails dispatched via Email Campaign workflow', tag: 'batch', lat: '410ms' },
  { text: 'Webhook received: GitHub PR #4821 merged → deploy', tag: 'trigger', lat: '8ms' },
  { text: 'Salesforce sync completed: 1,204 contact records', tag: 'sync', lat: '1.2s' },
  { text: 'SOC alert triaged and escalated to L2 response team', tag: 'security', lat: '94ms' },
  { text: 'Analytics pipeline processed 50,000 events', tag: 'pipeline', lat: '2.1s' },
  { text: 'New user provisioned across 8 downstream systems', tag: 'hr', lat: '320ms' },
  { text: 'Payment webhook → invoice generated + fulfillment', tag: 'finance', lat: '188ms' },
  { text: 'Deploy triggered: prod-v2.8.1 rolled to 3 services', tag: 'devops', lat: '4.2s' },
  { text: 'Inventory sync: 847 SKUs updated across 4 warehouses', tag: 'ops', lat: '780ms' },
  { text: 'Access review completed: 14 permissions auto-revoked', tag: 'compliance', lat: '120ms' },
  { text: 'Contract signed — CRM + billing systems updated', tag: 'sales', lat: '64ms' },
];
function makeFeedEvent(): FeedEvent {
  const t = FEED_TEMPLATES[Math.floor(Math.random() * FEED_TEMPLATES.length)]!;
  return { ...t, id: Math.random().toString(36).slice(2), ts: new Date() };
}
function fmtRelative(ts: Date, now: number): string {
  const diff = Math.floor((now - ts.getTime()) / 1000);
  if (diff < 1) return 'now';
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
}

function LiveFeed() {
  const reduce = usePrefersReducedMotion();
  const [events, setEvents] = useState<FeedEvent[]>(() =>
    Array.from({ length: 7 }, () => {
      const e = makeFeedEvent();
      e.ts = new Date(Date.now() - Math.random() * 30000);
      return e;
    }),
  );
  const [total, setTotal] = useState(14829);
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 24 }, () => 30 + Math.random() * 60),
  );
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (reduce) return;
    const tickRef = { current: 0 };
    const i1 = setInterval(() => {
      tickRef.current += 1;
      setEvents((prev) => [makeFeedEvent(), ...prev].slice(0, 8));
      setTotal((n) => n + Math.floor(Math.random() * 4 + 1));
      setBars((prev) => [
        ...prev.slice(1),
        30 + Math.random() * 60 + (tickRef.current % 5 === 0 ? 25 : 0),
      ]);
    }, 1800);
    const i2 = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(i1);
      clearInterval(i2);
    };
  }, [reduce]);

  const maxBar = Math.max(...bars, 1);

  return (
    <section className="lf">
      <div className="wrap lf-grid">
        <div className="lf-left">
          <div className="eyebrow-row">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Live Activity
            </span>
          </div>
          <h2>
            Running right now,
            <br />
            <em>everywhere.</em>
          </h2>
          <p>
            Thousands of workflows executing every second — across healthcare,
            finance, logistics, and security teams worldwide.
          </p>
          <div className="lf-counter">
            <span className="v">{total.toLocaleString()}</span>
            <span className="l">workflows run today</span>
          </div>
          <div className="lf-bars-label">Throughput · last 43s</div>
          <div className="lf-bars">
            {bars.map((b, i) => (
              <div
                key={i}
                className={`b${i === bars.length - 1 ? ' hot' : ''}`}
                style={{ height: `${(b / maxBar) * 100}%` }}
              />
            ))}
          </div>
          <div className="lf-stats">
            <div className="s">
              <div className="sv">{((total / 3600) * 1.8).toFixed(1)}</div>
              <div className="sl">Events / sec</div>
            </div>
            <div className="s">
              <div className="sv">
                99.8<span className="suffix">%</span>
              </div>
              <div className="sl">Success rate</div>
            </div>
            <div className="s">
              <div className="sv">{Math.floor(total / 190).toLocaleString()}</div>
              <div className="sl">Active flows</div>
            </div>
            <div className="s">
              <div className="sv">
                1.4<span className="suffix">ms</span>
              </div>
              <div className="sl">Avg latency</div>
            </div>
          </div>
        </div>

        <div className="lf-panel">
          <div className="lf-panel-head">
            <span className="live">Live execution log</span>
            <span className="meta">~1.8s refresh</span>
          </div>
          <div className="lf-events">
            {events.map((e) => (
              <div className="lf-event" key={e.id}>
                <span className="tag">{e.tag}</span>
                <span className="msg">{e.text}</span>
                <span className="lat">{e.lat}</span>
                <span className="time">{fmtRelative(e.ts, now)}</span>
              </div>
            ))}
          </div>
          <div className="lf-panel-foot">
            <span className="dot" aria-hidden="true" />
            All systems operational · 99.9% uptime
            <a href="#showcase">View dashboard →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      'Aptiveon cut our onboarding automation build time from 3 weeks to 2 days. The visual editor is genuinely intuitive.',
    name: 'Sarah Chen',
    title: 'Head of Engineering',
    company: 'Meridian Health',
    portrait: 'women/44',
  },
  {
    quote:
      'The AI Knowledge Assistant replaced our internal wiki. Engineers just ask questions and get real answers backed by our actual docs.',
    name: 'Marcus Webb',
    title: 'CTO',
    company: 'Stackline',
    portrait: 'men/32',
  },
  {
    quote:
      'We automated our entire SOC triage pipeline. What took 3 analysts now runs unattended. Response time down 80%.',
    name: 'Priya Nair',
    title: 'Director of Security',
    company: 'Vantage Financial',
    portrait: 'women/68',
  },
  {
    quote:
      "99.9% uptime on 400+ active workflows. We've been running Aptiveon in prod for 14 months without a single incident.",
    name: 'James Okafor',
    title: 'VP Infrastructure',
    company: 'Lumos Labs',
    portrait: 'men/7',
  },
  {
    quote:
      'The internship program was the best experience of my career. Shipped to production in week one. They treat you like a full engineer.',
    name: 'Aisha Torres',
    title: 'Software Engineer',
    company: 'Formerly Aptiveon Intern',
    portrait: 'women/25',
  },
  {
    quote:
      'Developer API is clean and the SDKs actually work. We integrated Aptiveon with our internal tooling in under a day.',
    name: 'Liam Park',
    title: 'Platform Engineer',
    company: 'Novu Systems',
    portrait: 'men/19',
  },
];

function Testimonials() {
  const reduce = usePrefersReducedMotion();
  const doubled = reduce ? TESTIMONIALS : [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="tst" id="testimonials">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Testimonials
              </span>
            </div>
            <h2>
              Trusted by teams
              <br />
              <em>that move fast.</em>
            </h2>
          </div>
          <p>
            Six perspectives from teams running Aptiveon in production today —
            across healthcare, security, infrastructure, and early-career
            engineers.
          </p>
        </div>
      </div>

      <div className="tst-track-wrap">
        <div className={`tst-track${reduce ? ' static' : ''}`}>
          {doubled.map((t, i) => (
            <div key={i} className="tst-card">
              <div className="quote">"{t.quote}"</div>
              <div className="who">
                <div className="av">
                  <img
                    src={`https://randomuser.me/api/portraits/${t.portrait}.jpg`}
                    alt={t.name}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="rl">
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── IN PRODUCTION ───────────────────────────────────────── */
const IPR_METRICS = [
  { v: '99.99%', l: 'Uptime SLA' },
  { v: '<50ms', l: 'API latency' },
  { v: '0', l: 'Downtime deploys' },
  { v: '∞', l: 'Auto-scaling' },
];
const IPR_CHECKS = [
  'SOC 2 Type II certified',
  'End-to-end encryption at rest & in transit',
  'Role-based access control + full audit trail',
  'Multi-region redundancy with auto-failover',
  'Zero-downtime deployments on every push',
];

function InProduction() {
  return (
    <section className="ipr">
      <div className="wrap ipr-grid">
        <div>
          <div className="ipr-eyebrow">— Built for the real world</div>
          <h2>
            Production-ready.
            <br />
            <em>Not just demos.</em>
          </h2>
          <p>
            Anyone can ship a proof of concept. Aptiveon builds systems that
            hold up under real load, real edge cases, and real deadlines.
          </p>
          <ul className="ipr-checks">
            {IPR_CHECKS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <a href="#cta" className="btn btn-primary">
            Talk to sales <span className="arr">→</span>
          </a>
        </div>
        <div className="ipr-metrics">
          {IPR_METRICS.map((m) => (
            <div key={m.l} className="ipr-metric">
              <div className="v">{m.v}</div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BRAND MOMENT ────────────────────────────────────────── */
const BRAND_STATS = [
  { v: '9+', l: 'enterprise customers' },
  { v: '87K+', l: 'events per day' },
  { v: '99.9%', l: 'platform uptime' },
  { v: '4.2M+', l: 'documents indexed' },
];
const BRAND_AVS = [
  { p: 'women/44', n: 'Sarah Chen' },
  { p: 'men/32', n: 'Marcus Webb' },
  { p: 'women/68', n: 'Priya Nair' },
  { p: 'men/7', n: 'James Okafor' },
  { p: 'women/25', n: 'Aisha Torres' },
  { p: 'men/22', n: 'Ryan Torres' },
  { p: 'women/9', n: 'Elara Kim' },
];

function BrandMoment() {
  return (
    <section className="brand" id="brand-moment">
      <div className="wrap">
        <div className="brand-mark">
          <span className="dot" aria-hidden="true" />
          <span className="wordmark">
            <em>A</em>ptiveon
          </span>
        </div>
        <h2 className="brand-tag">
          Build systems
          <br />
          that <em>never stop.</em>
        </h2>
        <div className="brand-stats">
          {BRAND_STATS.map((s) => (
            <div key={s.l} className="bs">
              <div className="bsv">{s.v}</div>
              <div className="bsl">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="brand-team">
          <div className="avs">
            {BRAND_AVS.map((a) => (
              <span className="av" key={a.p}>
                <img
                  src={`https://randomuser.me/api/portraits/${a.p}.jpg`}
                  alt={a.n}
                  loading="lazy"
                />
              </span>
            ))}
          </div>
          <span className="lbl">200+ engineers worldwide</span>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────── */
const CTA_PROOF = [
  { v: '86K+', l: 'Teams worldwide' },
  { v: '87.4K', l: 'Events per day' },
  { v: 'SOC 2', l: 'Type II certified' },
];
const CTA_BADGES = [
  'No credit card required',
  'Free plan available',
  'Cancel anytime',
  'SOC 2 compliant',
];

function HomeCta() {
  return (
    <section className="home-cta" id="cta">
      <div className="wrap">
        <div className="cta-inner">
          <div className="cta-eyebrow">Get started</div>
          <h2 className="cta-title">
            Build systems that <em>actually run.</em>
          </h2>
          <p className="cta-sub">
            Join enterprise teams across capital markets, healthcare, and public
            infrastructure who trust Aptiveon with production-grade AI workflows.
          </p>
          <div className="cta-proof">
            {CTA_PROOF.map((c) => (
              <div key={c.l} className="cp">
                <b>{c.v}</b> {c.l}
              </div>
            ))}
          </div>
          <div className="cta-actions">
            <a href="/contact" className="btn btn-primary">
              Start building free <span className="arr">→</span>
            </a>
            <a href="#testimonials" className="btn btn-ghost">
              See customer stories
            </a>
          </div>
          <div className="cta-badges">
            {CTA_BADGES.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

