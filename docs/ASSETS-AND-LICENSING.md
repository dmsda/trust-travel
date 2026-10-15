# TRUST.TRAVEL Assets & Licensing Documentation

## 1. Overview

All visual assets in TRUST.TRAVEL are stored locally within the repository under the `public/` directory to guarantee:
- **Zero Third-Party Dependency Failures**: No broken image links, rate limits, or external CDN outages.
- **Instant Local Previews**: Fast page rendering in development, offline mode, and production builds.
- **Deterministic Builds**: Completely reproducible image generation across any deployment target.

The asset catalog is fully typed and exposed via `src/data/asset-manifest.ts`.

---

## 2. Brand Identity Assets (`public/assets/brand/`)

The vector brand identity was designed specifically for TRUST.TRAVEL, featuring custom typography and an 8-pointed gold compass star:

| File Name | Dimensions | Purpose | License |
| :--- | :--- | :--- | :--- |
| `logo.svg` | 260 × 44 | Primary brand mark for light header navigation and light sections. | MIT / Project Asset |
| `logo-dark.svg` | 260 × 44 | Inverted high-contrast brand mark for dark editorial sections and footer. | MIT / Project Asset |
| `logo-icon.svg` | 48 × 48 | 8-point gold compass star emblem used as badge, favicon, and accent. | MIT / Project Asset |
| `og-cover.svg` | 1200 × 630 | Social sharing preview card (OpenGraph & Twitter Card) with tagline. | MIT / Project Asset |
| `public/favicon.svg` | 32 × 32 | High-resolution scalable vector favicon for browser tabs. | MIT / Project Asset |

---

## 3. Curated Photography Inventory (`public/assets/images/`)

All photography assets are sourced under the **Unsplash Free Commercial License**, granting free use, reproduction, and modification without permission or payment for commercial and non-commercial projects.

### 3.1 Hero Banner
- **Path**: `/assets/images/hero/hero-travel.jpg`
- **Resolution**: 1920 × 1080 (High-definition landscape)
- **Subject**: Winding Scottish Highland country road through rolling golden hills at dawn.
- **License**: Unsplash License

### 3.2 Featured Destinations
| Destination | Local File Path | Subject Description | License |
| :--- | :--- | :--- | :--- |
| **Scotland** | `/assets/images/destinations/scotland.jpg` | Eilean Donan Castle reflected in mist on Loch Duich. | Unsplash License |
| **Germany** | `/assets/images/destinations/germany.jpg` | Cobblestone alley with half-timbered architecture in Rothenburg. | Unsplash License |
| **Nepal** | `/assets/images/destinations/nepal.jpg` | Carved multi-tiered pagoda temple overlooking Kathmandu Valley. | Unsplash License |
| **Italy** | `/assets/images/destinations/italy.jpg` | Colorful cliffside residences along the Amalfi coast. | Unsplash License |
| **Japan** | `/assets/images/destinations/japan.jpg` | Traditional wooden pagoda surrounded by autumn foliage in Kyoto. | Unsplash License |
| **Indonesia** | `/assets/images/destinations/indonesia.jpg` | Emerald stepped rice terraces and palm trees in Ubud, Bali. | Unsplash License |

### 3.3 Accommodations & Stays
| Property Name | Local File Path | Property Category | Destination |
| :--- | :--- | :--- | :--- |
| **The Brera Atelier Suite** | `/assets/images/properties/hotel-01.jpg` | Boutique Hotel | Milan, Italy |
| **Mitte Heritage Grand** | `/assets/images/properties/hotel-02.jpg` | Grand Hotel | Berlin, Germany |
| **Villa Bellavista Chianti** | `/assets/images/properties/villa-01.jpg` | Luxury Villa | Tuscany, Italy |
| **Nordic Pine Sanctuary** | `/assets/images/properties/cabin-01.jpg` | Architectural Cabin | Black Forest, Germany |
| **Uluwatu Cliff Sanctuary** | `/assets/images/properties/resort-01.jpg` | Coastal Resort | Bali, Indonesia |
| **Loch Fyne Fisherman Cottage** | `/assets/images/properties/cottage-01.jpg` | Historic Cottage | Scottish Highlands |
| **Le Marais Light Loft** | `/assets/images/properties/apartment-01.jpg` | Loft Apartment | Paris, France |

### 3.4 Property Categories (`public/assets/images/property-types/`)
- `hotels.jpg`: Minimalist hotel interior with linen accents.
- `apartments.jpg`: Sunlit Parisian apartment living space.
- `resorts.jpg`: Infinity pool overlooking ocean horizon.
- `villas.jpg`: Tuscan stone estate with olive groves.
- `cabins.jpg`: Contemporary timber A-frame cabin in snowy pines.
- `cottages.jpg`: Thatched stone cottage with climbing wisteria.

### 3.5 Editorial Journal Articles (`public/assets/images/editorial/`)
- `article-01.jpg`: European canal-side travelers and bicycles in Amsterdam.
- `article-02.jpg`: Contemporary sustainable home interior with bio-ethanol fireplace.
- `article-03.jpg`: Historic coastal cedar shingle residence with picket fence.

### 3.6 Promotional Vignette Constellation (`public/assets/images/vignettes/`)
- `vignette-1.jpg` through `vignette-7.jpg`: Seven circular vignettes depicting Mediterranean sailing, artisan wine cellars, alpine peaks, artisanal espresso, sunset terraces, thermal springs, and private aircraft transfers.

---

## 4. Replacing Assets in Custom Deployments

To replace the sample photography with your own property management system (PMS) images or remote CDN:

1. **Option A: Replace Local Files**:  
   Drop your `.jpg` or `.webp` files into the matching paths inside `public/assets/images/`.

2. **Option B: Connect Remote CDN**:  
   Update the image URLs in `src/data/properties.ts` and whitelist your remote hostnames in `next.config.ts`:
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.your-travel-cdn.com',
         },
       ],
     },
   };
   ```

3. **Update Manifest**:  
   Adjust metadata in `src/data/asset-manifest.ts` to reflect the updated photographers, licenses, and alt text.
