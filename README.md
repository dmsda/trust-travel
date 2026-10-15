# TRUST.TRAVEL

<div align="center">

![TRUST.TRAVEL Banner](/assets/brand/og-cover.svg)

### Editorial Luxury Hotel Rental & Travel Booking Platform

*A meticulously crafted open-source travel starter template combining timeless editorial typography, architectural contours, warm ivory palettes, and production-grade Next.js App Router engineering.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-7%20Passing-287A55?style=flat-square)](https://nodejs.org/api/test.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-B9A17D?style=flat-square)](LICENSE)

[Architecture](docs/ARCHITECTURE.md) • [Design System](docs/DESIGN-SYSTEM.md) • [Motion & Gallery](docs/MOTION-AND-INTERACTION.md) • [Booking Engine](docs/BOOKING-FLOW.md) • [Assets & Licenses](docs/ASSETS-AND-LICENSING.md) • [Deployment](docs/DEPLOYMENT.md)

</div>

---

## ✦ Overview

**TRUST.TRAVEL** is an open-source travel accommodation and concierge booking platform inspired by high-end travel journalism and luxury editorial design. It transcends generic travel portal templates by pairing quiet luxury aesthetics—sun-bleached warm ivory surfaces, Cormorant Garamond serif headings, and signature arched card profiles—with a deterministic, full-stack Next.js architecture.

### Key Highlights
- **Authentic Editorial Aesthetic**: Warm ivory canvas (`#FAF9F6`), charcoal typography (`#171614`), and muted champagne gold accents (`#B9A17D`).
- **Signature Architectural Arches**: Iconic European arched image cards with smooth SVG connector lines.
- **Interactive Search Engine**: Destination autocomplete, interactive calendar date pickers, and room/guest capacity steppers.
- **Full Booking & Checkout Journey**: Transparent pricing breakdown (nights, cleaning, service fees, taxes), instant demo reference generation, and print-ready confirmation receipts.
- **Cross-Tab Synchronized Favorites**: Reactive shortlist powered by React's `useSyncExternalStore` for flicker-free client state and instant SSR compatibility.
- **100% Local Curated Assets**: 33 high-resolution photography files stored locally with full Unsplash commercial licensing and typed asset manifests.
- **Sophisticated Motion & Interactive Experience**: GPU-accelerated micro-interactions, staggered editorial headline reveals, clamped desktop parallax, 3D destination card tilt, ambient light tracking, and journal reading progress indicator.
- **Deterministic Next.js 16 Build**: Turbopack-accelerated, zero-error production prerender across all 29 static and dynamic routes.

---

## ✦ Visual Design System

```text
Warm Canvas       #FAF9F6  ████████  Base background for light sections
Surface White     #FFFFFF  ████████  Cards, popovers, and elevated panels
Stone Border      #E5E1DA  ████████  Hairline dividers and structural borders
Charcoal Primary  #171614  ████████  Display headings, primary buttons, logo
Stone Secondary   #77736E  ████████  Subtitles, night indicators, metadata
Gold Accent       #B9A17D  ████████  Compass star emblems, badges, ratings
Dark Section      #191815  ████████  Editorial dark experience banner & footer
```

For complete typography scales, custom cubic-bezier easing tokens, and responsive grid layouts, read the [Design System Documentation](docs/DESIGN-SYSTEM.md).

---

## ✦ Route Directory

TRUST.TRAVEL includes 18 fully implemented application routes plus an automated dynamic XML sitemap:

| Route Path | Type | Description |
| :--- | :--- | :--- |
| [`/`](/) | Static | Editorial homepage with hero search, arched destination showcase, category carousel, and dark experience banner. |
| [`/stays`](/stays) | Dynamic / Hybrid | Search results and accommodation catalog with multi-facet filters (destination, price, category, amenities). |
| [`/stays/[slug]`](/stays/the-brera-atelier-suite) | Dynamic | Property showcase with high-res photo gallery, host details, amenities, rules, and sticky reservation panel. |
| [`/destinations`](/destinations) | Static | Global destination index featuring regional descriptions and property counts. |
| [`/destinations/[slug]`](/destinations/scotland) | Static (Pre-rendered) | Deep editorial destination guides with seasonal advice, curated enclaves, and localized stays. |
| [`/property-types`](/property-types) | Static | Category browser covering boutique hotels, villas, alpine cabins, and lofts. |
| [`/transfers`](/transfers) | Static | Private chauffeur, helicopter, and scenic train transfers. |
| [`/leisure`](/leisure) | Static | Curated expeditions, culinary tastings, wellness retreats, and guided journeys. |
| [`/journal`](/journal) | Static | Travel journal and editorial essays on sustainable tourism and historic architecture. |
| [`/journal/[slug]`](/journal/historic-homes-legendary-stays) | Static (Pre-rendered) | Full-length editorial articles with pull quotes and related reading. |
| [`/favorites`](/favorites) | Static (Client Store) | Real-time shortlist of saved accommodations with instant removal and direct booking links. |
| [`/booking/[slug]`](/booking/the-brera-atelier-suite) | Dynamic | Multi-step demonstration checkout with validated guest details and transparent pricing breakdown. |
| [`/booking/confirmation/[ref]`](/booking/confirmation/TT-2026-AK4821) | Dynamic | Demonstration itinerary receipt with booking reference, pricing breakdown, and print action. |
| [`/about`](/about) | Static | Company ethos, craftsmanship, architectural values, and team manifesto. |
| [`/contact`](/contact) | Static | Concierge advisory contact form and global office locations. |
| [`/privacy`](/privacy) | Static | Comprehensive privacy notice and prototype data handling disclosures. |
| [`/terms`](/terms) | Static | Terms of service, booking policies, and cancellation standards. |
| [`/_not-found`](/_not-found) | Static | Editorial 404 page with recovery navigation links. |
| [`/sitemap.xml`](/sitemap.xml) | Dynamic Feed | Search engine XML sitemap indexing all active pages. |

---

## ✦ Interactive Feature Tour

### 1. Hero Search Panel
- **Destination Autocomplete**: Instant popover matching destinations, countries, and regional highlights.
- **Date Range Picker**: Intuitive calendar popover calculating stay duration in nights.
- **Guest & Room Selectors**: Stepper controls enforcing capacity bounds without allowing negative values.
- **URL Synchronization**: Search queries serialize cleanly into bookmarkable URL parameters.

### 2. Editorial Destination Showcase
- Three signature arched cards (Scotland, Germany, Nepal) with organic curved SVG connector paths matching the reference layout.
- Responsive mobile adaptation converting the desktop layout into an accessible swipeable carousel.

### 3. Dark Experience Banner
- Deep warm charcoal canvas (`#191815`) featuring an editorial constellation of 7 circular photo vignettes.
- Showcases curated travel experiences (yacht charters, wine harvests, thermal springs).

### 4. Demo Booking Engine
- Strict client-side validation ensuring guest details and email formatting are verified before reservation generation.
- Deterministic reference code generator creating unique `TT-2026-XX####` confirmation identifiers.
- Demonstration state safely saved to `localStorage` under `tt_demo_bookings`.

---

## ✦ Getting Started

### Prerequisites
- Node.js 20.x or 22.x LTS
- npm 10+, pnpm 9+, or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/dmsda/trust-travel.git
cd trust-travel

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✦ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack. |
| `npm run build` | Compiles optimized production bundle and pre-renders static routes. |
| `npm run start` | Boots the compiled production server. |
| `npm run lint` | Runs ESLint 9 checks across all TypeScript and React files. |
| `npm run type-check` | Runs `tsc --noEmit` to verify type safety across the codebase. |
| `npm test` | Runs the Node.js native test runner suite in `tests/critical-flows.test.mjs`. |

---

## ✦ Testing & Verification Status

The project enforces automated test coverage over critical mathematical and operational flows:

```bash
$ npm test
✔ calculates correct nights between two dates (0.44ms)
✔ calculates consistent totals with fees and taxes (0.13ms)
✔ filters by destination keyword correctly (0.18ms)
✔ filters by category correctly (0.08ms)
✔ sorts by price low to high (0.07ms)
✔ sorts by rating descending (0.14ms)
✔ generates valid prefixed reference string (0.26ms)

Suites: 4 passed, 4 total
Tests:  7 passed, 7 total
Time:   64ms
```

- **TypeScript**: `0` errors across all components, utilities, and page routes.
- **ESLint**: `0` errors, `0` warnings.
- **Next.js Build**: `29/29` static and dynamic routes compiled and pre-rendered successfully.

---

## ✦ Assets & Licensing

- **Codebase**: Released under the open-source [MIT License](LICENSE).
- **Brand Identity**: Original SVG vector logos and badges (`public/assets/brand/`) designed specifically for TRUST.TRAVEL.
- **Photography Assets**: Sourced under the [Unsplash Free Commercial License](https://unsplash.com/license) and bundled locally for 100% reliable offline reproduction.
- See [Assets & Licensing Documentation](docs/ASSETS-AND-LICENSING.md) for full attribution details.

---

## ✦ Prototype Transparency & Disclaimer

> [!NOTE]
> **TRUST.TRAVEL is a demonstration prototype and open-source starter template.**  
> - No real credit card or payment data is ever requested or transmitted.  
> - No actual hotel reservations or airline bookings are processed with real-world providers.  
> - All reservation confirmation references (`TT-2026-XX####`) are generated locally for demonstration purposes.  
> - For guidelines on connecting this template to live payment gateways (Stripe) and property management systems (PMS), see [Booking Flow Integration](docs/BOOKING-FLOW.md).

---

<div align="center">
Crafted with care for discerning travelers and thoughtful web engineers.
</div>
