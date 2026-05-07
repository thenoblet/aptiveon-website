import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-mark">
        <div className="lockup">
          <span className="glyph" />
          <div>
            <div className="name">Aptiveon Technology</div>
            <div className="desc">
              Applied AI infrastructure · workflow automation · retrieval systems for regulated
              operations.
            </div>
          </div>
        </div>
        <div>
          <h4>SOLUTIONS</h4>
          <ul>
            <li>
              <Link to="/solutions#asd">Applied Systems Development</Link>
            </li>
            <li>
              <Link to="/solutions#aida">AI Digital Assistants</Link>
            </li>
            <li>
              <Link to="/solutions#rag">RAG Knowledge Systems</Link>
            </li>
            <li>
              <Link to="/solutions#wfa">Workflow Automation</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>PRODUCTS</h4>
          <ul>
            <li>
              <Link to="/products#awe">Workflow Engine</Link>
            </li>
            <li>
              <Link to="/products#aka">Knowledge Assistant</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>COMPANY</h4>
          <ul>
            <li>
              <Link to="/internship">Internship</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/contact">Talk to sales</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-wordmark" aria-label="aptiveon">
        {Array.from('aptiveon.').map((ch, i) => (
          <span key={i} className="ltr" data-char={ch} aria-hidden="true">
            {ch}
          </span>
        ))}
      </div>
      <div className="foot-stamp">
        <span>© 2026 Aptiveon Technology</span>
        <span>Singapore · London · NYC</span>
      </div>
    </footer>
  );
}
