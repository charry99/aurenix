# AURENIX — Phase 1 MVP website

Formerly MINT2EARN AI, renamed to AURENIX on 2026-11-24. See `../PLAN.md`.

## Site

Vite + React 19 + TypeScript + react-router-dom (HashRouter, GitHub Pages
compatible). Premium black-and-gold theme, responsive, no stock images, no
emojis as UI icons.

```sh
cd site
npm install
npm run dev      # local dev
npm run build    # type-check + production build -> site/dist
npm run preview  # serve the production build
```

## Brand

Single config: `site/src/config.ts` — rename the brand there and the whole
site follows.

## Assets

The site references `/assets/logo.png`, `/assets/hero.png`,
`/assets/nft-bronze.png`, `/assets/nft-silver.png`, `/assets/nft-gold.png`,
`/assets/nft-elite.png`, `/assets/og-banner.png`. Place the real artwork in
`site/public/assets/` before deploy; until then the images hide gracefully
(the pages work without them).

## Mission Hub

Fully local demo: the 8 seeded missions, submissions, locally created
missions, approvals, reputation, and the emergency-pause flag all live in the
browser's localStorage (`aunx_*` keys). Nothing touches a chain or a server.

## Deploy

Cloudflare Pages project `aurenix` → https://aurenix.pages.dev (Vite base
`/`). Deploy from the repo with `wrangler pages deploy site/dist
--project-name aurenix`, or connect the GitHub repo to the Pages project in
the Cloudflare dashboard. `.github/workflows/ci.yml` runs a build check on
every push to `main`/`master`.
