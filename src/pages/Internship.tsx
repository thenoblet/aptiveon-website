import { useState, type FormEvent } from 'react';
import Crumb from '@/components/ui/Crumb';
import SpecTable from '@/components/ui/SpecTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ProjectType {
  type: string;
  title: string;
  desc: string;
  example: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    type: 'ASSISTANT',
    title: 'A digital assistant for a real role',
    desc: 'Pick a role, sit with someone in it for a day, build the assistant they actually need. Cite everything.',
    example:
      'e.g. SOP assistant for ops · drafting tool for a writer · triage for a support queue',
  },
  {
    type: 'RAG',
    title: 'A retrieval pipeline + eval harness',
    desc: 'Build a grounded Q&A system over a real corpus, evaluation harness included. Accuracy is measurable.',
    example: 'e.g. policy Q&A · technical-document search with citations',
  },
  {
    type: 'WORKFLOW',
    title: 'An automation with human review',
    desc: 'Make a workflow automation. Do the dirty 80%, route the hard 20% to a human. Audit every run.',
    example:
      'e.g. invoice extraction · doc routing · case-system reconciliation',
  },
  {
    type: 'APPLIED SYSTEMS',
    title: 'An internal tool that replaces an email',
    desc: "Find a spreadsheet that ought to be a system. Build the system. No dashboards — something that's used.",
    example:
      'e.g. headcount tracker · asset tracker · on-call schedule with escalation',
  },
];

const ELIGIBILITY = [
  { label: 'Year', value: '1st & 2nd year undergrad' },
  { label: 'Time', value: '12–16 weeks · full or part time' },
  { label: 'Format', value: 'Project-based, mentored' },
  { label: 'Output', value: 'Shipped system + write-up' },
  { label: 'LLM-paired', value: 'Yes' },
  { label: 'Apply by', value: '2026.05.30' },
];

const COHORT_PORTRAITS = [
  { p: 'women/44', n: 'Sarah Chen' },
  { p: 'men/19', n: 'Liam Park' },
  { p: 'women/25', n: 'Aisha Torres' },
  { p: 'men/22', n: 'Ryan Torres' },
  { p: 'men/7', n: 'James Okafor' },
  { p: 'women/9', n: 'Elara Kim' },
];

export default function Internship() {
  const [applyOpen, setApplyOpen] = useState(false);
  const handleApply = () => setApplyOpen(true);

  return (
    <div className="page-main">
      <div className="page-wrap">
        <Crumb current="internship" />
      </div>

      <InternshipHero onApply={handleApply} />
      <CohortPhoto />
      <ProjectTypes />
      <EligibilityApply onApply={handleApply} />

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

function InternshipHero({ onApply }: { onApply: () => void }) {
  return (
    <section className="ip-hero" id="top">
      <div className="wrap">
        <div className="ip-eyebrow-row">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Applied Systems Program
          </span>
        </div>
        <h1 className="ip-title">
          Build something
          <br />
          that actually <em>runs.</em>
        </h1>
        <p className="ip-desc">
          Aptiveon's internship program puts you on real systems used by
          enterprise clients. Ship to production in week one. Work alongside
          senior engineers on workflows that people depend on Monday morning.
        </p>
        <div className="ip-actions">
          <button type="button" onClick={onApply} className="btn btn-primary">
            Apply for cohort 02 <span className="arr">→</span>
          </button>
          <a href="#project-types" className="btn btn-ghost">
            ▸ See project types
          </a>
        </div>
      </div>
    </section>
  );
}

function CohortPhoto() {
  return (
    <section className="cohort-photo-section">
      <div className="wrap">
        <figure className="cohort-photo-frame">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85&auto=format&fit=crop"
            alt="Cohort 01 team working together"
            className="cohort-photo"
            loading="lazy"
          />
          <figcaption className="cohort-photo-caption">
            <span className="num">01</span>
            <span>Cohort 01 — Singapore, 2025</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ProjectTypes() {
  return (
    <section className="ip-section" id="project-types">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Project types
              </span>
            </div>
            <h2>
              Every intern project lands in
              <br />
              <em>one of these four buckets.</em>
            </h2>
          </div>
          <p>
            The exact problem changes by cohort and partner — these are the
            shapes. Real work, real deliverables, real users on the other side.
          </p>
        </div>

        <div className="proj-grid">
          {PROJECT_TYPES.map((p, i) => (
            <article key={p.type} className="proj-card">
              <div className="proj-num">0{i + 1} / 04</div>
              <div className="proj-label">Type · {p.type}</div>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <p className="proj-example">{p.example}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EligibilityApply({ onApply }: { onApply: () => void }) {
  return (
    <section className="ip-section eligibility-section" id="apply">
      <div className="wrap">
        <div className="elig-grid">
          <div className="elig-left">
            <div className="eyebrow-row">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Eligibility & apply
              </span>
            </div>
            <h2 className="elig-title">
              Show us what
              <br />
              <em>you've built.</em>
            </h2>
            <p className="elig-desc">
              A half-finished side project, a GitHub repo, a writeup of
              something that didn't work — any of those beats a polished
              resume. We want evidence that you make things, not evidence
              that you study things.
            </p>
            <p className="elig-note">
              Send a short note: what you've built, what you'd want to build
              with us, and one technical thing you've recently changed your
              mind about.
            </p>
            <button type="button" onClick={onApply} className="btn btn-primary">
              Apply for cohort 02 <span className="arr">→</span>
            </button>
          </div>

          <div className="elig-right">
            <SpecTable rows={ELIGIBILITY} className="elig-spec" />

            <div className="cohort-avs">
              {COHORT_PORTRAITS.map((p) => (
                <span key={p.p} className="cohort-av">
                  <img
                    src={`https://randomuser.me/api/portraits/${p.p}.jpg`}
                    alt={p.n}
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
            <p className="cohort-label">
              Cohort 01 — 6 engineers shipped to production
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend — placeholder confirmation state.
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 250);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Tell us what you've built">
      {submitted ? (
        <div className="apply-sent">
          <p>
            Thanks{name ? `, ${name}` : ''} — we've got your application.
          </p>
          <p>
            We read every submission. Expect a short reply within 5 business
            days, even if it's a no.
          </p>
          <div className="actions">
            <Button onClick={handleClose} variant="ghost">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form className="apply-form" onSubmit={handleSubmit}>
          <p className="apply-intro">
            A half-finished side project beats a polished resume. Tell us what
            you've built, what you'd want to build with us, and one technical
            thing you've recently changed your mind about.
          </p>

          <label htmlFor="apply-name">Your name</label>
          <input
            id="apply-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />

          <label htmlFor="apply-email">Email</label>
          <input id="apply-email" name="email" type="email" required />

          <label htmlFor="apply-link">Link to your work (optional)</label>
          <input
            id="apply-link"
            name="link"
            type="url"
            placeholder="github.com/you · portfolio · writeup"
          />

          <label htmlFor="apply-note">Short note</label>
          <textarea id="apply-note" name="note" required rows={6} />

          <div className="submit-row">
            <span className="help">
              We reply to every applicant · No coding challenges · No GPA
              filter
            </span>
            <Button type="submit" variant="primary" arrow>
              Send
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
