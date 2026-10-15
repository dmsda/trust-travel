# TRUST.TRAVEL Design System & Visual Guidelines

## 1. Visual Philosophy

TRUST.TRAVEL marries the restraint of classical luxury publishing with modern digital precision. The design avoids harsh contrasts, aggressive marketing badges, and neon accents in favor of:
- **Warm Editorial Canvas**: Creamy, sun-bleached linen and warm ivory backdrops.
- **Literary Typography**: Cormorant Garamond serif headlines paired with crisp, highly legible geometric sans-serif body text.
- **Architectural Curves**: Distinct arched top contours inspired by historic European arcades and windows.
- **Tactile Materiality**: Restrained borders (`#E5E1DA`), gentle drop shadows, and muted champagne gold accents (`#B9A17D`).

---

## 2. Color Palette & Design Tokens

Configured directly in `src/app/globals.css` via Tailwind CSS v4 `@theme` directives:

### 2.1 Core Neutral & Surface Tokens

| Token Name | Hex Code | Tailwind Token | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Warm Canvas** | `#FAF9F6` | `bg-warm-bg` | Global page background, light section foundations. |
| **Pure Surface** | `#FFFFFF` | `bg-surface` | Property cards, dropdown menus, popovers, input fields. |
| **Stone Muted** | `#F0EEEA` | `bg-stone-muted` | Secondary pill tags, hover states, disabled button backgrounds. |
| **Stone Border** | `#E5E1DA` | `border-stone-border` | Hairline dividers, card outlines, input borders. |
| **Charcoal Primary** | `#171614` | `text-charcoal-text` | Primary headings, logo text, strong body text, CTA buttons. |
| **Stone Secondary** | `#77736E` | `text-secondary-text` | Subtitles, meta tags, night indicators, footer links. |
| **Dark Section** | `#191815` | `bg-dark-section` | Full-width editorial experience banner and dark modules. |

### 2.2 Accent & Semantic Tokens

| Token Name | Hex Code | Tailwind Token | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Gold Accent** | `#B9A17D` | `text-gold-accent` | Compass star icons, featured tags, active indicators, ratings. |
| **Gold Hover** | `#A58D6B` | `hover:bg-gold-accent-hover` | Interactive state for primary gold action elements. |
| **Success Pine** | `#287A55` | `text-success` | Booking confirmed badge, available status, sustainability tag. |
| **Warning / Error** | `#B42318` | `text-error` | Validation alerts, cancellation notices, required field markers. |

---

## 3. Typography Hierarchy

### 3.1 Font Families
- **Display Serif**: `Cormorant Garamond`, Georgia, serif (`--font-serif`)  
  Used for all `h1`, `h2`, `h3`, quote callouts, and editorial subheads.
- **Body & Interface Sans**: `Plus Jakarta Sans`, system-ui, sans-serif (`--font-sans`)  
  Used for body copy, form inputs, button labels, navigation links, and numerical pricing.

### 3.2 Scale & Leading Specifications

| Element | Size (Desktop / Mobile) | Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display `h1`** | 64px / 40px | 1.15 | `-0.025em` | Regular (400) / Medium (500) |
| **Section Title `h2`** | 44px / 32px | 1.2 | `-0.02em` | Regular (400) |
| **Card Title `h3`** | 22px / 20px | 1.3 | `-0.01em` | Medium (500) |
| **Editorial Lead** | 18px / 16px | 1.65 | Normal | Regular (400) |
| **Body Regular** | 15px / 14px | 1.6 | Normal | Regular (400) |
| **Caption & Meta** | 13px / 12px | 1.4 | `+0.01em` | Medium (500) |
| **Button & Label** | 14px / 13px | 1.2 | `+0.02em` | SemiBold (600) |

---

## 4. Architectural Geometry & Card Styles

TRUST.TRAVEL features signature curved card contours that reflect the visual reference:

```css
/* Arched Destination Card Profiles */
.arch-card-left {
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
}

.arch-card-tall {
  border-top-left-radius: 140px;
  border-top-right-radius: 140px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
}

.arch-card-right {
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
}
```

### Card Ratios
- **Hero Destination Showcase**: Left (`aspect-[3/4.2]`), Middle Tall (`aspect-[3/4.8]`), Right (`aspect-[3/4.2]`).
- **Property Stays Cards**: Standardized image box with `aspect-[4/3]`, rounded outer shell with `rounded-2xl` (16px), subtle inner hairline border `border-stone-border/60`.
- **Property Type Carousel**: Compact vertical arched cards with `w-[155px] h-[215px]` and `rounded-[28px]`.
- **Experience Banner Vignettes**: 7 floating circular vignettes with `rounded-full` and `border-2 border-white/20`.

---

## 5. Component Anatomy & Behavior

### 5.1 Global Navigation (`Navbar.tsx`)
- **Height**: 80px fixed desktop, 72px mobile.
- **Backdrop**: `bg-[#FAF9F6]/85 backdrop-blur-md` with hairline border `border-[#E5E1DA]/80`.
- **Interactive Controls**:
  - Currency switcher (USD, EUR, GBP, JPY).
  - Language menu (English, Français, Deutsch, Italiano).
  - Favorites badge with real-time numeric counter.
  - Sign-in button opening an accessible demo modal.
  - Mobile slide-out drawer with full route access.

### 5.2 Hero Search Panel (`HeroSearchBar.tsx`)
- Floating elevated pill container (`bg-white rounded-full shadow-xl shadow-stone-900/5`).
- Four tactile trigger sectors:
  1. **Where**: Autocomplete popover with quick suggestions (Scotland, Germany, Nepal, Italy).
  2. **Check-in / Check-out**: Interactive calendar popover with night calculator.
  3. **Guests & Rooms**: Stepper modal with adult, children, and room incrementers.
  4. **Search Action**: High-contrast circular action button (`bg-charcoal-text text-white hover:bg-gold-accent`).

### 5.3 Dark Experience Section (`ExperienceBanner.tsx`)
- Deep warm charcoal canvas (`bg-[#191815]`).
- Gold star accents and high-contrast ivory headline.
- Multi-photo constellation composed of 7 circular photographic vignettes showcasing activities (sailing, culinary tasting, alpine hiking, spa retreats).
- Transparent mobile responsiveness collapsing gracefully into a centered card.

---

## 6. Motion Design System, Easing & Accessibility

TRUST.TRAVEL implements a unified, high-performance motion design system built on CSS-first GPU transforms and React 19-safe `IntersectionObserver` triggers.

### 6.1 Motion Tokens & Easing Curves
All interactive transitions adhere to centralized motion tokens:

| Token | Timing / Curve | Semantic Purpose |
| :--- | :--- | :--- |
| **`--ease-editorial`** | `cubic-bezier(0.22, 1, 0.36, 1)` | Luxury deceleration curve for reveals, headlines, and modals. |
| **`--ease-spring`** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Tactile elastic micro-bounces (favorite hearts, badge pop). |
| **`--ease-smooth`** | `cubic-bezier(0.16, 1, 0.3, 1)` | Fluid hover transitions and smooth camera-style pan/zoom. |
| **`--duration-micro`** | `180ms` | Button presses, active states, checkbox checks. |
| **`--duration-standard`** | `320ms` | Dropdown reveals, filter sheet transitions, drawer slides. |
| **`--duration-editorial`** | `650ms` | Card reveals, headline mask reveals, section entrances. |
| **`--duration-cinematic`** | `950ms` | Hero entrance, background reveals, photo zooms. |

### 6.2 Signature Motion Effects
1. **Delicate Compass Star Rotation**: Compass icon in `Logo.tsx` rotates smoothly on load and expands on hover with a 700ms ease-out curve.
2. **Staggered Hero Headline Reveal**: Sequences line 1 (`100ms`), line 2 (`280ms`), and search bar (`450ms`) with upward translations.
3. **Clamped Pointer Parallax (Desktop)**: The hero background and text respond subtly to cursor movements (clamped to max ±10px), automatically disabled on touch devices.
4. **Interactive Ambient Light**: In the dark editorial banner (`ExperienceBanner.tsx`), cursor movement illuminates a warm champagne radial glow (`rgba(185, 161, 125, 0.16)`) while the 7 circular photo vignettes float gently.
5. **3D Destination Card Tilt**: Destination cards tilt up to ±4° on desktop hover using 3D perspective transforms (`perspective-container` and `tilt-card`).
6. **Elastic Micro-Bounce**: Saving a property triggers `@keyframes heartBounce` on the heart icon and real-time counter updates.
7. **Article Reading Progress Bar**: Real-time champagne gold hairline indicator (`ReadingProgressBar.tsx`) tracking scroll progress across journal articles.
8. **Dynamic Price Recalculation**: Live prices trigger `@keyframes priceUpdate` with a subtle gold highlight flash when stay dates or guest numbers change.

### 6.3 Reduced Motion Accessibility
Every animated component honors the user's OS-level accessibility setting:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  .animate-draw-line,
  .animate-compass-spin,
  .animate-heart-bounce,
  .animate-price-update,
  .float-slow,
  .float-med {
    animation: none !important;
  }

  .tilt-card {
    transform: none !important;
  }
}
```

---

## 7. Responsive Breakpoint Matrix

| Breakpoint | Width (px) | Grid Columns | Navigation Mode |
| :--- | :--- | :--- | :--- |
| **Mobile Portrait** | `< 640px` | 1 column | Collapsed hamburger menu, stacked search form |
| **Tablet Portrait** | `640px - 767px` | 2 columns | Mobile drawer, compacted search pill |
| **Tablet Landscape** | `768px - 1023px` | 2 columns | Desktop bar, wrapped filter controls |
| **Desktop Regular** | `1024px - 1279px` | 3 columns | Full horizontal navigation, 3-column stay grid |
| **Desktop Wide** | `≥ 1280px` | 3-4 columns | Max-w-7xl centered container, full editorial connector lines |
