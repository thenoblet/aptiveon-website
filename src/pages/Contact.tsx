import { useState, type FormEvent } from 'react';
import Crumb from '@/components/ui/Crumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Image from '@/components/ui/Image';
import Select, { type SelectOption } from '@/components/ui/Select';

const KINDS: SelectOption[] = [
  { value: 'asd', label: 'Engagement — Applied Systems Development' },
  { value: 'aida', label: 'Engagement — AI Digital Assistants' },
  { value: 'rag', label: 'Engagement — RAG Knowledge Systems' },
  { value: 'wfa', label: 'Engagement — Workflow Automation' },
  { value: 'awe', label: 'Product — Workflow Engine partnership' },
  { value: 'aka', label: 'Product — Knowledge Assistant pilot' },
  { value: 'internship', label: 'Internship application' },
  { value: 'other', label: 'Something else' },
];

export default function Contact() {
  return (
    <>
      <Crumb current="contact" />

      <PageHero
        title={
          <>
            Send the <span className="mark">constraint</span>, not the wishlist.
          </>
        }
        dek="We prefer a written exchange to a discovery call. Tell us what you're trying to build, what's actually blocking you, and we'll write back with a take and a rough shape — usually within two business days."
        meta={[
          { label: 'RESPONSE', value: '≤ 2 business days' },
          { label: 'FORMAT', value: 'Written first, call later' },
          { label: 'LOCATION', value: 'Singapore · GMT+8' },
          { label: 'STATUS', value: 'Open for partner pilots' },
        ]}
      />

      <Section title="Get in touch" meta="one form, one inbox" id="form">
        <div className="formgrid">
          <ContactForm />
          <aside className="form-r">
            <div className="lbl">WHAT TO INCLUDE</div>
            <p>The more specific you are, the better the reply.</p>
            <h4>Shape</h4>
            <p>What's the system at a high level? Who uses it? What does it do for them?</p>
            <h4>Data</h4>
            <p>What data is involved? Where does it live? What's sensitive?</p>
            <h4>Constraint</h4>
            <p>What's the hard part? Time, integration, accuracy, trust, cost — name it.</p>
            <h4>Stakes</h4>
            <p>What changes if this works? What changes if it doesn't?</p>
            <p
              style={{
                marginTop: 'var(--space-5)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-fg-mute)',
              }}
            >
              — A two-paragraph note beats a three-page brief.
            </p>
          </aside>
        </div>

        <div className="channels">
          <div>
            <h4>DIRECT</h4>
            <h5>For organizations</h5>
            <p>If you'd rather skip the form, the inbox is read by the founding team.</p>
            <a href="mailto:contact@aptiveon.com">contact@aptiveon.com →</a>
          </div>
          <div>
            <h4>STUDENTS</h4>
            <h5>For internship applicants</h5>
            <p>Apply directly with a short note about what you've built and want to build next.</p>
            <a href="mailto:apply@aptiveon.com">apply@aptiveon.com →</a>
          </div>
        </div>

        <Image src="contact_loc" alt="singapore · GMT+8" className="contact-loc" />
      </Section>
    </>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [kind, setKind] = useState(KINDS[0].value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: in production this would POST to a real handler.
    setSubmitted(true);
  };

  return (
    <form className="form-l" onSubmit={handleSubmit}>
      <label htmlFor="f-name">Your name</label>
      <input id="f-name" name="name" type="text" placeholder="e.g. Lin Wei" required />

      <label htmlFor="f-email">Email</label>
      <input id="f-email" name="email" type="email" placeholder="you@company.com" required />

      <label htmlFor="f-org">Organization (optional)</label>
      <input id="f-org" name="org" type="text" placeholder="Company / school / project" />

      <label id="f-kind-label" htmlFor="f-kind">
        What's this about?
      </label>
      <Select
        id="f-kind"
        name="kind"
        aria-labelledby="f-kind-label"
        options={KINDS}
        value={kind}
        onChange={setKind}
      />

      <label htmlFor="f-msg">The constraint</label>
      <textarea
        id="f-msg"
        name="msg"
        placeholder="What are you trying to build? What's actually blocking you? What does success look like in three months?"
        required
      />

      <button type="submit" disabled={submitted}>
        {submitted ? "Sent — we'll reply within 2 days" : 'Send →'}
      </button>
    </form>
  );
}
