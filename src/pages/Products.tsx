import Crumb from '@/components/ui/Crumb';
import PageHero from '@/components/ui/PageHero';
import SpecTable, { type SpecRow } from '@/components/ui/SpecTable';
import Button from '@/components/ui/Button';

interface Product {
  id: string;
  accent?: boolean;
  short: string;
  name: string;
  blurb: string;
  tags: string[];
  spec: SpecRow[];
  features: { title: string; body: string }[];
}

const PRODUCTS: Product[] = [
  {
    id: 'awe',
    short: 'AWE',
    name: 'Aptiveon Workflow Engine',
    blurb:
      'A configurable platform for orchestrating AI workflows, retrieval pipelines, integrations, and human-in-the-loop review.',
    tags: ['PLATFORM', 'IN DEVELOPMENT', 'SELF-HOSTED OR MANAGED'],
    spec: [
      { label: 'Inputs', value: 'Documents, APIs, schedules, events, operators' },
      { label: 'Outputs', value: 'Orchestrated tasks, retrieved context, reviewed outputs' },
      { label: 'Stack', value: 'TypeScript · Python · Postgres · queues' },
      { label: 'Maturity', value: 'In development · early partners' },
      { label: 'Engagement', value: 'Hosted by Aptiveon, or self-hosted' },
    ],
    features: [
      {
        title: 'Workflow orchestration',
        body: 'Compose multi-step workflows with retries, branches, and explicit failure paths. Inspect any run.',
      },
      {
        title: 'Retrieval pipelines',
        body: 'Pluggable chunking, embeddings, vector + lexical retrieval, re-rankers, citation built in.',
      },
      {
        title: 'Integrations',
        body: 'API, database, webhook, and SaaS adapters. Typed contracts at every boundary.',
      },
      {
        title: 'Human review',
        body: 'Drop a review step anywhere in a workflow. Reviewers get a queue, a UI, and an audit trail.',
      },
      {
        title: 'Observability',
        body: 'Per-run logs, token costs, latency, eval scores. Alerting on regressions, not vibes.',
      },
      {
        title: 'Multi-tenant',
        body: 'Each product or engagement is a tenant. Shared platform, isolated data.',
      },
    ],
  },
  {
    id: 'aka',
    accent: true,
    short: 'AKA',
    name: 'Aptiveon Knowledge Assistant',
    blurb:
      'A practical assistant that helps organizations search, summarize, and act on their own documents, policies, manuals, and internal knowledge.',
    tags: ['PRODUCT', 'PILOT DEPLOYMENTS', 'TENANT OF AWE'],
    spec: [
      { label: 'Inputs', value: 'Uploaded docs, structured KBs, role context' },
      { label: 'Outputs', value: 'Grounded answers, drafts, cited summaries' },
      { label: 'Stack', value: 'AWE · LLM providers · vector store' },
      { label: 'Maturity', value: 'Pilot deployments' },
      { label: 'Engagement', value: '4–8 weeks to first deployment' },
    ],
    features: [
      {
        title: 'Grounded answers',
        body: 'Every answer cites the document and section it came from. Hallucination is visible, not implicit.',
      },
      {
        title: 'Document ingestion',
        body: 'Drop in PDFs, Office docs, Markdown, Notion exports. Chunking and embeddings handled.',
      },
      {
        title: 'Configurable prompts',
        body: "Tune the assistant's voice, refusal behaviour, and scope per deployment without touching code.",
      },
      {
        title: 'Guardrails',
        body: 'Topic filters, PII handling, and explicit "I don\'t know" behaviour for out-of-corpus questions.',
      },
      {
        title: 'Simple UI',
        body: 'A clean chat surface for non-technical teams. No prompt engineering required at the user end.',
      },
      {
        title: 'Eval harness',
        body: 'Curate a question set, watch coverage and accuracy over time. Catches regressions on doc updates.',
      },
    ],
  },
];

export default function Products() {
  return (
    <div className="page-main">
      <div className="page-wrap">
        <Crumb current="products" />

        <PageHero
          title={
            <>
              A <span className="mark">platform</span> first. Products as
              tenants.
            </>
          }
          dek="The Aptiveon Workflow Engine is the underlying infrastructure. The Knowledge Assistant is the first product built on top of it. Future products are tenants of the same platform, not new codebases."
          meta={[
            { label: 'PLATFORM', value: 'AWE — in development' },
            { label: 'PRODUCT', value: 'AKA — pilot deployments' },
            { label: 'FUTURE', value: '02.3 placeholder' },
            { label: 'MODEL', value: 'Single platform, many tenants' },
          ]}
        />

        {PRODUCTS.map((p) => (
          <ProductBlock key={p.id} product={p} />
        ))}

        <section className="future-block" id="future">
          <div className="sec-head">
            <h2 className="sec-title">What's next</h2>
            <span className="sec-meta">placeholder · partner-driven</span>
          </div>
          <p className="future-body">
            The third product slot stays empty until a real partner pulls it
            through. We'd rather ship one good thing on top of AWE than three
            half-products.
          </p>
          <p className="future-body">
            If you have a candidate use case — a workflow that should be a
            product, not a one-off engagement — that's the conversation to
            have.
          </p>
          <Button to="/contact" variant="primary" arrow>
            Propose a product
          </Button>
        </section>
      </div>
    </div>
  );
}

function ProductBlock({ product: p }: { product: Product }) {
  return (
    <section
      className={`product-block${p.accent ? ' product-accent' : ''}`}
      id={p.id}
    >
      <div className="prod-banner">
        <div className="prod-banner-l">
          <div className="ref">{p.short}</div>
          <h2 className="prod-name">{p.name}</h2>
          <p className="prod-blurb">{p.blurb}</p>
          <div className="tagrow">
            {p.tags.map((t) => (
              <span key={t} className="ptag">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="prod-banner-r">
          <div className="lbl">Spec sheet</div>
          <SpecTable rows={p.spec} />
        </div>
      </div>

      <div className="feat-grid">
        {p.features.map((f) => (
          <div key={f.title} className="feat">
            <h5>{f.title}</h5>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
