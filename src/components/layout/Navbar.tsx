import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/products' },
  { label: 'Customers', to: '/customers' },
  { label: 'Internship', to: '/internship' },
] as const;

export default function Navbar() {
  const { key } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Translucent → opaque transition when the page has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer on every route change.
  useEffect(() => {
    setDrawerOpen(false);
  }, [key]);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Link to="/" className="nav-brand" aria-label="Aptiveon home">
          <span className="nav-glyph" aria-hidden="true" />
          <span className="wordmark">
            aptiveon<span className="dot-end">.</span>
          </span>
        </Link>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-cta-row">
          <Link to="/contact" className="btn btn-tiny">
            Talk to sales →
          </Link>
        </div>

        <button
          type="button"
          className="nav-hamburger"
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    else if (!open && dlg.open) dlg.close();
  }, [open]);

  return (
    <dialog ref={ref} className="mobile-nav" onClose={onClose}>
      <header className="mobile-nav-head">
        <Link to="/" className="nav-brand" aria-label="Aptiveon home">
          <span className="nav-glyph" aria-hidden="true" />
          <span className="wordmark">
            aptiveon<span className="dot-end">.</span>
          </span>
        </Link>
        <button
          type="button"
          className="mobile-nav-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </header>

      <div className="mobile-nav-body">
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="mobile-nav-link">
            {l.label}
          </Link>
        ))}
      </div>

      <div className="mobile-nav-foot">
        <Link to="/contact" className="btn btn-primary">
          Talk to sales →
        </Link>
      </div>
    </dialog>
  );
}
