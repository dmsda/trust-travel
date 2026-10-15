# TRUST.TRAVEL Architecture Documentation

## 1. Overview

**TRUST.TRAVEL** is an editorial luxury travel booking web application and open-source starter template built with **Next.js 16.4 (App Router with Turbopack)**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**.

The platform is designed around editorial aesthetics: warm ivory backgrounds (`#FAF9F6`), charcoal typography (`#171614`), muted gold accents (`#B9A17D`), elegant arched card geometry, and high-performance client/server separation.

---

## 2. Framework & Runtime Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.1 (App Router) | Nested layouts, partial prerendering, streaming, dynamic metadata, and static route generation. |
| **Bundler & Engine** | Turbopack | Sub-second cold starts and rapid production builds with incremental caching. |
| **UI Library** | React 19.3.0 | Server components by default; modern hooks (`useActionState`, `useOptimistic`, `useSyncExternalStore`). |
| **Language** | TypeScript 5 (Strict Mode) | Full type safety across domain models, search queries, booking payloads, and component props. |
| **Styling** | Tailwind CSS v4 | CSS-first configuration using `@theme` directives with custom design tokens and no runtime overhead. |
| **Icons** | Lucide React | High-performance, accessible SVG icon set with consistent 1.5px to 2px stroke weights. |
| **Date Handling** | date-fns 4.4 | Tree-shakeable, immutable date calculations for reservation dates and calendar pickers. |
| **Testing** | Node.js Test Runner (`node:test`) | Native, zero-dependency unit and integration test runner executing in sub-100ms. |

---

## 3. Directory Structure

```text
trust-travel/
├── docs/                           # Architecture, Design System, Asset, & Booking Docs
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── ASSETS-AND-LICENSING.md
│   ├── BOOKING-FLOW.md
│   └── DEPLOYMENT.md
├── public/                         # Static Web Assets
│   ├── assets/
│   │   ├── brand/                  # Vector brand identity (logos, badges, icons, OG)
│   │   └── images/                 # Curated local photography (hero, stays, categories)
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── app/                        # Next.js App Router (18 routes + XML sitemap)
│   │   ├── layout.tsx              # Root HTML shell, fonts, navbar, footer, auth modal
│   │   ├── page.tsx                # Homepage assembling editorial sections
│   │   ├── globals.css             # Tailwind v4 theme & custom utilities
│   │   ├── sitemap.ts              # Dynamic XML sitemap generator
│   │   ├── stays/                  # Property search, filter & detail routes
│   │   ├── destinations/           # Destination showcase & narrative routes
│   │   ├── property-types/         # Category browser
│   │   ├── transfers/              # Chauffeur & scenic transfer services
│   │   ├── leisure/                # Curated experiences & expeditions
│   │   ├── journal/                # Editorial magazine & storytelling
│   │   ├── favorites/              # Saved properties shortlist
│   │   ├── booking/                # Multi-step checkout & confirmation
│   │   ├── about/                  # Brand ethos and company history
│   │   ├── contact/                # Concierge inquiry form
│   │   ├── privacy/                # Privacy notice and prototype data disclosures
│   │   └── terms/                  # Terms of service and booking conditions
│   ├── components/                 # Reusable UI component library
│   │   ├── brand/                  # Logo, CompassIcon, brand badges
│   │   ├── destinations/           # DestinationCard, ConnectorLines
│   │   ├── editorial/              # ExperienceBanner, ArticleCard
│   │   ├── layout/                 # Navbar, Footer, AuthModal
│   │   ├── newsletter/             # NewsletterSection
│   │   ├── properties/             # PropertyCard, PropertyFilters, Carousel
│   │   └── search/                 # HeroSearchBar, DatePicker, GuestSelector
│   ├── data/                       # Local structured datasets & manifests
│   │   ├── amenities.ts
│   │   ├── articles.ts
│   │   ├── asset-manifest.ts
│   │   ├── destinations.ts
│   │   ├── leisure.ts
│   │   ├── properties.ts
│   │   ├── property-types.ts
│   │   └── transfers.ts
│   ├── lib/                        # Pure utility functions & stores
│   │   ├── booking-utils.ts
│   │   ├── currency.ts
│   │   ├── date-utils.ts
│   │   ├── favorites.ts
│   │   └── search-utils.ts
│   └── types/                      # TypeScript domain definitions
│       └── index.ts
├── tests/                          # Automated test suites
│   └── critical-flows.test.mjs
├── .env.example
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── tsconfig.json
└── package.json
```

---

## 4. Component & Rendering Strategy

### 4.1 Server Components (RSC) vs Client Components
To maximize performance, reduce client JavaScript bundles, and maintain excellent Core Web Vitals, pages use Server Components by default:
- **Server Components**: Layout shells, static editorial banners, article content, brand narratives, not-found screens, dynamic sitemap XML.
- **Client Components (`'use client'`)**: Interactive UI elements including:
  - `HeroSearchBar.tsx` (popover destination query, date pickers, room/guest counters).
  - `PropertyFilters.tsx` (multi-facet filtering, sorting, price sliders).
  - `Navbar.tsx` (currency switcher, language menu, mobile slide-over menu).
  - `AuthModal.tsx` (client-side demo authentication modal).
  - `StayDetailClient.tsx` (image lightbox gallery, sticky pricing panel, share trigger).
  - `BookingForm.tsx` (client-side validation, step transitions, local storage reservation dispatch).

### 4.2 React 19 & App Router Adaptations
1. **Dynamic Route Parameters**: Under React 19 and Next.js 16, dynamic params (`Promise<{ slug: string }>`) are resolved using `use(params)` or `await params`. Client components wrap `use(params)` inside dedicated sub-components wrapped in `<Suspense fallback={...}>` to prevent prerender halts.
2. **Synchronous Effect Safeguards**: Syncing browser state (`localStorage`) in React 19 uses `useSyncExternalStore` rather than calling `setState` inside `useEffect`, preventing hydration mismatch and cascading render warnings.
3. **Deterministic Prerender Dates**: Server-rendered components avoid calling `new Date()` directly at prerender time to ensure repeatable builds under Next.js 16 Cache Components.

---

## 5. State Management & Data Flow

```mermaid
graph TD
    User([User Action]) --> SearchBar[HeroSearchBar]
    SearchBar -->|URL Query Params| StaysPage[/stays?destination=scotland&guests=2/]
    StaysPage --> FilterEngine[search-utils.ts]
    FilterEngine --> PropertyGrid[PropertyCard Grid]
    
    PropertyGrid -->|Heart Click| FavoritesStore[useSyncExternalStore / localStorage]
    FavoritesStore -->|Reactive Sync| NavbarBadge[Navbar Saved Count]
    FavoritesStore -->|Cross-Tab Broadcast| FavoritesPage[/favorites]
    
    PropertyGrid -->|Select Stay| StayDetail[/stays/the-brera-atelier-suite]
    StayDetail -->|Book Stay CTA| BookingPage[/booking/the-brera-atelier-suite]
    BookingPage --> PriceEngine[booking-utils.ts]
    BookingPage -->|Form Submission| LocalBookingStorage[localStorage: tt_demo_bookings]
    LocalBookingStorage --> ConfirmationPage[/booking/confirmation/TT-2026-XX0000]
```

### 5.1 Favorites Store Architecture (`src/lib/favorites.ts`)
The favorites feature is implemented as a subscription-based external store:
- Backed by `window.localStorage` under the key `'trust_travel_favorites'`.
- Subscribed via `window.addEventListener('storage', ...)` and a local custom event dispatch for same-window updates.
- Exposed to React via `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`.
- Eliminates hydration flicker and guarantees zero desynchronization across tabs.

### 5.2 Search State Architecture (`src/lib/search-utils.ts`)
The search experience uses URL search parameters (`?destination=...&type=...&guests=...&sort=...`) as the single source of truth. This guarantees:
- Full shareability and bookmarkability of search results.
- Native browser back/forward navigation support.
- Zero desynchronization between hero inputs and property result filters.

---

## 6. Security & Privacy Architecture
1. **Zero Secret Leakage**: No API secrets or private tokens exist in client bundles; all configuration is isolated via `.env.example`.
2. **Local Demo Reservation Engine**: Booking submissions do not collect or transmit payment card data. Demo reservations are stored strictly in client-side `localStorage` with explicit UI disclaimers.
3. **Safe External Links**: All external hyperlinks apply `rel="noopener noreferrer"`.
4. **Content Security Readiness**: Clean SVG assets with no inline script execution or dangerous `eval()` patterns.
