import { useEffect, useRef, useState } from 'react';
import Counter from '@/components/ui/Counter';
import KineticHeading from '@/components/ui/KineticHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import { useHeroParticles } from '@/hooks/useHeroParticles';
import { useStatsOrbs } from '@/hooks/useStatsOrbs';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <PillarLine />
      <Pillars />
      <Stats />
      <ProductMoment />
      <Quote />
      <Compliance />
      <InternStrip />
      <HomeCta />
    </>
  );
}

/* ── 1. HERO ─────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useHeroParticles(canvasRef, heroRef);

  return (
    <section ref={heroRef} className="hero">
      <canvas ref={canvasRef} className="particles" />
      <div className="lp-wrap hero-inner">
        <div className="hero-imgs apt-img-block">
          <Image src="hero_a" alt="documents · review" />
          <Image src="hero_c" alt="two reviewers" />
          <Image src="hero_d" alt="analyst · desk" />
        </div>
        <div className="eyebrow">
          <span className="live-dot" />
          54,812 workflow runs · last 24h
        </div>
        <h1>
          <span className="word w1">
            <span>Ship&nbsp;AI</span>
          </span>{' '}
          <span className="word w2">
            <span>that&nbsp;</span>
          </span>
          <span className="word w3">
            <span>
              <em>survives</em>&nbsp;
            </span>
          </span>
          <span className="word w4">
            <span>audit.</span>
          </span>
        </h1>
        <p className="dek">
          Aptiveon is the workflow infrastructure regulated teams use to put AI into production —
          with citations, human review, and an audit trail per run.
        </p>
        <div className="ctas">
          <Button to="/contact" variant="primary" arrow>
            Talk to sales
          </Button>
          <Button to="/products" variant="ghost" arrow>
            See the platform
          </Button>
        </div>
      </div>
      <div className="scroll-cue">
        <span>scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}

/* ── 2. LOGO WALL ───────────────────────────── */
const LOGOS: Array<{ name: string; style: React.CSSProperties }> = [
  { name: 'NorthArc', style: { fontWeight: 600, letterSpacing: '-0.01em' } },
  {
    name: 'MERIDIAN/H',
    style: { fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.04em' },
  },
  { name: 'Halden & Lo', style: { fontStyle: 'italic', fontWeight: 500 } },
  { name: 'CASCADIA', style: { fontWeight: 500, letterSpacing: '0.18em' } },
  { name: 'delta·tela', style: { fontFamily: 'var(--font-mono)' } },
  { name: 'Brackmoor Health', style: { fontWeight: 600 } },
];

function LogoWall() {
  return (
    <Reveal as="section" className="logos">
      <div className="lp-wrap">
        <div className="lbl">TRUSTED IN PRODUCTION BY</div>
        <div className="row">
          {LOGOS.map((l) => (
            <div key={l.name} className="l" style={l.style}>
              {l.name}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── 3. PILLAR LINE (kinetic) ───────────────── */
function PillarLine() {
  return (
    <section className="pillar-line">
      <div className="lp-wrap">
        <KineticHeading as="h2">
          Most AI projects <span className="muted">die in the audit.</span> Ours{' '}
          <span className="mark">don't.</span>
        </KineticHeading>
      </div>
    </section>
  );
}

/* ── 4. THREE PILLARS ────────────────────────── */
const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="10" width="32" height="24" rx="1" />
        <path d="M6 18 L38 18 M14 26 L30 26" />
      </svg>
    ),
    title: 'Cited by default',
    body: 'Every answer points to the source paragraph. Auditors get the receipts; reviewers spot drift early.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="14" cy="22" r="6" />
        <circle cx="30" cy="22" r="6" />
        <path d="M20 22 L24 22 M14 28 L14 36 M30 28 L30 36 M14 16 L14 8 M30 16 L30 8" />
      </svg>
    ),
    title: 'Human in the loop',
    body: 'Drop a review step anywhere in a workflow. Reviewers get a queue, a UI, and an explicit override.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 6 L36 14 L36 30 L22 38 L8 30 L8 14 Z" />
        <path d="M22 6 L22 22 M22 22 L36 14 M22 22 L8 14" />
      </svg>
    ),
    title: 'Your tenancy',
    body: 'Hosted in your region. Customer data stays in customer tenancy — including for evals and fine-tuning.',
  },
];

function Pillars() {
  return (
    <Reveal as="section" className="pillars">
      <div className="lp-wrap">
        <Reveal stagger className="grid">
          {PILLARS.map((p) => (
            <div key={p.title} className="pl">
              <div className="ico">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </Reveal>
  );
}

/* ── 5. STATS ─────────────────────────────────── */
function Stats() {
  const orbsRef = useStatsOrbs<HTMLElement>();
  return (
    <Reveal as="section" className="stats" ref={orbsRef}>
      <div className="lp-wrap">
        <div className="lbl">PRODUCTION · LAST 6 MONTHS</div>
        <div className="grid">
          <div className="stat">
            <div className="num">
              <Counter to={14} />
              <span className="u">+</span>
            </div>
            <p className="desc">
              Production deployments across 9 enterprise customers in 4 regulated sectors.
            </p>
          </div>
          <div className="stat">
            <div className="num">
              <Counter to={4.2} decimals={1} />
              <span className="u">M</span>
            </div>
            <p className="desc">
              Documents indexed across pilot and production tenants of the Workflow Engine.
            </p>
          </div>
          <div className="stat">
            <div className="num">
              <Counter to={99.4} decimals={1} />
              <span className="u">%</span>
            </div>
            <p className="desc">
              Median cited-answer accuracy on customer-curated eval sets, last 90 days.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── 6. PRODUCT MOMENT ──────────────────────── */
const QUEUE_ROWS = [
  { id: 'NA-A411', name: 'Clause 4.2 review', state: 'cite' as const },
  { id: 'NA-A410', name: 'Disclosure update', state: 'cite' as const },
  { id: 'NA-A409', name: 'Risk factors §7', state: 'cite' as const },
  { id: 'NA-A408', name: 'Term sheet variant', state: 'flag' as const },
];

function ProductMoment() {
  return (
    <Reveal as="section" className="product-moment">
      <div className="lp-wrap">
        <div className="head">
          <div>
            <div className="eb">PRODUCT · WORKFLOW ENGINE</div>
            <h2>One queue. Every answer cited.</h2>
          </div>
        </div>
        <div className="frame">
          <div className="bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <div className="body">
            <div className="qhead">
              <span>QUEUE · prospectus_review</span>
              <span>
                <Counter to={312} /> open ·{' '}
                <b>
                  <Counter to={99.6} decimals={1} />% cited
                </b>
              </span>
            </div>
            <FlippingRow id="NA-A412" name="Q3 2026 structured note" />
            {QUEUE_ROWS.map((r) => (
              <div key={r.id} className="qrow">
                <span className="id">{r.id}</span>
                <span className="nm">{r.name}</span>
                <span className={`pl ${r.state === 'cite' ? 'pl-cite' : 'pl-flag'}`}>
                  {r.state === 'cite' ? 'CITED' : 'FLAGGED'}
                </span>
              </div>
            ))}
            <div className="foot">
              <span className="ms">
                analyst-hours saved · 6mo<b>+86%</b>
              </span>
              <span className="ms">audit trail · per run</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FlippingRow({ id, name }: { id: string; name: string }) {
  const [pending, setPending] = useState(true);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const interval = setInterval(() => {
      setFlipping(true);
      setPending((v) => !v);
      const t = setTimeout(() => {
        setFlipping(false);
        timeouts.delete(t);
      }, 1600);
      timeouts.add(t);
    }, 3400);
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`qrow ${flipping ? 'flipping' : ''}`}>
      <span className="id">{id}</span>
      <span className="nm">{name}</span>
      <span className={`pl ${pending ? 'pl-pend' : 'pl-cite'}`}>
        {pending ? 'PENDING' : 'CITED'}
      </span>
    </div>
  );
}

/* ── 7. QUOTE ────────────────────────── */
function Quote() {
  return (
    <Reveal as="section" className="quote">
      <div className="lp-wrap">
        <div className="grid">
          <div className="who">
            <Image src="quote_portrait" alt="P. Raman" className="portrait" />
            <svg className="mark" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" fill="#1F3A8A" />
              <path
                d="M12 42 L12 14 L28 38 L28 14 L44 42"
                fill="none"
                stroke="#F2EEE3"
                strokeWidth="3"
              />
            </svg>
            <div className="name">NorthArc Capital</div>
            <div>Capital markets · 1,200 staff</div>
            <div>SG · CH · UK</div>
          </div>
          <div>
            <blockquote>
              Three analysts spent a week on each prospectus. We get to a defensible read in{' '}
              <em>under four hours</em> — and every flag points to the paragraph it came from.
            </blockquote>
            <div className="person">
              <span className="l" />
              <span>
                <b>Priya Raman</b>&nbsp;&nbsp;Head of Compliance Engineering, NorthArc Capital
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── 8. COMPLIANCE ─────────────────────── */
const COMPLIANCE = [
  { name: 'SOC 2 Type II', state: 'ok', value: '✓ 2026.Q1' },
  { name: 'ISO 27001', state: 'pending', value: 'audit Q3 2026' },
  { name: 'GDPR DPA', state: 'ok', value: '✓' },
  { name: 'HIPAA BAA', state: 'pending', value: 'on request' },
  { name: 'SG · EU · US', state: 'ok', value: '✓ regions' },
] as const;

function Compliance() {
  return (
    <Reveal as="section" className="compl">
      <div className="lp-wrap">
        <div className="row">
          {COMPLIANCE.map((c) => (
            <div key={c.name} className="b">
              <b>{c.name}</b>
              <span className={c.state}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── 9. INTERN STRIP ───────────────────── */
function InternStrip() {
  return (
    <Reveal as="section" className="intern with-img">
      <div className="lp-wrap">
        <div className="row">
          <div className="left">
            <div>
              <div className="lbl">APPLIED SYSTEMS INTERNSHIP · COHORT 02</div>
              <h3>For 1st &amp; 2nd-year students who'd rather ship than slide-deck.</h3>
            </div>
            <div className="right">
              <span className="meta">apply by 2026.06.30</span>
              <Button to="/internship" variant="ghost" arrow>
                Read the program
              </Button>
            </div>
          </div>
          <Image
            src="intern_strip"
            alt="cohort 02 · paired build"
            className="stripimg"
          />
        </div>
      </div>
    </Reveal>
  );
}

/* ── 10. CTA ──────────────────────────── */
function HomeCta() {
  return (
    <section className="home-cta with-img">
      <Image src="cta_back" alt="" className="cta-back" />
      <div className="lp-wrap">
        <h2>
          Put it in production. <em>Properly.</em>
        </h2>
        <Button to="/contact" variant="accent" arrow>
          Talk to sales
        </Button>
        <div className="sub">
          A written exchange beats a discovery call. We reply within two business days.
        </div>
      </div>
    </section>
  );
}
