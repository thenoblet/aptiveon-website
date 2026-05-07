import Crumb from '@/components/ui/Crumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionMark from '@/components/ui/SectionMark';
import SpecTable, { type SpecRow } from '@/components/ui/SpecTable';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import type { ImgKey } from '@/lib/imagery';

interface Solution {
  id: string;
  name: string;
  short: string;
  hed: string;
  body: string[];
  uses: string[];
  spec: SpecRow[];
  tag?: string;
  photo: ImgKey;
  caption: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: 'asd',
    name: 'Applied Systems Development',
    short: 'ASD',
    hed: 'The ground floor.',
    body: [
      'Practical software systems that connect data, workflows, users, and business operations. Most engagements start here — even AI work tends to be 70% plumbing.',
      "We build the parts that aren't glamorous: ingestion, schemas, queues, auth, admin tools, the dashboard the operator actually uses on Tuesday morning.",
    ],
    uses: [
      'Internal ops platform replacing a stack of spreadsheets',
      'Document intake + routing for a regulated workflow',
      'Custom admin tooling on top of an existing SaaS',
      'Migration off a brittle legacy system',
    ],
    spec: [
      { label: 'Inputs', value: 'Documents, databases, APIs, operator actions' },
      { label: 'Outputs', value: 'Working internal tools, dashboards, automations' },
      { label: 'Stack', value: 'TypeScript · Python · Postgres · queues' },
      { label: 'Maturity', value: 'Production · multiple deployments' },
      { label: 'Engagement', value: '10–20 weeks · build → operate → transfer' },
    ],
    tag: 'core',
    photo: 'sol_asd',
    caption: 'internal tools · ops dashboard',
  },
  {
    id: 'aida',
    name: 'AI Digital Assistants',
    short: 'AIDA',
    hed: 'Assistants for desks, not demos.',
    body: [
      'Custom assistants that help teams search, summarize, draft, and act on business knowledge — scoped to a real role and tied into the systems that role already uses.',
      'We don\'t sell "an AI." We deliver an assistant that does five concrete things well, with the guardrails and review workflow your team needs to trust the output.',
    ],
    uses: [
      'Policy & SOP assistant for frontline staff',
      'Drafting assistant grounded in past correspondence',
      'Internal knowledge Q&A inside an existing chat tool',
      'Triage assistant for inbound queues',
    ],
    spec: [
      { label: 'Inputs', value: 'Internal docs, chat history, structured data, role context' },
      { label: 'Outputs', value: 'Grounded answers, drafts, structured actions' },
      { label: 'Stack', value: 'AWE · LLM providers · vector store · evals' },
      { label: 'Maturity', value: 'Pilot → production' },
      { label: 'Engagement', value: '8–14 weeks' },
    ],
    photo: 'sol_aida',
    caption: 'role-scoped assistant',
  },
  {
    id: 'rag',
    name: 'RAG Knowledge Systems',
    short: 'RAG',
    hed: 'The boring parts of retrieval, done right.',
    body: [
      'Retrieval pipelines that ground AI responses in your own documents. We focus on the unsexy parts most demos skip: chunking strategy, embedding choice, citation, evaluation, and freshness.',
      "Outputs cite their sources. Failures are visible. Coverage is measurable. The pipeline isn't a black box — it's an asset you can audit and tune.",
    ],
    uses: [
      'Cited Q&A over a document corpus',
      'Long-form drafting with grounded references',
      'Hybrid search across structured + unstructured data',
      'Eval harness for an existing RAG deployment',
    ],
    spec: [
      { label: 'Inputs', value: 'Document corpora, structured KBs, search APIs' },
      { label: 'Outputs', value: 'Cited answers, retrieval API, eval reports' },
      { label: 'Stack', value: 'Vector + lexical · re-rankers · evals · AWE' },
      { label: 'Maturity', value: 'Production · pattern reuse' },
      { label: 'Engagement', value: '6–12 weeks' },
    ],
    tag: 'retrieval',
    photo: 'sol_rag',
    caption: 'corpus · retrieval',
  },
  {
    id: 'wfa',
    name: 'Workflow Automation',
    short: 'WFA',
    hed: 'Coordination, not magic.',
    body: [
      'Automation that connects documents, systems, APIs, models, and people — with explicit human review where it matters and observability everywhere else.',
      'We design for failure first. Every workflow has a clear retry surface, a queue you can inspect, and a human-in-the-loop step where stakes warrant it.',
    ],
    uses: [
      'Document ingestion → extraction → review pipeline',
      'Cross-system reconciliation & exception handling',
      'Scheduled AI tasks with reviewer queues',
      'Vendor / partner data integrations with audit trail',
    ],
    spec: [
      { label: 'Inputs', value: 'Documents, events, API calls, schedules' },
      { label: 'Outputs', value: 'Routed tasks, reconciled records, audit trail' },
      { label: 'Stack', value: 'AWE · queues · webhooks · review UI' },
      { label: 'Maturity', value: 'Production' },
      { label: 'Engagement', value: '8–16 weeks' },
    ],
    photo: 'sol_wfa',
    caption: 'queue · review',
  },
];

export default function Solutions() {
  return (
    <>
      <Crumb current="solutions" />

      <PageHero
        title={
          <>
            Four practice areas, <span className="mark">one</span> spec sheet.
          </>
        }
        dek="Every Aptiveon engagement is one of these four. Each has the same five-row spec — Inputs, Outputs, Stack, Maturity, Typical Engagement — so you can compare them as objects."
        meta={[
          { label: 'AREAS', value: '4' },
          { label: 'FORMAT', value: 'Build · operate · transfer' },
          { label: 'TYPICAL ENGAGEMENT', value: '8–20 weeks' },
          { label: 'STATUS', value: 'Open for partner pilots' },
        ]}
      />

      {SOLUTIONS.map((s) => (
        <SolutionBlock key={s.id} solution={s} />
      ))}

      <Section title="Start a conversation" meta="written exchange > discovery call" id="engage">
        <div className="engage">
          <div>
            <h4>SCOPING</h4>
            <h5>Send the constraint.</h5>
            <p>
              Tell us the system you have in mind, the data involved, and the thing that's actually
              blocking you. We'll write back with a take and rough shape.
            </p>
            <Button to="/contact" variant="line" arrow>
              contact@aptiveon.tech
            </Button>
          </div>
          <div>
            <h4>NEXT</h4>
            <h5>Read the products.</h5>
            <p>
              Most engagements run on the Aptiveon Workflow Engine. The Knowledge Assistant is a
              worked example of what we ship on top of it.
            </p>
            <Button to="/products" variant="line" arrow>
              Products
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function SolutionBlock({ solution: s }: { solution: Solution }) {
  return (
    <section className="solution" id={s.id}>
      <div className="sol-head">
        <SectionMark />
        <h2>{s.name}</h2>
        {s.tag && <span className="tag">{s.tag}</span>}
      </div>
      <div className="specsheet with-img">
        <Image src={s.photo} alt={s.caption} className="ss-img" />
        <div className="ss-l">
          <div className="ref">{s.short}</div>
          <h3>{s.hed}</h3>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="uses">
            {s.uses.map((u) => (
              <div key={u}>
                <b>USE CASE</b>
                {u}
              </div>
            ))}
          </div>
        </div>
        <div className="ss-r">
          <div className="lbl">SPEC SHEET</div>
          <SpecTable rows={s.spec} />
        </div>
      </div>
    </section>
  );
}
