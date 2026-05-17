import { Link } from 'react-router-dom';
import { useReveal } from '@/hooks/useReveal';

const SOLUTIONS = [
  { label: 'Applied Systems Development', to: '/solutions#asd' },
  { label: 'AI Digital Assistants', to: '/solutions#aida' },
  { label: 'RAG Knowledge Systems', to: '/solutions#rag' },
  { label: 'Workflow Automation', to: '/solutions#wfa' },
];
const PRODUCTS = [
  { label: 'Workflow Engine', to: '/products#awe' },
  { label: 'Knowledge Assistant', to: '/products#aka' },
];
const COMPANY = [
  { label: 'Customers', to: '/customers' },
  { label: 'Internship', to: '/internship' },
  { label: 'Talk to sales', to: '/contact' },
];

export default function Footer() {
  const wordmarkRef = useReveal<HTMLDivElement>(0.4);
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="foot-mark">
        <div className="foot-lockup">
          <span className="foot-glyph" aria-hidden="true" />
          <div>
            <div className="foot-name">Aptiveon Technology</div>
            <div className="foot-desc">
              Applied AI infrastructure · workflow automation · retrieval systems for regulated
              operations.
            </div>
          </div>
        </div>

        <div className="foot-col">
          <h4>SOLUTIONS</h4>
          <ul>
            {SOLUTIONS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="foot-col">
          <h4>PRODUCTS</h4>
          <ul>
            {PRODUCTS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="foot-col">
          <h4>COMPANY</h4>
          <ul>
            {COMPANY.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={wordmarkRef} className="foot-wordmark" aria-label="aptiveon">
        {Array.from('aptiveon.').map((ch, i) => (
          <span key={i} className="ltr" data-char={ch} aria-hidden="true">
            {ch}
          </span>
        ))}
      </div>

      <div className="foot-stamp">
        <span>© {year} Aptiveon Technology</span>
        <span>Singapore · London · NYC</span>
      </div>
    </footer>
  );
}
