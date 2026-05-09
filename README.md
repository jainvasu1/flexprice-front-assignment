# Flexprice — Frontend Take-Home Submission

A Storybook component library extracted from the Flexprice billing dashboard. Built on the existing `flexprice-front` codebase (atoms / molecules / organisms structure already in place).

> 🌐 **Live Storybook:** **https://flexprice-front-assignment.vercel.app**
> 📦 **Repo:** **https://github.com/jainvasu1/flexprice-front-assignment**

---

## TL;DR

- ✅ **27 components** with stories (15 required) — all atom / molecule / organism tiers covered
- ✅ **All 3 advanced challenges** done (Filter Store · Virtualised DataTable · Query Config)
- ✅ **64 tests** across 7 files (utility · component · store)
- ✅ **Branded Storybook** with custom theme, Welcome page, Design Tokens reference, 5 dashboard scene mockups
- ✅ **Public Vercel deploy** — no login required

---

## Approach

I treated this as a real product engineering exercise rather than a stories-only checklist. Three principles guided every decision.

### 1 · Document what's already there before building anything new

The repo already had ~50 components in `src/components/atoms/`. Most of them shipped with no stories. Writing stories for *existing* components — Button, Input, Select, Card, Toggle, Chip, Stepper, etc. — is more honest than reinventing them with slightly different APIs. It demonstrates I can read a codebase and add value within its conventions, not just produce greenfield code.

For each existing atom I wrote a story file with all five things the brief asked for: a `Default`, a `Variants` story covering visual states, full `argTypes` controls, a JSDoc on the component, and a `play` function on anything interactive. **15 atoms documented this way, no source changes.**

### 2 · Add new components only where motion or composition was missing

The existing components are functional but visually static. To answer the "build something memorable" pull of the brief, I added a small set of new pieces — `PolishedToggle`, `CtaButton`, `StatusBadge`, `AnimatedCounter`, `AnimatedProgress`, `AnimatedStepper`, `AnimatedCheckbox`, `MetricCard`, `DataTable`, `SearchBar`, `SidebarNav`, `PricingTierTable`. Each one reuses the existing Flexprice palette (navy `#092E44`, zinc grays) — **no new color tokens were introduced anywhere**. Only the shape, motion and composition are new. This means a designer can drop these into the dashboard tomorrow without breaking the design system.

The motion is intentional, not decorative: spring physics on toggles signal state change; pulsing dots on `pending` invoices draw the eye where action is needed; staggered table-row entries cap at 0.3s so reflows feel snappy after filters. All animations respect `prefers-reduced-motion` because framer-motion does that for free.

### 3 · Showcase composite behaviour, not isolated atoms

Reviewers can validate atoms in 30 seconds. What's harder to see is whether the parts compose into something that feels like a real product. The `Showcase / Dashboard Scenes` section answers that — five composite stories (Invoices, Billing, Empty Dashboard, Metrics Dashboard, Onboarding Wizard) that mirror screens from the actual `admin.flexprice.io` app I signed up for at the start of the day. The Invoices page has working date and status filters and live counts; the Onboarding Wizard cycles through 4 steps with animated stepper transitions; the Metrics Dashboard counts up four KPIs in parallel with usage progress bars beneath. This is where I'd want a reviewer to start.

The advanced challenges follow the same composition principle:

- **Challenge A** isn't just a Zustand store — it's wired up to a real DataTable scene in `Showcase / Challenge A — Filter Store` so you can see filters persist across iframe reloads and the URL fingerprint update live.
- **Challenge B** isn't a generic 10k-row demo — it's the same `DataTable` component the rest of the showcase uses, with virtualization opt-in via a flag. Real product code wouldn't ship a separate `VirtualizedTable` component.
- **Challenge C** is a small file, but the test in `queryConfig.test.ts` is the documentation: each preset's behaviour is asserted, not narrated.

---

## Quick start

```bash
npm install
npm run storybook        # localhost:6006
npm run test             # vitest — 64 tests
npm run build-storybook  # output -> storybook-static/
```

> If `npm run storybook` errors with `supabaseUrl is required`, copy `.env.example` to `.env`. Placeholder values work for Storybook — no real secrets needed.

---

## What's inside

### Atoms

| Component | Notes |
|---|---|
| Button | 7 variants × 5 sizes, loading, disabled, icon slots, click-interaction test |
| Input, Textarea | Label / error / helper-text / disabled, typing-interaction tests |
| Select | 7 stories incl. radio-style and no-options |
| Tooltip | All 4 sides, rich content slot |
| Spinner | Sized variants |
| Chip | 5 variants, icons, click test |
| Card | All 5 variants (default / notched / bordered / elevated / warning) + header subcomponent |
| Checkbox, Toggle | Default / checked / disabled / error states |
| Label, Divider, Progress, Stepper, NoDataCard | Full stories each |
| **StatusBadge** | Pulsing dot for `pending` / `processing` (Stripe-style) |
| **PolishedToggle** | iOS-style spring toggle (framer-motion) |
| **CtaButton** | Pill button with rotating icon-circle on hover |
| **AnimatedCounter** | Count-up KPI with delta indicator |
| **AnimatedProgress** | Spring-eased fill + count-up percent |
| **AnimatedStepper** | Pulsing active step + animated connector fill |
| **AnimatedCheckbox** | Checkmark draws on with `pathLength` tween |

### Molecules

- **MetricCard** — composes Card + AnimatedCounter, with skeleton loading and trend chip
- **DataTable** — generic, sortable, paginated, optional virtualized rendering (Challenge B)
- **SearchBar** — debounced, clear button, ⌘K shortcut hint, typing-interaction test

### Organisms

- **SidebarNav** — collapsible (animated), grouped sections, badges, active highlighting, footer slot
- **PricingTierTable** — graduated + volume modes with live total

### Showcase scenes (`Showcase / Dashboard Scenes`)

- **Invoices Page** — full table with status badges, working date + status filter dropdowns, live count
- **Billing Page** — current plan + usage progress + preferences toggles
- **Empty Dashboard** — hero CTA empty state
- **Metrics Dashboard** — 4 animated metric cards + usage bars + top-customers list
- **Onboarding Wizard** — 4-step interactive flow with animated stepper

Plus a branded **Welcome** landing page and a **Design Tokens** reference page (colours, typography, spacing, radius, elevation).

---

## Advanced challenges — all three completed

### ✅ Challenge A — Filter persistence

`src/store/createFilterStore.ts` — a Zustand factory keyed by route name, persisted to `sessionStorage`. Exposes `setFilter`, `setFilters`, `resetFilters`, `getFilters`, and a `fingerprint()` derived from a stable JSON serialisation (sorted keys → reorder doesn't churn the hash). `syncFingerprintToUrl()` writes only a 6-char `djb2` hash to `location.hash` — the page stays bookmarkable, the URL stays short.

Demo: `Showcase / Challenge A — Filter Store / InvoicesWithFilterStore`.
Tests: `src/store/createFilterStore.test.ts` (12 tests).

### ✅ Challenge B — Virtualised DataTable

`Molecules / DataTable / Virtualized10k` — 10,000 mock rows with `@tanstack/react-virtual`. Only ~12 rows mounted to the DOM at any time. Configurable `estimatedRowHeight`, `maxHeight`, overscan buffer. Same `DataTable` component is also used in standard (non-virtualized) mode across the showcase.

### ✅ Challenge C — Configurable TanStack Query caching

`src/lib/queryConfig.ts` exports the four presets the brief asks for:

```ts
import { GLOBAL_DEFAULTS, REALTIME, DEFAULT, STATIC, createQueryConfig } from '@/lib/queryConfig';

new QueryClient({ defaultOptions: { queries: GLOBAL_DEFAULTS } });

useQuery({ queryKey: ['plans'],   queryFn, ...STATIC });   // 30 min staleTime
useQuery({ queryKey: ['usage'],   queryFn, ...REALTIME }); // 0 staleTime, 5s polling
useQuery({ queryKey: ['invoice'], queryFn, ...DEFAULT });  // 5 min staleTime
```

Behaviour documented by `src/lib/queryConfig.test.ts` (14 tests).

---

## Tests

```bash
npm run test
```

| File | Tests | Covers |
|---|---|---|
| `src/lib/formatCurrency.test.ts` | 9 | USD / INR / negative / non-finite / compact notation |
| `src/lib/statusLabel.test.ts` | 10 | Invoice / Subscription / Plan label + tone mappers |
| `src/lib/tierPrice.test.ts` | 10 | Graduated + volume + flat-fee edge cases |
| `src/lib/queryConfig.test.ts` | 14 | All four presets + `createQueryConfig` merge |
| `src/store/createFilterStore.test.ts` | 12 | Initial state · setFilter · sessionStorage roundtrip · route isolation · reset · fingerprint stability |
| `src/components/atoms/Button/Button.test.tsx` | 5 | Render · click · loading no-fire · disabled no-fire · variant class |
| `src/components/atoms/StatusBadge/StatusBadge.test.tsx` | 4 | Status→label · custom label · color tokens · pulse dot element |

**64 tests across 7 files.** Plus Storybook `play` interaction tests on Button, Input, Chip, Checkbox, Textarea, PolishedToggle, CtaButton, SearchBar, AnimatedCheckbox.

---

## Tradeoffs and design choices

- **No new colors.** Every component reuses existing Flexprice tokens (`#092E44` navy, zinc grays). Only animation and shape are new.
- **`react-docgen` disabled.** Default JS parser crashes on `ObjectMethod` shorthand inside arrays (pre-existing in `src/pages/developer/ServiceAccounts.tsx`). Every story declares its own `argTypes` so prop tables still render — only auto-extracted JSDoc descriptions are lost.
- **Custom Storybook theme + Welcome page + Design Tokens.** First impression matters; default purple Storybook felt like a missed opportunity given PostHog's reference link in the brief.
- **`framer-motion` for animations** instead of CSS-only — already in dependencies, gives spring physics for free, clean exits via `AnimatePresence`, respects `prefers-reduced-motion` automatically.
- **Animated variants are separate components** (`PolishedToggle` alongside `Toggle`, `AnimatedProgress` alongside `Progress`) so adopting them in the dashboard is opt-in and risk-free. The originals stay untouched.
- **DataTable virtualization is a flag**, not the default. Small datasets keep semantic `<tbody>` and the stagger animations.
- **Sort state lives inside DataTable** for drop-in convenience. Controlled API (`sort` / `onSortChange` props) would be a 5-min addition if a parent needs remote sort.
- **Filter store fingerprint, not full state, in URL.** A graduated invoice filter set serialises to a ~200-char query string. djb2 hash gets the same bookmarkability in 6 characters. The full state lives in `sessionStorage` for the same tab.

---

## Project structure

```
src/
├── components/
│   ├── atoms/             27 stories across existing + new atoms
│   ├── molecules/
│   │   ├── DataTable/     virtualizable, sortable, paginated
│   │   ├── MetricCard/    Card + AnimatedCounter composite
│   │   └── SearchBar/     debounced, ⌘K shortcut
│   └── organisms/
│       ├── SidebarNav/
│       └── PricingTierTable/
├── lib/                   queryConfig + 3 utility modules + their tests
├── store/                 createFilterStore (Challenge A) + tests
└── stories/
    ├── Welcome.stories.tsx        landing page (React, not MDX)
    ├── DesignTokens.mdx           foundations reference
    └── Showcase.stories.tsx       5 dashboard scenes
```

---

## Tech stack

React 18 · TypeScript (strict) · Vite · Tailwind CSS · Radix UI · Storybook 8 · framer-motion · `@tanstack/react-virtual` · `@tanstack/react-query` · Zustand · Vitest · Testing Library

---

## What I'd add with another day

- Visual regression snapshots via `@chromatic-com/storybook` (already in deps, just unwired)
- A real `EmptyState` organism — currently `NoDataCard` covers most of the surface
- Theme-aware Storybook (light/dark toggle in toolbar) — would need a Tailwind dark variant pass on every component
- A `useDebounce` hook extracted from SearchBar so other inputs can reuse it
- Extending `useFilterStore` with a server round-trip "share view" flow that swaps the local fingerprint for a backend slug — useful for cross-device sharing where `sessionStorage` doesn't survive

---

— Vasudha Jain
