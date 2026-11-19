# UiWorks

Waitlist landing page for **UiWorks** — Headless Design System for every human interaction (2D, 3D, voice, touch, and beyond).

Live domain: [https://uiworks.io](https://uiworks.io)

## Stack

| Piece | Detail |
| --- | --- |
| App | Vite + React + TypeScript |
| Styles | Tailwind CSS v4 |
| Hero visual | Design-system constellation (R3F) |
| Hosting | Cloudflare Workers (Static Assets) |
| Waitlist | Substack subscribe |

## Local development

```bash
cp .env.example .env
# set VITE_SUBSTACK_PUBLISHING_URL to your Substack publication URL
npm install
npm run dev
```

Build:

```bash
npm run build
# output → dist/
```

Preview as a Worker locally:

```bash
npm run preview
```

## Substack

1. Create a Substack publication for product updates / early access.
2. Set `VITE_SUBSTACK_PUBLISHING_URL` (e.g. `https://uiworks.substack.com`) — no trailing slash.
3. Form submit opens `{publication}/subscribe?email=…` for confirmation.

## Cloudflare Workers

Config: [`wrangler.jsonc`](wrangler.jsonc) — assets from `./dist`, SPA `not_found_handling`.

```bash
npm run deploy
```

| Setting | Value |
| --- | --- |
| Worker name | `uiworks` |
| Assets directory | `dist` |
| Build command (CI) | `npm run build` |
| Deploy command (CI) | `npx wrangler deploy` |
| Build env var | `VITE_SUBSTACK_PUBLISHING_URL` |

`VITE_` vars are inlined at **build** time — redeploy after changing them. Attach `uiworks.io` under Workers → Settings → Domains & Routes (or Custom Domains).

SPA routing is handled by `assets.not_found_handling` in `wrangler.jsonc` (do not add a Pages-style `/* /index.html 200` `_redirects` — it conflicts on Workers). Security headers: `public/_headers`.
