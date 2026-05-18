import { type ReactNode } from 'react';
import Crumb from '@/components/ui/Crumb';
import PageHero from '@/components/ui/PageHero';
import SpecTable, { type SpecRow } from '@/components/ui/SpecTable';
import Button from '@/components/ui/Button';

interface CaseResult {
  num: string;
  label: string;
}
interface CaseQuote {
  body: ReactNode;
  who: string;
}
interface CaseStudy {
  id: string;
  name: string;
  tag: string;
  photo: string;
  sub: string;
  stamp: { quarter: string; note: string };
  spec: SpecRow[];
  problem: { hed: string; body: string };
  approach: { hed: string; body: string };
  outcome: { hed: string; body: string };
  quote: CaseQuote;
  results: CaseResult[];
}

const CASES: CaseStudy[] = [
  {
    id: 'northarc',
    name: 'NorthArc Capital',
    tag: 'capital markets',
    photo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85&auto=format&fit=crop',
    sub: 'CASE STUDY · CAPITAL MARKETS · SINGAPORE / ZURICH / LONDON',
    stamp: { quarter: '2026.Q1', note: '12-week build · ongoing operate' },
    spec: [
      { label: 'Sector', value: 'Capital markets — structured products' },
      { label: 'Size', value: '1,200 staff · 3 jurisdictions' },
      { label: 'Engagement', value: 'RAG + Workflow Automation' },
      { label: 'Stack', value: 'AWE · Knowledge Assistant tenant' },
      { label: 'Region', value: 'SG · CH · UK' },
      { label: 'Live since', value: '2026.02' },
    ],
    problem: {
      hed: 'Three analysts. Five days. One prospectus.',
      body: "NorthArc's compliance engineering team reviewed every structured-note prospectus before issuance. Three senior analysts spent a full week on each one, cross-referencing risk factors, term sheets, and disclosures against an internal precedent library that lived across six SharePoint sites and one paralegal's brain.",
    },
    approach: {
      hed: 'A reviewer queue, with citations.',
      body: 'We built a workflow on AWE that ingests new prospectuses, runs a multi-step review against the precedent corpus, and surfaces flagged clauses to a human reviewer queue. Every flag points to the source paragraph. Reviewers approve, override, or escalate — and the audit trail is per-run.',
    },
    outcome: {
      hed: 'Under four hours to a defensible read.',
      body: 'The workflow now handles the first pass on 312 documents per quarter. Analysts spend their time on the 8–12% that get flagged — the rest passes through with a complete citation trail that satisfies internal audit and the MAS examiner who looked at it in March.',
    },
    quote: {
      body: (
        <>
          Three analysts spent a week on each prospectus. We get to a defensible
          read in <em>under four hours</em> — and every flag points to the
          paragraph it came from.
        </>
      ),
      who: 'Priya Raman · Head of Compliance Engineering, NorthArc Capital',
    },
    results: [
      { num: '40h → 4h', label: 'time to first defensible read · per prospectus' },
      { num: '312', label: 'documents reviewed per quarter · cohort 2026.Q1' },
      { num: '86%', label: 'analyst-hours saved · 6-month rolling' },
    ],
  },
  {
    id: 'brackmoor',
    name: 'Brackmoor Health',
    tag: 'healthcare',
    photo: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=85&auto=format&fit=crop',
    sub: 'CASE STUDY · HOSPITAL NETWORK · UNITED KINGDOM',
    stamp: { quarter: '2026.Q1', note: '16-week build · in operation' },
    spec: [
      { label: 'Sector', value: 'Hospital network — 7 sites' },
      { label: 'Size', value: '4,800 clinical staff' },
      { label: 'Engagement', value: 'AI Digital Assistant + ASD' },
      { label: 'Stack', value: 'AWE · on-prem deployment' },
      { label: 'Region', value: 'UK · NHS-aligned' },
      { label: 'Live since', value: '2026.03' },
    ],
    problem: {
      hed: 'SOPs that nobody could find at 2am.',
      body: 'Brackmoor had 1,400 standard operating procedures across seven hospitals — version-stamped PDFs in a portal nobody loved. When a registrar needed the right procedure at 2am, the answer was usually "ask the senior on call." Compliance hated it. Clinicians hated it. Patients didn\'t know about it.',
    },
    approach: {
      hed: 'A grounded assistant, on the ward tablet.',
      body: "We deployed the Knowledge Assistant against the SOP corpus, with strict refusal behaviour for out-of-corpus questions and explicit \"see the senior on call\" routing for clinical decisions. Every answer cites the SOP and section number. The whole thing runs on-prem inside Brackmoor's tenancy.",
    },
    outcome: {
      hed: 'The right paragraph, in seconds.',
      body: "Median time from question to cited paragraph: 11 seconds. Clinical Governance signed it off after a four-week shadow audit. The assistant doesn't make clinical decisions — it surfaces the policy and the citation, and clinicians keep doing their jobs.",
    },
    quote: {
      body: (
        <>
          Our registrars stopped asking each other where the SOP was. They ask
          the assistant, get the <em>cited paragraph</em>, and move on.
        </>
      ),
      who: 'Dr. Iwan Hollis · Director of Clinical Governance, Brackmoor Health',
    },
    results: [
      { num: '11s', label: 'median question → cited paragraph' },
      { num: '1,400', label: 'SOPs indexed · across 7 sites' },
      { num: '0', label: 'out-of-corpus answers in shadow audit' },
    ],
  },
  {
    id: 'meridian',
    name: 'Meridian/H',
    tag: 'public infra',
    photo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85&auto=format&fit=crop',
    sub: 'CASE STUDY · PUBLIC INFRASTRUCTURE · NETHERLANDS',
    stamp: { quarter: '2025.Q4', note: '14-week build · operating' },
    spec: [
      { label: 'Sector', value: 'Public infrastructure — water' },
      { label: 'Size', value: '900 staff · 11 facilities' },
      { label: 'Engagement', value: 'Workflow Automation + ASD' },
      { label: 'Stack', value: 'AWE · self-hosted' },
      { label: 'Region', value: 'EU · NL' },
      { label: 'Live since', value: '2026.01' },
    ],
    problem: {
      hed: 'Permit applications that took six weeks.',
      body: 'Meridian/H processes ~6,000 industrial discharge permit applications per year. Each one cross-references regulatory limits, historical readings from monitoring stations, and case-law precedents. The median permit sat in the queue for six weeks. The backlog was political.',
    },
    approach: {
      hed: 'Automate the easy 80%, route the hard 20%.',
      body: 'We built a workflow that triages incoming applications: clear approvals get a draft response and citations within an hour, complex ones get routed to the senior reviewer queue with a pre-assembled brief. Every routing decision is auditable; reviewers can override.',
    },
    outcome: {
      hed: 'From six weeks to nine days.',
      body: "Median permit time fell from 42 days to 9. Three reviewers retrained onto the harder cases — none laid off. The Inspectorate audited the workflow's audit trail in February and signed off.",
    },
    quote: {
      body: (
        <>
          The workflow tells me <em>why</em> it routed an application here. I
          can see the precedent, the readings, and what the model thinks. Then
          I decide.
        </>
      ),
      who: 'Saskia Bekker · Senior Permit Reviewer, Meridian/H',
    },
    results: [
      { num: '42d → 9d', label: 'median permit cycle' },
      { num: '6,200', label: 'applications processed · 12 months' },
      { num: '78%', label: 'auto-approved with cited rationale' },
    ],
  },
  {
    id: 'halden',
    name: 'Halden & Lo',
    tag: 'law',
    photo: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=900&q=85&auto=format&fit=crop',
    sub: 'CASE STUDY · LAW FIRM · SINGAPORE / HONG KONG',
    stamp: { quarter: '2025.Q3', note: '10-week build · ongoing' },
    spec: [
      { label: 'Sector', value: 'Law — corporate / arbitration' },
      { label: 'Size', value: '180 lawyers · 2 offices' },
      { label: 'Engagement', value: 'RAG Knowledge Systems' },
      { label: 'Stack', value: 'AWE · in-firm tenant' },
      { label: 'Region', value: 'SG · HK' },
      { label: 'Live since', value: '2025.10' },
    ],
    problem: {
      hed: 'Knowledge that lived in the senior partners.',
      body: "Halden & Lo's institutional memory — the precedents, the negotiating positions, the way a particular judge tended to rule — sat in the heads of seven senior partners. Associates couldn't access it. Clients paid for it via partner hours. The firm was the bottleneck on its own knowledge.",
    },
    approach: {
      hed: 'A grounded research surface.',
      body: 'We built a retrieval system over 18 years of firm work-product — pleadings, advice memos, win/loss notes — with strict client-matter scoping and citation. Associates can ask for "how did we frame this in 2019" and get back the matter, the section, and the partner who drafted it.',
    },
    outcome: {
      hed: 'Associates ship draft memos faster.',
      body: "Time from research request to first-draft memo dropped 64%. Partners review faster because the citations are already there. The data never leaves the firm's tenancy; the model never trains on it.",
    },
    quote: {
      body: (
        <>
          It surfaces the <em>2019 memo</em> I forgot I'd written. Three lines
          of citation. That's the entire game.
        </>
      ),
      who: 'Tessa Halden · Senior Partner, Halden & Lo',
    },
    results: [
      { num: '−64%', label: 'research → first-draft memo time' },
      { num: '18y', label: 'years of firm work-product indexed' },
      { num: '100%', label: 'in-tenant · no model training on data' },
    ],
  },
];

const LOGOS: Array<{ name: string; style: React.CSSProperties }> = [
  { name: 'NorthArc', style: { fontWeight: 600, letterSpacing: '-0.01em' } },
  {
    name: 'MERIDIAN/H',
    style: { fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.04em' },
  },
  { name: 'Halden & Lo', style: { fontStyle: 'italic', fontWeight: 500 } },
  { name: 'CASCADIA', style: { fontWeight: 500, letterSpacing: '0.18em' } },
  { name: 'delta·tela', style: { fontFamily: 'var(--font-mono)' } },
  { name: 'Brackmoor Health', style: { fontWeight: 600 } },
];

export default function Customers() {
  return (
    <div className="page-main">
      <div className="page-wrap">
        <Crumb current="customers" />

        <PageHero
          title={
            <>
              Production, <span className="mark">not</span> pilot.
            </>
          }
          dek="Four customers across capital markets, healthcare, public infrastructure, and law. Each is running an Aptiveon system in production — with auditors who've already looked at it, and operators who depend on it on Tuesday morning."
          meta={[
            { label: 'CUSTOMERS', value: '9 in production · 4 sectors' },
            { label: 'RUNS · LAST 24h', value: '54,812' },
            { label: 'REGIONS', value: 'SG · EU · UK · US' },
            { label: 'STATUS', value: 'Open for partner pilots' },
          ]}
        />

        <section className="case-index-section">
          <div className="case-index">
            {CASES.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                <div className="name">{c.name}</div>
                <div className="sec">{c.spec[0]?.value as string}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="agg-stats">
          <div className="stat">
            <div className="num">
              9<span className="u">+</span>
            </div>
            <div className="lbl">enterprise customers · 4 regulated sectors</div>
          </div>
          <div className="stat">
            <div className="num">
              4.2<span className="u">M</span>
            </div>
            <div className="lbl">documents indexed across customer tenants</div>
          </div>
          <div className="stat">
            <div className="num">
              99.4<span className="u">%</span>
            </div>
            <div className="lbl">median cited-answer accuracy · last 90 days</div>
          </div>
          <div className="stat">
            <div className="num">
              86<span className="u">%</span>
            </div>
            <div className="lbl">
              analyst-hours saved on the workflow that runs most
            </div>
          </div>
        </section>

        {CASES.map((c) => (
          <CaseStudyBlock key={c.id} study={c} />
        ))}

        <section className="logos-section">
          <div className="lbl">PILOTS &amp; PARTNER ENGAGEMENTS · IN FLIGHT</div>
          <div className="row">
            {LOGOS.map((l) => (
              <div key={l.name} className="logo" style={l.style}>
                {l.name}
              </div>
            ))}
          </div>
        </section>

        <section className="ework">
          <div className="sec-head">
            <h2 className="sec-title">How an engagement runs</h2>
            <span className="sec-meta">build · operate · transfer</span>
          </div>
          <div className="ework-grid">
            <div>
              <div className="ref">PHASE 01 · BUILD</div>
              <h4>6–14 weeks</h4>
              <p>
                We sit with the operators who'll use the system. We write the
                spec, ship the build, hook up the integrations, and put it in
                front of a real user inside week 4.
              </p>
            </div>
            <div>
              <div className="ref">PHASE 02 · OPERATE</div>
              <h4>3–6 months</h4>
              <p>
                We run it with you in production. On-call rotation, eval
                harness in place, monthly written reports that go to your
                audit committee, not just your CTO.
              </p>
            </div>
            <div>
              <div className="ref">PHASE 03 · TRANSFER</div>
              <h4>By month 9</h4>
              <p>
                Your team takes ownership. We stay on a thin retainer for
                incidents and the next thing — but the system, the docs, and
                the runbook are yours.
              </p>
            </div>
          </div>
        </section>

        <section className="cust-cta">
          <h3>
            Want to be the <em>fifth case study?</em>
          </h3>
          <Button to="/contact" variant="primary" arrow>
            Talk to sales
          </Button>
        </section>
      </div>
    </div>
  );
}

function CaseStudyBlock({ study: c }: { study: CaseStudy }) {
  return (
    <section className="case" id={c.id}>
      <div className="case-head">
        <h2 className="case-name">
          {c.name}
          <span className="case-tag">{c.tag}</span>
        </h2>
        <div className="case-sub">{c.sub}</div>
        <div className="case-stamp">
          <b>{c.stamp.quarter}</b> · {c.stamp.note}
        </div>
      </div>

      <div className="case-body">
        <div className="case-l">
          <figure className="case-photo-frame">
            <img
              src={c.photo}
              alt={`${c.name} — ${c.tag}`}
              className="case-photo"
              loading="lazy"
            />
          </figure>
          <div className="lbl">Spec sheet</div>
          <SpecTable rows={c.spec} />
        </div>

        <div className="case-r">
          {(
            [
              { lbl: 'Problem', data: c.problem },
              { lbl: 'Approach', data: c.approach },
              { lbl: 'Outcome', data: c.outcome },
            ] as const
          ).map((arc) => (
            <div key={arc.lbl} className="arc">
              <div className="arc-lbl">{arc.lbl}</div>
              <h4 className="arc-hed">{arc.data.hed}</h4>
              <p className="arc-body">{arc.data.body}</p>
            </div>
          ))}

          <blockquote className="case-quote">
            <p>"{c.quote.body}"</p>
            <footer>
              <b>{c.quote.who.split(' · ')[0]}</b>
              {c.quote.who.includes(' · ')
                ? ` · ${c.quote.who.split(' · ').slice(1).join(' · ')}`
                : ''}
            </footer>
          </blockquote>

          <div className="case-results">
            {c.results.map((r, i) => (
              <div key={i} className="cr">
                <div className="cr-num">{r.num}</div>
                <div className="cr-lbl">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
