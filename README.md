# Flexprice — Frontend Take-Home Submission

A Storybook component library extracted from the Flexprice billing dashboard. Built on the existing `flexprice-front` codebase (atoms / molecules / organisms structure already in place).

> **Live Storybook:** `https://your-vercel-url.vercel.app` *(replace once deployed)*
> **Repo:** `https://github.com/jainvasu1/flexprice-front-assignment`

---

## Quick start

```bash
npm install
npm run storybook        # localhost:6006
npm run test             # vitest
npm run build-storybook  # output -> storybook-static/
```

> If `npm run storybook` errors with `supabaseUrl is required`, copy `.env.example` to `.env` (no real secrets needed — placeholder values work for Storybook).

---

## What's inside

### Atoms
| Component | Notes |
|---|---|
| Button | 7 variants × 5 sizes, loading, disabled, icon slots, click-interaction test |
| Input, Textarea | Label / error / helper-text / disabled, typing-interaction tests |
| Select | 7 stories incl. radio-style and no-options |
| Tooltip | All 4 sides, rich content slot |
| Spinner, Loader | Sized variants |
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
Composite scenes proving the atoms work together as a real product:
- **Invoices Page** — full table with status badges, filters, search
- **Billing Page** — current plan + usage progress + preferences toggles
- **Empty Dashboard** — hero CTA empty state
- **Metrics Dashboard** — 4 animated metric cards + usage bars + top-customers list
- **Onboarding Wizard** — 4-step interactive flow with animated stepper

Plus a **branded Welcome MDX** as the landing page (`Welcome` in the sidebar) with custom Storybook theme.

---

## Advanced challenges

### ✅ Challenge B — Virtualised DataTable
`Molecules / DataTable / Virtualized10k` — **10,000 mock rows** rendered with `@tanstack/react-virtual`. Only ~12 rows mounted to the DOM at any time. Configurable `estimatedRowHeight`, `maxHeight`, overscan buffer.

### ✅ Challenge C — Configurable TanStack Query caching
`src/lib/queryConfig.ts` exports the four presets the assignment asks for:

```ts
import { GLOBAL_DEFAULTS, REALTIME, DEFAULT, STATIC, createQueryConfig } from '@/lib/queryConfig';

new QueryClient({ defaultOptions: { queries: GLOBAL_DEFAULTS } });

useQuery({ queryKey: ['plans'],   queryFn, ...STATIC });
useQuery({ queryKey: ['usage'],   queryFn, ...REALTIME });
useQuery({ queryKey: ['invoice'], queryFn, ...DEFAULT });
```

Behaviour documented by `src/lib/queryConfig.test.ts` (14 tests).

### ⏭️ Challenge A — Filter persistence
Skipped to keep scope tight. Sketch: Zustand store keyed by route, hydrated from `sessionStorage`, syncing only a `crc32` fingerprint to the URL hash. Happy to walk through the design in a follow-up.

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
| `src/components/atoms/Button/Button.test.tsx` | 5 | Render, click, loading/disabled no-fire, variant class |
| `src/components/atoms/StatusBadge/StatusBadge.test.tsx` | 4 | Status→label, custom label, color tokens, dot element |

**52 tests across 6 files.** Plus Storybook `play` interaction tests on Button, Input, Chip, Checkbox, Textarea, PolishedToggle, CtaButton, SearchBar, AnimatedCheckbox.

---

## Tradeoffs and design choices

- **No new colors.** Everything reuses existing Flexprice tokens (`#092E44` navy, zinc grays). Only animation and shape are new.
- **`react-docgen` disabled.** Default JS parser crashes on `ObjectMethod` shorthand inside arrays (pre-existing in `src/pages/developer/ServiceAccounts.tsx`). Every story declares its own `argTypes` so prop tables still render — only auto-extracted JSDoc descriptions are lost.
- **Custom Storybook theme + manager + Welcome MDX.** First impression matters; default purple Storybook is a missed opportunity.
- **`framer-motion` for animations** instead of CSS-only — already in deps, gives spring physics for free, clean exits via `AnimatePresence`.
- **Animated variants are separate components** (`PolishedToggle` alongside `Toggle`, etc.) so adopting them in the dashboard is opt-in and risk-free.
- **DataTable virtualization is a flag**, not the default. Small datasets keep semantic `<tbody>` and stagger animations.
- **Sort state lives inside DataTable** for drop-in convenience. Controlled API would be a 5-min addition if a parent needs remote sort.

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Radix UI · Storybook 8 · framer-motion · `@tanstack/react-virtual` · `@tanstack/react-query` · Vitest · Testing Library

---

## What I'd add with another day

- Challenge A (filter persistence) end-to-end
- Visual regression snapshots via `@chromatic-com/storybook` (already in deps)
- A real `EmptyState` organism — currently `NoDataCard` covers most of the surface
- Theme-aware Storybook (light/dark toggle in toolbar)
- A `useDebounce` hook extracted from SearchBar
