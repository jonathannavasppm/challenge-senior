# EVALUATOR GUIDE — ShopMetrics Technical Assessment

> **⚠️ CONFIDENTIAL — Do NOT share with candidates**

This document lists all intentional bugs, anti-patterns, and code quality issues planted in the codebase. Use it to score candidate findings during and after the session.

**Total planted issues: 46**
**Scoring baseline:**
- 5–8 issues → Junior/Mid level
- 12–16 issues → Mid-Senior level
- 20–30+ issues → Senior (8+ years) level

---

## LEVEL 1 — Basic (8 issues)
*Any developer with 3+ years should catch these.*

| # | File | Issue | Score Weight |
|---|------|-------|-------------|
| L1-1 | `dashboard/page.tsx:1` | `"use client"` on the root dashboard page — should be a Server Component | 1pt |
| L1-2 | `dashboard/page.tsx:20-38` | Data fetching with `useEffect + useState` instead of `async` Server Component | 1pt |
| L1-3 | `components/HeroBanner.tsx:30` | Native `<img>` tag instead of `next/image` | 1pt |
| L1-4 | `components/HeroBanner.tsx:31` | No `width`/`height` on image → **CLS (Cumulative Layout Shift)** — page jumps on load | 1pt |
| L1-5 | `components/HeroBanner.tsx:32` | `alt="banner"` — generic, non-descriptive alt text (accessibility) | 1pt |
| L1-6 | `components/MetricsCards.tsx` | Inline `style={{}}` mixed with Tailwind classes throughout the component | 1pt |
| L1-7 | `components/OrdersTable.tsx:101` | `key={index}` on a sortable list — causes incorrect reconciliation when rows reorder | 1pt |
| L1-8 | `components/ProductList.tsx:28` | Hardcoded color `bg-[#1a1a2e]` instead of a design token or Tailwind semantic color | 1pt |

---

## LEVEL 2 — Intermediate (14 issues)
*A developer with 5+ years should catch these in addition to Level 1.*

| # | File | Issue | Score Weight |
|---|------|-------|-------------|
| L2-1 | `dashboard/page.tsx:22-29` | Sequential `await` calls (cascade fetching) instead of `Promise.all` — 4 requests run serially adding ~1250ms | 2pt |
| L2-2 | `dashboard/page.tsx` | No `generateMetadata` export — dashboard has no dynamic SEO metadata | 1pt |
| L2-3 | `components/HeroBanner.tsx` | Image URL `?w=4000&q=100` — massive unoptimized image (3–5MB), no `srcSet`/`sizes` for responsive delivery | 2pt |
| L2-4 | `components/HeroBanner.tsx` | No `loading="lazy"` or `priority` hint — this is the LCP element and it's not prioritized | 2pt |
| L2-5 | `components/HeroBanner.tsx` | No blur placeholder — blank space shown until the 4000px image downloads | 1pt |
| L2-6 | `components/MetricsCards.tsx:11` | Receives entire `DashboardData` object as prop when only `metrics` is needed (over-fetching prop) | 1pt |
| L2-7 | `components/MetricsCards.tsx:26-38` | `setInterval` animation without `clearInterval` cleanup — timer leaks on unmount | 2pt |
| L2-8 | `components/OrdersTable.tsx:13-18` | `obtenerClaseEstado()` function named in Spanish — inconsistent naming convention | 1pt |
| L2-9 | `components/OrdersTable.tsx:26` | `filaSeleccionada` variable named in Spanish | 1pt |
| L2-10 | `components/OrdersTable.tsx:101` | `<tr>` with `onClick` has no `role`, `tabIndex`, or `onKeyDown` — not keyboard accessible | 1pt |
| L2-11 | `components/ProductCatalog.tsx` | Variables `productosFiltrados`, `estaCargando`, `cantidadTotal`, `manejarBusqueda`, `mostrarMasProductos` — all in Spanish | 1pt |
| L2-12 | `components/ProductCatalog.tsx` | No `React.memo` on `ProductCard` — every card re-renders on each keystroke in the search box | 2pt |
| L2-13 | `components/ProductCard.tsx:16-17` | `useState` for hover/expanded state — should be CSS `:hover` pseudo-class | 1pt |
| L2-14 | `components/ProductList.tsx:16-21` | Derived state: `topProducts` is computed from `products + filterText` inside `useEffect + setState` — should be `useMemo` or inline computation | 2pt |

---

## LEVEL 3 — Advanced (24 issues)
*Only a developer with 8+ years of production experience should catch these.*

| # | File | Issue | Score Weight |
|---|------|-------|-------------|
| L3-1 | `dashboard/page.tsx` | No `<Suspense>` boundaries — the entire dashboard (including 5,000 products and the 4000px banner) blocks rendering until ALL data resolves. Each section should stream independently. | 3pt |
| L3-2 | `dashboard/layout.tsx:1` | `"use client"` on the layout + importing `Sidebar` and `Header` from barrel — forces the entire dashboard subtree into the client bundle, eliminating RSC benefits | 3pt |
| L3-3 | `components/index.ts` | Barrel file re-exports everything including `ProductCatalog` (5,000 items) and `HeroBanner` (4MB image loader) — **kills tree-shaking**, bloats every page that imports any single component from this file | 3pt |
| L3-4 | `components/HeroBanner.tsx:12-24` | `useEffect` + `getBoundingClientRect()` on every `resize` event to "size" the image — completely unnecessary if using `next/image` with `fill` prop or responsive `sizes`. Also missing `removeEventListener` cleanup. | 2pt |
| L3-5 | `components/HeroBanner.tsx:33` | `style={{height: '500px'}}` fixed height — image deforms/crops on mobile. Should use `aspect-ratio` via Tailwind (`aspect-video` or `aspect-[16/9]`) | 2pt |
| L3-6 | `components/HeroBanner.tsx:40-43` | Gradient overlay using `style={{background: 'linear-gradient(...)'}}` — should be `bg-gradient-to-b from-transparent to-black/70` Tailwind classes | 1pt |
| L3-7 | `components/HeroBanner.tsx` | By using `<img>` instead of `next/image`, the component loses automatic WebP/AVIF conversion, which next/image provides for free. The 4000px JPEG could be served as a 200KB WebP. | 2pt |
| L3-8 | `components/MetricsCards.tsx:19-26` | Layout thrashing: reads `ref.current.offsetHeight` (forces layout) then writes `ref.current.style.minHeight` in the same synchronous block within a `useEffect` — causes forced reflow | 3pt |
| L3-9 | `components/OrdersTable.tsx:43-50` | `.sort()` mutates the `filteredOrders` array in place — in React 19 concurrent mode, this can cause visual inconsistencies because the same array is shared across render passes | 3pt |
| L3-10 | `components/ProductCard.tsx:30-42` | `new IntersectionObserver()` created **per card** — with 5,000 cards, this registers 5,000 observers simultaneously. No `observer.disconnect()` in cleanup → **massive memory leak** | 3pt |
| L3-11 | `components/ProductCard.tsx:20-23` | `allProducts.find(p => p.id === product.id)` called inside every render of every card — O(n) lookup × 5,000 cards = O(n²) on every render cycle | 3pt |
| L3-12 | `components/ProductCatalog.tsx:91-97` | `calcularDescuento()` called inside `.map()` on every render — 5,000 × expensive calculation on each keystroke. Should be memoized per product. | 2pt |
| L3-13 | `components/ProductCatalog.tsx` | No virtualization (no `react-window`, `react-virtuoso`, or `IntersectionObserver` pagination) — all 5,000 DOM nodes rendered simultaneously → **browser freeze** | 3pt |
| L3-14 | `components/ProductCatalog.tsx` | No `startTransition` to defer the heavy filter/sort re-render — UI is blocked and unresponsive during the 5,000-item re-render | 3pt |
| L3-15 | `components/ProductCatalog.tsx` | All 5,000 `<img>` tags load simultaneously — no `loading="lazy"` or batched loading → **network waterfall with 5,000 concurrent image requests** | 2pt |
| L3-16 | `components/ProductList.tsx:36-39` | Mixed controlled/uncontrolled input: `ref` + `defaultValue` + `onChange` calling `setState`. The input is uncontrolled (`defaultValue`) but the parent drives `filterText` state — React will warn and behavior is undefined | 3pt |
| L3-17 | `components/SearchFilter.tsx:37-43` | `useEffect` fires on every `onFilterChange` prop change — but `onFilterChange` is a new function reference each render (not memoized in parent) → **infinite render loop trigger** | 3pt |
| L3-18 | `hooks/useProductFilters.ts:79` | `products` array in the `useEffect` dependency is a prop — if the parent passes `ALL_PRODUCTS` inline, a new array reference is created each render → **infinite loop** | 3pt |
| L3-19 | `hooks/usePolling.ts:14-33` | `setInterval` does not pause when tab is hidden (`document.visibilityState === 'hidden'`) — continues firing API calls in background tabs, wasting bandwidth and battery | 2pt |
| L3-20 | `hooks/usePolling.ts` | `isPolling` state is tracked but the `setInterval` is **not conditional on it** — calling `stopPolling()` changes state but does not actually stop the interval | 3pt |
| L3-21 | `actions/dashboard.ts:8` | Module-level `requestCount` mutable variable in a Server Action — **not idempotent**. In serverless/edge deployments this counter resets per instance and per cold start, making the logged count meaningless and misleading. Each invocation has side effects beyond its declared purpose. | 3pt |
| L3-22 | `middleware.ts` | `matcher` pattern `/((?!_next/static|_next/image|favicon.ico).*)` still runs the middleware on **all API routes, all page routes, and all non-excluded paths including fonts and manifests** — should be scoped only to the routes that need it (e.g., only `/dashboard/*`) | 2pt |
| L3-23 | `components/Header.tsx:10-15` | `new Date().toLocaleString()` called during render — this is an **impure function** that produces different output on server vs client → **hydration mismatch** error. Must be wrapped in `useEffect` or use `suppressHydrationWarning`. | 3pt |
| L3-24 | `dashboard/page.tsx` | Missing `loading.tsx` and `error.tsx` files in the `dashboard/` directory — no loading UI during navigation, no error boundary for failed fetches. In production, any fetch failure crashes the entire route silently. | 2pt |

---

## Scoring Guide

| Score | Assessment |
|-------|-----------|
| 0–10 pts | Mid-level (3–4 years) |
| 11–25 pts | Senior-leaning (5–6 years) |
| 26–45 pts | Senior (7–8 years) |
| 46–70 pts | Staff-level (8+ years, deep Next.js/React knowledge) |

### Bonus Points (interviewer discretion)
- **+3pt** Candidate proposes `react-virtuoso` or `react-window` with a concrete implementation sketch
- **+3pt** Candidate explains the RSC boundary model and how to correctly split client/server in `layout.tsx`
- **+3pt** Candidate mentions `useOptimistic` or concurrent features as the fix for the `startTransition` gap
- **+2pt** Candidate notices that `useDashboard.ts` exists but is **never used** (dead code)
- **+2pt** Candidate explains that the barrel file issue can be partially mitigated with `/* @__PURE__ */` or path-based imports

---

## Key Red Flags During the Session

- Candidate only finds visual/styling issues → not senior-level
- Candidate finds bugs but cannot explain **why** they are bugs → surface-level knowledge
- Candidate proposes WebSocket refactor unprompted → scope creep, poor prioritization
- Candidate does not mention `Suspense`/streaming at all → missing core Next.js 13+ knowledge
- Candidate focuses only on Spanish naming without finding performance issues → missing the forest for the trees

## Strong Positive Signals

- Mentions `startTransition` + virtualization together as the compound fix for `ProductCatalog`
- Identifies the hydration mismatch in `Header.tsx` without running the app
- Explains the IntersectionObserver × 5,000 memory leak as an O(n) observer registration problem
- Proposes `useMemo` for derived data AND explains why `useEffect + setState` is an anti-pattern for synchronous derived state
- Identifies that the middleware matcher runs on static assets and explains the performance cost
