# Changelog

All notable changes to the **TRUST.TRAVEL** codebase are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-10-15

### Added
- **Complete Visual Architecture & App Router Setup**:
  - Implemented 18 interconnected routes matching the luxury travel editorial reference.
  - Configured Next.js 16.4.1 (App Router) with React 19.3 and Tailwind CSS v4.
  - Setup custom editorial design tokens (`#FAF9F6` warm canvas, `#171614` charcoal text, `#B9A17D` champagne gold).
- **Brand & Vector Identity Assets**:
  - Original SVG suite in `public/assets/brand/`: `logo.svg`, `logo-dark.svg`, `logo-icon.svg`, `favicon.svg`, and `og-cover.svg`.
  - Scalable vector favicon (`public/favicon.svg`) and valid web app manifest (`public/site.webmanifest`).
- **Curated High-Resolution Asset Library**:
  - Downloaded and verified 33 local photography assets across Hero, Destinations, Properties, Categories, Articles, and Vignettes.
  - Created structured, typed metadata manifest in `src/data/asset-manifest.ts` with Unsplash commercial licensing info.
- **Search & Booking Engine**:
  - Interactive `HeroSearchBar` featuring destination suggestions, date range popovers, and guest/room steppers.
  - Pure calculation utilities for nights, cleaning fees, service fees, and local taxes (`src/lib/booking-utils.ts`).
  - Interactive multi-step booking checkout (`/booking/[slug]`) and confirmation receipt route (`/booking/confirmation/[reference]`).
  - Safe demo reservation storage in `localStorage` with explicit prototype status notices.
- **Reactive Shortlist & External Store**:
  - Real-time favorites engine built with `useSyncExternalStore` for seamless cross-tab synchronization and SSR safety.
  - Live numerical badge counter in navigation bar.
- **Documentation Suite**:
  - Comprehensive guides in `docs/`: `ARCHITECTURE.md`, `DESIGN-SYSTEM.md`, `ASSETS-AND-LICENSING.md`, `BOOKING-FLOW.md`, `DEPLOYMENT.md`.
  - Open-source root documentation: `CONTRIBUTING.md`, `LICENSE` (MIT), `SECURITY.md`, `.env.example`.
- **Quality & Automated Testing**:
  - Unit and integration test suite in `tests/critical-flows.test.mjs` verifying dates, pricing formulas, filter queries, and reference codes.
  - Strict TypeScript check and ESLint 9 configuration passing with 0 diagnostics.

### Changed
- **Footer Modernization**:
  - Replaced ambiguous third-party app store badges with an honest "Mobile App (Private Beta)" presentation.
  - Standardized legal copy, privacy terms, and copyright notices.
- **Prerender Determinism**:
  - Replaced non-deterministic `new Date()` calls during server prerender with deterministic reference dates.
  - Wrapped dynamic parameters in Suspense boundaries for Next.js 16 Partial Prerendering compliance.

### Fixed
- **React 19 / Next.js 16 Route Resolution**:
  - Resolved `use(params)` prerender halts by isolating parameter unwrap inside dedicated Suspense child wrappers.
- **Cascading Render Diagnostics**:
  - Replaced synchronous `setState` in `useEffect` hooks with subscription-based `useSyncExternalStore` pattern.
- **Dynamic Static Params Constraint**:
  - Cleaned up client component page exports to conform with Next.js App Router rules.
