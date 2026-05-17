# Aptiveon Sky overhaul — plan

A full design-system overhaul of the Vite + React 19 + TypeScript site to the
new "Aptiveon Sky" design language. Token-first, no inline hex, no raw px,
hooks discipline preserved, lazy routes preserved, Contact kept functional.

## Stack / structural invariants

- Keep: Vite 6, React 19, TS strict, Tailwind v4, react-router v7, Vitest.
- Keep folder layout exactly (`src/{pages,components/{ui,layout,providers,
  tweaks},hooks,lib,styles/{components,pages}}`).
- Keep lazy routes in `App.tsx`.
- Keep CI/Docker/nginx/workflow files untouched.
- Keep `usePrefersReducedMotion` + the hero-particle reduced-motion guard.

## Token layer (Step a — `src/styles/tokens.css`)

Rewrite tokens.css in place. Architecture preserved: Tailwind v4 `@theme` block
+ role aliases on `:root`, plus the new design-system's
`data-accent` / `data-mode` / `data-display-font` / `data-density` attrs.

New scale:

- **Paper palette** (warm light default; cool "sky" via `data-accent="sky"`,
  inverted `data-mode="dark"`).
- **Display font** Instrument Serif; sans Geist; mono JetBrains Mono.
- **Accents**: clay (default), sky, electric, forest, ink.
- **Display-font swap** via `data-display-font` (serif | newsreader | sans |
  inter | poppins | grotesk | mono | condensed).
- **Density**: airy (default) | compact.

Tailwind utilities driven by `@theme` get rewired to the new role tokens —
`bg-paper`, `text-ink`, `border-line`, `text-accent`, etc.

## Primitives (Step b — `src/components/ui/`)

Survive (restyled, same API):

- `Button.tsx` — primary / ghost / accent / line. CSS gets the new ink-fill
  primary, hover-flips-to-accent rule, ghost = hairline border, tiny variant.
- `Container.tsx` — alias to `.wrap` token-driven max-width.
- `Crumb.tsx` — restyle to the new mono crumb style.
- `PageHero.tsx` — title + dek + 4-cell meta grid. Use `<span class="mark">`
  for accent fill.
- `SpecTable.tsx` — same `<table class="spec">` two-column row.
- `Reveal.tsx` — keep.
- `Section.tsx` / `SectionMark.tsx` — keep; restyle the dot brand glyph to
  the new accent square.
- `KineticHeading.tsx` — keep.
- `Counter.tsx` — keep.
- `Modal.tsx` — restyle backdrop + border. Keep API.
- `Image.tsx` — keep.
- `Select.tsx` — restyle; tokens only.

Net-new (only where no primitive fits):

- `LiveTrace.tsx` — animated runtime trace card (right column of new Home
  hero). Local hook with reduced-motion guard.
- `LivePerformance.tsx` — bar-chart variant of the same hero card (kept as
  an option, mirroring the design's hero-visual tweak).
- `Sparkbar.tsx` — small inline SVG sparkline for Platform Pulse.
- `Marquee.tsx` — bordered token-strip used between hero & pulse.

Note — the hero "live trace" and "perf chart" are real new visual artefacts
that don't exist in the current codebase; each lives at
`components/ui/<Name>.tsx`, its CSS at `styles/components/<name>.css`.

## Tweaks panel (Step c)

Existing project has no runtime tweaks panel in the new TS code (the legacy
JSX prototype has one). The prototype's panel is heavy and tied to a
postMessage host protocol that doesn't apply here. **Decision**: do not port
the visual tweaks panel as a runtime widget — the data-attr theming is fully
supported via tokens, but exposing it as a floating UI is out of scope for
the production site. The `components/tweaks/` folder is created (empty index
or removed entirely) per the instruction that "if a structural folder isn't
used, that's fine"; we won't add a parallel TweaksPanel.tsx unless asked.

If, mid-build, a need emerges for a runtime toggle (e.g. to demo accents),
we'll add a minimal TS `TweaksPanel.tsx` at `components/tweaks/`.

## Layout (Step d)

- `Navbar.tsx` — restyle to the new fixed translucent bar with the brand
  glyph + `nav-links` + `Talk to sales →` chip. Keep the mobile drawer; swap
  styling to the new tokens. Drop the deep "menu" dropdown panels from the
  current navbar — the mockups use a flat link bar.
- `Footer.tsx` — keep React structure (lockup, three columns, big wordmark,
  stamp). Restyle entirely to the new tokens + new big-wordmark behavior.

## Pages (Step e)

### Home — `src/pages/Home.tsx`

Mockup sections → components:

- `Hero` (left column copy + right column live trace) → restyle current
  `Hero()` + new `LiveTrace` component.
- `Marquee` → new primitive.
- `PlatformPulse` → new section (sparkbars + 4 metric cells).
- `GroundFloor` (3 pillars) → restyle existing `Pillars()` to the new
  three-row layout with Inputs / Outputs IO blocks.
- `Impact` → new section. (4 impact cells in a row.)
- `Architecture` (engine diagram) → new section, replaces the old
  `ProductMoment()` queue frame.
- `Showcase` (tabbed 4 surfaces) → new section, replaces `Quote()`.
- `Integrations` (two marquee logo rows) → new section.
- `LiveFeed` (event feed + bars) → new section.
- `Testimonials` (horizontal marquee) → new section.
- `InProduction` (claims + metrics) → restyle `Compliance()`.
- `BrandMoment` → new section.
- `CTA` → restyle existing `HomeCta()`.

Old `Quote()`, old `ProductMoment()` queue, old `LogoWall`, old `Stats`, old
`InternStrip`, old `PillarLine` are replaced by the new structure. The new
design has no PillarLine kinetic heading on the home page so we drop it (the
`KineticHeading` primitive itself stays for potential reuse).

### Solutions — `src/pages/Solutions.tsx`

Same 4 areas (ASD, AIDA, RAG, WFA) with the same five-row spec. Restyle:

- `PageHero` with the four meta cells.
- Per-solution `SolutionBlock` with `sol-head` + `specsheet` grid (left:
  ref + headline + body + use-cases; right: spec table). The current code
  has an `Image` plate per solution — drop it (the new mockup doesn't show
  per-solution photography).
- Bottom "Start a conversation" section. Keep, restyle.

### Products — `src/pages/Products.tsx`

Two products (AWE, AKA) with banner + feat grid. AKA is the accent variant.
Restyle:

- `PageHero`.
- `ProductBlock` with `prod-banner` (left: ref + name + blurb + tags;
  right: spec table) + 6-cell `feat-grid`.
- "What's next" bottom section. Keep, restyle.
- Drop the per-product image plate; the new mockup is type-only.

### Customers — `src/pages/Customers.tsx`

4 case studies (NorthArc, Brackmoor, Meridian/H, Halden). Restyle to the
case + index + agg-stats + ework + cust-cta structure from the new mockup.

### Internship — `src/pages/Internship.tsx`

Restyle to the new hero (with Apply button), cohort photo, project types
grid, eligibility row, apply modal. The current 4-phase section is
replaced by the new project-types 4 buckets; the existing `ApplyModal` API
(via the `Modal` primitive) stays but its content is rewritten to match the
new application form fields.

### Contact — `src/pages/Contact.tsx`

Last. Minimal change — adopt the new chrome (PageHero, Crumb), new form
styles using new tokens. Keep all behaviour and the `Select` component.

## Order of execution

1. Plan (this doc) → commit `plan: aptiveon sky overhaul`.
2. Fonts in `index.html` + tokens.css + base.css.
3. Primitives + their CSS.
4. Layout (Navbar, Footer + CSS).
5. Home page + home.css + new component CSS.
6. Solutions page + solutions.css.
7. Products page + products.css.
8. Customers page + customers.css.
9. Internship page + internship.css.
10. Contact page + contact.css (last).
11. Lint + typecheck + build clean → final docs commit.

## Judgment calls / open questions to note in commit footers

- **Tweaks panel runtime widget**: skipping (decision above).
- **Old hero particle hook**: keeping `useHeroParticles.ts` (the new hook
  in the prototype is the same logic ported to read `--accent` / `--ink`
  CSS vars at runtime). Will update color resolution to read tokens.
- **Per-page Image plates**: dropping on Solutions / Products. Keeping on
  Customers (mockup explicitly shows a photo per case) and Internship
  (cohort photo). The `Image` primitive + `imagery.ts` lib survive.
- **Splash screen**: keeping. The new design has no splash but the existing
  one isn't visually incompatible — restyling to the new tokens is
  sufficient.
- **Tailwind utility classes inside Container**: removing the `px-7` raw
  Tailwind utility from `Container.tsx` — the new system drives gutter via
  `--gutter`. (Container becomes a thin wrapper around `.wrap`.)
- **Mock copy gaps**: where the mockup doesn't supply enough copy, use the
  exact mockup wording and note in the commit footer if anything was
  invented (it shouldn't be).
