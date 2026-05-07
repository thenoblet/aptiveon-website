/* ─────────────────────────────────────────────────────────────────
   APTIVEON · imagery.js
   Adds curated photographic imagery to every page in a way that
   matches the warm-paper / oxide aesthetic. Treatment + density
   are user-tweakable and persisted in localStorage so the choice
   carries across pages.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── 1.  curated photography ──────────────────────────────────────
     Unsplash CDN URLs. Each one was chosen for warm/muted tones,
     editorial feel, and subject-fit. We resize via the Unsplash
     `?w=&q=&auto=format&fit=crop` query so we don't hit huge files. */
  const U = (id, w = 1200, q = 78) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

  const IMG = {
    /* hero collage — operations / quiet office moments */
    hero_a:    U('1554224155-6726b3ff858f', 900),  // ledger / hands at notebook
    hero_b:    U('1518770660439-4636190af475', 900),  // circuit board, warm
    hero_c:    U('1521737604893-d14cc237f11d', 900),  // two people reviewing screen
    hero_d:    U('1454165804606-c3d57bc86b40', 900),  // analyst at desk, paper

    /* customer / quote portrait — Priya Raman, Head of Compliance */
    quote_portrait: U('1573496359142-b8d87734a5a2', 720), // woman, neutral office
    /* alt portraits if user wants variety */
    quote_alt_a:    U('1494790108377-be9c29b29330', 720),
    quote_alt_b:    U('1580489944761-15a19d654956', 720),

    /* internship strip — students at laptops, real */
    intern_strip:  U('1522202176988-66273c2fd55f', 1400), // students collab
    intern_b:      U('1517245386807-bb43f82c33c4', 1200), // paired at screens
    intern_c:      U('1531482615713-2afd69097998', 1200), // single student, focused

    /* CTA backdrop — dark architectural / data center */
    cta_back:      U('1551434678-e076c223a692', 1800),

    /* solutions — one image per practice area */
    sol_asd:   U('1517048676732-d65bc937f952', 1400), // monitors / engineering
    sol_aida:  U('1531403009284-440f080d1e12', 1400), // person at laptop, soft light
    sol_rag:   U('1481627834876-b7833e8f5570', 1400), // archive / library shelves
    sol_wfa:   U('1497366754035-f200968a6e72', 1400), // open office, organized

    /* products — platform = infra; assistant = human + screen */
    prod_awe:  U('1558494949-ef010cbdcc31', 1400),    // server rack, warm
    prod_aka:  U('1573496359142-b8d87734a5a2', 1400), // analyst on laptop

    /* contact — singapore skyline, muted */
    contact_loc: U('1533628635777-112b2239b1c7', 1400),

    /* abstract textures (optional alt mode) */
    abs_paper: U('1517816743773-6e0fd518b4a6', 1400),  // texture, paper
    abs_grain: U('1505740420928-5e560c06d30e', 1400),  // dust / grain
  };

  /* ── 2.  tweak state ──────────────────────────────────────────── */
  const KEY = 'aptiveon.imagery.v1';
  const DEFAULTS = {
    enabled: true,
    treatment: 'duotone',  // duotone | mute | full | grain
    density: 'balanced',   // sparse | balanced | rich
    grain: true,
  };
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...DEFAULTS };
      return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch (e) {
      return { ...DEFAULTS };
    }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  let state = load();

  /* ── 3.  image element factory ──────────────────────────────── */
  function imgEl(src, alt) {
    const el = document.createElement('div');
    el.className = 'apt-img';
    el.dataset.alt = alt || '';
    el.style.backgroundImage = `url("${src}")`;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', alt || '');
    // overlay for treatments
    const fx = document.createElement('div');
    fx.className = 'apt-img-fx';
    el.appendChild(fx);
    if (state.grain) {
      const g = document.createElement('div');
      g.className = 'apt-img-grain';
      el.appendChild(g);
    }
    // caption
    if (alt) {
      const c = document.createElement('div');
      c.className = 'apt-img-cap';
      c.textContent = alt;
      el.appendChild(c);
    }
    return el;
  }

  /* ── 4.  CSS ─────────────────────────────────────────────────── */
  const css = `
  .apt-img {
    position: relative;
    background-size: cover;
    background-position: center;
    background-color: var(--ink-2);
    overflow: hidden;
    isolation: isolate;
    transition: filter .35s ease;
  }
  .apt-img-fx {
    position: absolute; inset: 0; pointer-events: none;
    mix-blend-mode: normal;
    z-index: 1;
    transition: opacity .35s ease;
  }
  .apt-img-grain {
    position: absolute; inset: 0; pointer-events: none;
    z-index: 2; opacity: 0.18;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>");
    mix-blend-mode: multiply;
  }
  .apt-img-cap {
    position: absolute; left: 12px; bottom: 10px; z-index: 3;
    font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.04em;
    color: rgba(242,238,227,0.85);
    text-transform: lowercase;
    background: rgba(20,20,19,0.55);
    padding: 4px 8px;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  /* ── treatment: duotone (oxide + ink) ── */
  body[data-img-treatment="duotone"] .apt-img {
    filter: grayscale(1) contrast(1.05);
    background-color: #141413;
  }
  body[data-img-treatment="duotone"] .apt-img:hover {
    filter: grayscale(0) contrast(1.02) saturate(1.05);
  }
  body[data-img-treatment="duotone"] .apt-img::before {
    content: ""; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(135deg, rgba(255,91,31,0.55), rgba(31,58,138,0.45));
    mix-blend-mode: screen;
    pointer-events: none;
    transition: opacity .35s ease;
  }
  body[data-img-treatment="duotone"] .apt-img:hover::before { opacity: 0; }
  body[data-img-treatment="duotone"] .apt-img::after {
    content: ""; position: absolute; inset: 0; z-index: 1;
    background: rgba(20,20,19,0.35);
    mix-blend-mode: multiply;
    pointer-events: none;
    transition: opacity .35s ease;
  }
  body[data-img-treatment="duotone"] .apt-img:hover::after { opacity: 0; }

  /* ── treatment: mute (warm desaturation) ── */
  body[data-img-treatment="mute"] .apt-img {
    filter: saturate(0.55) contrast(0.95) brightness(0.96) sepia(0.18);
  }
  body[data-img-treatment="mute"] .apt-img:hover {
    filter: saturate(1) contrast(1) brightness(1) sepia(0);
  }
  body[data-img-treatment="mute"] .apt-img::after {
    content: ""; position: absolute; inset: 0; z-index: 1;
    background: rgba(242,238,227,0.10);
    pointer-events: none;
    transition: opacity .35s ease;
  }
  body[data-img-treatment="mute"] .apt-img:hover::after { opacity: 0; }

  /* ── treatment: full (real color, no overlay) ── */
  body[data-img-treatment="full"] .apt-img {
    filter: saturate(0.92) contrast(1.02);
  }
  body[data-img-treatment="full"] .apt-img:hover {
    filter: saturate(1.08) contrast(1.04);
  }

  /* ── treatment: grain-only (B&W + heavy grain) ── */
  body[data-img-treatment="grain"] .apt-img {
    filter: grayscale(1) contrast(1.08) brightness(1.02);
  }
  body[data-img-treatment="grain"] .apt-img:hover {
    filter: grayscale(0) contrast(1.04) brightness(1);
  }
  body[data-img-treatment="grain"] .apt-img-grain { opacity: 0.42; transition: opacity .35s ease; }
  body[data-img-treatment="grain"] .apt-img:hover .apt-img-grain { opacity: 0.18; }

  /* density toggles via class on body */
  body[data-img-density="sparse"] .apt-img-density-extra { display: none; }
  body[data-img-density="sparse"] .apt-img-density-rich  { display: none; }
  body[data-img-density="balanced"] .apt-img-density-rich { display: none; }

  body[data-img-enabled="false"] .apt-img,
  body[data-img-enabled="false"] .apt-img-block { display: none !important; }

  /* ── slot-specific styling ── */

  /* Hero collage on Home */
  /* Hero collage on Home — sits ABOVE the headline, full-width strip */
  .hero-imgs {
    position: relative;
    width: 100%;
    height: 240px;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 6px;
    margin-bottom: 32px;
    pointer-events: none;
    z-index: 2;
    opacity: 0; transform: translateY(20px);
    animation: heroImgsIn 1.2s cubic-bezier(.2,.7,.2,1) .4s forwards;
  }
  .hero-imgs .apt-img {
    width: 100%; height: 100%;
    border: 1px solid rgba(20,20,19,0.12);
    pointer-events: none;
  }
  @keyframes heroImgsIn { to { opacity: 1; transform: none; } }
  @media (max-width: 700px) {
    .hero-imgs { height: 160px; gap: 4px; }
  }

  /* Section-band images */
  .apt-band {
    width: 100%;
    height: 280px;
    margin: 28px 0 0;
    border: 1px solid var(--rule);
  }
  .apt-band.tall { height: 380px; }

  /* Quote portrait */
  .quote .who .portrait {
    width: 100%;
    aspect-ratio: 4 / 5;
    margin-bottom: 14px;
    border: 1px solid var(--rule);
  }

  /* Internship strip — replaces flat strip with photo on the side */
  .intern.with-img .row { align-items: stretch; }
  .intern.with-img {
    padding: 0; border-bottom: 1px solid var(--rule);
  }
  .intern.with-img .lp-wrap { padding: 0 32px; }
  .intern.with-img .row { padding: 0; gap: 0; }
  .intern.with-img .left {
    flex: 1; padding: 32px 32px 32px 0;
    align-self: center;
  }
  .intern.with-img .stripimg {
    width: 320px; height: 200px; align-self: center;
    border: 1px solid var(--rule);
    margin: 24px 0;
  }
  @media (max-width: 900px) { .intern.with-img .stripimg { display: none; } }

  /* CTA backdrop image */
  .cta.with-img { position: relative; }
  .cta.with-img .cta-back {
    position: absolute; inset: 0; z-index: 0;
    opacity: 0.32;
  }
  .cta.with-img::before { z-index: 1; }
  .cta.with-img .lp-wrap { z-index: 2; }
  body[data-img-treatment="duotone"] .cta.with-img .cta-back { opacity: 0.45; }

  /* Solutions — header image inside specsheet */
  .specsheet .ss-img {
    grid-column: 1 / -1;
    width: 100%; height: 220px;
    border-bottom: 1px solid var(--rule);
  }
  .specsheet.with-img { grid-template-rows: auto 1fr; }
  @media (max-width: 1100px) {
    .specsheet.with-img .ss-img { height: 180px; }
  }

  /* Products banner — image strip on cobalt/ink banners */
  .prod-banner.with-img {
    grid-template-columns: 1.1fr 320px 1fr;
  }
  .prod-banner.with-img .banner-img {
    width: 320px; height: 100%; min-height: 240px;
    align-self: stretch;
    border: 1px solid rgba(255,255,255,0.12);
  }
  @media (max-width: 1100px) {
    .prod-banner.with-img { grid-template-columns: 1fr; }
    .prod-banner.with-img .banner-img { width: 100%; height: 200px; }
  }

  /* Internship phases — photo plate above */
  .intern-photo-plate {
    width: 100%; height: 280px;
    margin-bottom: 18px;
    border: 1px solid var(--rule);
  }

  /* Contact location plate */
  .contact-loc {
    width: 100%; height: 240px;
    margin-top: 24px;
    border: 1px solid var(--rule);
  }

  /* Tweaks button & panel — minimal, fits the aesthetic */
  #apt-tweaks-toggle {
    position: fixed; right: 20px; bottom: 20px; z-index: 9999;
    font-family: var(--mono); font-size: 11.5px;
    background: var(--ink); color: var(--paper);
    border: 1px solid var(--ink);
    padding: 10px 14px;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px;
    border-radius: 2px;
    box-shadow: 0 8px 24px rgba(20,20,19,0.18);
    transition: background .15s;
  }
  #apt-tweaks-toggle:hover { background: var(--orange); border-color: var(--orange); }
  #apt-tweaks-toggle .dot {
    width: 7px; height: 7px; background: var(--orange); display: inline-block;
  }
  #apt-tweaks-toggle:hover .dot { background: var(--paper); }

  #apt-tweaks {
    position: fixed; right: 20px; bottom: 64px; z-index: 9998;
    width: 320px;
    background: var(--paper); border: 1px solid var(--ink);
    box-shadow: 0 24px 60px rgba(20,20,19,0.18);
    padding: 0;
    display: none;
    font-family: var(--sans);
  }
  #apt-tweaks.open { display: block; }
  #apt-tweaks header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px;
    background: var(--ink); color: var(--paper);
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.05em;
  }
  #apt-tweaks header .x { cursor: pointer; opacity: 0.7; }
  #apt-tweaks header .x:hover { opacity: 1; color: var(--orange); }
  #apt-tweaks .body { padding: 16px; }
  #apt-tweaks .row {
    margin-bottom: 16px;
  }
  #apt-tweaks .row:last-child { margin-bottom: 0; }
  #apt-tweaks .lbl {
    font-family: var(--mono); font-size: 10.5px;
    color: var(--mute); letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 8px;
  }
  #apt-tweaks .seg {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--rule);
  }
  #apt-tweaks .seg.three { grid-template-columns: repeat(3, 1fr); }
  #apt-tweaks .seg button {
    border: 0; background: var(--paper); color: var(--ink-2);
    padding: 8px 6px; font-family: var(--mono); font-size: 11px;
    border-right: 1px solid var(--rule);
    cursor: pointer;
    transition: background .12s, color .12s;
  }
  #apt-tweaks .seg button:last-child { border-right: 0; }
  #apt-tweaks .seg button:hover { background: var(--paper-2); color: var(--ink); }
  #apt-tweaks .seg button.on {
    background: var(--ink); color: var(--paper);
  }
  #apt-tweaks .toggle {
    display: flex; justify-content: space-between; align-items: center;
    border: 1px solid var(--rule); padding: 10px 12px;
    cursor: pointer;
    user-select: none;
  }
  #apt-tweaks .toggle:hover { background: var(--paper-2); }
  #apt-tweaks .toggle .name { font-size: 13px; font-weight: 500; }
  #apt-tweaks .toggle .switch {
    width: 32px; height: 18px; background: var(--rule); position: relative;
    border-radius: 999px;
    transition: background .15s;
  }
  #apt-tweaks .toggle .switch::after {
    content: ""; position: absolute; top: 2px; left: 2px;
    width: 14px; height: 14px; background: #fff; border-radius: 50%;
    transition: transform .15s;
  }
  #apt-tweaks .toggle.on .switch { background: var(--orange); }
  #apt-tweaks .toggle.on .switch::after { transform: translateX(14px); }
  #apt-tweaks .foot {
    border-top: 1px solid var(--rule);
    padding: 10px 16px;
    font-family: var(--mono); font-size: 10.5px;
    color: var(--mute);
    display: flex; justify-content: space-between;
  }
  #apt-tweaks .foot a {
    color: var(--ink); border-bottom: 1px solid var(--ink);
    cursor: pointer;
  }
  `;
  const styleEl = document.createElement('style');
  styleEl.id = 'apt-imagery-style';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── 5.  apply state to body ─────────────────────────────────── */
  function applyState() {
    document.body.dataset.imgEnabled = state.enabled ? 'true' : 'false';
    document.body.dataset.imgTreatment = state.treatment;
    document.body.dataset.imgDensity = state.density;
    document.body.dataset.imgGrain = state.grain ? 'true' : 'false';
    // toggle grain elements
    document.querySelectorAll('.apt-img-grain').forEach(g => {
      g.style.display = state.grain ? '' : 'none';
    });
  }

  /* ── 6.  per-page injection ──────────────────────────────────── */
  function injectHome() {
    // Hero collage — insert as first child of .hero-inner so it sits ABOVE headline
    const hero = document.querySelector('.hero');
    const heroInner = document.querySelector('.hero .hero-inner');
    if (hero && heroInner && !heroInner.querySelector('.hero-imgs')) {
      const collage = document.createElement('div');
      collage.className = 'hero-imgs apt-img-block';
      collage.appendChild(imgEl(IMG.hero_a, 'documents · review'));
      collage.appendChild(imgEl(IMG.hero_c, 'two reviewers'));
      collage.appendChild(imgEl(IMG.hero_d, 'analyst · desk'));
      heroInner.insertBefore(collage, heroInner.firstChild);
      // Force the hero canvas to recalc its bounding rect now that the hero is taller
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 600);
      });
    }

    // Quote portrait
    const who = document.querySelector('.quote .who');
    if (who && !who.querySelector('.portrait')) {
      const p = imgEl(IMG.quote_portrait, 'P. Raman');
      p.classList.add('portrait', 'apt-img-block');
      // insert before the SVG mark
      who.insertBefore(p, who.firstChild);
    }

    // Internship strip
    const intern = document.querySelector('.intern');
    if (intern && !intern.classList.contains('with-img')) {
      intern.classList.add('with-img');
      const row = intern.querySelector('.row');
      if (row) {
        // wrap existing children in .left
        const leftWrap = document.createElement('div');
        leftWrap.className = 'left';
        leftWrap.style.display = 'flex';
        leftWrap.style.alignItems = 'center';
        leftWrap.style.justifyContent = 'space-between';
        leftWrap.style.gap = '24px';
        leftWrap.style.flex = '1';
        leftWrap.style.flexWrap = 'wrap';
        while (row.firstChild) leftWrap.appendChild(row.firstChild);
        const photo = imgEl(IMG.intern_strip, 'cohort 02 · paired build');
        photo.classList.add('stripimg', 'apt-img-block');
        row.appendChild(leftWrap);
        row.appendChild(photo);
      }
    }

    // CTA backdrop — scope to landing section, not nav button
    const cta = document.querySelector('main.landing section.cta');
    if (cta && !cta.classList.contains('with-img')) {
      cta.classList.add('with-img');
      const back = imgEl(IMG.cta_back, '');
      back.classList.add('cta-back', 'apt-img-block');
      back.querySelector('.apt-img-cap')?.remove();
      cta.insertBefore(back, cta.firstChild);
    }
  }

  function injectSolutions() {
    const map = { asd: IMG.sol_asd, aida: IMG.sol_aida, rag: IMG.sol_rag, wfa: IMG.sol_wfa };
    const captions = {
      asd: 'internal tools · ops dashboard',
      aida: 'role-scoped assistant',
      rag: 'corpus · retrieval',
      wfa: 'queue · review',
    };
    Object.keys(map).forEach((id) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const ss = sec.querySelector('.specsheet');
      if (!ss || ss.classList.contains('with-img')) return;
      ss.classList.add('with-img');
      const im = imgEl(map[id], captions[id]);
      im.classList.add('ss-img', 'apt-img-block');
      ss.insertBefore(im, ss.firstChild);
    });
  }

  function injectProducts() {
    const awe = document.querySelector('#awe .prod-banner');
    if (awe && !awe.classList.contains('with-img')) {
      awe.classList.add('with-img');
      const im = imgEl(IMG.prod_awe, 'platform · infrastructure');
      im.classList.add('banner-img', 'apt-img-block');
      // Insert as middle child between the text block and specbox
      const specbox = awe.querySelector('.specbox');
      if (specbox) awe.insertBefore(im, specbox);
      else awe.appendChild(im);
    }
    const aka = document.querySelector('#aka .prod-banner');
    if (aka && !aka.classList.contains('with-img')) {
      aka.classList.add('with-img');
      const im = imgEl(IMG.prod_aka, 'analyst · grounded answer');
      im.classList.add('banner-img', 'apt-img-block');
      const specbox = aka.querySelector('.specbox');
      if (specbox) aka.insertBefore(im, specbox);
      else aka.appendChild(im);
    }
  }

  function injectInternship() {
    const how = document.querySelector('#how .sec-body');
    if (how && !how.querySelector('.intern-photo-plate')) {
      const im = imgEl(IMG.intern_strip, 'cohort 01 · build week 06');
      im.classList.add('intern-photo-plate', 'apt-img-block');
      how.insertBefore(im, how.firstChild);
    }
    const projects = document.querySelector('#projects .sec-body');
    if (projects && !projects.querySelector('.intern-photo-plate')) {
      const im = imgEl(IMG.intern_b, 'pair · review');
      im.classList.add('intern-photo-plate', 'apt-img-block', 'apt-img-density-extra');
      projects.insertBefore(im, projects.firstChild);
    }
  }

  function injectContact() {
    const form = document.querySelector('#form .sec-body');
    if (form && !form.querySelector('.contact-loc')) {
      const im = imgEl(IMG.contact_loc, 'singapore · GMT+8');
      im.classList.add('contact-loc', 'apt-img-block');
      form.appendChild(im);
    }
  }

  function inject() {
    const label = document.body.dataset.screenLabel || '';
    if (/home/i.test(label) || document.querySelector('main.landing')) injectHome();
    if (/solutions/i.test(label)) injectSolutions();
    if (/products/i.test(label)) injectProducts();
    if (/internship/i.test(label)) injectInternship();
    if (/contact/i.test(label)) injectContact();
  }

  /* ── 7.  Tweaks panel ───────────────────────────────────────── */
  function buildPanel() {
    const toggle = document.createElement('button');
    toggle.id = 'apt-tweaks-toggle';
    toggle.innerHTML = '<span class="dot"></span><span>imagery</span>';
    document.body.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id = 'apt-tweaks';
    panel.innerHTML = `
      <header>
        <span>TWEAKS · IMAGERY</span>
        <span class="x" data-x>×</span>
      </header>
      <div class="body">
        <div class="row">
          <div class="toggle ${state.enabled ? 'on' : ''}" data-toggle="enabled">
            <span class="name">Show imagery</span>
            <span class="switch"></span>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Treatment</div>
          <div class="seg" data-seg="treatment">
            <button data-v="duotone" class="${state.treatment==='duotone'?'on':''}">duotone</button>
            <button data-v="mute"    class="${state.treatment==='mute'?'on':''}">mute</button>
            <button data-v="grain"   class="${state.treatment==='grain'?'on':''}">grain</button>
            <button data-v="full"    class="${state.treatment==='full'?'on':''}">full</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Density</div>
          <div class="seg three" data-seg="density">
            <button data-v="sparse"   class="${state.density==='sparse'?'on':''}">sparse</button>
            <button data-v="balanced" class="${state.density==='balanced'?'on':''}">balanced</button>
            <button data-v="rich"     class="${state.density==='rich'?'on':''}">rich</button>
          </div>
        </div>
        <div class="row">
          <div class="toggle ${state.grain ? 'on' : ''}" data-toggle="grain">
            <span class="name">Film grain</span>
            <span class="switch"></span>
          </div>
        </div>
      </div>
      <div class="foot">
        <span>persists across pages</span>
        <a data-reset>reset</a>
      </div>
    `;
    document.body.appendChild(panel);

    toggle.addEventListener('click', () => panel.classList.toggle('open'));
    panel.querySelector('[data-x]').addEventListener('click', () => panel.classList.remove('open'));

    panel.querySelectorAll('[data-seg]').forEach(seg => {
      const key = seg.dataset.seg;
      seg.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          state[key] = btn.dataset.v;
          save(state);
          seg.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
          applyState();
        });
      });
    });

    panel.querySelectorAll('[data-toggle]').forEach(t => {
      const key = t.dataset.toggle;
      t.addEventListener('click', () => {
        state[key] = !state[key];
        save(state);
        t.classList.toggle('on', state[key]);
        applyState();
        if (key === 'grain') {
          // toggle grain elements w/o full re-render
          document.querySelectorAll('.apt-img-grain').forEach(g => g.style.display = state.grain ? '' : 'none');
          // also add/remove if missing
          if (state.grain) {
            document.querySelectorAll('.apt-img').forEach(im => {
              if (!im.querySelector('.apt-img-grain')) {
                const g = document.createElement('div');
                g.className = 'apt-img-grain';
                im.appendChild(g);
              }
            });
          }
        }
      });
    });

    panel.querySelector('[data-reset]').addEventListener('click', () => {
      state = { ...DEFAULTS };
      save(state);
      // re-render panel for clean toggle states
      panel.remove();
      toggle.remove();
      buildPanel();
      applyState();
    });
  }

  /* ── 8.  boot ───────────────────────────────────────────────── */
  function boot() {
    inject();
    applyState();
    buildPanel();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
