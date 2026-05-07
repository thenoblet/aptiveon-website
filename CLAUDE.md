# Aptiveon Website — Engineering Standards

This file defines the standards that any code in this project must follow. It supersedes generic defaults. When in doubt, prefer clarity, consistency, and the design-system-first approach.

Stack: **Vite 6 · React 19 · TypeScript (strict) · Tailwind v4 · react-router-dom v7 · Vitest**.

---

## 1. React: hooks discipline

### `useState` — only render-driving state

Use it for values whose change must trigger a re-render.

- Local UI state: `open`, `selectedTab`, `inputValue`, `pending`.
- Cross-component state: lift to the nearest common parent or put in a context provider. Don't drill props more than ~3 levels.
- Do **not** put in `useState`:
  - Timer ids, AbortControllers, subscription tokens — use `useRef`.
  - Values derived from props/other state — compute on render. Use `useMemo` only if the computation is measurably expensive.
  - Latest-event refs / DOM nodes — use `useRef`.

### `useEffect` — synchronise React with the outside world

`useEffect` is for **side effects that bridge React to external systems**: the DOM directly, the browser (`window`, `document`, `localStorage`), timers, subscriptions, third-party widgets, canvas drawing, IntersectionObserver, etc.

Required structure:

```tsx
useEffect(() => {
  // setup
  const cleanup = setupSomething();
  return () => cleanup(); // ALWAYS return cleanup if you set up listeners/timers/observers
}, [/* every value from outer scope used inside */]);
```

Hard rules:

1. **Always return a cleanup** when you create timers, intervals, observers, listeners, or animation frames. Missing cleanups break StrictMode double-mount and leak resources on unmount.
2. **Dependency array is exhaustive.** Every value referenced from props, state, or context must be listed. The eslint `react-hooks/exhaustive-deps` rule is on — don't disable it casually. If a dep "shouldn't" cause re-runs, the right fix is usually `useCallback`/`useMemo` upstream or a ref, not silencing the lint.
3. **Empty deps `[]` only** when the effect truly references nothing that can change between renders.
4. **Don't fetch data with `useEffect`.** Use TanStack Query / SWR / route loaders / a server framework. If we add data fetching later, add the library — do not rebuild it with effects.
5. **Don't use `useEffect` to run logic in response to a user action.** Put it in the event handler.
6. **Don't use `useEffect` to mirror prop A into state B.** Compute B on render. The "lift state up + derive" pattern beats effects almost every time.

### Other hooks

- `useRef` — mutable cell that survives renders without causing them. DOM refs, timer ids, "latest" callbacks.
- `useMemo` / `useCallback` — only when (a) measurably expensive, (b) referential identity matters for downstream `memo`/effect deps, or (c) called from a child that uses `React.memo`. Don't sprinkle them prophylactically — they have a cost too.
- `useReducer` — when the next state depends on the previous in non-trivial ways, or when several setters move together.
- `useId` — for SSR-safe generated ids on form labels.
- `useSyncExternalStore` — for subscribing to external stores that aren't React state (e.g. browser APIs that emit events).

### Anti-patterns to refuse

| Smell | Fix |
|---|---|
| `useState` for a `setTimeout` id | `useRef` |
| `useEffect` that calls `setX` based on a prop | Compute inline or `useMemo` |
| Empty `[]` while reading `props.something` inside | Add `props.something` to deps, or refactor |
| `useEffect` that fetches in a component | Use a query library / route loader |
| `setInterval` without a `clearInterval` cleanup | Add `return () => clearInterval(id)` |
| Inner `setTimeout` with cleanup returned from inside the timer callback | Track ids in a `Set`, clear them in the outer cleanup |
| `useMemo`/`useCallback` "because performance" with no measured benefit | Delete them |

---

## 2. Design system & styling

The project follows a **token-first, atomic-component** model. Read this before adding any styles.

### Tokens are the single source of truth

All design values live in `src/styles/tokens.css` inside `@theme { ... }`. Tailwind v4 reads these and generates utilities; custom CSS references them via `var(--*)`.

- **Typography:** `--text-xs … --text-7xl`, plus fluid `--text-display`, `--text-hero`, `--text-headline`. All in **rem**.
- **Spacing:** 4-pt grid `--space-0 … --space-40` in rem; Tailwind's `--spacing` base is 0.25rem.
- **Colour:** raw palette (`--color-paper`, `--color-ink`, …) **plus** semantic role aliases (`--color-bg`, `--color-fg`, `--color-fg-mute`, `--color-accent`, `--color-bg-invert`, …). Components reference roles, not raw palette.
- **Other:** `--radius-*`, `--shadow-*`, `--z-*`, `--container-*`, `--leading-*`, `--tracking-*`, `--weight-*`, `--font-sans`, `--font-mono`, `--ease-*`, `--duration-*`.

The litmus test: change one token in `tokens.css`, the entire UI shifts consistently. If editing CSS feels like changing the same number in five places, you're doing it wrong.

### No magic numbers

```css
/* WRONG */
.card { padding: 13px; font-size: 15px; border-radius: 4px; }

/* RIGHT */
.card {
  padding: var(--space-3);
  font-size: var(--text-base);
  border-radius: var(--radius-sm);
}
```

The only acceptable raw `px` are 1px hairline borders and a handful of pixel-perfect detail values where a rem would round oddly. Even those should be rare.

### rem, not px

`html { font-size: 100%; }` honours user accessibility settings. All component sizing is in rem so the whole UI scales when the root size changes (or the user zooms).

### Where styles live

```
src/styles/
  tokens.css            ← design tokens (DO NOT scatter values elsewhere)
  base.css              ← resets, body, links, focus
  components/*.css      ← reusable patterns: button, navbar, footer, page primitives
  pages/*.css           ← page-only styles that don't fit utilities or components
  index.css             ← imports the above, in order
```

Rules:

- New design value → add a token first, then reference it.
- New shared visual pattern → component CSS file + a React component.
- One-off page styling → page CSS, but extract to a component the second a second page needs it.
- **Never** inline a hex code, raw px, or `font-family` string in JSX.

### Tailwind utilities vs. component CSS

Both are fine; pick by the rule:

- **Utility classes in JSX** for small/one-off layout — flex/grid/gap/padding the surrounding container.
- **Component CSS class** when a pattern repeats, has hover/focus/dark states, or is too verbose inline (more than ~4 utilities per element repeating across pages).

Don't write `style={{ fontSize: 15 }}` — use `className="text-base"` or a component class.

---

## 3. TypeScript

`strict: true` is on, plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.

- **No `any`.** Use `unknown` and narrow, or define a proper type.
- **No non-null assertions (`!`)** unless you can name why it's safe in a comment. Prefer narrowing.
- `interface` for object shapes that may be extended; `type` for unions, intersections, mapped/derived types.
- Prefer `import type { Foo } from 'bar'` for type-only imports (verbatimModuleSyntax requires this for types).
- Component props: define an `interface Props { ... }` next to the component. Inline-typed props are fine for tiny components.
- Avoid `React.FC` — type the function directly. It's the modern convention and plays better with default props and generics.

---

## 4. Component structure

### Folder map

```
src/
  components/
    ui/        ← atomic, reusable, no domain knowledge (Button, Container, Reveal, …)
    layout/    ← site chrome (Layout, Navbar, Footer)
    tweaks/    ← dev/runtime tooling (ImageryPanel)
  hooks/       ← reusable hooks; one per file; named export
  lib/         ← pure helpers, data, types — no React
  pages/       ← route components; default export; one per file
  styles/      ← see §2
  test/        ← test setup
```

### Component rules

- One component per file. Default export for pages and "primary" components in their file. Named exports for tiny helpers / sibling components in the same file.
- Props interface above the function.
- Keep components small. If a page component is over ~250 lines, split out the noisy sub-sections into named local components in the same file (or extract to `components/` if reusable).
- Hooks are imported at the top of components, never inside conditions or loops.
- Server-side / browser-only APIs: gate `localStorage`, `window` with `typeof window !== 'undefined'` checks if the code might run during SSR — for this project it's CSR-only, but keep the habit.

### When a `<div>` sprouts logic, make a component

If you find yourself repeating a block of JSX with similar classes across files, extract to `components/ui/`. Prop the variants.

---

## 5. Imports & paths

- Use the `@/*` path alias for any cross-folder import. Never `../../../components/...`.
- Order: React → third-party → `@/` aliases → relative → styles. Prettier doesn't enforce this; do it by hand.
- Lazy-load route components in `App.tsx` (`React.lazy` + `Suspense`) so each page is its own bundle.

---

## 6. Naming

- React components: `PascalCase` files (`Button.tsx`).
- Hooks: `useThing.ts`, default-or-named matching the file.
- Helpers: `camelCase.ts`.
- CSS classes: `kebab-case`. Match the JSX `className` exactly.
- Test files: `Foo.test.ts(x)` next to the unit, or `__tests__/` if there's a cluster.
- Booleans: prefix with `is`, `has`, `should`, `can` (e.g. `isOpen`, `hasError`).
- Event handlers: `onX` for the prop, `handleX` for the implementation (`onClick={handleClose}`).
- Constants: `SCREAMING_SNAKE` for module-level immutable values.

---

## 7. Accessibility (non-negotiable)

- Every interactive element is a real `<button>` / `<a>` / `<input>`. Don't fake interactivity on `<div>` unless you also add `role`, `tabIndex`, and keyboard handlers. The imagery panel toggles using `<div role="switch">` are the closest we get — review them.
- Form inputs always have `<label htmlFor>` paired with `id`.
- All `<a>` that aren't text links (icon-only, image links) need `aria-label`.
- Visible focus rings — never `outline: none` without a replacement.
- Honour `prefers-reduced-motion` for non-essential animation. (Add the media query if we ship long-running animation a user might disable.)
- Colour: contrast checked against WCAG AA at minimum. Mute-on-paper is borderline — verify with a contrast tool when used for body copy.

---

## 8. Performance

- Bundle: React.lazy every route. Don't import giant libs at the top level if used in one place.
- Images: prefer `loading="lazy"`, explicit `width`/`height` to avoid CLS; the photo treatments here are background-images so we're fine.
- `React.memo` only where profiling shows wasted renders. Don't blanket-memo.
- Heavy work in effects (canvas, particles) must be **rAF-driven, cancelable, and resize-aware**. Always cancel in cleanup.
- Avoid layout thrash: read all DOM measurements first, then write all style mutations.

---

## 9. State scope rules

- Local UI state: `useState` in the component.
- Shared but non-persistent: lift to nearest parent or component-level context.
- Persisted (localStorage): single context provider that owns load/save and exposes a typed setter (see `useImagery`).
- Server state (when we add it): query library, never `useEffect` + `fetch`.

URL is also state. Use `useSearchParams` / `useNavigate` for filter/tab/modal-open state that should survive refresh and be shareable.

---

## 10. Side-effect placement

| Action | Where it goes |
|---|---|
| User clicks a button → start something | Event handler |
| Component just appeared → set up an observer / canvas / interval | `useEffect` |
| Route just changed → scroll, log analytics, refetch | `useEffect` keyed on `pathname` (or a router event) |
| Form submit → POST | Event handler (submit) → trigger a mutation |
| External event listener (`resize`, `mousemove`, `keydown`) | `useEffect` with cleanup |
| Read once at mount | `useEffect(() => { ... }, [])` is fine; for sync reads (e.g. localStorage initial value) prefer the `useState` lazy init form: `useState(() => load())` |

---

## 11. Errors, edge cases, validation

- Validate at system boundaries (user input, network, storage parsing). Trust internal types between components.
- `try/catch` around `JSON.parse`, `localStorage.*`, `fetch`. Never let a corrupted localStorage value crash the app.
- Don't write defensive code for cases TypeScript already rules out.
- Surface unrecoverable errors via an Error Boundary (add one at the route level when the first real failure mode shows up).

---

## 12. Testing

- `vitest` + `@testing-library/react`. Tests are about behaviour, not implementation.
- Components: render, interact (`userEvent`), assert visible output.
- Hooks: unit-test via a host component; don't reach into internal refs.
- Don't snapshot HTML — too brittle.
- Coverage isn't a target; the goal is to catch regressions in the parts that hurt to break.

---

## 13. Git, commits, PRs

- Commits: imperative mood, scoped prefix when useful (`home: split product moment into a section component`).
- One logical change per commit. No mega-commits across pages + styles + config.
- PR description: what changed, why, and how to verify (steps or screenshot).
- Never push directly to `main`. Always PR.
- Pre-merge: typecheck + lint + tests must pass.

---

## 14. Things we explicitly don't do

- No emojis in code or copy unless asked.
- No README scaffolding or marketing fluff in source files.
- No commit messages that describe what the diff already shows.
- No comments that narrate code: `// increment counter` next to `i++`. Comments answer **why**, not what.
- No "futureproof" abstractions for hypothetical second uses. YAGNI. Generalise on the second concrete need.
- No hand-rolled state management when context + hooks suffice.
- No CSS-in-JS libraries — we have a token system + Tailwind + scoped CSS files.

---

## 15. When in doubt

1. Does a token already exist? Use it.
2. Does a component already exist? Use it.
3. Will another page need this? Extract.
4. Does this effect have a cleanup? It must.
5. Is this state derivable? Don't store it.
6. Is this `any`? Type it properly.
7. Is this magic? Token, alias, or constant.
