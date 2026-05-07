import { useState, type FormEvent } from 'react';
import Crumb from '@/components/ui/Crumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SpecTable from '@/components/ui/SpecTable';
import Image from '@/components/ui/Image';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface Phase {
  num: string;
  title: string;
  weeks: string;
  body: string;
}

interface ProjectType {
  tag: string;
  title: string;
  body: string;
  example: string;
}

const PHASES: Phase[] = [
  {
    num: 'DESIGN',
    title: 'Scope & design',
    weeks: 'weeks 1–2',
    body: 'Pick a real problem with a real user. Write a one-page spec. Argue it with your mentor.',
  },
  {
    num: 'BUILD',
    title: 'Build',
    weeks: 'weeks 3–10',
    body: 'Ship the system. Weekly demos, code review, paired sessions on the hard parts.',
  },
  {
    num: 'DEPLOY',
    title: 'Deploy & observe',
    weeks: 'weeks 10–14',
    body: 'Put it in front of the real user. Watch it. Fix what breaks. Measure what matters.',
  },
  {
    num: 'WRITE',
    title: 'Write it up',
    weeks: 'weeks 14–16',
    body: "A public-quality writeup of what you built, why, and what you'd do differently.",
  },
];

const PROJECT_TYPES: ProjectType[] = [
  {
    tag: 'TYPE · ASSISTANT',
    title: 'A digital assistant for a real role',
    body: 'Pick a role, sit with someone in it for a day, build the assistant they actually need. Cite everything.',
    example: 'e.g. SOP assistant for ops · drafting tool for a writer · triage for a support queue',
  },
  {
    tag: 'TYPE · RAG',
    title: 'A retrieval pipeline + eval harness',
    body: 'Build a grounded Q&A system over a real corpus. Write the evals. Beat your own baseline twice.',
    example: 'e.g. policy Q&A · technical-docs assistant · academic-paper retrieval',
  },
  {
    tag: 'TYPE · WORKFLOW',
    title: 'An automation with human review',
    body: 'Take a manual workflow, automate the easy 80%, route the hard 20% to a human. Audit every run.',
    example: 'e.g. invoice extraction · doc routing · cross-system reconciliation',
  },
  {
    tag: 'TYPE · APPLIED SYSTEMS',
    title: 'An internal tool that replaces a spreadsheet',
    body: 'Find a spreadsheet that ought to be a system. Build the system. Keep it boring.',
    example: 'e.g. ops dashboard · admin tool · partner intake portal',
  },
];

export default function Internship() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <>
      <Crumb current="internship" />

      <PageHero
        title={
          <>
            Real systems, <span className="mark">not</span> tiny tasks.
          </>
        }
        dek="The Applied Systems Internship is for first- and second-year students who want to build real software under engineering mentorship. Each intern ships at least one system that goes into production with a real user on the other end."
        meta={[
          { label: 'COHORT', value: '02 · 2026' },
          { label: 'LENGTH', value: '12–16 weeks' },
          { label: 'STIPEND', value: 'Yes' },
          { label: 'STATUS', value: 'Applications open' },
        ]}
      />

      <Section title="How it works" meta="4 phases · 12–16 weeks" id="how">
        <Image
          src="intern_strip"
          alt="cohort 01 · build week 06"
          className="intern-photo-plate"
        />
        <p>
          One project per intern, end-to-end. You design it with a mentor, build it, put it in
          front of a real user, and write up what you learned.
        </p>
        <div className="phases">
          {PHASES.map((p) => (
            <div key={p.num} className="phase">
              <div className="ph-num">{p.num}</div>
              <h4>{p.title}</h4>
              <div className="wks">{p.weeks}</div>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Project types" meta="pick one, scope it down" id="projects">
        <Image
          src="intern_b"
          alt="pair · review"
          density="extra"
          className="intern-photo-plate"
        />
        <p>
          Every intern project lands in one of these four buckets. The exact problem changes by
          cohort and partner — these are the shapes.
        </p>
        <div className="ptypes" style={{ marginTop: 'var(--space-4)' }}>
          {PROJECT_TYPES.map((t) => (
            <div key={t.tag} className="ptype">
              <div className="tg">{t.tag}</div>
              <h4>{t.title}</h4>
              <p>{t.body}</p>
              <div className="ex">{t.example}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Eligibility & apply" meta="cohort 02 — applications open" id="apply">
        <div className="applybox">
          <div>
            <h3>Show us what you've built.</h3>
            <p>
              A half-finished side project, a Github repo, a writeup of something that didn't work
              — any of those beats a polished resume. We want evidence that you make things, not
              evidence that you study things.
            </p>
            <p>
              Send a short note: what you've built, what you'd want to build with us, and one
              technical thing you've recently changed your mind about.
            </p>
            <button type="button" className="applycta" onClick={() => setApplyOpen(true)}>
              Apply for cohort 02 →
            </button>
          </div>
          <div>
            <SpecTable
              rows={[
                { label: 'Eligibility', value: '1st & 2nd year undergraduates' },
                { label: 'Time', value: '12–16 weeks · full or part time' },
                { label: 'Format', value: 'Project-based, mentored' },
                { label: 'Output', value: 'Shipped system + writeup' },
                { label: 'Stipend', value: 'Yes' },
                { label: 'Apply by', value: '2026.06.30' },
              ]}
            />
          </div>
        </div>
      </Section>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — same fake-send behaviour as the contact form.
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset for next open after the close animation finishes.
    setTimeout(() => setSubmitted(false), 250);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Apply for cohort 02">
      {submitted ? (
        <div className="apply-sent">
          <p>Thanks — we'll write back within two business days.</p>
          <div className="actions">
            <Button onClick={handleClose} variant="ghost">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form className="apply-form" onSubmit={handleSubmit}>
          <p className="apply-intro">
            Tell us what you've built, what you'd want to build with us, and one technical thing
            you've recently changed your mind about.
          </p>

          <label htmlFor="apply-name">Your name</label>
          <input id="apply-name" name="name" type="text" required autoFocus />

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
            <span className="help">A two-paragraph note beats a three-page brief.</span>
            <Button type="submit" variant="primary" arrow>
              Send
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
