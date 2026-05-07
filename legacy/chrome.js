// Top-nav chrome + footer. Replaces sidebar.js.
// <script src="chrome.js" data-active="home|solutions|products|program|contact"></script>
(function () {
  const me = document.currentScript;
  const active = (me && me.dataset.active) || 'home';
  const a = (id) => id === active ? ' active' : '';

  const navbar = `
<header class="navbar">
  <div class="navbar-inner">
    <a href="Home.html" class="wordmark"><span class="glyph"></span>aptiveon</a>
    <nav class="navlinks">
      <div class="has-menu${a('solutions')}">
        <a href="Solutions.html">Solutions <span class="caret">▾</span></a>
        <div class="menu" role="menu">
          <div class="menu-grid">
            <a class="menu-item" href="Solutions.html#asd">
              <span class="ref">01.1 · ASD</span>
              <span class="name">Applied Systems Development</span>
              <div class="desc">Internal tools, pipelines, the parts that aren't glamorous.</div>
            </a>
            <a class="menu-item" href="Solutions.html#aida">
              <span class="ref">01.2 · AIDA</span>
              <span class="name">AI Digital Assistants</span>
              <div class="desc">Assistants scoped to a real role, with guardrails.</div>
            </a>
            <a class="menu-item" href="Solutions.html#rag">
              <span class="ref">01.3 · RAG</span>
              <span class="name">RAG Knowledge Systems</span>
              <div class="desc">Retrieval pipelines with citations &amp; evals.</div>
            </a>
            <a class="menu-item" href="Solutions.html#wfa">
              <span class="ref">01.4 · WFA</span>
              <span class="name">Workflow Automation</span>
              <div class="desc">Coordination with human review where it matters.</div>
            </a>
          </div>
          <div class="menu-foot">
            <span>4 practice areas · same spec sheet on each</span>
            <a href="Solutions.html">All solutions →</a>
          </div>
        </div>
      </div>

      <div class="has-menu${a('products')}">
        <a href="Products.html">Products <span class="caret">▾</span></a>
        <div class="menu" role="menu">
          <div class="menu-grid">
            <a class="menu-item" href="Products.html#awe">
              <span class="ref">02.1 · AWE</span>
              <span class="name">Aptiveon Workflow Engine</span>
              <div class="desc">Platform — orchestration, retrieval, integrations, review.</div>
            </a>
            <a class="menu-item" href="Products.html#aka">
              <span class="ref">02.2 · AKA</span>
              <span class="name">Knowledge Assistant</span>
              <div class="desc">Grounded Q&amp;A over your own documents.</div>
            </a>
          </div>
          <div class="menu-foot">
            <span>Platform first · products as tenants</span>
            <a href="Products.html">All products →</a>
          </div>
        </div>
      </div>

      <a href="Customers.html"${a('customers')}>Customers</a>
      <a href="Internship.html"${a('program')}>Internship</a>
    </nav>
    <div class="nav-right">
      <span class="meta">v.2026.05</span>
      <a href="Contact.html" class="cta">Talk to sales →</a>
    </div>
  </div>
</header>`;

  const footer = `
<footer class="foot">
  <div class="foot-mark">
    <div class="lockup">
      <span class="glyph"></span>
      <div>
        <div class="name">Aptiveon Technology</div>
        <div class="desc">Applied AI infrastructure · workflow automation · retrieval systems for regulated operations.</div>
      </div>
    </div>
    <div>
      <h4>SOLUTIONS</h4>
      <ul>
        <li><a href="Solutions.html#asd">Applied Systems Development</a></li>
        <li><a href="Solutions.html#aida">AI Digital Assistants</a></li>
        <li><a href="Solutions.html#rag">RAG Knowledge Systems</a></li>
        <li><a href="Solutions.html#wfa">Workflow Automation</a></li>
      </ul>
    </div>
    <div>
      <h4>PRODUCTS</h4>
      <ul>
        <li><a href="Products.html#awe">Workflow Engine</a></li>
        <li><a href="Products.html#aka">Knowledge Assistant</a></li>
      </ul>
    </div>
    <div>
      <h4>COMPANY</h4>
      <ul>
        <li><a href="Internship.html">Internship</a></li>
        <li><a href="Contact.html">Contact</a></li>
        <li><a href="Contact.html">Talk to sales</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-wordmark">aptiveon.</div>
  <div class="foot-stamp">
    <span>© 2026 Aptiveon Technology · Singapore · Singapore · London · NYC</span>
    <span>v.2026.05 · last updated 2026.05.06</span>
  </div>
</footer>`;

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main.content');
    if (!main) return;
    // Strip any pre-existing sidebar/topbar from older pages
    document.querySelectorAll('.topbar, aside.sidebar, footer.foot, .navbar').forEach(n => n.remove());
    // Insert navbar at top
    const tb = document.createElement('div'); tb.innerHTML = navbar.trim();
    document.body.insertBefore(tb.firstChild, document.body.firstChild);
    // Insert footer at end
    const fb = document.createElement('div'); fb.innerHTML = footer.trim();
    document.body.appendChild(fb.firstChild);
  });
})();
