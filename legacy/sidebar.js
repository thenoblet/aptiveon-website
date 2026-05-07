// Shared site nav + chrome (top bar, sidebar, footer).
// Usage: <script src="sidebar.js" data-active="home"></script>
//   data-active values: home | solutions | sol-asd | sol-aida | sol-rag | sol-wfa
//                       products | prod-awe | prod-aka | program | contact
(function () {
  const me = document.currentScript;
  const active = (me && me.dataset.active) || 'home';

  // Map active id -> highlight target on each list link
  function isActive(id) { return id === active ? ' class="active"' : ''; }

  const topbar = `
<header class="topbar">
  <div class="topbar-inner">
    <a href="Home.html" class="wordmark"><span class="glyph"></span>aptiveon</a>
    <div class="topbar-right">
      <span class="meta">v.2026.05 · last updated 2026.05.06</span>
      <a href="Contact.html" class="contact">Contact &rarr;</a>
    </div>
  </div>
</header>`;

  const sidebar = `
<aside class="sidebar" aria-label="Site index">
  <div class="sb-group">
    <div class="sb-label">00 — Overview</div>
    <ul class="sb-list">
      <li><a href="Home.html"${isActive('home')}><span>Home</span><span class="num">00</span></a></li>
    </ul>
  </div>

  <div class="sb-group">
    <div class="sb-label">01 — Solutions</div>
    <ul class="sb-list">
      <li><a href="Solutions.html"${isActive('solutions')}><span>Overview</span><span class="num">01</span></a></li>
    </ul>
    <ul class="sb-list sb-sub">
      <li><a href="Solutions.html#asd"${isActive('sol-asd')}>Applied Systems Development</a></li>
      <li><a href="Solutions.html#aida"${isActive('sol-aida')}>AI Digital Assistants</a></li>
      <li><a href="Solutions.html#rag"${isActive('sol-rag')}>RAG Knowledge Systems</a></li>
      <li><a href="Solutions.html#wfa"${isActive('sol-wfa')}>Workflow Automation</a></li>
    </ul>
  </div>

  <div class="sb-group">
    <div class="sb-label">02 — Products</div>
    <ul class="sb-list">
      <li><a href="Products.html"${isActive('products')}><span>Overview</span><span class="num">02</span></a></li>
    </ul>
    <ul class="sb-list sb-sub">
      <li><a href="Products.html#awe"${isActive('prod-awe')}>Aptiveon Workflow Engine</a></li>
      <li><a href="Products.html#aka"${isActive('prod-aka')}>Aptiveon Knowledge Assistant</a></li>
    </ul>
  </div>

  <div class="sb-group">
    <div class="sb-label">03 — Program</div>
    <ul class="sb-list">
      <li><a href="Internship.html"${isActive('program')}><span>Applied Systems Internship</span><span class="num">03</span></a></li>
    </ul>
    <ul class="sb-list sb-sub">
      <li><a href="Internship.html#how">How it works</a></li>
      <li><a href="Internship.html#projects">Project types</a></li>
      <li><a href="Internship.html#apply">Eligibility &amp; apply</a></li>
    </ul>
  </div>

  <div class="sb-group">
    <div class="sb-label">04 — Contact</div>
    <ul class="sb-list">
      <li><a href="Contact.html"${isActive('contact')}><span>Get in touch</span><span class="num">04</span></a></li>
    </ul>
  </div>
</aside>`;

  const footer = `
<footer class="foot">
  <div class="foot-mark">
    <div class="lockup">
      <span class="glyph"></span>
      <div>
        <div class="name">Aptiveon Technology</div>
        <div class="desc">Applied software systems · AI digital assistants · RAG knowledge systems · workflow automation.</div>
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
        <li><a href="Internship.html">Internship Program</a></li>
        <li><a href="Contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-wordmark">aptiveon.</div>
  <div class="foot-stamp">
    <span>© 2026 Aptiveon Technology · Singapore</span>
    <span>v.2026.05 · last updated 2026.05.06</span>
  </div>
</footer>`;

  // Insert chrome around the page's <main class="content"> ----- 
  // Convention: page body contains a <main class="content">…</main> as the
  // only meaningful child. We wrap it in our shell, prepend topbar, append footer.
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main.content');
    if (!main) return;

    // Build shell wrapper
    const shell = document.createElement('div');
    shell.className = 'shell';
    main.parentNode.insertBefore(shell, main);
    // sidebar
    const sbDiv = document.createElement('div');
    sbDiv.innerHTML = sidebar.trim();
    shell.appendChild(sbDiv.firstChild);
    shell.appendChild(main);

    // topbar at start of body
    const tb = document.createElement('div');
    tb.innerHTML = topbar.trim();
    document.body.insertBefore(tb.firstChild, document.body.firstChild);

    // footer at end of body
    const fb = document.createElement('div');
    fb.innerHTML = footer.trim();
    document.body.appendChild(fb.firstChild);
  });
})();
