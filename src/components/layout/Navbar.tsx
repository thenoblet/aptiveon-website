import { Link, NavLink, useLocation } from 'react-router-dom';

interface SubItem {
  ref: string;
  name: string;
  desc: string;
  to: string;
}

const SOLUTION_ITEMS: SubItem[] = [
  {
    ref: 'ASD',
    name: 'Applied Systems Development',
    desc: "Internal tools, pipelines, the parts that aren't glamorous.",
    to: '/solutions#asd',
  },
  {
    ref: 'AIDA',
    name: 'AI Digital Assistants',
    desc: 'Assistants scoped to a real role, with guardrails.',
    to: '/solutions#aida',
  },
  {
    ref: 'RAG',
    name: 'RAG Knowledge Systems',
    desc: 'Retrieval pipelines with citations & evals.',
    to: '/solutions#rag',
  },
  {
    ref: 'WFA',
    name: 'Workflow Automation',
    desc: 'Coordination with human review where it matters.',
    to: '/solutions#wfa',
  },
];

const PRODUCT_ITEMS: SubItem[] = [
  {
    ref: 'AWE',
    name: 'Aptiveon Workflow Engine',
    desc: 'Platform — orchestration, retrieval, integrations, review.',
    to: '/products#awe',
  },
  {
    ref: 'AKA',
    name: 'Knowledge Assistant',
    desc: 'Grounded Q&A over your own documents.',
    to: '/products#aka',
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const isSolutions = pathname.startsWith('/solutions');
  const isProducts = pathname.startsWith('/products');

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="wordmark">
          <span className="glyph" />
          aptiveon
        </Link>

        <nav className="navlinks">
          <NavGroup
            label="Solutions"
            to="/solutions"
            active={isSolutions}
            items={SOLUTION_ITEMS}
            footMsg="4 practice areas · same spec sheet on each"
            footHref="/solutions"
            footLabel="All solutions →"
          />
          <NavGroup
            label="Products"
            to="/products"
            active={isProducts}
            items={PRODUCT_ITEMS}
            footMsg="Platform first · products as tenants"
            footHref="/products"
            footLabel="All products →"
          />
          <NavLink to="/customers" className={navLinkClass}>
            Customers
          </NavLink>
          <NavLink to="/internship" className={navLinkClass}>
            Internship
          </NavLink>
        </nav>

        <div className="nav-right">
          <Link to="/contact" className="cta-link">
            Talk to sales →
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavGroup({
  label,
  to,
  active,
  items,
  footMsg,
  footHref,
  footLabel,
}: {
  label: string;
  to: string;
  active: boolean;
  items: SubItem[];
  footMsg: string;
  footHref: string;
  footLabel: string;
}) {
  return (
    <div className={`has-menu ${active ? 'active' : ''}`}>
      <Link to={to} className="menu-trigger">
        {label} <span className="caret">▾</span>
      </Link>
      <div className="menu" role="menu">
        <div className="menu-grid">
          {items.map((it) => (
            <Link key={it.to} className="menu-item" to={it.to}>
              <span className="ref">{it.ref}</span>
              <span className="name">{it.name}</span>
              <div className="desc">{it.desc}</div>
            </Link>
          ))}
        </div>
        <div className="menu-foot">
          <span>{footMsg}</span>
          <Link to={footHref}>{footLabel}</Link>
        </div>
      </div>
    </div>
  );
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `nav-link ${isActive ? 'active' : ''}`;
}
