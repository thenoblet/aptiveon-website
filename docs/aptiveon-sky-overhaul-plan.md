# Aptiveon Sky overhaul — final summary

Full design-system overhaul of the Vite + React 19 + TypeScript site to the
new Aptiveon Sky design language. Strategy: hybrid — tokens / base /
primitives / chrome rewritten in place; pages deleted and rebuilt from the
mockups; Contact left functional with the new chrome.

Stack/structure invariants held: Tailwind v4 `@theme` + role-alias tokens,
lazy routes, hooks discipline (reduced-motion guards), no inline hex, no
raw px (except 1px borders), no `any`, no inline font-family strings,
mobile responsive.

## Commits (in order)

1. `plan: aptiveon sky overhaul` — long-form plan committed before code.
2. `tokens + chrome: replace with Aptiveon Sky design system` — tokens.css,
   base.css, all shared component CSS, Navbar, Footer, Layout, Container.
3. `primitives: marquee, sparkbar, live-trace` — three net-new ui primitives
   with CSS files registered in styles/index.css.
4. `home: ship Aptiveon Sky landing page` — old Home sections deleted,
   13 new sections written, useHeroParticles updated to read CSS vars,
   useStatsOrbs removed.
5. `solutions: ship Aptiveon Sky solutions page` — 4 areas, spec-sheet
   layout, engage block.
6. `products: ship Aptiveon Sky products page` — banner + 6-cell feat-grid;
   accent fill on AKA banner.
7. `customers: ship Aptiveon Sky customers page` — index + agg-stats +
   case studies with Problem/Approach/Outcome arcs + ework + cta;
   useAmbientParticles hook removed.
8. `internship: ship Aptiveon Sky internship page` — hero with Apply
   button + cohort photo + project types + eligibility + apply modal.
9. `contact: adopt Aptiveon Sky tokens` — minimal touch; new tokens.
10. `docs: overhaul summary` — this file.

## Per-page mapping (shipped)

### Home (`src/pages/Home.tsx`)
Hero+LiveTrace · BandMarquee · PlatformPulse · GroundFloor (3 pillars
with IO blocks) · Impact (inverted) · Architecture (engine diagram) ·
Showcase (4 tabbed surfaces) · Integrations (2 logo marquees) ·
LiveFeed · Testimonials (marquee) · InProduction · BrandMoment
(inverted) · HomeCta.

Removed: LogoWall, PillarLine, Pillars, Stats, ProductMoment, Quote,
Compliance, InternStrip.

### Solutions
4 areas (ASD/AIDA/RAG/WFA); each has the same 5-row spec; "Start a
conversation" footer. Per-solution Image plates dropped.

### Products
2 products (AWE, AKA-accent); 6-cell feat grid each; "What's next" block.

### Customers
PageHero + case-index + 4-cell agg-stats + 4 case studies + logos strip
+ ework + cust-cta. Per-case photo kept (mockup shows it).

### Internship
Hero with Apply button + cohort photo + 4-bucket project types +
EligibilityApply row + ApplyModal.

### Contact
Same form + Select + behaviour as before; styled with new tokens.

## Net-new components

- `components/ui/LiveTrace.tsx` — animated runtime trace card.
- `components/ui/Marquee.tsx` — infinite horizontal scroller, band +
  logos variants, prefers-reduced-motion safe.
- `components/ui/Sparkbar.tsx` — inline SVG sparkline.

## Net-new CSS files

- `styles/components/marquee.css`
- `styles/components/live-trace.css`

## Removed

- `src/hooks/useStatsOrbs.ts` (Home section it powered is gone).
- `src/hooks/useAmbientParticles.ts` (Customers backdrop dropped).

## Decisions log

- **Mega-menu nav dropdowns dropped** — mockup is a flat link bar.
- **Footer** moved from inverted-dark to light paper to match the mockup.
- **Tweaks panel widget not ported.** The data-attr theming pattern from
  the prototype is fully supported via tokens (`data-accent`,
  `data-mode`, `data-display-font`, `data-density`), but a floating
  visible widget isn't appropriate for the production site. To preview
  variants, set the attributes directly on `<html>` in devtools or
  manually toggle via `document.documentElement.setAttribute(...)`.
- **Per-page Image plates dropped on Solutions/Products** — mockup is
  type-only on these pages; the `IMG` entries remain in
  `lib/imagery.ts` for potential future reuse.
- **Per-case photos kept on Customers**, cohort photo kept on
  Internship — mockup shows photography in both places.
- **Old hero particle hook kept** — `useHeroParticles` is updated to
  read `--accent` / `--ink` via getComputedStyle, so the particle field
  retints when the active palette flips. Reduced-motion guard
  preserved.
- **Trust-avatar strip in the hero dropped** — the new hero leans on
  the LiveTrace card as the right-column visual; trust / proof lives in
  Testimonials / BrandMoment / InProduction.
- **Tag colours on Customers cases simplified** — old per-case
  cobalt/moss accent dropped; uniform accent pill matches the mockup.
- **Splash screen kept; restyled only.** Preload paths removed since
  the new Home hero doesn't depend on the legacy IMG photos.
- **Contact page** kept its existing form and the `Select` primitive —
  restyled, not redesigned.

## Verification

- `npm run lint` — clean on every commit.
- `npm run typecheck` — clean on every commit.
- `npm run build` — clean on every commit. Final output is a static SPA
  in `dist/`, ready for nginx to serve at `/`.

CI / Docker / nginx config untouched per the brief.

## Push status

The remote denied pushes for the configured user during this session
(proxy returned 403). All commits sit on the local
`claude/aptiveon-sky-redesign-Ddup6` branch; a manual push will be
needed once credentials are available.
