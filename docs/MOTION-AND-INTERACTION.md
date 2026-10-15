# TRUST.TRAVEL — Motion, Interactions & Gallery System Documentation

This document specifies the motion design philosophy, interaction architecture, and media gallery implementation across **TRUST.TRAVEL**.

---

## 1. Creative Motion Philosophy

TRUST.TRAVEL combines the restraint of an editorial luxury magazine with modern digital interactions.

### Guiding Principles
- **Editorial Luxury**: Motion is subtle, organic, and never distracts from typography or high-resolution photography.
- **Natural Fluidity**: Custom cubic-bezier easing curves inspired by physical inertia rather than mechanical linear movement.
- **Zero Bundle Bloat**: Implemented with **100% native CSS transitions and GPU-accelerated transforms** (`translate3d`, `opacity`, `scale`). No heavy external animation libraries are required.
- **Full Reduced-Motion Support**: Honors `@media (prefers-reduced-motion: reduce)` by instantly disabling animations and transitions for users who need it.

---

## 2. Motion Design Tokens & Timing

Defined globally in `src/app/globals.css`:

```css
:root {
  /* Editorial Luxury Cubic Bezier Curves */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* Centralized Duration Standards */
  --duration-micro: 180ms;       /* Button clicks, tag hovers, toggle switches */
  --duration-standard: 320ms;    /* Dropdowns, drawer reveals, popover fades */
  --duration-editorial: 650ms;   /* Section entrance masks, photo gallery reveals */
  --duration-cinematic: 900ms;   /* Hero headlines, ambient parallax settles */
}
```

### Motion Tokens Matrix
| Category | Duration | Easing | Applied Elements |
| :--- | :--- | :--- | :--- |
| **Micro-Interactions** | `180ms` | `--ease-editorial` | Favorite button heart-bounce, pill hover scales, active tab underlines |
| **Standard Transitions**| `280ms–350ms`| `--ease-smooth` | Destination popovers, date picker modals, guest counter increments |
| **Editorial Reveals** | `650ms–750ms`| `--ease-editorial` | `<RevealOnScroll>` viewport fades, arched card entry, stays photo grid |
| **Cinematic Ambient** | `850ms–1200ms`| `--ease-editorial` | Hero staggered headline entrance, ambient champagne cursor light |

---

## 3. Interactive Hero Search System

The search bar is the central functional anchor of TRUST.TRAVEL.

### Architecture & Layering
To prevent popovers from being clipped by the hero card's rounded borders (`rounded-[44px]`):
1. **Separated Overflow Context**: The hero background image and dark gradient are isolated inside a dedicated inner wrapper with `overflow-hidden rounded-[44px] pointer-events-none`.
2. **Elevated Z-Index**: The outer hero `<section>` operates at `relative z-30`, ensuring dropdowns comfortably float above subsequent content without clipping.
3. **Popovers**:
   - **Destination Suggestions**: Keyboard accessible (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`), instant selection.
   - **Date Range Picker**: Native dual date inputs with automatic checkout range clamping and dual action buttons (**"Done"** & **"Guests →"**).
   - **Travelers & Rooms**: Stepper buttons preventing negative counts with minimum adult validation.

---

## 4. Stays Photo Gallery & Lightbox System

Implemented in `src/app/stays/[slug]/page.tsx` and `src/components/properties/PropertyCard.tsx`.

### A. 5-Photo Editorial Grid (`/stays/[slug]`)
- **Main Hero Photograph**: Left column (`md:col-span-2`), `480px` height on desktop, smooth hover zoom (`scale-105`), and dark glass tint.
- **Supporting Photographs**: Right column (`md:col-span-2 grid grid-cols-2 gap-3`), 4 photos each `234px` height (`234px * 2 + 12px gap = 480px`), achieving pixel-perfect height alignment.
- **Floating Badge**: An elegant floating pill button (`Show all 5 photos`) positioned at the bottom right with a `LayoutGrid` icon and backdrop blur.

### B. Interactive Lightbox Modal
- **Keyboard Navigation**: `ArrowLeft` / `ArrowRight` to cycle photos, `Escape` to close.
- **Scroll Lock**: Automatically locks `document.body.style.overflow = 'hidden'` while modal is active.
- **Thumbnail Strip**: Horizontal thumbnail preview bar along the bottom allowing direct jump to any photograph.
- **Photo Counter**: Displays `Photograph X of Y` and property title.
- **Backdrop Dismissal**: Clicking outside the image smoothly closes the lightbox.

### C. Property Card Multi-Photo Preview (`/stays`)
- On the stay catalog page, hovering over any property card reveals subtle navigation chevrons and pagination indicator dots.
- Users can cycle through photos without leaving the catalog page.

---

## 5. Viewport Reveal Engine (`<RevealOnScroll>`)

The `<RevealOnScroll>` component (`src/components/motion/RevealOnScroll.tsx`) provides declarative scroll reveals powered by `IntersectionObserver`.

```tsx
<RevealOnScroll variant="fade-up" duration={700}>
  <div className="gallery-container">...</div>
</RevealOnScroll>
```

### Supported Variants
- `fade-up`: Upward translate with smooth opacity ramp.
- `fade-in`: Pure opacity entrance.
- `slide-left` / `slide-right`: Lateral entrance for split-layout editorial sections.
- `scale-up`: Gentle scale entrance from `0.95` to `1.0`.

---

## 6. Accessibility & Reduced Motion

All motion strictly adheres to **WCAG 2.2 Level AA guidelines**:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In addition, interactive pointer parallax and 3D tilts explicitly detect touchscreens (`'ontouchstart' in window`) and disable pointer tracking to preserve mobile battery and prevent jitter.
