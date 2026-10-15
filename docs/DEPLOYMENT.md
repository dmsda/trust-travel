# TRUST.TRAVEL Production Deployment Guide

## 1. System Requirements

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` v10+, `pnpm` v9+, or `yarn` v1.22+
- **Memory**: Minimum 1GB RAM for build; 512MB for runtime

---

## 2. Environment Configuration

Copy the sample environment file to create your local production environment:
```bash
cp .env.example .env.local
```

### Configurable Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Canonical production domain used for XML sitemaps and OpenGraph tags. |
| `NEXT_PUBLIC_SITE_NAME` | `TRUST.TRAVEL` | Global platform branding and window title suffix. |
| `PORT` | `3000` | Default listening port for Node.js server. |

---

## 3. Production Build & Execution

### 3.1 Standard Node.js Production Run
```bash
# 1. Install production dependencies
npm ci

# 2. Execute verification suites
npm run type-check
npm run lint
npm test

# 3. Create optimized production build
npm run build

# 4. Start production server
npm start
```

### 3.2 Verification
After starting, verify the following endpoints:
- Homepage: `http://localhost:3000/`
- Health check / Static sitemap: `http://localhost:3000/sitemap.xml`
- Search engine robots rules: `http://localhost:3000/robots.txt`

---

## 4. Platform Deployment Guides

### 4.1 Deploying on Vercel (Recommended)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. In **Project Settings > Environment Variables**, set:
   - `NEXT_PUBLIC_APP_URL`: `https://your-domain.com`
5. Click **Deploy**.

### 4.2 Docker Containerization
Create a `Dockerfile` in the root directory:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 5. Pre-Flight Production Checklist

Before launching publicly, ensure the following checklist is completed:

- [x] **Linting**: `npm run lint` passes with 0 errors and 0 warnings.
- [x] **Type Checking**: `npm run type-check` passes with 0 TypeScript diagnostics.
- [x] **Automated Tests**: `npm test` passes all critical flow checks.
- [x] **Asset Paths**: All images in `public/assets/` load without 404s.
- [x] **Canonical Domain**: `NEXT_PUBLIC_APP_URL` matches your live domain.
- [x] **Favicon & Webmanifest**: `favicon.svg` and `site.webmanifest` resolve correctly.
- [x] **Prototype Notice**: Booking flows transparently notify users that reservations are demonstration-only.
- [x] **SEO**: Meta tags, OpenGraph previews, and `sitemap.xml` are accessible.
